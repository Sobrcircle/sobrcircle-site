export default function SiteNav() {
  const scrollTo = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="home-nav" aria-label="Main navigation">
      <div className="home-nav-group home-nav-group--left">
        <a href="#map" onClick={scrollTo('map')}>Meetings</a>
        <a href="#circles" onClick={scrollTo('circles')}>Features</a>
        <a href="#follow" onClick={scrollTo('follow')}>Follow</a>
      </div>
      <a href="#recovery" className="home-nav-brand" onClick={scrollTo('recovery')} aria-label="SobrCircle">
        <img src="/assets/circle.png" alt="" className="home-nav-logo" />
      </a>
      <div className="home-nav-group home-nav-group--right">
        <a href="#story" onClick={scrollTo('story')}>Our Story</a>
        <a href="#twentyfour" onClick={scrollTo('twentyfour')}>Twenty Four</a>
      </div>
    </nav>
  )
}
