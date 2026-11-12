/**
 * LTB forms and notices, as the old ontariolandlordhelp.ca form pages state them
 * (November 2026 capture), reconciled with the Bill 60 page where they disagree.
 *
 * Where two old pages give different numbers and the Bill 60 page doesn't settle
 * it (N6 notice period, N13 compensation, the T5 deadline for an N12), no number
 * is given: the entry says to check the current form on the LTB site. Those items
 * are on the "to verify with a paralegal" list.
 *
 * `old` is the fuller page on the live site; `v2026` marks the forms the LTB
 * reissued as version 2026/09 (from the Bill 60 page).
 */
import { $ } from './pricing'

export const ltbFormsUrl = 'https://tribunalsontario.ca/ltb/forms/'

const fee = $.ltbFiling

export type LtbForm = {
  /** Anchor id on the guide page: 'n4', 'l1'. */
  id: string
  code: string
  /** The form’s name as the old site states it. */
  name: string
  for: string
  /** The key rules and numbers. */
  rules: string[]
  next: string
  /** Path of the fuller page on the live site. */
  old: string
  v2026?: boolean
}

export const notices: LtbForm[] = [
  {
    id: 'n1',
    code: 'N1',
    name: 'Notice of Rent Increase',
    for: 'Raising the rent by up to the annual guideline.',
    rules: [
      'At least 90 days’ written notice before the increase takes effect.',
      'Once every 12 months, and not in a tenant’s first 12 months.',
      'No more than the guideline unless the LTB approves an above-guideline increase (L5).',
    ],
    next: 'Nothing to file. The new rent starts on the effective date. See the rent increases guide.',
    old: '/n1-form',
  },
  {
    id: 'n2',
    code: 'N2',
    name: 'Notice of Rent Increase (Unit Partially Exempt)',
    for: 'Raising the rent on a unit exempt from the guideline, typically one first occupied after November 15, 2018.',
    rules: ['At least 90 days’ written notice is still required.', 'Once every 12 months.', 'No guideline cap applies.'],
    next: 'Nothing to file. See the rent increases guide.',
    old: '/n2-form',
  },
  {
    id: 'n4',
    code: 'N4',
    name: 'Notice to End a Tenancy Early for Non-Payment of Rent',
    for: 'Rent that is owed and overdue, in full or in part.',
    rules: [
      'Termination date at least 7 days after service for any tenancy type, for N4s served on or after September 21, 2026 (12 days by regular mail, 8 by courier).',
      'The tenant voids it by paying all rent owing on or before the termination date.',
      'Only rent goes on it: no late fees, NSF charges or damages.',
      'Use the 2026/09 version of the form.',
    ],
    next: 'Not paid in full: file an L1 the day after the termination date. Want payment without ending the tenancy: an L9.',
    old: '/n4-form-ontario',
    v2026: true,
  },
  {
    id: 'n5',
    code: 'N5',
    name: 'Notice to End Tenancy for Interfering with Others, Damage or Overcrowding',
    for: 'Substantial interference with others’ reasonable enjoyment, wilful or negligent damage, or more occupants than standards permit.',
    rules: [
      'First N5: termination date at least 20 days after service. The tenant has 7 days to correct the problem and void it.',
      'Second N5 within 6 months (and at least 7 days after the first): at least 14 days, with no chance to correct.',
      'Describe what the tenant did and what they must do to correct it.',
    ],
    next: 'Not corrected, or a second N5: file an L2 no later than 30 days after the termination date.',
    old: '/n5-notice-ontario',
    v2026: true,
  },
  {
    id: 'n6',
    code: 'N6',
    name: 'Notice to End Tenancy for Illegal Acts or Misrepresenting Income',
    for: 'An illegal act or illegal business at the property, or misrepresented income in rent-geared-to-income housing.',
    rules: [
      'No correction window: the tenant can’t void it by stopping the behaviour.',
      'Notice period: check the current N6 on the LTB site before you set the date.',
      'Police reports, charges and witness statements carry weight.',
    ],
    next: 'File an L2 no later than 30 days after the termination date.',
    old: '/n6-form',
    v2026: true,
  },
  {
    id: 'n7',
    code: 'N7',
    name: 'Notice to End Tenancy for Serious Problems in the Rental Unit or Complex',
    for: 'Seriously impaired safety, serious damage, or serious interference in a building of 3 units or fewer where the landlord also lives.',
    rules: ['Termination date at least 10 days after service.', 'No correction window.', '“Serious” is a real threshold. Ordinary disturbance or damage is an N5.'],
    next: 'File an L2 no later than 30 days after the termination date.',
    old: '/n7-notice-ontario',
  },
  {
    id: 'n8',
    code: 'N8',
    name: 'Notice to End Tenancy at the End of the Term (Persistent Late Payment)',
    for: 'A tenant who always pays, but pays late.',
    rules: [
      'At least 60 days’ notice. The termination date must be the last day of a rental period or the term.',
      'Since September 21, 2026: rent received more than 7 days late at least 3 times in any 6-month period. Payments applied to older arrears don’t count as late.',
      'No correction window, but the tenant can argue the lateness wasn’t persistent. Keep due dates and paid dates.',
    ],
    next: 'File an L2 after the notice, no later than 30 days after the termination date.',
    old: '/n8-notice-ontario',
    v2026: true,
  },
  {
    id: 'n11',
    code: 'N11',
    name: 'Agreement to End the Tenancy',
    for: 'Landlord and tenant both agree to end the tenancy on a set date.',
    rules: [
      'Both sign voluntarily. An N11 signed at lease signing as a condition of renting is generally unenforceable.',
      'Any move-out date both agree on is valid.',
      'Put any agreed terms, such as a payment to move, in writing.',
    ],
    next: 'The tenant stays past the date: file an L3 (no hearing in most cases).',
    old: '/n11-form',
  },
  {
    id: 'n12',
    code: 'N12',
    name: 'Notice to End Tenancy: Landlord, Purchaser or Family Member Requires the Unit',
    for: 'The landlord, a purchaser, or a close family member (spouse, child, parent, or a spouse’s child or parent) will live in the unit for at least one year.',
    rules: [
      'At least 60 days’ notice, ending on the last day of a rental period or the term.',
      'One month’s rent compensation, or another acceptable unit, by the termination date. Since September 21, 2026, none is owed on an own-use or family N12 giving 120 or more days. A purchaser’s N12 always owes it.',
      'Whoever moves in must do so within 60 days of the termination date, or bad faith is presumed on a T5.',
    ],
    next: 'File an L2, immediately after service if you like, with an affidavit or declaration of good-faith intent to occupy.',
    old: '/n12-notice-ontario',
    v2026: true,
  },
  {
    id: 'n13',
    code: 'N13',
    name: 'Notice to End Tenancy: Demolition, Conversion or Extensive Repairs',
    for: 'Demolition, conversion to another use, or repairs that need a building permit and a vacant unit. Cosmetic work doesn’t qualify.',
    rules: [
      'At least 120 days’ notice, ending on the last day of a rental period or the term.',
      'Compensation is required. The amount depends on the ground and the building: check the current N13 on the LTB site.',
      'Repairs or conversion: a tenant who asks in writing can move back in. Since September 21, 2026 you give a written estimated completion date, updates, a completion notice and 60 days to reoccupy.',
    ],
    next: 'File an L2, which can be filed immediately after service. Eligible capital costs may later support an L5.',
    old: '/n13-notice-ontario',
    v2026: true,
  },
]

