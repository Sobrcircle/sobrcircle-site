import { ArrowRight, Calculator, FileText, LifeBuoy, PlayCircle, Scale, MessagesSquare } from 'lucide-react'
import { site, url } from '../site'
import { guideBySlug, guides } from '../content/guides'
import { CTABand, Fine, Section } from '../components/ui'
import { ChapterNav } from '../components/ChapterNav'
import { Breadcrumbs } from '../components/Chrome'
import { LmrForm, N4Form, RentForm } from '../components/ToolForms'

export function GuideArticle({ slug }: { slug: string }) {
  const g = guideBySlug(slug)
  const others = guides.filter((x) => x.slug !== slug)
  return (
    <>
      <ChapterNav chapters={g.sections.map((s) => ({ id: s.id, label: s.title }))} mode="label" cta={null} />
      <Breadcrumbs
        trail={[
          { name: 'Guides', path: 'guides/' },
          { name: g.h1, path: `guides/${g.slug}/` },
        ]}
      />
      <article className="bg-white pb-16 pt-8 sm:pt-12" aria-labelledby="guide-title">
        <header data-hero className="wrap-content">
          <p className="eyebrow">Ontario landlord guide</p>
          <h1 id="guide-title" className="mt-3 max-w-[22ch] text-display-lg">
            {g.h1}
          </h1>
          <p className="mt-5 max-w-[42rem] text-lead text-ink-3">{g.dek}</p>
          {/* Each "· item" stays together, so a line never ends on a dangling dot. */}
          <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.875rem] text-ink-3">
            <span className="whitespace-nowrap">
              Reviewed <time dateTime={site.lastReviewed}>{site.lastReviewedLabel}</time>
            </span>
            <span className="whitespace-nowrap">
              <span aria-hidden>· </span>
              {g.minutes} min read
            </span>
            <span className="whitespace-nowrap">
              <span aria-hidden>· </span>
              LandlordEzy team
            </span>
          </p>
          {g.answer && (
            <div className="mt-8 max-w-[42rem] rounded-3xl bg-brand-soft p-6 sm:p-7">
              <p className="text-[0.875rem] font-semibold text-brand-text">The short answer</p>
              <p className="mt-2 text-[1.0625rem] leading-relaxed text-ink">{g.answer}</p>
            </div>
          )}
        </header>

        <div className="wrap-content mt-6 grid gap-12 lg:mt-10 lg:grid-cols-[1fr_15rem]">
          <div className="min-w-0">
            {g.sections.map((s) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`}>
                <div className="prose-le max-w-[42rem]">
                  <h2 id={`${s.id}-h`}>{s.title}</h2>
                  {s.body}
                </div>
                {s.tool && (
                  <div className="mt-8 max-w-[42rem]">
                    {s.tool === 'n4' ? <N4Form stacked /> : s.tool === 'rent' ? <RentForm stacked /> : <LmrForm stacked />}
                  </div>
                )}
              </section>
            ))}

            <aside className="mt-14 max-w-[42rem] rounded-4xl bg-brand-ink p-8 text-white sm:p-9" aria-labelledby="next-h">
              <h2 id="next-h" className="text-title !text-white">
                Let LandlordEzy handle the paperwork
              </h2>
              <p className="mt-3 text-white/70">
                N4s and N1s filled from your rent ledger, on the current forms, with the dates calculated for how you serve. Free to
                start.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a href={site.app.signup} className="btn-light" data-track="start-free:guide">
                  Start free
                </a>
                <a href={url('notices/')} className="link-more-dark">
                  See how notices work
                </a>
              </div>
            </aside>

            <div className="mt-12 max-w-[42rem]">
              <h2 className="text-title">Sources</h2>
              <ul className="mt-4 space-y-2 text-[0.9375rem]">
                {g.sources.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} rel="noopener">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
              <Fine className="mt-5">
                General information for Ontario landlords, checked against the sources above on {site.lastReviewedLabel}. It isn’t
                legal advice. Rules change, so confirm the current forms and requirements with Tribunals Ontario or a licensed
                paralegal before you act.
              </Fine>
            </div>
          </div>

          <nav aria-label="Guide contents" className="hidden lg:block">
            <div className="sticky top-[calc(var(--nav-h)+4.5rem)]">
              <p className="text-[0.8125rem] font-semibold text-ink-3">In this guide</p>
              <ol className="mt-3 space-y-2.5 border-l border-line pl-4 text-[0.875rem]">
                {g.sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="toc-link" data-toc-link={s.id}>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>
        </div>
      </article>

      <Section tone="alt" tight labelledBy="more-guides">
        <div className="wrap-content">
          <h2 id="more-guides" className="text-headline">
            More Ontario guides
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {others.map((o) => (
              <a key={o.slug} href={url(`guides/${o.slug}/`)} className="group flex flex-col rounded-3xl bg-white p-6 text-ink shadow-card hover:no-underline">
                <span className="font-display text-[1.1875rem] font-semibold leading-snug tracking-[-0.01em]">{o.h1}</span>
                <span className="mt-2 text-[0.9375rem] text-ink-3">{o.card}</span>
                <span className="mt-auto inline-flex items-center gap-1 pt-5 text-[0.9375rem] text-brand-text">
                  Read <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </a>
            ))}
          </div>
        </div>
      </Section>
      <CTABand />
    </>
  )
}

export function GuidesHub() {
  const resources = [
    { href: site.app.lawLibrary, icon: Scale, t: 'Ontario law library', d: 'The Residential Tenancies Act and regulations, searchable, in plain English.' },
    { href: site.app.forms, icon: FileText, t: 'Ontario forms library', d: 'Every LTB form and the Ontario Standard Lease, with LandlordEzy templates.' },
    { href: site.app.videos, icon: PlayCircle, t: 'Video guides', d: 'Walkthroughs on N4s, Bill 60, screening and rent reporting.' },
    { href: site.app.help, icon: LifeBuoy, t: 'Help Centre', d: 'Step-by-step help for every LandlordEzy feature.' },
    { href: site.app.forum, icon: MessagesSquare, t: 'LandlordTalk forum', d: 'Ask other Ontario landlords, with verified paralegal answers.' },
    { href: url('tools/'), icon: Calculator, t: 'Free calculators', d: 'N4 dates, rent increases and deposit interest.' },
  ]
  return (
    <>
      <section data-hero className="bg-white pb-6 pt-10 sm:pt-14">
        <div className="wrap-content">
          <p className="eyebrow">Ontario landlord guides</p>
          <h1 className="mt-3 max-w-[18ch] text-display-lg">
            Know the rules. <span className="inline-block">Keep your rentals moving.</span>
          </h1>
          <p className="mt-5 max-w-[40rem] text-lead text-ink-3">
            Plain-English guides to Ontario’s rental rules, checked against official sources and updated for Bill 60.
          </p>
        </div>
      </section>
      <Section tight labelledBy="all-guides">
        <div className="wrap-content">
          <h2 id="all-guides" className="sr-only">
            All guides
          </h2>
          <div className="grid gap-5 md:grid-cols-2">
            {guides.map((g, i) => (
              <a
                key={g.slug}
                href={url(`guides/${g.slug}/`)}
                className={`group flex flex-col rounded-4xl p-8 text-ink hover:no-underline sm:p-9 ${i === 0 ? 'bg-brand-ink text-white md:col-span-2' : 'bg-canvas-alt'}`}
                data-reveal
              >
                <span className={`text-[0.8125rem] font-semibold ${i === 0 ? 'text-brand-glow' : 'text-brand-text'}`}>
                  {i === 0 ? 'New · In force since September 21, 2026' : `${g.minutes} min read`}
                </span>
                <h3 className={`mt-3 text-balance font-display text-[1.75rem] font-semibold leading-tight tracking-[-0.02em] ${i === 0 ? '!text-white sm:text-[2.25rem]' : ''}`}>
                  {g.h1}
                </h3>
                <span className={`mt-3 max-w-[40rem] ${i === 0 ? 'text-white/70' : 'text-ink-3'}`}>{g.dek}</span>
                <span className={`mt-auto inline-flex items-center gap-1 pt-6 ${i === 0 ? 'text-brand-glow' : 'text-brand-text'}`}>
                  Read the guide <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </a>
            ))}
            {/* Fills the grid's last slot, and puts the calculators one tap from the guides. */}
            <a href={url('tools/')} className="group flex flex-col rounded-4xl bg-brand-soft p-8 text-ink hover:no-underline sm:p-9" data-reveal>
              <span className="text-[0.8125rem] font-semibold text-brand-text">Free calculators</span>
              <h3 className="mt-3 text-balance font-display text-[1.75rem] font-semibold leading-tight tracking-[-0.02em]">
                Get the dates right before you serve.
              </h3>
              <span className="mt-3 max-w-[40rem] text-ink-3">N4 termination dates, rent increases and deposit interest, on the current rules.</span>
              <span className="mt-auto inline-flex items-center gap-1 pt-6 text-brand-text">
                Open the calculators <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </span>
            </a>
          </div>
        </div>
      </Section>
      <Section tone="alt" tight labelledBy="resources-title">
        <div className="wrap-content">
          <h2 id="resources-title" className="text-headline">
            More ways to learn
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((r) => (
              <a key={r.t} href={r.href} rel="noopener" className="flex gap-4 rounded-3xl bg-white p-6 text-ink shadow-card hover:no-underline">
                <r.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand" strokeWidth={1.8} aria-hidden />
                <span>
                  <span className="block font-semibold">{r.t}</span>
                  <span className="mt-1 block text-[0.9375rem] text-ink-3">{r.d}</span>
                </span>
              </a>
            ))}
          </div>
        </div>
      </Section>
      <CTABand />
    </>
  )
}
