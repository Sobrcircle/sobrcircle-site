/**
 * The six reasons people arrive at OLH. They power the chips under the homepage
 * hero, the suggestions in the Menu sheet, and "pick up where you left off" (a
 * page sets its job; the homepage highlights that chip on the next visit).
 */
import { Calculator, Gavel, House, KeyRound, ShieldCheck, Users } from 'lucide-react'
import type { IconType } from '../components/ui'

export type JobKey = 'shield' | 'manage' | 'problem' | 'tenant' | 'price' | 'rent'

export const jobs: { key: JobKey; label: string; path: string; icon: IconType }[] = [
  { key: 'shield', label: 'Self-manage, with backup', path: 'landlord-shield/', icon: ShieldCheck },
  { key: 'manage', label: 'Hand over the day-to-day', path: 'pricing/#included', icon: Users },
  { key: 'problem', label: 'Tenant not paying', path: 'legal/#eviction', icon: Gavel },
  { key: 'price', label: 'Price my portfolio', path: 'pricing/', icon: Calculator },
  { key: 'tenant', label: 'Find a tenant', path: 'rentals/#leasing', icon: KeyRound },
  { key: 'rent', label: 'Find a place to rent', path: 'rentals/', icon: House },
]

/** Which job a page belongs to, so a later homepage visit can offer to continue it. */
const jobByPath: Record<string, JobKey> = {
  'landlord-shield/': 'shield',
  'pricing/': 'price',
  'legal/': 'problem',
  'rentals/': 'rent',
}

export function jobForPath(path: string): JobKey | undefined {
  return jobByPath[path]
}
