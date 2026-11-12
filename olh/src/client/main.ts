/**
 * Progressive enhancement for the prerendered pages. Everything here is
 * optional: with JavaScript off, every page is complete, every link works and
 * every animated mock-up shows its finished state.
 */
const root = document.documentElement
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
const scrollBehavior: ScrollBehavior = reduceMotion ? 'auto' : 'smooth'

function inView(el: Element, margin = 0.92): boolean {
  const r = el.getBoundingClientRect()
  return r.top < window.innerHeight * margin && r.bottom > 0
}

/** localStorage that never throws (private mode, blocked storage). */
const store = {
  get(key: string): string | null {
    try {
      return window.localStorage.getItem(key)
    } catch {
      return null
    }
  },
  set(key: string, value: string) {
    try {
      window.localStorage.setItem(key, value)
    } catch {
      /* storage unavailable: nothing to remember, nothing breaks */
    }
  },
}

/* ---- reveal on scroll + mock-up sequences ------------------------------- */
function setupMotion() {
  const reveals = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
  const plays = Array.from(document.querySelectorAll<HTMLElement>('[data-play]'))

  // Read every position first, then write: interleaving the two forces extra layouts.
  // Anything already on screen at load shows at once; only what's below the fold animates in.
  const revealsInView = reveals.filter((el) => inView(el, 1))
  const playsInView = plays.filter((el) => inView(el, 1))
  revealsInView.forEach((el) => el.classList.add('is-in'))
  playsInView.forEach((el) => el.classList.add('is-static'))

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

/* ---- chapters: the bar under the nav ------------------------------------- */
/** Index of the chapter on screen, shared with the Menu sheet. */
let currentChapter = 0

function setupChapters() {
  const bar = document.querySelector<HTMLElement>('[data-chapnav]')
  if (!bar) return
  const links = Array.from(bar.querySelectorAll<HTMLAnchorElement>('[data-chapter-link]'))
  const sections = links.map((a) => document.getElementById(a.dataset.chapterLink ?? ''))
  if (sections.some((s) => !s) || sections.length < 2) return
  const label = bar.querySelector<HTMLElement>('[data-chapnav-label]')
  const index = bar.querySelector<HTMLElement>('[data-chapnav-index]')
  const fill = bar.querySelector<HTMLElement>('[data-chapnav-fill]')
  const ticks = bar.querySelector<HTMLElement>('[data-chapnav-ticks]')
  const toc = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-toc-link]'))
  const title = bar.dataset.chapnavTitle
  // CSS draws the fill on its own where scroll timelines exist (and motion is welcome).
  const nativeFill = CSS.supports('animation-timeline: scroll()') && !reduceMotion
  let tops: number[] = []
  let maxScroll = 1
  let stickyOffset = 0

  const measure = () => {
    stickyOffset = bar.getBoundingClientRect().height + (parseFloat(getComputedStyle(root).getPropertyValue('--nav-h')) || 52)
    maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
    tops = sections.map((s) => s!.getBoundingClientRect().top + window.scrollY - stickyOffset)
    if (ticks) {
      ticks.replaceChildren(
        ...tops.slice(1).map((t) => {
          const tick = document.createElement('i')
          tick.style.left = `${Math.min(100, Math.max(0, (t / maxScroll) * 100))}%`
          return tick
        }),
      )
    }
  }

  const select = (i: number) => {
    if (i === currentChapter && label?.dataset.ready) return
    currentChapter = i
    if (label) {
      label.textContent = i === 0 && title ? title : (links[i]?.textContent ?? '')
      label.dataset.ready = '1'
    }
    if (index) index.textContent = String(i + 1)
    const id = links[i]?.dataset.chapterLink
    links.forEach((a, j) => (j === i ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current')))
    toc.forEach((a) => (a.dataset.tocLink === id ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current')))
  }

  let frame = 0
  const update = () => {
    frame = 0
    const y = window.scrollY
    const line = y + window.innerHeight * 0.3
    let i = 0
    for (let j = 0; j < tops.length; j++) if (tops[j] <= line) i = j
    if (y >= maxScroll - 2) i = tops.length - 1
    select(i)
    if (!nativeFill && fill) fill.style.setProperty('--p', String(Math.min(1, Math.max(0, y / maxScroll))))
  }
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(update)
  }

  measure()
  update()
  window.addEventListener('scroll', schedule, { passive: true })
  window.addEventListener('resize', () => {
    measure()
    schedule()
  })
  // Images, fonts and folding sections change the page height after load.
  if ('ResizeObserver' in window) new ResizeObserver(() => {
    measure()
    schedule()
  }).observe(document.body)
}

/* ---- the Menu sheet ------------------------------------------------------ */
function setupSheet() {
  const sheet = document.getElementById('menu')
  if (!sheet) return
  const panel = sheet.querySelector<HTMLElement>('[data-sheet-panel]')
  const form = sheet.querySelector<HTMLFormElement>('[data-sheet-search]')
  const input = form?.querySelector<HTMLInputElement>('input')
  const results = sheet.querySelector<HTMLElement>('[data-sheet-results]')
  const suggest = sheet.querySelector<HTMLElement>('[data-sheet-suggest]')
  const chapterBox = sheet.querySelector<HTMLElement>('[data-sheet-chapters]')
  const chapterList = sheet.querySelector<HTMLOListElement>('[data-sheet-chapter-list]')
  const openers = Array.from(document.querySelectorAll<HTMLElement>('[data-menu-open]'))
  const closeButton = sheet.querySelector<HTMLElement>('.sheet-close')
  const base = sheet.dataset.base ?? '/'
  if (!panel) return
  if (form) form.hidden = false
  // Arriving with #menu in the address (the no-script fallback) would show the sheet
  // through :target, outside the script's control. Drop the hash.
  if (window.location.hash === '#menu') history.replaceState(history.state, '', window.location.pathname + window.location.search)

  let lastOpener: HTMLElement | null = null
  let pushed = false
  let restoration: ScrollRestoration = 'auto'
  let pendingHash: string | null = null
  let pendingHref: string | null = null

  const isOpen = () => sheet.getAttribute('data-open') === 'true'
  const background = () => Array.from(document.body.children).filter((el) => el !== sheet && el.tagName !== 'SCRIPT')

  const renderChapters = () => {
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('[data-chapnav] [data-chapter-link]'))
    if (!chapterBox || !chapterList || links.length < 2) return
    chapterList.replaceChildren(
      ...links.map((a, i) => {
        const li = document.createElement('li')
        const link = document.createElement('a')
        link.href = `#${a.dataset.chapterLink}`
        link.className = 'sheet-chapter'
        link.dataset.state = i < currentChapter ? 'done' : i === currentChapter ? 'here' : 'next'
        link.dataset.track = 'menu:chapter'
        if (i === currentChapter) link.setAttribute('aria-current', 'true')
        const n = document.createElement('span')
        n.className = 'sheet-chapter-n'
        n.textContent = i < currentChapter ? '✓' : String(i + 1)
        n.setAttribute('aria-hidden', 'true')
        const text = document.createElement('span')
        text.textContent = a.textContent ?? ''
        link.append(n, text)
        if (i === currentChapter) {
          const here = document.createElement('span')
          here.className = 'sheet-chapter-here'
          here.textContent = 'You’re here'
          link.append(here)
        }
        li.append(link)
        return li
      }),
    )
    chapterBox.hidden = false
  }

  const finishClose = () => {
    sheet.setAttribute('data-open', 'false')
    root.classList.remove('sheet-open')
    openers.forEach((o) => o.setAttribute('aria-expanded', 'false'))
    background().forEach((el) => el.removeAttribute('inert'))
    panel.style.removeProperty('--drag')
    if (input) {
      input.value = ''
      renderResults('', [])
    }
    if (pendingHash) {
      const target = document.getElementById(pendingHash)
      pendingHash = null
      if (target) {
        target.scrollIntoView({ behavior: scrollBehavior, block: 'start' })
        if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1')
        target.focus({ preventScroll: true })
      }
    } else {
      lastOpener?.focus({ preventScroll: true })
    }
    // Hand scroll restoration back to the browser once our own scroll has started.
    window.setTimeout(() => (history.scrollRestoration = restoration), 150)
    if (pendingHref) {
      const href = pendingHref
      pendingHref = null
      window.location.assign(href)
    }
  }

  const open = (opener: HTMLElement | null) => {
    if (isOpen()) return
    lastOpener = opener
    renderChapters()
    sheet.setAttribute('data-open', 'true')
    root.classList.add('sheet-open')
    openers.forEach((o) => o.setAttribute('aria-expanded', 'true'))
    background().forEach((el) => el.setAttribute('inert', ''))
    // A history entry, so the Back gesture closes the sheet instead of leaving the page.
    // Manual scroll restoration stops the browser from undoing a chapter jump when
    // that entry is popped on close.
    restoration = history.scrollRestoration
    history.scrollRestoration = 'manual'
    history.pushState({ olhSheet: true }, '')
    pushed = true
    window.setTimeout(() => closeButton?.focus({ preventScroll: true }), 60)
    void loadSearch()
  }

  /** Close through history when we added an entry, so Back and close stay in step. */
  const close = () => {
    if (!isOpen()) return
    if (pushed) {
      pushed = false
      history.back()
    } else finishClose()
  }

  window.addEventListener('popstate', () => {
    if (isOpen()) {
      pushed = false
      finishClose()
    }
  })
  window.addEventListener('pageshow', (e) => {
    if (e.persisted && isOpen()) {
      pushed = false
      pendingHref = null
      finishClose()
    }
  })

  openers.forEach((o) =>
    o.addEventListener('click', (e) => {
      e.preventDefault()
      open(o)
    }),
  )
  sheet.querySelectorAll<HTMLElement>('[data-menu-close]').forEach((c) =>
    c.addEventListener('click', (e) => {
      e.preventDefault()
      close()
    }),
  )
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen()) {
      e.preventDefault()
      close()
    }
  })

  // Links inside the sheet: chapters scroll after the sheet closes; other links leave the history tidy.
  sheet.addEventListener('click', (e) => {
    const a = (e.target as Element).closest<HTMLAnchorElement>('a')
    if (!a || a.hasAttribute('data-menu-close') || e.defaultPrevented) return
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target === '_blank') return
    const href = a.getAttribute('href') ?? ''
    e.preventDefault()
    if (href.startsWith('#')) pendingHash = href.slice(1)
    else pendingHref = a.href
    close()
  })

  // Swipe the sheet down to dismiss it, from the grabber or the title row.
  let startY = 0
  let startT = 0
  let dy = 0
  let dragging = false
  sheet.querySelectorAll<HTMLElement>('[data-sheet-grab]').forEach((grab) => {
    grab.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 || (e.target as Element).closest('a, button, input')) return
      dragging = true
      startY = e.clientY
      startT = performance.now()
      dy = 0
      panel.classList.add('is-dragging')
      grab.setPointerCapture(e.pointerId)
    })
    grab.addEventListener('pointermove', (e) => {
      if (!dragging) return
      dy = Math.max(0, e.clientY - startY)
      panel.style.setProperty('--drag', `${dy}px`)
    })
    const end = () => {
      if (!dragging) return
      dragging = false
      panel.classList.remove('is-dragging')
      const velocity = dy / Math.max(1, performance.now() - startT)
      if (dy > 110 || (dy > 24 && velocity > 0.6)) close()
      else panel.style.setProperty('--drag', '0px')
    }
    grab.addEventListener('pointerup', end)
    grab.addEventListener('pointercancel', end)
  })

  // Search: a small built-in index, loaded the first time the sheet opens.
  let searchModule: Promise<typeof import('./search')> | null = null
  const loadSearch = () =>
    (searchModule ??= import('./search').then((m) => {
      void m.load(base)
      return m
    }))

  function renderResults(query: string, items: { t: string; u: string; y: string }[]) {
    if (!results || !suggest) return
    if (!query) {
      results.hidden = true
      results.replaceChildren()
      suggest.hidden = false
      return
    }
    suggest.hidden = true
    results.hidden = false
    if (!items.length) {
      const empty = document.createElement('p')
      empty.className = 'sheet-empty'
      empty.textContent = `Nothing matches “${query}” yet. Try “pricing”, “eviction” or “N4”, or `
      const ask = document.createElement('a')
      ask.href = sheet!.dataset.ask ?? ''
      ask.textContent = 'ask Ezy'
      ask.rel = 'noopener'
      empty.append(ask, '.')
      results.replaceChildren(empty)
      return
    }
    const list = document.createElement('ul')
    list.className = 'sheet-hits'
    for (const item of items) {
      const li = document.createElement('li')
      const a = document.createElement('a')
      a.href = item.u
      a.className = 'sheet-hit'
      a.dataset.track = 'menu:search-result'
      const t = document.createElement('span')
      t.textContent = item.t
      const y = document.createElement('span')
      y.className = 'sheet-hit-type'
      y.textContent = item.y
      a.append(t, y)
      li.append(a)
      list.append(li)
    }
    results.replaceChildren(list)
  }

  let seq = 0
  input?.addEventListener('input', async () => {
    const query = input.value.trim()
    const mine = ++seq
    if (!query) return renderResults('', [])
    const m = await loadSearch()
    const items = await m.search(base, query)
    if (mine === seq) renderResults(query, items)
  })
  form?.addEventListener('submit', (e) => {
    e.preventDefault()
    results?.querySelector<HTMLAnchorElement>('a')?.click()
  })
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

