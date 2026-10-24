// Generates the static, crawlable pages that sit beside the React homepage:
//   /meetings/            meeting finder hub
//   /meetings/<type>/     one page per fellowship (AA, NA, CA)
//   /meetings/<city>/     one page per city, with verified local directories
//   /follow/              every SobrCircle social profile
//   /404.html             real 404 status instead of the SPA fallback
//   /sitemap.xml, /llms.txt
//
// Everything is plain HTML in public/, so search engines and AI assistants
// read it without running JavaScript. Edit scripts/pages-data.ts and run
// `npm run pages` to add a city or change a link, then commit the output.

import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  SITE,
  APP_STORE_URL,
  PLAY_STORE_URL,
  APP_ID,
  MEETING_COUNT,
  socials,
  fellowships,
  cities,
  topics,
  MILESTONES,
  type Topic,
  type City,
  type Fellowship,
  type Resource,
} from './pages-data.ts'
import { pages as bookPages } from '../src/twentyfour/data/pages.ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const PUBLIC = path.join(ROOT, 'public')
const TODAY = new Date().toISOString().slice(0, 10)
const CSS_VERSION = '20261024g'

// ── helpers ──────────────────────────────────────────────────────────────

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const telHref = (phone: string) => {
  const digits = phone.replace(/\D/g, '')
  if (digits.length <= 4) return `tel:${digits}`
  return `tel:+${digits.length === 10 ? '1' + digits : digits}`
}

const playUrl = (medium: string) =>
  `${PLAY_STORE_URL}&referrer=${encodeURIComponent(`utm_source=sobrcircle.com&utm_medium=${medium}`)}`

const icon = (name: keyof typeof ICONS, size = 20) =>
  `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="currentColor" aria-hidden="true"><path d="${ICONS[name]}"/></svg>`

const ICONS = {
  apple:
    'M17.05 12.04c-.03-2.85 2.33-4.22 2.43-4.29-1.32-1.94-3.39-2.2-4.12-2.23-1.75-.18-3.42 1.03-4.31 1.03-.89 0-2.25-1.01-3.71-.98-1.91.03-3.67 1.11-4.65 2.82-1.98 3.43-.51 8.5 1.42 11.29.94 1.36 2.07 2.89 3.54 2.83 1.42-.06 1.96-.92 3.68-.92 1.71 0 2.2.92 3.71.89 1.53-.03 2.5-1.39 3.44-2.76.69-1.01 1.1-2.03 1.4-3.07-.04-.02-2.69-1.04-2.72-4.1l-.02-.51ZM14.6 4.5c.79-.96 1.32-2.29 1.18-3.62-1.14.05-2.52.76-3.34 1.71-.73.85-1.37 2.21-1.2 3.51 1.27.1 2.57-.65 3.36-1.6Z',
  play: 'M5 2.7v18.6a.6.6 0 0 0 .92.5l15.3-9.3a.6.6 0 0 0 0-1L5.92 2.2A.6.6 0 0 0 5 2.7Z',
  ...Object.fromEntries(socials.map((s) => [s.id, s.icon])),
} as Record<string, string>

function badges(medium: string) {
  return `<div class="pg-badges">
        <a class="pg-badge" href="${APP_STORE_URL}" rel="noopener" aria-label="Download SobrCircle on the App Store">${icon('apple', 19)}<span>App Store</span></a>
        <a class="pg-badge" href="${esc(playUrl(medium))}" rel="noopener" aria-label="Get SobrCircle on Google Play">${icon('play', 17)}<span>Google Play</span></a>
      </div>`
}

type PageOpts = {
  path: string // e.g. /meetings/windsor/
  title: string
  description: string
  body: string
  jsonLd?: object[]
  nav?: 'meetings' | 'follow'
  noindex?: boolean
}

function nav(current?: PageOpts['nav']) {
  const link = (href: string, label: string, key?: PageOpts['nav'], cls = '') =>
    `<a href="${href}"${cls ? ` class="${cls}"` : ''}${current && key === current ? ' aria-current="page"' : ''}>${label}</a>`
  // Same shape as the homepage bar: two links, the logo in the middle, two links.
  return `<nav class="pg-nav" aria-label="Main navigation">
      <div class="pg-nav-group pg-nav-group--left">
        ${link('/meetings/', 'Meetings', 'meetings')}
        ${link('/#story', 'Our Story')}
      </div>
      <a class="pg-nav-brand" href="/" aria-label="SobrCircle home">
        <img src="/assets/circle.png" alt="" width="28" height="28">
      </a>
      <div class="pg-nav-group pg-nav-group--right">
        ${link('/follow/', 'Follow', 'follow')}
        ${link('#get-app', 'Get the App', undefined, 'pg-nav-cta')}
      </div>
    </nav>`
}

