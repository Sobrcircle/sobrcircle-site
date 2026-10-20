import type { ComponentType, ReactNode, SVGProps } from 'react'
import { Check, Plus } from 'lucide-react'
import { site, url } from '../site'
import type { Voice } from '../content/voices'

export type IconType = ComponentType<SVGProps<SVGSVGElement> & { strokeWidth?: number }>

type Tone = 'white' | 'alt' | 'dark' | 'night'

const toneClass: Record<Tone, string> = {
  white: 'bg-white',
  alt: 'bg-canvas-alt',
  dark: 'bg-brand-ink text-white',
  night: 'bg-black text-white',
}

export function Section({
  id,
  tone = 'white',
  tight = false,
  className = '',
  children,
  labelledBy,
}: {
  id?: string
  tone?: Tone
  tight?: boolean
  className?: string
  children: ReactNode
  labelledBy?: string
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`${tight ? 'section-tight' : 'section'} ${toneClass[tone]} ${className}`}
    >
      {children}
    </section>
  )
}

export function Heading({
  id,
  eyebrow,
  title,
  lead,
  align = 'center',
  dark = false,
  size = 'lg',
  as: As = 'h2',
  className = '',
}: {
  id?: string
  eyebrow?: ReactNode
  title: ReactNode
  lead?: ReactNode
  align?: 'center' | 'left'
  dark?: boolean
  size?: 'xl' | 'lg' | 'md'
  as?: 'h1' | 'h2' | 'h3'
  className?: string
}) {
  const sizeClass = size === 'xl' ? 'text-display-xl' : size === 'lg' ? 'text-display-lg' : 'text-display-md'
  return (
    <div className={`${align === 'center' ? 'mx-auto text-center' : ''} max-w-[46rem] ${className}`}>
      {eyebrow && <p className={dark ? 'eyebrow-dark' : 'eyebrow'}>{eyebrow}</p>}
      <As id={id} className={`${sizeClass} ${eyebrow ? 'mt-3' : ''} ${dark ? '!text-white' : ''}`}>
        {title}
      </As>
      {lead && (
        <p className={`mt-5 text-lead ${dark ? 'text-white/70' : 'text-ink-3'} ${align === 'center' ? 'mx-auto' : ''} max-w-[40rem]`}>
          {lead}
        </p>
      )}
    </div>
  )
}

export function Actions({
  primary = { label: 'Start free', href: site.app.signup },
  secondary,
  align = 'center',
  dark = false,
  note,
}: {
  primary?: { label: string; href: string } | null
  secondary?: { label: string; href: string }
  /** 'split' centres on phones and aligns left on laptops, for two-column heroes. */
  align?: 'center' | 'left' | 'split'
  dark?: boolean
  note?: ReactNode
}) {
  const [text, row] = { center: ['text-center', 'justify-center'], left: ['', ''], split: ['text-center lg:text-left', 'justify-center lg:justify-start'] }[align]
  return (
    <div className={text}>
      <div className={`flex flex-wrap items-center gap-x-6 gap-y-3 ${row}`}>
        {primary && (
          <a href={primary.href} className="btn-primary" data-track={primary.href === site.app.signup ? 'start-free:hero' : 'primary:hero'}>
            {primary.label}
          </a>
        )}
        {secondary && (
          <a href={secondary.href} className={dark ? 'link-more-dark' : 'link-more'} data-track="secondary:hero">
            {secondary.label}
          </a>
        )}
      </div>
      {note && <p className={`mt-4 text-[0.8125rem] ${dark ? 'text-white/60' : 'text-ink-4'}`}>{note}</p>}
    </div>
  )
}

export function CheckList({ items, dark = false, className = '' }: { items: ReactNode[]; dark?: boolean; className?: string }) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span
            className={`mt-[3px] inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${dark ? 'bg-white/15 text-white' : 'bg-brand-soft text-brand'}`}
          >
            <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
          </span>
          <span className={dark ? 'text-white/85' : 'text-ink-2'}>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function FeatureTile({
  icon: Icon,
  title,
  body,
  href,
  linkLabel = 'Learn more',
  dark = false,
  surface = 'gray',
}: {
  icon?: IconType
  title: ReactNode
  body: ReactNode
  href?: string
  linkLabel?: string
  dark?: boolean
  /** 'white' for tiles placed on a gray section, so they still read as cards. */
  surface?: 'gray' | 'white'
}) {
  const base = dark ? 'tile-dark bg-white/[0.06] ring-1 ring-white/10' : surface === 'white' ? 'tile-white' : 'tile'
  return (
    <div className={`${base} flex flex-col p-7 sm:p-8`} data-reveal>
      {Icon && (
        <span className={dark ? 'inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-brand-glow' : 'icon-badge'}>
          <Icon className="h-[22px] w-[22px]" strokeWidth={1.7} aria-hidden />
        </span>
      )}
      <h3 className={`mt-5 text-title ${dark ? '!text-white' : ''}`}>{title}</h3>
      <p className={`mt-2 ${dark ? 'text-white/70' : 'text-ink-3'}`}>{body}</p>
      {href && (
        <a href={href} className={`${dark ? 'link-more-dark' : 'link-more'} mt-auto pt-5`}>
          {linkLabel}
        </a>
      )}
    </div>
  )
}

