/**
 * The Menu sheet's search index, written to search-index.json at build time.
 * Pages and their sections get the words owners actually use, so "tenant not
 * paying" finds eviction help and "how much" finds the calculator.
 */
import { site, url } from '../site'
import type { Route } from '../types'

type Kind = 'Page' | 'Section' | 'Live site'
type Entry = { t: string; u: string; k: string; d: string; y: Kind }

const words: Record<string, { t: string; k: string }> = {
  '': { t: 'Home', k: 'home olh ontario landlord help property management' },
  'pricing/': { t: 'Pricing calculator', k: 'price prices pricing cost costs how much monthly fee plan plans calculator quote portfolio per unit tenancy' },
  'landlord-shield/': { t: 'OLH Landlord Shield', k: 'shield self manage self-manage diy software team behind you 49 month-to-month' },
  'legal/': { t: 'Legal help and the Legal Guarantee', k: 'legal paralegal guarantee ltb board hearing eviction evict lawyer member case representation' },
  'rentals/': { t: 'Rentals and leasing', k: 'rentals rent apartment house condo listings available find tenant placement mls realtor list it' },
  'property-management/': { t: 'Property Management', k: 'property management manager full service run day to day rent collection maintenance switch switching owner portal' },
  'owners/': { t: 'Owners, by situation', k: 'condo student students guarantor first time first-time new landlord overseas abroad non-resident nr4 nr6 out of province' },
  'buildings/': { t: 'Apartment buildings', k: 'apartment building multifamily multi-unit distressed stabilization lease-up agi above guideline due diligence' },
  'projects/': { t: 'Renovations and restoration', k: 'renovation repair repairs project contractor emergency restoration flood fire water damage permit' },
  'about/': { t: 'Why OLH', k: 'about company paul rouillard founder reviews compare why licensed paralegal brokerage realtor referral' },
  'contact/': { t: 'Contact and service areas', k: 'contact phone call email book hours address windsor cities locations service areas toronto ottawa london hamilton' },
  'resources/': { t: 'Free resources', k: 'resources free help guides forms downloads videos law library tools community' },
  'sireg/': { t: 'SIREG owners', k: 'sireg simple investor owner centre registry condominium' },
  'guides/evictions/': { t: 'Evicting a tenant in Ontario', k: 'evict eviction tenant not paying how long process steps l1 l2 sheriff hearing' },
  'guides/ltb-forms/': { t: 'LTB forms and notices', k: 'ltb forms form notice n4 n5 n12 n13 n1 l1 l2 t2 which form serve' },
  'guides/rent-increases/': { t: 'Raising the rent', k: 'rent increase raise guideline n1 2027 above guideline l5 deposit interest' },
  'guides/bill-60/': { t: 'Bill 60 changes', k: 'bill 60 changes new rules 2026 7 day n4 n12 compensation' },
}

const sections: Entry[] = [
  { t: 'Serve an N4 yourself', u: url('landlord-shield/#n4'), k: 'n4 notice tenant not paying non-payment arrears late rent', d: 'LandlordEzy fills the official N4 from your rent ledger.', y: 'Section' },
  { t: 'N1 rent increase', u: url('landlord-shield/#n4'), k: 'n1 rent increase raise rent guideline', d: 'New rent and the earliest legal date, pre-filled.', y: 'Section' },
  { t: 'The LandlordEzy Automation Suite', u: url('landlord-shield/#suite'), k: 'software suite landlordezy tools ledger lease inspection maintenance messaging', d: 'Everything included in your own account.', y: 'Section' },
  { t: 'Equifax rent reporting', u: url('landlord-shield/#reporting'), k: 'equifax rent reporting credit build credit score delinquency', d: 'On-time rent reported every month.', y: 'Section' },
  { t: 'Shield vs Legal Guarantee', u: url('legal/#compare'), k: 'compare member case difference shield guarantee which', d: 'Member legal access, or the Legal Guarantee.', y: 'Section' },
  { t: 'Standalone eviction help', u: url('legal/#eviction'), k: 'eviction evict existing problem already tenant not paying l1 1495', d: 'From $1,495 + HST and disbursements, through one hearing.', y: 'Section' },
  { t: 'Local visits', u: url('pricing/#visits'), k: 'visit visits site visit inspection attend local care photos urgent after-hours', d: 'Booked when you need them, at a set price.', y: 'Section' },
  { t: 'Compare the three plans', u: url('pricing/#included'), k: 'property management included full service manage day to day', d: 'Rent, statements, arrears, tenants and maintenance.', y: 'Section' },
  { t: 'Terms in plain words', u: url('pricing/#terms'), k: 'cancel cancellation contract term notice 90 days vacant leaving price hold', d: 'Month-to-month, or 90 days then 30 days’ notice.', y: 'Section' },
  { t: 'Tenant placement prices', u: url('rentals/#leasing'), k: 'tenant placement listing mls realtor 549 749 full service find tenant', d: 'Basic, Premium and full-service placement.', y: 'Section' },
      { t: 'SIREG Owner Centre (live)', u: site.live.sireg, k: 'sireg simple investor owner centre registry town hall', d: 'Dated updates, videos and the free owner registry.', y: 'Live site' },
  { t: 'Meet Paul J. Rouillard', u: site.live.paul, k: 'paul rouillard founder about who', d: 'On ontariolandlordhelp.ca.', y: 'Live site' },
]

export function searchIndex(routes: Route[]): Entry[] {
  const pages = routes
    .filter((r) => !r.noindex)
    .map((r) => {
      const w = words[r.path]
      if (!w) throw new Error(`Search index: add words for "${r.path}" in src/content/search.ts`)
      return { t: w.t, u: url(r.path), k: w.k, d: r.description, y: 'Page' as Kind }
    })
  return [...pages, ...sections]
}
