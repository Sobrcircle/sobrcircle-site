/**
 * Resources hub questions, from the old Self-Help Centre FAQ, tightened.
 * Also feeds the page's FAQPage structured data (aText where `a` has links).
 */
import type { QA } from '../components/ui'
import { live, site, url } from '../site'

export const resourcesFaqs: QA[] = [
  {
    q: 'Is all of this free?',
    a: (
      <>
        Yes. The guides, the Ontario Law Library, the form walkthroughs and the templates are free. The{' '}
        <a href={live('/downloads')}>download centre</a> asks for your first name and email once, then every document is a click
        away.
      </>
    ),
    aText:
      'Yes. The guides, the Ontario Law Library, the form walkthroughs and the templates are free. The download centre asks for your first name and email once, then every document is a click away.',
  },
  {
    q: 'Do these guides replace a paralegal?',
    a: (
      <>
        No. The guides are general information about Ontario residential tenancy law, not legal advice on your file. Self-help works
        for most landlords. If you have a non-paying tenant, a complicated Board matter or an eviction that has gone sideways,{' '}
        <a href={site.live.book}>book a 15-minute call</a> with our team.
      </>
    ),
    aText:
      'No. The guides are general information about Ontario residential tenancy law, not legal advice on your file. Self-help works for most landlords. If you have a non-paying tenant, a complicated Board matter or an eviction that has gone sideways, book a 15-minute call with our team.',
  },
  {
    q: 'Are the forms the current versions?',
    a: (
      <>
        Some Landlord and Tenant Board forms were reissued in September 2026, including the N4, N5, N12, L1 and L2. Before you serve
        or file, check the version against the form on the <a href="https://tribunalsontario.ca/ltb/">LTB’s own site</a>. The{' '}
        <a href={url('guides/bill-60/')}>Bill 60 guide</a> lists what changed.
      </>
    ),
    aText:
      'Some Landlord and Tenant Board forms were reissued in September 2026, including the N4, N5, N12, L1 and L2. Before you serve or file, check the version against the form on the LTB’s own site. The Bill 60 guide lists what changed.',
  },
  {
    q: 'Where do I read the actual law?',
    a: (
      <>
        In the <a href={live('/ontario-law')}>Ontario Law Library</a>: the Residential Tenancies Act section by section, its two main
        regulations, the Statutory Powers Procedure Act and the Human Rights Code, with plain-English summaries on the most-read
        sections.
      </>
    ),
    aText:
      'In the Ontario Law Library: the Residential Tenancies Act section by section, its two main regulations, the Statutory Powers Procedure Act and the Human Rights Code, with plain-English summaries on the most-read sections.',
  },
  {
    q: 'Where do I find the link for my LTB hearing?',
    a: (
      <>
        On your own Notice of Hearing. The link, meeting ID or dial-in number is unique to your case, and we don’t publish hearing
        links. If you can’t find it, contact the Board before your hearing date. The{' '}
        <a href={url('guides/evictions/#steps')}>evictions guide</a> covers how to prepare.
      </>
    ),
    aText:
      'On your own Notice of Hearing. The link, meeting ID or dial-in number is unique to your case, and we don’t publish hearing links. If you can’t find it, contact the Board before your hearing date. The evictions guide covers how to prepare.',
  },
  {
    q: 'I use LandlordEzy. Where are the how-to articles?',
    a: (
      <>
        In the <a href={live('/help')}>LandlordEzy help centre</a>. It has step-by-step articles for owners, tenants and property
        managers using the software: setting up units and tenants, leases, screening, the rent ledger, notices and billing.
      </>
    ),
    aText:
      'In the LandlordEzy help centre. It has step-by-step articles for owners, tenants and property managers using the software: setting up units and tenants, leases, screening, the rent ledger, notices and billing.',
  },
]
