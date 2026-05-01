import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { ConditionsStrip } from '@/components/ConditionsStrip';
import { BestTimeWidget } from '@/components/BestTimeWidget';
import { AppPreview } from '@/components/AppPreview';
import { FAQ } from '@/components/FAQ';
import { ArticleCard } from '@/components/ArticleCard';
import { ARTICLES } from '@/lib/articles';

// Refresh server-rendered conditions/weather every 10 minutes.
export const revalidate = 600;

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ConditionsStrip />
        <BestTimeWidget />
        <HonestAnswer />
        <VehicleFreeWednesdays />
        <Playbook />
        <Wildlife />
        <AppPreview />
        <FAQ />
        <ArticlesPreview />
      </main>
      <Footer />
    </>
  );
}

function HonestAnswer() {
  return (
    <section
      aria-labelledby="honest-heading"
      className="mx-auto max-w-6xl px-6 py-20"
    >
      <h2 id="honest-heading" className="text-3xl text-forest-600 sm:text-4xl">
        What to actually expect
      </h2>
      <div className="mt-10 grid gap-10 lg:grid-cols-3">
        <article>
          <h3 className="font-display text-xl text-forest-600">How long the loop really takes</h3>
          <p className="mt-3 text-fog-600">
            Cades Cove is an 11-mile, one-way loop. On paper it's a 35-minute drive. In practice
            you'll spend 1–3 hours, and on a busy summer Saturday it can stretch past four. The
            variance is almost entirely about how often the car in front of you stops — at a
            wildlife sighting, at the cabins, at a turnout. Bake in time for at least a few
            unscheduled stops; that's the experience.
          </p>
        </article>
        <article>
          <h3 className="font-display text-xl text-forest-600">Why it gets backed up</h3>
          <p className="mt-3 text-fog-600">
            Two reasons. First, the loop is one lane in each direction with no real shoulder, so a
            single stopped car becomes a queue of fifty. Second, "bear jams" — a bear in the
            meadow brings the loop to a halt while everyone takes photos. Add weekend volume and
            you have a midday traffic crawl baked in. None of this is a flaw; it's the loop being
            popular, which it deserves to be.
          </p>
        </article>
        <article>
          <h3 className="font-display text-xl text-forest-600">The locals' rule of thumb</h3>
          <p className="mt-3 text-fog-600">
            Sunrise wins almost every time. Wildlife is active, the air is cool, the meadows hold
            mist, and the loop is mostly empty until 9am. Mid-day in summer or fall is the
            opposite — slow, hot, and crowded. If you can't make sunrise, the next best window is
            the last 90 minutes before the gate closes at sunset.
          </p>
        </article>
      </div>
    </section>
  );
}

