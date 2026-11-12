/**
 * Questions for the Why OLH page: checking us, and the Realtor referral
 * program. Also feeds that page's FAQPage structured data.
 */
import type { QA } from '../components/ui'
import { site } from '../site'

export const aboutFaqs: QA[] = [
  {
    q: 'Is Paul J. Rouillard a paralegal?',
    a: 'No. Paul founded OLH and built LandlordEzy. Legal services are provided by licensed paralegals at Landlord Pro Legal Services Professional Corporation, under a separate written engagement.',
  },
  {
    q: 'How do I check your licences?',
    a: 'Search our paralegals in the Law Society of Ontario directory, and look up List It Realty Brokerage Inc. with RECO, the Real Estate Council of Ontario. Then read our Google reviews, and ask any other manager the same questions.',
  },
  {
    q: 'Realtors: will you take my client?',
    a: 'No, and it’s in the written referral agreement, signed before your first referral. It names you as your client’s Realtor of record for future sales and purchases. When a managed owner decides to sell, we tell them to call you.',
  },
  {
    q: 'Realtors: how is referral compensation handled?',
    a: 'Referral arrangements between licensed registrants have to comply with RECO and TRESA requirements, and typically run brokerage to brokerage. We walk through the structure on the setup call and put what we agree in writing before your first referral.',
  },
  {
    q: 'Realtors: can I keep the leasing?',
    a: (
      <>
        Yes. If you’d rather lease the unit yourself and refer only the ongoing management, tell us on the setup call and we’ll
        structure it that way. <a href={site.live.book}>Book the setup call</a>
      </>
    ),
    aText:
      'Yes. If you’d rather lease the unit yourself and refer only the ongoing management, tell us on the setup call and we’ll structure it that way.',
  },
]
