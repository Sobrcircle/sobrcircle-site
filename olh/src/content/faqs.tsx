/**
 * FAQ copy, from Paul's design preview, tightened but not changed in substance.
 * Each list also feeds that page's FAQPage structured data.
 */
import type { QA } from '../components/ui'
import { site, url } from '../site'

export const homeFaqs: QA[] = [
  {
    q: 'What do I get each month?',
    a: 'OLH Landlord Shield (from $49): the LandlordEzy Automation Suite in your own account, with N4 and N1 notices, Equifax rent reporting, screening, leases and inspections, plus a rent ledger our team checks every month and a 15-minute paralegal consultation each month, while you manage your tenants. Property Management (from $99): rent administration and statements, arrears follow-up and the N4 process, tenant communication and routine maintenance coordination. Property Management + Legal Guarantee (from $149): all of that, plus our licensed paralegal team on eligible new Landlord and Tenant Board matters for every enrolled unit, with no activation fee. Prices are monthly, plus HST.',
  },
  {
    q: 'How is the monthly price worked out?',
    a: (
      <>
        Your first tenancy has a first-unit rate and every additional tenancy of the same type costs less. We count separately
        rented tenancies, not street addresses, so a duplex is two tenancies. The first-unit rate applies once per owner
        account, not once per city. <a href={url('pricing/')}>The calculator</a> prices 1 to 10 tenancies; mixed or larger
        portfolios are quoted.
      </>
    ),
    aText:
      'Your first tenancy has a first-unit rate and every additional tenancy of the same type costs less. We count separately rented tenancies, not street addresses, so a duplex is two tenancies. The first-unit rate applies once per owner account, not once per city. The calculator prices 1 to 10 tenancies; mixed or larger portfolios are quoted.',
  },
  {
    q: 'Does LandlordEzy serve or file notices for me?',
    a: 'No. With Landlord Shield you prepare N4 and N1 notices yourself in LandlordEzy, filled from your ledger, so it can take around 60 seconds when your records are accurate. Then you review, e-sign and serve them by a permitted method. There’s no OLH drafting fee for that. The software doesn’t guarantee a notice is valid or file at the LTB; professional review, service or representation is a separate paid service, or a member case for an L1 if eligible.',
  },
  {
    q: 'What does the Legal Guarantee cover?',
    a: 'Professional work by our licensed paralegal team on eligible new Landlord and Tenant Board matters for all enrolled units: notices, eligible applications including L1, evidence and disclosure, settlement, hearing representation and order review. Government fees, sheriff, process servers and approved outside costs are extra. It isn’t rent reimbursement, and no result or timeline is guaranteed.',
  },
  {
    q: 'I already have a tenant problem. Can I just upgrade?',
    a: 'A dispute that already exists isn’t absorbed by starting or upgrading a plan. We can take it on as a separate eviction engagement from $1,495 + HST and disbursements for an ordinary non-payment matter through one hearing, and you can join for the future. Landlord Shield and Property Management members whose problem began after the affected unit was enrolled may qualify for the member case rate from $995, once per owner account in any rolling 12 months.',
  },
  {
    q: 'Can I cancel?',
    a: 'It depends on the plan. OLH Landlord Shield is month-to-month from the start: cancel before your next renewal and it ends at the end of the month you’ve paid for. Property Management plans start with a 90-day initial period, then continue month-to-month; either side can end them with 30 calendar days’ written notice, which can be given during the initial period, so the earliest ordinary end date is day 90. When a plan ends we hand over records and open matters properly.',
  },
  {
    q: 'Can someone visit my property?',
    a: (
      <>
        Yes. Local visits are booked when you need them, at a set per-visit price, subject to availability and confirmed with
        you before anyone attends. Each standard visit comes with dated photos and a report in your LandlordEzy account. Visits
        aren’t part of the monthly fee. <a href={url('pricing/#visits')}>Visit prices</a>
      </>
    ),
    aText:
      'Yes. Local visits are booked when you need them, at a set per-visit price, subject to availability and confirmed with you before anyone attends. Each standard visit comes with dated photos and a report in your LandlordEzy account. Visits aren’t part of the monthly fee.',
  },
  {
    q: 'Do you find tenants too?',
    a: (
      <>
        Yes, through List It Realty Brokerage Inc.: Basic and Premium MLS® rental listings, or full-service placement for one
        month’s rent. Placement is separate from monthly management. <a href={url('rentals/#leasing')}>Leasing prices</a>
      </>
    ),
    aText:
      'Yes, through List It Realty Brokerage Inc.: Basic and Premium MLS® rental listings, or full-service placement for one month’s rent. Placement is separate from monthly management.',
  },
]

