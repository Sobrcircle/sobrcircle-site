import { useCallback, useState } from 'react'
import { useLenis } from '../components/home/hooks/useLenis'
import { useSplitReveal } from '../components/home/hooks/useSplitReveal'
import { useReveal } from './hooks/useReveal'
import Preloader from './components/Preloader'
import Grain from './components/Grain'
import ScrollProgress from './components/ScrollProgress'
import Hero from './components/Hero'
import Verse from './components/Verse'
import Story from './components/Story'
import Film from './components/Film'
import Gallery from './components/Gallery'
import Footer from './components/Footer'

export default function App() {
  const [booted, setBooted] = useState(false)
  const onDone = useCallback(() => setBooted(true), [])

  // Shared with the main site: inertial wheel scroll on desktop, native touch
  // on mobile, ScrollTrigger kept in sync either way.
  useLenis()
  useReveal(booted)
  // Character-level blur-to-focus on [data-split] headings — the same reveal
  // the main site uses. Generic and class-agnostic, so it's safe to share.
  useSplitReveal(booted)

  return (
    <div className="ld-root">
      <Preloader onDone={onDone} />
      <Grain />
      <ScrollProgress />
      <Hero />
      <main>
        <Verse />
        <Story />
        <Film />
        <Gallery />
      </main>
      <Footer />
    </div>
  )
}
