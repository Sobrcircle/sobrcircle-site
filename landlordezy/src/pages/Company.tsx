import {
  ArrowRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  FileLock2,
  Fingerprint,
  Handshake,
  HeartHandshake,
  LifeBuoy,
  Lock,
  MessagesSquare,
  PenLine,
  Phone,
  Scale,
  Search,
  ShieldCheck,
  Sparkles,
  Trash2,
  Users,
  Leaf,
} from 'lucide-react'
import { site, url } from '../site'
import { JobChips } from '../components/JobChips'
import { CheckList, CTABand, FAQList, FeatureTile, Fine, Heading, Section, Steps } from '../components/ui'
import { demoFaqs, faqGroups, pmFaqs } from '../content/faqs'
import { DashboardScreen } from '../components/mocks/screens'

/* ---------------------------------------------------------------------------- */
/* About                                                                        */
/* ---------------------------------------------------------------------------- */

export function About() {
  return (
    <>
      <section data-hero className="bg-white pb-16 pt-14 sm:pt-20">
        <div className="wrap text-center">
          <p className="eyebrow">About LandlordEzy</p>
          {/* Phrases hold together, so lines break between them. */}
          <h1 className="mx-auto mt-3 max-w-[18ch] text-display-xl">
            Built in Ontario, <span className="inline-block">by a landlord,</span> <span className="inline-block">for landlords.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-[40rem] text-lead text-ink-3">
            LandlordEzy brings everything an Ontario landlord juggles into one login: rent, screening, leases, Equifax reporting and
            LTB notices, with licensed people behind the software.
          </p>
        </div>
      </section>

      <Section tone="alt" labelledBy="story-title">
        <div className="wrap grid gap-14 lg:grid-cols-[1fr_1.15fr] lg:items-center">
          <div className="relative mx-auto w-full max-w-[24rem] overflow-hidden rounded-5xl bg-[linear-gradient(160deg,#0b1a5c_0%,#050c3b_60%,#02061f_100%)] text-white shadow-float sm:aspect-[4/5]">
            <div className="glow-blue absolute inset-x-0 top-0 h-2/3 opacity-70" aria-hidden />
            <div className="relative flex h-full flex-col justify-between gap-10 p-7 sm:p-9">
              <p className="font-display text-[1.5rem] font-semibold leading-snug tracking-[-0.02em] sm:text-[1.75rem]">
                Landlords need good tenants. Tenants need good landlords.
              </p>
              <div>
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-white/10 font-display text-[1.375rem] font-bold">
                  PR
                </span>
                <p className="mt-4 font-semibold">{site.founder}</p>
                <p className="text-[0.9375rem] text-white/60">Founder, LandlordEzy · Broker of Record, List It Realty</p>
              </div>
            </div>
          </div>
          <div>
            <p className="eyebrow">Our story</p>
            <h2 id="story-title" className="mt-3 text-display-md">
              Twenty-three years in the business. Fifteen years building the fix.
            </h2>
            <div className="mt-6 space-y-4 text-ink-2">
              <p>
                Paul J. Rouillard collected his first rent at 14, helping his parents run their properties. At 22 he started his own
                property management company, and he has spent the years since in Ontario rentals: leasing, collections, arrears,
                inspections, maintenance and hearings at the Landlord and Tenant Board.
              </p>
              <p>
                He watched the system get harder for everyone. Good landlords were paying for tools that each did one thing, and for
                paperwork mistakes that cost them months. So he started building the platform he wished he’d had, and kept building
                it for fifteen years.
              </p>
              <p>
                The idea behind it is simple: landlords need good tenants and tenants need good landlords. LandlordEzy gives both
                sides the tools, the records and the protection to do this the right way.
              </p>
            </div>
            <a href={site.social.youtube} className="link-more mt-6" rel="noopener">
              Watch Paul on YouTube
            </a>
          </div>
        </div>
      </Section>

      <Section labelledBy="family-title">
        <div className="wrap">
          <Heading
            id="family-title"
            eyebrow="More than software"
            title="Real credentials behind every feature."
            lead="LandlordEzy is part of a small group of Ontario businesses run by the same team, so the people who build the software also do the work."
            size="md"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            <FeatureTile icon={Building2} title="List It Realty Brokerage Inc." body="A licensed, flat-fee Ontario MLS® brokerage. Paul J. Rouillard is Broker of Record." />
            <FeatureTile icon={Handshake} title="OLH Property Management" body="Ontario property management backed by licensed paralegal services." />
            <FeatureTile icon={Scale} title="Licensed paralegal team" body="Legal services are provided by Landlord Pro Legal SPC, a licensed Ontario paralegal firm." />
            <FeatureTile icon={Users} title="Ontario Landlord Help" body="A free community of 31,700+ Ontario landlords, moderated by Paul." />
          </div>
          <p className="mt-8 text-center">
            <a href={site.social.facebookGroup} className="link-more" rel="noopener">
              Join the free Ontario Landlord Help community
            </a>
          </p>
        </div>
      </Section>

      <Section tone="alt" labelledBy="team-title">
        <div className="wrap grid items-center gap-14 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="eyebrow">Who builds it</p>
            <h2 id="team-title" className="mt-3 text-display-md">
              REALTORS®, paralegals and engineers, under one roof.
            </h2>
            <p className="mt-5 text-lead text-ink-3">
              Licensed REALTORS®, paralegals, property managers and accountants work side by side with web developers and AI
              engineers. That’s why the platform improves almost every week, usually from something a landlord asked for.
            </p>
            <CheckList
              className="mt-8"
              items={['Save time: tasks that took days now take minutes', 'Reduce risk: correct forms and LTB-ready records', 'Keep more: no per-payment or per-signature fees']}
            />
          </div>
          <DashboardScreen />
        </div>
      </Section>

      <CTABand
        title="Talk to Paul’s team, or start free."
        lead="Book a free 15-minute call about your tenant, your notice or your portfolio, or open a free account and look around."
        secondary={{ label: 'Book a free 15-minute call', href: site.app.book }}
      />
    </>
  )
}

