/**
 * A snapshot of homes on OLH's platforms, taken from the design preview on
 * November 11, 2026. Photos are resized copies in public/img/listings/ (the
 * site's security policy only loads images from sobrcircle.com itself). Each
 * card links to the live listing, so a rented unit is one tap from the truth.
 *
 * On ontariolandlordhelp.ca this strip would be fed live from LandlordEzy and
 * List It Realty instead of a snapshot.
 */
export type Listing = {
  kind: 'rent' | 'sale'
  price: string
  street: string
  city: string
  meta: string
  via: 'LandlordEzy' | 'List It Realty'
  img: string
  href: string
}

const L = 'https://ontariolandlordhelp.ca/rentals/'

export const listings: Listing[] = [
  { kind: 'rent', price: '$2,650/mo', street: '2450 Bloor Street West', city: 'Toronto', meta: '2 bed · 1 bath · Apartment', via: 'LandlordEzy', img: 'toronto-bloor', href: `${L}toronto/171/2450-bloor-street-west` },
  { kind: 'rent', price: '$2,950/mo', street: '6 Atessa Drive', city: 'Hamilton', meta: '3 bed · 2.5 bath · Apartment', via: 'LandlordEzy', img: 'hamilton-atessa', href: `${L}hamilton/155/6-atessa-drive` },
  { kind: 'rent', price: '$1,550/mo', street: '1193 Howard Avenue', city: 'Windsor', meta: '2 bed · 1 bath · Townhouse', via: 'LandlordEzy', img: 'windsor-howard', href: `${L}windsor/166/1193-howard-avenue` },
  { kind: 'rent', price: '$2,550/mo', street: '4800 Highway 7', city: 'Vaughan', meta: '2 bed · 1.5 bath · Condo', via: 'LandlordEzy', img: 'vaughan-highway-7', href: `${L}vaughan/169/4800-highway-7` },
  { kind: 'sale', price: '$469,000', street: '3400 Castle Rock Place', city: 'London', meta: '3 bed · Condo', via: 'List It Realty', img: 'london-castle-rock', href: `${L}london/141/3400-castle-rock-pl` },
  { kind: 'rent', price: '$2,700/mo', street: '114 Lillian Drive', city: 'Waterloo', meta: '3 bed · 2 bath · 2-storey', via: 'List It Realty', img: 'waterloo-lillian', href: `${L}waterloo/145/114-lillian-dr` },
  { kind: 'rent', price: '$2,400/mo', street: '104 Nottingham Road', city: 'Barrie', meta: '2 bed · 1.5 bath · Duplex', via: 'LandlordEzy', img: 'barrie-nottingham', href: `${L}barrie/173/104-nottingham-road` },
  { kind: 'rent', price: '$2,050/mo', street: '4878 Powers Common', city: 'Burlington', meta: '1 bed · 1 bath · Condo', via: 'LandlordEzy', img: 'burlington-powers', href: `${L}burlington/158/4878-powers-common` },
  { kind: 'sale', price: '$575,000', street: '1306 Monaghan Road', city: 'Peterborough', meta: '4 bed · 3 bath · Multi-family', via: 'List It Realty', img: 'peterborough-monaghan', href: `${L}peterborough/110/1306-monaghan-road` },
  { kind: 'rent', price: '$2,500/mo', street: '555 Revland Drive', city: 'Tecumseh', meta: '3 bed · 1 bath · Duplex', via: 'LandlordEzy', img: 'tecumseh-revland', href: `${L}tecumseh/162/555-revland-drive` },
  { kind: 'rent', price: '$1,630/mo', street: '81 Charlton Avenue East', city: 'Hamilton', meta: '1 bed · 1 bath · Condo', via: 'LandlordEzy', img: 'hamilton-charlton', href: `${L}hamilton/148/81-charlton-avenue-east` },
  { kind: 'sale', price: '$514,999', street: '1484 Victoria Avenue', city: 'Windsor', meta: '3 bed · 1 bath · 2-storey', via: 'List It Realty', img: 'windsor-victoria', href: `${L}windsor/66/1484-victoria-ave` },
]

/** Counts from the live platforms on the snapshot date (the preview showed all of them). */
export const listingCounts = { all: 63, rent: 47, sale: 16, asOf: 'November 11, 2026' }
