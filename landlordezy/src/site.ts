/**
 * Site-wide configuration. Read at prerender time (Node), never shipped to the
 * browser: client code lives in src/client and reads what it needs from the DOM.
 *
 * Two build modes share every page:
 *   preview    → https://sobrcircle.com/landlordezy/   (noindex, concept banner on)
 *   production → https://landlordezy.ca/               (indexable, sitemap, redirects)
 */
export type Mode = 'preview' | 'production'

const mode: Mode = process.env.LE_MODE === 'production' ? 'production' : 'preview'

export const site = {
  mode,
  name: 'LandlordEzy',
  legalName: 'LandlordEzy Inc.',
  tagline: 'Property management, made Ezy.',
  base: mode === 'production' ? '/' : '/landlordezy/',
  origin: mode === 'production' ? 'https://landlordezy.ca' : 'https://sobrcircle.com',
  indexable: mode === 'production',
  preview: mode === 'preview',
  locale: 'en_CA',
  lastReviewed: '2026-10-15',
  lastReviewedLabel: 'October 15, 2026',
  phone: { display: '(519) 258-3966', tel: '+15192583966' },
  hours: 'Monday to Friday, 9 a.m. to 5 p.m. ET',
  founder: 'Paul J. Rouillard',
  // Everything that "does something" lives in the real LandlordEzy app.
  // The concept links straight into it so every button on the page works.
  app: {
    signup: 'https://landlordezy.ca/login',
    login: 'https://landlordezy.ca/login',
    demo: 'https://landlordezy.ca/demo',
    book: 'https://landlordezy.ca/book/landlordezy/discovery-call',
    help: 'https://landlordezy.ca/help',
    forum: 'https://landlordezy.ca/landlordtalk',
    askEzy: 'https://landlordezy.ca/ask-ezy/chat',
    caseBuilder: 'https://landlordezy.ca/case-builder',
    hearingPrep: 'https://landlordezy.ca/hearing-prep',
    lawLibrary: 'https://landlordezy.ca/rta',
    forms: 'https://landlordezy.ca/ontario-forms',
    videos: 'https://landlordezy.ca/videos',
    articles: 'https://landlordezy.ca/articles',
    sampleReport: 'https://landlordezy.ca/sample-tenant-screening-report',
    signMaker: 'https://landlordezy.ca/free-for-rent-sign-maker',
    ezyrent: 'https://ezyrent.ca/rentals',
    ezyrentList: 'https://landlordezy.ca/rentals/create',
    listit: 'https://listitmls.ca',
    terms: 'https://landlordezy.ca/terms-conditions',
    privacy: 'https://landlordezy.ca/privacy-policy',
    live: 'https://landlordezy.ca/',
  },
  social: {
    facebook: 'https://www.facebook.com/LandlordEzy/',
    facebookGroup: 'https://www.facebook.com/groups/InvestorLandlord',
    youtube: 'https://www.youtube.com/@PaulJRouillard',
  },
  official: {
    ltbForms: 'https://tribunalsontario.ca/ltb/forms-filing-and-fees/',
    ltb: 'https://tribunalsontario.ca/ltb/',
    bill60Update:
      'https://tribunalsontario.ca/2026/09/21/ltb-operational-update-legislative-changes-at-the-landlord-and-tenant-board-effective-september-21-2026/',
    n4Instructions:
      'https://tribunalsontario.ca/documents/ltb/Notices%20of%20Termination%20&%20Instructions/N4_Instructions.html',
    n12Instructions:
      'https://tribunalsontario.ca/documents/ltb/Notices%20of%20Termination%20&%20Instructions/N12_Instructions.html',
    n8Instructions:
      'https://tribunalsontario.ca/documents/ltb/Notices%20of%20Termination%20&%20Instructions/N8_Instructions.html',
    rentIncreases: 'https://www.ontario.ca/page/residential-rent-increases',
    rta: 'https://www.ontario.ca/laws/statute/06r17',
    orderCatalogue: 'https://data.ontario.ca/dataset/ltb-order-catalogue',
    catalogueUpdate:
      'https://tribunalsontario.ca/2026/07/24/ltb-operational-update-increasing-public-access-to-final-ltb-orders',
    standardLease: 'https://www.ontario.ca/page/guide-ontarios-standard-lease',
  },
} as const

/** Site-relative URL, base-aware: url('pricing/') → '/landlordezy/pricing/' in preview. */
export function url(path = ''): string {
  return site.base + path.replace(/^\//, '')
}

/** Absolute URL for canonicals, Open Graph and structured data. */
export function abs(path = ''): string {
  return site.origin + url(path)
}
