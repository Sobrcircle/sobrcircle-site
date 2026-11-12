/**
 * Questions for the four owner situations on /owners/. Each panel shows its own
 * list; `ownerFaqs` joins them for the page's FAQPage structured data.
 * Legal and tax answers are general information, carried over from the old
 * condo, student, first-time and non-resident pages. See the page's to-verify list.
 */
import type { QA } from '../components/ui'
import { $ } from './pricing'

export const condoFaqs: QA[] = [
  {
    q: 'Do you manage condominium corporations or condo boards?',
    a: 'No. We manage an individual condo unit for the owner who rents it out: the tenancy, the rent, the lease and the legal side. We don’t manage condominium corporations, boards, reserve funds or common elements. If you’re a board director looking for a firm to run the building itself, we’ll say so on the first call.',
  },
  {
    q: 'Who deals with the corporation’s rules, bookings and status certificates?',
    a: 'We do. We give your tenant the rules, file tenant-information forms where your corporation asks for them, book elevators for moves, track parking, lockers and fobs, and request status certificates from the corporation’s manager. Every corporation’s rules differ, so we read yours rather than assume.',
  },
  {
    q: 'Does the Residential Tenancies Act or the Condominium Act govern my tenancy?',
    a: 'Both matter. The tenancy runs under the Residential Tenancies Act like any other Ontario rental. The declaration, by-laws and rules made under the Condominium Act bind you as the owner and reach your tenant through the lease. General information, not legal advice about a specific building.',
  },
  {
    q: 'I moved and kept my condo. Can you take over mid-tenancy?',
    a: 'Yes, and it’s one of the most common files we open. We review the lease and the ledger, fix gaps in the paperwork, set your tenant up in the portal and take over rent and communication from the next cycle. A tenant dispute that already exists is taken on as a separate engagement.',
  },
]

export const studentFaqs: QA[] = [
  {
    q: 'Does a student lease end automatically in April or August?',
    a: 'No. In Ontario a fixed-term lease doesn’t end the tenancy. When the term ends it continues month to month, unless the tenant gives proper written notice and leaves or you both agree in writing to end it. Plan turnover around notice, not the calendar. General information, not legal advice.',
  },
  {
    q: 'Can a parent guarantee a student’s lease?',
    a: 'Yes. Guarantors are common and lawful in student rentals. We screen the guarantor the same way we screen the applicant, then write the guarantee into the lease at signing, so it can actually be relied on later.',
  },
  {
    q: 'What if one roommate stops paying and the others don’t?',
    a: 'It depends on how the tenancy was set up. Separate per-room tenancies are separate files; a joint lease is one tenancy with shared liability. Either way the right notice has to be served correctly, and our licensed paralegals can handle it.',
  },
  {
    q: 'How is a house rented by the room priced?',
    a: 'We quote it for your house, after a short call about how many tenancies it has and how they’re set up.',
  },
]

export const firstTimeFaqs: QA[] = [
  {
    q: 'Can I collect a damage deposit in Ontario?',
    a: 'No. You may collect a rent deposit, normally last month’s rent and no more than one rent period, with interest owed to the tenant each year, and a refundable key deposit. A separate damage or security deposit isn’t allowed, and the rent deposit goes toward the last rent period, not repairs. General information, not legal advice.',
  },
  {
    q: 'My tenant’s one-year lease is ending. Do they have to move out?',
    a: 'No. When the term ends, the tenancy continues month to month on the same terms unless you both agree to a new term or the tenant gives proper notice. Ending a tenancy needs a lawful reason and the Board’s process. Changing locks or removing belongings is illegal.',
  },
  {
    q: 'I inherited a tenant when I bought the property. What now?',
    a: 'The tenancy came with the building, along with the tenant’s rent, rights and rent-increase history. Start by finding out exactly what you inherited: the lease, the rent, the last lawful increase, the deposit and any arrears. It’s a good use of a 15-minute call.',
  },
  {
    q: 'Is the 15-minute call really free?',
    a: 'Yes. Fifteen minutes with our team, no charge and no obligation. Bring your lease, your dates and your question.',
  },
]

export const nonResidentFaqs: QA[] = [
  {
    q: 'Can I own and rent out an Ontario property while living outside Canada?',
    a: 'Yes. What changes is the paperwork and the logistics: rent paid to a non-resident owner is subject to non-resident withholding, and you can’t run showings, repairs or a hearing from another country. We act as your Ontario manager, and you watch rent, statements and repairs in your owner portal.',
  },
  {
    q: 'Who attends the Landlord and Tenant Board hearing if I live abroad?',
    a: `On Property Management + Legal Guarantee (from ${$.guarantee} a month), our licensed paralegals handle eligible new LTB matters, including hearing representation, so you don’t fly back. Filing fees and outside costs are extra. On the other plans, a qualifying new non-payment case is available at the member rate, from ${$.memberCase}.`,
  },
  {
    q: 'How do I know the repair I paid for was done?',
    a: 'Every maintenance job sits in your owner portal with photos or video of the work, next to the invoice. You look at the picture instead of taking anyone’s word for it.',
  },
  {
    q: 'I live in another province, not another country. Does any of this apply?',
    a: 'The withholding rules are for non-residents of Canada, so an owner in another province generally isn’t affected. Confirm with your accountant. Everything else applies the same way: you still can’t attend a hearing from Calgary, and you still need someone looking at the property.',
  },
]

/** Every owner question, for the page's FAQPage structured data. */
export const ownerFaqs: QA[] = [...condoFaqs, ...studentFaqs, ...firstTimeFaqs, ...nonResidentFaqs]
