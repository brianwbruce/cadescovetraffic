'use client';

import { useState, useTransition, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';

type Variant = 'collapsed' | 'expanded';

type Props = {
  variant?: Variant;
  source?: string;
  className?: string;
};

type ServerResponse = {
  status?: 'created' | 'already_signed_up';
  position?: number;
  badgeEligible?: boolean;
  firstName?: string;
  error?: string;
  issues?: { path: string; message: string }[];
};

export function FoundingInsiderForm({
  variant = 'expanded',
  source = 'homepage',
  className,
}: Props) {
  const [open, setOpen] = useState(variant === 'expanded');
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      firstName: String(data.get('firstName') ?? '').trim(),
      lastName: String(data.get('lastName') ?? '').trim(),
      email: String(data.get('email') ?? '').trim(),
      source,
    };

    startTransition(async () => {
      try {
        const res = await fetch('/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const body = (await res.json().catch(() => ({}))) as ServerResponse;

        if (!res.ok) {
          setError(body.error ?? 'Something went wrong. Please try again.');
          return;
        }

        const params = new URLSearchParams();
        if (body.position) params.set('position', String(body.position));
        if (body.status) params.set('status', body.status);
        router.push(`/thank-you?${params.toString()}`);
      } catch {
        setError('Network error. Please try again.');
      }
    });
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`inline-flex items-center gap-2 rounded-full bg-forest-600 px-5 py-3 text-sm text-cream shadow-sm hover:bg-forest-700 ${className ?? ''}`}
      >
        Become a Founding Cove Insider
        <span aria-hidden>→</span>
      </button>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`space-y-4 rounded-2xl border border-forest-100 bg-white p-6 shadow-sm ${className ?? ''}`}
      aria-labelledby="founding-insider-headline"
      noValidate
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Field label="First name" name="firstName" autoComplete="given-name" required />
        <Field label="Last name" name="lastName" autoComplete="family-name" required />
      </div>
      <Field label="Email" name="email" type="email" autoComplete="email" required />

      {error && (
        <p role="alert" className="text-sm text-ember-600">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center rounded-full bg-forest-600 px-5 py-3 text-cream hover:bg-forest-700 disabled:opacity-60 sm:w-auto"
      >
        {pending ? 'Saving…' : 'Become a Founding Insider'}
      </button>

      <p className="text-xs text-fog-600">
        Free. No spam. Unsubscribe anytime. We email when there's something genuinely useful.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = 'text',
  autoComplete,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="block text-sm">
      <span className="text-ink">{label}</span>
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        className="mt-1 w-full rounded-lg border border-forest-100 bg-cream px-3 py-2 text-ink shadow-sm focus:border-forest-600 focus:outline-none focus:ring-2 focus:ring-forest-600/20"
      />
    </label>
  );
}
