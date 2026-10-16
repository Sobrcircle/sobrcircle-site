/**
 * The Menu sheet's search index, written to search-index.json at build time.
 * Each page gets a short name and the words landlords actually use for it, so
 * "tenant not paying" finds the N4 and "credit check" finds screening.
 */
import { url } from '../site'
import type { Route } from '../types'

type Kind = 'Page' | 'Feature' | 'Guide' | 'Calculator'

const words: Record<string, { t: string; k: string; y: Kind }> = {
  '': { t: 'Home', k: 'home landlord software ontario start', y: 'Page' },
  'product/': { t: 'Product overview', k: 'features platform everything all tools what it does', y: 'Page' },
  'pricing/': { t: 'Pricing', k: 'price prices cost costs plan plans how much subscription fee fees per door free monthly', y: 'Page' },
  'rent-collection/': { t: 'Rent collection', k: 'collect rent e-transfer etransfer interac payment payments pay receipts ledger reconcile late', y: 'Feature' },
  'tenant-screening/': {
    t: 'Tenant screening',
    k: 'screen screening credit check equifax background check applicant applicants application verify income references id',
    y: 'Feature',
  },
  'rent-reporting/': { t: 'Rent reporting', k: 'rent reporting report equifax credit build credit history on-time', y: 'Feature' },
  'notices/': {
    t: 'N4 and N1 notices',
    k: 'n4 n1 notice notices eviction evict tenant not paying non-payment unpaid arrears late rent ltb form rent increase termination',
    y: 'Feature',
  },
  'leases/': { t: 'Leases and inspections', k: 'lease leases ontario standard lease e-sign esign signature rental agreement inspection move-in move-out', y: 'Feature' },
  'listings/': {
    t: 'Listings and tenant placement',
    k: 'listing listings vacancy vacant empty advertise rent out find tenant mls realtor ezyrent kijiji marketplace showings placement',
    y: 'Feature',
  },
  'maintenance/': { t: 'Maintenance and compliance', k: 'maintenance repair repairs work order vendor vendors fire safety inspection receipts expenses calendar broadcasts', y: 'Feature' },
  'ezy-ai/': { t: 'Ezy AI assistant', k: 'ai assistant ezy letter letters draft notice entry 24-hour hour', y: 'Feature' },
  'legal-help/': { t: 'Legal help', k: 'legal help paralegal paralegals lawyer ltb hearing eviction representation guarantee board tribunal', y: 'Feature' },
  'property-managers/': {
    t: 'For property managers',
    k: 'property manager managers management company owners owner statements crm portfolio switch buildium appfolio yardi import',
    y: 'Page',
  },
  'paralegals/': { t: 'CaseBuilder for paralegals', k: 'paralegal case law ltb decisions casebuilder hearing prep research orders', y: 'Page' },
  'tools/': { t: 'Free calculators', k: 'calculator calculators free tools', y: 'Page' },
  'tools/n4-date-calculator/': { t: 'N4 termination date calculator', k: 'n4 date dates termination calculator 7 days seven how many days notice file l1', y: 'Calculator' },
  'tools/rent-increase-calculator/': { t: 'Rent increase calculator', k: 'rent increase raise how much calculator guideline 1.9 2027 2026 n1 date', y: 'Calculator' },
  'tools/rent-deposit-interest-calculator/': { t: 'Deposit interest calculator', k: 'last month rent deposit lmr interest top up topup calculator', y: 'Calculator' },
  'guides/': { t: 'Ontario landlord guides', k: 'guides guide articles learn', y: 'Page' },
  'guides/bill-60/': { t: 'Bill 60: what changed', k: 'bill 60 changes new rules law 2026 7-day n4 half arrears n12 compensation n8 persistent late payment', y: 'Guide' },
  'guides/n4-notice/': { t: 'How to serve an N4', k: 'serve n4 tenant not paying rent eviction steps l1 notice arrears', y: 'Guide' },
  'guides/rent-increase/': { t: 'Rent increases in 2027', k: 'rent increase 2027 guideline 1.9 raise n1 exempt above guideline', y: 'Guide' },
  'guides/ltb-forms/': { t: 'LTB forms explained', k: 'ltb forms form n12 n5 n8 n9 n11 l1 l2 l9 l10 landlord tenant board list', y: 'Guide' },
  'about/': { t: 'About LandlordEzy', k: 'about company founder paul rouillard story team', y: 'Page' },
  'contact/': { t: 'Contact', k: 'contact phone call email support book talk person', y: 'Page' },
  'demo/': { t: 'Live demo', k: 'demo try test drive sample', y: 'Page' },
  'faq/': { t: 'Questions', k: 'faq questions answers help', y: 'Page' },
  'trust/': { t: 'Trust and privacy', k: 'privacy security data trust consent safe', y: 'Page' },
}

export function searchIndex(routes: Route[]) {
  return routes
    .filter((r) => !r.noindex)
    .map((r) => {
      const w = words[r.path]
      if (!w) throw new Error(`Search index: add words for "${r.path}" in src/content/search.ts`)
      return { t: w.t, u: url(r.path), k: w.k, d: r.description, y: w.y }
    })
}
