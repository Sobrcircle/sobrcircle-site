/**
 * SIREG hub questions. Wording follows the live Owner Centre's own caveats;
 * nothing here restates the proceedings or any dated figure.
 */
import type { QA } from '../components/ui'
import { live, url } from '../site'

const lso = 'https://lso.ca/public-resources/finding-a-lawyer-or-paralegal/law-society-referral-service'

export const siregFaqs: QA[] = [
  {
    q: 'Do I have to hire OLH to use the registry, the initiative or the updates?',
    a: 'No. Registering, owner groups, the updates, the videos and Connect My Unit are free and don’t require hiring OLH. Registering is not a retainer, a proxy, a vote or a payment, and it doesn’t make anyone an OLH client.',
  },
  {
    q: 'Is any of this legal advice?',
    a: (
      <>
        No. Everything on these pages is general information. For advice about your own agreement or situation, speak with your own
        lawyer. The <a href={lso}>Law Society Referral Service</a> can help you find one.
      </>
    ),
    aText:
      'No. Everything on these pages is general information. For advice about your own agreement or situation, speak with your own lawyer. The Law Society Referral Service can help you find one.',
  },
  {
    q: 'I rent one of these units. Should I change where I pay rent?',
    a: 'Don’t change how or where you pay rent because of a public post, a video or a group comment. Act only on verified written information for your own unit. OLH does not tell any tenant to change where rent is paid, and a match on Connect My Unit is not permission for anyone to collect rent.',
  },
  {
    q: 'I already signed up with OLH. Which terms apply to me?',
    a: (
      <>
        The terms of the agreement you signed. Existing owner arrangements keep their own terms. For OLH’s current plans and prices,
        see <a href={url('pricing/')}>pricing</a>.
      </>
    ),
    aText:
      'The terms of the agreement you signed. Existing owner arrangements keep their own terms. For OLH’s current plans and prices, see pricing.',
  },
  {
    q: 'Where is the latest news?',
    a: (
      <>
        In the <a href={live('/sireg-investors#updates')}>dated updates</a> on the live Owner Centre, newest first, with official
        sources. We keep it there so there is one record, and we don’t repeat it on this page.
      </>
    ),
    aText:
      'In the dated updates on the live Owner Centre, newest first, with official sources. We keep it there so there is one record, and we don’t repeat it on this page.',
  },
]
