import { site } from '../site'

export type NavLink = { label: string; path?: string; href?: string; note?: string }
export type NavGroup = { heading: string; links: NavLink[]; large?: boolean }

/** Product flyout. `path` = page on this site; `href` = the live LandlordEzy app. */
export const productMenu: NavGroup[] = [
  {
    heading: 'Explore LandlordEzy',
    large: true,
    links: [
      { label: 'Overview', path: 'product/' },
      { label: 'Rent collection', path: 'rent-collection/' },
      { label: 'Tenant screening', path: 'tenant-screening/' },
      { label: 'N4 & N1 notices', path: 'notices/' },
      { label: 'Rent reporting', path: 'rent-reporting/' },
    ],
  },
  {
    heading: 'More tools',
    links: [
      { label: 'Leases & inspections', path: 'leases/' },
      { label: 'Listings & tenant placement', path: 'listings/' },
      { label: 'Maintenance & compliance', path: 'maintenance/' },
      { label: 'Ezy AI assistant', path: 'ezy-ai/' },
      { label: 'Legal help & guarantee', path: 'legal-help/' },
    ],
  },
  {
    heading: 'Built for',
    links: [
      { label: 'Independent landlords', path: 'product/' },
      { label: 'Property management companies', path: 'property-managers/' },
      { label: 'Paralegals', path: 'paralegals/' },
      { label: 'Pricing', path: 'pricing/' },
      { label: 'Try the live demo', path: 'demo/' },
    ],
  },
]

export const resourcesMenu: NavGroup[] = [
  {
    heading: 'Ontario landlord guides',
    large: true,
    links: [
      { label: 'Bill 60: what changed', path: 'guides/bill-60/' },
      { label: 'How to serve an N4', path: 'guides/n4-notice/' },
      { label: 'Rent increases in 2027', path: 'guides/rent-increase/' },
      { label: 'LTB forms explained', path: 'guides/ltb-forms/' },
      { label: 'All guides', path: 'guides/' },
    ],
  },
  {
    heading: 'Free calculators',
    links: [
      { label: 'N4 termination date', path: 'tools/n4-date-calculator/' },
      { label: 'Rent increase', path: 'tools/rent-increase-calculator/' },
      { label: 'Deposit interest', path: 'tools/rent-deposit-interest-calculator/' },
      { label: 'All tools', path: 'tools/' },
    ],
  },
  {
    heading: 'Learn & connect',
    links: [
      { label: 'Help Centre', href: site.app.help },
      { label: 'Video guides', href: site.app.videos },
      { label: 'LandlordTalk forum', href: site.app.forum },
      { label: 'Ontario Landlord Help group', href: site.social.facebookGroup },
      { label: 'Ontario law library', href: site.app.lawLibrary },
    ],
  },
]

export const footerColumns: NavGroup[] = [
  {
    heading: 'Product',
    links: [
      { label: 'Overview', path: 'product/' },
      { label: 'Rent collection', path: 'rent-collection/' },
      { label: 'Tenant screening', path: 'tenant-screening/' },
      { label: 'Rent reporting', path: 'rent-reporting/' },
      { label: 'N4 & N1 notices', path: 'notices/' },
      { label: 'Leases & inspections', path: 'leases/' },
      { label: 'Listings & placement', path: 'listings/' },
      { label: 'Maintenance', path: 'maintenance/' },
      { label: 'Ezy AI', path: 'ezy-ai/' },
      { label: 'Pricing', path: 'pricing/' },
    ],
  },
  {
    heading: 'Who it’s for',
    links: [
      { label: 'Independent landlords', path: 'product/' },
      { label: 'Property managers', path: 'property-managers/' },
      { label: 'Paralegals', path: 'paralegals/' },
      { label: 'Legal help & guarantee', path: 'legal-help/' },
    ],
  },
  {
    heading: 'Free tools',
    links: [
      { label: 'N4 date calculator', path: 'tools/n4-date-calculator/' },
      { label: 'Rent increase calculator', path: 'tools/rent-increase-calculator/' },
      { label: 'Deposit interest calculator', path: 'tools/rent-deposit-interest-calculator/' },
      { label: 'For-rent sign maker', href: site.app.signMaker },
    ],
  },
  {
    heading: 'Ontario guides',
    links: [
      { label: 'Bill 60 changes', path: 'guides/bill-60/' },
      { label: 'Serving an N4', path: 'guides/n4-notice/' },
      { label: 'Rent increases', path: 'guides/rent-increase/' },
      { label: 'LTB forms', path: 'guides/ltb-forms/' },
      { label: 'Help Centre', href: site.app.help },
      { label: 'Law library', href: site.app.lawLibrary },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', path: 'about/' },
      { label: 'Contact', path: 'contact/' },
      { label: 'Live demo', path: 'demo/' },
      { label: 'FAQ', path: 'faq/' },
      { label: 'Trust & privacy', path: 'trust/' },
      { label: 'Sign in', href: site.app.login },
    ],
  },
]
