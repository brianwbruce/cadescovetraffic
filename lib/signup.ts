import { z } from 'zod';
import { getSupabaseAdmin } from './supabase';
import { fromAddress, getResend } from './resend';
import {
  welcomeEmailHtml,
  welcomeEmailSubject,
  welcomeEmailText,
} from './email-templates';

export const signupSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(100).trim(),
  lastName: z.string().min(1, 'Last name is required').max(100).trim(),
  email: z.string().email('Enter a valid email').max(255).toLowerCase().trim(),
  source: z.string().max(100).optional(),
  referrer: z.string().max(2048).optional(),
  utm_source: z.string().max(255).optional(),
  utm_medium: z.string().max(255).optional(),
  utm_campaign: z.string().max(255).optional(),
});

export type SignupInput = z.infer<typeof signupSchema>;

export type SignupContext = {
  ipAddress?: string;
  userAgent?: string;
};

export type SignupResult = {
  status: 'created' | 'already_signed_up';
  position: number;
  badgeEligible: boolean;
  firstName: string;
};

export async function processSignup(
  input: SignupInput,
  ctx: SignupContext = {},
): Promise<SignupResult> {
  const supabase = getSupabaseAdmin();

  const { data: inserted, error } = await supabase
    .from('founding_insiders')
    .insert({
      first_name: input.firstName,
      last_name: input.lastName,
      email: input.email,
      signup_source: input.source ?? 'homepage',
      referrer_url: input.referrer ?? null,
      utm_source: input.utm_source ?? null,
      utm_medium: input.utm_medium ?? null,
      utm_campaign: input.utm_campaign ?? null,
      ip_address: ctx.ipAddress ?? null,
      user_agent: ctx.userAgent ?? null,
    })
    .select('id, first_name, position_number, badge_eligible')
    .single();

  if (error) {
    // Postgres unique_violation -> existing signup, return their position.
    if (error.code === '23505') {
      const { data: existing, error: lookupError } = await supabase
        .from('founding_insiders')
        .select('first_name, position_number, badge_eligible')
        .eq('email', input.email)
        .single();
      if (lookupError || !existing) {
        throw new Error(`Failed to look up existing signup: ${lookupError?.message ?? 'not found'}`);
      }
      return {
        status: 'already_signed_up',
        position: existing.position_number as number,
        badgeEligible: existing.badge_eligible as boolean,
        firstName: existing.first_name as string,
      };
    }
    throw new Error(`Insert failed: ${error.message}`);
  }

  const position = inserted.position_number as number;
  const badgeEligible = inserted.badge_eligible as boolean;
  const firstName = inserted.first_name as string;

  // Fire welcome email. Don't fail the signup if Resend errors — log it.
  await sendWelcomeEmail({
    insiderId: inserted.id as string,
    email: input.email,
    firstName,
    position,
    badgeEligible,
  });

  return { status: 'created', position, badgeEligible, firstName };
}

type WelcomeArgs = {
  insiderId: string;
  email: string;
  firstName: string;
  position: number;
  badgeEligible: boolean;
};

async function sendWelcomeEmail(args: WelcomeArgs): Promise<void> {
  const supabase = getSupabaseAdmin();
  const payload = {
    firstName: args.firstName,
    position: args.position,
    badgeEligible: args.badgeEligible,
  };

  try {
    const resend = getResend();
    const result = await resend.emails.send({
      from: fromAddress(),
      to: args.email,
      subject: welcomeEmailSubject(payload),
      text: welcomeEmailText(payload),
      html: welcomeEmailHtml(payload),
      tags: [{ name: 'template', value: 'welcome' }],
    });

    if (result.error) {
      await logEmailEvent(supabase, args.insiderId, 'failed', { error: result.error });
      console.error('[signup] Resend returned error', result.error);
      return;
    }

    await logEmailEvent(supabase, args.insiderId, 'sent', { provider_id: result.data?.id ?? null });
  } catch (err) {
    await logEmailEvent(supabase, args.insiderId, 'failed', {
      error: err instanceof Error ? err.message : String(err),
    });
    console.error('[signup] Resend exception', err);
  }
}

async function logEmailEvent(
  supabase: ReturnType<typeof getSupabaseAdmin>,
  insiderId: string,
  eventType: 'sent' | 'failed',
  metadata: Record<string, unknown>,
) {
  const { error } = await supabase.from('email_events').insert({
    insider_id: insiderId,
    event_type: eventType,
    email_template: 'welcome',
    metadata,
  });
  if (error) {
    console.error('[signup] Failed to log email event', error);
  }
}
