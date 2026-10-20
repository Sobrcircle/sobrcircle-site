/**
 * FAQ copy, kept apart from the page components so pages export components only
 * and routes can build FAQPage structured data from the same source.
 */
import type { QA } from '../components/ui'
import { site, url } from '../site'

export const homeFaqs: QA[] = [
  {
    q: 'Is LandlordEzy really free?',
    a: 'Yes. The Free plan covers up to two tenants with rent tracking, reminders, receipts, a tenant portal, pre-screening and free listings. No credit card. Self Management starts at $9.99 a month plus $1 per door when you want automation and Equifax reporting for your whole portfolio.',
  },
  {
    q: 'Is it only for Ontario?',
    a: 'The legal tools, including N4 and N1 notices, the Ontario Standard Lease and LTB workflows, are built for Ontario’s Residential Tenancies Act. Tenant screening, Equifax credit checks and free listings work across Canada.',
  },
  {
    q: 'Does a credit check hurt an applicant’s score?',
    a: 'No. Credit checks through LandlordEzy are soft inquiries, so applicants can apply to several homes without any effect on their score.',
  },
  {
    q: 'Do I still need a property manager or a paralegal?',
    a: 'For most landlords, not for the routine work. LandlordEzy automates collecting and raising rent, reporting it, screening and the paperwork for notices. When a matter is contested, licensed paralegals are a tap away.',
  },
  {
    q: 'Is my tenants’ information safe?',
    a: 'Everything runs over encrypted connections, data is never sold, and ID images used for Reference Network verification are deleted right after review. LandlordEzy is Canadian-owned and operated.',
  },
  {
    q: 'Can someone run it for me?',
    a: 'Yes. VirtualPM Legal Shield has the team collect rent by EFT, issue notices on schedule and give you a monthly paralegal consultation, from $49 a month plus $6 per unit.',
  },
]

export const pricingFaqs: QA[] = [
  {
    q: 'What counts as a door?',
    a: 'A door is a rentable unit: a house, an apartment, a basement suite. A duplex is two doors. Self Management is $9.99 a month plus $1 for each door, so it scales with your portfolio. The Free plan counts tenants instead, and covers up to two.',
  },
  { q: 'Do I need a credit card to start?', a: 'No. The Free plan needs no card. You only enter payment details when you upgrade.' },
  { q: 'Is HST included?', a: 'No. Prices are in Canadian dollars and 13% HST is added at checkout.' },
  { q: 'Can I change my door count or cancel?', a: 'Yes. Your price adjusts automatically as your door count changes, and you can cancel anytime.' },
  {
    q: 'Who pays for tenant screening?',
    a: 'You choose. Credit checks are $29.99 each, and with Tenant Pays the applicant covers it. You can credit the fee toward the first month’s rent if you approve them.',
  },
  {
    q: 'I’m already paying through PayPal. Does anything change?',
    a: 'No. Existing PayPal subscribers stay on their current plan and billing. New subscriptions are billed through Stripe in Canadian dollars.',
  },
]

export const pmFaqs: QA[] = [
  {
    q: 'Can I manage properties for multiple owners?',
    a: 'Yes. Create a profile for each owner, assign their properties (including co-owned buildings split by percentage), set per-owner fees, generate monthly statements and invite owners to a read-only portal.',
  },
  {
    q: 'Can we switch from our current software?',
    a: 'Yes. Upload reports, spreadsheets or exports from your current system and AI builds your owners, properties, units and tenants. Concierge onboarding, where the team does the whole import with you, is $159 one time.',
  },
  {
    q: 'Does it replace our CRM and e-signature tools?',
    a: 'For property management work, yes: a lead pipeline, call recaps, AI-written follow-ups, a meeting scheduler and e-signed management agreements are built in.',
  },
  {
    q: 'How does pricing compare with U.S. platforms?',
    a: 'PM Manage is $29.99 a month plus $1 per door in Canadian dollars, with no per-payment or per-signature fees. Buildium, for comparison, starts at US$62 a month and charges per incoming EFT and per e-signature on its entry plan (as of October 2026).',
  },
  {
    q: 'Does it handle Ontario LTB notices?',
    a: 'Yes. N4 and N1 notices are generated in one click from the ledger, on the forms and rules in force on the day you serve.',
  },
]

export const n4Faqs: QA[] = [
  {
    q: 'Do I count the day I give the notice?',
    a: 'No. Count 7 days starting the day after you give the notice. If you hand it over on March 3, the earliest termination date is March 10.',
  },
  {
    q: 'What if I mail it?',
    a: 'Add five days for mail or Xpresspost before counting the 7 days. If you mail it on March 3, the earliest termination date is March 15. For courier, add one business day.',
  },
  {
    q: 'Can I tape the N4 to the door?',
    a: 'No. The LTB’s instructions say you cannot give an N4 by posting it on the door of the rental unit. Hand it over, leave it in the mailbox, slide it under the door, or send it by courier or mail.',
  },
  {
    q: 'When can I file the L1?',
    a: 'The earliest day to file is the day after the termination date, if the tenant hasn’t paid everything owing or moved out.',
  },
]