export function Steps({ steps, dark = false }: { steps: { title: string; body: ReactNode }[]; dark?: boolean }) {
  return (
    <ol className="grid gap-5 md:grid-cols-3">
      {steps.map((s, i) => (
        <li
          key={s.title}
          className={`${dark ? 'rounded-4xl bg-white/[0.06] ring-1 ring-white/10' : 'tile-white'} p-7 sm:p-8`}
          data-reveal
          style={{ ['--reveal-delay' as string]: `${i * 0.08}s` }}
        >
          <span
            className={`inline-flex h-9 w-9 items-center justify-center rounded-full text-[0.9375rem] font-semibold ${dark ? 'bg-brand text-white' : 'bg-brand text-white'}`}
          >
            {i + 1}
          </span>
          <h3 className={`mt-5 text-title ${dark ? '!text-white' : ''}`}>{s.title}</h3>
          <p className={`mt-2 ${dark ? 'text-white/70' : 'text-ink-3'}`}>{s.body}</p>
        </li>
      ))}
    </ol>
  )
}

export type QA = { q: string; a: ReactNode; aText?: string }

export function FAQList({ items, className = '' }: { items: QA[]; className?: string }) {
  return (
    <div className={`divide-y divide-line border-y border-line ${className}`}>
      {items.map((item) => (
        <details key={item.q} className="faq group">
          <summary className="flex items-start justify-between gap-6 py-6 text-left">
            <h3 className="font-display text-[1.1875rem] font-semibold leading-snug tracking-[-0.01em] sm:text-[1.3125rem]">
              {item.q}
            </h3>
            <span className="faq-icon mt-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-canvas-alt text-ink-2">
              <Plus className="h-4 w-4" strokeWidth={2} aria-hidden />
            </span>
          </summary>
          <div className="-mt-1 max-w-[46rem] pb-7 pr-12 text-ink-2">{item.a}</div>
        </details>
      ))}
    </div>
  )
}


export function CTABand({
  title = 'Start free in about 30 seconds.',
  lead = 'Add your first property, invite a tenant, and let the software do the chasing.',
  primary = { label: 'Start free', href: site.app.signup },
  secondary = { label: 'Try the live demo', href: url('demo/') },
  fine = 'Free plan · No credit card · Cancel anytime · CAD pricing',
}: {
  title?: ReactNode
  lead?: ReactNode
  /** The page's own next step; Start free unless the page is about something else (a call, CaseBuilder, the demo). */
  primary?: { label: string; href: string }
  secondary?: { label: string; href: string } | null
  fine?: ReactNode | null
}) {
  return (
    <section className="relative overflow-hidden bg-brand-ink py-24 text-white sm:py-28">
      <div className="glow-blue pointer-events-none absolute inset-x-0 -top-40 h-[34rem] opacity-80" aria-hidden />
      <div className="wrap-content relative text-center" data-reveal>
        <h2 className="text-display-lg !text-white">{title}</h2>
        <p className="mx-auto mt-5 max-w-[36rem] text-lead text-white/70">{lead}</p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <a
            href={primary.href}
            className="btn-primary btn-lg"
            data-track={primary.href === site.app.signup ? 'start-free:cta-band' : 'primary:cta-band'}
          >
            {primary.label}
          </a>
          {secondary && (
            <a href={secondary.href} className="link-more-dark" data-track="secondary:cta-band">
              {secondary.label}
            </a>
          )}
        </div>
        {fine && <p className="mt-6 text-[0.8125rem] text-white/60">{fine}</p>}
      </div>
    </section>
  )
}

/**
 * Real customers, in their own words (content/voices.ts). Renders nothing until
 * a permissioned quote exists for this page, so the site never shows a made-up
 * testimonial or an empty box.
 */
export function Voices({ items, tone = 'white' }: { items: Voice[]; tone?: 'white' | 'alt' }) {
  if (!items.length) return null
  return (
    <Section tone={tone} tight labelledBy="voices-title">
      <div className="wrap">
        <h2 id="voices-title" className="text-center text-headline">
          From Ontario landlords
        </h2>
        <div className={`mx-auto mt-10 grid max-w-[62rem] gap-5 ${items.length > 1 ? 'md:grid-cols-2 lg:grid-cols-3' : ''}`}>
          {items.map((v) => (
            <figure key={v.quote} className={`${tone === 'alt' ? 'bg-white' : 'bg-canvas-alt'} flex flex-col rounded-4xl p-7`} data-reveal>
              <blockquote className="text-[1.0625rem] leading-relaxed text-ink">“{v.quote}”</blockquote>
              <figcaption className="mt-5 text-[0.875rem] text-ink-3">
                <span className="font-semibold text-ink-2">{v.name}</span> · {v.place}
                {v.doors ? ` · ${v.doors} ${v.doors === 1 ? 'door' : 'doors'}` : ''}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </Section>
  )
}

export function Stat({ value, label, dark = false, count }: { value: string; label: ReactNode; dark?: boolean; count?: number }) {
  return (
    <div>
      <p
        className={`whitespace-nowrap font-display text-[2.125rem] font-bold leading-none tracking-[-0.03em] sm:text-[3.25rem] ${dark ? 'text-white' : 'text-ink'}`}
        {...(count !== undefined ? { 'data-count': String(count) } : {})}
      >
        {value}
      </p>
      <p className={`mt-3 text-[0.9375rem] ${dark ? 'text-white/65' : 'text-ink-3'}`}>{label}</p>
    </div>
  )
}

export function Fine({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`text-[0.8125rem] leading-relaxed text-ink-4 ${className}`}>{children}</p>
}

export function ExternalLink({ href, children, className = '' }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a href={href} className={className} rel="noopener">
      {children}
    </a>
  )
}
