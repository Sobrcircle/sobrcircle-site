/**
 * Menus and footer. `path` is a page of this concept; `href` is a page still on
 * the live ontariolandlordhelp.ca (or LandlordEzy), opened as-is.
 *
 * The header has two menus, each three short columns:
 *   Services   what we do (plans, who it's for, other services)
 *   Resources  what we give away (guides, tools, company)
 * Everything the old site's five menus held is reachable from one of them or
 * from the footer; nothing is listed twice in the same menu.
 */
import { site } from '../site'

export type NavLink = { label: string; path?: string; href?: string; note?: string }
export type NavGroup = { heading: string; large?: boolean; links: NavLink[] }

const L = site.live

export const servicesMenu: NavGroup[] = [
  {
    heading: 'Plans',
    large: true,
    links: [
      { label: 'Property Management', path: 'property-management/' },
      { label: 'Legal Guarantee', path: 'legal/#guarantee' },
      { label: 'Landlord Shield', path: 'landlord-shield/' },
      { label: 'Compare and price', path: 'pricing/' },
    ],
  },
  {
    heading: 'Who it’s for',
    links: [
      { label: 'Condo owners', path: 'owners/#condo' },
      { label: 'Student rentals', path: 'owners/#students' },
      { label: 'First-time landlords', path: 'owners/#first-time' },
      { label: 'Owners outside Ontario', path: 'owners/#non-resident' },
      { label: 'Apartment buildings', path: 'buildings/' },
      { label: 'Switching managers', path: 'property-management/#switch' },
    ],
  },
  {
    heading: 'More services',
    links: [
      { label: 'Tenant placement', path: 'rentals/#leasing' },
      { label: 'Eviction help', path: 'legal/#eviction' },
      { label: 'Renovations and repairs', path: 'projects/' },
      { label: 'Emergency restoration', path: 'projects/#restoration' },
      { label: 'Local visits', path: 'pricing/#visits' },
      { label: 'LandlordEzy software', path: 'landlord-shield/#suite' },
    ],
  },
]

export const resourcesMenu: NavGroup[] = [
  {
    heading: 'Guides',
    large: true,
    links: [
      { label: 'Evicting a tenant', path: 'guides/evictions/' },
      { label: 'LTB forms and notices', path: 'guides/ltb-forms/' },
      { label: 'Raising the rent', path: 'guides/rent-increases/' },
      { label: 'Bill 60 changes', path: 'guides/bill-60/' },
    ],
  },
  {
    heading: 'Free tools',
    links: [
      { label: 'All free resources', path: 'resources/' },
      { label: 'What is my rental worth?', href: L.rentalWorth },
      { label: 'LTB judgment database', href: L.judgments },
      { label: 'Forms and downloads', href: L.downloads },
      { label: 'Ontario law library', href: L.law },
      { label: 'Ask Ezy', href: L.askEzy },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Why OLH', path: 'about/' },
      { label: 'Contact and service areas', path: 'contact/' },
      { label: 'Homes for rent', path: 'rentals/' },
      { label: 'SIREG owners', path: 'sireg/' },
      { label: 'Log in', href: L.login },
    ],
  },
]

export const footerColumns: { heading: string; links: NavLink[] }[] = [
  {
    heading: 'Plans',
    links: [
      { label: 'Compare and price', path: 'pricing/' },
      { label: 'Property Management', path: 'property-management/' },
      { label: 'Legal Guarantee', path: 'legal/#guarantee' },
      { label: 'Landlord Shield', path: 'landlord-shield/' },
      { label: 'Local visits', path: 'pricing/#visits' },
      { label: 'Switching managers', path: 'property-management/#switch' },
    ],
  },
  {
    heading: 'Services',
    links: [
      { label: 'Owners, by situation', path: 'owners/' },
      { label: 'Apartment buildings', path: 'buildings/' },
      { label: 'Tenant placement', path: 'rentals/#leasing' },
      { label: 'Eviction help', path: 'legal/#eviction' },
      { label: 'Renovations and restoration', path: 'projects/' },
      { label: 'Homes for rent', path: 'rentals/' },
    ],
  },
  {
    heading: 'Guides',
    links: [
      { label: 'Evicting a tenant', path: 'guides/evictions/' },
      { label: 'LTB forms and notices', path: 'guides/ltb-forms/' },
      { label: 'Raising the rent', path: 'guides/rent-increases/' },
      { label: 'Bill 60 changes', path: 'guides/bill-60/' },
      { label: 'All free resources', path: 'resources/' },
      { label: 'Ontario law library', href: L.law },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Why OLH', path: 'about/' },
      { label: 'Contact', path: 'contact/' },
      { label: 'Service areas', path: 'contact/#areas' },
      { label: 'SIREG owners', path: 'sireg/' },
      { label: 'LandlordEzy', href: site.ezy.home },
      { label: 'List It Realty', href: site.listit },
    ],
  },
  {
    heading: 'Follow',
    links: [
      { label: 'YouTube', href: site.social.youtube },
      { label: 'Landlord community on Facebook', href: site.social.facebookGroup },
      { label: 'TikTok', href: site.social.tiktok },
      { label: 'LinkedIn', href: site.social.linkedin },
      { label: 'Review us on Google', href: site.reviewsUrl },
      { label: 'Log in', href: L.login },
    ],
  },
]
