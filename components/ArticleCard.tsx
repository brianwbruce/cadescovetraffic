import Link from 'next/link';
import type { ArticleSummary } from '@/lib/articles';

export function ArticleCard({ article }: { article: ArticleSummary }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-forest-100 bg-white p-6 shadow-sm transition hover:border-forest-400 hover:shadow-md"
    >
      <h3 className="font-display text-xl text-forest-600 group-hover:text-forest-700">
        {article.title}
      </h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-fog-600">{article.excerpt}</p>
      <div className="mt-4 flex items-center justify-between text-xs text-fog-400">
        <span>{article.readTime}</span>
        <span aria-hidden className="text-ember-500">
          Read →
        </span>
      </div>
    </Link>
  );
}
