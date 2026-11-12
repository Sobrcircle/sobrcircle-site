import { ArrowUpRight, Building2, Check, ClipboardList, Handshake, Link2, Newspaper, PenLine, Scale, Users, X } from 'lucide-react'
import { live, site, url } from '../site'
import { CTABand, FAQList, Fine, Heading, PageHero, Section, type IconType } from '../components/ui'
import { ChapterNav } from '../components/ChapterNav'
import { siregFaqs } from '../content/faqs-sireg'

const chapters = [
  { id: 'overview', label: 'Overview' },
  { id: 'links', label: 'Owner Centre links' },
  { id: 'role', label: 'What OLH does' },
  { id: 'faq', label: 'Questions' },
]

const onboard = 'https://landlordezy.ca/sireg/onboard'
const lso = 'https://lso.ca/public-resources/finding-a-lawyer-or-paralegal/law-society-referral-service'

/** One line and one link per route. Everything dated lives on the live Owner Centre. */
const routes: { Icon: IconType; t: string; b: string; href: string; tag: string; paid?: boolean }[] = [
  {
    Icon: Building2,
    t: 'Owner Centre',
    b: 'Next steps for owners, the owner video series and the owner Q&A. Kept current.',
    href: live('/sireg-investors'),
    tag: 'Free',
  },
  {
    Icon: Newspaper,
    t: 'Dated updates and sources',
    b: 'Newest first, with official sources. A replaced update is labelled, and a correction is published, not rewritten.',
    href: live('/sireg-investors#updates'),
    tag: 'Free',
  },
  {
    Icon: ClipboardList,
    t: 'Owner Registry',
    b: 'Register each unit you own, by city and building. Not a voting list, proxy or legal ownership register, and it doesn’t make you an OLH client.',
    href: live('/sireg-owner-registry'),
    tag: 'Free',
  },
  {
    Icon: Users,
    t: 'Condominium Owner Initiative',
    b: 'Condominium owners organising at the corporation level. Registering is not a retainer, a proxy, a vote or a payment.',
    href: live('/sireg-condominium-owner-initiative'),
    tag: 'Free',
  },
  {
    Icon: Link2,
    t: 'Connect My Unit',
    b: 'Owners and tenants of the same unit find each other, privately. Nothing is shared unless both agree. A match is not permission to collect rent.',
    href: 'https://connectmyunit.ca/',
    tag: 'Free',
  },
  {
    Icon: Handshake,
    t: 'How matching works',
    b: 'The matching rules, privacy, and the information, neutrality and correction notice.',
    href: live('/sireg-unit-connections'),
    tag: 'Free',
  },
  {
    Icon: Scale,
    t: 'Independent legal support',
    b: 'How owners can reach an independent Ontario lawyer about their own agreement. OLH does not give that advice.',
    href: live('/sireg-legal-support'),
    tag: 'Independent',
  },
  {
    Icon: PenLine,
    t: 'Property management sign-up',
    b: 'For owners who choose OLH. You read and sign the full agreement online before any payment.',
    href: onboard,
    tag: 'Optional, paid',
    paid: true,
  },
]

const does = [
  'Shares information and resources that owners can use without hiring OLH.',
  'Runs the free Owner Registry and the Condominium Owner Initiative.',
  'Publishes dated updates and keeps the record: replaced updates stay up, labelled.',
  'Offers property management to owners who choose it, on a written agreement.',
  'Collects rent for a unit only after that owner’s file is cleared and OLH’s authority for the unit is confirmed.',
]

const doesNot = [
  'Give legal advice, including about your SIREG or Simple Investor agreement.',
  'Tell any owner to end an agreement, or say that anyone’s agreement has ended.',
  'Tell any tenant to change how or where rent is paid.',
  'Require you to hire OLH to register, join a group or use the free routes.',
  'Speak for SIREG Management, The Simple Investor, any insolvency professional or any condominium corporation.',
]

function RouteCard({ Icon, t, b, href, tag, paid }: (typeof routes)[number]) {
  return (
    <li>
      <a
        href={href}
        className={`spot group flex h-full flex-col rounded-4xl bg-white p-6 text-ink hover:no-underline ${paid ? 'ring-1 ring-line' : 'shadow-card'}`}
        rel="noopener"
        data-track={`sireg:${t}`}
      >
        <span className="flex items-center justify-between gap-3">
          <span className="icon-badge">
            <Icon className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
          </span>
          <span className={paid ? 'chip-gray' : 'chip-brand'}>{tag}</span>
        </span>
        <span className="mt-5 block font-display text-[1.125rem] font-semibold tracking-[-0.01em]">
          {t} <ArrowUpRight className="inline h-4 w-4 text-brand transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
        </span>
        <span className="mt-1.5 block text-[0.9375rem] text-ink-3">{b}</span>
      </a>
    </li>
  )
}