/* ---- portfolio calculator (pricing page) ---------------------------------- */
type Tariff = {
  min: number
  max: number
  shield: { first: number; additional: number }
  management: Record<string, { first: number; additional: number; noun: string }>
  legalBands: [number, number, number][]
}

function setupCalc() {
  const box = document.querySelector<HTMLElement>('[data-calc]')
  if (!box) return
  let t: Tariff
  try {
    t = JSON.parse(box.dataset.tariff ?? '')
  } catch {
    return
  }
  const range = box.querySelector<HTMLInputElement>('[data-units]')
  const out = box.querySelector<HTMLElement>('[data-units-out]')
  const word = box.querySelector<HTMLElement>('[data-units-word]')
  const steps = Array.from(box.querySelectorAll<HTMLButtonElement>('[data-step]'))
  const cats = Array.from(box.querySelectorAll<HTMLInputElement>('input[data-cat]'))
  const how = document.querySelector<HTMLElement>('[data-how-body]')
  if (!range || !out) return
  const fmt = (n: number) => '$' + n.toLocaleString('en-CA')
  const avg = (total: number, n: number) => `average ${'$' + (total / n).toLocaleString('en-CA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} per tenancy`
  const set = (sel: string, text: string, show = true) =>
    document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
      el.textContent = text
      el.hidden = !show
    })
  // Prices roll to their new value instead of snapping (skipped on first paint
  // and for visitors who ask for reduced motion).
  let rolled = false
  const roll = (sel: string, to: number) =>
    document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
      const from = Number(el.dataset.v ?? (el.textContent ?? '').replace(/[^\d.]/g, ''))
      el.dataset.v = String(to)
      if (!rolled || reduceMotion || from === to || !Number.isFinite(from)) {
        el.textContent = to.toLocaleString('en-CA')
        return
      }
      const start = performance.now()
      const tick = (now: number) => {
        if (el.dataset.v !== String(to)) return // a newer value took over
        const k = Math.min(1, (now - start) / 420)
        const eased = 1 - Math.pow(1 - k, 3)
        el.textContent = Math.round(from + (to - from) * eased).toLocaleString('en-CA')
        if (k < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    })
  const row = (label: string, value: string, cls = '') => {
    const tr = document.createElement('tr')
    if (cls) tr.className = cls
    const a = document.createElement('td')
    a.textContent = label
    tr.append(a)
    if (cls === 'calc-grp') a.colSpan = 2
    else {
      const b = document.createElement('td')
      b.textContent = value
      tr.append(b)
    }
    return tr
  }

  // Remembered choices win over the browser's own form restoration, which can
  // land after this script runs (reload, Back), so they're applied again on pageshow.
  const restore = () => {
    const saved = Number(store.get('olh-units'))
    if (saved >= t.min && saved <= t.max) range.value = String(saved)
    const savedCat = store.get('olh-type')
    if (savedCat && cats.some((c) => c.value === savedCat)) cats.forEach((c) => (c.checked = c.value === savedCat))
  }
  restore()

  const render = () => {
    const n = Math.min(t.max, Math.max(t.min, Number(range.value) || 1))
    const cat = cats.find((c) => c.checked)?.value ?? 'condo'
    const c = t.management[cat]
    const shield = t.shield.first + (n - 1) * t.shield.additional
    const mgmt = c.first + (n - 1) * c.additional
    const bands = t.legalBands
      .map(([from, to, rate]) => ({ from, to: Math.min(n, to), count: Math.max(0, Math.min(n, to) - from + 1), rate }))
      .filter((b) => b.count > 0)
    const legal = bands.reduce((sum, b) => sum + b.count * b.rate, 0)
    const plus = mgmt + legal
    const unit = n === 1 ? 'tenancy' : 'tenancies'

    if (out.textContent !== String(n)) out.textContent = String(n)
    if (word) word.textContent = `${c.noun} ${unit}`
    range.setAttribute('aria-valuetext', `${n} ${unit}`)
    range.style.setProperty('--pct', `${((n - t.min) / (t.max - t.min)) * 100}%`)
    steps.forEach((b) => {
      const d = Number(b.dataset.step)
      b.disabled = (d < 0 && n <= t.min) || (d > 0 && n >= t.max)
    })

    roll('[data-out="shield"]', shield)
    roll('[data-out="management"]', mgmt)
    roll('[data-out="guarantee"]', plus)
    rolled = true
    const chain = (first: number, add: number, total: number) => (n === 1 ? `${fmt(first)} first tenancy` : `${fmt(first)} + ${n - 1} × ${fmt(add)} = ${fmt(total)}`)
    set('[data-math="shield"]', chain(t.shield.first, t.shield.additional, shield))
    set('[data-math="management"]', chain(c.first, c.additional, mgmt))
    set('[data-math="guarantee"]', `${fmt(mgmt)} management + ${fmt(legal)} legal`)
    set('[data-avg="shield"]', avg(shield, n), n > 1)
    set('[data-avg="management"]', avg(mgmt, n), n > 1)
    set('[data-avg="guarantee"]', avg(plus, n), n > 1)

    if (how) {
      const rows: HTMLTableRowElement[] = [row('Landlord Shield', '', 'calc-grp'), row('First tenancy', fmt(t.shield.first))]
      if (n > 1) rows.push(row(`${n - 1} additional × ${fmt(t.shield.additional)}`, fmt((n - 1) * t.shield.additional)))
      rows.push(row('Landlord Shield total', fmt(shield), 'calc-tot'))
      rows.push(row(`Property Management (${c.noun})`, '', 'calc-grp'), row('First tenancy', fmt(c.first)))
      if (n > 1) rows.push(row(`${n - 1} additional × ${fmt(c.additional)}`, fmt((n - 1) * c.additional)))
      rows.push(row('Property Management total', fmt(mgmt), 'calc-tot'))
      rows.push(row('Legal Guarantee (added to Property Management)', '', 'calc-grp'))
      bands.forEach((b) => rows.push(row(`Unit${b.count > 1 ? 's' : ''} ${b.from}${b.to > b.from ? '–' + b.to : ''} · ${b.count} × ${fmt(b.rate)}`, fmt(b.count * b.rate))))
      rows.push(row('Property Management + Legal Guarantee', fmt(plus), 'calc-tot'))
      how.replaceChildren(...rows)
    }
  }

  range.addEventListener('input', () => {
    render()
    store.set('olh-units', range.value)
  })
  steps.forEach((b) =>
    b.addEventListener('click', () => {
      range.value = String(Number(range.value) + Number(b.dataset.step))
      render()
      store.set('olh-units', range.value)
    }),
  )
  cats.forEach((c) =>
    c.addEventListener('change', () => {
      render()
      store.set('olh-type', c.value)
    }),
  )
  render()
  window.addEventListener('pageshow', () => {
    restore()
    render()
  })
}

