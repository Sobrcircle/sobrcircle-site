import type { Route } from './types'
import { abs, site } from './site'
import { organizationId } from './document'
import { faqSchema } from './schema'
import { homeFaqs, legalFaqs, pricingFaqs, shieldFaqs } from './content/faqs'
import { $, plans } from './content/pricing'
import { Home } from './pages/Home'
import { Pricing } from './pages/Pricing'
import { Shield } from './pages/Shield'
import { Legal } from './pages/Legal'
import { Rentals } from './pages/Rentals'
import { NotFound } from './pages/NotFound'
import { PropertyManagement } from './pages/PropertyManagement'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { managementFaqs } from './content/faqs-property-management'
import { aboutFaqs } from './content/faqs-about'
import { contactFaqs } from './content/faqs-contact'
import { Resources } from './pages/Resources'
import { Sireg } from './pages/Sireg'
import { GuideEvictions } from './pages/GuideEvictions'
import { resourcesFaqs } from './content/faqs-resources'
import { siregFaqs } from './content/faqs-sireg'
import { evictionFaqs } from './content/faqs-evictions'
import { Owners } from './pages/Owners'
import { Buildings } from './pages/Buildings'
import { Projects } from './pages/Projects'
import { ownerFaqs } from './content/faqs-owners'
import { buildingFaqs } from './content/faqs-buildings'
import { projectFaqs } from './content/faqs-projects'
import { GuideForms } from './pages/GuideForms'
import { GuideRent } from './pages/GuideRent'
import { GuideBill60 } from './pages/GuideBill60'
import { formsFaqs } from './content/faqs-forms'
import { rentFaqs } from './content/faqs-rent'
import { bill60Faqs } from './content/faqs-bill60'

/** The three plans as Offers, priced from the same tariff the calculator uses. */
const service = {
  '@type': 'Service',
  name: 'Ontario property management and landlord legal help',
  serviceType: 'Property management',
  provider: { '@id': organizationId },
  areaServed: { '@type': 'AdministrativeArea', name: 'Ontario, Canada' },
  offers: plans.map((p) => ({ '@type': 'Offer', name: p.name, price: String(p.from), priceCurrency: 'CAD', description: `Monthly, plus HST, for the first tenancy. $${p.more} for each additional tenancy.` })),
}

