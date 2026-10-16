import { ArrowUpRight } from 'lucide-react'
import { site } from '../site'

/**
 * A slim link to the rentals live on EzyRent right now: the old site's listing
 * strip, minus the clutter. It links to the real listings instead of copying
 * them, so it can never show a unit that's already rented. On landlordezy.ca
 * this can become a live strip fed by EzyRent's own data.
 */
export function LiveRentals({ className = '' }: { className?: string }) {
  return (
    <a href={site.app.ezyrent} rel="noopener" className={`live-rentals ${className}`} data-track="ezyrent:browse">
      <span className="live-dot" aria-hidden="true" />
      <span>
        <strong className="font-semibold text-ink">Live on EzyRent:</strong> see the rentals Ontario landlords are listing right now
      </span>
      <ArrowUpRight className="h-4 w-4 shrink-0 text-brand" aria-hidden />
    </a>
  )
}