export const pricingFaqs: QA[] = [
  {
    q: 'Is the price per unit?',
    a: 'No. The calculator shows a monthly total for your whole portfolio. The first tenancy has a first-unit rate and each additional tenancy of the same type costs less.',
  },
  {
    q: 'I own a condo in Toronto and another in Ottawa. Do I pay the first-unit rate twice?',
    a: 'No. The first-unit rate applies once per owner account across Ontario. Your second condo is priced at the additional rate.',
  },
  {
    q: 'Why a flat monthly fee instead of a percentage of rent?',
    a: 'Our plans are flat monthly prices, so your fee doesn’t rise when your rent does. As a share of rent it depends on the rent: $149 for a whole house renting at $2,000 a month is about 7.45%, or about 5.96% at $2,500. We don’t bill a percentage, and we don’t claim to be the lowest price.',
  },
  {
    q: 'Why can’t I price a house and a condo together here?',
    a: (
      <>
        Mixed portfolios and 11 or more tenancies get a written quote, so we can look at the properties, locations and any local
        needs together. <a href={site.live.book}>Book a call</a> and we’ll prepare it.
      </>
    ),
    aText:
      'Mixed portfolios and 11 or more tenancies get a written quote, so we can look at the properties, locations and any local needs together. Book a call and we’ll prepare it.',
  },
  {
    q: 'Are site visits included?',
    a: 'No, visits aren’t part of the monthly fee. You can book one-off visits on any plan, and with Property Management or Property Management + Legal Guarantee you can add Planned Local Care for regular attendance. Everything is agreed before anyone attends.',
  },
  {
    q: 'Is LandlordEzy an extra cost?',
    a: 'No. LandlordEzy is included with every plan. It’s the system we use to run your rental, and you get your own owner portal.',
  },
  {
    q: 'Do you pay my condo fees?',
    a: 'No. Condo fee payment management isn’t part of any plan.',
  },
]

export const shieldFaqs: QA[] = [
  {
    q: 'Who is Landlord Shield for?',
    a: 'Owners who look after their own tenants and want proper tools and a team behind them. Tenant communication, maintenance and arrears decisions stay with you.',
  },
  {
    q: 'Does Landlord Shield collect rent for me?',
    a: 'Your tenant pays rent directly into your own bank account by Interac e-Transfer, so timing is set by your bank and the payment. LandlordEzy matches deposits to your ledger and our team checks the records. Payments made another way are recorded from records you provide.',
  },
  {
    q: 'Is Equifax rent reporting included?',
    a: 'Yes, for enrolled tenancies, with no extra reporting subscription. On-time rent can help tenants build credit history, and unpaid rent may be reported as a delinquency where the program permits, subject to its consent, accuracy and verification rules. It’s different from screening credit checks, which cost from $29.99 per report.',
  },
  {
    q: 'I’m on Property Management. Can I move to Landlord Shield instead of leaving?',
    a: 'Yes. A plan change isn’t automatic: we agree it with you in writing, including who your tenants contact from then on, which day-to-day responsibilities pass to you, and how any open matter is completed or handed over. Your software, records and rent ledger stay with you.',
  },
  {
    q: 'What if I only want the software?',
    a: (
      <>
        LandlordEzy can be used on its own, without our monthly ledger help. <a href={site.ezy.packages}>See LandlordEzy plans</a>.
        With Landlord Shield the software for your enrolled tenancies is already included, so there’s no second software bill.
      </>
    ),
    aText:
      'LandlordEzy can be used on its own, without our monthly ledger help. With Landlord Shield the software for your enrolled tenancies is already included, so there’s no second software bill.',
  },
]

export const legalFaqs: QA[] = [
  {
    q: 'What is member legal access?',
    a: 'A member benefit of Landlord Shield and Property Management: one 15-minute consultation a month with a licensed paralegal, and a member rate (from $995 + HST and disbursements) for a qualifying new non-payment case through one hearing. One per owner account in any rolling 12 months, for problems that first arise after the unit is enrolled. It isn’t a separate plan, and the member case is a paid engagement, not the Legal Guarantee.',
  },
  {
    q: 'I already have a problem. Can I join and use the member rate?',
    a: 'No. The member rate is for problems whose facts first arise after a unit’s enrollment date. There’s no waiting period, but a problem that already exists doesn’t qualify by joining, waiting or rejoining. It’s handled as a standalone engagement from $1,495 + HST and disbursements, and you can still join for the future.',
  },
  {
    q: 'Why choose the Legal Guarantee if there’s a member case rate?',
    a: 'The Legal Guarantee covers professional work on eligible new LTB matters across all your enrolled units while you’re enrolled, with no activation fee and no one-case limit. The member case rate is one discounted case per owner account in any rolling 12 months. It comes down to whether you’d rather pay when you need it, or have it arranged in advance.',
  },
  {
    q: 'Can I prepare an N4 myself?',
    a: 'Yes. LandlordEzy fills the official N4 from your ledger, so it can take around 60 seconds when your records are accurate. You review it, e-sign it and serve it by a permitted method, and LandlordEzy generates the Certificate of Service. There’s no OLH drafting fee for notices you prepare yourself.',
  },
]