/* ---- rentals strip: the For rent / For sale filter --------------------------- */
function setupListings() {
  document.querySelectorAll<HTMLElement>('[data-listings]').forEach((wrap) => {
    const track = wrap.querySelector<HTMLElement>('[data-scroller-track]')
    const items = Array.from(wrap.querySelectorAll<HTMLElement>('.strip-item'))
    const buttons = Array.from(wrap.querySelectorAll<HTMLButtonElement>('[data-filter]'))
    const status = wrap.querySelector<HTMLElement>('[data-listing-status]')
    if (!track) return
    buttons.forEach((b) =>
      b.addEventListener('click', () => {
        const f = b.dataset.filter
        buttons.forEach((x) => x.setAttribute('aria-pressed', String(x === b)))
        let shown = 0
        items.forEach((it) => {
          const on = f === 'all' || it.dataset.kind === f || it.dataset.kind === 'all'
          it.hidden = !on
          if (on && it.dataset.kind !== 'all') shown++
        })
        track.scrollTo({ left: 0, behavior: 'auto' })
        track.dispatchEvent(new Event('scroll'))
        if (status) status.textContent = `Showing ${shown} ${f === 'sale' ? 'for sale' : f === 'rent' ? 'for rent' : 'listings'}.`
      }),
    )
  })
}

