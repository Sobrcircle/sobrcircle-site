import { ArrowUpRight, Check, Gauge, ListChecks, Search, Scale } from 'lucide-react'
import { site, url } from '../site'
import { CTABand, Fine, Heading, Section } from '../components/ui'
import { ChapterNav } from '../components/ChapterNav'
import { ListingStrip } from '../components/olh'

const chapters = [
  { id: 'available', label: 'Available now' },
  { id: 'leasing', label: 'Find a tenant' },
  { id: 'tools', label: 'Before you list' },
]

const packages = [
  {
    name: 'Basic listing',
    who: 'You run the showings',
    price: '$549',
    unit: '+ HST',
    points: ['MLS® and REALTOR.ca rental listing', 'Applicant screening', '3-month Legal Guarantee for rent-default matters on the placed tenancy', '12 months of LandlordEzy Premium'],
    note: 'You handle showings, lease signing and deposits.',
  },
  {
    name: 'Premium listing',
    who: 'You run the showings; we close the tenancy',
    price: '$749',
    unit: '+ HST',
    points: ['Everything in Basic', '12-month Legal Guarantee on the placed tenancy, instead of 3 months', 'Lease and addendum signing handled', 'First and last month’s rent and lawful key deposit collected'],
    hi: true,
  },
  {
    name: 'Full-service placement',
    who: 'We handle it, start to finish',
    price: 'One month’s rent',
    unit: '+ HST',
    points: ['Showings and enquiries', '12-month Legal Guarantee on the placed tenancy', 'Screening, lease preparation and signing', 'Success-based, under current brokerage terms'],
  },
]

export function Rentals() {
  return (
    <>
      <ChapterNav title="Rentals & leasing" chapters={chapters} cta={{ label: 'Book a call', href: site.live.book }} />

      <section id="available" data-hero aria-labelledby="rentals-h1" className="bg-canvas-alt pb-16 pt-10 sm:pb-24 sm:pt-16">
        <div className="wrap">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow">Available now</p>
              <h1 id="rentals-h1" className="mt-3 text-display-lg">
                Homes on our platforms.
              </h1>
              <p className="mt-4 max-w-[38rem] text-lead text-ink-3">
                Rentals and homes for sale across Ontario, listed through LandlordEzy and List It Realty Brokerage Inc.
              </p>
            </div>
            <a href={site.live.rentals} className="btn-primary shrink-0" data-track="rentals:all">
              Browse all listings <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
          <ListingStrip eager={4} className="mt-10" />
        </div>
      </section>

      <Section id="leasing" labelledBy="leasing-title">
        <div className="wrap">
          <Heading
            id="leasing-title"
            eyebrow="Finding a tenant"
            title="Leasing, through our own brokerage."
            lead="Paid MLS® and REALTOR.ca rental listings and tenant placement by List It Realty Brokerage Inc., separate from your monthly plan. Listing on EzyRent, LandlordEzy’s own marketplace, is free."
            size="md"
          />
          <div className="mx-auto mt-12 grid max-w-[72rem] gap-4 lg:grid-cols-3 lg:gap-5">
            {packages.map((p) => (
              <article key={p.name} className={`relative flex flex-col rounded-4xl bg-white p-7 sm:p-8 ${p.hi ? 'shadow-float ring-2 ring-brand' : 'shadow-card'}`} data-reveal>
                {p.hi && <p className="absolute -top-3 left-7 rounded-full bg-brand px-3 py-1 text-[0.75rem] font-semibold text-white sm:left-8">12-month Legal Guarantee</p>}
                <h3 className="text-title">{p.name}</h3>
                <p className="mt-1 text-[0.9375rem] text-ink-3">{p.who}</p>
                <p className="mt-5 font-display text-[2.25rem] font-bold leading-none tracking-[-0.03em]">
                  {p.price} <span className="text-[0.9375rem] font-medium tracking-normal text-ink-3">{p.unit}</span>
                </p>
                <ul className="mt-6 space-y-2.5 text-[0.9375rem]">
                  {p.points.map((t) => (
                    <li key={t} className="flex gap-2.5">
                      <Check className="mt-[3px] h-4 w-4 shrink-0 text-brand" strokeWidth={2.6} aria-hidden />
                      <span className="text-ink-2">{t}</span>
                    </li>
                  ))}
                </ul>
                {p.note && <p className="mt-5 text-[0.875rem] text-ink-3">{p.note}</p>}
                <div className="mt-auto pt-6">
                  <a href={site.live.placement} className="link-more">
                    Tenant placement details
                  </a>
                </div>
              </article>
            ))}
          </div>
          <div className="mx-auto mt-8 grid max-w-[72rem] gap-5 md:grid-cols-2">
            <div className="rounded-4xl bg-canvas-alt p-7">
              <h3 className="font-display text-[1.125rem] font-semibold">Listing benefits and management together</h3>
              <p className="mt-2 text-[0.9375rem] text-ink-3">
                The Legal Guarantee and software benefits are part of each List It rental package, on the terms in that listing agreement,
                for the tenancy it places. They don’t extend legal coverage to the rest of your portfolio; for that, see{' '}
                <a href={url('legal/#guarantee')}>Property Management + Legal Guarantee</a>.
              </p>
            </div>
            <div className="rounded-4xl bg-brand-soft p-7">
              <h3 className="font-display text-[1.125rem] font-semibold">Never billed twice</h3>
              <p className="mt-2 text-[0.9375rem] text-ink-2">
                If you also choose monthly management, we won’t bill you twice for the same overlapping protection. How the two fit
                together is set out in your written quote.
              </p>
            </div>
          </div>
          <Fine className="mx-auto mt-6 max-w-[72rem] text-center">
            Real estate brokerage services, including MLS® rental listings and tenant placement, are provided by List It Realty Brokerage
            Inc. Proposed prices for review.
          </Fine>
        </div>
      </Section>

      <Section id="tools" tone="alt" labelledBy="tools-title">
        <div className="wrap">
          <Heading id="tools-title" eyebrow="Before you list" title="Price it right. Screen it right." size="md" />
          <div className="mx-auto mt-10 grid max-w-[64rem] gap-3 sm:grid-cols-2">
            {[
              { href: site.live.rentalWorth, Icon: Gauge, t: 'What is my rental worth?', d: 'A rent estimate for your unit and city.' },
              { href: site.live.screening, Icon: Search, t: 'Tenant screening & credit checks', d: 'Equifax reports from $29.99, paid by you or the applicant.' },
              { href: site.live.screeningQuestions, Icon: ListChecks, t: 'Tenant screening questions', d: 'Ask consistently, before the showing.' },
              { href: site.live.judgments, Icon: Scale, t: 'LTB judgment database', d: 'Search Landlord and Tenant Board orders.' },
            ].map(({ href, Icon, t, d }) => (
              <a key={t} href={href} className="group flex items-center gap-4 rounded-4xl bg-white p-5 text-ink shadow-card hover:no-underline sm:p-6" rel="noopener">
                <span className="icon-badge shrink-0">
                  <Icon className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
                </span>
                <span className="flex-1">
                  <span className="block font-display text-[1.125rem] font-semibold tracking-[-0.01em]">{t}</span>
                  <span className="mt-0.5 block text-[0.9375rem] text-ink-3">{d}</span>
                </span>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-brand transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </a>
            ))}
          </div>
        </div>
      </Section>

      <CTABand title="Have a unit to fill?" lead="Tell us the address and the rent you’re aiming for. We’ll tell you which package fits and when it can go live." />
    </>
  )
}
