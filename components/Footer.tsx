import Link from 'next/link';
import { ARTICLES } from '@/lib/articles';

export function Footer() {
  const topArticles = ARTICLES.slice(0, 3);
  return (
    <footer className="border-t border-forest-100 bg-forest-700 text-cream">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-display text-xl">CadesCoveTraffic.com</p>
          <p className="mt-3 max-w-md text-sm text-cream/80">
            Built by the team behind <strong>SmokyFlow</strong>, the upcoming Cades Cove tour and
            live conditions app. This site stays free and useful whether you download the app or
            not.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-cream/60">Read</p>
          <ul className="mt-3 space-y-2 text-sm">
            {topArticles.map((a) => (
              <li key={a.slug}>
                <Link href={`/articles/${a.slug}`} className="hover:text-ember-400">
                  {a.title}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/articles" className="hover:text-ember-400">
                All articles →
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-cream/60">Site</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/privacy" className="hover:text-ember-400">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-ember-400">
                Terms
              </Link>
            </li>
            <li>
              <a href="mailto:hello@cadescovetraffic.com" className="hover:text-ember-400">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="mx-auto max-w-6xl px-6 py-6 text-xs text-cream/60">
          © {new Date().getFullYear()} SmokyFlow. Cades Cove is part of Great Smoky Mountains
          National Park (NPS).
        </div>
      </div>
    </footer>
  );
}