export const landlordApps: LtbForm[] = [
  {
    id: 'l1',
    code: 'L1',
    name: 'Application to Evict a Tenant for Non-Payment of Rent and Collect Rent Owing',
    for: 'After an N4 whose termination date passed without payment in full.',
    rules: [
      'File the day after the N4 termination date, not before.',
      `Package: the L1, a copy of the N4, the Certificate of Service and the ${fee} filing fee.`,
      'The order can include arrears to the hearing date, the filing fee and daily compensation.',
      'L1s filed on or after September 21, 2026: a tenant who wants to raise their own issues must first pay at least half the arrears claimed (see Bill 60).',
    ],
    next: 'The Board schedules a hearing. Only the Sheriff enforces an eviction order.',
    old: '/l1-application',
    v2026: true,
  },
  {
    id: 'l2',
    code: 'L2',
    name: 'Application to End a Tenancy and Evict a Tenant or Collect Money',
    for: 'After an N5, N6, N7, N8, N12 or N13, and for abandonment and superintendent-unit evictions.',
    rules: [
      'No later than 30 days after the notice’s termination date. After an N12 or N13 you can file immediately after service.',
      `Package: the L2, a copy of the notice, the Certificate of Service and the ${fee} filing fee.`,
      'Can also claim compensation for damage or other money owed.',
    ],
    next: 'A hearing. For an N12, bring the declaration and proof of compensation.',
    old: '/l2-application',
    v2026: true,
  },
  {
    id: 'l3',
    code: 'L3',
    name: 'Application to End a Tenancy: Tenant Gave Notice or Agreed to Terminate',
    for: 'The tenant gave notice (N9) or signed an N11, then didn’t leave.',
    rules: ['File before the termination date or within 30 days after it.', `${fee} filing fee.`],
    next: 'Most are decided by written order without a hearing.',
    old: '/l3-application',
  },
  {
    id: 'l4',
    code: 'L4',
    name: 'Application to End a Tenancy: Tenant Failed to Meet Settlement Conditions',
    for: 'The tenant broke the conditions of a mediated settlement or a conditional LTB order.',
    rules: ['File within 30 days of the breach.', 'Record the breach exactly: dates, amounts, messages.', `${fee} filing fee.`],
    next: 'Usually decided ex parte, without a new full hearing.',
    old: '/l4-application',
  },
  {
    id: 'l5',
    code: 'L5',
    name: 'Application for an Above Guideline Rent Increase (AGI)',
    for: 'Major capital work (roof, boiler or mechanical, windows, elevators, life-safety systems) or extraordinary cost increases.',
    rules: [
      'At most 3% above the guideline a year, spread over up to 3 years if the justified increase is larger.',
      'Invoices, contracts, permits and proof of payment for every item.',
      'Filing fee: check the current fee on the LTB site.',
    ],
    next: 'Since July 1, 2026, serve the documents within 7 days of the Board’s direction and file a certificate of service within 5 days.',
    old: '/l5-application',
  },
  {
    id: 'l9',
    code: 'L9',
    name: 'Application to Collect Rent the Tenant Owes (Without Eviction)',
    for: 'A money order for arrears while the tenancy continues.',
    rules: ['No termination notice needed.', 'File while the tenant still lives in the unit. After move-out, it’s an L10.', `${fee} filing fee.`],
    next: 'The order is enforceable like a court judgment.',
    old: '/l9-application',
    v2026: true,
  },
]

