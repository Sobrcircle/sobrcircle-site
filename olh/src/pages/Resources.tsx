import { ArrowUpRight, BookOpen, Download, LifeBuoy, PlayCircle, Users } from 'lucide-react'
import { site, url } from '../site'
import { CTABand, FAQList, Fine, Heading, PageHero, Section } from '../components/ui'
import { ChapterNav } from '../components/ChapterNav'
import { TabPanel, TabRow } from '../components/interact'
import { downloadGroups, guides, official, tools, videoPicks } from '../content/resources'
import { resourcesFaqs } from '../content/faqs-resources'

const chapters = [
  { id: 'overview', label: 'Overview' },
  { id: 'start', label: 'Guides' },
  { id: 'tools', label: 'Tools' },
  { id: 'library', label: 'Forms and law' },
  { id: 'community', label: 'Videos' },
  { id: 'help', label: 'Software help' },
  { id: 'faq', label: 'Questions' },
]

export function Resources() {
  return (
    <>
      <ChapterNav title="Resources" chapters={chapters} cta={{ label: 'Book a call', href: site.live.book }} />

      <PageHero
        eyebrow="Resources"
        title="Free help for Ontario landlords."
        lead="Plain guides, official forms, the law itself and free tools, from the team that manages rentals and represents landlords at the Landlord and Tenant Board. All free. General information, not legal advice."
        secondary={{ label: 'Start with the guides', href: '#start' }}
      >
        <ul className="mx-auto mt-10 flex max-w-[40rem] flex-wrap justify-center gap-3 text-[0.9375rem]">
          <li className="flex items-center gap-2 rounded-full bg-canvas-alt px-4 py-2 text-ink-2">
            <Users className="h-4 w-4 text-brand" strokeWidth={2} aria-hidden />
            <span>
              <strong className="font-semibold text-ink">{site.proof.community}</strong> landlord community members
            </span>
          </li>
          <li className="flex items-center gap-2 rounded-full bg-canvas-alt px-4 py-2 text-ink-2">
            <PlayCircle className="h-4 w-4 text-brand" strokeWidth={2} aria-hidden />
            <span>
              <strong className="font-semibold text-ink">{site.proof.videos}</strong> free videos
            </span>
          </li>
        </ul>
      </PageHero>

      {/* ---- Start here: the four guides ------------------------------------------- */}
      <Section id="start" tone="alt" labelledBy="start-title">
        <div className="wrap">
          <Heading
            id="start-title"
            eyebrow="Start here"
            title="Four guides that cover most questions."
            lead="Written for owners in plain language, each with a last-reviewed date, and short enough to read before you act."
            size="md"
          />
          <ul className="m-snap mx-auto mt-10 grid max-w-[68rem] gap-4 md:mt-12 md:grid-cols-2">
            {guides.map(({ Icon, t, b, href, tag, cta }, idx) => (
              <li key={t} data-reveal style={{ ['--reveal-delay' as string]: `${idx * 0.06}s` }}>
                <a href={href} className="tile-white spot group flex h-full flex-col p-7 text-ink hover:no-underline sm:p-9">
                  <span className="flex items-center justify-between gap-3">
                    <span className="icon-badge">
                      <Icon className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
                    </span>
                    {tag && <span className="chip-gray">{tag}</span>}
                  </span>
                  <h3 className="mt-6 text-headline">{t}</h3>
                  <p className="mt-2 text-ink-3">{b}</p>
                  <span className="link-more mt-auto pt-6">{cta}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ---- Tools ------------------------------------------------------------------ */}
      <Section id="tools" labelledBy="tools-title">
        <div className="wrap">
          <Heading id="tools-title" eyebrow="Tools" title="Price it, screen it, look it up." size="md" />
          <ul className="m-snap mx-auto mt-10 grid max-w-[72rem] gap-4 md:mt-12 md:grid-cols-2 lg:grid-cols-3">
            {tools.map(({ Icon, t, b, href, tag, cta }) => (
              <li key={t} data-reveal>
                <a href={href} className="tile spot group flex h-full flex-col p-6 text-ink hover:no-underline sm:p-7">
                  <span className="flex items-center justify-between gap-3">
                    <span className="icon-badge">
                      <Icon className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
                    </span>
                    {tag && <span className={tag === 'Free' ? 'chip-brand' : 'chip-gray'}>{tag}</span>}
                  </span>
                  <h3 className="mt-5 text-title">{t}</h3>
                  <p className="mt-2 text-[0.9375rem] text-ink-3">{b}</p>
                  <span className="link-more mt-auto pt-5 text-[0.9375rem]">{cta}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ---- Forms and law --------------------------------------------------------- */}
      <Section id="library" tone="alt" labelledBy="library-title">
        <div className="wrap">
          <Heading
            id="library-title"
            eyebrow="Forms and law"
            title="The forms, and the law behind them."
            lead="Official Landlord and Tenant Board forms and our own templates in one download centre, and the Residential Tenancies Act section by section."
            size="md"
          />
          <div className="mx-auto mt-10 grid max-w-[72rem] gap-5 md:mt-12 lg:grid-cols-[1.35fr_1fr]">
            <div className="min-w-0 rounded-4xl bg-white p-7 shadow-card sm:p-9" data-reveal>
              <div className="flex items-center gap-3">
                <span className="icon-badge">
                  <Download className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
                </span>
                <h3 className="text-headline">Forms and downloads</h3>
              </div>
              <p className="mt-4 text-ink-3">
                More than 60 documents: every N notice, L and T application, the service and hearing forms, the Ontario Standard Lease,
                and LandlordEzy templates. Free. You enter your first name and email once.
              </p>
              <div className="mt-6" data-tabs-root>
                <TabRow name="dl" label="What the download centre holds" tabs={downloadGroups.map((g) => ({ key: g.key, label: g.label }))} />
                {downloadGroups.map((g, idx) => (
                  <TabPanel key={g.key} name="dl" tab={g.key} first={idx === 0} className="mt-5">
                    <dl className="space-y-4">
                      {g.groups.map((it) => (
                        <div key={it.t}>
                          <dt className="font-semibold text-ink">{it.t}</dt>
                          <dd className="mt-1 text-[0.9375rem] text-ink-3">{it.items}</dd>
                        </div>
                      ))}
                    </dl>
                  </TabPanel>
                ))}
              </div>
              <p className="mt-6 rounded-2xl bg-warn-soft px-4 py-3 text-[0.875rem] text-warn-ink">
                Some LTB forms were reissued in September 2026. Always check the form version on the{' '}
                <a href={official.ltb} className="text-warn-ink underline">
                  LTB’s site
                </a>{' '}
                before you serve or file.
              </p>
              <a href={official.downloads} className="btn-primary mt-6" rel="noopener">
                Open the download centre <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </div>

            <div className="flex min-w-0 flex-col rounded-4xl bg-white p-7 shadow-card sm:p-9" data-reveal>
              <div className="flex items-center gap-3">
                <span className="icon-badge">
                  <BookOpen className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
                </span>
                <h3 className="text-headline">Ontario Law Library</h3>
              </div>
              <p className="mt-4 text-ink-3">
                The Residential Tenancies Act, section by section: about 300 pages of the statute text, with plain-English summaries on
                the most-read sections and links to the matching LTB forms.
              </p>
              <ul className="mt-5 space-y-2 text-[0.9375rem] text-ink-2">
                {[
                  'Residential Tenancies Act, 2006',
                  'O. Reg. 516/06, the general regulation',
                  'O. Reg. 517/06, maintenance standards',
                  'Statutory Powers Procedure Act, for hearing procedure',
                  'Human Rights Code, for fair screening',
                ].map((t) => (
                  <li key={t} className="flex gap-2.5">
                    <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap items-center gap-x-6 gap-y-3 pt-7">
                <a href={official.lawLibrary} className="btn-primary" rel="noopener">
                  Open the law library <ArrowUpRight className="h-4 w-4" aria-hidden />
                </a>
                <a href={official.rta} className="link-more" rel="noopener">
                  Go straight to the Act
                </a>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ---- Videos and community ------------------------------------------------- */}
      <Section id="community" labelledBy="community-title">
        <div className="wrap">
          <Heading
            id="community-title"
            eyebrow="Videos and community"
            title="Watch it explained. Ask other landlords."
            lead="Free videos by Paul J. Rouillard, Broker of Record and licensed paralegal, and a private group for Ontario landlords."
            size="md"
          />
          <div className="mx-auto mt-10 grid max-w-[72rem] gap-5 md:mt-12 lg:grid-cols-2">
            <div className="tile spot flex flex-col p-7 sm:p-9" data-reveal>
              <span className="icon-badge">
                <PlayCircle className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
              </span>
              <h3 className="mt-5 text-headline">{site.proof.videos} videos on YouTube</h3>
              <p className="mt-2 text-ink-3">N4 and unpaid rent, LTB hearings, Bill 60, screening, inspections and rent increases. Some favourites, each with a written guide and transcript:</p>
              <ul className="mt-5 divide-y divide-line-soft border-y border-line-soft">
                {videoPicks.map((v) => (
                  <li key={v.href}>
                    <a href={v.href} className="flex items-center justify-between gap-4 py-3 text-[0.9375rem] text-ink hover:no-underline" rel="noopener">
                      <span>{v.t}</span>
                      <span className="shrink-0 tabular-nums text-ink-4">{v.len}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <a href={site.social.youtube} className="link-more mt-auto pt-6" rel="noopener">
                Open the YouTube channel
              </a>
            </div>
            <div className="tile spot flex flex-col p-7 sm:p-9" data-reveal>
              <span className="icon-badge">
                <Users className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
              </span>
              <h3 className="mt-5 text-headline">{site.proof.community} landlords on Facebook</h3>
              <p className="mt-2 text-ink-3">
                A private, members-only group for everything about being a landlord in Ontario: notices, tenants, repairs, rent and the
                Board. Ask a question, or see how others handled the same thing.
              </p>
              <p className="mt-4 text-[0.9375rem] text-ink-3">
                Posts are members’ own views. For your own file, talk to a paralegal.
              </p>
              <a href={site.social.facebookGroup} className="link-more mt-auto pt-6" rel="noopener">
                Join the Facebook group
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* ---- LandlordEzy help centre --------------------------------------------- */}
      <Section id="help" tone="alt" labelledBy="help-title">
        <div className="wrap">
          <div className="mx-auto grid max-w-[64rem] items-center gap-8 rounded-5xl bg-white p-7 shadow-card sm:p-10 lg:grid-cols-[1fr_1.1fr] lg:gap-12" data-reveal>
            <div>
              <span className="icon-badge">
                <LifeBuoy className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
              </span>
              <p className="eyebrow mt-5">For LandlordEzy users</p>
              <h2 id="help-title" className="mt-2 text-display-md">
                The software help centre.
              </h2>
              <p className="mt-4 text-ink-3">
                How-to articles for people using LandlordEzy. They explain the software, not the law: for the rules, use the guides
                above.
              </p>
              <a href={official.help} className="btn-primary mt-7" rel="noopener">
                Open the help centre <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
            <dl className="space-y-5">
              {[
                { t: 'Owners', b: 'Adding properties and tenants, e-signed leases, screening and Equifax checks, the rent ledger and reminders, N1 and N4 notices, maintenance and inspections.' },
                { t: 'Tenants', b: 'Your account, signing a lease online, rent history and receipts, maintenance requests and messaging your landlord.' },
                { t: 'Property managers', b: 'Owners and co-ownership, owner ledgers and statements, bills and the owner portal.' },
              ].map((r) => (
                <div key={r.t} className="rounded-3xl bg-canvas-alt p-5">
                  <dt className="font-display text-[1.0625rem] font-semibold">{r.t}</dt>
                  <dd className="mt-1 text-[0.9375rem] text-ink-3">{r.b}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      {/* ---- FAQ ------------------------------------------------------------------- */}
      <Section id="faq" labelledBy="faq-title">
        <div className="wrap-content">
          <h2 id="faq-title" className="text-display-md">
            Questions.
          </h2>
          <FAQList className="mt-8 md:mt-10" items={resourcesFaqs} />
          <Fine className="mt-8">
            Owner of a SIREG or Simple Investor unit? See the <a href={url('sireg/')}>SIREG owners page</a>. For official forms and rules,
            go to the <a href={official.ltb}>Landlord and Tenant Board</a>.
          </Fine>
        </div>
      </Section>

      <CTABand
        title="Self-help not enough?"
        lead="If you have a non-paying tenant, a Board matter that’s getting complicated or an eviction that has gone sideways, a 15-minute call with our team is the next step."
        secondary={{ label: 'See legal help', href: url('legal/') }}
      />
    </>
  )
}
