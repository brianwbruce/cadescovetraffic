import { fetchWeather } from '@/lib/conditions';
import {
  getBestTimes,
  isVehicleFreeWednesday,
  seasonForDate,
  weekdayForDate,
} from '@/lib/best-time';

export async function BestTimeWidget() {
  const now = new Date();
  const weather = await fetchWeather();
  const day = weekdayForDate(now);
  const season = seasonForDate(now);
  const windows = getBestTimes(day, season, weather ?? undefined, now);
  const vehicleFree = isVehicleFreeWednesday(now);

  return (
    <section
      aria-labelledby="best-time-heading"
      className="mx-auto max-w-6xl px-6 py-16"
    >
      <h2 id="best-time-heading" className="text-3xl text-forest-600 sm:text-4xl">
        Today's best times to drive the loop
      </h2>
      <p className="mt-3 max-w-2xl text-fog-600">
        Based on the day of the week, the season, and the current weather. Updated automatically
        each visit.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {windows.map((w, i) => (
          <article
            key={i}
            className="rounded-2xl border border-forest-100 bg-white p-6 shadow-sm"
          >
            <p className="font-display text-2xl text-forest-600">
              {w.start} – {w.end}
            </p>
            <p className="mt-2 text-sm uppercase tracking-wider text-ember-500">
              Traffic: {w.traffic}
            </p>
            <p className="mt-3 text-fog-600">{w.reason}</p>
          </article>
        ))}
      </div>

      {vehicleFree && (
        <p className="mt-6 rounded-xl border border-ember-400 bg-ember-400/10 p-4 text-sm text-ink">
          <strong>Heads up:</strong> the loop is closed to vehicles until 10am today. Walk or bike
          it; bring water.
        </p>
      )}
    </section>
  );
}
