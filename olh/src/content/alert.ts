/**
 * The slim rule-change line under the header. Change it when the rules change;
 * set it to null to hide it.
 */
import { site } from '../site'

export const alert: { label: string; text: string; link: { label: string; href: string } } | null = {
  label: 'Bill 60',
  text: 'An N4 now gives 7 days.',
  link: { label: 'What changed', href: site.live.bill60 },
}
