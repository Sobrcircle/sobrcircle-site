/**
 * Progressive enhancement for the prerendered pages. Everything here is
 * optional: with JavaScript off, every page is complete, every link works and
 * every animated mock-up shows its finished state.
 */
const root = document.documentElement
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

function inView(el: Element, margin = 0.92): boolean {
  const r = el.getBoundingClientRect()
  return r.top < window.innerHeight * margin && r.bottom > 0
}

/* ---- reveal on scroll + mock-up sequences ------------------------------- */
function setupMotion() {
  const reveals = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
  const plays = Array.from(document.querySelectorAll<HTMLElement>('[data-play]'))

  // Anything already on screen keeps its finished state (no flash, no replay).
  reveals.forEach((el) => inView(el) && el.classList.add('is-in'))
  plays.forEach((el) => inView(el, 1) && el.classList.add('is-static'))

  root.classList.add('js')
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('is-in'))
    plays.forEach((el) => el.classList.add('is-static'))
    return
  }
  root.classList.add('reveal-ready')

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue
        const el = e.target as HTMLElement
        if (el.hasAttribute('data-play')) el.classList.add('is-playing')
        else el.classList.add('is-in')
        io.unobserve(el)
      }
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
  )
  reveals.filter((el) => !el.classList.contains('is-in')).forEach((el) => io.observe(el))
  plays.filter((el) => !el.classList.contains('is-static')).forEach((el) => io.observe(el))
}

/* ---- count-up numbers ---------------------------------------------------- */
function setupCounters() {
  const els = Array.from(document.querySelectorAll<HTMLElement>('[data-count]'))
  if (reduceMotion || !els.length) return
  const fmt = new Intl.NumberFormat('en-CA')
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue
      const el = e.target as HTMLElement
      io.unobserve(el)
      const target = Number(el.dataset.count)
      const original = el.textContent ?? ''
      const prefix = original.match(/^[^\d]*/)?.[0] ?? ''
      const suffix = original.match(/[^\d,.]*$/)?.[0] ?? ''
      const start = performance.now()
      const dur = 1400
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / dur)
        const eased = 1 - Math.pow(1 - t, 3)
        el.textContent = prefix + fmt.format(Math.round(target * eased)) + suffix
        if (t < 1) requestAnimationFrame(tick)
        else el.textContent = original
      }
      requestAnimationFrame(tick)
    }
  }, { threshold: 0.6 })
  els.filter((el) => !inView(el)).forEach((el) => io.observe(el))
}

/* ---- desktop flyout menus ------------------------------------------------ */
function setupFlyouts() {
  const items = Array.from(document.querySelectorAll<HTMLElement>('[data-flyout-item]'))
  const scrim = document.querySelector<HTMLElement>('[data-scrim]')
  if (!items.length) return
  let openTimer = 0
  let closeTimer = 0
  let current: HTMLElement | null = null

  const setOpen = (item: HTMLElement | null) => {
    items.forEach((it) => {
      const trigger = it.querySelector<HTMLElement>('[data-flyout]')
      const panel = it.querySelector<HTMLElement>('[data-flyout-panel]')
      const on = it === item
      trigger?.setAttribute('aria-expanded', String(on))
      panel?.setAttribute('data-open', String(on))
    })
    scrim?.setAttribute('data-open', String(!!item))
    current = item
  }

  const isDesktop = () => window.matchMedia('(min-width: 1068px) and (hover: hover)').matches

  items.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      if (!isDesktop()) return
      window.clearTimeout(closeTimer)
      window.clearTimeout(openTimer)
      openTimer = window.setTimeout(() => setOpen(item), current ? 0 : 140)
    })
    item.addEventListener('mouseleave', () => {
      window.clearTimeout(openTimer)
      closeTimer = window.setTimeout(() => setOpen(null), 220)
    })
    item.addEventListener('focusin', () => setOpen(item))
    item.addEventListener('focusout', (e) => {
      if (!item.contains(e.relatedTarget as Node)) setOpen(null)
    })
  })
  scrim?.addEventListener('mouseenter', () => setOpen(null))
  scrim?.addEventListener('click', () => setOpen(null))
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && current) {
      const trigger = current.querySelector<HTMLElement>('[data-flyout]')
      setOpen(null)
      trigger?.focus()
    }
  })
  window.addEventListener('scroll', () => current && setOpen(null), { passive: true })
}

/* ---- mobile sheet -------------------------------------------------------- */
function setupMobileMenu() {
  const sheet = document.getElementById('menu')
  const openers = document.querySelectorAll<HTMLAnchorElement>('[data-menu-open]')
  const closer = sheet?.querySelector<HTMLAnchorElement>('[data-menu-close]')
  if (!sheet) return
  const open = () => {
    sheet.setAttribute('data-open', 'true')
    openers.forEach((o) => o.setAttribute('aria-expanded', 'true'))
    document.body.style.overflow = 'hidden'
    window.setTimeout(() => closer?.focus(), 50)
  }
  const close = () => {
    sheet.setAttribute('data-open', 'false')
    openers.forEach((o) => o.setAttribute('aria-expanded', 'false'))
    document.body.style.overflow = ''
  }
  openers.forEach((o) =>
    o.addEventListener('click', (e) => {
      e.preventDefault()
      open()
    }),
  )
  closer?.addEventListener('click', (e) => {
    e.preventDefault()
    close()
    openers[0]?.focus()
  })
  sheet.querySelectorAll('a:not([data-menu-close])').forEach((a) => a.addEventListener('click', close))
  document.addEventListener('keydown', (e) => e.key === 'Escape' && sheet.getAttribute('data-open') === 'true' && close())
}

