import { ArrowUpRight, BadgeCheck, Building2, Check, Handshake, Landmark, MonitorSmartphone, Quote, Scale, Star, Users, Video, X } from 'lucide-react'
import { site, url } from '../site'
import { $ } from '../content/pricing'
import { compareRows } from '../content/compare'
import { aboutFaqs } from '../content/faqs-about'
import { CTABand, FAQList, Fine, Heading, PageHero, Section } from '../components/ui'
import { ChapterNav } from '../components/ChapterNav'

const chapters = [
  { id: 'compare', label: 'OLH vs typical' },
  { id: 'team', label: 'One team' },
  { id: 'fit', label: 'Who we fit' },
  { id: 'founder', label: 'The founder' },
  { id: 'help', label: 'Free help' },
  { id: 'proof', label: 'Reviews' },
  { id: 'realtors', label: 'For Realtors' },
]

const companies = [
  {
    Icon: Building2,
    name: 'OLH Property Management',
    what: 'The management company',
    b: 'Rent, tenants, maintenance and notices for Ontario landlords, run from our head office in Windsor.',
    link: { label: 'Property Management', href: url('property-management/') },
  },
  {
    Icon: Scale,
    name: 'Landlord Pro Legal Services P.C.',
    what: 'A licensed paralegal firm',
    b: 'Notices, Landlord and Tenant Board applications and hearings for landlords, under a separate written engagement.',
    link: { label: 'Legal help', href: url('legal/') },
  },
  {
    Icon: Landmark,
    name: 'List It Realty Brokerage Inc.',
    what: 'A licensed real estate brokerage',
    b: 'Flat-fee MLS® and REALTOR.ca listings for rentals and sales, and tenant placement.',
    link: { label: 'ListItMLS.ca', href: site.listit },
  },
  {
    Icon: MonitorSmartphone,
    name: 'LandlordEzy',
    what: 'The software',
    b: 'Built by Paul and used to run every OLH tenancy. Self-managing landlords across Canada use it directly.',
    link: { label: 'LandlordEzy.ca', href: site.ezy.home },
  },
]

const timeline = [
  { when: 'Age 8', t: 'Starts in rental housing', b: 'His parents become landlords. Repairs, emergencies and student turnovers become family work.' },
  { when: 'Age 15', t: 'Running the student rentals', b: 'Drafting leases and collecting rent from 50+ student tenants, every payment recorded by hand.' },
  { when: '2003', t: 'Starts managing for owners', b: 'The property management business that grew into OLH.' },
  { when: '2007', t: 'Opens a brokerage', b: 'His first real estate brokerage, and Young Entrepreneur of the Year the same year.' },
  { when: '2012', t: 'Flat-fee listings', b: 'The brokerage becomes a flat-fee MLS® listing platform, today List It Realty.' },
  { when: 'Today', t: 'One team', b: 'Management, paralegals, the brokerage and LandlordEzy working on the same files.' },
]

const testimonials = [
  { quote: 'One of the most informative conversations I’ve had as a landlord. Straightforward, honest, and extremely helpful.', who: 'Abid H., Local Guide' },
  { quote: 'Extremely responsive and they truly think on behalf of landlords. The process was structured and efficient.', who: 'Rajon M.' },
  { quote: 'They made complex LTB issues easy to understand and gave us a sensible solution with no strings attached.', who: 'Alex B.' },
]

