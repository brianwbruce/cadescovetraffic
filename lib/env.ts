function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function optional(name: string): string | undefined {
  return process.env[name] || undefined;
}

export const env = {
  supabaseUrl: () => required('SUPABASE_URL'),
  supabaseAnonKey: () => required('SUPABASE_ANON_KEY'),
  supabaseServiceRoleKey: () => required('SUPABASE_SERVICE_ROLE_KEY'),
  resendApiKey: () => required('RESEND_API_KEY'),
  resendFromEmail: () => required('RESEND_FROM_EMAIL'),
  posthogKey: () => optional('NEXT_PUBLIC_POSTHOG_KEY'),
  posthogHost: () => optional('NEXT_PUBLIC_POSTHOG_HOST') ?? 'https://us.i.posthog.com',
  siteUrl: () => optional('NEXT_PUBLIC_SITE_URL') ?? 'https://cadescovetraffic.com',
};
