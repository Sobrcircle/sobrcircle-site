/**
 * FAQ for the LTB forms guide (guides/ltb-forms/). Law as the old site's form
 * pages and Bill 60 page state it; see src/content/ltb-forms.ts for sources.
 */
import type { QA } from '../components/ui'
import { url } from '../site'
import { $ } from './pricing'
import { ltbFormsUrl } from './ltb-forms'

export const formsFaqs: QA[] = [
  {
    q: 'What’s the difference between an N form, an L form and a T form?',
    a: 'An N form is a notice you serve on the tenant first. If the tenant doesn’t pay, fix the problem or leave, you file the matching L form, an application to the Landlord and Tenant Board, and a hearing is scheduled. T forms are applications a tenant files. Only the Board can order an eviction, and only the Sheriff enforces it.',
  },
  {
    q: 'Does using the wrong form matter?',
    a: 'Yes. Filing the wrong notice or application is one of the most common reasons eviction cases are delayed or dismissed at the LTB. A defective notice or bad service means serving again and restarting the clock.',
  },
  {
    q: 'Can I file the L1 before the N4’s termination date?',
    a: 'No. An L1 filed before the termination date has passed is rejected. If the tenant hasn’t paid in full, file the day after.',
  },
  {
    q: 'Can I put late fees on an N4?',
    a: 'No. Only unpaid rent goes on an N4. Late fees, NSF charges and damages don’t belong on it, and adding them can make the notice invalid.',
  },
  {
    q: 'Can I serve a notice by text message?',
    a: 'No. Text messages, voicemail, phone calls, taping the notice to the door, leaving it with a neighbour and posting it in the building are not valid service. Email works only where the tenant has given written consent to email service. Fill in a Certificate of Service the day you serve.',
  },
  {
    q: 'When can I file an L2 after an N12?',
    a: 'Right after you serve the N12. The same applies to an N13. For an N5, N6, N7 or N8, file no later than 30 days after the termination date.',
  },
  {
    q: 'How much is the LTB filing fee?',
    a: `${$.ltbFiling} per application for an L1, L2, L3, L4 or L9. For an L5, check the current fee on the LTB site. The LTB also has a Fee Waiver Request form.`,
  },
  {
    q: 'Where do I get the official forms?',
    a: (
      <>
        From the LTB’s own forms page at <a href={ltbFormsUrl} rel="noopener">tribunalsontario.ca/ltb/forms</a>. Eleven forms were
        reissued as version 2026/09 after Bill 60. On <a href={url('landlord-shield/')}>Landlord Shield</a>, LandlordEzy fills the
        N4 from your rent ledger and the N1 from your lease.
      </>
    ),
    aText:
      'From the LTB’s own forms page at tribunalsontario.ca/ltb/forms. Eleven forms were reissued as version 2026/09 after Bill 60. On Landlord Shield, LandlordEzy fills the N4 from your rent ledger and the N1 from your lease.',
  },
]
