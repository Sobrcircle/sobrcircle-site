import { useEffect, useRef, useState, useCallback } from 'react'

const STORAGE_KEY = 'sobr.sound.enabled'

/**
 * Ambient low drone + UI tick generator using Web Audio API.
 * - Muted by default (requires explicit opt-in; browsers block autoplay audio anyway)
 * - Persists preference across sessions
 * - Exposes a `tick()` function for UI interactions
 */
export function useAmbientSound() {
  const [enabled, setEnabled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false
    return localStorage.getItem(STORAGE_KEY) === '1'
  })
  const ctxRef = useRef<AudioContext | null>(null)
  const droneGainRef = useRef<GainNode | null>(null)
  const nodesRef = useRef<{ osc: OscillatorNode[]; lfo: OscillatorNode | null }>({ osc: [], lfo: null })

  const ensureContext = useCallback(() => {
    if (ctxRef.current) return ctxRef.current
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!AC) return null
    const ctx = new AC()
    ctxRef.current = ctx
    return ctx
  }, [])

  const startDrone = useCallback(() => {
    const ctx = ensureContext()
    if (!ctx) return
    if (nodesRef.current.osc.length > 0) return

    const master = ctx.createGain()
    master.gain.value = 0
    master.connect(ctx.destination)
    droneGainRef.current = master

    // Warm pad — A2 (110 Hz) fundamental + E3 fifth + A3 octave so laptop
    // speakers and phone speakers can actually reproduce it.
    const voices: Array<{ f: number; g: number; type: OscillatorType }> = [
      { f: 110,   g: 0.30, type: 'sine'     },
      { f: 164.8, g: 0.22, type: 'sine'     },
      { f: 220,   g: 0.14, type: 'triangle' },
    ]
    const oscs = voices.map(({ f, g, type }) => {
      const o = ctx.createOscillator()
      o.type = type
      o.frequency.value = f
      const gain = ctx.createGain()
      gain.gain.value = g
      o.connect(gain).connect(master)
      o.start()
      return o
    })

    // Slow LFO for gentle amplitude modulation
    const lfo = ctx.createOscillator()
    lfo.type = 'sine'
    lfo.frequency.value = 0.08
    const lfoGain = ctx.createGain()
    lfoGain.gain.value = 0.05
    lfo.connect(lfoGain).connect(master.gain)
    lfo.start()

    // Fade in
    master.gain.linearRampToValueAtTime(0.14, ctx.currentTime + 2.5)
    nodesRef.current = { osc: oscs, lfo }
  }, [ensureContext])

  const stopDrone = useCallback(() => {
    const ctx = ctxRef.current
    const master = droneGainRef.current
    if (!ctx || !master) return
    const now = ctx.currentTime
    master.gain.cancelScheduledValues(now)
    master.gain.linearRampToValueAtTime(0, now + 1.2)
    setTimeout(() => {
      nodesRef.current.osc.forEach((o) => o.stop())
      nodesRef.current.lfo?.stop()
      nodesRef.current = { osc: [], lfo: null }
      droneGainRef.current = null
    }, 1400)
  }, [])

  const tick = useCallback(() => {
    if (!enabled) return
    const ctx = ensureContext()
    if (!ctx) return
    const now = ctx.currentTime
    const o = ctx.createOscillator()
    const g = ctx.createGain()
    o.type = 'sine'
    o.frequency.setValueAtTime(880, now)
    o.frequency.exponentialRampToValueAtTime(440, now + 0.08)
    g.gain.setValueAtTime(0.0001, now)
    g.gain.exponentialRampToValueAtTime(0.09, now + 0.01)
    g.gain.exponentialRampToValueAtTime(0.0001, now + 0.18)
    o.connect(g).connect(ctx.destination)
    o.start(now)
    o.stop(now + 0.2)
  }, [enabled, ensureContext])

  const toggle = useCallback(() => {
    setEnabled((prev) => {
      const next = !prev
      localStorage.setItem(STORAGE_KEY, next ? '1' : '0')
      return next
    })
  }, [])

  useEffect(() => {
    if (enabled) {
      // Resume context if suspended by browser autoplay policy
      const ctx = ensureContext()
      if (ctx && ctx.state === 'suspended') ctx.resume()
      startDrone()
    } else {
      stopDrone()
    }
  }, [enabled, ensureContext, startDrone, stopDrone])

  return { enabled, toggle, tick }
}
