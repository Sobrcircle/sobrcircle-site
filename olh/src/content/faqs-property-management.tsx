/**
 * Questions for the Property Management page. Also feeds that page's FAQPage
 * structured data, so every JSX answer carries a plain-text `aText`.
 */
import type { QA } from '../components/ui'
import { url } from '../site'
import { $ } from './pricing'

export const managementFaqs: QA[] = [
  {
    q: 'What does Property Management cost?',
    a: (
      <>
        From {$.management} a month for your first tenancy and {$.managementMore} for each additional tenancy, plus HST. It’s a flat
        monthly price, the same for any property type, and never a percentage of your rent. There’s no setup fee.{' '}
        <a href={url('pricing/')}>Price my portfolio</a>
      </>
    ),
    aText: `From ${$.management} a month for your first tenancy and ${$.managementMore} for each additional tenancy, plus HST. It’s a flat monthly price, the same for any property type, and never a percentage of your rent. There’s no setup fee.`,
  },
  {
    q: 'How do my tenants reach you, and what about emergencies?',
    a: 'Tenants message us through their LandlordEzy portal, by email or by phone, and we handle messages during office hours, Monday to Friday. Emergencies such as no heat, flooding, a lockout, or anything threatening the property or someone’s safety go to our emergency line instead of waiting for the office to open.',
  },
  {
    q: 'Are inspections included?',
    a: (
      <>
        No routine inspections are included in the monthly fee. When you want someone on site, we book a local visit at{' '}
        {$.visit} + HST: up to 45 minutes, dated photos, a standard checklist and a report in your owner portal. Every visit is
        confirmed with you first. <a href={url('pricing/#visits')}>Visit prices</a>
      </>
    ),
    aText: `No routine inspections are included in the monthly fee. When you want someone on site, we book a local visit at ${$.visit} + HST: up to 45 minutes, dated photos, a standard checklist and a report in your owner portal. Every visit is confirmed with you first.`,
  },
  {
    q: 'When do I get paid?',
    a: 'We normally start your payout the same business day the tenant’s payment has cleared and been matched to your unit, rather than holding it for a set date. When it reaches your account depends on your bank, weekends and holidays. You get a statement every month.',
  },
  {
    q: 'Do I approve repairs?',
    a: 'Yes. You set an approval limit. Routine jobs under it go ahead; anything over it comes to you with a price before work is ordered. Completed work is closed with photo or video proof in your owner portal, and the cost appears on your statement.',
  },
  {
    q: 'What happens if a tenant stops paying?',
    a: (
      <>
        We follow up on arrears and run the N4 process. If a new non-payment problem goes to the Landlord and Tenant Board, a
        qualifying case is available at the member rate from {$.memberCase} + HST and disbursements. On Property Management + Legal
        Guarantee, {$.legalStep} a month more, our paralegals’ fees on eligible new LTB matters are included.{' '}
        <a href={url('legal/#compare')}>Compare the legal options</a>
      </>
    ),
    aText: `We follow up on arrears and run the N4 process. If a new non-payment problem goes to the Landlord and Tenant Board, a qualifying case is available at the member rate from ${$.memberCase} + HST and disbursements. On Property Management + Legal Guarantee, ${$.legalStep} a month more, our paralegals’ fees on eligible new LTB matters are included.`,
  },
  {
    q: 'Can you take over mid-tenancy, or with a dispute already open?',
    a: 'Yes. Most owners come to us with tenants already in place: same lease, same rent, same rights. If an N4, N5 or LTB file is already open, we check it for validity during the handover. Taking over an existing dispute is a separate engagement, quoted before any work starts.',
  },
  {
    q: 'Can I cancel?',
    a: 'Property Management starts with a 90-day initial period, then continues month-to-month. Either side can end it with 30 calendar days’ written notice, which can be given during the initial period. When management ends we hand over records, balances and open matters properly.',
  },
]
