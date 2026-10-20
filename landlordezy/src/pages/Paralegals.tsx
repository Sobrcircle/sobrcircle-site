import { BookMarked, FileStack, FolderKanban, ListOrdered, Search, Sparkles } from 'lucide-react'
import { site, url } from '../site'
import { Actions, CheckList, CTABand, FeatureTile, Fine, Heading, Section, Steps } from '../components/ui'
import { CaseBuilderScreen } from '../components/mocks/screens'
import { paralegalPlans } from '../content/pricing'

export function Paralegals() {
  return (
    <>
      <section data-hero className="overflow-hidden bg-white pb-16 pt-14 sm:pt-20">
        <div className="wrap grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <p className="eyebrow">CaseBuilder for paralegals</p>
            <h1 className="mt-3 text-display-xl">The LTB research team you never had.</h1>
            <p className="mt-6 max-w-[34rem] text-lead text-ink-3">
              Describe the file in plain language, or upload the notice, and CaseBuilder ranks comparable Ontario Landlord and Tenant
              Board decisions, wins and losses, with the deciding factors. Then it builds the hearing pack.
            </p>
            <div className="mt-9">
              <Actions
                align="left"
                primary={{ label: 'Try CaseBuilder free', href: site.app.caseBuilder }}
                secondary={{ label: 'Hearing prep & disclosure', href: site.app.hearingPrep }}
                note="Free to start · Research tool, not legal advice"
              />
            </div>
          </div>
          <CaseBuilderScreen className="hero-rise mx-auto w-full max-w-[34rem]" />
        </div>
      </section>

      <Section tone="alt" labelledBy="how-title">
        <div className="wrap">
          <Heading id="how-title" eyebrow="How it works" title="From the client’s facts to a hearing pack." size="md" />
          <div className="mt-12">
            <Steps
              steps={[
                { title: 'Describe it or upload it.', body: 'Paste what happened, or drop in the notice or application, such as an N5 or L2, as a PDF or photo.' },
                { title: 'See how the Board decided.', body: 'Comparable decisions are ranked by similarity, with outcomes and the reasons that decided them.' },
                { title: 'Walk in prepared.', body: 'Generate a page-numbered hearing pack and a one-click disclosure bundle with tabbed exhibits.' },
              ]}
            />
          </div>
        </div>
      </Section>

      <Section labelledBy="tools-title">
        <div className="wrap">
          <Heading id="tools-title" title="Everything for an LTB practice." size="md" />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <FeatureTile icon={Search} title="Plain-language search" body="Search the Board’s published decisions by issue, notice type, RTA section and outcome." />
            <FeatureTile icon={ListOrdered} title="Ranked comparables" body="The closest decisions first, wins and losses, so you see what beats a case like yours." />
            <FeatureTile icon={Sparkles} title="AI comparative analysis" body="Deciding factors, the evidence to bring, and questions for examination and cross-examination." />
            <FeatureTile icon={FileStack} title="Disclosure bundle" body="A numbered exhibit list with every exhibit behind its own tab page, ready to serve." />
            <FeatureTile icon={FolderKanban} title="Matters" body="Organize research, analyses and documents by client matter." />
            <FeatureTile icon={BookMarked} title="Law library" body="The RTA, regulations, SPPA and Human Rights Code, cross-linked to forms." />
          </div>
          <div className="mx-auto mt-10 max-w-[46rem] rounded-3xl bg-brand-soft p-6 text-[0.9375rem] text-ink-2">
            CaseBuilder researches by situation, never by person. Orders removed at a party’s request stay excluded, and every result
            links back to the Board’s published decision.
          </div>
        </div>
      </Section>

      <Section tone="alt" id="plans" labelledBy="plans-title">
        <div className="wrap">
          <Heading id="plans-title" eyebrow="Memberships" title="Start free. Upgrade when you’re building real cases." size="md" />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {paralegalPlans.map((p) => (
              <div key={p.name} className={`flex flex-col rounded-4xl bg-white p-7 ${p.popular ? 'shadow-float ring-2 ring-brand' : 'shadow-card'}`} data-reveal>
                {/* The tag sits on its own row, so every card's name and price line up. */}
                <div className="h-7">{p.popular && <span className="chip-brand">Most popular</span>}</div>
                <h3 className="mt-2 text-title">{p.name}</h3>
                <p className="mt-4 font-display text-[2.5rem] font-bold leading-none tracking-[-0.03em]">
                  {p.price}
                  <span className="text-[0.9375rem] font-medium tracking-normal text-ink-3"> {p.unit}</span>
                </p>
                <CheckList className="mt-6 text-[0.9375rem]" items={p.features} />
                <div className="mt-auto pt-8">
                  <a href={site.app.caseBuilder} className={`${p.popular ? 'btn-primary' : 'btn-secondary'} w-full`}>
                    {p.price === '$0' ? 'Start free' : 'Choose plan'}
                  </a>
                </div>
              </div>
            ))}
          </div>
          <Fine className="mt-8 text-center">
            Annual billing shown, which saves up to two months against monthly. Research tool, not legal advice: always read the full
            decisions, and rely on a licensed paralegal or lawyer for representation.
          </Fine>
        </div>
      </Section>

      <Section labelledBy="clients-title">
        <div className="wrap-content grid gap-10 md:grid-cols-2 md:items-center">
          <div data-reveal>
            <h2 id="clients-title" className="text-display-md">
              Built for solo practitioners and firms.
            </h2>
            <p className="mt-5 text-lead text-ink-3">
              Made by the team behind LandlordEzy and its licensed Ontario paralegal firm. Questions about a firm account?{' '}
              <a href={url('contact/')}>Talk to us</a>.
            </p>
          </div>
          <CheckList
            items={[
              'Research and preparation in one workflow',
              'Consistent, defensible prep across every adjudicator',
              'Priced for solo practitioners and firms',
            ]}
          />
        </div>
      </Section>

      <CTABand
        title="Your next hearing starts here."
        lead="Paste the situation or upload the notice, and see the decisions that matter to your file."
        primary={{ label: 'Try CaseBuilder free', href: site.app.caseBuilder }}
        secondary={{ label: 'See memberships', href: '#plans' }}
        fine="Free to start · Annual memberships from $49 · Research tool, not legal advice"
      />
    </>
  )
}