function footer() {
  return `<footer class="pg-footer">
      <div class="pg-footer-socials">
        ${socials.map((s) => `<a href="${s.url}" rel="me noopener" aria-label="SobrCircle on ${s.name}">${icon(s.id, 18)}</a>`).join('\n        ')}
      </div>
      <div class="pg-footer-links">
        <a href="/">Home</a>
        <a href="/meetings/">Find Meetings</a>
        <a href="/sobriety-tracker/">Sobriety Tracker</a>
        <a href="/sobriety-calculator/">Sobriety Calculator</a>
        <a href="/sober-community/">Sober Community</a>
        <a href="/follow/">Follow</a>
        <a href="/twentyfour/">Twenty Four</a>
        <a href="/support/">Support</a>
        <a href="/privacy/">Privacy</a>
        <a href="/terms/">Terms</a>
      </div>
      <p class="pg-footer-note">SobrCircle is peer support for adults 18+, not medical care or emergency services. In a crisis in Canada or the US, call or text 988. SobrCircle is independent and is not affiliated with or endorsed by Alcoholics Anonymous, Narcotics Anonymous, Cocaine Anonymous or any other fellowship.</p>
      <p class="pg-footer-note">&copy; ${new Date().getFullYear()} Moradi Labs Inc. Windsor, Ontario.</p>
    </footer>`
}

