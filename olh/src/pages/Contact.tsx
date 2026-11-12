import { ArrowUpRight, CalendarCheck, Clock, Mail, MapPin, MonitorSmartphone, Phone, Scale, Wallet, Wrench } from 'lucide-react'
import { site, url } from '../site'
import { cities, cityUrl, regions } from '../content/cities'
import { contactFaqs } from '../content/faqs-contact'
import { CTABand, FAQList, Fine, Heading, PageHero, Section } from '../components/ui'
import { ChapterNav } from '../components/ChapterNav'
import { TabPanel, TabRow } from '../components/interact'

const chapters = [
  { id: 'overview', label: 'Reach us' },
  { id: 'office', label: 'Head office' },
  { id: 'anywhere', label: 'Anywhere in Ontario' },
  { id: 'areas', label: 'Service areas' },
  { id: 'faq', label: 'Questions' },
]

const slug = (s: string) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const { street, city, region, postal } = site.address
const addressLine = `${street}, ${city}, ${region} ${postal}`
const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${street} ${city} ${region}`)}`

export function Contact() {
  const ways = [
    {
      Icon: CalendarCheck,
      t: 'Book a 15-minute call',
      d: 'A dedicated time with our team. Pick any open slot, day or night.',
      action: 'Pick a time',
      href: site.live.book,
      track: 'book-call:contact',
      hi: true,
    },
    {
      Icon: Phone,
      t: 'Call or text',
      d: `${site.phone.display}. Best for a quick question during office hours.`,
      action: 'Call now',
      href: `tel:${site.phone.tel}`,
      track: 'phone:contact',
    },
    {
      Icon: Mail,
      t: 'Email',
      d: `${site.email}. Best for documents and questions that aren’t urgent.`,
      action: 'Write to us',
      href: `mailto:${site.email}`,
      track: 'email:contact',
    },
  ]
  return (
    <>
      <ChapterNav title="Contact" chapters={chapters} cta={{ label: 'Book a call', href: site.live.book }} />

      {/* ---- Hero: three ways to reach us ----------------------------------- */}
      <PageHero
        eyebrow="Contact OLH"
        title="Talk to our team."
        lead="A non-paying tenant, a Board deadline, a vacancy or full management: tell us what’s going on and we’ll tell you plainly what we’d do. The first 15 minutes are free."
        primary={null}
      >
        <ul className="mx-auto mt-10 grid max-w-[64rem] gap-3 md:grid-cols-3">
          {ways.map(({ Icon, t, d, action, href, track, hi }) => (
            <li key={t}>
              <a
                href={href}
                className={`spot group flex h-full flex-col rounded-4xl p-6 hover:no-underline ${hi ? 'tile-dark bg-brand-ink text-white' : 'bg-canvas-alt text-ink'}`}
                data-track={track}
              >
                <Icon className={`h-6 w-6 ${hi ? 'text-brand-glow' : 'text-brand'}`} strokeWidth={1.8} aria-hidden />
                <span className={`mt-4 block font-display text-[1.25rem] font-semibold tracking-[-0.015em] ${hi ? 'text-white' : ''}`}>{t}</span>
                <span className={`mt-1 block text-[0.9375rem] ${hi ? 'text-white/70' : 'text-ink-3'}`}>{d}</span>
                <span className={`mt-auto inline-flex items-center gap-1 pt-5 text-[0.9375rem] font-semibold ${hi ? 'text-brand-glow' : 'text-brand-text'}`}>
                  {action}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="mx-auto mt-6 flex max-w-[64rem] items-start gap-3 rounded-3xl border border-line-soft px-5 py-4 text-[0.9375rem] text-ink-2">
          <Clock className="mt-[3px] h-4 w-4 shrink-0 text-brand" strokeWidth={2} aria-hidden />
          <p>
            <strong className="font-semibold text-ink">Office hours: {site.hours}.</strong> Closed weekends and statutory holidays.
            Booking and email stay open, and we reply by the next business day.
          </p>
        </div>
      </PageHero>

      {/* ---- Head office --------------------------------------------------- */}
      <Section id="office" tone="alt" labelledBy="office-title">
        <div className="wrap">
          <div className="mx-auto grid max-w-[64rem] items-center gap-10 rounded-5xl bg-white p-7 shadow-card sm:p-12 lg:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="eyebrow">Head office</p>
              <h2 id="office-title" className="mt-3 text-display-md">
                {city}, Ontario.
              </h2>
              <p className="mt-4 text-ink-3">
                {site.name} is based in {city}. From here we work with landlords across Ontario.
              </p>
              <a href={mapUrl} className="link-more mt-6" rel="noopener">
                Open in Google Maps
              </a>
            </div>
            <ul className="space-y-5 text-[0.9375rem]">
              {[
                { Icon: MapPin, k: 'Address', v: <>{addressLine}</> },
                { Icon: Phone, k: 'Call or text', v: <a href={`tel:${site.phone.tel}`}>{site.phone.display}</a> },
                { Icon: Mail, k: 'Email', v: <a href={`mailto:${site.email}`}>{site.email}</a> },
                { Icon: Clock, k: 'Office hours', v: <>{site.hours}. Closed weekends and statutory holidays.</> },
              ].map(({ Icon, k, v }) => (
                <li key={k} className="flex gap-4">
                  <span className="icon-badge shrink-0">
                    <Icon className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
                  </span>
                  <div>
                    <p className="font-semibold text-ink">{k}</p>
                    <p className="mt-0.5 text-ink-2">{v}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ---- Anywhere in Ontario ------------------------------------------- */}
      <Section id="anywhere" labelledBy="anywhere-title">
        <div className="wrap">
          <Heading
            id="anywhere-title"
            eyebrow="Province-wide"
            title="You don’t need to be near Windsor."
            lead="Most of what we do happens on the phone, by video and in LandlordEzy. When something needs someone on site, we book it where your property is."
            size="md"
          />
          <ul className="m-snap mx-auto mt-10 grid max-w-[68rem] gap-4 md:mt-12 md:grid-cols-2 lg:grid-cols-4">
            {[
              { Icon: MonitorSmartphone, t: 'Virtual onboarding', b: 'Consultations, sign-up and tenant onboarding by phone, video and your owner portal, anywhere in Ontario.' },
              { Icon: Wrench, t: 'Local when needed', b: 'Showings and site visits are booked locally when you need them, subject to availability, and confirmed with you first.' },
              { Icon: Scale, t: 'Paralegals province-wide', b: 'Our licensed paralegals represent landlords at the Landlord and Tenant Board across Ontario.' },
              { Icon: Wallet, t: 'One price list', b: 'The same plans and prices in every region. No city surcharge on the monthly fee.' },
            ].map(({ Icon, t, b }) => (
              <li key={t} className="tile spot p-6" data-reveal>
                <span className="icon-badge">
                  <Icon className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-[1.125rem] font-semibold tracking-[-0.01em]">{t}</h3>
                <p className="mt-1.5 text-[0.9375rem] text-ink-3">{b}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center">
            <a href={url('pricing/')} className="link-more">
              See the plans
            </a>
          </p>
        </div>
      </Section>

      {/* ---- Service areas ------------------------------------------------- */}
      <Section id="areas" tone="alt" labelledBy="areas-title">
        <div className="wrap">
          <Heading
            id="areas-title"
            eyebrow="Service areas"
            title={`${cities.length} Ontario cities, ${regions.length} regions.`}
            lead="Pick your region. Don’t see your city? Ask us on a call."
            size="md"
          />
          <div className="mx-auto mt-10 max-w-[72rem] md:mt-12" data-tabs-root>
            <TabRow name="areas" label="Regions we serve" tabs={regions.map((r) => ({ key: slug(r), label: r }))} className="mx-auto" />
            {regions.map((r, idx) => {
              const here = cities.filter((c) => c.region === r)
              return (
                <TabPanel key={r} name="areas" tab={slug(r)} first={idx === 0} className="mt-5">
                  <p className="tabpanel-label">{r}</p>
                  <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {here.map((c) => (
                      <li key={c.slug}>
                        <a href={cityUrl(c)} className="spot group flex h-full flex-col rounded-3xl bg-white p-5 text-ink shadow-card hover:no-underline">
                          <span className="flex items-start justify-between gap-3">
                            <span className="font-display text-[1.125rem] font-semibold tracking-[-0.01em]">{c.name}</span>
                            <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-brand transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                          </span>
                          {c.slug === 'windsor' && <span className="chip-brand mt-2 w-fit">Head office</span>}
                          <span className="mt-2 block text-[0.875rem] leading-snug text-ink-3">{c.hoods.join(' · ')}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </TabPanel>
              )
            })}
          </div>
          <Fine className="mx-auto mt-8 max-w-[56rem] text-center">
            Neighbourhoods are examples, not limits. City pages open on our current site. Local visits and showings are booked as needed
            and subject to availability.
          </Fine>
        </div>
      </Section>

      {/* ---- FAQ ------------------------------------------------------------ */}
      <Section id="faq" labelledBy="faq-title">
        <div className="wrap-content">
          <h2 id="faq-title" className="text-display-md">
            Before you get in touch.
          </h2>
          <FAQList className="mt-8 md:mt-10" items={contactFaqs} />
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-2">
            <a href={url('about/')} className="link-more">
              Why OLH
            </a>
            <a href={url('about/#realtors')} className="link-more">
              Realtor referrals
            </a>
          </div>
        </div>
      </Section>

      <CTABand title="Fifteen minutes. No obligation." lead="Tell us about your rental or your tenant problem. We’ll tell you plainly what we’d do, and what it costs." />
    </>
  )
}
