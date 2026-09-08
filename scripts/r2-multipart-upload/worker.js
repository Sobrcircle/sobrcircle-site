/**
 * Throwaway multipart uploader. Exists only because `wrangler r2 object put`
 * refuses anything over 300 MiB and the film is 404 MiB. Run via
 * `wrangler dev --remote`, which executes on Cloudflare's edge with the real
 * R2 binding but is reachable only through the authenticated local session —
 * so this is never a publicly deployed endpoint.
 */
export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const key = url.searchParams.get('key')
    if (!key) return new Response('key required', { status: 400 })

    try {
      if (url.pathname === '/begin') {
        const mpu = await env.MEDIA.createMultipartUpload(key, {
          httpMetadata: { contentType: url.searchParams.get('ct') || 'application/octet-stream' },
        })
        return Response.json({ uploadId: mpu.uploadId })
      }

      if (url.pathname === '/part') {
        const mpu = env.MEDIA.resumeMultipartUpload(key, url.searchParams.get('uploadId'))
        // Buffer rather than stream: uploadPart needs a known length, and a
        // 20 MiB part sits comfortably inside the Worker's 128 MiB budget.
        const body = await request.arrayBuffer()
        const part = await mpu.uploadPart(Number(url.searchParams.get('part')), body)
        return Response.json(part)
      }

      if (url.pathname === '/complete') {
        const mpu = env.MEDIA.resumeMultipartUpload(key, url.searchParams.get('uploadId'))
        const obj = await mpu.complete(await request.json())
        return Response.json({ size: obj.size, etag: obj.httpEtag })
      }
    } catch (e) {
      return new Response(`ERR ${e.message}`, { status: 500 })
    }
    return new Response('not found', { status: 404 })
  },
}