function page(o: PageOpts) {
  const url = SITE + o.path
  const ld = [
    ...(o.jsonLd ?? []),
  ]
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <title>${esc(o.title)}</title>
    <meta name="description" content="${esc(o.description)}">
    ${o.noindex ? '<meta name="robots" content="noindex">' : `<meta name="robots" content="max-image-preview:large">\n    <link rel="canonical" href="${url}">`}
    <meta name="apple-itunes-app" content="app-id=${APP_ID}">
    <meta name="theme-color" content="#0a0a0a">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="SobrCircle">
    <meta property="og:title" content="${esc(o.title)}">
    <meta property="og:description" content="${esc(o.description)}">
    <meta property="og:url" content="${url}">
    <meta property="og:image" content="${SITE}/assets/og-share.png?v=6">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${esc(o.title)}">
    <meta name="twitter:description" content="${esc(o.description)}">
    <meta name="twitter:image" content="${SITE}/assets/og-share.png?v=6">
    <link rel="icon" href="/favicon.ico" sizes="48x48">
    <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192.png">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=4">
    <link rel="stylesheet" href="/site.css?v=${CSS_VERSION}">
    <link rel="stylesheet" href="/pages.css?v=${CSS_VERSION}">
${ld.map((x) => `    <script type="application/ld+json">${JSON.stringify(x)}</script>`).join('\n')}
  </head>
  <body>
    <div class="pg-shell">
    ${nav(o.nav)}
    <main>
${o.body}
    </main>
    ${footer()}
    </div>
  </body>
</html>
`
}

function crumbs(items: Array<[string, string?]>) {
  const html = items
    .map(([label, href]) => (href ? `<a href="${href}">${esc(label)}</a>` : `<span>${esc(label)}</span>`))
    .join(' / ')
  return `      <nav class="pg-crumbs" aria-label="Breadcrumb">${html}</nav>`
}

function crumbsLd(items: Array<[string, string]>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, p], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: SITE + p,
    })),
  }
}

function faqLd(faq: Array<[string, string]>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(([q, a]) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  }
}

function faqHtml(faq: Array<[string, string]>, heading = 'Questions people ask') {
  return `      <section class="pg-section pg-faq">
        <h2>${heading}</h2>
${faq.map(([q, a]) => `        <details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('\n')}
      </section>`
}

const appLd = {
  '@context': 'https://schema.org',
  '@type': 'MobileApplication',
  '@id': `${SITE}/#app`,
  name: 'SobrCircle',
  url: `${SITE}/`,
  applicationCategory: 'HealthApplication',
  operatingSystem: 'iOS, Android',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'CAD' },
  installUrl: [APP_STORE_URL, PLAY_STORE_URL],
}

function howItWorks(place?: string) {
  const where = place ? `around ${place}` : 'around you'
  return `      <ol class="pg-steps">
        <li><strong>Open the map.</strong> See ${MEETING_COUNT} meetings, including AA, NA and CA, ${where} or anywhere you're headed.</li>
        <li><strong>Pick a meeting.</strong> Tap one to see the group, the day, the time and the address.</li>
        <li><strong>Start navigation.</strong> Choose driving, walking, cycling or transit and follow live directions right to the door.</li>
      </ol>`
}

function appFeatures() {
  return `      <ul class="pg-features">
        <li><strong>Your circle comes with you.</strong> Friends who choose to share their location show up on the same map, so nobody has to walk in alone.</li>
        <li><strong>Between meetings.</strong> Join a public room, find community events near you, check in and keep a private journal.</li>
        <li><strong>Private, with no ads.</strong> Your data is never sold, anyone can join rooms and events, and you can sign up without a credit card.</li>
      </ul>`
}

const MAP_ALT =
  'SobrCircle map showing a Wednesday 7:30 PM meeting in Windsor, Ontario, with a transit route, travel time and a Start Navigation button'

function heroPhone() {
  return `        <figure class="pg-phone">
          <div class="pg-phone-shell"><img src="/assets/6.webp?v=4" alt="${MAP_ALT}" width="900" height="1955" fetchpriority="high"></div>
          <figcaption>Live navigation to a meeting, inside SobrCircle.</figcaption>
        </figure>`
}

function getApp(medium: string, place?: string, blurb?: string) {
  const text =
    blurb ??
    `Find your next meeting${place ? ` in ${esc(place)}` : ''}, see when it starts and get live navigation to the door. Free to download on iPhone and Android.`
  return `      <section class="pg-section pg-getapp" id="get-app">
        <h2>Get SobrCircle</h2>
        <p>${text}</p>
        ${badges(`${medium}-bottom`)}
      </section>`
}

function resourceCard(r: Resource, kind: string) {
  const phone = r.phone ? `<p><a href="${telHref(r.phone)}">${esc(r.phone)}</a></p>` : ''
  const note = r.note ? `<p class="meta-line">${esc(r.note)}</p>` : ''
  return `          <div class="pg-card">
            <p class="pg-kind">${esc(kind)}</p>
            <a class="pg-card-link" href="${esc(r.url)}" rel="noopener">${esc(r.name)}</a>
            ${phone}${note}
          </div>`
}

function crisisCallout(helplines: Resource[]) {
  const items = helplines
    .map((h) => {
      const phone = h.phone ? ` <a href="${telHref(h.phone)}">${esc(h.phone)}</a>` : ''
      return `<p><a href="${esc(h.url)}" rel="noopener">${esc(h.name)}</a>${phone}${h.note ? ` <span class="meta-line">${esc(h.note)}</span>` : ''}</p>`
    })
    .join('\n          ')
  return `      <div class="pg-callout">
          <p><strong>Need help right now?</strong> Call or text 988 any time in Canada or the US if you're in crisis. Call 911 in an emergency.</p>
          ${items}
        </div>`
}

const disclaimer = `      <p class="meta-line" style="margin-top:28px">SobrCircle is an independent app by Moradi Labs Inc. and is not affiliated with, endorsed by, or operated by Alcoholics Anonymous World Services, Inc., Narcotics Anonymous World Services, Inc., Cocaine Anonymous World Services, Inc., or any 12 step fellowship. Fellowship names are used only to describe the meetings listed. Meeting details come from public listings and can change, so please confirm with the group or local office before you go.</p>`

function cityChips(list: City[]) {
  return `<div class="pg-chips">
${list.map((c) => `          <a href="/meetings/${c.slug}/">${esc(c.name)}</a>`).join('\n')}
        </div>`
}

function fellowshipChips(list: Fellowship[], place?: string) {
  return `<div class="pg-chips">
${list.map((f) => `          <a href="/meetings/${f.slug}/">${esc(f.label)} meetings${place ? '' : ' near you'}</a>`).join('\n')}
        </div>`
}

// ── pages ────────────────────────────────────────────────────────────────

function hubPage() {
  const faq: Array<[string, string]> = [
    [
      'How do I find a recovery meeting near me?',
      `Download SobrCircle on iPhone or Android and open the map. It shows ${MEETING_COUNT} meetings, including AA, NA and CA meetings, with their times and live navigation from where you are.`,
    ],
    [
      'Are recovery meetings free?',
      'Yes. AA, NA and CA meetings have no dues or fees. Groups pass a basket for voluntary contributions, and newcomers are never expected to give.',
    ],
    [
      'What is the difference between an open and a closed meeting?',
      'Open meetings welcome anyone, including family, friends and people who are curious. Closed meetings are for people who have, or think they may have, a problem with alcohol or drugs.',
    ],
    [
      'Do I have to talk at my first meeting?',
      'No. You can sit, listen and leave whenever you like. Many people say they are new at the start so others can welcome them, but it is always your choice.',
    ],
    [
      'Is SobrCircle part of AA or NA?',
      'No. SobrCircle is an independent app built by someone in recovery. It helps you find meetings run by many different groups and stay connected to the people you choose.',
    ],
  ]
  const body = `
      <header class="pg-hero pg-hero--phone">
        <div class="pg-hero-copy">
${crumbs([['Home', '/'], ['Find Meetings']])}
        <p class="eyebrow">Meeting finder</p>
        <h1>Find recovery meetings near you</h1>
        <p class="lede">SobrCircle puts ${MEETING_COUNT} meetings on one map, including AA, NA and Cocaine Anonymous meetings, with their times and live navigation to the door. Built by someone who needed it.</p>
        ${badges('meetings')}
        </div>
${heroPhone()}
      </header>

      <section class="pg-section">
        <h2>Meetings by type</h2>
        <div class="pg-grid">
${fellowships
  .map(
    (f) => `          <a class="pg-card" href="/meetings/${f.slug}/">
            <p class="pg-kind">${esc(f.short)}</p>
            <h3>${esc(f.name)} meetings</h3>
            <p>${esc(f.blurb)}</p>
          </a>`,
  )
  .join('\n')}
        </div>
      </section>

      <section class="pg-section">
        <h2>Meetings by city</h2>
        <p>Local meeting directories and help lines, city by city.</p>
        ${cityChips(cities)}
      </section>

      <section class="pg-section">
        <h2>How it works</h2>
${howItWorks()}
${appFeatures()}
      </section>

${faqHtml(faq)}

${getApp('meetings')}

${crisisCallout([])}
${disclaimer}
`
  return page({
    path: '/meetings/',
    nav: 'meetings',
    title: 'Find AA, NA and 12 Step Meetings Near You: Meeting Finder App',
    description: `Find AA, NA and Cocaine Anonymous meetings near you tonight. SobrCircle maps ${MEETING_COUNT} meetings with live navigation to the door. Free to download.`,
    body,
    jsonLd: [appLd, crumbsLd([['Home', '/'], ['Find Meetings', '/meetings/']]), faqLd(faq)],
  })
}

function fellowshipPage(f: Fellowship) {
  const body = `
      <header class="pg-hero pg-hero--phone">
        <div class="pg-hero-copy">
${crumbs([['Home', '/'], ['Find Meetings', '/meetings/'], [`${f.label} meetings`]])}
        <p class="eyebrow">${esc(f.name)}</p>
        <h1>${esc(f.h1)}</h1>
        <p class="lede">${esc(f.lede)}</p>
        ${badges(`meetings-${f.slug}`)}
        </div>
${heroPhone()}
      </header>

      <section class="pg-section">
        <h2>What ${esc(f.short)} meetings are</h2>
${f.about.map((p) => `        <p>${esc(p)}</p>`).join('\n')}
      </section>

      <section class="pg-section">
        <h2>Kinds of ${esc(f.short)} meetings</h2>
        <ul class="pg-features">
${f.formats.map(([t, d]) => `          <li><strong>${esc(t)}.</strong> ${esc(d)}</li>`).join('\n')}
        </ul>
      </section>

      <section class="pg-section">
        <h2>Find ${esc(f.label)} meetings with SobrCircle</h2>
${howItWorks()}
${appFeatures()}
      </section>

      <section class="pg-section">
        <h2>Official ${esc(f.short)} resources</h2>
        <p>${esc(f.name)} also runs its own meeting search. These are its official sites.</p>
        <div class="pg-grid">
${f.official.map((r) => resourceCard(r, f.short)).join('\n')}
        </div>
      </section>

      <section class="pg-section">
        <h2>${esc(f.short)} meetings by city</h2>
        ${cityChips(cities)}
      </section>

${faqHtml(f.faq)}

${getApp(`meetings-${f.slug}`)}

${crisisCallout([])}
${disclaimer}
`
  return page({
    path: `/meetings/${f.slug}/`,
    nav: 'meetings',
    title: f.title,
    description: f.description,
    body,
    jsonLd: [
      crumbsLd([
        ['Home', '/'],
        ['Find Meetings', '/meetings/'],
        [`${f.label} meetings`, `/meetings/${f.slug}/`],
      ]),
      faqLd(f.faq),
    ],
  })
}

function cityPage(c: City) {
  const place = c.name
  const full = `${c.name}, ${c.region}`
  const local: string[] = []
  if (c.aa) local.push(resourceCard(c.aa, 'AA'))
  if (c.na) local.push(resourceCard(c.na, 'NA'))
  if (c.ca) local.push(resourceCard(c.ca, 'CA'))
  if (c.alanon) local.push(resourceCard(c.alanon, 'Families'))
  for (const o of c.other ?? []) local.push(resourceCard(o, o.kind ?? 'Other'))

  const nearby = cities.filter((x) => c.nearby?.includes(x.slug))
  const others = nearby.length ? nearby : cities.filter((x) => x.slug !== c.slug && x.country === c.country).slice(0, 6)

  const faq: Array<[string, string]> = [
    [
      `Where can I find AA meetings in ${place} tonight?`,
      `Open SobrCircle and the map shows meetings around ${place} with their times and live navigation. You can also check the local AA directory listed on this page${c.aa?.phone ? ` or call ${c.aa.phone}` : ''}.`,
    ],
    [
      `Are there NA and Cocaine Anonymous meetings in ${place}?`,
      `${c.na ? `Yes. NA meetings in the area are listed by ${c.na.name}` : 'NA meetings are listed in the app'}${c.ca ? `, and CA meetings by ${c.ca.name}` : ''}. SobrCircle shows them alongside AA meetings on one map.`,
    ],
    [
      `Do recovery meetings in ${place} cost anything?`,
      'No. Meetings are free to attend. Groups may pass a basket for voluntary contributions, and newcomers are never expected to give.',
    ],
    [
      'Can I go to a meeting if I just want to listen?',
      'Yes. Look for an open meeting, which anyone can attend. You never have to speak, and you can leave whenever you like.',
    ],
  ]

  const body = `
      <header class="pg-hero pg-hero--phone">
        <div class="pg-hero-copy">
${crumbs([['Home', '/'], ['Find Meetings', '/meetings/'], [place]])}
        <p class="eyebrow">${esc(full)}</p>
        <h1>Recovery meetings in ${esc(place)}</h1>
        <p class="lede">${esc(c.lede ?? `Find AA, NA and Cocaine Anonymous meetings in ${place} tonight. SobrCircle maps the meetings around you with their times and live navigation to the door. Free to download on iPhone and Android.`)}</p>
        ${badges(`city-${c.slug}`)}
        </div>
${heroPhone()}
      </header>

      <section class="pg-section">
        <h2>Find a meeting in ${esc(place)} with SobrCircle</h2>
${howItWorks(place)}
${appFeatures()}
      </section>

${
  local.length
    ? `      <section class="pg-section">
        <h2>Local meeting directories</h2>
        <p>These local offices and groups keep their own ${esc(place)} meeting lists and phone lines.${c.note ? ` ${esc(c.note)}` : ''}</p>
        <div class="pg-grid">
${local.join('\n')}
        </div>
      </section>`
    : ''
}

      <section class="pg-section">
        <h2>Meetings by type</h2>
        ${fellowshipChips(fellowships, place)}
      </section>

${faqHtml(faq)}

${getApp(`city-${c.slug}`, place)}

${crisisCallout(c.helplines ?? [])}

      <section class="pg-section" style="margin-top:34px">
        <h2>Meetings in other cities</h2>
        ${cityChips(others)}
      </section>
${disclaimer}
`
  return page({
    path: `/meetings/${c.slug}/`,
    nav: 'meetings',
    title: `AA and NA Meetings in ${full}: Find a Meeting Tonight`.length > 64
      ? `AA and NA Meetings in ${full} Tonight`
      : `AA and NA Meetings in ${full}: Find a Meeting Tonight`,
    description: `Find AA, NA and Cocaine Anonymous meetings in ${place} tonight. Local meeting directories, help lines, and an app with live navigation to meetings near you.`,
    body,
    jsonLd: [
      crumbsLd([
        ['Home', '/'],
        ['Find Meetings', '/meetings/'],
        [place, `/meetings/${c.slug}/`],
      ]),
      faqLd(faq),
    ],
  })
}

function phoneFigure(src: string, alt: string, caption: string) {
  return `        <figure class="pg-phone">
          <div class="pg-phone-shell"><img src="${src}" alt="${esc(alt)}" width="900" height="1955" fetchpriority="high"></div>
          <figcaption>${esc(caption)}</figcaption>
        </figure>`
}

function relatedChips(list: Array<[string, string]>) {
  return `<div class="pg-chips">
${list.map(([href, label]) => `          <a href="${href}">${esc(label)}</a>`).join('\n')}
        </div>`
}

function topicPage(t: Topic) {
  const body = `
      <header class="pg-hero pg-hero--phone">
        <div class="pg-hero-copy">
${crumbs([['Home', '/'], [t.eyebrow]])}
        <p class="eyebrow">${esc(t.eyebrow)}</p>
        <h1>${esc(t.h1)}</h1>
        <p class="lede">${esc(t.lede)}</p>
        ${badges(t.slug)}
        </div>
${phoneFigure(t.phone.src, t.phone.alt, t.phone.caption)}
      </header>

${t.sections
  .map(
    (sec) => `      <section class="pg-section">
        <h2>${esc(sec.h2)}</h2>
${(sec.paragraphs ?? []).map((p) => `        <p>${esc(p)}</p>`).join('\n')}
${sec.points ? `        <ul class="pg-features">\n${sec.points.map(([a, b]) => `          <li><strong>${esc(a)}.</strong> ${esc(b)}</li>`).join('\n')}\n        </ul>` : ''}
      </section>`,
  )
  .join('\n\n')}

${faqHtml(t.faq)}

${getApp(t.slug, undefined, esc(t.getApp))}

      <section class="pg-section">
        <h2>Keep exploring</h2>
        ${relatedChips(t.related)}
      </section>

${crisisCallout([])}
${t.note ? `      <p class="meta-line" style="margin-top:28px">${esc(t.note)}</p>` : ''}
`
  return page({
    path: `/${t.slug}/`,
    title: t.title,
    description: t.description,
    body,
    jsonLd: [appLd, crumbsLd([['Home', '/'], [t.eyebrow, `/${t.slug}/`]]), faqLd(t.faq)],
  })
}

function calculatorPage() {
  const faq: Array<[string, string]> = [
    [
      'How do I calculate how many days sober I am?',
      'Count the full days from your sobriety date to today. Enter your date above and the calculator does it for you, with years, months, weeks and hours.',
    ],
    [
      'Does my sobriety date count as day one?',
      'This calculator counts full days since your sobriety date, so the day after your sobriety date is day one. Some people count differently, and either way is fine.',
    ],
    ['What are the common sobriety milestones?', `SobrCircle celebrates ${MILESTONES}.`],
    [
      'Is my date saved anywhere?',
      'No. The calculator runs entirely in your browser and your date never leaves your device. To keep counting every day, download SobrCircle.',
    ],
  ]
  const body = `
      <header class="pg-hero">
${crumbs([['Home', '/'], ['Sobriety calculator']])}
        <p class="eyebrow">Free tool</p>
        <h1>Sobriety calculator: how many days sober are you?</h1>
        <p class="lede">Enter your sobriety date to see your days, months and years sober, and how long until your next milestone. Private, free and instant.</p>
      </header>

      <section class="sc-tool" aria-label="Sobriety calculator">
        <form id="sc-form" class="sc-form">
          <label for="sc-date">Your sobriety date</label>
          <div class="sc-row">
            <input id="sc-date" name="date" type="date" required>
            <button type="submit" class="button-primary">Calculate</button>
          </div>
        </form>
        <div id="sc-result" class="sc-result" aria-live="polite"><p>Pick your sobriety date to see your time.</p></div>
      </section>

      <section class="pg-section pg-getapp" id="get-app">
        <h2>Keep counting with SobrCircle</h2>
        <p>The SobrCircle app keeps this count for you every day, shows your next milestone, and lets your circle celebrate with you when you get there.</p>
        ${badges('calculator')}
        <p style="margin-top:14px"><a href="/sobriety-tracker/">See how the sobriety tracker works</a></p>
      </section>

      <section class="pg-section">
        <h2>Sobriety milestones</h2>
        <p>Every milestone gets a badge in SobrCircle: ${esc(MILESTONES)}. The first year is marked month by month because those are the days that take the most.</p>
      </section>

${faqHtml(faq)}

${crisisCallout([])}
    <script src="/tools/sobriety-calculator.js?v=${CSS_VERSION}" defer></script>
`
  return page({
    path: '/sobriety-calculator/',
    title: 'Sobriety Calculator: How Many Days Sober Am I?',
    description:
      'Free sobriety calculator. Enter your sobriety date to see your days, months and years sober and your next milestone. Private, runs on your device.',
    body,
    jsonLd: [
      crumbsLd([['Home', '/'], ['Sobriety calculator', '/sobriety-calculator/']]),
      faqLd(faq),
      {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Sobriety Calculator',
        url: `${SITE}/sobriety-calculator/`,
        applicationCategory: 'HealthApplication',
        operatingSystem: 'Any',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'CAD' },
        isAccessibleForFree: true,
      },
    ],
  })
}

