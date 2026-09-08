/**
 * Same-origin media proxy for the Lisa & Dale gallery.
 *
 * Everything heavy (the film, the full-resolution photographs) lives in an R2
 * bucket rather than the Pages build, because Cloudflare Pages refuses any
 * single file over 25 MiB. Serving it back through this Function keeps the
 * media on sobrcircle.com itself, which matters for two reasons:
 *
 *   1. `<a download>` only reliably saves a file on iOS Safari when the URL is
 *      same-origin. A media subdomain would break tap-to-save on the phones
 *      most of these guests will actually use.
 *   2. The site's CSP is `default-src 'self'` — same-origin media needs no
 *      loosening of the security headers the rest of sobrcircle.com relies on.
 *
 * Note: Pages does NOT apply public/_headers to Function responses, so the
 * security and robots headers are set explicitly here.
 */

interface Env {
  MEDIA: R2Bucket
}

/** Fallback when an object was uploaded without contentType metadata — without
 *  a correct video/* type the film silently fails to play in Safari. */
const CONTENT_TYPES: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  avif: 'image/avif',
  mp4: 'video/mp4',
  mov: 'video/quicktime',
  m4v: 'video/x-m4v',
  webm: 'video/webm',
  zip: 'application/zip',
}

const handler: PagesFunction<Env> = async ({ request, env, params }) => {
  const raw = params.path
  const key = (Array.isArray(raw) ? raw.join('/') : String(raw ?? '')).replace(/^\/+/, '')

  // Refuse traversal and empty keys outright.
  if (!key || key.includes('..')) {
    return new Response('Not found', { status: 404 })
  }

  // Until the R2 binding exists on the Pages project, fail loudly and
  // legibly rather than throwing an opaque 500 on every photograph.
  if (!env.MEDIA) {
    return new Response('Media storage is not configured yet.', {
      status: 503,
      headers: { 'content-type': 'text/plain; charset=utf-8' },
    })
  }

  const url = new URL(request.url)
  const wantsDownload = url.searchParams.has('download')
  const rangeHeader = request.headers.get('range')

  // Passing the request Headers lets R2 resolve both Range and conditional
  // (If-None-Match / If-Modified-Since) requests for us.
  const object = await env.MEDIA.get(key, {
    range: request.headers,
    onlyIf: request.headers,
  })

  if (object === null) {
    return new Response('Not found', { status: 404 })
  }

  const headers = new Headers()
  object.writeHttpMetadata(headers)
  headers.set('etag', object.httpEtag)
  headers.set('accept-ranges', 'bytes')
  headers.set('cache-control', 'public, max-age=31536000, immutable')
  headers.set('x-content-type-options', 'nosniff')
  headers.set('x-robots-tag', 'noindex, nofollow, noimageindex')

  if (!headers.has('content-type')) {
    const ext = key.split('.').pop()?.toLowerCase() ?? ''
    headers.set('content-type', CONTENT_TYPES[ext] ?? 'application/octet-stream')
  }

  // A guest saving 47 photographs should not end up with 001.jpg…047.jpg in
  // their downloads folder. The page passes a friendlier name; sanitise it
  // hard, since it arrives from the query string.
  const requested = url.searchParams.get('filename')
  const safeRequested =
    requested && /^[A-Za-z0-9._-]{1,120}$/.test(requested) && !requested.includes('..')
      ? requested
      : null
  const filename = safeRequested ?? key.split('/').pop() ?? 'download'

  if (wantsDownload) {
    // Server-driven download is the one approach that behaves the same on
    // desktop, Android, and iOS — no blob juggling, no popup blockers.
    const ascii = filename.replace(/[^\x20-\x7e]/g, '_').replace(/"/g, '')
    headers.set(
      'content-disposition',
      `attachment; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(filename)}`
    )
  } else {
    headers.set('content-disposition', 'inline')
  }

  // A conditional request that matched returns an R2Object with no body.
  if (!('body' in object) || object.body === null) {
    return new Response(null, { status: 304, headers })
  }

  // Resolve the served range so video scrubbing gets a correct 206.
  const range = object.range as
    | { offset?: number; length?: number; suffix?: number }
    | undefined

  if (rangeHeader && range) {
    const offset = range.offset ?? (range.suffix ? object.size - range.suffix : 0)
    const length = range.length ?? object.size - offset
    headers.set('content-range', `bytes ${offset}-${offset + length - 1}/${object.size}`)
    headers.set('content-length', String(length))
    return new Response(object.body, { status: 206, headers })
  }

  headers.set('content-length', String(object.size))
  return new Response(object.body, { status: 200, headers })
}

export const onRequestGet = handler
/** Pages routes by method, so without this a HEAD falls through to the static
 *  asset server and answers with the 404 page instead of the object's headers.
 *  The runtime drops the body for HEAD on its own. */
export const onRequestHead = handler
