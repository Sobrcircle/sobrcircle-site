/**
 * OLH-specific illustrations, drawn in HTML with the same mock kit as the
 * LandlordEzy screens. Every name, address and figure is fictional; the N4 uses
 * the sample figures from Paul's design preview.
 */
import type { CSSProperties } from 'react'
import { BadgeCheck, CalendarClock, Camera, Check, CheckCircle2, FileCheck2, Gavel, Mail, ScrollText, Sparkles, Wallet } from 'lucide-react'
import { PhoneFrame, SampleTag } from './kit'
import { url } from '../../site'
import { listings } from '../../content/listings'

const i = (n: number) => ({ ['--i' as string]: String(n) }) as CSSProperties

/** The N4, auto-filled from the ledger: three months, $3,600 owing (Paul's sample). */
export function OlhN4({ className = '', dark = false }: { className?: string; dark?: boolean }) {
  const rows = [
    ['Sep 1 – Sep 30', '$2,100', '$2,100', '$0'],
    ['Oct 1 – Oct 31', '$2,100', '$600', '$1,500'],
    ['Nov 1 – Nov 30', '$2,100', '$0', '$2,100'],
  ]
  return (
    <figure
      className={`m-0 ${className}`}
      role="img"
      aria-label="Illustration of an N4 notice filled from a rent ledger: $3,600 owing over three rent periods, with e-signature and a Certificate of Service. Sample figures, not a real tenancy."
    >
      <div className="mock-fit" style={{ ['--em' as string]: '40' }}>
        <div className="mock play" data-play aria-hidden="true">
          <div className="m-doc overflow-hidden">
            <div className="flex items-center justify-between bg-[#050c3b] px-[1.4em] py-[0.9em] text-white">
              <span className="text-[0.8em] font-semibold tracking-wide text-white/70">LANDLORD AND TENANT BOARD</span>
              <span className="m-pill dark">Form N4</span>
            </div>
            <div className="px-[1.4em] py-[1.2em]">
              <div className="flex items-start justify-between gap-[1em]">
                <p className="text-[1.15em] font-bold leading-tight tracking-[-0.02em]">
                  Notice to End a Tenancy Early
                  <br />
                  for Non-payment of Rent
                </p>
                <SampleTag />
              </div>
              <div className="mt-[1em]">
                <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr] gap-[0.5em] border-b border-black/10 pb-[0.4em] text-[0.72em] font-semibold text-[#6e6e73]">
                  <span>Rent period</span>
                  <span className="text-right">Charged</span>
                  <span className="text-right">Paid</span>
                  <span className="text-right">Owing</span>
                </div>
                {rows.map((r, idx) => (
                  <div key={r[0]} className="grid grid-cols-[1.6fr_1fr_1fr_1fr] gap-[0.5em] border-b border-black/5 py-[0.5em] text-[0.82em] tabnum" data-step style={i(idx)}>
                    <span>{r[0]}</span>
                    <span className="text-right">{r[1]}</span>
                    <span className="text-right">{r[2]}</span>
                    <span className={`text-right font-semibold ${r[3] === '$0' ? 'text-[#6e6e73]' : ''}`}>{r[3]}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-[0.6em]" data-step style={i(3)}>
                  <span className="m-sm font-semibold">Total rent owing</span>
                  <span className="text-[1.25em] font-bold tabnum tracking-[-0.02em]">$3,600</span>
                </div>
              </div>
              <div className="mt-[1em] flex flex-wrap gap-[0.4em]" data-step style={i(4)}>
                <span className="m-pill brand">Filled from ledger</span>
                <span className="m-pill brand">E-signature</span>
                <span className="m-pill brand">Certificate of Service</span>
              </div>
              <div className="mt-[1em] flex items-end justify-between">
                <span>
                  <span className="m-label block">Landlord signature</span>
                  <span className="mt-[0.2em] block font-[cursive] text-[1.25em] text-[#050c3b]" data-type style={i(5)}>
                    Dana Morrison
                  </span>
                </span>
                <span className="rounded-[0.4em] border-[0.14em] border-[#1f7a16] px-[0.6em] py-[0.15em] text-[0.82em] font-bold uppercase tracking-wider text-[#1f7a16]" data-stamp style={i(6)}>
                  Ready to serve
                </span>
              </div>
            </div>
            <div className={`flex items-center gap-[0.6em] px-[1.4em] py-[0.8em] ${dark ? 'bg-[#eef3ff]' : 'bg-[#f5f5f7]'}`} data-step style={i(7)}>
              <CheckCircle2 className="m-ico text-[#1f7a16]" />
              <span className="m-sm font-semibold">You review, sign and serve</span>
              <span className="m-xs m-faint ml-auto">No OLH drafting fee</span>
            </div>
          </div>
        </div>
      </div>
    </figure>
  )
}

/** Lock screen: what an owner on Landlord Shield hears from the team and the software. */
export function OlhPhone({ className = '' }: { className?: string }) {
  const items = [
    { Icon: Wallet, c: '#096ef9', t: 'Rent received', b: '$2,100 e-Transfer matched to November. Receipt sent to your tenant.', w: 'now' },
    { Icon: BadgeCheck, c: '#1f9d3a', t: 'Ledger checked by OLH', b: 'October statement is ready. No balance owing.', w: '1h' },
    { Icon: CalendarClock, c: '#5856d6', t: 'Paralegal consultation', b: 'Your 15 minutes this month: Tuesday, 2:00 p.m.', w: '3h' },
    { Icon: ScrollText, c: '#ff9500', t: 'Rent is unpaid', b: 'Unit 2 owes $2,100. Your N4 is filled from the ledger.', w: 'Mon' },
  ]
  return (
    <PhoneFrame className={className} label="Phone lock screen with OLH notifications: rent received, ledger checked by the team, a paralegal consultation booked, and an N4 ready" dark>
      <div className="relative h-full bg-[radial-gradient(120%_70%_at_50%_0%,#1a3a8f_0%,#0b1026_55%,#050817_100%)] px-[1em]">
        <p className="pt-[1.2em] text-center text-[0.95em] font-medium text-white/70">Monday, November 2</p>
        <p className="text-center text-[5.2em] font-semibold leading-none tracking-[-0.04em] text-white/95">9:41</p>
        <div className="mt-[2em] space-y-[0.55em]">
          {items.map(({ Icon, c, t, b, w }, idx) => (
            <div
              key={t}
              className="hero-notif rounded-[1.25em] bg-white/[0.82] p-[0.85em] shadow-[0_0.4em_1.2em_rgba(0,0,0,0.25)] backdrop-blur-md"
              style={{ animationDelay: `${0.9 + idx * 0.45}s` }}
            >
              <div className="flex items-start gap-[0.65em]">
                <span className="mt-[0.1em] inline-flex h-[2.2em] w-[2.2em] shrink-0 items-center justify-center rounded-[0.6em] text-white" style={{ background: c }}>
                  <Icon className="m-ico" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between">
                    <span className="text-[0.9em] font-semibold">{t}</span>
                    <span className="m-xs text-[#6e6e73]">{w}</span>
                  </span>
                  <span className="mt-[0.1em] block text-[0.82em] leading-snug text-[#424245] wrap-ok">{b}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PhoneFrame>
  )
}

/** The Legal Guarantee as a case file moving through six stages (dark sections). */
export function CaseTrack({ className = '' }: { className?: string }) {
  const steps = [
    { Icon: ScrollText, t: 'Notice', s: 'Reviewed or prepared, and served properly' },
    { Icon: FileCheck2, t: 'Application', s: 'Eligible LTB applications filed, incl. L1' },
    { Icon: Wallet, t: 'Evidence', s: 'Ledgers and records from LandlordEzy' },
    { Icon: BadgeCheck, t: 'Settlement', s: 'Mediation where it serves you' },
    { Icon: Gavel, t: 'Hearing', s: 'Represented by a licensed paralegal' },
    { Icon: CheckCircle2, t: 'After the order', s: 'Order review and next steps' },
  ]
  return (
    <ol className={`grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 ${className}`}>
      {steps.map(({ Icon, t, s }, idx) => (
        <li key={t} className="flex items-start gap-3.5 rounded-3xl bg-white/[0.06] p-5 ring-1 ring-white/10" data-reveal style={{ ['--reveal-delay' as string]: `${idx * 0.06}s` }}>
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-brand-glow">
            <Icon className="h-5 w-5" strokeWidth={1.8} aria-hidden />
          </span>
          <span>
            <span className="block text-[0.75rem] font-semibold text-white/55">Step {idx + 1}</span>
            <span className="block font-display text-[1.125rem] font-semibold text-white">{t}</span>
            <span className="mt-0.5 block text-[0.9375rem] leading-snug text-white/70">{s}</span>
          </span>
        </li>
      ))}
    </ol>
  )
}

/* ------------------------------------------------------------------------ */
/* Small illustrations for the highlight cards                              */
/* ------------------------------------------------------------------------ */

/** An e-Transfer arrives, is matched, marked paid, then checked by the OLH team. */
export function LedgerCheck({ className = '' }: { className?: string }) {
  return (
    <figure className={`m-0 ${className}`} role="img" aria-label="Illustration: an e-Transfer is matched to November rent, marked paid, and the ledger is checked by the OLH team">
      <div className="mock-fit" style={{ ['--em' as string]: '30' }}>
        <div className="mock play" data-play aria-hidden="true">
          <div className="space-y-[0.6em]">
            <div className="m-card !rounded-[1.1em]" data-step style={i(0)}>
              <p className="m-xs m-faint flex items-center gap-[0.4em]">
                <Mail className="m-ico-s" /> Interac notification
              </p>
              <p className="m-sm mt-[0.3em] font-semibold">MAYA THOMPSON sent you $2,100.00</p>
            </div>
            <div className="m-card !rounded-[1.1em] !bg-[#eaf2ff] !shadow-none" data-step style={i(1)}>
              <p className="m-sm flex items-center gap-[0.45em] font-semibold text-[#0659d6]">
                <Sparkles className="m-ico-s" /> Matched to Unit 2 · November rent
              </p>
            </div>
            <div className="m-card !rounded-[1.1em]" data-step style={i(2)}>
              <div className="flex items-center justify-between">
                <span>
                  <span className="m-sm block font-semibold">November 2026</span>
                  <span className="m-xs m-faint">Receipt emailed to Maya</span>
                </span>
                <span className="m-pill go">
                  <Check className="m-ico-s" strokeWidth={3} /> Paid
                </span>
              </div>
            </div>
            <div className="m-card !rounded-[1.1em] !bg-[#050c3b] !shadow-none" data-step style={i(3)}>
              <div className="flex items-center justify-between gap-[0.8em]">
                <span>
                  <span className="m-sm block font-semibold text-white">Checked by the OLH team</span>
                  <span className="m-xs text-white/60">November statement sent · no balance owing</span>
                </span>
                <BadgeCheck className="m-ico-l shrink-0 text-[#79d220]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </figure>
  )
}

/** This month's 15 minutes with a licensed paralegal. */
export function ConsultCard({ className = '' }: { className?: string }) {
  return (
    <figure className={`m-0 ${className}`} role="img" aria-label="Illustration: a 15-minute consultation with a licensed paralegal booked for Tuesday at 2 p.m.">
      <div className="mock-fit" style={{ ['--em' as string]: '30' }}>
        <div className="mock" aria-hidden="true">
          <div className="m-card !rounded-[1.3em] !p-[1.4em]">
            <div className="flex items-center justify-between">
              <p className="m-label">This month’s consultation</p>
              <span className="m-pill go">Booked</span>
            </div>
            <div className="mt-[1em] flex items-center gap-[0.9em]">
              <span className="flex h-[3.6em] w-[3.6em] shrink-0 flex-col items-center justify-center rounded-[0.9em] bg-[#eaf2ff] text-[#0659d6]">
                <span className="text-[0.62em] font-bold uppercase tracking-wider">Tue</span>
                <span className="text-[1.5em] font-bold leading-none">17</span>
              </span>
              <span>
                <span className="block text-[1.15em] font-bold tracking-[-0.02em]">2:00 – 2:15 p.m.</span>
                <span className="m-sm m-muted">Licensed paralegal · by phone</span>
              </span>
            </div>
            <div className="m-divider my-[1em]" />
            <p className="m-label">You asked about</p>
            <div className="mt-[0.5em] flex flex-wrap gap-[0.4em]">
              <span className="m-pill brand">Late rent, first time</span>
              <span className="m-pill brand">N4 timing</span>
              <span className="m-pill brand">Entry notice</span>
            </div>
          </div>
          <div className="m-card mt-[0.6em] !rounded-[1.1em] !bg-[#f5f5f7] !shadow-none">
            <p className="m-xs m-muted wrap-ok">Advice about your enrolled tenancies. Anything more is quoted first.</p>
          </div>
        </div>
      </div>
    </figure>
  )
}

/** A visit report: dated photos, a checklist, filed in LandlordEzy. */
export function VisitReport({ className = '' }: { className?: string }) {
  const photos = ['linear-gradient(135deg,#cfe0ff,#8fb6ff)', 'linear-gradient(135deg,#dff3cf,#a9dc7e)', 'linear-gradient(135deg,#ffe6c2,#ffc27a)']
  return (
    <figure className={`m-0 ${className}`} role="img" aria-label="Illustration of a visit report with dated photos and a checklist, filed in LandlordEzy">
      <div className="mock-fit" style={{ ['--em' as string]: '30' }}>
        <div className="mock" aria-hidden="true">
          <div className="m-card !rounded-[1.3em] !p-[1.4em]">
            <div className="flex items-center justify-between">
              <p className="m-h">Visit report</p>
              <span className="m-pill go">Filed</span>
            </div>
            <p className="m-xs m-faint mt-[0.2em]">48 Maple Ave, Unit 2 · Nov 6, 2:10 p.m.</p>
            <div className="mt-[0.9em] grid grid-cols-3 gap-[0.45em]">
              {photos.map((bg, idx) => (
                <span key={bg} className="flex aspect-[4/3] items-end justify-between rounded-[0.6em] p-[0.4em]" style={{ background: bg }}>
                  <Camera className="m-ico-s text-white/90" />
                  <span className="text-[0.56em] font-semibold text-white/90">2:1{idx + 2} p.m.</span>
                </span>
              ))}
            </div>
            <div className="mt-[0.7em]">
              {[
                ['Exterior and entry', 'go', 'OK'],
                ['Smoke and CO alarms', 'go', 'OK'],
                ['Furnace filter', 'warn', 'Replace'],
              ].map(([t, c, l]) => (
                <div key={t} className="m-row">
                  <span className="m-sm">{t}</span>
                  <span className={`m-pill ${c}`}>{l}</span>
                </div>
              ))}
            </div>
            <p className="m-xs m-faint mt-[0.7em]">45 minutes on site · report in LandlordEzy</p>
          </div>
        </div>
      </div>
    </figure>
  )
}

/** The six stages of a Legal Guarantee matter, as a compact vertical track (dark cards). */
export function CaseList({ className = '' }: { className?: string }) {
  const steps = ['Notice', 'Application', 'Evidence', 'Settlement', 'Hearing', 'After the order']
  return (
    <ol className={`caselist ${className}`}>
      {steps.map((t, idx) => (
        <li key={t}>
          <span className="caselist-n">{idx + 1}</span>
          {t}
        </li>
      ))}
    </ol>
  )
}

/**
 * A real home from the rentals snapshot, floated on the hero: the one photograph
 * among the drawn screens, so the first screen says "real places" as well as
 * "software". Sized in em and scaled by its container, like the mock-ups.
 */
export function HeroListing({ className = '' }: { className?: string }) {
  const l = listings[0]
  return (
    <a href={l.href} className={`hero-listing mock-fit block ${className}`} style={{ ['--em' as string]: '17' }} data-track="hero:listing">
      <span className="mock block overflow-hidden rounded-[1.1em] bg-white shadow-float ring-1 ring-black/5">
        <img src={url(`img/listings/${l.img}.webp`)} alt={`${l.street}, ${l.city}`} width={720} height={540} className="aspect-[4/3] w-full object-cover" decoding="async" />
        <span className="block px-[1em] py-[0.8em]">
          <span className="flex items-center gap-[0.45em] text-[0.74em] font-semibold text-[#1f7a16]">
            <span className="h-[0.6em] w-[0.6em] rounded-full bg-[#79d220]" /> Now leasing · {l.city}
          </span>
          <span className="mt-[0.25em] block text-[1.15em] font-bold tracking-[-0.02em] text-[#1d1d1f]">{l.price}</span>
          <span className="block text-[0.78em] text-[#636368]">{l.street}</span>
        </span>
      </span>
    </a>
  )
}