export const routes: Route[] = [
  {
    path: '',
    title: 'Ontario Property Management with Legal Help | OLH',
    description:
      `Self-manage with OLH Landlord Shield from ${$.shield} a month, or let us run it from ${$.management}. LandlordEzy software, a checked rent ledger and licensed paralegals on the team.`,
    Page: Home,
    schema: [service, faqSchema(homeFaqs)],
    ogImage: 'og/home.png',
  },
  {
    path: 'pricing/',
    title: 'Pricing: One Monthly Total for Your Portfolio | OLH',
    description:
      `Price 1 to 10 tenancies in seconds: Landlord Shield from ${$.shield}, Property Management from ${$.management}, with the Legal Guarantee from ${$.guarantee}. CAD, plus HST.`,
    Page: Pricing,
    crumbs: [{ name: 'Pricing', path: 'pricing/' }],
    hideCrumbs: true,
    schema: [service, faqSchema(pricingFaqs)],
    ogImage: 'og/pricing.png',
  },
  {
    path: 'landlord-shield/',
    title: 'OLH Landlord Shield: Self-Manage with a Team | OLH',
    description:
      `The LandlordEzy Automation Suite, N4 and N1 in your own account, Equifax rent reporting, a monthly ledger check and a paralegal to talk to. From ${$.shield} a month.`,
    Page: Shield,
    crumbs: [{ name: 'Landlord Shield', path: 'landlord-shield/' }],
    hideCrumbs: true,
    schema: [faqSchema(shieldFaqs)],
    ogImage: 'og/landlord-shield.png',
  },
  {
    path: 'legal/',
    title: 'Landlord Legal Help & the Legal Guarantee | OLH',
    description:
      'Licensed paralegals on the same team: member legal access, the Legal Guarantee for every enrolled unit, or standalone eviction help from $1,495.',
    Page: Legal,
    crumbs: [{ name: 'Legal help', path: 'legal/' }],
    hideCrumbs: true,
    schema: [faqSchema(legalFaqs)],
    ogImage: 'og/legal.png',
  },
  {
    path: 'rentals/',
    title: 'Ontario Rentals & Tenant Placement | OLH',
    description:
      'Homes for rent and for sale on OLH’s platforms, and tenant placement through List It Realty: MLS® listings from $549, or full service for one month’s rent.',
    Page: Rentals,
    crumbs: [{ name: 'Rentals', path: 'rentals/' }],
    hideCrumbs: true,
    schema: [{ '@type': 'CollectionPage', url: abs('rentals/'), about: { '@id': organizationId } }],
    ogImage: 'og/rentals.png',
  },
  {
    path: 'property-management/',
    title: 'Property Management in Ontario, Flat Monthly Fee | OLH',
    description: `Flat monthly property management for Ontario landlords from ${$.management}. Rent paid out once it clears, repairs with photo proof, licensed paralegals on the team.`,
    Page: PropertyManagement,
    crumbs: [{ name: 'Property Management', path: 'property-management/' }],
    hideCrumbs: true,
    schema: [faqSchema(managementFaqs)],
    ogImage: 'og/property-management.png',
  },
  {
    path: 'owners/',
    title: 'Condo, student, first-time and non-resident owners | OLH',
    description:
      'Help for Ontario condo owners, student rentals, first-time landlords and owners living abroad: what’s different, what we do, and which plan fits.',
    Page: Owners,
    crumbs: [{ name: 'Owners', path: 'owners/' }],
    hideCrumbs: true,
    schema: [faqSchema(ownerFaqs)],
    ogImage: 'og/owners.png',
  },
  {
    path: 'buildings/',
    title: 'Apartment building and multifamily management | OLH',
    description:
      'Ontario apartment building management with licensed paralegals on the team: due diligence, stabilization, lease audits, maintenance and lease-up.',
    Page: Buildings,
    crumbs: [{ name: 'Apartment buildings', path: 'buildings/' }],
    hideCrumbs: true,
    schema: [faqSchema(buildingFaqs)],
    ogImage: 'og/buildings.png',
  },
  {
    path: 'projects/',
    title: 'Renovations, repairs and emergency restoration | OLH',
    description:
      'We manage the project, licensed trades do the work: renovations, capital projects, permits and emergency restoration for Ontario rental owners.',
    Page: Projects,
    crumbs: [{ name: 'Renovations and restoration', path: 'projects/' }],
    hideCrumbs: true,
    schema: [faqSchema(projectFaqs)],
    ogImage: 'og/projects.png',
  },
  {
    path: 'about/',
    title: 'Why OLH: Ontario Property Management Since 2003 | OLH',
    description:
      'OLH next to a typical Ontario manager: flat fees, licensed paralegals and our own brokerage on one team. Founder Paul J. Rouillard, reviews, and how to check us.',
    Page: About,
    crumbs: [{ name: 'Why OLH', path: 'about/' }],
    hideCrumbs: true,
    schema: [{ '@type': 'AboutPage', url: abs('about/'), about: { '@id': organizationId } }, faqSchema(aboutFaqs)],
    ogImage: 'og/about.png',
  },
  {
    path: 'contact/',
    title: 'Contact OLH Property Management | Book a Free Call | OLH',
    description: `Book a free 15-minute call, call or text ${site.phone.display}, or email ${site.email}. Windsor head office, serving landlords in 49 Ontario cities.`,
    Page: Contact,
    crumbs: [{ name: 'Contact', path: 'contact/' }],
    hideCrumbs: true,
    schema: [{ '@type': 'ContactPage', url: abs('contact/'), about: { '@id': organizationId } }, faqSchema(contactFaqs)],
    ogImage: 'og/contact.png',
  },
  {
    path: 'resources/',
    title: 'Free help for Ontario landlords | OLH',
    description:
      'Free guides, LTB forms, the Ontario Law Library, tenant screening questions, a rent analysis and landlord videos, from OLH’s property managers and paralegals.',
    Page: Resources,
    crumbs: [{ name: 'Resources', path: 'resources/' }],
    hideCrumbs: true,
    schema: [faqSchema(resourcesFaqs)],
    ogImage: 'og/resources.png',
  },
  {
    path: 'guides/evictions/',
    title: 'Evicting a tenant in Ontario: step by step | OLH',
    description:
      'How to evict a tenant in Ontario: legal grounds, which notice (N4, N5, N12, N13), filing with the LTB, the hearing, enforcement, timing and costs.',
    Page: GuideEvictions,
    crumbs: [
      { name: 'Resources', path: 'resources/' },
      { name: 'Evicting a tenant', path: 'guides/evictions/' },
    ],
    hideCrumbs: true,
    schema: [faqSchema(evictionFaqs)],
    ogImage: 'og/guide-evictions.png',
    ogType: 'article',
  },
  {
    path: 'guides/ltb-forms/',
    title: 'LTB forms and notices for Ontario landlords | OLH',
    description:
      'Every LTB notice and application Ontario landlords use, in plain words: N4, N5, N12, N13, L1, L2, T5. Notice periods, deadlines, service, 2026/09 forms.',
    Page: GuideForms,
    crumbs: [
      { name: 'Resources', path: 'resources/' },
      { name: 'LTB forms and notices', path: 'guides/ltb-forms/' },
    ],
    hideCrumbs: true,
    schema: [faqSchema(formsFaqs)],
    ogImage: 'og/guide-ltb-forms.png',
    ogType: 'article',
  },
  {
    path: 'guides/rent-increases/',
    title: 'Ontario rent increase guideline and N1 rules | OLH',
    description:
      'The 2027 Ontario rent increase guideline is 1.9%. The 90-day N1 rule, once every 12 months, exempt units (N2), above-guideline L5 and deposit interest.',
    Page: GuideRent,
    crumbs: [
      { name: 'Resources', path: 'resources/' },
      { name: 'Raising the rent', path: 'guides/rent-increases/' },
    ],
    hideCrumbs: true,
    schema: [faqSchema(rentFaqs)],
    ogImage: 'og/guide-rent-increases.png',
    ogType: 'article',
  },
  {
    path: 'guides/bill-60/',
    title: 'Bill 60 Ontario: what changed for landlords | OLH',
    description:
      'Bill 60 in plain words: the 7-day N4, new 2026/09 LTB forms, the 50% arrears rule, N12 compensation at 120 days, N13 duties and new deadlines.',
    Page: GuideBill60,
    crumbs: [
      { name: 'Resources', path: 'resources/' },
      { name: 'Bill 60 changes', path: 'guides/bill-60/' },
    ],
    hideCrumbs: true,
    schema: [faqSchema(bill60Faqs)],
    ogImage: 'og/guide-bill-60.png',
    ogType: 'article',
  },
  {
    path: 'sireg/',
    title: 'SIREG and Simple Investor owners | OLH',
    description:
      'Links for SIREG and Simple Investor unit owners: the Owner Centre, registry, condo initiative, Connect My Unit and updates. Hiring OLH is optional.',
    Page: Sireg,
    crumbs: [{ name: 'SIREG owners', path: 'sireg/' }],
    hideCrumbs: true,
    schema: [faqSchema(siregFaqs)],
    ogImage: 'og/sireg.png',
  },
]

export const notFound: Route = {
  path: '404',
  title: 'Page not found | OLH',
  description: `This page isn’t part of the OLH design preview. The live site is ${site.live.home}.`,
  Page: NotFound,
  noindex: true,
}
