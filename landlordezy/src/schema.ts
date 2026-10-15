/**
 * Structured-data builders shared by routes. Kept out of component files so
 * every page module exports components only.
 */
import type { QA } from './components/ui'
import { abs, site } from './site'
import { organizationId } from './document'
import { guideBySlug } from './content/guides'

/** FAQPage JSON-LD. Google retired FAQ rich results in May 2026, but the markup
 *  still describes the page to other search engines and AI answer tools. */
export function faqSchema(items: QA[]): Record<string, unknown> {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.q,
      acceptedAnswer: { '@type': 'Answer', text: i.aText ?? (typeof i.a === 'string' ? i.a : i.q) },
    })),
  }
}

export function guideSchema(slug: string): Record<string, unknown>[] {
  const g = guideBySlug(slug)
  return [
    {
      '@type': 'Article',
      headline: g.h1,
      description: g.description,
      datePublished: site.lastReviewed,
      dateModified: site.lastReviewed,
      inLanguage: 'en-CA',
      author: { '@id': organizationId },
      publisher: { '@id': organizationId },
      mainEntityOfPage: abs(`guides/${slug}/`),
      image: abs(`og/guide-${slug}.png`),
    },
  ]
}
