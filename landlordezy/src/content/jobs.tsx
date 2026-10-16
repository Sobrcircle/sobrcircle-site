/**
 * The six jobs landlords arrive with. They power the chips on the homepage and
 * product page, the suggestions in the Menu sheet, and "pick up where you left
 * off" (a page sets its job; the homepage highlights that chip next visit).
 */
import { FileClock, House, Scale, TrendingUp, UserSearch, Wallet } from 'lucide-react'
import type { IconType } from '../components/ui'

export type JobKey = 'collect' | 'screen' | 'n4' | 'raise' | 'list' | 'legal'

export const jobs: { key: JobKey; label: string; path: string; icon: IconType }[] = [
  { key: 'collect', label: 'Collect rent', path: 'rent-collection/', icon: Wallet },
  { key: 'screen', label: 'Screen a tenant', path: 'tenant-screening/', icon: UserSearch },
  { key: 'n4', label: 'Serve an N4', path: 'notices/', icon: FileClock },
  { key: 'raise', label: 'Raise the rent', path: 'tools/rent-increase-calculator/', icon: TrendingUp },
  { key: 'list', label: 'List a unit', path: 'listings/', icon: House },
  { key: 'legal', label: 'Get legal help', path: 'legal-help/', icon: Scale },
]

/** Which job a page belongs to, so a later homepage visit can offer to continue it. */
const jobByPath: Record<string, JobKey> = {
  'rent-collection/': 'collect',
  'rent-reporting/': 'collect',
  'tenant-screening/': 'screen',
  'notices/': 'n4',
  'tools/n4-date-calculator/': 'n4',
  'guides/n4-notice/': 'n4',
  'tools/rent-increase-calculator/': 'raise',
  'tools/rent-deposit-interest-calculator/': 'raise',
  'guides/rent-increase/': 'raise',
  'listings/': 'list',
  'legal-help/': 'legal',
  'paralegals/': 'legal',
}

export function jobForPath(path: string): JobKey | undefined {
  return jobByPath[path]
}
