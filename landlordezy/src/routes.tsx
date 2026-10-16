import type { Route } from './types'
import { abs, site } from './site'
import { organizationId } from './document'
import { features } from './content/features'
import { guides } from './content/guides'
import { faqSchema, guideSchema } from './schema'
import { demoFaqs, faqGroups, homeFaqs, lmrFaqs, n4Faqs, pmFaqs, pricingFaqs, rentFaqs } from './content/faqs'
import { Home } from './pages/Home'
import { Pricing } from './pages/Pricing'
import { Product } from './pages/Product'
import { FeaturePage } from './pages/FeaturePage'
import { PropertyManagers } from './pages/PropertyManagers'
import { Paralegals } from './pages/Paralegals'
import { LmrTool, N4Tool, RentTool, ToolsHub } from './pages/Tools'
import { GuideArticle, GuidesHub } from './pages/Guides'
import { About, Contact, Demo, FAQ, NotFound, Trust } from './pages/Company'

const software = {
  '@type': 'SoftwareApplication',
  name: 'LandlordEzy',
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Landlord and property management software',
  operatingSystem: 'Web, iOS, Android',
  url: abs(),
  publisher: { '@id': organizationId },
  offers: [
    { '@type': 'Offer', name: 'Free', price: '0', priceCurrency: 'CAD' },
    {
      '@type': 'Offer',
      name: 'Self Management',
      price: '9.99',
      priceCurrency: 'CAD',
      priceSpecification: [
        { '@type': 'UnitPriceSpecification', price: '9.99', priceCurrency: 'CAD', unitText: 'month', name: 'Base price' },
        { '@type': 'UnitPriceSpecification', price: '1.00', priceCurrency: 'CAD', unitText: 'door per month', name: 'Per door' },
      ],
    },
  ],
}

const tool = (name: string, path: string) => ({
  '@type': 'WebApplication',
  name,
  url: abs(path),
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  isAccessibleForFree: true,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'CAD' },
  publisher: { '@id': organizationId },
})

const featureRoutes: Route[] = features.map((f) => ({
  path: `${f.slug}/`,
  title: f.title,
  description: f.description,
  Page: () => <FeaturePage slug={f.slug} />,
  crumbs: [
    { name: 'Product', path: 'product/' },
    { name: f.nav, path: `${f.slug}/` },
  ],
  hideCrumbs: true,
  schema: [faqSchema(f.faqs)],
  ogImage: `og/${f.slug}.png`,
  priority: 0.8,
}))

const guideRoutes: Route[] = guides.map((g) => ({
  path: `guides/${g.slug}/`,
  title: g.title,
  description: g.description,
  Page: () => <GuideArticle slug={g.slug} />,
  crumbs: [
    { name: 'Guides', path: 'guides/' },
    { name: g.h1, path: `guides/${g.slug}/` },
  ],
  // The visible trail is drawn by the guide itself, under its chapter bar.
  hideCrumbs: true,
  schema: guideSchema(g.slug),
  ogImage: `og/guide-${g.slug}.png`,
  ogType: 'article',
  priority: 0.7,
}))

