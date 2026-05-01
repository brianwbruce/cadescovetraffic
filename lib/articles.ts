// Article metadata for the homepage preview and articles index.
// In M4 these are sourced from MDX frontmatter; for now they're hand-authored
// stubs so the homepage previews and internal links all resolve.

export type ArticleSummary = {
  slug: string;
  title: string;
  excerpt: string;
  readTime: string;
  publishDate: string;
  updatedDate: string;
};

export const ARTICLES: ArticleSummary[] = [
  {
    slug: 'how-long-does-cades-cove-take',
    title: 'How long does Cades Cove take?',
    excerpt:
      "The honest answer: 1–3 hours, but it can stretch to 4 on a busy summer Saturday. Here's how to predict your day.",
    readTime: '6 min read',
    publishDate: '2026-04-01',
    updatedDate: '2026-04-30',
  },
  {
    slug: 'vehicle-free-wednesdays-guide',
    title: 'Vehicle-Free Wednesdays: the complete guide',
    excerpt:
      'Walk or bike the 11-mile loop without a single car. Why it matters, when it happens, and what to bring.',
    readTime: '9 min read',
    publishDate: '2026-04-05',
    updatedDate: '2026-04-30',
  },
  {
    slug: 'best-times-to-visit-cades-cove',
    title: 'Best times to visit Cades Cove',
    excerpt:
      'Hour-by-hour traffic patterns by season. The locals\' rules for picking a good window.',
    readTime: '7 min read',
    publishDate: '2026-04-10',
    updatedDate: '2026-04-30',
  },
  {
    slug: 'cades-cove-survival-guide',
    title: 'The Cades Cove survival guide',
    excerpt: 'Tactical playbook: what to bring, where to bail out, how to handle bear jams.',
    readTime: '6 min read',
    publishDate: '2026-04-15',
    updatedDate: '2026-04-30',
  },
  {
    slug: 'how-to-avoid-crowds',
    title: 'How to avoid Cades Cove crowds',
    excerpt:
      "A local's perspective on the windows, side roads, and lesser-known spots that locals use.",
    readTime: '5 min read',
    publishDate: '2026-04-20',
    updatedDate: '2026-04-30',
  },
  {
    slug: 'is-cades-cove-worth-it',
    title: 'Is Cades Cove worth it?',
    excerpt: "An honest take. When yes, when no, and what's worth doing instead on a bad day.",
    readTime: '5 min read',
    publishDate: '2026-04-25',
    updatedDate: '2026-04-30',
  },
];

export function getArticle(slug: string): ArticleSummary | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}