export const tenantApps: LtbForm[] = [
  {
    id: 't2',
    code: 'T2',
    name: 'Tenant Application About Rights',
    for: 'A tenant alleges illegal entry, changed locks, substantial interference, withheld vital services, harassment, or disposal of property.',
    rules: [
      'The response is documentation: entry notices, communication logs, repair records and witness accounts.',
      'Context matters. Record why every entry happened.',
    ],
    next: 'A hearing. The tenant may seek a rent abatement, fines or moving costs.',
    old: '/t2-application',
  },
  {
    id: 't5',
    code: 'T5',
    name: 'Tenant Application: Notice Given in Bad Faith',
    for: 'A former tenant alleges an N12 or N13 was given in bad faith.',
    rules: [
      'After a renovation N13, the deadline is the later of 2 years after move-out or 6 months after the work finishes. For an N12, check the current T5 on the LTB site.',
      'Penalties can include up to a year of rent difference, moving and storage costs, and administrative fines.',
      'The response is proof of genuine intent: occupancy evidence, utility records, timelines, and documented changes of circumstance.',
    ],
    next: 'A hearing. The best protection starts before the N12 or N13 is served.',
    old: '/t5-application',
    v2026: true,
  },
]

/** The eleven forms the LTB reissued as version 2026/09 (Bill 60 page). */
export const reissued = ['N4', 'N5', 'N6', 'N8', 'N12', 'N13', 'L1', 'L2', 'L9', 'L10', 'T5']

/** How to serve, from the old N4 guide (the fullest version of the table). */
export const serviceMethods: { method: string; effective: string; n4: string }[] = [
  { method: 'Handed to the tenant', effective: 'The day it’s handed over', n4: '7 days' },
  { method: 'Handed to another adult in the unit', effective: 'Same day', n4: '7 days' },
  { method: 'Placed in the mailbox or mail slot', effective: 'The day it’s left where mail is normally delivered', n4: '7 days' },
  { method: 'Slid under the door', effective: 'Same as the mailbox', n4: '7 days' },
  { method: 'Courier', effective: 'The first business day after sending', n4: '8 days in total' },
  { method: 'Regular mail', effective: '5 days after mailing', n4: '12 days in total' },
  { method: 'Email, with the tenant’s written consent to email service', effective: 'The day it’s sent', n4: '7 days' },
  { method: 'Tribunals Ontario Portal, with consent', effective: 'The day it’s uploaded', n4: '7 days' },
]

export const invalidService = ['Taping it to the door', 'Leaving it with a neighbour', 'Posting it in the building', 'Text message', 'Voicemail', 'A phone call']

/** Forms that appear only as a line on the old downloads page. */
export const otherForms: [string, string][] = [
  ['N3', 'Rent or care-service charges in a care home'],
  ['N9', 'The tenant’s notice to end the tenancy'],
  ['N10', 'Agreement to increase the rent above the guideline'],
  ['N14', 'Notice to the spouse of a tenant who moved out'],
  ['N15', 'Tenant’s notice to end the tenancy early because of fear of sexual or domestic violence'],
  ['L6', 'Review of a work order'],
  ['L7', 'Transfer a care-home tenant'],
  ['L8', 'The tenant changed the locks'],
  ['L10', 'Collect money a former tenant owes'],
  ['A1', 'Whether the Act applies'],
  ['A2', 'Sublet or assignment'],
  ['A4', 'Vary a rent reduction'],
  ['S2', 'Set aside an ex parte order'],
  ['T1, T3, T4, T6, T7', 'Other tenant applications: rebate, rent reduction, N10 agreement, maintenance, suite meters'],
  ['Payment Agreement', 'Arrears repayment plans under RTA s. 206 (this form is required since July 1, 2026)'],
  ['Certificate of Service', 'Proof of how and when you served a notice'],
]
