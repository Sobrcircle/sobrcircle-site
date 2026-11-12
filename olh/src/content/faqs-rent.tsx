/**
 * FAQ for the rent increases guide (guides/rent-increases/). From the old
 * ontario-rent-increase-guideline page, plus the deposits and N1 help articles.
 */
import type { QA } from '../components/ui'
import { url } from '../site'

export const rentFaqs: QA[] = [
  {
    q: 'What is the 2027 rent increase guideline?',
    a: '1.9%, for increases that take effect during 2027. Because an N1 needs at least 90 days’ notice, an N1 served now takes effect in 2027 at the earliest, so 1.9% is the figure to use.',
  },
  {
    q: 'What was the 2026 guideline?',
    a: '2.1%, for increases that took effect during 2026. The guideline was 2.5% in both 2025 and 2024.',
  },
  {
    q: 'How much can I raise the rent?',
    a: 'For most units, no more than the guideline, once every 12 months, after a written N1 served at least 90 days ahead. On $2,000 a month, 1.9% is $38, for a new rent of $2,038.',
  },
  {
    q: 'How much notice do I need to give?',
    a: 'At least 90 days’ written notice on the official N1 form. Rent can only go up once every 12 months, and not in a tenant’s first 12 months.',
  },
  {
    q: 'Which units are exempt from the guideline?',
    a: 'Units first occupied after November 15, 2018 are generally exempt from the cap. They’re served an N2 rather than an N1, and the 90-day and 12-month rules still apply. Some care homes and social housing follow separate rules.',
  },
  {
    q: 'Can I raise the rent above the guideline?',
    a: 'Only with LTB approval, through an above-guideline increase application (L5), for major capital work or extraordinary municipal tax or utility cost increases. These are contested. A paralegal can tell you whether your costs qualify.',
  },
  {
    q: 'Do I owe interest on last month’s rent?',
    a: 'Yes. You pay the tenant interest on the rent deposit each year, at the guideline rate. The deposit can be topped up to the new rent when an increase takes effect.',
  },
  {
    q: 'Can LandlordEzy prepare the N1 for me?',
    a: (
      <>
        Yes, on <a href={url('landlord-shield/#n4')}>Landlord Shield</a>. It pre-fills the guideline, the new rent and the earliest
        legal effective date, and fills the official N1 for you to e-sign and serve. Once served, the increase applies to your rent
        ledger on the effective date. The software doesn’t guarantee a notice is valid; check the current guideline and any
        exemption before you serve.
      </>
    ),
    aText:
      'Yes, on Landlord Shield. It pre-fills the guideline, the new rent and the earliest legal effective date, and fills the official N1 for you to e-sign and serve. Once served, the increase applies to your rent ledger on the effective date. The software doesn’t guarantee a notice is valid; check the current guideline and any exemption before you serve.',
  },
]
