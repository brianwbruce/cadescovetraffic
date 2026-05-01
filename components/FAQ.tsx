type FaqItem = { question: string; answer: string };

const FAQS: FaqItem[] = [
  {
    question: 'How long does Cades Cove take?',
    answer:
      "Plan on 1–3 hours for the 11-mile loop. Sunday afternoons in summer or fall can stretch to 4 hours when bear jams stack up. Pre-9am or post-4pm visits are usually closer to 90 minutes.",
  },
  {
    question: 'Is there cell service in Cades Cove?',
    answer:
      "Effectively no. Most carriers drop to nothing once you turn off Laurel Creek Road. Download offline maps before you go and let someone know your timing.",
  },
  {
    question: 'Where can I see bears?',
    answer:
      "Black bears feed in the open meadows on the north side of the loop, especially in the early morning and late evening from spring through early fall. Stay 50 yards back; never get out of your car next to one.",
  },
  {
    question: 'What time does the loop open?',
    answer:
      "The loop is open from sunrise to sunset year-round. Gates close after dark. Vehicle-free Wednesdays open to cars around 10am during the warm-weather season — check the NPS page for the current year's schedule.",
  },
  {
    question: 'Can I skip parts of the loop?',
    answer:
      "Yes — Sparks Lane (about 1.5 miles in) and Hyatt Lane (the midpoint) cut across the cove and let you exit early when traffic backs up.",
  },
  {
    question: 'Is Cades Cove worth it on a busy day?',
    answer:
      "Honestly, sometimes no. If you're stuck in heavy traffic at noon on a summer Saturday, consider Cataloochee for elk or Roaring Fork instead. Cades Cove is best when you can give it light traffic and time.",
  },
];

export function FAQ() {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <section
      aria-labelledby="faq-heading"
      className="mx-auto max-w-3xl px-6 py-20"
    >
      <h2 id="faq-heading" className="text-3xl text-forest-600 sm:text-4xl">
        Frequently asked questions
      </h2>
      <div className="mt-8 divide-y divide-forest-100 rounded-2xl border border-forest-100 bg-white">
        {FAQS.map((f) => (
          <details key={f.question} className="group p-6">
            <summary className="cursor-pointer list-none font-display text-lg text-forest-600 marker:hidden group-open:text-forest-700">
              {f.question}
            </summary>
            <p className="mt-3 text-fog-600">{f.answer}</p>
          </details>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
      />
    </section>
  );
}
