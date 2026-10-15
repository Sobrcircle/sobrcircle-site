import {
  ArrowRightLeft,
  CalendarCheck,
  CreditCard,
  Inbox,
  KeyRound,
  PieChart,
  Receipt,
  Sparkles,
  Users,
} from 'lucide-react'
import { site, url } from '../site'
import { Actions, CheckList, CTABand, FAQList, FeatureTile, Fine, Heading, LocalNav, Section, Steps } from '../components/ui'
import { pmFaqs } from '../content/faqs'
import { MaintenanceScreen, OwnerStatementScreen } from '../components/mocks/screens'
import { pmPlans } from '../content/pricing'


export function PropertyManagers() {
  const manage = pmPlans[1]
  const growth = pmPlans[2]
  return (
    <>
      <LocalNav
        title="For property managers"
        links={[
          { label: 'Overview', href: '#overview' },
          { label: 'Owners', href: '#owners' },
          { label: 'Growth', href: '#growth' },
          { label: 'Plans', href: '#plans' },
          { label: 'FAQ', href: '#faq' },
        ]}
        cta={{ label: 'Start free', href: site.app.signup }}
      />
      <section id="overview" data-hero className="overflow-hidden bg-white pb-16 pt-14 sm:pt-20">
        <div className="wrap text-center">
          <p className="eyebrow">For property management companies</p>
          <h1 className="mx-auto mt-3 max-w-[16ch] text-display-xl">Win the door. Then run it beautifully.</h1>
          <p className="mx-auto mt-6 max-w-[42rem] text-lead text-ink-3">
            Canadian property management software built by a company that manages hundreds of Ontario doors itself: owner
            accounting and statements, a CRM that wins clients, and the Ontario legal tools in one team login.
          </p>
          <div className="mt-9">
            <Actions secondary={{ label: 'Try the live demo', href: url('demo/') }} note="Free to start · $29.99/month + $1/door for full management" />
          </div>
        </div>
        <div className="wrap mt-16">
          <div className="hero-rise mx-auto max-w-[64rem]">
            <OwnerStatementScreen />
          </div>
        </div>
      </section>

      <Section tone="alt" id="owners" labelledBy="owners-title">
        <div className="wrap">
          <Heading
            id="owners-title"
            eyebrow="Owner accounting"
            title="Month-end in an afternoon."
            lead="Every owner, every tenant, paid or owing, fees, bills and the net draw, reconciled on one page with a sign-off sheet for payouts. Finalize the month and it archives itself."
            size="md"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <FeatureTile surface="white" icon={Users} title="Owners and co-ownership" body="Split co-owned buildings by percentage and set fees per owner." />
            <FeatureTile surface="white" icon={PieChart} title="Statements owners open" body="Monthly PDF statements, emailed with an audit trail of what was sent and when it was opened." />
            <FeatureTile surface="white" icon={KeyRound} title="Read-only owner portal" body="Owners see their properties and statements. You control exactly what each one sees." />
            <FeatureTile surface="white" icon={Receipt} title="Bills owners approve by text" body="AI reads a contractor quote; the owner e-signs approval by email or text; the bill posts to their statement." />
            <FeatureTile surface="white" icon={CreditCard} title="Fees collected, matched" body="Owners pay management fees by card or e-Transfer; payments match each owner automatically." />
            <FeatureTile surface="white" icon={ArrowRightLeft} title="Rent through to owners" body="Interac e-Transfers are matched to tenants and flow straight into owner accounting. No processing fees." />
          </div>
        </div>
      </Section>

      <Section id="growth" labelledBy="growth-title">
        <div className="wrap grid items-center gap-14 lg:grid-cols-2">
          <div data-reveal>
            <p className="eyebrow">A CRM built for property management</p>
            <h2 id="growth-title" className="mt-3 text-display-md">
              A sales CRM stops at “won.” Property management starts there.
            </h2>
            <p className="mt-5 text-lead text-ink-3">
              Capture every landlord enquiry from your website, phone or a booked meeting. Ezy AI reads the call and writes the
              recap. Follow-ups go out on their own and stop the moment a landlord replies. Then the management agreement is
              e-signed and a setup checklist opens for whoever onboards them.
            </p>
            <CheckList
              className="mt-8"
              items={[
                'Website lead widget for WordPress, Wix or any site',
                'Meeting scheduler synced to your Outlook calendar',
                'Management agreements e-signed in the platform',
                'Replaces separate CRM, e-signature and scheduling subscriptions',
              ]}
            />
          </div>
          <div className="mock-fit" style={{ ['--em' as string]: '34' }} data-reveal="scale">
            <div className="mock" aria-hidden="true">
              <div className="m-card !rounded-[1.3em] !p-[1.4em]">
                <p className="m-label flex items-center gap-[0.4em]">
                  <Inbox className="m-ico-s" /> Lead pipeline
                </p>
                {[
                  ['New enquiry', 'K. Osei · 4-plex · Kitchener', 'brand'],
                  ['Call recap sent', 'Lakeshore Holdings · 14 doors', 'gray'],
                  ['Follow-up 2 of 4', 'D. Fournier · 2 doors', 'warn'],
                  ['Agreement signed', 'M. & S. Kowalski · 3 doors', 'go'],
                ].map(([s, n, t]) => (
                  <div key={n} className="m-row">
                    <span className="m-sm font-medium">{n}</span>
                    <span className={`m-pill ${t}`}>{s}</span>
                  </div>
                ))}
                <div className="mt-[0.9em] rounded-[0.9em] bg-[#050c3b] p-[0.95em] text-white">
                  <p className="m-xs flex items-center gap-[0.4em] font-semibold text-[#4c9bff]">
                    <Sparkles className="m-ico-s" /> Ezy AI · follow-up draft
                  </p>
                  <p className="m-sm mt-[0.35em] leading-snug text-white/85 wrap-ok">
                    “Hi Daniel, following up on your two units on Ouellette. Thursday works for a walkthrough if that suits you.”
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section tone="alt" labelledBy="ops-title">
        <div className="wrap grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
          <MaintenanceScreen className="mx-auto w-full max-w-[32rem]" />
          <div data-reveal>
            <p className="eyebrow">Operations</p>
            <h2 id="ops-title" className="mt-3 text-display-md">
              One team. One record. Fewer phone calls.
            </h2>
            <p className="mt-5 text-lead text-ink-3">
              Maintenance dispatch, a shared operations calendar, notes with @mentions, broadcasts to whole buildings and utilities
              tracking, all attached to the tenancy so nothing lives in a group chat.
            </p>
            <a href={url('maintenance/')} className="link-more mt-7">
              See maintenance automation
            </a>
          </div>
        </div>
      </Section>

      <Section labelledBy="switch-title">
        <div className="wrap">
          <Heading
            id="switch-title"
            eyebrow="Switching is the easy part"
            title="Bring your whole book over in minutes."
            size="md"
          />
          <div className="mt-12">
            <Steps
              steps={[
                { title: 'Upload what you have.', body: 'Reports, spreadsheets or exports from Buildium, AppFolio, Yardi or anything else.' },
                { title: 'AI builds your book.', body: 'Owners, properties, units, tenants and leases are created and linked for you.' },
                { title: 'Go live.', body: 'Or let the concierge team do the whole import with you for $159, one time.' },
              ]}
            />
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-2 text-[0.8125rem] text-ink-3">
            {['Buildium', 'AppFolio', 'Yardi Breeze', 'DoorLoop', 'TenantCloud', 'Rentec Direct', 'Propertyware'].map((n) => (
              <span key={n} className="rounded-full bg-canvas-alt px-3 py-1.5">
                Switching from {n}
              </span>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="alt" id="plans" labelledBy="plans-title">
        <div className="wrap">
          <Heading id="plans-title" eyebrow="Plans" title="The door price never changes. Only the licence does." size="md" />
          <div className="mx-auto mt-12 grid max-w-[62rem] gap-5 md:grid-cols-2">
            {[manage, growth].map((p) => (
              <div key={p.id} className={`flex flex-col rounded-4xl bg-white p-8 sm:p-9 ${p.popular ? 'shadow-float ring-2 ring-brand' : 'shadow-card'}`} data-reveal>
                <div className="flex items-center justify-between">
                  <h3 className="text-title">{p.name}</h3>
                  {p.popular && <span className="chip-brand">Most popular</span>}
                </div>
                <p className="mt-5 font-display text-[3rem] font-bold leading-none tracking-[-0.035em]">
                  ${p.base}
                  <span className="text-[1rem] font-medium tracking-normal text-ink-3"> /month + $1 per door</span>
                </p>
                <p className="mt-6 font-semibold">{p.intro}</p>
                <CheckList className="mt-4 text-[0.9375rem]" items={p.features} />
                <a href={site.app.signup} className={`${p.popular ? 'btn-primary' : 'btn-secondary'} mt-8`}>
                  Start free, upgrade anytime
                </a>
              </div>
            ))}
          </div>
          <Fine className="mt-8 text-center">
            PM Free costs nothing and includes unlimited owners, properties and units. Prices in CAD, plus HST.{' '}
            <a href={url('pricing/')}>Compare all plans</a>
          </Fine>
        </div>
      </Section>

      <Section id="faq" labelledBy="pmfaq-title">
        <div className="wrap-content">
          <h2 id="pmfaq-title" className="text-display-md">
            Questions property managers ask
          </h2>
          <FAQList className="mt-10" items={pmFaqs} />
          <div className="mt-10 flex flex-wrap items-center gap-4 rounded-4xl bg-canvas-alt p-7">
            <CalendarCheck className="h-6 w-6 text-brand" aria-hidden />
            <p className="flex-1 text-ink-2">Want to see it with your own portfolio? The demo builds a private workspace shaped like your book in about a minute.</p>
            <a href={url('demo/')} className="btn-primary btn-sm">
              Build my demo
            </a>
          </div>
        </div>
      </Section>

      <CTABand
        title="Run your whole firm from one platform."
        lead="Create a free company account, import with AI, and upgrade to full management when you’re ready."
        secondary={{ label: 'Book a call', href: site.app.book }}
      />
    </>
  )
}