/* ---------------------------------------------------------------------------- */
/* Contact                                                                      */
/* ---------------------------------------------------------------------------- */

export function Contact() {
  return (
    <>
      <section data-hero className="bg-white pb-12 pt-14 sm:pt-20">
        <div className="wrap-content text-center">
          <p className="eyebrow">Contact</p>
          <h1 className="mx-auto mt-3 max-w-[16ch] text-display-xl">Talk to a real person.</h1>
          <p className="mx-auto mt-6 max-w-[36rem] text-lead text-ink-3">
            The fastest way to reach the team is to book a time. You’ll have a real conversation instead of waiting on a reply.
          </p>
        </div>
      </section>
      <section className="bg-white pb-20">
        <div className="wrap-content grid gap-5 md:grid-cols-2">
          <a href={site.app.book} className="group flex flex-col rounded-4xl bg-brand-hover p-8 text-white shadow-glow hover:no-underline" data-track="book-call:contact">
            <CalendarDays className="h-7 w-7" aria-hidden />
            <span className="mt-6 font-display text-[1.375rem] font-semibold">Book a free 15-minute call</span>
            <span className="mt-2 text-pretty text-white">Pick a time that suits you, with the licensed paralegal team.</span>
            <span className="mt-6 inline-flex items-center gap-1 font-semibold">
              Pick a time <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </span>
          </a>
          <a href={`tel:${site.phone.tel}`} className="group flex flex-col rounded-4xl bg-canvas-alt p-8 text-ink hover:no-underline" data-track="call:contact">
            <Phone className="h-7 w-7 text-brand" aria-hidden />
            <span className="mt-6 font-display text-[1.375rem] font-semibold">{site.phone.display}</span>
            <span className="mt-2 text-pretty text-ink-3">{site.hours}</span>
            <span className="mt-6 inline-flex items-center gap-1 font-semibold text-brand-text">
              Call now <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
            </span>
          </a>
        </div>
        <p className="wrap-content mt-6 text-center text-ink-3">
          <Sparkles className="mr-1.5 inline h-4 w-4 align-[-2px] text-brand" aria-hidden />
          Want an instant answer instead? <a href={site.app.askEzy}>Ask Ezy, our AI assistant, about Ontario landlord rules</a>.
        </p>
      </section>

      <Section tone="alt" labelledBy="msg-title">
        <div className="wrap-content grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-y-8">
          <div>
            <h2 id="msg-title" className="text-display-md">
              Or send a message.
            </h2>
            <p className="mt-4 text-lead text-ink-3">No account needed. The team will get back to you within one business day.</p>
            <ul className="mt-8 space-y-4 text-ink-2">
              <li className="flex gap-3">
                <Building2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden />
                Serving landlords and tenants across Ontario. We work virtually, with no walk-in office.
              </li>
              <li className="flex gap-3">
                <LifeBuoy className="mt-0.5 h-5 w-5 shrink-0 text-brand" aria-hidden />
                <span>
                  Using LandlordEzy already? The <a href={site.app.help}>Help Centre</a> has a guide for every feature.
                </span>
              </li>
            </ul>
          </div>
          <form data-preview-form className="rounded-4xl bg-white p-7 shadow-card sm:p-9 lg:row-span-2" aria-labelledby="msg-title">
            <div data-form-fields className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="c-name" className="label">
                    Name
                  </label>
                  <input id="c-name" name="name" className="field" autoComplete="name" required />
                </div>
                <div>
                  <label htmlFor="c-email" className="label">
                    Email
                  </label>
                  <input id="c-email" name="email" type="email" className="field" autoComplete="email" required />
                </div>
              </div>
              <div>
                <label htmlFor="c-role" className="label">
                  I’m a…
                </label>
                <select id="c-role" name="role" className="field" defaultValue="" required>
                  <option value="" disabled>
                    Choose one
                  </option>
                  <option>Landlord</option>
                  <option>Property management company</option>
                  <option>Paralegal</option>
                  <option>Tenant</option>
                  <option>Something else</option>
                </select>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="c-phone" className="label">
                    Phone <span className="font-normal text-ink-4">(optional)</span>
                  </label>
                  <input id="c-phone" name="phone" type="tel" className="field" autoComplete="tel" />
                </div>
                <div>
                  <label htmlFor="c-doors" className="label">
                    Doors you manage <span className="font-normal text-ink-4">(optional)</span>
                  </label>
                  <input id="c-doors" name="doors" type="number" min="0" inputMode="numeric" className="field" />
                </div>
              </div>
              <div>
                <label htmlFor="c-msg" className="label">
                  How can we help?
                </label>
                <textarea id="c-msg" name="message" rows={5} className="field" required />
              </div>
              <button type="submit" className="btn-primary w-full sm:w-auto">
                Send message
              </button>
              {site.preview && <Fine>Concept preview: this form doesn’t send anything. Use the call or phone options above.</Fine>}
            </div>
            <div data-form-done hidden tabIndex={-1} className="py-10 text-center outline-none">
              <CheckCircle2 className="mx-auto h-12 w-12 text-go-ink" aria-hidden />
              <p className="mt-4 font-display text-[1.5rem] font-semibold">Thanks, that looks good.</p>
              <p className="mx-auto mt-2 max-w-[24rem] text-ink-3">
                {site.preview
                  ? 'This is a concept preview, so nothing was sent. To reach the team now, book a call or phone us.'
                  : 'The team will reply within one business day.'}
              </p>
              <a href={site.app.book} className="btn-primary mt-6">
                Book a call
              </a>
            </div>
          </form>
          {/* After the form on phones; under the contact details on laptops. */}
          <div className="rounded-3xl bg-white p-6 shadow-card lg:col-start-1">
            <p className="flex items-center gap-2 font-semibold">
              <FileLock2 className="h-5 w-5 text-brand" aria-hidden /> Named on an LTB order?
            </p>
            <p className="mt-2 text-[0.9375rem] text-ink-3">
              LandlordEzy no longer publishes Landlord and Tenant Board orders. If you believe information about you is still visible
              anywhere on LandlordEzy, tell us and we’ll deal with it.
            </p>
          </div>
        </div>
      </Section>
    </>
  )
}

