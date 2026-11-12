/**
 * General questions for the Contact page. Also feeds that page's FAQPage
 * structured data. The reply promise is stated once, in the page hero, so it
 * isn't repeated here.
 */
import type { QA } from '../components/ui'
import { site, url } from '../site'

export const contactFaqs: QA[] = [
  {
    q: 'Is the 15-minute call free?',
    a: 'Yes. It’s free and there’s no obligation. Tell us about your rental or your tenant problem and we’ll tell you plainly what we’d do, which plan fits, and what it costs. If we’re not the right fit, we’ll say so.',
  },
  {
    q: 'Do I need to live near Windsor?',
    a: 'No. Our head office is in Windsor, but consultations and onboarding happen by phone and video anywhere in Ontario. When something needs someone on site, such as a showing or a visit, we book it locally, subject to availability, and confirm it with you first.',
  },
  {
    q: 'My city isn’t listed. Can you still help?',
    a: (
      <>
        Possibly. The list covers the cities we name today, and we work with landlords across Ontario. <a href={site.live.book}>Book a call</a>{' '}
        and tell us where the property is; we’ll tell you honestly what we can cover there.
      </>
    ),
    aText:
      'Possibly. The list covers the cities we name today, and we work with landlords across Ontario. Book a call and tell us where the property is; we’ll tell you honestly what we can cover there.',
  },
  {
    q: 'I have an urgent LTB deadline. What should I do?',
    a: (
      <>
        Book a call or email us, and put the deadline in your message so we can prioritise it. During office hours you can also call
        or text {site.phone.display}. <a href={url('legal/#eviction')}>Eviction help</a>
      </>
    ),
    aText: `Book a call or email us, and put the deadline in your message so we can prioritise it. During office hours you can also call or text ${site.phone.display}.`,
  },
  {
    q: 'What should I send by email?',
    a: `Email ${site.email} is best for documents and questions that aren’t urgent: your lease, a notice you’ve received or served, your current manager’s agreement, or a rent ledger. Include the property address.`,
  },
]