/* ---- folding groups: footer columns and the pricing table on phones ------- */
function setupFolds() {
  const phone = window.matchMedia('(max-width: 833px)')
  const folds = Array.from(document.querySelectorAll<HTMLDetailsElement>('details[data-footer-group], details[data-fold-mobile]'))
  if (!folds.length) return
  const apply = () => folds.forEach((d) => (d.open = !phone.matches))
  apply()
  phone.addEventListener('change', apply)
  // On laptops they're plain columns: the heading isn't a toggle.
  folds.forEach((d) => d.querySelector('summary')?.addEventListener('click', (e) => !phone.matches && e.preventDefault()))
}

/* ---- pick up where you left off ------------------------------------------ */
function setupJobs() {
  const here = document.querySelector<HTMLElement>('main[data-job]')?.dataset.job
  if (here) {
    store.set('olh-job', JSON.stringify({ key: here, at: Date.now() }))
    return
  }
  let last: { key?: string; at?: number } = {}
  try {
    last = JSON.parse(store.get('olh-job') ?? '{}')
  } catch {
    return
  }
  const fortnight = 14 * 24 * 60 * 60 * 1000
  if (!last.key || !last.at || Date.now() - last.at > fortnight) return
  const chip = document.querySelector<HTMLElement>(`[data-job-chip="${CSS.escape(last.key)}"]`)
  if (!chip) return
  chip.setAttribute('data-suggested', 'true')
}