function VehicleFreeWednesdays() {
  return (
    <section
      aria-labelledby="vehicle-free-heading"
      className="bg-forest-50"
    >
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 id="vehicle-free-heading" className="text-3xl text-forest-600 sm:text-4xl">
          Vehicle-Free Wednesdays
        </h2>
        <p className="mt-4 max-w-2xl text-fog-600">
          During the warm-weather season the National Park Service closes the loop to vehicles for
          part of the day so it can be walked or biked. It's the only time the road belongs to
          your feet.
        </p>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="font-display text-xl text-forest-600">When it happens</h3>
            <p className="mt-3 text-fog-600">
              Wednesdays from early May through late September. The loop opens to vehicles around
              10am once the vehicle-free window ends. The NPS schedule shifts year to year — check
              the{' '}
              <a
                href="https://www.nps.gov/grsm/planyourvisit/cades-cove.htm"
                className="text-ember-500 underline hover:text-ember-600"
                target="_blank"
                rel="noopener"
              >
                Cades Cove page on NPS.gov
              </a>{' '}
              before you go for the current dates.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl text-forest-600">Should you go?</h3>
            <p className="mt-3 text-fog-600">
              If you'd rather hike or bike than drive, vehicle-free is the best version of Cades
              Cove that exists. It's quiet, the wildlife behaves like wildlife instead of zoo
              animals, and you can stop wherever you want. If you can't bike 11 miles or you have
              very young kids in the car, plan for a different day.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl text-forest-600">What to bring</h3>
            <ul className="mt-3 list-disc space-y-1 pl-5 text-fog-600">
              <li>Water — at least 1 liter per person; there's no water on the loop.</li>
              <li>Sun protection — meadows are exposed.</li>
              <li>Bike rentals: Cades Cove Campground store rents bikes near the loop entrance.</li>
              <li>Snacks; the closest groceries are in Townsend, ~9 miles away.</li>
            </ul>
          </div>
          <div>
            <h3 className="font-display text-xl text-forest-600">If you can't bike the whole thing</h3>
            <p className="mt-3 text-fog-600">
              Park at the loop entrance and walk the first mile or two — you'll see the John
              Oliver cabin and most of the early meadows without committing to 11 miles. You can
              also drive in once vehicles are allowed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Playbook() {
  const items = [
    {
      title: 'Arrive at sunrise.',
      body: 'Best wildlife, lowest traffic, coolest air. This is the single highest-leverage decision you can make.',
    },
    {
      title: 'Avoid 10am–2pm on summer/fall weekends.',
      body: "If you must visit then, plan for the slow version and don't fight it.",
    },
    {
      title: 'Know your bail-out roads.',
      body: 'Sparks Lane (about 1.5 miles in) and Hyatt Lane (the midpoint) cut across the loop. Use them when traffic stalls.',
    },
    {
      title: 'Fuel up in Townsend.',
      body: "There's no gas in the cove. The last station is on the way in via Laurel Creek Road.",
    },
    {
      title: 'Download maps offline.',
      body: 'Cell service is effectively nothing inside the cove. Save the loop in Google or Apple Maps before you leave service.',
    },
    {
      title: 'Pack snacks and water.',
      body: 'No food, no water spigots once you turn off the main road. Pack accordingly.',
    },
    {
      title: 'Be patient with bear jams.',
      body: 'They\'re not a bug — they\'re the reason you came. Stay 50 yards back and stay in your car.',
    },
  ];
  return (
    <section
      aria-labelledby="playbook-heading"
      className="mx-auto max-w-6xl px-6 py-20"
    >
      <h2 id="playbook-heading" className="text-3xl text-forest-600 sm:text-4xl">
        The smart visitor's playbook
      </h2>
      <p className="mt-3 max-w-2xl text-fog-600">
        Seven things locals know that turn a frustrating Cades Cove day into a great one.
      </p>
      <ol className="mt-10 space-y-5">
        {items.map((item, i) => (
          <li key={i} className="flex gap-4">
            <span className="mt-1 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-forest-600 font-display text-sm text-cream">
              {i + 1}
            </span>
            <div>
              <p className="font-display text-lg text-forest-600">{item.title}</p>
              <p className="mt-1 text-fog-600">{item.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

function Wildlife() {
  const months = [
    { season: 'Spring (Mar–May)', expect: 'Bears emerge from dens · deer fawns appear · turkey courtship displays' },
    { season: 'Summer (Jun–Aug)', expect: 'Bears active in meadows · turkey broods · synchronous fireflies in June' },
    { season: 'Fall (Sep–Nov)', expect: 'Bears bulking up · deer rut · elk in nearby Cataloochee Valley' },
    { season: 'Winter (Dec–Feb)', expect: 'Less wildlife · best solitude · clear long-range views from the foothills' },
  ];
  return (
    <section
      aria-labelledby="wildlife-heading"
      className="bg-forest-50"
    >
      <div className="mx-auto max-w-6xl px-6 py-20">
        <h2 id="wildlife-heading" className="text-3xl text-forest-600 sm:text-4xl">
          Wildlife viewing window
        </h2>
        <p className="mt-3 max-w-2xl text-fog-600">
          Cades Cove is one of the best wildlife-viewing spots in the eastern US. What you'll see
          shifts noticeably by season.
        </p>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {months.map((m) => (
            <article
              key={m.season}
              className="rounded-2xl border border-forest-100 bg-white p-6 shadow-sm"
            >
              <p className="font-display text-lg text-forest-600">{m.season}</p>
              <p className="mt-2 text-fog-600">{m.expect}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArticlesPreview() {
  return (
    <section
      aria-labelledby="articles-heading"
      className="mx-auto max-w-6xl px-6 py-20"
    >
      <div className="flex items-end justify-between gap-4">
        <h2 id="articles-heading" className="text-3xl text-forest-600 sm:text-4xl">
          Read more
        </h2>
        <a href="/articles" className="text-sm text-ember-500 hover:text-ember-600">
          All articles →
        </a>
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ARTICLES.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
    </section>
  );
}
