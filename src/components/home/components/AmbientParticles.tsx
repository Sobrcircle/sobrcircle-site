import { useEffect, useRef } from 'react'

type Particle = {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  a: number
  ta: number
}

export default function AmbientParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0
    let h = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let particles: Particle[] = []
    let raf = 0

    const resize = () => {
      w = window.innerWidth
      h = window.innerHeight
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(48, Math.round((w * h) / 28000))
      particles = Array.from({ length: count }, () => spawn())
    }

    const spawn = (): Particle => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.08,
      vy: -0.05 - Math.random() * 0.12,
      r: 0.6 + Math.random() * 1.4,
      a: 0,
      ta: 0.12 + Math.random() * 0.28,
    })

    const tick = () => {
      ctx.clearRect(0, 0, w, h)
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        // gentle horizontal drift
        p.vx += (Math.random() - 0.5) * 0.003
        p.vx = Math.max(-0.2, Math.min(0.2, p.vx))
        p.a += (p.ta - p.a) * 0.02

        if (p.y < -10 || p.x < -10 || p.x > w + 10) {
          Object.assign(p, spawn(), { y: h + Math.random() * 20 })
        }

        ctx.beginPath()
        ctx.fillStyle = `rgba(214, 190, 156, ${p.a})`
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }

    resize()
    tick()
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return <canvas ref={canvasRef} className="home-particles" aria-hidden="true" />
}