/* ---- a highlight that slides between tabs -------------------------------- */
/**
 * Every [data-pill] group gets one indicator that rests under the selected item
 * and slides when the selection changes. In "hover" groups (the header and the
 * chapter bar) it also follows the pointer, then settles back.
 */
function setupPills() {
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  document.querySelectorAll<HTMLElement>('[data-pill]').forEach((box) => {
    const items = () => Array.from(box.querySelectorAll<HTMLElement>('[data-pill-item]'))
    const ind = document.createElement('span')
    ind.className = 'pill-ind'
    ind.setAttribute('aria-hidden', 'true')
    box.prepend(ind)
    box.classList.add('pill-on')
    let placed = false

    const current = () =>
      items().find((el) => el.matches('[aria-selected="true"], [aria-pressed="true"], [aria-current]') || !!el.querySelector('input:checked')) ?? null

    const place = (el: HTMLElement | null) => {
      const host = ind.offsetParent as HTMLElement | null
      if (!el || !host || !el.getClientRects().length) {
        ind.dataset.on = 'false'
        return
      }
      const a = el.getBoundingClientRect()
      const b = host.getBoundingClientRect()
      if (!placed) ind.style.transition = 'none'
      ind.style.setProperty('--x', `${a.left - b.left - host.clientLeft + host.scrollLeft}px`)
      ind.style.setProperty('--y', `${a.top - b.top - host.clientTop + host.scrollTop}px`)
      ind.style.setProperty('--w', `${a.width}px`)
      ind.style.setProperty('--h', `${a.height}px`)
      ind.dataset.on = 'true'
      if (!placed) {
        void ind.offsetWidth
        ind.style.transition = ''
        placed = true
      }
    }
    const sync = () => place(current())

    new MutationObserver(sync).observe(box, { subtree: true, attributes: true, attributeFilter: ['aria-selected', 'aria-pressed', 'aria-current'] })
    box.addEventListener('change', sync)
    if ('ResizeObserver' in window) new ResizeObserver(sync).observe(box)
    window.addEventListener('pageshow', sync)

    if (box.dataset.pill === 'hover' && canHover) {
      items().forEach((el) => el.addEventListener('pointerenter', () => place(el)))
      box.addEventListener('pointerleave', sync)
      box.addEventListener('focusin', (e) => {
        const el = (e.target as Element).closest<HTMLElement>('[data-pill-item]')
        if (el && el.matches(':focus-visible')) place(el)
      })
      box.addEventListener('focusout', sync)
    }
    sync()
  })
}

