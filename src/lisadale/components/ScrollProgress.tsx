import { useEffect, useRef } from 'react'

/** Hairline gold progress bar. Same approach as the main site's — rAF-throttled
 *  so it never fights Lenis for the main thread. */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = ref.current
    if (!bar) return
    let raf = 0

    const update = () => {
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`
      raf = 0
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="ld-progress" aria-hidden="true">
      <div ref={ref} className="ld-progress-bar" />
    </div>
  )
}
