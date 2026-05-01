import { getTodaysConditions } from '@/lib/conditions';

export async function ConditionsStrip() {
  const c = await getTodaysConditions();

  return (
    <section
      aria-label="Today's conditions"
      className="border-y border-forest-100 bg-forest-700 text-cream"
    >
      <div className="mx-auto grid max-w-6xl gap-4 px-6 py-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
        <Item
          label="Today"
          value={c.formattedDate}
          tone="default"
        />
        <Item
          label="Vehicle access"
          value={c.vehicleFreeStatus}
          tone={c.vehicleFreeActive ? 'accent' : 'default'}
        />
        <Item
          label="Weather"
          value={
            c.weather
              ? c.weatherFahrenheit !== null
                ? `${c.weatherFahrenheit}°F · ${c.weather.conditionLabel}`
                : c.weather.conditionLabel
              : 'Weather unavailable'
          }
          tone="default"
        />
        <Item
          label="Traffic outlook"
          value={`${capitalize(c.trafficExpectation)} — ${c.seasonNote.split('—')[0]?.trim() ?? c.seasonNote}`}
          tone={
            c.trafficExpectation === 'heavy'
              ? 'warn'
              : c.trafficExpectation === 'moderate'
                ? 'accent'
                : 'default'
          }
        />
      </div>
    </section>
  );
}

function Item({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: 'default' | 'accent' | 'warn';
}) {
  const valueClass =
    tone === 'warn'
      ? 'text-ember-400'
      : tone === 'accent'
        ? 'text-ember-400'
        : 'text-cream';
  return (
    <div>
      <p className="text-xs uppercase tracking-wider text-cream/60">{label}</p>
      <p className={`mt-1 ${valueClass}`}>{value}</p>
    </div>
  );
}

function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
