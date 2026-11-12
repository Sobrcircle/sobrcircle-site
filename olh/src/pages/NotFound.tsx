import { site, url } from '../site'

export function NotFound() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="wrap-text text-center">
        <p className="eyebrow">Page not found</p>
        <h1 className="mt-3 text-display-lg">This page isn’t in the preview.</h1>
        <p className="mx-auto mt-5 max-w-[34rem] text-lead text-ink-3">
          The design preview covers the home page, pricing, Landlord Shield, legal help and rentals. Everything else is on the live site.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
          <a href={url()} className="btn-primary">
            Preview home
          </a>
          <a href={site.live.home} className="link-more">
            ontariolandlordhelp.ca
          </a>
        </div>
      </div>
    </section>
  )
}
