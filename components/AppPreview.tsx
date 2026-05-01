import { FoundingInsiderForm } from './FoundingInsiderForm';

export function AppPreview() {
  return (
    <section
      id="founding-insider"
      aria-labelledby="app-preview-heading"
      className="bg-forest-700 text-cream"
    >
      <div className="mx-auto grid max-w-6xl items-start gap-12 px-6 py-20 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <p className="text-xs uppercase tracking-wider text-ember-400">Coming soon · SmokyFlow</p>
          <h2
            id="app-preview-heading"
            className="mt-3 font-display text-3xl leading-tight text-cream sm:text-4xl"
          >
            Driving the loop? Don't drive in silence.
          </h2>
          <p className="mt-5 max-w-xl text-cream/80">
            We're building a free, GPS-triggered audio tour for Cades Cove — local stories,
            wildlife cues, and pacing tips that play as you drive. It's part of{' '}
            <strong>SmokyFlow</strong>, launching later this year.
          </p>

          <div className="mt-8 max-w-md">
            <p
              id="founding-insider-headline"
              className="font-display text-xl text-cream"
            >
              Be one of the first 1,000.
            </p>
            <p className="mt-2 text-sm text-cream/80">
              SmokyFlow's first 1,000 download spots are reserved for Founding Cove Insiders.
              You'll get the app before public release, a permanent Founding Member badge, and the
              weekly Cades Cove conditions email starting now.
            </p>
            <div className="mt-5">
              <FoundingInsiderForm variant="expanded" source="app_preview" />
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div
            aria-hidden
            className="mx-auto aspect-[9/19] w-full max-w-[260px] rounded-[2.5rem] border-4 border-cream/10 bg-gradient-to-b from-forest-600 to-ember-500 p-3 shadow-2xl"
          >
            <div className="flex h-full flex-col rounded-[1.75rem] bg-cream p-4">
              <p className="text-xs uppercase tracking-wider text-fog-400">SmokyFlow</p>
              <p className="mt-1 font-display text-lg text-forest-700">Cades Cove · Stop 4</p>
              <div className="mt-4 h-2 w-full rounded-full bg-forest-50">
                <div className="h-2 w-2/3 rounded-full bg-ember-500" />
              </div>
              <p className="mt-3 text-xs text-fog-600">"The story of John Oliver's cabin…"</p>
              <div className="mt-auto rounded-xl bg-forest-50 p-3 text-xs text-forest-700">
                <p className="text-[10px] uppercase tracking-wider text-fog-400">Next stop</p>
                <p className="mt-0.5">Methodist Church · 0.4 mi</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
