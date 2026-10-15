import type { CSSProperties, ReactNode } from 'react'
import {
  LayoutGrid,
  Building2,
  Users,
  Wallet,
  ShieldCheck,
  FileText,
  Wrench,
  BarChart3,
  Sparkles,
  Lock,
  Signal,
  Wifi,
  BatteryFull,
} from 'lucide-react'
import { Mark } from '../Logo'

/** A container that scales its .mock child like a screenshot. `em` = design width in em. */
export function Fit({ em = 64, children, className = '', style }: { em?: number; children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div className={`mock-fit ${className}`} style={{ ['--em' as string]: String(em), ...style }}>
      {children}
    </div>
  )
}

/** macOS-style browser window. Designed at 64em wide. */
export function BrowserFrame({
  children,
  address = 'app.landlordezy.ca',
  className = '',
  label,
}: {
  children: ReactNode
  address?: string
  className?: string
  label: string
}) {
  return (
    <figure className={`m-0 ${className}`} role="img" aria-label={label}>
      <Fit em={64}>
        <div className="mock browser" aria-hidden="true">
          <div className="browser-bar !h-[2.4em] !gap-[0.45em] !px-[0.95em]">
            <span className="browser-dot !h-[0.78em] !w-[0.78em] bg-[#ff5f57]" />
            <span className="browser-dot !h-[0.78em] !w-[0.78em] bg-[#febc2e]" />
            <span className="browser-dot !h-[0.78em] !w-[0.78em] bg-[#28c840]" />
            <span className="mx-auto flex items-center gap-[0.4em] rounded-[0.5em] bg-white px-[0.9em] py-[0.25em] text-[0.74em] text-[#6e6e73] shadow-[0_0_0_1px_rgba(0,0,0,0.05)]">
              <Lock className="h-[0.9em] w-[0.9em]" strokeWidth={2.4} />
              {address}
            </span>
            <span className="w-[2.6em]" />
          </div>
          {children}
        </div>
      </Fit>
    </figure>
  )
}

const sideItems = [
  { label: 'Dashboard', Icon: LayoutGrid },
  { label: 'Properties', Icon: Building2 },
  { label: 'Tenants', Icon: Users },
  { label: 'Rent', Icon: Wallet },
  { label: 'Screening', Icon: ShieldCheck },
  { label: 'Notices', Icon: FileText },
  { label: 'Maintenance', Icon: Wrench },
  { label: 'Reports', Icon: BarChart3 },
]

/** The LandlordEzy app chrome inside a BrowserFrame. */
export function AppShell({ active, children }: { active: string; children: ReactNode }) {
  return (
    <div className="flex h-[39em] bg-[#fbfbfd]">
      <aside className="flex w-[12.5em] shrink-0 flex-col border-r border-black/5 bg-white px-[0.8em] py-[1em]">
        <div className="mb-[1.1em] flex items-center gap-[0.5em] px-[0.4em]">
          <Mark className="h-[1.8em] w-[1.8em]" />
          <span className="text-[1.02em] font-bold tracking-[-0.03em] text-[#050c3b]">
            Landlord<span className="text-[#096ef9]">Ezy</span>
          </span>
        </div>
        <div className="flex flex-col gap-[0.15em]">
          {sideItems.map(({ label, Icon }) => (
            <span key={label} className={`m-side-item ${label === active ? 'on' : ''}`}>
              <Icon className="m-ico" strokeWidth={1.8} />
              {label}
            </span>
          ))}
        </div>
        <div className="mt-auto rounded-[0.8em] bg-[#050c3b] p-[0.9em] text-white">
          <div className="flex items-center gap-[0.4em] text-[0.8em] font-semibold">
            <Sparkles className="m-ico-s text-[#4c9bff]" /> Ask Ezy
          </div>
          <p className="mt-[0.3em] text-[0.68em] leading-snug text-white/60">Draft a notice in plain English.</p>
        </div>
      </aside>
      <div className="min-w-0 flex-1 overflow-hidden px-[1.6em] py-[1.4em]">{children}</div>
    </div>
  )
}

/** iPhone-style frame. Designed at 26em wide. */
export function PhoneFrame({
  children,
  className = '',
  label,
  dark = false,
}: {
  children: ReactNode
  className?: string
  label: string
  dark?: boolean
}) {
  return (
    <figure className={`m-0 ${className}`} role="img" aria-label={label}>
      <Fit em={26}>
        <div className="mock phone !rounded-[3.3em] !p-[0.75em]" aria-hidden="true">
          <div className={`phone-screen !rounded-[2.6em] ${dark ? '!bg-[#0b1026]' : ''}`}>
            <span className="phone-island !top-[0.7em] !h-[1.85em] !rounded-[1.2em]" />
            <StatusBar dark={dark} />
            <div className="h-[49em] overflow-hidden">{children}</div>
          </div>
        </div>
      </Fit>
    </figure>
  )
}

function StatusBar({ dark }: { dark: boolean }) {
  return (
    <div className={`flex h-[3.3em] items-end justify-between px-[2em] pb-[0.5em] text-[0.95em] font-semibold ${dark ? 'text-white' : 'text-[#1d1d1f]'}`}>
      <span className="tabnum">9:41</span>
      <span className="flex items-center gap-[0.3em]">
        <Signal className="m-ico-s" strokeWidth={2.6} />
        <Wifi className="m-ico-s" strokeWidth={2.6} />
        <BatteryFull className="m-ico" strokeWidth={2} />
      </span>
    </div>
  )
}

/** Small "Sample" ribbon so illustrative documents never read as real records. */
export function SampleTag({ className = '' }: { className?: string }) {
  return <span className={`m-pill gray ${className}`}>Sample</span>
}
