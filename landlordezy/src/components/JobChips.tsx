import { url } from '../site'
import { jobs } from '../content/jobs'

/**
 * "What do you need to do today?": the six jobs as large tap targets, three
 * across on a phone and six across on a laptop. The chip for the job a visitor
 * last looked at shows a "Continue" tag (set by the client script, no layout shift).
 */
export function JobChips({ heading = 'What do you need to do today?', className = '' }: { heading?: string; className?: string }) {
  return (
    <nav aria-labelledby="jobs-heading" className={className}>
      <p id="jobs-heading" className="text-[0.9375rem] font-semibold text-ink">
        {heading}
      </p>
      <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
        {jobs.map((j) => (
          <li key={j.key}>
            <a href={url(j.path)} className="job-chip" data-job-chip={j.key} data-track={`job:${j.key}`}>
              <j.icon className="h-5 w-5 shrink-0 text-brand" strokeWidth={1.8} aria-hidden />
              <span>{j.label}</span>
              {/* Hidden unless this is the job the visitor last looked at; then its word joins the chip's name. */}
              <span className="job-continue">Continue</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
