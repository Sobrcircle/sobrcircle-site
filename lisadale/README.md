# /lisadale — Lisa & Dale wedding gallery

An unlisted gallery living inside sobrcircle.com, built the same way as
`/twentyfour`: a separate Vite entry point with its own theme, sharing this
repo, this domain, and this deploy. No second site, no second host.

## Where things are

| Path | What |
| --- | --- |
| `lisadale/index.html` | Entry point (registered in `vite.config.ts`) |
| `src/lisadale/` | The story page — components, styles, reveal hook |
| `lisadale/gallery/` | The full gallery, its own entry point |
| `src/lisadale/components/JustifiedGrid.tsx` | Row-packing layout engine |
| `src/lisadale/data/gallery.ts` | **The only file you edit to change photos** |
| `functions/lisadale/media/[[path]].ts` | R2 proxy (video + full-res downloads) |
| `public/lisadale/fonts/` | Self-hosted Cormorant Garamond + Parisienne |
| `public/_routes.json` | Restricts the Function to `/lisadale/media/*` |
| `scripts/grade_photos.py` | Batch colour grade (Pillow, **not** ffmpeg) |

## Why media is not in this repo

Cloudflare Pages rejects any single file over **25 MiB**, so the film can't be
a build asset. It lives in an R2 bucket and is served back *same-origin*
through the Function — which matters because `<a download>` only reliably
saves a file on iOS Safari when the URL is same-origin, and because the site's
CSP is `default-src 'self'`. Same-origin means no CSP changes at all.

## One-time setup

```bash
# 1. Create the bucket
npx wrangler r2 bucket create lisadale-media
```

2. Bind it to the Pages project: **Cloudflare dashboard → Workers & Pages →
   (this project) → Settings → Functions → R2 bucket bindings**
   Variable name `MEDIA` → bucket `lisadale-media`.
   Until this exists, `/lisadale/media/*` returns a 503 explaining why.

### 3. Upload the film — remuxed, not re-encoded

The film is **never re-encoded**. But it does need one lossless change first.

The original is `WeddingLisaDale.MOV` — HEVC video, AAC audio, 1080p60,
16.4 Mbps, 3:26, 404 MB. HEVC itself is fine in browsers, but the **QuickTime
container is not**: `video.canPlayType('video/quicktime')` returns `""` in
Chromium. A `.MOV` simply will not play in a web page.

The fix changes the wrapper and nothing else:

```bash
ffmpeg -i WeddingLisaDale.MOV -c copy -tag:v hvc1 \
  -movflags +faststart lisa-dale-film.mp4
```

`-c copy` copies the encoded streams through untouched — verified:

```
video  source MD5 3727223ef0e1eb48f00b083f5efc183d  ==  remuxed  (identical)
audio  source MD5 60146343a49d6eba6d9674b15d06351d  ==  remuxed  (identical)
```

Not one frame is altered; the file grows 141 KB for the MP4 wrapper.
`+faststart` moves the index to the front so playback can begin before the
whole file downloads — essential when the file is 404 MB.

This single file is both what streams on the page and what people download,
so the download is the full-quality original.

**Caveat:** HEVC plays in Safari (every iPhone and Mac) and in Chrome on
hardware-capable machines, but **not in Firefox on macOS**. If universal
playback matters more than a single file, add an H.264 companion for the
player and keep this one as the download.

Poster frame, also without touching the film:

```bash
ffmpeg -ss 8 -i WeddingLisaDale.MOV -frames:v 1 -q:v 2 poster-raw.jpg
```

Then grade it to match the gallery, and upload:

```bash
rclone copy ./lisa-dale-film.mp4 r2:lisadale-media/film/ --progress
rclone copy ./poster.jpg         r2:lisadale-media/film/ --progress
```

`wrangler r2 object put` does a **single-part** upload and is not reliable at
404 MB — use the S3-compatible endpoint (rclone/aws-cli), which does multipart.

### 4. Upload the photographs

```bash
for f in graded/web/*.jpg; do
  npx wrangler r2 object put "lisadale-media/photos/web/$(basename "$f")" \
    --file "$f" --content-type image/jpeg
done
for f in graded/full/*.jpg; do
  npx wrangler r2 object put "lisadale-media/photos/full/$(basename "$f")" \
    --file "$f" --content-type image/jpeg
done
```

