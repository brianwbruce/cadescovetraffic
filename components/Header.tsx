import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b border-forest-100 bg-cream/80 backdrop-blur sticky top-0 z-30">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg text-forest-600 hover:text-forest-700">
          <span className="font-display tracking-tight">CadesCoveTraffic.com</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/articles" className="text-fog-600 hover:text-forest-600">
            Articles
          </Link>
          <Link
            href="#founding-insider"
            className="rounded-full bg-forest-600 px-4 py-2 text-cream hover:bg-forest-700"
          >
            Become an Insider
          </Link>
        </nav>
      </div>
    </header>
  );
}
