export default function SiteNav() {
  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="home-nav" aria-label="Main navigation">
      <a href="#recovery" className="home-nav-brand" onClick={scrollTo('recovery')}>
        <img src="/assets/circle.png" alt="" className="home-nav-logo" />
        <span className="home-nav-wordmark">
          <span className="home-nav-wordmark-bold">Sobr</span>Circle
        </span>
      </a>
      <div className="home-nav-links">
        <a href="#circles" onClick={scrollTo('circles')}>Features</a>
        <a href="#story" onClick={scrollTo('story')}>Our Story</a>
        <a href="/twentyfour/">Twenty Four</a>
      </div>
    </nav>
  )
}