function followPage() {
  const body = `
      <header class="pg-hero">
${crumbs([['Home', '/'], ['Follow']])}
        <p class="eyebrow">Follow SobrCircle</p>
        <h1>Daily motivation, wherever you scroll</h1>
        <p class="lede">Short videos from founder Ben Moradi, posted daily. Real talk, one hard truth at a time, plus the Left on Read series. Pick your platform.</p>
      </header>

      <section class="pg-socials" aria-label="SobrCircle social profiles">
${socials
  .map(
    (s) => `        <a class="pg-social" href="${s.url}" rel="me noopener">
          ${icon(s.id, 26)}
          <span><span class="pg-social-name">${esc(s.name)}</span><span class="pg-social-handle">${esc(s.handle)}</span></span>
          <span class="pg-social-arrow" aria-hidden="true">&rarr;</span>
        </a>`,
  )
  .join('\n')}
      </section>

      <section class="pg-section" id="get-app" style="margin-top:34px">
        <h2>Get the app</h2>
        <p>The conversation keeps going in SobrCircle: your circle, daily check ins, a private journal and ${MEETING_COUNT} meetings on one map. Free to download on iPhone and Android.</p>
        ${badges('follow')}
      </section>
`
  return page({
    path: '/follow/',
    nav: 'follow',
    title: 'Follow SobrCircle: Instagram, TikTok, YouTube, Threads, Snapchat',
    description:
      'Daily motivation videos from SobrCircle founder Ben Moradi. Follow on Instagram, TikTok, YouTube, Threads, Facebook and Snapchat.',
    body,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        '@id': `${SITE}/#org`,
        name: 'SobrCircle',
        legalName: 'Moradi Labs Inc.',
        url: `${SITE}/`,
        logo: `${SITE}/apple-touch-icon.png`,
        sameAs: socials.map((s) => s.url),
      },
    ],
  })
}