export const routes: Route[] = [
  {
    path: '',
    title: 'Ontario Landlord Software, Free to Start | LandlordEzy',
    description:
      'Collect rent by e-Transfer, screen tenants with Equifax and serve a correct N4 in 60 seconds. Built for Ontario landlords. Free to start, $1 a door to grow.',
    Page: Home,
    schema: [software, faqSchema(homeFaqs)],
    ogImage: 'og/home.png',
    priority: 1,
  },
  {
    path: 'product/',
    title: 'Every Ontario Landlord Tool in One App | LandlordEzy',
    description:
      'Listings, screening, the Ontario Standard Lease, e-Transfer rent collection, Equifax rent reporting and LTB notices, sharing one record. See the platform.',
    Page: Product,
    crumbs: [{ name: 'Product', path: 'product/' }],
    hideCrumbs: true,
    schema: [software],
    ogImage: 'og/product.png',
    priority: 0.9,
  },
  {
    path: 'pricing/',
    title: 'Pricing: Free to Start, $1 a Door | LandlordEzy',
    description:
      'Free for up to 2 tenants. Self Management is $9.99/month + $1 per door with Equifax reporting, e-Transfer collection and automated N4/N1. CAD, cancel anytime.',
    Page: Pricing,
    crumbs: [{ name: 'Pricing', path: 'pricing/' }],
    hideCrumbs: true,
    schema: [software, faqSchema(pricingFaqs)],
    ogImage: 'og/pricing.png',
    priority: 0.9,
  },
  ...featureRoutes,
  {
    path: 'property-managers/',
    title: 'Property Management Software for Ontario | LandlordEzy',
    description:
      'Owner accounting, statements, an owner portal, a CRM and Ontario LTB notices in one team login. Free to start, then $29.99/month + $1 per door. AI import.',
    Page: PropertyManagers,
    crumbs: [{ name: 'Property managers', path: 'property-managers/' }],
    hideCrumbs: true,
    schema: [faqSchema(pmFaqs)],
    ogImage: 'og/property-managers.png',
    priority: 0.9,
  },
  {
    path: 'paralegals/',
    title: 'LTB Case Law Research & Hearing Prep | LandlordEzy',
    description:
      'CaseBuilder ranks comparable Ontario LTB decisions against your facts and builds the hearing pack and disclosure bundle. Free to start; plans from $49 a year.',
    Page: Paralegals,
    crumbs: [{ name: 'Paralegals', path: 'paralegals/' }],
    hideCrumbs: true,
    ogImage: 'og/paralegals.png',
    priority: 0.6,
  },
  {
    path: 'tools/',
    title: 'Free Calculators for Ontario Landlords | LandlordEzy',
    description:
      'Free N4 termination date, rent increase and deposit interest calculators for Ontario landlords, built on the official rules and updated for Bill 60.',
    Page: ToolsHub,
    crumbs: [{ name: 'Free tools', path: 'tools/' }],
    ogImage: 'og/tools.png',
    priority: 0.7,
  },
  {
    path: 'tools/n4-date-calculator/',
    title: 'N4 Termination Date Calculator (7-Day Rule) | LandlordEzy',
    description:
      'Find the earliest N4 termination date under the 7-day rule in force since Sept. 21, 2026, with courier and mail days added, plus the first day to file an L1.',
    Page: N4Tool,
    crumbs: [
      { name: 'Free tools', path: 'tools/' },
      { name: 'N4 date calculator', path: 'tools/n4-date-calculator/' },
    ],
    schema: [tool('N4 termination date calculator', 'tools/n4-date-calculator/'), faqSchema(n4Faqs)],
    ogImage: 'og/tool-n4.png',
    priority: 0.8,
  },
  {
    path: 'tools/rent-increase-calculator/',
    title: 'Ontario Rent Increase Calculator 2026–2027 | LandlordEzy',
    description:
      'Calculate the maximum Ontario rent increase under the 2.1% (2026) and 1.9% (2027) guidelines, the earliest effective date, and when to serve the N1.',
    Page: RentTool,
    crumbs: [
      { name: 'Free tools', path: 'tools/' },
      { name: 'Rent increase calculator', path: 'tools/rent-increase-calculator/' },
    ],
    schema: [tool('Ontario rent increase calculator', 'tools/rent-increase-calculator/'), faqSchema(rentFaqs)],
    ogImage: 'og/tool-rent.png',
    priority: 0.8,
  },
  {
    path: 'tools/rent-deposit-interest-calculator/',
    title: 'Last Month’s Rent Deposit Interest Calculator | LandlordEzy',
    description:
      'Work out the interest owed on an Ontario last month’s rent deposit at the guideline rate, and how much can top up the deposit after a rent increase.',
    Page: LmrTool,
    crumbs: [
      { name: 'Free tools', path: 'tools/' },
      { name: 'Deposit interest calculator', path: 'tools/rent-deposit-interest-calculator/' },
    ],
    schema: [tool('Rent deposit interest calculator', 'tools/rent-deposit-interest-calculator/'), faqSchema(lmrFaqs)],
    ogImage: 'og/tool-lmr.png',
    priority: 0.7,
  },
  {
    path: 'guides/',
    title: 'Ontario Landlord Guides: LTB, Notices & Rent | LandlordEzy',
    description:
      'Plain-English guides to Ontario’s rental rules: Bill 60, serving an N4, the 2027 rent increase guideline and every LTB form, checked against official sources.',
    Page: GuidesHub,
    crumbs: [{ name: 'Guides', path: 'guides/' }],
    ogImage: 'og/guides.png',
    priority: 0.7,
  },
  ...guideRoutes,
  {
    path: 'about/',
    title: 'About LandlordEzy: Built by Ontario Landlords | LandlordEzy',
    description:
      'LandlordEzy was founded by Paul J. Rouillard, Broker of Record at List It Realty and founder of OLH Property Management, after 23 years in Ontario rentals.',
    Page: About,
    crumbs: [{ name: 'About', path: 'about/' }],
    hideCrumbs: true,
    schema: [
      { '@type': 'AboutPage', url: abs('about/'), about: { '@id': organizationId } },
      {
        '@type': 'Person',
        name: site.founder,
        jobTitle: 'Founder, LandlordEzy; Broker of Record, List It Realty Brokerage Inc.',
        worksFor: { '@id': organizationId },
        sameAs: [site.social.youtube],
      },
    ],
    ogImage: 'og/about.png',
    priority: 0.6,
  },
  {
    path: 'contact/',
    title: 'Contact LandlordEzy: Book a Free Call | LandlordEzy',
    description:
      'Book a free 15-minute call with the licensed paralegal team, call (519) 258-3966, or send a message. Serving landlords across Ontario.',
    Page: Contact,
    crumbs: [{ name: 'Contact', path: 'contact/' }],
    hideCrumbs: true,
    schema: [{ '@type': 'ContactPage', url: abs('contact/'), about: { '@id': organizationId } }],
    ogImage: 'og/default.png',
    priority: 0.5,
  },
  {
    path: 'demo/',
    title: 'Try the Live Demo, No Sales Call | LandlordEzy',
    description:
      'Build a private LandlordEzy demo shaped like your portfolio in about a minute: rent ledgers, an N4, owner statements and e-sign. Free, no credit card.',
    Page: Demo,
    crumbs: [{ name: 'Live demo', path: 'demo/' }],
    hideCrumbs: true,
    schema: [faqSchema(demoFaqs)],
    ogImage: 'og/demo.png',
    priority: 0.7,
  },
  {
    path: 'faq/',
    title: 'LandlordEzy FAQ: Plans, Rent, Screening & Notices',
    description:
      'Answers about LandlordEzy plans, e-Transfer rent collection, Equifax rent reporting, tenant screening, Bill 60 notices, legal help and privacy.',
    Page: FAQ,
    crumbs: [{ name: 'FAQ', path: 'faq/' }],
    hideCrumbs: true,
    schema: [faqSchema(faqGroups.flatMap((g) => g.items))],
    ogImage: 'og/default.png',
    priority: 0.5,
  },
  {
    path: 'trust/',
    title: 'Trust & Privacy | LandlordEzy',
    description:
      'How LandlordEzy handles tenant and landlord data: consent-first screening, soft inquiries, no data sales, ID deletion, and research by situation, never by person.',
    Page: Trust,
    crumbs: [{ name: 'Trust & privacy', path: 'trust/' }],
    hideCrumbs: true,
    ogImage: 'og/default.png',
    priority: 0.4,
  },
]

export const notFound: Route = {
  path: '404',
  title: 'Page not found | LandlordEzy',
  description: 'This page has moved. Try LandlordEzy’s home page, pricing, Ontario guides or free calculators.',
  Page: NotFound,
  noindex: true,
}