/* ---- sticky mobile CTA --------------------------------------------------- */
function setupMobileCta() {
  const bar = document.querySelector<HTMLElement>('[data-mcta]')
  const hero = document.querySelector<HTMLElement>('[data-hero]') ?? document.querySelector('main > *')
  const footer = document.querySelector('footer')
  if (!bar || !hero || !footer) return
  let heroGone = false
  let footerSeen = false
  const sync = () => {
    const show = heroGone && !footerSeen
    bar.setAttribute('data-show', String(show))
    bar.setAttribute('aria-hidden', String(!show))
    bar.querySelectorAll('a').forEach((a) => (show ? a.removeAttribute('tabindex') : a.setAttribute('tabindex', '-1')))
  }
  new IntersectionObserver(([e]) => {
    heroGone = !e.isIntersecting && e.boundingClientRect.top < 0
    sync()
  }).observe(hero)
  new IntersectionObserver(([e]) => {
    footerSeen = e.isIntersecting
    sync()
  }).observe(footer)
}

/* ---- segmented controls -------------------------------------------------- */
function setupSegments() {
  document.querySelectorAll<HTMLElement>('[data-segments]').forEach((group) => {
    const name = group.dataset.segments
    const buttons = Array.from(group.querySelectorAll<HTMLButtonElement>('button[data-segment]'))
    const panels = Array.from(document.querySelectorAll<HTMLElement>(`[data-segment-panel^="${name}:"]`))
    const select = (key: string) => {
      buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.segment === key)))
      panels.forEach((p) => (p.hidden = p.dataset.segmentPanel !== `${name}:${key}`))
      document.dispatchEvent(new CustomEvent('segment-change', { detail: { name, key } }))
    }
    buttons.forEach((b) => b.addEventListener('click', () => select(b.dataset.segment!)))
  })
}

/* ---- pricing calculator -------------------------------------------------- */
function setupPricing() {
  const box = document.querySelector<HTMLElement>('[data-pricing]')
  if (!box) return
  const range = box.querySelector<HTMLInputElement>('input[type="range"]')
  const out = box.querySelectorAll<HTMLElement>('[data-doors-out]')
  const prices = document.querySelectorAll<HTMLElement>('[data-price-base]')
  if (!range) return
  const money = new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' })
  const update = () => {
    const doors = Number(range.value)
    const pct = ((doors - Number(range.min)) / (Number(range.max) - Number(range.min))) * 100
    range.style.setProperty('--pct', `${pct}%`)
    out.forEach((o) => (o.textContent = `${doors} ${doors === 1 ? 'door' : 'doors'}`))
    prices.forEach((p) => {
      const base = Number(p.dataset.priceBase)
      const perDoor = Number(p.dataset.pricePerDoor ?? '1')
      p.textContent = money.format(base + perDoor * doors).replace('CA', '')
    })
  }
  range.addEventListener('input', update)
  update()
}

/* ---- journey scrollytelling --------------------------------------------- */
function setupJourney() {
  const journey = document.querySelector<HTMLElement>('[data-journey]')
  if (!journey) return
  const steps = Array.from(journey.querySelectorAll<HTMLElement>('[data-journey-step]'))
  const screens = Array.from(journey.querySelectorAll<HTMLElement>('[data-journey-screen]'))
  const dots = Array.from(journey.querySelectorAll<HTMLElement>('[data-journey-dot]'))
  const activate = (key: string) => {
    steps.forEach((s) => s.setAttribute('data-active', String(s.dataset.journeyStep === key)))
    screens.forEach((s) => s.setAttribute('data-active', String(s.dataset.journeyScreen === key)))
    dots.forEach((d) => d.setAttribute('data-active', String(d.dataset.journeyDot === key)))
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => e.isIntersecting && activate((e.target as HTMLElement).dataset.journeyStep!))
    },
    { rootMargin: '-45% 0px -45% 0px' },
  )
  steps.forEach((s) => io.observe(s))
}

/* ---- preview-only forms -------------------------------------------------- */
function setupForms() {
  document.querySelectorAll<HTMLFormElement>('form[data-preview-form]').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      if (!form.reportValidity()) return
      const done = form.querySelector<HTMLElement>('[data-form-done]')
      form.querySelectorAll<HTMLElement>('[data-form-fields]').forEach((f) => (f.hidden = true))
      if (done) {
        done.hidden = false
        done.focus()
      }
    })
  })
}

/* ---- calculators (loaded only on the pages that use them) ---------------- */
function setupTools() {
  if (document.querySelector('[data-tool="n4"]')) void import('./tools/n4').then((m) => m.mount())
  if (document.querySelector('[data-tool="rent"]')) void import('./tools/rent').then((m) => m.mount())
  if (document.querySelector('[data-tool="lmr"]')) void import('./tools/lmr').then((m) => m.mount())
}

setupMotion()
setupCounters()
setupFlyouts()
setupMobileMenu()
setupMobileCta()
setupSegments()
setupPricing()
setupJourney()
setupForms()
setupTools()
