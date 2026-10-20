/**
 * Illustrative LandlordEzy screens. Every name, address and number is
 * fictional. They show what each feature does, not a pixel copy of the app.
 */
import type { CSSProperties } from 'react'
import {
  AlarmSmoke,
  ArrowRight,
  ArrowUp,
  Award,
  Bell,
  BellRing,
  Calendar,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  CookingPot,
  DoorOpen,
  FileSignature,
  FireExtinguisher,
  Flame,
  Home,
  Mail,
  MessageSquare,
  Search,
  Send,
  ShieldCheck,
  Sofa,
  Sparkles,
  Wallet,
  Wrench,
  Camera,
  Star,
  TrendingUp,
  Receipt,
  Eye,
  MapPin,
  BedDouble,
  Bath,
  Scale,
} from 'lucide-react'
import { AppShell, BrowserFrame, PhoneFrame, SampleTag } from './kit'

const i = (n: number) => ({ ['--i' as string]: String(n) }) as CSSProperties

function Tick() {
  return (
    <span className="m-check">
      <Check strokeWidth={3.2} />
    </span>
  )
}

/* ------------------------------------------------------------------------ */
/* Dashboard                                                                */
/* ------------------------------------------------------------------------ */
export function DashboardScreen({ className = '' }: { className?: string }) {
  const ring = 2 * Math.PI * 30
  return (
    <BrowserFrame className={className} label="LandlordEzy dashboard showing October rent collected, arrears and upcoming tasks">
      <AppShell active="Dashboard">
        <div className="flex items-end justify-between">
          <div>
            <p className="m-label">Wednesday, October 14</p>
            <p className="m-title mt-[0.2em]">Good morning, Dana</p>
          </div>
          <span className="m-btn">
            <Sparkles className="m-ico-s" /> Ask Ezy
          </span>
        </div>

        <div className="mt-[1.2em] grid grid-cols-[1.35fr_1fr_1fr] gap-[0.9em]">
          <div className="m-card play" data-play>
            <p className="m-label">October rent collected</p>
            <div className="mt-[0.6em] flex items-center gap-[1em]">
              <svg viewBox="0 0 72 72" className="h-[5.2em] w-[5.2em] -rotate-90">
                <circle cx="36" cy="36" r="30" fill="none" stroke="#efeff2" strokeWidth="8" />
                <circle
                  cx="36"
                  cy="36"
                  r="30"
                  fill="none"
                  stroke="#096ef9"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={ring}
                  data-ring
                  style={{ ['--ring-len' as string]: String(ring), ['--ring-to' as string]: String(ring * 0.08) }}
                />
              </svg>
              <div>
                <p className="m-num">$18,640</p>
                <p className="m-sm m-muted mt-[0.3em]">of $20,250 · 92%</p>
              </div>
            </div>
          </div>
          <div className="m-card">
            <p className="m-label">Arrears</p>
            <p className="m-num mt-[0.55em]">$1,610</p>
            <p className="m-sm m-muted mt-[0.35em]">1 tenant behind</p>
            <span className="m-pill warn mt-[0.7em]">N4 ready in 1 tap</span>
          </div>
          <div className="m-card">
            <p className="m-label">Reported to Equifax</p>
            <p className="m-num mt-[0.55em]">11</p>
            <p className="m-sm m-muted mt-[0.35em]">on-time tenants this month</p>
            <span className="m-pill go mt-[0.7em]">Submitted Oct 5</span>
          </div>
        </div>

        <div className="mt-[0.9em] grid grid-cols-[1.35fr_2fr] gap-[0.9em]">
          <div className="m-card">
            <p className="m-h">Up next</p>
            <div className="mt-[0.5em]">
              {[
                { Icon: Flame, t: 'Fire safety inspection', s: '48 Maple Ave · Fri', c: 'text-[#c46a00]' },
                { Icon: FileSignature, t: 'Lease renewal signed', s: '112 Elm St · Unit B', c: 'text-[#1f7a16]' },
                { Icon: TrendingUp, t: 'N1 takes effect Jan 1', s: '1.9% · auto-applied', c: 'text-[#096ef9]' },
              ].map(({ Icon, t, s, c }) => (
                <div key={t} className="m-row">
                  <span className="flex items-center gap-[0.65em]">
                    <Icon className={`m-ico ${c}`} strokeWidth={1.9} />
                    <span>
                      <span className="m-sm block font-semibold">{t}</span>
                      <span className="m-xs m-faint">{s}</span>
                    </span>
                  </span>
                  <ChevronRight className="m-ico-s text-[#c7c7cc]" />
                </div>
              ))}
            </div>
          </div>
          <div className="m-card">
            <div className="flex items-center justify-between">
              <p className="m-h">Activity</p>
              <span className="m-pill gray">Live</span>
            </div>
            <div className="mt-[0.5em]">
              {[
                { a: 'MT', bg: '#eaf2ff', fg: '#0659d6', t: 'Rent received · $1,950', s: 'Maya Thompson · e-Transfer matched to October', p: 'go', pl: 'Paid' },
                { a: 'JE', bg: '#ecf8e1', fg: '#1f7a16', t: 'Applicant pre-screened', s: 'Jordan Ellis · 112 Elm St · Unit B', p: 'brand', pl: 'Review' },
                { a: 'RS', bg: '#fff3e0', fg: '#9a4f00', t: 'Rent 5 days late · $1,610', s: 'Ravi Singh · 7 Wyandotte St', p: 'warn', pl: 'Serve N4' },
                { a: 'BP', bg: '#f0f0f3', fg: '#424245', t: 'Repair completed · $240', s: 'Bayview Plumbing · billed to expenses', p: 'gray', pl: 'Closed' },
              ].map((r) => (
                <div key={r.t} className="m-row">
                  <span className="flex min-w-0 items-center gap-[0.65em]">
                    <span className="m-avatar" style={{ background: r.bg, color: r.fg }}>
                      {r.a}
                    </span>
                    <span className="min-w-0">
                      <span className="m-sm block font-semibold">{r.t}</span>
                      <span className="m-xs m-faint block truncate">{r.s}</span>
                    </span>
                  </span>
                  <span className={`m-pill ${r.p}`}>{r.pl}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AppShell>
    </BrowserFrame>
  )
}

/* ------------------------------------------------------------------------ */
/* Tenant ledger with e-Transfer matching                                    */
/* ------------------------------------------------------------------------ */
export function LedgerScreen({ className = '' }: { className?: string }) {
  return (
    <BrowserFrame className={className} label="Tenant profile with a rent ledger where an Interac e-Transfer is matched and marked paid">
      <AppShell active="Rent">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[0.8em]">
            <span className="m-avatar !h-[3em] !w-[3em] !text-[1em]" style={{ background: '#eaf2ff', color: '#0659d6' }}>
              MT
            </span>
            <div>
              <p className="m-title !text-[1.35em]">Maya Thompson</p>
              <p className="m-sm m-muted">48 Maple Ave, Unit 2 · Windsor · $1,950/mo</p>
            </div>
          </div>
          <div className="flex gap-[0.4em]">
            <span className="m-pill go">Current</span>
            <span className="m-pill brand">Reporting to Equifax</span>
          </div>
        </div>

        <div className="play mt-[1.2em] grid grid-cols-[1fr_1.55fr] gap-[0.9em]" data-play>
          <div className="flex flex-col gap-[0.7em]">
            <div className="m-card" data-step style={i(0)}>
              <div className="flex items-center gap-[0.5em]">
                <Mail className="m-ico text-[#6e6e73]" />
                <span className="m-xs m-faint">Interac notification · 9:02 a.m.</span>
              </div>
              <p className="m-sm mt-[0.45em] font-semibold">INTERAC e-Transfer: MAYA THOMPSON sent you $1,950.00</p>
            </div>
            <div className="m-card !bg-[#eaf2ff] !shadow-none" data-step style={i(1)}>
              <div className="flex items-center gap-[0.5em] text-[#0659d6]">
                <Sparkles className="m-ico" />
                <span className="m-sm font-semibold">Matched to Maya Thompson</span>
              </div>
              <p className="m-xs mt-[0.35em] text-[#0659d6]">Payer learned · applied to October (oldest owing)</p>
            </div>
            <div className="m-card" data-step style={i(2)}>
              <div className="flex items-center gap-[0.5em]">
                <Receipt className="m-ico text-[#1f7a16]" />
                <span className="m-sm font-semibold">Receipt emailed to tenant</span>
              </div>
              <p className="m-xs m-faint mt-[0.35em]">Duplicate-checked against Interac reference</p>
            </div>
            <div className="m-card" data-step style={i(3)}>
              <div className="flex items-center gap-[0.5em]">
                <BellRing className="m-ico text-[#096ef9]" />
                <span className="m-sm font-semibold">November reminder scheduled</span>
              </div>
              <p className="m-xs m-faint mt-[0.35em]">Goes to Maya on October 28 · 14 on-time months</p>
            </div>
          </div>

          <div className="m-card">
            <div className="flex items-center justify-between">
              <p className="m-h">Rent ledger</p>
              <span className="m-xs m-faint">Balance $0.00</span>
            </div>
            <div className="mt-[0.4em]">
              {[
                { m: 'October 2026', d: 'Oct 1 · e-Transfer', live: true },
                { m: 'September 2026', d: 'Sep 1 · e-Transfer' },
                { m: 'August 2026', d: 'Jul 31 · e-Transfer' },
                { m: 'July 2026', d: 'Jul 1 · e-Transfer' },
                { m: 'June 2026', d: 'Jun 1 · e-Transfer' },
                { m: 'May 2026', d: 'May 1 · e-Transfer' },
              ].map((r) => (
                <div key={r.m} className="m-row">
                  <span>
                    <span className="m-sm block font-semibold">{r.m}</span>
                    <span className="m-xs m-faint">{r.d}</span>
                  </span>
                  <span className="flex items-center gap-[0.7em]">
                    <span className="m-sm tabnum font-semibold">$1,950.00</span>
                    {r.live ? (
                      <span className="relative inline-flex">
                        <span className="m-pill warn" data-step style={{ ...i(0), position: 'absolute', right: 0 }}>
                          Due
                        </span>
                        <span className="m-pill go" data-step style={i(3)}>
                          <Check className="m-ico-s" strokeWidth={3} /> Paid
                        </span>
                      </span>
                    ) : (
                      <span className="m-pill go">
                        <Check className="m-ico-s" strokeWidth={3} /> Paid
                      </span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AppShell>
    </BrowserFrame>
  )
}

/* ------------------------------------------------------------------------ */
/* N4 notice (illustrative; not the official form layout)                   */
/* ------------------------------------------------------------------------ */
export function N4Screen({ className = '', dark = false }: { className?: string; dark?: boolean }) {
  return (
    <figure className={`m-0 ${className}`} role="img" aria-label="Sample N4 notice auto-filled from the rent ledger, with a 7-day termination date and a Certificate of Service">
      <div className="mock-fit" style={{ ['--em' as string]: '40' }}>
        <div className="mock play" data-play aria-hidden="true">
          <div className="m-doc overflow-hidden">
            <div className="flex items-center justify-between bg-[#050c3b] px-[1.4em] py-[0.9em] text-white">
              <span className="text-[0.8em] font-semibold tracking-wide text-white/70">LANDLORD AND TENANT BOARD</span>
              <span className="m-pill dark">Form N4 · 2026</span>
            </div>
            <div className="px-[1.4em] py-[1.2em]">
              <div className="flex items-start justify-between gap-[1em]">
                <p className="text-[1.15em] font-bold leading-tight tracking-[-0.02em]">
                  Notice to End your Tenancy Early
                  <br />
                  for Non-payment of Rent
                </p>
                <SampleTag />
              </div>
              <div className="mt-[1em] grid grid-cols-2 gap-[0.8em]">
                <div className="m-panel">
                  <p className="m-label">To (tenant)</p>
                  <p className="m-sm mt-[0.2em] font-semibold" data-type style={i(0)}>
                    Ravi Singh
                  </p>
                </div>
                <div className="m-panel">
                  <p className="m-label">Rental unit</p>
                  <p className="m-sm mt-[0.2em] font-semibold" data-type style={i(1)}>
                    7 Wyandotte St, Unit 3
                  </p>
                </div>
              </div>
              <div className="mt-[0.9em]">
                <div className="grid grid-cols-[1.6fr_1fr_1fr_1fr] gap-[0.5em] border-b border-black/10 pb-[0.4em] text-[0.72em] font-semibold text-[#6e6e73]">
                  <span>Rent period</span>
                  <span className="text-right">Charged</span>
                  <span className="text-right">Paid</span>
                  <span className="text-right">Owing</span>
                </div>
                {[['Oct 1 – Oct 31, 2026', '$1,610.00', '$0.00', '$1,610.00']].map((r, idx) => (
                  <div key={r[0]} className="grid grid-cols-[1.6fr_1fr_1fr_1fr] gap-[0.5em] border-b border-black/5 py-[0.5em] text-[0.82em] tabnum" data-step style={i(2 + idx)}>
                    <span>{r[0]}</span>
                    <span className="text-right">{r[1]}</span>
                    <span className="text-right">{r[2]}</span>
                    <span className="text-right font-semibold">{r[3]}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-[0.6em]" data-step style={i(4)}>
                  <span className="m-sm font-semibold">Total rent owing</span>
                  <span className="text-[1.25em] font-bold tabnum tracking-[-0.02em]">$1,610.00</span>
                </div>
              </div>
              <div className="mt-[0.9em] flex items-center justify-between gap-[0.8em] rounded-[0.7em] bg-[#eaf2ff] px-[1em] py-[0.75em]" data-step style={i(5)}>
                <span>
                  <span className="m-xs block font-semibold text-[#0659d6]">Termination date · 7-day rule</span>
                  <span className="m-sm block font-semibold">Handed over Oct 15 → October 22, 2026</span>
                </span>
                <Calendar className="m-ico-l text-[#096ef9]" />
              </div>
              <div className="mt-[0.9em] flex items-end justify-between">
                <span>
                  <span className="m-label block">Landlord signature</span>
                  <span className="mt-[0.2em] block font-[cursive] text-[1.25em] text-[#050c3b]" data-type style={i(6)}>
                    Dana Morrison
                  </span>
                </span>
                <span className="rounded-[0.4em] border-[0.14em] border-[#1f7a16] px-[0.6em] py-[0.15em] text-[0.82em] font-bold uppercase tracking-wider text-[#1f7a16]" data-stamp style={i(7)}>
                  Served
                </span>
              </div>
            </div>
            <div className={`flex items-center gap-[0.6em] px-[1.4em] py-[0.8em] ${dark ? 'bg-[#eef3ff]' : 'bg-[#f5f5f7]'}`} data-step style={i(8)}>
              <CheckCircle2 className="m-ico text-[#1f7a16]" />
              <span className="m-sm font-semibold">Certificate of Service generated</span>
              <span className="m-xs m-faint ml-auto">PDF · e-signed</span>
            </div>
          </div>
        </div>
      </div>
    </figure>
  )
}

/* ------------------------------------------------------------------------ */
/* N1 rent increase                                                          */
/* ------------------------------------------------------------------------ */
export function N1Screen({ className = '' }: { className?: string }) {
  return (
    <figure className={`m-0 ${className}`} role="img" aria-label="Automated N1 rent increase at the 2027 guideline of 1.9 percent, applied to the ledger on the effective date">
      <div className="mock-fit" style={{ ['--em' as string]: '34' }}>
        <div className="mock play" data-play aria-hidden="true">
          <div className="m-card !p-[1.3em]">
            <div className="flex items-center justify-between">
              <span className="m-pill brand">N1 · Notice of Rent Increase</span>
              <SampleTag />
            </div>
            <div className="mt-[1em] grid grid-cols-2 gap-[0.7em]">
              <div className="m-panel">
                <p className="m-label">Current rent</p>
                <p className="mt-[0.2em] text-[1.35em] font-bold tabnum tracking-[-0.02em]">$1,950.00</p>
              </div>
              <div className="m-panel !bg-[#eaf2ff]">
                <p className="m-label !text-[#0659d6]">New rent · 1.9%</p>
                <p className="mt-[0.2em] text-[1.35em] font-bold tabnum tracking-[-0.02em] text-[#0659d6]" data-type style={i(0)}>
                  $1,987.05
                </p>
              </div>
            </div>
            <div className="mt-[0.8em]">
              {[
                ['Earliest effective date', 'March 1, 2027'],
                ['Serve by (90 days + mail)', 'November 26, 2026'],
                ['Last increase', 'March 1, 2026 · 12 months ✓'],
              ].map(([k, v], idx) => (
                <div key={k} className="m-row" data-step style={i(1 + idx)}>
                  <span className="m-sm m-muted">{k}</span>
                  <span className="m-sm font-semibold">{v}</span>
                </div>
              ))}
            </div>
            <div className="mt-[0.9em] flex items-center gap-[0.6em] rounded-[0.7em] bg-[#ecf8e1] px-[0.9em] py-[0.7em]" data-step style={i(4)}>
              <CheckCircle2 className="m-ico text-[#1f7a16]" />
              <span className="m-sm font-semibold text-[#1f7a16]">Auto-applies to the ledger on Mar 1</span>
            </div>
          </div>
        </div>
      </div>
    </figure>
  )
}

/* ------------------------------------------------------------------------ */
/* Screening report                                                          */
/* ------------------------------------------------------------------------ */
export function ScreeningScreen({ className = '' }: { className?: string }) {
  const ring = 2 * Math.PI * 42
  const pct = (742 - 300) / (900 - 300)
  return (
    <figure className={`m-0 ${className}`} role="img" aria-label="Sample tenant screening report with an Equifax score of 742, verified identity and a recommendation to approve">
      <div className="mock-fit" style={{ ['--em' as string]: '36' }}>
        <div className="mock play" data-play aria-hidden="true">
          <div className="m-card !rounded-[1.3em] !p-[1.4em]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[0.7em]">
                <span className="m-avatar !h-[2.8em] !w-[2.8em]" style={{ background: '#ecf8e1', color: '#1f7a16' }}>
                  JE
                </span>
                <div>
                  <p className="m-h">Jordan Ellis</p>
                  <p className="m-xs m-faint">Applying for 112 Elm St · Unit B · $1,875/mo</p>
                </div>
              </div>
              <SampleTag />
            </div>

            <div className="mt-[1.1em] flex items-center gap-[1.2em] rounded-[1em] bg-[#f5f5f7] p-[1em]">
              <div className="relative h-[6.4em] w-[6.4em] shrink-0">
                <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#e5e5ea" strokeWidth="9" />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="#1f9d3a"
                    strokeWidth="9"
                    strokeLinecap="round"
                    strokeDasharray={ring}
                    data-ring
                    style={{ ['--ring-len' as string]: String(ring), ['--ring-to' as string]: String(ring * (1 - pct)), ...i(0) }}
                  />
                </svg>
                <span className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[1.6em] font-bold tabnum tracking-[-0.03em]">742</span>
                  <span className="m-xs m-faint">Equifax</span>
                </span>
              </div>
              <div>
                <p className="m-label">AI recommendation</p>
                <p className="mt-[0.15em] flex items-center gap-[0.4em] text-[1.45em] font-bold tracking-[-0.02em] text-[#1f7a16]" data-step style={i(1)}>
                  <CheckCircle2 className="h-[1em] w-[1em]" /> Approve
                </p>
                <p className="m-xs m-muted mt-[0.3em] wrap-ok">Strong payment history, stable income, identity confirmed.</p>
              </div>
            </div>

            <div className="mt-[0.8em]">
              {[
                ['Income to rent', '3.1× · comfortable', 'go'],
                ['Identity', 'Verified · document match', 'go'],
                ['Bank statements (4 mo)', 'Stable deposits', 'go'],
                ['Collections & judgments', 'None reported', 'go'],
                ['References', '2 of 2 confirmed', 'brand'],
              ].map(([k, v, t], idx) => (
                <div key={k} className="m-row" data-step style={i(2 + idx * 0.6)}>
                  <span className="m-sm m-muted">{k}</span>
                  <span className={`m-pill ${t}`}>{v}</span>
                </div>
              ))}
            </div>
            <div className="mt-[0.9em] flex items-center justify-between">
              <span className="flex items-center gap-[0.4em] text-[0.74em] text-[#6e6e73]">
                <ShieldCheck className="m-ico-s text-[#096ef9]" /> Soft inquiry · score not affected
              </span>
              <span className="m-btn">
                <Send className="m-ico-s" /> Share
              </span>
            </div>
          </div>
        </div>
      </div>
    </figure>
  )
}

/* ------------------------------------------------------------------------ */
/* Rent reporting                                                            */
/* ------------------------------------------------------------------------ */
export function ReportingScreen({ className = '', dark = false }: { className?: string; dark?: boolean }) {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
  return (
    <figure className={`m-0 ${className}`} role="img" aria-label="Twelve months of on-time rent reported to Equifax for a tenant who consented to reporting">
      <div className="mock-fit" style={{ ['--em' as string]: '36' }}>
        <div className={`mock play ${dark ? 'mock-dark' : ''}`} data-play aria-hidden="true">
          <div className="m-card !rounded-[1.3em] !p-[1.4em]">
            <div className="flex items-center justify-between">
              <div>
                <p className="m-label">Rent reporting · Equifax Canada</p>
                <p className="m-h mt-[0.2em]">Maya Thompson · Unit 2</p>
              </div>
              <span className="m-pill go">Consent on file</span>
            </div>
            <div className="mt-[1.1em] grid grid-cols-5 gap-[0.5em]">
              {months.map((m, idx) => (
                <div key={m} className={`flex flex-col items-center gap-[0.35em] rounded-[0.7em] py-[0.7em] ${dark ? 'bg-white/[0.06]' : 'bg-[#f5f5f7]'}`} data-step style={i(idx * 0.35)}>
                  <Tick />
                  <span className="m-xs m-muted">{m}</span>
                </div>
              ))}
            </div>
            <div className="mt-[1em] flex items-center justify-between">
              <span>
                <span className="m-label block">On-time streak</span>
                <span className="text-[1.6em] font-bold tabnum tracking-[-0.03em]">14 months</span>
              </span>
              <span className="text-right">
                <span className="m-label block">Next submission</span>
                <span className="m-sm font-semibold">November 5</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </figure>
  )
}

/* ------------------------------------------------------------------------ */
/* Ezy AI on a phone                                                          */
/* ------------------------------------------------------------------------ */
export function EzyChatPhone({ className = '' }: { className?: string }) {
  return (
    <PhoneFrame className={className} label="Ezy AI drafting a 24-hour notice of entry and showing when the tenant opened it">
      <div className="play relative h-full px-[1.2em] pt-[0.6em]" data-play>
        <div className="flex items-center gap-[0.5em] pb-[0.8em]">
          <span className="inline-flex h-[2.1em] w-[2.1em] items-center justify-center rounded-full bg-[#050c3b] text-[#4c9bff]">
            <Sparkles className="m-ico-s" />
          </span>
          <span>
            <span className="block text-[0.95em] font-semibold">Ezy</span>
            <span className="m-xs m-faint">Maya Thompson · Unit 2</span>
          </span>
        </div>
        <div className="ml-auto w-[80%] rounded-[1.2em] rounded-br-[0.3em] bg-[#096ef9] px-[1em] py-[0.7em] text-[0.92em] text-white wrap-ok" data-step style={i(0)}>
          Draft a 24-hour notice. The plumber is coming Thursday afternoon.
        </div>
        <div className="mt-[0.8em] w-[90%] rounded-[1.2em] rounded-bl-[0.3em] bg-[#f0f0f3] p-[0.9em]" data-step style={i(1)}>
          <p className="m-xs font-semibold text-[#0659d6]">24-hour notice of entry</p>
          <p className="m-sm mt-[0.35em] wrap-ok leading-snug">
            Dear Maya, we will enter 48 Maple Ave, Unit 2 on <strong>Thursday, October 22</strong> between <strong>1 and 5 p.m.</strong> for a
            plumbing repair (RTA s. 27).
          </p>
          <div className="mt-[0.7em] flex gap-[0.4em]">
            <span className="m-btn !text-[0.72em]">
              <Send className="m-ico-s" /> Email + text
            </span>
            <span className="m-btn ghost !text-[0.72em]">Edit</span>
          </div>
        </div>
        <div className="mt-[1em] rounded-[1em] border border-black/5 bg-white p-[0.9em]" data-step style={i(2)}>
          {[
            { Icon: Send, t: 'Sent', s: '9:12 a.m.' },
            { Icon: Eye, t: 'Opened', s: '9:30 a.m.' },
            { Icon: CheckCircle2, t: 'Acknowledged', s: '9:36 a.m.' },
          ].map(({ Icon, t, s }, idx) => (
            <div key={t} className="flex items-center gap-[0.6em] py-[0.35em]" data-step style={i(2.6 + idx * 0.5)}>
              <Icon className={`m-ico ${idx === 2 ? 'text-[#1f7a16]' : 'text-[#096ef9]'}`} />
              <span className="m-sm font-semibold">{t}</span>
              <span className="m-xs m-faint ml-auto">{s}</span>
            </div>
          ))}
        </div>
        <p className="m-xs m-faint mt-[0.8em] text-center wrap-ok">Ezy drafts. You review and send. Not legal advice.</p>
        <div className="absolute inset-x-[1.2em] bottom-[2.2em] flex items-center gap-[0.5em] rounded-full border border-black/10 bg-white py-[0.45em] pl-[1em] pr-[0.45em]">
          <span className="m-sm m-faint flex-1">Ask Ezy for a notice or letter…</span>
          <span className="inline-flex h-[2em] w-[2em] items-center justify-center rounded-full bg-[#096ef9] text-white">
            <ArrowUp className="m-ico-s" strokeWidth={2.6} />
          </span>
        </div>
      </div>
    </PhoneFrame>
  )
}

/* ------------------------------------------------------------------------ */
/* Lock-screen notifications (hero)                                          */
/* ------------------------------------------------------------------------ */
export function NotificationsPhone({ className = '' }: { className?: string }) {
  const items = [
    { Icon: Wallet, c: '#096ef9', t: 'Rent received', b: '$1,950 from Maya Thompson, matched to October. Receipt sent.', w: 'now' },
    { Icon: ShieldCheck, c: '#1f9d3a', t: 'Applicant pre-screened', b: 'Jordan Ellis · Equifax 742 · Recommendation: approve.', w: '12m' },
    { Icon: FileSignature, c: '#5856d6', t: 'Lease signed', b: '112 Elm St, Unit B. Ontario Standard Lease, e-signed by both parties.', w: '1h' },
    { Icon: Bell, c: '#ff9500', t: 'Rent is late', b: 'Ravi Singh owes $1,610. Your N4 is ready to serve.', w: '2h' },
  ]
  return (
    <PhoneFrame className={className} label="Phone lock screen with LandlordEzy notifications: rent received, applicant screened, lease signed, rent late" dark>
      <div className="relative h-full bg-[radial-gradient(120%_70%_at_50%_0%,#1a3a8f_0%,#0b1026_55%,#050817_100%)] px-[1em]">
        <p className="pt-[1.2em] text-center text-[0.95em] font-medium text-white/70">Wednesday, October 14</p>
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

/* ------------------------------------------------------------------------ */
/* Maintenance dispatch                                                      */
/* ------------------------------------------------------------------------ */
export function MaintenanceScreen({ className = '' }: { className?: string }) {
  return (
    <figure className={`m-0 ${className}`} role="img" aria-label="A repair request dispatched in one tap to the tenant, the owner and the vendor">
      <div className="mock-fit" style={{ ['--em' as string]: '36' }}>
        <div className="mock play" data-play aria-hidden="true">
          <div className="m-card !rounded-[1.3em] !p-[1.4em]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[0.6em]">
                <span className="inline-flex h-[2.4em] w-[2.4em] items-center justify-center rounded-[0.7em] bg-[#fff3e0] text-[#9a4f00]">
                  <Wrench className="m-ico" />
                </span>
                <span>
                  <span className="m-h block">Kitchen sink leak</span>
                  <span className="m-xs m-faint">120 Adelaide St · Unit 101 · reported 8:14 a.m.</span>
                </span>
              </div>
              <span className="m-pill warn">Urgent</span>
            </div>
            <div className="mt-[1em] space-y-[0.5em]">
              {[
                ['Ask the tenant for availability', 'Tenant', 0],
                ['Request owner approval · est. $240', 'Owner', 1],
                ['Assign Bayview Plumbing ★ 4.9', 'Vendor', 2],
              ].map(([t, who, n]) => (
                <div key={t as string} className="flex items-center gap-[0.7em] rounded-[0.8em] bg-[#f5f5f7] px-[0.9em] py-[0.7em]" data-step style={i(n as number)}>
                  <Tick />
                  <span className="m-sm flex-1 font-medium">{t}</span>
                  <span className="m-pill gray">{who}</span>
                </div>
              ))}
            </div>
            <div className="mt-[0.9em] flex items-center justify-between rounded-[0.9em] bg-[#050c3b] px-[1em] py-[0.8em] text-white" data-step style={i(3)}>
              <span className="flex items-center gap-[0.5em]">
                <Send className="m-ico text-[#4c9bff]" />
                <span className="m-sm font-semibold">3 notifications sent · 1 live link</span>
              </span>
              <ArrowRight className="m-ico text-white/60" />
            </div>
            <div className="mt-[0.7em] grid grid-cols-3 gap-[0.5em]" data-step style={i(4)}>
              {[
                ['Tenant', 'Thu 1–3 p.m.'],
                ['Owner', 'Approved'],
                ['Vendor', 'On the way'],
              ].map(([k, v]) => (
                <div key={k} className="rounded-[0.7em] border border-black/5 px-[0.7em] py-[0.55em] text-center">
                  <p className="m-xs m-faint">{k}</p>
                  <p className="m-xs mt-[0.15em] font-semibold text-[#1f7a16]">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </figure>
  )
}

/* ------------------------------------------------------------------------ */
/* Owner statement (property managers)                                       */
/* ------------------------------------------------------------------------ */
export function OwnerStatementScreen({ className = '' }: { className?: string }) {
  return (
    <BrowserFrame className={className} label="Property manager month-end page with an owner statement: rent collected, fees, bills and net distribution">
      <AppShell active="Reports">
        <div className="flex items-end justify-between">
          <div>
            <p className="m-label">Month-end · October 2026</p>
            <p className="m-title mt-[0.2em]">Owner statements</p>
          </div>
          <span className="m-btn">Finalize month</span>
        </div>
        <div className="mt-[1.1em] grid grid-cols-[1fr_1.3fr] gap-[0.9em]">
          <div className="m-card">
            <p className="m-h">Owners</p>
            <div className="mt-[0.4em]">
              {[
                ['R. Patel', '6 doors', 'go', 'Ready'],
                ['Lakeshore Holdings', '14 doors', 'go', 'Ready'],
                ['M. & S. Kowalski', '3 doors · co-owned', 'warn', '1 bill pending'],
                ['D. Fournier', '2 doors', 'go', 'Ready'],
              ].map(([n, d, t, s]) => (
                <div key={n} className="m-row">
                  <span>
                    <span className="m-sm block font-semibold">{n}</span>
                    <span className="m-xs m-faint">{d}</span>
                  </span>
                  <span className={`m-pill ${t}`}>{s}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="m-doc p-[1.3em]">
            <div className="flex items-center justify-between">
              <span>
                <span className="m-label block">Statement · R. Patel</span>
                <span className="m-h">October 1 – 31, 2026</span>
              </span>
              <span className="m-pill go">
                <FileSignature className="m-ico-s" /> Owner e-signed
              </span>
            </div>
            <div className="mt-[0.8em]">
              {[
                ['Rent collected (6 doors)', '$11,340.00'],
                ['Management fee', '−$907.20'],
                ['Bill · Bayview Plumbing', '−$240.00'],
                ['Bill · Furnace service', '−$189.00'],
              ].map(([k, v]) => (
                <div key={k} className="m-row">
                  <span className="m-sm m-muted">{k}</span>
                  <span className="m-sm tabnum font-semibold">{v}</span>
                </div>
              ))}
            </div>
            <div className="mt-[0.6em] flex items-center justify-between rounded-[0.7em] bg-[#eaf2ff] px-[0.9em] py-[0.7em]">
              <span className="m-sm font-semibold text-[#0659d6]">Net distribution</span>
              <span className="text-[1.3em] font-bold tabnum tracking-[-0.02em] text-[#0659d6]">$10,003.80</span>
            </div>
          </div>
        </div>
        <div className="m-card mt-[0.9em] flex items-center justify-between gap-[1em]">
          <span>
            <span className="m-sm block font-semibold">Payout sign-off sheet · October</span>
            <span className="m-xs m-faint">4 owners · 3 ready · 1 bill waiting on M. &amp; S. Kowalski</span>
          </span>
          <span className="m-btn">Approve payouts</span>
        </div>
      </AppShell>
    </BrowserFrame>
  )
}

/* ------------------------------------------------------------------------ */
/* Listing + applicants                                                      */
/* ------------------------------------------------------------------------ */
export function ListingScreen({ className = '' }: { className?: string }) {
  return (
    <figure className={`m-0 ${className}`} role="img" aria-label="A free rental listing with pre-screened applicants and booked showings">
      <div className="mock-fit" style={{ ['--em' as string]: '36' }}>
        <div className="mock" aria-hidden="true">
          <div className="m-card !overflow-hidden !rounded-[1.3em] !p-0">
            <div className="relative h-[11em] bg-[linear-gradient(160deg,#cfe3ff_0%,#a9c9f5_45%,#7fa7e3_100%)]">
              <svg viewBox="0 0 360 110" className="absolute bottom-0 left-0 h-[8.5em] w-full" preserveAspectRatio="xMidYMax meet">
                <rect x="0" y="92" width="360" height="18" fill="#6f8f5a" />
                <path d="M90 92V52l55-34 55 34v40z" fill="#f5f1ea" />
                <path d="M82 56l63-42 63 42" fill="none" stroke="#3d4b63" strokeWidth="7" strokeLinejoin="round" />
                <rect x="132" y="66" width="26" height="26" rx="2" fill="#3d4b63" />
                <rect x="104" y="58" width="18" height="16" rx="2" fill="#bcd6f7" />
                <rect x="168" y="58" width="18" height="16" rx="2" fill="#bcd6f7" />
                <path d="M200 92V64l38-24 38 24v28z" fill="#ebe5da" />
                <rect x="226" y="66" width="24" height="16" rx="2" fill="#bcd6f7" />
                <circle cx="300" cy="70" r="20" fill="#5f8a4b" />
                <rect x="297" y="78" width="6" height="14" fill="#5a4a3a" />
                <circle cx="52" cy="74" r="15" fill="#6c9655" />
              </svg>
              <span className="m-pill go absolute left-[1em] top-[1em]">Free on EzyRent</span>
            </div>
            <div className="p-[1.2em]">
              <div className="flex items-start justify-between">
                <span>
                  <span className="text-[1.5em] font-bold tracking-[-0.025em]">
                    $2,150<span className="text-[0.55em] font-medium text-[#6e6e73]">/mo</span>
                  </span>
                  <span className="m-sm m-muted mt-[0.2em] flex items-center gap-[0.3em]">
                    <MapPin className="m-ico-s" /> 233 Victoria Ave · Windsor
                  </span>
                </span>
                <span className="flex gap-[0.6em] text-[0.82em] text-[#6e6e73]">
                  <span className="flex items-center gap-[0.25em]">
                    <BedDouble className="m-ico-s" />2
                  </span>
                  <span className="flex items-center gap-[0.25em]">
                    <Bath className="m-ico-s" />1
                  </span>
                </span>
              </div>
              <div className="mt-[1em] grid grid-cols-3 gap-[0.5em]">
                {[
                  ['18', 'enquiries'],
                  ['6', 'pre-screened'],
                  ['4', 'showings booked'],
                ].map(([n, l]) => (
                  <div key={l} className="rounded-[0.8em] bg-[#f5f5f7] px-[0.7em] py-[0.65em]">
                    <p className="text-[1.35em] font-bold tabnum tracking-[-0.02em]">{n}</p>
                    <p className="m-xs m-faint">{l}</p>
                  </div>
                ))}
              </div>
              <div className="mt-[0.9em] flex items-center justify-between rounded-[0.8em] border border-black/5 px-[0.9em] py-[0.65em]">
                <span className="flex items-center gap-[0.5em]">
                  <Clock className="m-ico text-[#096ef9]" />
                  <span className="m-sm font-semibold">Showing Thu 6:30 p.m.</span>
                </span>
                <span className="m-pill go">“On my way” confirmed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </figure>
  )
}

/* ------------------------------------------------------------------------ */
/* Fire safety inspection on a phone                                         */
/* ------------------------------------------------------------------------ */
export function InspectionPhone({ className = '', variant = 'fire' }: { className?: string; variant?: 'fire' | 'movein' }) {
  const fire = variant === 'fire'
  const tiles = fire
    ? [
        { Icon: AlarmSmoke, bg: '#e9e4db' },
        { Icon: FireExtinguisher, bg: '#f3dcd6' },
        { Icon: DoorOpen, bg: '#dde5ef' },
      ]
    : [
        { Icon: CookingPot, bg: '#e9e4db' },
        { Icon: Sofa, bg: '#dde5ef' },
        { Icon: BedDouble, bg: '#e6e0ef' },
      ]
  const items: [string, boolean][] = fire
    ? [
        ['Smoke alarm · hallway', true],
        ['Smoke alarm · bedroom', true],
        ['CO alarm · near bedrooms', true],
        ['Extinguisher · kitchen', true],
        ['Exits clear', true],
        ['Furnace room door', false],
        ['Emergency lighting', false],
      ]
    : [
        ['Kitchen · 6 photos', true],
        ['Living room · 4 photos', true],
        ['Bedroom · 5 photos', true],
        ['Bathroom · 4 photos', true],
        ['Entry and hallway', false],
      ]
  const done = items.filter(([, d]) => d).length
  return (
    <PhoneFrame
      className={className}
      label={
        fire
          ? 'Fire safety inspection checklist on a phone, with a photo of each alarm, extinguisher and exit and a signed PDF report'
          : 'Move-in inspection on a phone, room by room with photos, sent to the tenant to approve'
      }
    >
      <div className="play px-[1.2em] pt-[0.4em]" data-play>
        <p className={`m-xs font-semibold ${fire ? 'text-[#9a4f00]' : 'text-[#0659d6]'}`}>{fire ? 'FIRE SAFETY INSPECTION' : 'MOVE-IN INSPECTION'}</p>
        <p className="mt-[0.2em] text-[1.3em] font-bold tracking-[-0.02em]">{fire ? '48 Maple Ave' : '112 Elm St · Unit B'}</p>
        <div className="mt-[0.7em] flex items-center gap-[0.6em]">
          <div className="m-bar flex-1">
            <span data-fill style={{ width: `${Math.round((done / items.length) * 100)}%`, ...i(0) }} />
          </div>
          <span className="m-xs font-semibold">
            {done} of {items.length}
          </span>
        </div>
        <div className="mt-[1em] grid grid-cols-3 gap-[0.4em]">
          {tiles.map(({ Icon, bg }, idx) => (
            <div key={bg} className="relative flex aspect-square items-center justify-center overflow-hidden rounded-[0.7em]" data-step style={{ background: bg, ...i(0.5 + idx * 0.3) }}>
              <Icon className="h-[2.2em] w-[2.2em] text-[#1d1d1f]/55" strokeWidth={1.6} />
              <span className="absolute bottom-[0.3em] right-[0.3em] m-check !h-[1.1em] !w-[1.1em]">
                <Check strokeWidth={3.5} />
              </span>
            </div>
          ))}
        </div>
        <div className="mt-[0.9em] space-y-[0.4em]">
          {items.map(([t, ok], idx) => (
            <div key={t} className="flex items-center gap-[0.6em] rounded-[0.8em] bg-[#f5f5f7] px-[0.8em] py-[0.55em]" data-step style={i(1.4 + idx * 0.3)}>
              {ok ? <Tick /> : <span className="inline-flex h-[1.35em] w-[1.35em] rounded-full border-[0.12em] border-[#c7c7cc]" />}
              <span className="m-sm flex-1 font-medium">{t}</span>
              {ok && <Camera className="m-ico-s text-[#6e6e73]" />}
            </div>
          ))}
        </div>
        <div className="mt-[0.9em] flex items-center justify-between rounded-[0.8em] border border-black/5 px-[0.8em] py-[0.55em]">
          <span>
            <span className="m-xs m-faint block">{fire ? 'Inspector' : 'Tenant approval'}</span>
            <span className="m-sm font-semibold">{fire ? 'Dana Morrison' : 'Jordan Ellis · pending'}</span>
          </span>
          {fire ? <span className="font-[cursive] text-[1.1em] text-[#050c3b]">D. Morrison</span> : <Clock className="m-ico-s text-[#6e6e73]" />}
        </div>
        <div className="mt-[0.8em] flex justify-center">
          <span className="m-btn w-full">{fire ? 'Generate signed PDF' : 'Send to tenant for approval'}</span>
        </div>
      </div>
    </PhoneFrame>
  )
}

/* ------------------------------------------------------------------------ */
/* Tenant portal on a phone                                                  */
/* ------------------------------------------------------------------------ */
export function TenantPortalPhone({ className = '' }: { className?: string }) {
  return (
    <PhoneFrame className={className} label="Tenant portal showing the next rent due, how to pay by Interac e-Transfer, receipts and an on-time streak">
      <div className="px-[1.2em] pt-[0.4em]">
        <p className="m-xs m-faint">Hi Maya</p>
        <p className="text-[1.3em] font-bold tracking-[-0.02em]">48 Maple Ave · Unit 2</p>
        <div className="mt-[0.9em] rounded-[1.1em] bg-[#050c3b] p-[1.1em] text-white">
          <p className="m-xs text-white/60">Next rent · due November 1</p>
          <p className="mt-[0.2em] text-[2.1em] font-bold tabnum tracking-[-0.035em]">$1,950.00</p>
          <div className="mt-[0.7em] rounded-[0.8em] bg-white/10 px-[0.8em] py-[0.6em]">
            <p className="m-xs text-white/60">Pay by Interac e-Transfer to</p>
            <p className="m-sm font-semibold">rent@morrisonrentals.ca</p>
          </div>
        </div>
        <div className="mt-[0.8em] flex items-center gap-[0.6em] rounded-[1em] bg-[#ecf8e1] px-[0.9em] py-[0.7em]">
          <Star className="m-ico text-[#1f7a16]" />
          <span className="m-sm font-semibold text-[#1f7a16] wrap-ok">14 on-time months reported to Equifax</span>
        </div>
        <p className="m-h mt-[1em]">Receipts</p>
        <div className="mt-[0.3em]">
          {['October', 'September', 'August', 'July'].map((m) => (
            <div key={m} className="m-row">
              <span className="flex items-center gap-[0.5em]">
                <Receipt className="m-ico-s text-[#6e6e73]" />
                <span className="m-sm">{m} rent</span>
              </span>
              <span className="m-sm tabnum font-semibold">$1,950.00</span>
            </div>
          ))}
        </div>
        <div className="mt-[0.8em] flex items-center gap-[0.7em] rounded-[1em] border border-black/5 bg-white px-[0.9em] py-[0.7em]">
          <Award className="m-ico text-[#0659d6]" />
          <span className="flex-1">
            <span className="m-sm block font-semibold">Rental Report Card</span>
            <span className="m-xs m-faint">Yours to share with your next landlord</span>
          </span>
          <ChevronRight className="m-ico-s text-[#6e6e73]" />
        </div>
        <div className="mt-[0.8em] grid grid-cols-2 gap-[0.5em]">
          <span className="m-btn ghost">
            <Wrench className="m-ico-s" /> Request repair
          </span>
          <span className="m-btn ghost">
            <MessageSquare className="m-ico-s" /> Message
          </span>
        </div>
      </div>
    </PhoneFrame>
  )
}

/* ------------------------------------------------------------------------ */
/* CaseBuilder (paralegals)                                                  */
/* ------------------------------------------------------------------------ */
export function CaseBuilderScreen({ className = '' }: { className?: string }) {
  return (
    <figure className={`m-0 ${className}`} role="img" aria-label="CaseBuilder ranking comparable Ontario LTB decisions for a described matter, with outcomes">
      <div className="mock-fit" style={{ ['--em' as string]: '38' }}>
        <div className="mock" aria-hidden="true">
          <div className="m-card !rounded-[1.3em] !p-[1.4em]">
            <div className="flex items-center gap-[0.6em] rounded-[0.8em] bg-[#f5f5f7] px-[0.9em] py-[0.7em]">
              <Search className="m-ico text-[#6e6e73]" />
              <span className="m-sm wrap-ok text-[#424245]">N5 served for kitchen damage; tenant did not repair within 7 days…</span>
            </div>
            <div className="mt-[1em] flex items-end justify-between">
              <span>
                <span className="m-label block">Comparable decisions</span>
                <span className="text-[1.6em] font-bold tracking-[-0.03em]">Tenancy ended in 8 of 10</span>
              </span>
              <span className="m-pill brand">
                <Scale className="m-ico-s" /> Ranked by similarity
              </span>
            </div>
            <div className="mt-[0.8em]">
              {[
                ['Damage · N5 · tenant did not remedy', 'Terminated', 'go', '96%'],
                ['Damage · N5 · partial repair', 'Terminated', 'go', '91%'],
                ['Damage · N5 · notice lacked detail', 'Dismissed', 'bad', '88%'],
                ['Damage · N5 · repaired in time', 'Notice void', 'gray', '84%'],
              ].map(([d, o, t, s]) => (
                <div key={d} className="m-row">
                  <span className="flex items-center gap-[0.6em]">
                    <span className="m-xs tabnum w-[2.6em] font-semibold text-[#6e6e73]">{s}</span>
                    <span className="m-sm font-medium">{d}</span>
                  </span>
                  <span className={`m-pill ${t}`}>{o}</span>
                </div>
              ))}
            </div>
            <div className="mt-[0.9em] rounded-[0.8em] bg-[#050c3b] p-[0.9em] text-white">
              <p className="m-xs flex items-center gap-[0.4em] font-semibold text-[#4c9bff]">
                <Sparkles className="m-ico-s" /> Deciding factor
              </p>
              <p className="m-sm mt-[0.3em] wrap-ok leading-snug text-white/85">
                Notices that described the damage specifically, with photos, were upheld.
              </p>
            </div>
          </div>
        </div>
      </div>
    </figure>
  )
}

/* ------------------------------------------------------------------------ */
/* Lease e-sign                                                              */
/* ------------------------------------------------------------------------ */
export function LeaseScreen({ className = '' }: { className?: string }) {
  return (
    <figure className={`m-0 ${className}`} role="img" aria-label="Ontario Standard Lease ready for e-signature by landlord and tenant, with an AI check before sending">
      <div className="mock-fit" style={{ ['--em' as string]: '36' }}>
        <div className="mock play" data-play aria-hidden="true">
          <div className="m-doc !rounded-[1.1em] p-[1.4em]">
            <div className="flex items-center justify-between">
              <span className="m-pill brand">Ontario Standard Lease</span>
              <SampleTag />
            </div>
            <p className="mt-[0.8em] text-[1.25em] font-bold tracking-[-0.02em]">Residential Tenancy Agreement</p>
            <p className="m-sm m-muted">112 Elm St, Unit B · Windsor · from November 1, 2026</p>
            <div className="mt-[0.9em] space-y-[0.45em]">
              {[
                ['Rent', '$1,875.00 monthly, due the 1st'],
                ['Deposit', 'Last month’s rent · $1,875.00'],
                ['Utilities', 'Tenant: hydro · Landlord: water, gas'],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between rounded-[0.6em] bg-[#f5f5f7] px-[0.85em] py-[0.55em]">
                  <span className="m-sm m-muted">{k}</span>
                  <span className="m-sm font-semibold">{v}</span>
                </div>
              ))}
            </div>
            <div className="mt-[0.9em] flex items-center gap-[0.6em] rounded-[0.7em] bg-[#eaf2ff] px-[0.9em] py-[0.65em]" data-step style={i(0)}>
              <Sparkles className="m-ico text-[#096ef9]" />
              <span className="m-sm font-semibold text-[#0659d6]">AI check passed · no missing fields</span>
            </div>
            <div className="mt-[0.9em] grid grid-cols-2 gap-[0.6em]">
              {[
                ['Landlord', 'Dana Morrison', 1],
                ['Tenant', 'Jordan Ellis', 2],
              ].map(([role, name, n]) => (
                <div key={role as string} className="rounded-[0.8em] border border-dashed border-black/15 px-[0.9em] py-[0.7em]">
                  <p className="m-label">{role}</p>
                  <p className="mt-[0.15em] font-[cursive] text-[1.15em] text-[#050c3b]" data-type style={i(n as number)}>
                    {name}
                  </p>
                  <p className="m-xs mt-[0.2em] flex items-center gap-[0.3em] text-[#1f7a16]" data-step style={i((n as number) + 0.6)}>
                    <CheckCircle2 className="m-ico-s" /> Signed
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </figure>
  )
}

/* ------------------------------------------------------------------------ */
/* Small "home" app icon tile used in the journey                             */
/* ------------------------------------------------------------------------ */
export function HomeGlyph({ className = '' }: { className?: string }) {
  return <Home className={className} strokeWidth={1.6} aria-hidden />
}

/* ------------------------------------------------------------------------ */
/* Compact e-Transfer → matched → paid card (journey + bento)               */
/* ------------------------------------------------------------------------ */
export function CollectCard({ className = '' }: { className?: string }) {
  return (
    <figure className={`m-0 ${className}`} role="img" aria-label="An Interac e-Transfer arrives, is matched to the tenant and October is marked paid with a receipt sent">
      <div className="mock-fit" style={{ ['--em' as string]: '30' }}>
        <div className="mock play" data-play aria-hidden="true">
          <div className="space-y-[0.6em]">
            <div className="m-card !rounded-[1.1em]" data-step style={i(0)}>
              <p className="m-xs m-faint flex items-center gap-[0.4em]">
                <Mail className="m-ico-s" /> Interac notification
              </p>
              <p className="m-sm mt-[0.3em] font-semibold">MAYA THOMPSON sent you $1,950.00</p>
            </div>
            <div className="m-card !rounded-[1.1em] !bg-[#eaf2ff] !shadow-none" data-step style={i(1)}>
              <p className="m-sm flex items-center gap-[0.45em] font-semibold text-[#0659d6]">
                <Sparkles className="m-ico-s" /> Matched to Unit 2 · October rent
              </p>
            </div>
            <div className="m-card !rounded-[1.1em]" data-step style={i(2)}>
              <div className="flex items-center justify-between">
                <span>
                  <span className="m-sm block font-semibold">October 2026</span>
                  <span className="m-xs m-faint">Receipt emailed to Maya</span>
                </span>
                <span className="m-pill go">
                  <Check className="m-ico-s" strokeWidth={3} /> Paid
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </figure>
  )
}

/** The 7 a.m. rent-unpaid alert: who owes what, with the N4 one tap away. */
export function LateRentAlert({ className = '', dark = false }: { className?: string; dark?: boolean }) {
  return (
    <figure className={`m-0 ${className}`} role="img" aria-label="A 7 a.m. alert shows Ravi Singh owing $1,610 for October with a Serve N4 button, and everyone else paid on time">
      <div className="mock-fit" style={{ ['--em' as string]: '30' }}>
        <div className={`mock play ${dark ? 'mock-dark' : ''}`} data-play aria-hidden="true">
          <div className="m-card !rounded-[1.2em] !p-[1.3em]">
            <p className="m-label flex items-center gap-[0.4em]">
              <BellRing className="m-ico-s text-[#ff9f0a]" /> Rent-unpaid alert · 7:00 a.m.
            </p>
            {[['Ravi Singh', '7 Wyandotte St · Unit 3 · October rent', '$1,610']].map(([n, a, v], idx) => (
              <div key={n} className="m-row" data-step style={i(idx)}>
                <span>
                  <span className="m-sm block font-semibold">{n}</span>
                  <span className="m-xs m-faint">{a}</span>
                </span>
                <span className="flex items-center gap-[0.6em]">
                  <span className="m-sm tabnum font-semibold">{v}</span>
                  <span className="m-btn !py-[0.4em] !text-[0.72em]">Serve N4</span>
                </span>
              </div>
            ))}
            <p className="m-xs m-faint mt-[0.9em] flex items-center gap-[0.4em]" data-step style={i(1)}>
              <Check className="m-ico-s text-[#1f9d3a]" strokeWidth={3} /> Everyone else paid on time, receipts sent
            </p>
          </div>
        </div>
      </div>
    </figure>
  )
}
