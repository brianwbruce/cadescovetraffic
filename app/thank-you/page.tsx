import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

type SearchParams = { [key: string]: string | string[] | undefined };

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const positionRaw = Array.isArray(params.position) ? params.position[0] : params.position;
  const position = positionRaw ? Number(positionRaw) : null;
  const status = Array.isArray(params.status) ? params.status[0] : params.status;
  const isExisting = status === 'already_signed_up';

  return (
    <>
      <Header />
      <main className="mx-auto max-w-2xl px-6 py-24 text-center">
        <p className="text-xs uppercase tracking-wider text-ember-500">
          {isExisting ? "You're already in" : "You're in"}
        </p>
        <h1 className="mt-3 font-display text-4xl text-forest-700 sm:text-5xl">
          {position ? <>You're number {position.toLocaleString()}.</> : <>You're on the list.</>}
        </h1>
        <p className="mt-6 text-lg text-fog-600">
          {isExisting
            ? "We already had you on the list — your spot is locked in."
            : "We'll send the first weekly conditions email this Friday. When SmokyFlow launches, you'll get your invite link and your Founding Member badge will be waiting in your profile."}
        </p>

        <div className="mt-10 rounded-2xl border border-forest-100 bg-white p-6 text-left text-sm shadow-sm">
          <p className="font-display text-base text-forest-600">While you're here:</p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-fog-600">
            <li>
              <Link href="/articles/how-long-does-cades-cove-take" className="text-ember-500 hover:text-ember-600">
                How long does Cades Cove take?
              </Link>
            </li>
            <li>
              <Link href="/articles/vehicle-free-wednesdays-guide" className="text-ember-500 hover:text-ember-600">
                Vehicle-Free Wednesdays guide
              </Link>
            </li>
            <li>
              <Link href="/articles/best-times-to-visit-cades-cove" className="text-ember-500 hover:text-ember-600">
                Best times to visit
              </Link>
            </li>
          </ul>
        </div>

        <p className="mt-10 text-sm text-fog-600">
          Know someone planning a Cades Cove trip?{' '}
          <Link href="/" className="text-ember-500 hover:text-ember-600">
            Send them here.
          </Link>
        </p>
      </main>
      <Footer />
    </>
  );
}

export const metadata = {
  title: "You're in",
  description: "You're a Founding Cove Insider. Here's what happens next.",
  robots: { index: false, follow: false },
};
