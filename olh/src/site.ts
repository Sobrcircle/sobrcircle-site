/**
 * Site-wide configuration for the OLH concept. Read at prerender time (Node),
 * never shipped to the browser: client code lives in src/client and reads what
 * it needs from the DOM.
 *
 * This is a design preview only: it is served at https://sobrcircle.com/olh/,
 * kept out of search, and every price on it is a proposal for review.
 */
export const site = {
  name: 'OLH Property Management',
  short: 'OLH',
  tagline: 'Ontario property management with legal help on the team.',
  base: '/olh/',
  origin: 'https://sobrcircle.com',
  indexable: false,
  preview: true,
  locale: 'en_CA',
  lastReviewed: '2026-11-11',
  phone: { display: '(519) 258-3966', tel: '+15192583966' },
  email: 'info@olhgroup.ca',
  since: 2003,
  founder: 'Paul J. Rouillard',
  address: { street: '794 Ouellette Ave', city: 'Windsor', region: 'ON', postal: 'N9A 1C2' },
  hours: 'Monday to Friday, 10 a.m. to 4 p.m. ET',
  /** Proof points as the live site states them (November 2026). Update together. */
  proof: { rating: '4.9', reviews: '121+', community: '31,000+', ltbOrders: '84,000+', videos: '140+' },
  reviewsUrl: 'https://g.page/r/CRHSrMvWv2c7EBM/review',
  social: {
    facebookGroup: 'https://www.facebook.com/groups/InvestorLandlord',
    youtube: 'https://www.youtube.com/@PaulJRouillard',
    tiktok: 'https://www.tiktok.com/@pauljrouillard',
    linkedin: 'https://www.linkedin.com/in/paul-j-rouillard-18076118',
  },
  // Everything that "does something" lives on the real sites. The concept links
  // straight into them so every button on the page goes somewhere real.
  live: {
    home: 'https://ontariolandlordhelp.ca/',
    preview: 'https://ontariolandlordhelp.ca/design-preview/home',
    book: 'https://landlordezy.ca/book/olh-property-management?ref=olh',
    login: 'https://ontariolandlordhelp.ca/login',
    contact: 'https://ontariolandlordhelp.ca/contact',
    about: 'https://ontariolandlordhelp.ca/about',
    paul: 'https://ontariolandlordhelp.ca/meet-paul-j-rouillard',
    faq: 'https://ontariolandlordhelp.ca/faq',
    privacy: 'https://ontariolandlordhelp.ca/privacy-policy',
    terms: 'https://ontariolandlordhelp.ca/terms-of-use',
    locations: 'https://ontariolandlordhelp.ca/locations',
    compare: 'https://ontariolandlordhelp.ca/compare-property-management-ontario',
    switching: 'https://ontariolandlordhelp.ca/switch-property-managers',
    howItWorks: 'https://ontariolandlordhelp.ca/ontario-property-management',
    condos: 'https://ontariolandlordhelp.ca/condo-property-management-ontario',
    multifamily: 'https://ontariolandlordhelp.ca/multifamily-property-management',
    students: 'https://ontariolandlordhelp.ca/student-rental-property-management',
    firstTime: 'https://ontariolandlordhelp.ca/first-time-landlord-ontario',
    nonResident: 'https://ontariolandlordhelp.ca/non-resident-landlord-property-management',
    distressed: 'https://ontariolandlordhelp.ca/distressed-apartment-building-management-ontario',
    renovation: 'https://ontariolandlordhelp.ca/renovation-project-management-ontario',
    restoration: 'https://ontariolandlordhelp.ca/emergency-restoration-repair-ontario',
    rehab: 'https://ontariolandlordhelp.ca/multifamily-renovation-ontario',
    buildingMaintenance: 'https://ontariolandlordhelp.ca/apartment-building-maintenance-ontario',
    leaseUp: 'https://ontariolandlordhelp.ca/multifamily-leasing-lease-up-ontario',
    rentalWorth: 'https://ontariolandlordhelp.ca/what-is-my-rental-worth',
    screening: 'https://ontariolandlordhelp.ca/tenant-screening-software',
    screeningQuestions: 'https://ontariolandlordhelp.ca/tenant-screening-questions',
    judgments: 'https://ontariolandlordhelp.ca/ltb-judgment-database',
    rentals: 'https://ontariolandlordhelp.ca/rentals',
    eviction: 'https://ontariolandlordhelp.ca/eviction-help-ontario',
    paralegal: 'https://ontariolandlordhelp.ca/ontario-landlord-paralegal',
    rentGuarantee: 'https://ontariolandlordhelp.ca/rent-guarantee-ontario',
    howToEvict: 'https://ontariolandlordhelp.ca/how-to-evict-a-tenant-in-ontario',
    evictionTime: 'https://ontariolandlordhelp.ca/how-long-does-an-eviction-take-in-ontario',
    ltbForms: 'https://ontariolandlordhelp.ca/ltb-forms',
    hearingLinks: 'https://ontariolandlordhelp.ca/ltb-hearing-links',
    law: 'https://ontariolandlordhelp.ca/ontario-law',
    selfHelp: 'https://ontariolandlordhelp.ca/landlord-self-help',
    guides: 'https://ontariolandlordhelp.ca/guides',
    downloads: 'https://ontariolandlordhelp.ca/downloads',
    videos: 'https://ontariolandlordhelp.ca/video-guides',
    bill60: 'https://ontariolandlordhelp.ca/bill-60-ontario',
    rentGuideline: 'https://ontariolandlordhelp.ca/ontario-rent-increase-guideline',
    askEzy: 'https://ontariolandlordhelp.ca/ask-ezy',
    handshake: 'https://ontariolandlordhelp.ca/landlord-handshake',
    portals: 'https://ontariolandlordhelp.ca/landlord-tenant-portals',
    eLease: 'https://ontariolandlordhelp.ca/ontario-e-lease',
    maintenance: 'https://ontariolandlordhelp.ca/maintenance-management-software',
    rentSoftware: 'https://ontariolandlordhelp.ca/rent-collection-software',
    software: 'https://ontariolandlordhelp.ca/property-management-software',
    sireg: 'https://ontariolandlordhelp.ca/sireg-investors',
    siregRegistry: 'https://ontariolandlordhelp.ca/sireg-owner-registry',
    placement: 'https://ontariolandlordhelp.ca/tenant-placement',
    legalGuarantee: 'https://ontariolandlordhelp.ca/legal-guarantee',
    rentReporting: 'https://ontariolandlordhelp.ca/rent-reporting',
  },
  ezy: {
    home: 'https://landlordezy.ca/',
    n4: 'https://landlordezy.ca/n4-notice',
    n1: 'https://landlordezy.ca/n1-rent-increase',
    reporting: 'https://landlordezy.ca/free-rent-reporting-canada-rent-reporting-to-equifax',
    packages: 'https://landlordezy.ca/packages',
    ezyrent: 'https://ezyrent.ca/rentals',
  },
  listit: 'https://listitmls.ca',
  /** The LandlordEzy concept on this same site, for "Explore LandlordEzy" links. */
  ezyConcept: '/landlordezy/',
} as const

/** A page on the live ontariolandlordhelp.ca: live('/ltb-forms'). */
export function live(path = '/'): string {
  return 'https://ontariolandlordhelp.ca' + path
}

/** Site-relative URL, base-aware: url('pricing/') → '/olh/pricing/'. */
export function url(path = ''): string {
  return site.base + path.replace(/^\//, '')
}

/** Absolute URL for Open Graph and structured data. */
export function abs(path = ''): string {
  return site.origin + url(path)
}