function notFoundPage() {
  const body = `
      <header class="pg-hero">
        <p class="eyebrow">404</p>
        <h1>This page isn't here</h1>
        <p class="lede">The link may be old or mistyped. Here's where most people are headed.</p>
        <div class="pg-chips">
          <a href="/">SobrCircle home</a>
          <a href="/meetings/">Find meetings near you</a>
          <a href="/follow/">Follow SobrCircle</a>
          <a href="/twentyfour/">Twenty Four</a>
          <a href="/support/">Support</a>
        </div>
      </header>

${getApp('404')}
`
  return page({
    path: '/404',
    title: 'Page not found | SobrCircle',
    description: 'This page could not be found. Find recovery meetings near you, follow SobrCircle, or head back to the SobrCircle home page.',
    body,
    noindex: true,
  })
}

// ── sitemap & llms.txt ───────────────────────────────────────────────────

function sitemap() {
  const shareable = bookPages.filter(
    (p) =>
      p.type === 'poem' ||
      p.type === 'chapter' ||
      (p.type === 'prose' && ['note', 'dedication', 'acknowledgements', 'about'].includes(p.id)) ||
      p.type === 'closing',
  )
  const urls: Array<[string, string]> = [
    ['/', '1.0'],
    ['/meetings/', '0.9'],
    ...fellowships.map((f) => [`/meetings/${f.slug}/`, '0.8'] as [string, string]),
    ...cities.map((c) => [`/meetings/${c.slug}/`, '0.8'] as [string, string]),
    ...topics.map((t) => [`/${t.slug}/`, '0.9'] as [string, string]),
    ['/sobriety-calculator/', '0.9'],
    ['/follow/', '0.6'],
    ['/twentyfour/', '0.7'],
    ...shareable.map((p) => [`/twentyfour/${p.id}/`, '0.4'] as [string, string]),
    ['/support/', '0.3'],
    ['/privacy/', '0.2'],
    ['/terms/', '0.2'],
    ['/child-safety-standards/', '0.2'],
    ['/delete-account/', '0.2'],
  ]
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(([p, pr]) => `  <url>\n    <loc>${SITE}${p}</loc>\n    <lastmod>${TODAY}</lastmod>\n    <priority>${pr}</priority>\n  </url>`)
  .join('\n')}
