/**
 * Evictions guide questions, merged from the old how-to-evict, how-long,
 * LTB hearing and eviction help pages. No timeline is promised anywhere.
 */
import type { QA } from '../components/ui'
import { url } from '../site'

export const evictionFaqs: QA[] = [
  {
    q: 'Does the tenant have to leave when the lease ends?',
    a: 'No. In Ontario a fixed-term lease continues month to month when it ends. To end the tenancy you still need a reason the law allows, the matching notice and, if the tenant stays, an order from the Landlord and Tenant Board.',
  },
  {
    q: 'How long does an eviction take?',
    a: 'It varies, and the Board sets the schedule. The notice period is the minimum before you can apply, then you wait for a hearing date, then for the order. Contested cases take longer. The delay you can control is a restart: a defective notice or invalid service means serving again and starting the clock over.',
  },
  {
    q: 'Can I change the locks or remove the tenant’s belongings?',
    a: 'No. Changing the locks, removing belongings or shutting off utilities to force a tenant out is illegal in Ontario, even after the Board has issued an order. Only the Sheriff (the Court Enforcement Office) can carry out an eviction.',
  },
  {
    q: 'What if the tenant pays after I serve an N4?',
    a: 'If the tenant pays everything owing before the termination date on the N4, the notice is void. A partial payment, or a payment after the L1 is filed, is different: the case can often continue, but every amount has to be tracked exactly.',
  },
  {
    q: 'Can I charge a late fee?',
    a: 'No. Ontario landlords can’t charge late fees or penalties for late rent, even if the lease says so, and only unpaid rent goes on an N4. The remedies for late rent are the N4 and, for a pattern of lateness, the N8.',
  },
  {
    q: 'Can I do this without a paralegal?',
    a: 'Yes, you can represent yourself at the Board. The process is strict: one error in the notice, its service or your evidence can mean starting over. Our licensed paralegals can review your file or take it on at any stage.',
  },
  {
    q: 'Are hearings in person?',
    a: 'Most Board hearings are held by video or by phone. Your Notice of Hearing gives the format, your time and how to join; the link is unique to your case. Never rely on a hearing link from anyone other than the Board.',
  },
  {
    q: 'What if I miss my hearing?',
    a: 'The Board may go ahead without you or dismiss your application. Join early, test your sound and video, and contact the Board straight away if something goes wrong. A licensed paralegal can attend for you.',
  },
  {
    q: 'What happens after the order?',
    a: (
      <>
        The Board issues a written order with the date the tenant must leave. If the tenant stays past that date, you file the order
        with the Court Enforcement Office and the Sheriff carries out the eviction. A request to review an order has to be made within
        15 days of the order; the <a href={url('guides/bill-60/')}>Bill 60 guide</a> covers that change.
      </>
    ),
    aText:
      'The Board issues a written order with the date the tenant must leave. If the tenant stays past that date, you file the order with the Court Enforcement Office and the Sheriff carries out the eviction. A request to review an order has to be made within 15 days of the order; the Bill 60 guide covers that change.',
  },
  {
    q: 'Does a paralegal make it faster?',
    a: 'A paralegal can’t shorten the notice periods or the Board’s schedule. What they remove are the delays you control: the right notice served the right way the first time, filing as soon as the notice period ends, and complete evidence so the hearing isn’t adjourned.',
  },
]
