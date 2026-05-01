import Image from 'next/image';
import { FoundingInsiderForm } from './FoundingInsiderForm';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-forest-50 to-cream">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-5 lg:py-28">
        <div className="lg:col-span-3">
          <h1 className="font-display text-4xl leading-tight text-forest-700 sm:text-5xl lg:text-[3.5rem]">
            Plan your Cades Cove visit around the traffic, not the other way around.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-fog-600">
            The most popular drive in the Smokies takes 1–3 hours. We'll help you pick the right
            one.
          </p>

          <div className="mt-8">
            <FoundingInsiderForm variant="collapsed" source="hero" />
            <p className="mt-3 text-xs text-fog-600">
              Free. No spam. We'll only email when there's something genuinely useful.
            </p>
          </div>
        </div>

        <div className="hidden lg:col-span-2 lg:block">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-lg">
            <Image
              src="/images/cades-cove-hero.jpg"
              alt="A wide meadow at Cades Cove with the Smoky Mountains in the distance, two visitors walking through tall summer grass"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
