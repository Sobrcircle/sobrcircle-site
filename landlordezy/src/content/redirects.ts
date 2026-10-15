/**
 * Retired landlordezy.ca marketing URLs → their new home (301). Used only by
 * the production build (_redirects). App routes (/login, /help/*, /rta/*,
 * /ltb-forms/*, /landlordtalk/*, /ask-ezy/*, /rentals/*, /videos, /articles…)
 * and the per-notice guides (/n5-notice-ontario etc.) are deliberately absent:
 * they keep their URLs and rankings until they're rebuilt in this design.
 */
export const legacyRedirects: [string, string][] = [
  // Pricing and product
  ['/packages', 'pricing/'],
  ['/features', 'product/'],
  ['/automation', 'product/'],
  ['/ezy-portfolio-review-ontario', 'product/'],
  ['/services', 'legal-help/'],
  ['/contact-us', 'contact/'],
  ['/faqs', 'faq/'],

  // Rent
  ['/automatic-rent-collection', 'rent-collection/'],
  ['/rent-collection-software-ontario', 'rent-collection/'],
  ['/free-rent-reporting-canada-rent-reporting-to-equifax', 'rent-reporting/'],
  ['/rental-credit-tenant-report-card', 'rent-reporting/'],

  // Screening (the two Reference Network URLs served identical pages)
  ['/tenant-screening-ontario', 'tenant-screening/'],
  ['/tenant-credit-check-ontario', 'tenant-screening/'],
  ['/sample-tenant-screening-report', 'tenant-screening/'],
  ['/free-rent-reporting-tenant-rental-history-verification-canada', 'tenant-screening/'],
  ['/landlord-reference-network', 'tenant-screening/'],

  // Notices
  ['/n4-notice', 'notices/'],
  ['/n1-rent-increase', 'notices/'],
  ['/consent-to-service-by-email', 'notices/'],

  // Leases, listings, operations
  ['/digital-lease', 'leases/'],
  ['/move-in-inspection-report-ontario', 'leases/'],
  ['/rental-utilities-tracking', 'leases/'],
  ['/list-your-rental-free-ontario', 'listings/'],
  ['/rental-showings-no-show-protection', 'listings/'],
  ['/tenant-placement', 'listings/'],
  ['/property-maintenance-software', 'maintenance/'],
  ['/fire-safety-inspection-ontario', 'maintenance/'],
  ['/expense-tracker-receipt-scanning-ontario', 'maintenance/'],
  ['/property-management-calendar', 'maintenance/'],
  ['/tenant-broadcast-messaging', 'maintenance/'],

  // Property managers
  ['/property-management-software', 'property-managers/'],
  ['/property-management-companies', 'property-managers/'],
  ['/property-management-crm', 'property-managers/'],
  ['/property-management-agreements', 'property-managers/'],
  ['/property-management-team-notes', 'property-managers/'],
  ['/property-management-bills-estimates', 'property-managers/'],

  // Guides (consolidates ten near-identical "help" pages)
  ['/ontario-bill-60-landlord-changes', 'guides/bill-60/'],
  ['/how-much-can-i-raise-rent-ontario', 'guides/rent-increase/'],
  ['/above-guideline-rent-increase-ontario', 'guides/rent-increase/'],
  ['/ltb-forms', 'guides/ltb-forms/'],
  ['/n4-notice-help', 'guides/n4-notice/'],
  ['/tenant-not-paying-rent-what-to-do', 'guides/n4-notice/'],
  ['/l1-application-help', 'guides/n4-notice/'],
  ['/free-legal-advice-landlord-ontario', 'legal-help/'],
  ['/ltb-help-ontario', 'legal-help/'],
  ['/eviction-help-ontario', 'legal-help/'],
  ['/n5-notice-help', 'legal-help/'],
  ['/n12-notice-help', 'legal-help/'],
  ['/n13-notice-help', 'legal-help/'],
  ['/l2-application-help', 'legal-help/'],

  // Company
  ['/ontario-landlord-help', 'about/'],
  ['/paul-j-rouillard', 'about/'],
  ['/for-paralegals', 'paralegals/'],
]