`--content-type` matters: an object stored without one is served as
`application/octet-stream` and the film silently refuses to play in Safari.

## Colour grading

One look across every frame is what makes the set read as a single body of
work. The look is **radiant**, matched to reference photographs the couple
supplied — bright and glowing but *punchy*:

- **halation** — highlights are isolated, blurred and screened back with a warm
  tint, so light bleeds around bright edges. This is the "angelic" glow; a
  plain blurred-and-screened copy just hazes the whole frame instead.
- **bloom before curve** — the S-curve runs *after* the glow, restoring the
  contrast the glow ate. Blacks stay black while highlights bloom.
- **vibrance, not saturation** — scaled by (1 − S), so muted greens and sky
  gain while already-saturated skin barely moves. Flat saturation pushed a
  sunburned face redder.

An earlier attempt used a matte film emulation (lifted blacks, saturation and
contrast pulled *down*). It read as flat and was rejected. It survives as
`matte-old` only for comparison — do not ship it.

Compare looks on any photo before committing:

```bash
node scripts/grade-lisadale.mjs --contact ~/wedding/selects/DSC0142.jpg
```

Then grade the whole set (`ivory` is the Syl Haus-matched default):

```bash
python3 scripts/grade_photos.py --in ~/Desktop/lisadale --out ./graded --look angelic
```

Writes `graded/web/` (long edge 2400, for the grid) and `graded/full/`
(**original resolution, maximum JPEG quality, 4:4:4 chroma** — no subsampling,
so skin tone and fine gold detail survive), numbered `001.jpg`, `002.jpg`, …
in filename order — so name the source files in the order guests should
scroll.

The film is not an input to this script and is never processed by it.

## Local development

```bash
npm run dev            # http://localhost:5173/lisadale/
```

`vite dev` has no R2 binding, so the manifest falls back to
`public/lisadale/preview/` (gitignored placeholders). To exercise the real
Function and R2 locally:

```bash
npm run build && npx wrangler pages dev dist
```

## Staying unlisted

Four things keep this out of search results. Keep all four:

1. `noindex, nofollow, noarchive, noimageindex` in `lisadale/index.html`
2. `X-Robots-Tag` on `/lisadale/*` in `public/_headers`
3. The Function sets `X-Robots-Tag` itself (Pages does **not** apply
   `_headers` to Function responses)
4. **Not** listed in `public/sitemap.xml`, and not linked from the main site

This is unlisted, not access-controlled: anyone with the link can view and
download. That's the normal trade-off for a wedding gallery, but it is a
deliberate choice, not an oversight.

## Why the grading script does not use ffmpeg

ffmpeg fails on these photographs in two ways, both silent — no error, no
warning, just wrong output. Both were caught by testing, not by reading docs:

1. **It decodes iPhone `.HEIC` at 896x1024** — the embedded preview, not the
   8064x6048 original. `sips` reads the same file correctly. Grading through
   ffmpeg would have thrown away 98% of every photograph.
2. **Encoding a 48 MP TIFF to JPEG it writes a completely black file**, and
   transposes the dimensions, with no filters applied at all.

So `sips` decodes (it is also the only tool here that reads HEIC correctly)
and **Pillow** grades and encodes. `grade_photos.py` additionally checks every
decoded image against the source dimensions and aborts rather than write a
degraded photograph — comparing them unordered, since `sips` reports *stored*
dimensions while its TIFF conversion applies EXIF rotation, so portrait frames
legitimately come back transposed.

ffmpeg is still the right tool for the film. It is not the right tool for
these stills.

## The set, as delivered

47 photographs — 43 HEIC + 4 JPEG — graded with the **angelic** look.

| | |
| --- | --- |
| Orientation | 39 portrait, 8 landscape (the landscape frames become the wide tiles) |
| Order | iPhone filenames sort chronologically, so the scroll follows the day |
| `web/` | long edge 2400, quality 90 — 57 MB total |
| `full/` | native resolution (up to 8064x6048), quality 95, 4:4:4 — 553 MB total |

553 MB is also the size of the "download every photo" zip. That is a lot to
pull down on a phone; if it matters, build the zip from a 4000px edition
instead and leave the per-photo downloads at full resolution.