</urlset>
`
}

function llms() {
  return `# SobrCircle

> SobrCircle (pronounced "sober circle"; also written Sobr Circle) is a private recovery community app for iPhone and Android, free to download, built in Windsor, Ontario by Ben Moradi, who is in recovery himself. It includes a meeting finder with ${MEETING_COUNT} recovery meetings, including AA, NA and CA, on a map with meeting times and live navigation by car, foot, bike or transit, a private circle of people you invite with a 6-character code, public and private rooms, group chats, community events and members near you, daily check ins and a private journal. There are no ads and user data is not sold. Tracking, meetings, one to one messages and joining rooms and events are free; creating rooms and events is part of the paid SobrCircle Supporter plan. SobrCircle is independent and not affiliated with any 12-step fellowship.

- App Store: ${APP_STORE_URL}
- Google Play: ${PLAY_STORE_URL}

## Meeting finder
- [Find recovery meetings near you](${SITE}/meetings/)
${fellowships.map((f) => `- [${f.name} meetings](${SITE}/meetings/${f.slug}/)`).join('\n')}
${cities.map((c) => `- [Recovery meetings in ${c.name}, ${c.region}](${SITE}/meetings/${c.slug}/)`).join('\n')}

## Features
${topics.map((t) => `- [${t.eyebrow}](${SITE}/${t.slug}/): ${t.description}`).join('\n')}
- [Sobriety calculator](${SITE}/sobriety-calculator/): free tool to count days sober and see the next milestone.