/* ---------------------------------------------------------------------------- */
/* Demo                                                                         */
/* ---------------------------------------------------------------------------- */


export function Demo() {
  return (
    <>
      <section data-hero className="overflow-hidden bg-white pb-16 pt-14 sm:pt-20">
        <div className="wrap text-center">
          <p className="eyebrow">Live demo · No sales call</p>
          <h1 className="mx-auto mt-3 max-w-[16ch] text-display-xl">See it with your own portfolio.</h1>
          <p className="mx-auto mt-6 max-w-[40rem] text-lead text-ink-3">
            Tell us how many units you manage and LandlordEzy builds a private, fully working demo shaped like your portfolio in
            about a minute: working ledgers, an N4 in progress, owner statements, listings, e-sign and Ezy AI.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-x-6 gap-y-3">
            <a href={site.app.demo} className="btn-primary btn-lg">
              Build my free demo
            </a>
            <a href={site.app.signup} className="link-more">
              Or start free
            </a>
          </div>
          <p className="mt-4 text-[0.8125rem] text-ink-4">Free · No card · Fictional tenants only · Open for 48 hours</p>
        </div>
        <div className="wrap mt-16">
          <div className="hero-rise mx-auto max-w-[64rem]">
            <DashboardScreen />
          </div>
        </div>
      </section>
      <Section tone="alt" labelledBy="walk-title">
        <div className="wrap">
          <Heading id="walk-title" eyebrow="A guided path" title="From empty unit to signed tenant." size="md" />
          <h3 className="mt-12 text-[0.9375rem] font-semibold text-ink-3">For landlords</h3>
          <div className="mt-4">
            <Steps
              steps={[
                { title: 'Publish a listing.', body: 'Turn a vacant unit into a live EzyRent listing and see what renters see.' },
                { title: 'Screen an applicant.', body: 'Open a full screening report, with no credit-check fees in the demo.' },
                { title: 'E-sign both sides.', body: 'Sign a lease as the landlord, then as the tenant on your own phone.' },
              ]}
            />
          </div>
          <h3 className="mt-10 text-[0.9375rem] font-semibold text-ink-3">For property managers</h3>
          <div className="mt-4">
            <Steps
              steps={[
                { title: 'Close the month.', body: 'See every owner on one page: who paid, fees, bills and the net draw.' },
                { title: 'Approve a payment.', body: 'Approve an owner’s fee payment and watch it flip to paid, proof attached.' },
                { title: 'Tag your team.', body: 'Post on an owner thread with an @mention, threaded replies and read receipts.' },
              ]}
            />
          </div>
        </div>
      </Section>
      <Section labelledBy="dfaq-title">
        <div className="wrap-content">
          <h2 id="dfaq-title" className="text-display-md">
            Demo questions
          </h2>
          <FAQList className="mt-10" items={demoFaqs} />
        </div>
      </Section>
      <CTABand
        title="Your demo is about a minute away."
        lead="A private workspace shaped like your portfolio, with fictional tenants. No sales call, no card."
        primary={{ label: 'Build my free demo', href: site.app.demo }}
        secondary={{ label: 'Or start free', href: site.app.signup }}
        fine="Free · No card · Open for 48 hours"
      />
    </>
  )
}

