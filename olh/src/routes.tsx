import type { Route } from './types'
import { abs, site } from './site'
import { organizationId } from './document'
import { faqSchema } from './schema'
import { homeFaqs, legalFaqs, pricingFaqs, shieldFaqs } from './content/faqs'
import { tariff } from './content/pricing'
import { Home } from './pages/Home'
import { Pricing } from './pages/Pricing'
import { Shield } from './pages/Shield'
import { Legal } from './pages/Legal'
import { Rentals } from './pages/Rentals'
import { NotFound } from './pages/NotFound'

/** The three plans as Offers, priced from the same tariff the calculator uses. */
const service = {
  '@type': 'Service',
  name: 'Ontario property management and landlord legal help',
  serviceType: 'Property management',
  provider: { '@id': organizationId },
  areaServed: { '@type': 'AdministrativeArea', name: 'Ontario, Canada' },
  offers: [
    { '@type': 'Offer', name: 'OLH Landlord Shield', price: String(tariff.shield.first), priceCurrency: 'CAD', description: 'Monthly, plus HST. Each additional tenancy $29.' },
    { '@type': 'Offer', name: 'Property Management', price: String(tariff.management.condo.first), priceCurrency: 'CAD', description: 'Monthly, plus HST, for one condo or apartment tenancy.' },
    { '@type': 'Offer', name: 'Property Management + Legal Guarantee', price: String(tariff.management.condo.first + 50), priceCurrency: 'CAD', description: 'Monthly, plus HST, for one condo or apartment tenancy.' },
  ],
}

export const routes: Route[] = [
  {
    path: '',
    title: 'Ontario Property Management with Legal Help | OLH',
    description:
      'Self-manage with OLH Landlord Shield from $49 a month, or let us run it from $99. LandlordEzy software, a checked rent ledger and licensed paralegals on the team.',
    Page: Home,
    schema: [service, faqSchema(homeFaqs)],
    ogImage: 'og/home.png',
  },
  {
    path: 'pricing/',
    title: 'Pricing: One Monthly Total for Your Portfolio | OLH',
    description:
      'Price 1 to 10 tenancies in seconds: Landlord Shield from $49, Property Management from $99, with the Legal Guarantee from $149. CAD, plus HST.',
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
      'The LandlordEzy Automation Suite, N4 and N1 in your own account, Equifax rent reporting, a monthly ledger check and a paralegal to talk to. From $49 a month.',
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
]

export const notFound: Route = {
  path: '404',
  title: 'Page not found | OLH',
  description: `This page isn’t part of the OLH design preview. The live site is ${site.live.home}.`,
  Page: NotFound,
  noindex: true,
}