export function About() {
  return (
    <>
      <ChapterNav title="Why OLH" chapters={chapters} cta={{ label: 'Book a call', href: site.live.book }} />

      {/* ---- Hero ----------------------------------------------------------- */}
      <PageHero
        eyebrow={`Why OLH · Since ${site.since}`}
        title="Management, paralegals and a brokerage. One team."
        lead="Many Ontario managers collect rent, call a contractor, and hand you to someone else when it goes wrong. We keep the legal work, the leasing and the software under one roof, so nothing is handed off."
        secondary={{ label: 'See how we compare', href: '#compare' }}
        note={`${site.proof.rating} on Google · ${site.proof.reviews} reviews · Founded by ${site.founder}`}
      />

      {/* ---- Compare -------------------------------------------------------- */}
      <Section id="compare" tone="alt" labelledBy="compare-title">
        <div className="wrap">
          <Heading
            id="compare-title"
            eyebrow="Side by side"
            title="OLH next to a typical Ontario manager."
            lead="“Typical Ontario manager” describes the common market model: a percentage fee, legal work referred out and leasing through someone else."
            size="md"
          />
          <div className="mx-auto mt-10 max-w-[64rem] rounded-4xl bg-white p-5 shadow-card sm:p-8 md:mt-12" data-reveal>
            <div className="cmp-scroll no-scrollbar" tabIndex={0} role="region" aria-label="OLH compared with a typical Ontario manager">
              <table className="cmp">
                <thead>
                  <tr>
                    <th scope="col">
                      <span className="sr-only">What matters</span>
                    </th>
                    <th scope="col">
                      <span className="block font-display text-[1.0625rem] font-semibold leading-tight text-ink-3">Typical Ontario manager</span>
                    </th>
                    <th scope="col" className="cmp-hi">
                      <span className="block font-display text-[1.0625rem] font-semibold leading-tight text-ink">OLH</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((r) => (
                    <tr key={r.row}>
                      <th scope="row">{r.row}</th>
                      <td className="text-ink-3">{r.typical}</td>
                      <td className="cmp-hi font-medium text-ink">{r.olh}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-center text-[0.8125rem] text-ink-4 md:hidden">Swipe sideways to compare.</p>
          </div>
          <Fine className="mx-auto mt-5 max-w-[64rem] text-center">
            Figures for other companies are illustrative; fees and services vary by company. Always confirm specifics with any company
            you’re considering, including us. OLH prices are monthly, plus HST.{' '}
            <a href={url('pricing/')}>See every price</a>
          </Fine>
        </div>
      </Section>

      {/* ---- One team ------------------------------------------------------- */}
      <Section id="team" labelledBy="team-title">
        <div className="wrap">
          <Heading
            id="team-title"
            eyebrow="Three licences, one team"
            title="Nothing gets handed off."
            lead="A management company, a licensed paralegal firm and a licensed brokerage, all running on software we built. When a tenancy needs the Board or a new tenant, the file stays with the same team."
            size="md"
          />
          <ul className="m-snap mx-auto mt-10 grid max-w-[72rem] gap-4 md:mt-12 md:grid-cols-2 lg:grid-cols-4">
            {companies.map(({ Icon, name, what, b, link }) => (
              <li key={name} className="tile spot flex flex-col p-6 sm:p-7" data-reveal>
                <span className="icon-badge">
                  <Icon className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
                </span>
                <p className="mt-5 text-[0.8125rem] font-semibold text-ink-3">{what}</p>
                <h3 className="mt-1 text-title">{name}</h3>
                <p className="mt-2 text-[0.9375rem] text-ink-3">{b}</p>
                <a href={link.href} className="link-more mt-auto pt-5 text-[0.9375rem]">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ---- Fit ------------------------------------------------------------ */}
      <Section id="fit" tone="alt" labelledBy="fit-title">
        <div className="wrap">
          <Heading
            id="fit-title"
            eyebrow="Straight answer"
            title="Who we fit. Who we don’t."
            lead="If we’re not the right fit, we’ll tell you on the first call rather than sell you a plan you’ll cancel."
            size="md"
          />
          <div className="mx-auto mt-10 grid max-w-[64rem] gap-5 md:mt-12 lg:grid-cols-2">
            <div className="tile-white p-7 sm:p-9" data-reveal>
              <h3 className="text-title">We’re a strong fit if you</h3>
              <ul className="mt-5 space-y-3 text-[0.9375rem]">
                {[
                  'Own residential rentals anywhere in Ontario',
                  'Are tired of a percentage of your rent leaving every month',
                  'Want legal help on the same team, not referred out',
                  'Have a tenant problem now and want a straight answer on it',
                  'Live out of town, out of province or overseas',
                  'Own a duplex, a triplex or a home with a basement suite',
                  'Want to see everything as it happens, not once a month',
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <Check className="mt-[3px] h-4 w-4 shrink-0 text-brand" strokeWidth={2.6} aria-hidden />
                    <span className="text-ink-2">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-4xl border border-line bg-white/60 p-7 sm:p-9" data-reveal>
              <h3 className="text-title">Call someone else if you need</h3>
              <ul className="mt-5 space-y-3 text-[0.9375rem]">
                {[
                  'A superintendent living on site at the building',
                  'Management of commercial or retail property',
                  'Short-term or Airbnb-style stays, which fall outside the Residential Tenancies Act work we do',
                  'The cheapest possible number and nothing else. We’re a flat fee for a real team, not the bargain end of the market',
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <X className="mt-[3px] h-4 w-4 shrink-0 text-ink-4" strokeWidth={2.4} aria-hidden />
                    <span className="text-ink-3">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* ---- Founder -------------------------------------------------------- */}
      <Section id="founder" labelledBy="founder-title">
        <div className="wrap">
          <div className="mx-auto grid max-w-[68rem] items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
              <p className="eyebrow">The founder</p>
              <h2 id="founder-title" className="mt-3 text-display-md">
                {site.founder} grew up in it.
              </h2>
              <p className="mt-5 text-ink-2">
                Paul’s parents travelled across Canada for work before buying their first property and, over time, several student
                rentals. As a teenager Paul was already showing units, collecting rent and dealing with tenants. He has led OLH since{' '}
                {site.since}.
              </p>
              <figure className="mt-8 rounded-4xl bg-canvas-alt p-7 sm:p-8">
                <Quote className="h-6 w-6 text-brand" strokeWidth={1.8} aria-hidden />
                <blockquote className="mt-4 font-display text-[1.375rem] font-semibold leading-snug tracking-[-0.015em] text-ink">
                  “I can train a licensed paralegal to be a great property manager, but I cannot train a property manager to become a
                  paralegal.”
                </blockquote>
                <figcaption className="mt-4 text-[0.9375rem] text-ink-3">{site.founder}</figcaption>
              </figure>
              <p className="mt-6 text-[0.9375rem] text-ink-3">
                Paul isn’t a paralegal himself. That belief is why he hires licensed paralegals into property management. It costs us
                more, and it protects you more. His father, Lionel Rouillard, taught him hard work, honesty and perseverance; Lionel’s
                guitar still hangs behind Paul’s desk.
              </p>
              <a href={site.live.paul} className="link-more mt-6">
                Meet Paul
              </a>
            </div>
            <ol className="relative space-y-3">
              {timeline.map((s, idx) => (
                <li key={s.when} className="flex gap-4 rounded-3xl bg-canvas-alt p-5" data-reveal style={{ ['--reveal-delay' as string]: `${idx * 0.05}s` }}>
                  <span className="w-16 shrink-0 font-display text-[1.0625rem] font-semibold tabular-nums text-brand-text">{s.when}</span>
                  <span>
                    <span className="block font-display text-[1.0625rem] font-semibold tracking-[-0.01em] text-ink">{s.t}</span>
                    <span className="mt-1 block text-[0.9375rem] text-ink-3">{s.b}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* ---- Free help ------------------------------------------------------ */}
      <Section id="help" tone="alt" labelledBy="help-title">
        <div className="wrap">
          <Heading
            id="help-title"
            eyebrow="Free help for landlords"
            title="Answers, whether or not you hire us."
            lead="Paul and the team answer landlord questions in the open, for free."
            size="md"
          />
          <ul className="m-snap mx-auto mt-10 grid max-w-[64rem] gap-4 md:mt-12 md:grid-cols-3">
            {[
              {
                Icon: Users,
                stat: site.proof.community,
                t: 'Community members',
                b: 'The Ontario Landlord Help Q&A group on Facebook, where landlords ask and the team answers.',
                link: { label: 'Join the group', href: site.social.facebookGroup },
              },
              {
                Icon: Video,
                stat: site.proof.videos,
                t: 'Free videos',
                b: 'N4 walkthroughs, LTB explainers and landlord basics from Paul, on YouTube and TikTok.',
                link: { label: 'Watch on YouTube', href: site.social.youtube },
              },
              {
                Icon: Handshake,
                stat: '15 min',
                t: 'Free call',
                b: 'A 15-minute call with our team about your rental or tenant problem. No obligation.',
                link: { label: 'Book a 15-minute call', href: site.live.book },
              },
            ].map(({ Icon, stat, t, b, link }) => (
              <li key={t} className="tile-white flex flex-col p-6 sm:p-7" data-reveal>
                <Icon className="h-5 w-5 text-brand" strokeWidth={1.8} aria-hidden />
                <p className="mt-4 font-display text-[2.25rem] font-bold leading-none tracking-[-0.03em]">{stat}</p>
                <h3 className="mt-2 font-display text-[1.125rem] font-semibold">{t}</h3>
                <p className="mt-1.5 text-[0.9375rem] text-ink-3">{b}</p>
                <a href={link.href} className="link-more mt-auto pt-5 text-[0.9375rem]" rel="noopener">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <p className="mx-auto mt-8 flex max-w-[64rem] flex-wrap justify-center gap-x-6 gap-y-2 text-[0.9375rem]">
            <a href={site.social.tiktok} rel="noopener">TikTok</a>
            <a href={site.social.linkedin} rel="noopener">LinkedIn</a>
            <a href={url('resources/')}>Guides and forms</a>
          </p>
        </div>
      </Section>

      {/* ---- Reviews and how to check us ------------------------------------ */}
      <Section id="proof" labelledBy="proof-title">
        <div className="wrap">
          <Heading
            id="proof-title"
            eyebrow="What landlords say"
            title={`${site.proof.rating} on Google, from ${site.proof.reviews} reviews.`}
            size="md"
          />
          <ul className="m-snap mx-auto mt-10 grid max-w-[68rem] gap-4 md:mt-12 md:grid-cols-3">
            {testimonials.map((r) => (
              <li key={r.who} className="tile flex flex-col p-7" data-reveal>
                <span className="flex gap-0.5 text-brand" role="img" aria-label="Five stars">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-4 w-4 fill-current" strokeWidth={0} aria-hidden />
                  ))}
                </span>
                <blockquote className="mt-4 text-ink-2">“{r.quote}”</blockquote>
                <p className="mt-auto pt-5 text-[0.9375rem] font-semibold text-ink">{r.who}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-center">
            <a href={site.reviewsUrl} className="link-more" rel="noopener">
              Read our Google reviews
            </a>
          </p>

          <div className="mx-auto mt-16 max-w-[64rem] rounded-5xl bg-canvas-alt p-7 sm:p-10">
            <div className="flex items-center gap-3">
              <BadgeCheck className="h-6 w-6 text-brand" strokeWidth={1.8} aria-hidden />
              <h3 className="text-headline">How to check us.</h3>
            </div>
            <p className="mt-3 max-w-[44rem] text-ink-3">
              Ask any company you’re considering the same questions as this page. We’d rather you check.
            </p>
            <ul className="mt-6 grid gap-3 md:grid-cols-3">
              {[
                { t: 'Law Society of Ontario', b: 'Confirm our paralegals are licensed in the LSO directory.', href: 'https://lso.ca/' },
                { t: 'RECO', b: 'Confirm List It Realty Brokerage Inc. with the Real Estate Council of Ontario.', href: 'https://www.reco.on.ca/' },
                { t: 'Google reviews', b: `Read all ${site.proof.reviews} reviews, not just the ones on this page.`, href: site.reviewsUrl },
              ].map((c) => (
                <li key={c.t}>
                  <a href={c.href} className="spot group flex h-full flex-col rounded-3xl bg-white p-5 text-ink shadow-card hover:no-underline" rel="noopener">
                    <span className="flex items-center justify-between gap-3 font-display text-[1.0625rem] font-semibold">
                      {c.t}
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-brand transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                    </span>
                    <span className="mt-1.5 block text-[0.9375rem] text-ink-3">{c.b}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ---- For Realtors --------------------------------------------------- */}
      <Section id="realtors" tone="alt" labelledBy="realtors-title">
        <div className="wrap">
          <Heading
            id="realtors-title"
            eyebrow="For Realtors®"
            title="Refer the management. Keep the client."
            lead="Your buyer closes on a rental and asks who’ll manage it. Send them to us. We run the tenancy, they stay your client, and when they sell, we send them back to you. In writing."
            size="md"
          />
          <ol className="m-snap mx-auto mt-10 grid max-w-[64rem] gap-4 md:mt-12 md:grid-cols-3">
            {[
              { t: 'We sign the agreement', b: 'A 15-minute call sets up a written referral agreement. One time, then it covers everyone you send.' },
              { t: 'You send an introduction', b: 'An email or a text with their name and number. We take it from there and keep you posted.' },
              { t: 'They’re managed, you’re credited', b: 'You stay their Realtor of record. When they buy again or sell, the transaction is yours.' },
            ].map((s, idx) => (
              <li key={s.t} className="tile-white p-7" data-reveal style={{ ['--reveal-delay' as string]: `${idx * 0.08}s` }}>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand text-[0.9375rem] font-semibold text-white">{idx + 1}</span>
                <h3 className="mt-5 text-title">{s.t}</h3>
                <p className="mt-2 text-[0.9375rem] text-ink-3">{s.b}</p>
              </li>
            ))}
          </ol>
          <div className="mx-auto mt-8 max-w-[64rem]">
            <p className="text-center text-[0.9375rem] font-semibold text-ink">Clients worth referring</p>
            <ul className="mt-4 flex flex-wrap justify-center gap-2">
              {['The investor buyer', 'The accidental landlord', 'The out-of-town owner', 'The inherited tenancy', 'The owner with a tenant problem', 'The small portfolio'].map((t) => (
                <li key={t} className="chip-brand !text-[0.875rem]">
                  {t}
                </li>
              ))}
            </ul>
            <p className="mx-auto mt-6 max-w-[44rem] text-center text-[0.9375rem] text-ink-3">
              Your client gets flat monthly management from {$.management}, never a percentage of their rent, with licensed paralegals
              on the same team and a live owner portal.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-[61.25rem]">
            <h3 className="text-headline">Questions.</h3>
            <FAQList className="mt-6" items={aboutFaqs} />
          </div>
        </div>
      </Section>

      <CTABand
        title="Check us, then call us."
        lead="A 15-minute call with our team. Bring your current manager’s statement or a quote, and we’ll tell you honestly if you should stay where you are."
      />
    </>
  )
}
