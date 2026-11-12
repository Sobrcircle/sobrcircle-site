/**
 * OLH-specific illustrations, drawn in HTML with the same mock kit as the
 * LandlordEzy screens. Every name, address and figure is fictional; the N4 uses
 * the sample figures from Paul's design preview.
 */
import type { CSSProperties } from 'react'
import { BadgeCheck, CalendarClock, CheckCircle2, FileCheck2, Gavel, ScrollText, Wallet } from 'lucide-react'
import { PhoneFrame, SampleTag } from './kit'

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
