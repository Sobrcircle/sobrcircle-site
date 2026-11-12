/**
 * Structured-data builders shared by routes. Kept out of component files so
 * every page module exports components only.
 */
import type { QA } from './components/ui'

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
