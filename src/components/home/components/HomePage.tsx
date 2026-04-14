import { useState } from 'react'
import { sections } from '../data/sections'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useLenis } from '../hooks/useLenis'
import { useSplitReveal } from '../hooks/useSplitReveal'
import HeroSection from './HeroSection'
import FeatureSection from './FeatureSection'
import TwentyFourSection from './TwentyFourSection'
import SiteNav from './SiteNav'
import SiteFooter from './SiteFooter'
import FilmGrain from './FilmGrain'
import CursorGlow from './CursorGlow'
import Preloader from './Preloader'
import ScrollProgress from './ScrollProgress'
import SoundToggle from './SoundToggle'
import RouteCurtain from './RouteCurtain'
import '../styles/home.css'

export default function HomePage() {
  const [booted, setBooted] = useState(false)

  useLenis()
  useScrollAnimation()
  useSplitReveal(booted)

  let featureIndex = 0

  return (
    <div className="home-page">
      <Preloader onDone={() => setBooted(true)} />

      <FilmGrain />
      <CursorGlow />
      <ScrollProgress />
      <RouteCurtain />

      <SiteNav />
      <SoundToggle />
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
