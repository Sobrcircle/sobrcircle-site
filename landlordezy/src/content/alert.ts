/**
 * The slim rule-change line under the header. Change it when the rules change;
 * set it to null to hide it. It is not shown on the page it links to.
 */
export const alert: { label: string; text: string; link: { label: string; path: string } } | null = {
  label: 'New',
  text: 'An N4 now gives 7 days (Bill 60).',
  link: { label: 'What changed', path: 'guides/bill-60/' },
}