## About
- [Home and founder story](${SITE}/)
- [Twenty Four, the founder's poetry memoir](${SITE}/twentyfour/)
- [Follow SobrCircle](${SITE}/follow/)
- [Support](${SITE}/support/)
`
}

// ── write ────────────────────────────────────────────────────────────────

async function write(rel: string, content: string) {
  const file = path.join(PUBLIC, rel)
  await fs.mkdir(path.dirname(file), { recursive: true })
  await fs.writeFile(file, content)
}

async function main() {
  // Clear old generated meeting pages so a removed city does not linger.
  await fs.rm(path.join(PUBLIC, 'meetings'), { recursive: true, force: true })

  await write('meetings/index.html', hubPage())
  for (const f of fellowships) await write(`meetings/${f.slug}/index.html`, fellowshipPage(f))
  for (const c of cities) await write(`meetings/${c.slug}/index.html`, cityPage(c))
  for (const t of topics) {
    await fs.rm(path.join(PUBLIC, t.slug), { recursive: true, force: true })
    await write(`${t.slug}/index.html`, topicPage(t))
  }
  await write('sobriety-calculator/index.html', calculatorPage())
  await write('follow/index.html', followPage())
  await write('404.html', notFoundPage())
  await write('sitemap.xml', sitemap())
  await write('llms.txt', llms())

  console.log(`[pages] wrote meetings hub, ${fellowships.length} fellowship pages, ${cities.length} city pages, follow, 404, sitemap, llms.txt`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
