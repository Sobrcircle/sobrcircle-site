/**
 * Menus and footer. `path` is a page of this concept; `href` is a page on the
 * live ontariolandlordhelp.ca (or LandlordEzy), opened as-is.
 */
import { site } from '../site'

export type NavLink = { label: string; path?: string; href?: string; note?: string }
export type NavGroup = { heading: string; large?: boolean; links: NavLink[] }

const L = site.live

export const plansMenu: NavGroup[] = [
  {
    heading: 'Plans',
    large: true,
    links: [
      { label: 'Pricing calculator', path: 'pricing/' },
      { label: 'OLH Landlord Shield', path: 'landlord-shield/' },
      { label: 'Property Management', path: 'pricing/#included' },
      { label: 'Legal Guarantee', path: 'legal/#guarantee' },
    ],
  },
  {
    heading: 'Inside Landlord Shield',
    links: [
      { label: 'From missed rent to a served N4', path: 'landlord-shield/#n4' },
      { label: 'The LandlordEzy Automation Suite', path: 'landlord-shield/#suite' },
      { label: 'Equifax rent reporting', path: 'landlord-shield/#reporting' },
      { label: 'Shield vs Legal Guarantee', path: 'legal/#compare' },
      { label: 'Local visits', path: 'pricing/#visits' },
    ],
  },
  {
    heading: 'Management',
    links: [
      { label: 'How management works', href: L.howItWorks },
      { label: 'Switching managers: free review', href: L.switching },
      { label: 'Compare OLH with others', href: L.compare },
      { label: 'Condos', href: L.condos },
      { label: 'Multifamily & apartment buildings', href: L.multifamily },
      { label: 'Out-of-province & overseas owners', href: L.nonResident },
    ],
  },
]

export const resourcesMenu: NavGroup[] = [
  {
    heading: 'Legal help',
    large: true,
    links: [
      { label: 'Eviction help', path: 'legal/#eviction' },
      { label: 'Licensed paralegals', href: L.paralegal },
      { label: 'How to evict a tenant', href: L.howToEvict },
      { label: 'Bill 60 updates', href: L.bill60 },
    ],
  },
  {
    heading: 'Free resources',
    links: [
      { label: 'Landlord self-help centre', href: L.selfHelp },
      { label: 'Guides & articles', href: L.guides },
      { label: 'LTB forms & applications', href: L.ltbForms },
      { label: 'LTB hearing & Zoom links', href: L.hearingLinks },
      { label: 'Ontario law library', href: L.law },
      { label: 'Ask Ezy, the AI assistant', href: L.askEzy },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About OLH', href: L.about },
      { label: 'Meet Paul J. Rouillard', href: L.paul },
      { label: 'SIREG Owner Centre', href: L.sireg },
      { label: 'All Ontario locations', href: L.locations },
      { label: 'Contact', href: L.contact },
    ],
  },
]

export const footerColumns: { heading: string; links: NavLink[] }[] = [
  {
    heading: 'Plans',
    links: [
      { label: 'Pricing calculator', path: 'pricing/' },
      { label: 'OLH Landlord Shield', path: 'landlord-shield/' },
      { label: 'Automation Suite', path: 'landlord-shield/#suite' },
      { label: 'Equifax rent reporting', path: 'landlord-shield/#reporting' },
      { label: 'Property Management', path: 'pricing/#included' },
      { label: 'Legal Guarantee', path: 'legal/#guarantee' },
      { label: 'Local visits', path: 'pricing/#visits' },
    ],
  },
  {
    heading: 'Leasing',
    links: [
      { label: 'Available rentals', path: 'rentals/' },
      { label: 'Tenant placement', path: 'rentals/#leasing' },
      { label: 'What is my rental worth?', href: L.rentalWorth },
      { label: 'Tenant screening', href: L.screening },
      { label: 'Screening questions', href: L.screeningQuestions },
      { label: 'LTB judgment database', href: L.judgments },
    ],
  },
  {
    heading: 'Legal help',
    links: [
      { label: 'Eviction help', path: 'legal/#eviction' },
      { label: 'Member legal access', path: 'legal/#compare' },
      { label: 'Licensed paralegals', href: L.paralegal },
      { label: 'Rent Guarantee', href: L.rentGuarantee },
      { label: 'How long an eviction takes', href: L.evictionTime },
      { label: 'LTB forms', href: L.ltbForms },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'LandlordEzy software', href: L.software },
      { label: 'Self-help centre', href: L.selfHelp },
      { label: 'Guides', href: L.guides },
      { label: 'Forms & downloads', href: L.downloads },
      { label: 'Video guides', href: L.videos },
      { label: 'Rent increase guideline', href: L.rentGuideline },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About OLH', href: L.about },
      { label: 'Meet Paul', href: L.paul },
      { label: 'SIREG Owner Centre', href: L.sireg },
      { label: 'Locations', href: L.locations },
      { label: 'Contact', href: L.contact },
      { label: 'Log in', href: L.login },
    ],
  },
]