export function Sireg() {
  return (
    <>
      <ChapterNav title="SIREG owners" chapters={chapters} cta={{ label: 'Owner Centre', href: live('/sireg-investors') }} />

      <PageHero
        eyebrow="SIREG and Simple Investor owners"
        title="One place to start, for affected unit owners."
        lead="For owners of units managed by SIREG Management or The Simple Investor, and their tenants. The live Owner Centre holds the free routes, the dated updates and the official sources. This page points you to each one."
        primary={{ label: 'Open the Owner Centre', href: live('/sireg-investors') }}
        secondary={{ label: 'What OLH does and doesn’t do', href: '#role' }}
        note="General information, not legal advice."
      >
        <div className="mx-auto mt-12 max-w-[52rem] rounded-4xl bg-canvas-alt p-6 text-[0.9375rem] leading-relaxed text-ink-2 sm:p-8" data-reveal>
          <p>
            <strong className="font-semibold text-ink">Independent.</strong> OLH is not affiliated with or endorsed by SIREG Management
            Inc., The Simple Investor, any related company, any insolvency professional, any condominium corporation or board, or their
            legal counsel.
          </p>
          <p className="mt-3">
            <strong className="font-semibold text-ink">Your decisions are your own.</strong> Everything here is general information. You
            decide whether and how to use it. OLH does not tell any owner or tenant to cancel or end an agreement, to change where rent is
            paid, or to hire OLH, and does not give legal advice.
          </p>
        </div>
      </PageHero>

      {/* ---- Link grid -------------------------------------------------------------- */}
      <Section id="links" tone="alt" labelledBy="links-title">
        <div className="wrap">
          <Heading
            id="links-title"
            eyebrow="The live Owner Centre"
            title="Every route, one click away."
            lead="These pages are kept current on the live site. We link to them rather than repeat them, so there is one record."
            size="md"
          />
          <h3 className="mx-auto mt-10 max-w-[72rem] text-[0.9375rem] font-semibold text-ink-3 md:mt-12">Free, and none of it requires hiring OLH</h3>
          <ul className="mx-auto mt-4 grid max-w-[72rem] gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {routes.filter((r) => !r.paid && r.tag === 'Free').map((r) => (
              <RouteCard key={r.t} {...r} />
            ))}
          </ul>
          <h3 className="mx-auto mt-8 max-w-[72rem] text-[0.9375rem] font-semibold text-ink-3">Legal help and the optional service</h3>
          <ul className="mx-auto mt-4 grid max-w-[72rem] gap-3 sm:grid-cols-2">
            {routes.filter((r) => r.paid || r.tag !== 'Free').map((r) => (
              <RouteCard key={r.t} {...r} />
            ))}
          </ul>
          <p className="mx-auto mt-8 max-w-[52rem] text-center text-[0.9375rem] text-ink-3">
            Also: the <a href="https://landlordezy.ca/landlordtalk/sireg-owners-qa">SIREG Owners Q&amp;A</a> on LandlordTalk, the{' '}
            <a href="https://www.facebook.com/groups/siregsimpleinvestorownersontario/">public SIREG help group</a> on Facebook (posts are
            members’ own statements), and the owner videos on <a href={site.social.youtube}>YouTube</a>.
          </p>
          <div className="mx-auto mt-6 max-w-[52rem] rounded-3xl bg-white p-5 text-[0.9375rem] text-ink-2 shadow-card sm:p-6">
            <strong className="font-semibold text-ink">Tenants:</strong> don’t change how or where you pay rent because of a public post.
            Act only on verified written information for your own unit.
          </div>
        </div>
      </Section>

      {/* ---- What OLH does and doesn't do ------------------------------------------- */}
      <Section id="role" labelledBy="role-title">
        <div className="wrap">
          <Heading id="role-title" eyebrow="Our role" title="What OLH does, and what it doesn’t." size="md" />
          <div className="mx-auto mt-10 grid max-w-[64rem] gap-5 md:mt-12 md:grid-cols-2">
            <div className="tile p-7 sm:p-8" data-reveal>
              <h3 className="text-title">OLH does</h3>
              <ul className="mt-5 space-y-3 text-[0.9375rem] text-ink-2">
                {does.map((t) => (
                  <li key={t} className="flex gap-3">
                    <Check className="mt-[3px] h-4 w-4 shrink-0 text-brand" strokeWidth={2.6} aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="tile p-7 sm:p-8" data-reveal>
              <h3 className="text-title">OLH does not</h3>
              <ul className="mt-5 space-y-3 text-[0.9375rem] text-ink-2">
                {doesNot.map((t) => (
                  <li key={t} className="flex gap-3">
                    <X className="mt-[3px] h-4 w-4 shrink-0 text-ink-4" strokeWidth={2.6} aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mx-auto mt-5 max-w-[64rem] rounded-4xl bg-brand-soft p-7 sm:p-8" data-reveal>
            <h3 className="text-title">Joining OLH is optional.</h3>
            <p className="mt-3 text-ink-2">
              Signing up is your voluntary decision. OLH does not advise you to end another agreement. Get independent legal advice about
              your existing agreement before you change anything. Registering, owner groups and general information never require hiring
              OLH.
            </p>
            <p className="mt-3 text-ink-2">
              Owners who have already signed up keep the terms of their own agreement. For OLH’s current plans and prices, see{' '}
              <a href={url('pricing/')}>pricing</a>.
            </p>
          </div>
          <Fine className="mx-auto mt-5 max-w-[64rem] text-center">
            Need a lawyer for your own agreement? The <a href={lso}>Law Society Referral Service</a> can help you find one. Corrections to
            anything we publish: <a href={`mailto:${site.email}`}>{site.email}</a>.
          </Fine>
        </div>
      </Section>

      {/* ---- FAQ ------------------------------------------------------------------- */}
      <Section id="faq" tone="alt" labelledBy="faq-title">
        <div className="wrap-content">
          <h2 id="faq-title" className="text-display-md">
            Questions.
          </h2>
          <FAQList className="mt-8 md:mt-10" items={siregFaqs} />
        </div>
      </Section>

      <CTABand
        title="Questions about your unit?"
        lead="The live Owner Centre has the next steps, the dated updates and the owner Q&A. If you’d like to talk to our team, a 15-minute call is free and creates no obligation."
        primary={{ label: 'Open the Owner Centre', href: live('/sireg-investors') }}
        secondary={{ label: 'Book a 15-minute call', href: site.live.book }}
      />
    </>
  )
}
