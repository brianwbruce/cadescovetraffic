import { env } from './env';

export type WelcomeEmailInput = {
  firstName: string;
  position: number;
  badgeEligible: boolean;
};

export function welcomeEmailSubject({ firstName, position }: WelcomeEmailInput): string {
  return `You're Founding Insider #${position}, ${firstName}`;
}

export function welcomeEmailText({ firstName, position, badgeEligible }: WelcomeEmailInput): string {
  const site = env.siteUrl();
  const badgeLine = badgeEligible
    ? `You'll also have a permanent Founding Member badge in your profile — only the first 1,000 people get one.`
    : `All Founding Member badge spots are taken, but you're confirmed on the launch list.`;

  return `Hey ${firstName},

You're officially Founding Cove Insider #${position}. Welcome.

Here's what that means:

When SmokyFlow launches, you'll get your invite link before public release. ${badgeLine}

Starting this Friday, you'll get a short weekly email with what to expect at Cades Cove that weekend. Traffic, weather, wildlife sightings, anything notable. We won't email you for any other reason.

A few things you might find useful right now:

- How long does Cades Cove take? — ${site}/articles/how-long-does-cades-cove-take
- Vehicle-Free Wednesdays guide — ${site}/articles/vehicle-free-wednesdays-guide
- Best times to visit — ${site}/articles/best-times-to-visit-cades-cove

See you in the cove.

— The SmokyFlow team

Unsubscribe: ${site}/unsubscribe
`;
}

export function welcomeEmailHtml(input: WelcomeEmailInput): string {
  const { firstName, position, badgeEligible } = input;
  const site = env.siteUrl();
  const badgeLine = badgeEligible
    ? `You'll also have a permanent Founding Member badge in your profile — only the first 1,000 people get one.`
    : `All Founding Member badge spots are taken, but you're confirmed on the launch list.`;

  return `<!doctype html>
<html lang="en">
  <body style="font-family: Georgia, serif; color: #1F2937; background: #FAFAF7; margin: 0; padding: 32px;">
    <div style="max-width: 560px; margin: 0 auto; background: #fff; padding: 32px; border-radius: 8px;">
      <h1 style="color: #1F4E3D; font-size: 24px; margin: 0 0 16px;">Welcome, Founding Insider #${position}</h1>
      <p>Hey ${firstName},</p>
      <p>You're officially Founding Cove Insider <strong>#${position}</strong>. Welcome.</p>
      <p>Here's what that means:</p>
      <p>When SmokyFlow launches, you'll get your invite link before public release. ${badgeLine}</p>
      <p>Starting this Friday, you'll get a short weekly email with what to expect at Cades Cove that weekend. Traffic, weather, wildlife sightings, anything notable. We won't email you for any other reason.</p>
      <p>A few things you might find useful right now:</p>
      <ul>
        <li><a href="${site}/articles/how-long-does-cades-cove-take" style="color: #C77B3A;">How long does Cades Cove take?</a></li>
        <li><a href="${site}/articles/vehicle-free-wednesdays-guide" style="color: #C77B3A;">Vehicle-Free Wednesdays guide</a></li>
        <li><a href="${site}/articles/best-times-to-visit-cades-cove" style="color: #C77B3A;">Best times to visit</a></li>
      </ul>
      <p>See you in the cove.</p>
      <p>— The SmokyFlow team</p>
      <hr style="border: none; border-top: 1px solid #D6E0D9; margin: 32px 0;" />
      <p style="font-size: 12px; color: #6B7280;">
        <a href="${site}/unsubscribe" style="color: #6B7280;">Unsubscribe</a>
      </p>
    </div>
  </body>
</html>`;
}