export const rentFaqs: QA[] = [
  {
    q: 'What is the rent increase guideline for 2027?',
    a: '1.9%, for increases that take effect between January 1 and December 31, 2027. It was 2.1% in 2026 and 2.5% in 2023, 2024 and 2025.',
  },
  {
    q: 'Which units are exempt from the guideline?',
    a: 'Units occupied for the first time for residential purposes after November 15, 2018 are not covered by the guideline. You still need 90 days’ written notice and 12 months between increases.',
  },
  {
    q: 'Can I increase the rent above the guideline?',
    a: 'Only with an LTB order (an above-guideline increase, Form L5) for things like major capital work or large increases in municipal taxes, or by agreement in limited cases.',
  },
  {
    q: 'What if my notice is late?',
    a: 'The increase can’t take effect until 90 days after the notice is given. The calculator shows the later date; the 12-month clock still runs from the last increase.',
  },
]

export const lmrFaqs: QA[] = [
  {
    q: 'Do I have to pay interest on a last month’s rent deposit?',
    a: 'Yes. Every year, the landlord owes interest on the deposit at the rent increase guideline in effect when the payment is due.',
  },
  {
    q: 'Can I keep the interest to top up the deposit?',
    a: 'If the rent has gone up, yes: the interest can be applied to bring the deposit up toward the new rent, and you can ask the tenant to pay any remaining difference.',
  },
  {
    q: 'What happens if I don’t pay the interest?',
    a: 'The tenant may deduct the unpaid interest from a later rent payment.',
  },
]

export const demoFaqs: QA[] = [
  { q: 'Do I have to talk to a salesperson?', a: 'No. The demo is self-serve and instant. There’s no call and no booking.' },
  { q: 'Is it free?', a: 'Completely. No credit card and nothing to install. Paid actions inside the demo, like credit checks, are simulated.' },
  { q: 'How long do I have?', a: 'Your private demo stays open for 48 hours, then deletes itself. One demo per person.' },
  { q: 'Is any real data involved?', a: 'No. Every tenant in the demo is fictional, and no real messages or documents are sent to anyone.' },
]

export const faqGroups: { title: string; items: QA[] }[] = [
  {
    title: 'Getting started',
    items: [
      { q: 'Is LandlordEzy free?', a: 'Yes. The Free plan covers up to two tenants with rent tracking, reminders, receipts, a tenant portal, pre-screening and free listings, with no credit card.' },
      { q: 'Is it only for Ontario?', a: 'The legal tools are built for Ontario’s Residential Tenancies Act and the LTB. Screening, Equifax credit checks and free listings work across Canada.' },
      { q: 'Do I need to install an app?', a: 'No. LandlordEzy works in any browser and can be added to your phone’s home screen like an app, without an app store.' },
      {
        q: 'Can I try it before signing up?',
        a: (
          <>
            Yes. The <a href={url('demo/')}>live demo</a> builds a private workspace shaped like your portfolio in about a minute, with no
            sales call.
          </>
        ),
        aText: 'Yes. The live demo builds a private workspace shaped like your portfolio in about a minute, with no sales call.',
      },
    ],
  },
  {
    title: 'Pricing and billing',
    items: [
      { q: 'How much does Self Management cost?', a: '$9.99 a month plus $1 per door, plus HST. It scales up or down automatically with your door count.' },
      { q: 'Can I cancel anytime?', a: 'Yes. There are no contracts.' },
      {
        q: 'What about property management companies?',
        a: (
          <>
            PM Free costs nothing. PM Manage is $29.99 a month plus $1 per door, and PM Growth is $129 a month plus $1 per door.{' '}
            <a href={url('property-managers/')}>See the plans for property managers</a>.
          </>
        ),
        aText: 'PM Free costs nothing. PM Manage is $29.99 a month plus $1 per door, and PM Growth is $129 a month plus $1 per door.',
      },
    ],
  },
  {
    title: 'Rent and reporting',
    items: [
      { q: 'How does automatic rent collection work?', a: 'You forward your bank’s Interac notification emails to a private LandlordEzy address. Each payment is matched to the tenant and month, receipted and reconciled. Your money never leaves your bank.' },
      { q: 'Does reporting rent to Equifax need the tenant’s consent?', a: 'Reporting on-time rent does. Reporting unpaid rent as a debt doesn’t. LandlordEzy captures and records consent for you.' },
    ],
  },
  {
    title: 'Screening',
    items: [
      { q: 'Does a credit check affect the applicant’s score?', a: 'No. Checks through LandlordEzy are soft inquiries.' },
      { q: 'Who pays for the credit check?', a: 'You choose. Checks start at $29.99, and with Tenant Pays the applicant covers it.' },
    ],
  },
  {
    title: 'Notices and legal help',
    items: [
      { q: 'Are notices up to date with Bill 60?', a: 'Yes. Notices follow the rules in force on the day you serve, including the 7-day N4 and the updated forms.' },
      { q: 'Is LandlordEzy a law firm?', a: 'No. LandlordEzy is a technology platform. Legal services are provided by Landlord Pro Legal SPC, a licensed Ontario paralegal firm.' },
      {
        q: 'Can I talk to a paralegal?',
        a: (
          <>
            Yes. <a href={site.app.book}>Book a free 15-minute strategy call</a> with the licensed paralegal team.
          </>
        ),
        aText: 'Yes. Book a free 15-minute strategy call with the licensed paralegal team.',
      },
    ],
  },
  {
    title: 'Privacy and security',
    items: [
      { q: 'Do you sell personal information?', a: 'No. LandlordEzy doesn’t sell personal information.' },
      { q: 'What happens to ID images used for verification?', a: 'For the Landlord Reference Network, ID images are deleted as soon as the team finishes verifying them.' },
      { q: 'Does LandlordEzy publish LTB orders?', a: 'No. LandlordEzy no longer publishes Landlord and Tenant Board orders. The Board publishes its own catalogue on Ontario’s open data portal.' },
    ],
  },
]