/* ---- tabs that swap a panel in place -------------------------------------- */
function setupTabs() {
  document.querySelectorAll<HTMLElement>('[data-tabs]').forEach((list) => {
    const name = list.dataset.tabs
    const root = list.closest<HTMLElement>('[data-tabs-root]')
    if (!root || !name) return
    const tabs = Array.from(list.querySelectorAll<HTMLElement>('[data-tab]'))
    const panels = Array.from(root.querySelectorAll<HTMLElement>(`[id^="${name}-panel-"]`))

    const select = (key: string, focus = false) => {
      tabs.forEach((t) => {
        const on = t.dataset.tab === key
        t.setAttribute('aria-selected', String(on))
        t.tabIndex = on ? 0 : -1
        if (on && focus) t.focus({ preventScroll: true })
        if (on && list.scrollWidth > list.clientWidth) {
          const left = t.offsetLeft - 12
          const right = t.offsetLeft + t.offsetWidth + 12 - list.clientWidth
          if (list.scrollLeft > left) list.scrollTo({ left, behavior: scrollBehavior })
          else if (list.scrollLeft < right) list.scrollTo({ left: right, behavior: scrollBehavior })
        }
      })
      panels.forEach((p) => (p.hidden = p.dataset.tabPanel !== key))
    }

    tabs.forEach((t, i) => {
      t.addEventListener('click', () => {
        root.classList.add('tabs-live')
        select(t.dataset.tab!)
      })
      t.addEventListener('keydown', (e) => {
        const move = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]
        const to = e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : move ? (i + move + tabs.length) % tabs.length : -1
        if (to < 0) return
        e.preventDefault()
        root.classList.add('tabs-live')
        select(tabs[to].dataset.tab!, true)
      })
    })
    // A link can arrive with a tab chosen: /olh/?plan=guarantee
    const wanted = new URLSearchParams(location.search).get(name)
    if (wanted && tabs.some((t) => t.dataset.tab === wanted)) select(wanted)
  })
}

