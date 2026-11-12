/**
 * OLH next to a typical Ontario property manager, from the old compare page,
 * with the fee rows rewritten for the November 2026 plans. The "typical" column
 * describes the common market model and is illustrative only; the page says so.
 *
 * Dropped from the old table: "a licensed paralegal serves your N4 the day rent
 * is missed", "improved weekly", "measurably improves on-time payment", the
 * Rent Guarantee row (separate product, pending legal review) and the old
 * $139/$199 prices.
 */
import { site } from '../site'
import { $ } from './pricing'

export type CompareRow = { row: string; typical: string; olh: string }

export const compareRows: CompareRow[] = [
  {
    row: 'Monthly fee',
    typical: 'A percentage of rent, commonly 8–12%',
    olh: `Flat: Property Management from ${$.management} a month, whatever the rent`,
  },
  { row: 'When your rent goes up', typical: 'Their fee goes up with it', olh: 'Your fee doesn’t follow your rent' },
  {
    row: 'LTB representation',
    typical: 'Usually referred out, and you pay a paralegal separately',
    olh: `Licensed paralegals on the same team. Eligible new LTB work included on the Legal Guarantee, ${$.legalStep} a month more`,
  },
  { row: 'Late rent', typical: 'Varies by company', olh: 'Arrears follow-up and the N4 process, part of the plan' },
  {
    row: 'Finding a tenant',
    typical: 'One month’s rent, or a referral to a realtor',
    olh: `Our own brokerage: listings from ${$.basicListing}, or ${$.realtorListing} a month on tap for management clients`,
  },
  {
    row: 'Tenant screening',
    typical: 'A credit report from an outside reseller',
    olh: `Equifax credit, income and ID checks, and a search of ${site.proof.ltbOrders} LTB orders`,
  },
  { row: 'Software', typical: 'Rented from an outside vendor', olh: 'LandlordEzy, which we built and own' },
  { row: 'What you can see', typical: 'A monthly summary', olh: 'A live owner portal: ledger, statements, repairs' },
  { row: 'Proof a repair happened', typical: 'An invoice', olh: 'Photo or video proof on the work order' },
  { row: 'Rent reporting to Equifax', typical: 'Rarely offered', olh: 'Included, under the program’s consent rules' },
  { row: 'Repair spending', typical: 'Markups are common and not always shown', olh: 'Invoices passed through; an approval limit you set' },
  { row: 'Setup fee', typical: 'Often charged', olh: 'None' },
]
