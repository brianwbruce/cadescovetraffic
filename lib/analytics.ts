import posthog from 'posthog-js';
import { env } from './env';

let initialized = false;

export function initAnalytics() {
  if (typeof window === 'undefined' || initialized) return;
  const key = env.posthogKey();
  if (!key) return;
  posthog.init(key, {
    api_host: env.posthogHost(),
    capture_pageview: true,
    capture_pageleave: true,
    persistence: 'localStorage+cookie',
  });
  initialized = true;
}

type EventProps = Record<string, string | number | boolean | null | undefined>;

export function track(event: string, props?: EventProps) {
  if (typeof window === 'undefined') return;
  if (!initialized) return;
  posthog.capture(event, props);
}