/* ---- sheets: detail that opens over the page ------------------------------ */
/**
 * A [data-dialog] link opens the <dialog> it names instead of leaving the page.
 * It closes with the button, Escape, a tap outside, a swipe down on phones, or
 * the Back gesture (opening adds a history entry, like the Menu).
 */
function setupDialogs() {
  if (typeof HTMLDialogElement === 'undefined' || !HTMLDialogElement.prototype.showModal) return
  let open: HTMLDialogElement | null = null
  let opener: HTMLElement | null = null
  let pushed = false
  let pendingHref: string | null = null
  let pendingHash: string | null = null

  const finish = () => {
    const dlg = open
    if (!dlg) return
    open = null
    const done = () => {
      dlg.classList.remove('is-closing')
      dlg.querySelector<HTMLElement>('[data-dialog-panel]')?.style.removeProperty('--drag')
      if (dlg.open) dlg.close()
      if (pendingHash) {
        const target = document.getElementById(pendingHash)
        pendingHash = null
        target?.scrollIntoView({ behavior: scrollBehavior, block: 'start' })
      } else opener?.focus({ preventScroll: true })
      if (pendingHref) {
        const href = pendingHref
        pendingHref = null
        window.location.assign(href)
      }
    }
    if (reduceMotion) return done()
    dlg.classList.add('is-closing')
    window.setTimeout(done, 270)
  }

  /** Close through history when we added an entry, so Back and close stay in step. */
  const close = () => {
    if (!open) return
    if (pushed) {
      pushed = false
      history.back()
    } else finish()
  }

  window.addEventListener('popstate', () => {
    if (open) {
      pushed = false
      finish()
    }
  })

  document.addEventListener('click', (e) => {
    const trigger = (e.target as Element).closest<HTMLElement>('[data-dialog]')
    if (!trigger || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    const dlg = document.getElementById(trigger.dataset.dialog ?? '')
    if (!(dlg instanceof HTMLDialogElement) || open) return
    e.preventDefault()
    opener = trigger
    open = dlg
    dlg.showModal()
    const panel = dlg.querySelector<HTMLElement>('[data-dialog-panel]')
    if (panel) panel.scrollTop = 0
    history.pushState({ olhDialog: dlg.id }, '')
    pushed = true
  })

  document.querySelectorAll<HTMLDialogElement>('dialog[data-dialog-el]').forEach((dlg) => {
    const panel = dlg.querySelector<HTMLElement>('[data-dialog-panel]')
    dlg.addEventListener('cancel', (e) => {
      e.preventDefault()
      close()
    })
    dlg.addEventListener('click', (e) => {
      const el = e.target as Element
      if (el === dlg || el.closest('[data-dialog-close]')) {
        e.preventDefault()
        return close()
      }
      // Links inside the sheet: close first so the history stays tidy, then go.
      const a = el.closest<HTMLAnchorElement>('a[href]')
      if (!a || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || a.target === '_blank') return
      const href = a.getAttribute('href') ?? ''
      if (/^(tel|mailto):/.test(href)) return
      e.preventDefault()
      const here = new URL(a.href, location.href)
      if (here.pathname === location.pathname && here.hash) pendingHash = here.hash.slice(1)
      else pendingHref = a.href
      close()
    })

    // Phones: swipe the sheet down from its top bar to dismiss it.
    const bar = dlg.querySelector<HTMLElement>('[data-dialog-grab]')
    if (!bar || !panel) return
    let startY = 0
    let startT = 0
    let dy = 0
    let dragging = false
    bar.addEventListener('pointerdown', (e) => {
      if (e.button !== 0 || (e.target as Element).closest('button, a')) return
      dragging = true
      startY = e.clientY
      startT = performance.now()
      dy = 0
      panel.classList.add('is-dragging')
      bar.setPointerCapture(e.pointerId)
    })
    bar.addEventListener('pointermove', (e) => {
      if (!dragging) return
      dy = Math.max(0, e.clientY - startY)
      panel.style.setProperty('--drag', `${dy}px`)
    })
    const end = () => {
      if (!dragging) return
      dragging = false
      panel.classList.remove('is-dragging')
      const velocity = dy / Math.max(1, performance.now() - startT)
      if (dy > 110 || (dy > 24 && velocity > 0.6)) close()
      else panel.style.setProperty('--drag', '0px')
    }
    bar.addEventListener('pointerup', end)
    bar.addEventListener('pointercancel', end)
  })
}

/* ---- sideways rows: arrows on laptops, swipe everywhere -------------------- */
function setupScrollers() {
  document.querySelectorAll<HTMLElement>('[data-scroller]').forEach((root) => {
    const track = root.querySelector<HTMLElement>('[data-scroller-track]')
    const prev = root.querySelector<HTMLButtonElement>('[data-scroller-prev]')
    const next = root.querySelector<HTMLButtonElement>('[data-scroller-next]')
    if (!track || !prev || !next) return
    const update = () => {
      prev.disabled = track.scrollLeft <= 2
      next.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2
    }
    // Move by whole cards: as many as fit, at least one.
    const step = () => {
      const card = Array.from(track.children).find((c) => !(c as HTMLElement).hidden) as HTMLElement | undefined
      if (!card) return track.clientWidth * 0.8
      const one = card.getBoundingClientRect().width + (parseFloat(getComputedStyle(track).columnGap) || 0)
      return Math.max(1, Math.floor((track.clientWidth * 0.85) / one)) * one
    }
    let frame = 0
    track.addEventListener('scroll', () => (frame ||= requestAnimationFrame(() => ((frame = 0), update()))), { passive: true })
    prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: scrollBehavior }))
    next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: scrollBehavior }))
    if ('ResizeObserver' in window) new ResizeObserver(update).observe(track)
    update()
  })
}

/* ---- a soft light that follows the pointer over .spot surfaces ------------- */
function setupSpot() {
  if (reduceMotion || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
  let frame = 0
  let last: PointerEvent | null = null
  document.addEventListener(
    'pointermove',
    (e) => {
      last = e
      frame ||= requestAnimationFrame(() => {
        frame = 0
        const el = (last!.target as Element).closest?.<HTMLElement>('.spot')
        if (!el) return
        const r = el.getBoundingClientRect()
        el.style.setProperty('--mx', `${last!.clientX - r.left}px`)
        el.style.setProperty('--my', `${last!.clientY - r.top}px`)
      })
    },
    { passive: true },
  )
}

setupMotion()
setupFlyouts()
setupChapters()
setupSheet()
setupTabs()
setupPills()
setupDialogs()
setupScrollers()
setupSpot()
setupMobileCta()
setupCalc()
setupListings()
setupFolds()
setupJobs()