/* ---------------------------------------------------------------------------- */
/* FAQ                                                                          */
/* ---------------------------------------------------------------------------- */


export function FAQ() {
  const groups = [...faqGroups.slice(0, 2), { title: 'Property managers', items: pmFaqs }, ...faqGroups.slice(2)]
  return (
    <>
      <section data-hero className="bg-white pb-6 pt-14 sm:pt-20">
        <div className="wrap-content">
          <p className="eyebrow">FAQ</p>
          <h1 className="mt-3 max-w-[16ch] text-display-xl">Questions, answered.</h1>
          <p className="mt-5 max-w-[38rem] text-lead text-ink-3">
            Can’t find what you need? <a href={url('contact/')}>Contact the team</a> or{' '}
            <a href={site.app.askEzy} rel="noopener">
              ask Ezy
            </a>
            .
          </p>
          <nav aria-label="FAQ topics" className="mt-8 flex flex-wrap gap-2">
            {groups.map((g) => (
              <a key={g.title} href={`#${g.title.toLowerCase().replace(/[^a-z]+/g, '-')}`} className="rounded-full bg-canvas-alt px-4 py-2 text-[0.875rem] text-ink-2 hover:no-underline">
                {g.title}
              </a>
            ))}
          </nav>
        </div>
      </section>
      <section className="bg-white pb-24">
        <div className="wrap-content space-y-16 pt-6">
          {groups.map((g) => (
            <div key={g.title} id={g.title.toLowerCase().replace(/[^a-z]+/g, '-')}>
              <h2 className="text-headline">{g.title}</h2>
              <FAQList className="mt-6" items={g.items} />
            </div>
          ))}
        </div>
      </section>
      <CTABand />
    </>
  )
}

/* ---------------------------------------------------------------------------- */
/* Trust & privacy                                                              */
/* ---------------------------------------------------------------------------- */

