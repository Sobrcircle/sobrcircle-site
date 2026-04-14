import { sections } from '../data/sections'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import HeroSection from './HeroSection'
import FeatureSection from './FeatureSection'
import TwentyFourSection from './TwentyFourSection'
import SiteNav from './SiteNav'
import SiteFooter from './SiteFooter'
import '../styles/home.css'

export default function HomePage() {
  useScrollAnimation()

  let featureIndex = 0

  return (
    <div className="home-page">
      <SiteNav />
      <div className="home-vignette" aria-hidden="true" />

      <main className="home-main">
        {sections.map((section) => {
          switch (section.type) {
            case 'hero':
              return <HeroSection key={section.id} section={section} />
            case 'twentyfour':
              return <TwentyFourSection key={section.id} section={section} />
            default: {
              const reverse = featureIndex % 2 === 1
              featureIndex++
              return <FeatureSection key={section.id} section={section} reverse={reverse} />
            }
          }
        })}
      </main>

      <SiteFooter />
    </div>
  )
}