export function Trust() {
  return (
    <>
      <section data-hero className="bg-brand-ink pb-20 pt-16 text-white sm:pt-24">
        <div className="wrap-content text-center">
          <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-white/10">
            <ShieldCheck className="h-8 w-8 text-brand-glow" aria-hidden />
          </span>
          <h1 className="mx-auto mt-8 max-w-[18ch] text-display-xl !text-white">Trust is the whole job.</h1>
          <p className="mx-auto mt-6 max-w-[40rem] text-lead text-white/70">
            Landlords trust us with their tenants’ information, and tenants trust their landlords. Here’s how LandlordEzy handles
            that responsibility.
          </p>
        </div>
      </section>
      <Section labelledBy="principles-title">
        <div className="wrap">
          <Heading id="principles-title" title="Our principles" size="md" />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <FeatureTile icon={HeartHandshake} title="Consent first" body="Applicants authorize every credit check and choose what to share. On-time rent reporting needs the tenant’s consent, recorded and kept up to date." />
            <FeatureTile icon={Search} title="Soft inquiries only" body="Credit checks through LandlordEzy never lower an applicant’s credit score." />
            <FeatureTile icon={Lock} title="Never sold" body="LandlordEzy doesn’t sell personal information, to anyone, for any purpose." />
            <FeatureTile icon={Trash2} title="Delete what we don’t need" body="ID images used to verify Reference Network members are deleted as soon as verification is done." />
            <FeatureTile icon={Fingerprint} title="Reports you can verify" body="Every screening report has a unique ID that can be checked on the platform." />
            <FeatureTile icon={Leaf} title="Canadian-owned" body="LandlordEzy is owned and operated in Ontario, under Canadian privacy law (PIPEDA)." />
          </div>
        </div>
      </Section>
      <Section tone="alt" labelledBy="ltb-title">
        <div className="wrap-content grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="eyebrow">LTB orders</p>
            <h2 id="ltb-title" className="mt-3 text-display-md">
              Research by situation, never by person.
            </h2>
          </div>
          <div className="space-y-4 text-ink-2">
            <p>
              LandlordEzy used to host a searchable collection of Landlord and Tenant Board orders. We took it down: orders were being
              reposted out of context in ways that followed people well beyond the matter they were about.
            </p>
            <p>
              The Board now publishes its own order catalogue on{' '}
              <a href={site.official.orderCatalogue} rel="noopener">
                Ontario’s open data portal
              </a>
              . CaseBuilder helps paralegals and landlords research how the Board decides cases by issue and outcome, not by who was
              involved, and orders removed at a party’s request stay excluded.
            </p>
          </div>
        </div>
      </Section>
      <Section labelledBy="rights-title">
        <div className="wrap-content">
          <Heading id="rights-title" title="Your choices" size="md" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <FeatureTile icon={PenLine} title="Access and correct" body="You can access and update your information at any time from your account." />
            <FeatureTile icon={Trash2} title="Delete your data" body="Request deletion of your account and personal information, subject to legal retention requirements." />
            <FeatureTile icon={MessagesSquare} title="Stop texts" body="Reply STOP to any LandlordEzy text message to opt out." />
          </div>
          <p className="mt-10 text-center text-ink-3">
            Read the full <a href={site.app.privacy}>Privacy Policy</a> and <a href={site.app.terms}>Terms and Conditions</a>, or{' '}
            <a href={url('contact/')}>contact us</a> with a privacy question.
          </p>
        </div>
      </Section>
      <CTABand />
    </>
  )
}

/* ---------------------------------------------------------------------------- */
/* 404                                                                          */
/* ---------------------------------------------------------------------------- */

export function NotFound() {
  return (
    <section data-hero className="bg-white py-28 sm:py-36">
      <div className="wrap-content text-center">
        <p className="eyebrow">404</p>
        <h1 className="mx-auto mt-3 max-w-[16ch] text-display-lg">This page moved out.</h1>
        <p className="mx-auto mt-5 max-w-[32rem] text-lead text-ink-3">It may have a new address. These are good places to start.</p>
        <div className="mx-auto mt-10 grid max-w-[60rem] gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { t: 'Home', h: url() },
            { t: 'Pricing', h: url('pricing/') },
            { t: 'Ontario guides', h: url('guides/') },
            { t: 'Free calculators', h: url('tools/') },
          ].map((l) => (
            <a key={l.t} href={l.h} className="rounded-3xl bg-canvas-alt px-6 py-5 text-left font-semibold text-ink hover:no-underline">
              {l.t} <span className="text-brand">›</span>
            </a>
          ))}
        </div>
        <JobChips className="mx-auto mt-12 max-w-[60rem]" heading="Or start with what you came to do" />
      </div>
    </section>
  )
}
