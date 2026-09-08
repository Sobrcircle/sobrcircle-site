/**
 * Gallery manifest.
 *
 * Media itself is not in this repo — it lives in the R2 bucket bound to the
 * Pages project as MEDIA, and is served same-origin through
 * functions/lisadale/media/[[path]].ts. This file is the only thing you edit
 * when photographs are added, removed, or reordered.
 *
 * Expected bucket layout:
 *   photos/web/<id>.jpg     display copy   (long edge 2400, graded)
 *   photos/full/<id>.jpg    download copy  (full resolution, graded, max quality)
 *   film/<FILM_FILE>        THE ORIGINAL FILM — never re-encoded
 *   film/poster.jpg         poster frame
 *   lisa-and-dale-photos.zip        every photograph, one download
 */

/** `vite dev` has no R2 binding, so local previews read from
 *  public/lisadale/preview/ instead of the Function. */
const BASE = import.meta.env.DEV ? '/lisadale/preview' : '/lisadale/media'

/**
 * Bump this whenever the media in the bucket is replaced.
 *
 * Objects are served `immutable, max-age=31536000`, which is right for
 * performance but means an edge cache will happily serve a year-old copy of a
 * path that has not changed name. Regrading every photograph did exactly that:
 * the new files were in R2 and the old ones were still on screen. The version
 * is part of the cache key, so bumping it is what actually ships new pixels.
 */
const V = '2'

/** The film is uploaded exactly as exported — no re-encode, no compression.
 *  Change this to the real filename; the extension must match the file, since
 *  the proxy infers Content-Type from it when R2 has no stored type. */
const FILM_FILE = 'lisa-dale-film.mp4'

export const media = {
  /** Display copy shown in the grid and lightbox. */
  photo: (id: string) => `${BASE}/photos/web/${id}.jpg?v=${V}`,
  /** Full-resolution copy, forced to save rather than open. */
  photoDownload: (id: string) =>
    `${BASE}/photos/full/${id}.jpg?v=${V}&download=1&filename=lisa-and-dale-${id}.jpg`,
  /** Streamed and downloaded from the same untouched original. */
  film: `${BASE}/film/${FILM_FILE}?v=${V}`,
  filmPoster: `${BASE}/film/poster.jpg?v=${V}`,
  filmDownload: `${BASE}/film/${FILM_FILE}?v=${V}&download=1&filename=Lisa-and-Dale-Wedding-Film.mp4`,
  allPhotos: `${BASE}/lisa-and-dale-photos.zip?v=${V}&download=1&filename=Lisa-and-Dale-Photographs.zip`,
}

/** The frame behind the title: the two of them on the rock in the last of the
 *  sun. Chosen by Lisa and Dale. The halation in this frame does the most
 *  work of any in the set, and the title lands on rock rather than on them. */
export const HERO_ID = '047'

/** A spread across the day for the front page — the full set lives at
 *  /lisadale/gallery so the story page doesn't end in an endless scroll. */
export const PREVIEW_IDS = ['003', '011', '019', '024', '031', '040', '046', '047']

export interface Photo {
  /** Filename stem in the bucket. */
  id: string
  /** Alt text — real descriptions, not "wedding photo 4". */
  alt: string
  /** Intrinsic size of the display copy. The justified layout needs the real
   *  aspect ratio to place a frame without cropping it. */
  w: number
  h: number
}

/**
 * The 47 photographs, in the order they were taken — the iPhone filenames sort
 * chronologically, so the gallery follows the day.
 */
export const photos: Photo[] = [
  { id: '001', alt: 'Lisa and Dale together on the shoreline', w: 1800, h: 2400 },
  { id: '002', alt: 'Lisa laughing with Dale, sunflowers in hand', w: 1800, h: 2400 },
  { id: '003', alt: 'Lisa leaning into Dale, the lake behind them', w: 1800, h: 2400 },
  { id: '004', alt: 'The two of them at the water\'s edge', w: 1800, h: 2400 },
  { id: '005', alt: 'Dale holding Lisa close on the sand', w: 1800, h: 2400 },
  { id: '006', alt: 'Lisa and Dale with the bay stretching out behind', w: 1800, h: 2400 },
  { id: '007', alt: 'The couple on the beach in the afternoon light', w: 1800, h: 2400 },
  { id: '008', alt: 'Lisa and Dale, hand in hand', w: 1800, h: 2400 },
  { id: '009', alt: 'Dale reaching for Lisa\'s hand', w: 1800, h: 2400 },
  { id: '010', alt: 'Dale with his arms thrown wide, Lisa laughing', w: 1800, h: 2400 },
  { id: '011', alt: 'The two of them laughing together on the sand', w: 1800, h: 2400 },
  { id: '012', alt: 'A quiet moment down on the sand', w: 2400, h: 1350 },
  { id: '013', alt: 'Resting by the water before the ceremony', w: 2400, h: 1350 },
  { id: '014', alt: 'The couple surrounded by everyone who came', w: 1800, h: 2400 },
  { id: '015', alt: 'Guests gathered close around Lisa and Dale', w: 1800, h: 2400 },
  { id: '016', alt: 'Embraces after the vows', w: 2400, h: 1350 },
  { id: '017', alt: 'Everyone together on the shoreline', w: 2400, h: 1350 },
  { id: '018', alt: 'Lisa with the women beside her', w: 1800, h: 2400 },
  { id: '019', alt: 'The women together on the beach', w: 1800, h: 2400 },
  { id: '020', alt: 'Laughter by the water', w: 1800, h: 2400 },
  { id: '021', alt: 'Arm in arm on the sand', w: 1800, h: 2400 },
  { id: '022', alt: 'Hands joined during the ceremony', w: 1800, h: 2400 },
  { id: '023', alt: 'Vows spoken on the shoreline', w: 1800, h: 2400 },
  { id: '024', alt: 'Lisa and Dale facing each other', w: 1800, h: 2400 },
  { id: '025', alt: 'The vows, hand in hand', w: 1800, h: 2400 },
  { id: '026', alt: 'Dale and Lisa before the water', w: 1800, h: 2400 },
  { id: '027', alt: 'Holding on to each other as the vows are read', w: 1800, h: 2400 },
  { id: '028', alt: 'The couple with everyone after the ceremony', w: 1800, h: 2400 },
  { id: '029', alt: 'Gathered together on the sand', w: 1800, h: 2400 },
  { id: '030', alt: 'Surrounding Lisa and Dale', w: 1800, h: 2400 },
  { id: '031', alt: 'The whole party on the shoreline', w: 1800, h: 2400 },
  { id: '032', alt: 'Everyone together on the beach', w: 2400, h: 1800 },
  { id: '033', alt: 'The full gathering by the water', w: 2400, h: 1800 },
  { id: '034', alt: 'Guests by the water', w: 1800, h: 2400 },
  { id: '035', alt: 'Friends of the couple on the shore', w: 1800, h: 2400 },
  { id: '036', alt: 'The table set for the celebration', w: 2400, h: 1800 },
  { id: '037', alt: 'Gathered around the table', w: 2400, h: 1800 },
  { id: '038', alt: 'The rings resting in the sunflower', w: 1800, h: 2400 },
  { id: '039', alt: 'Sunflower, white roses and the wedding bands', w: 1800, h: 2400 },
  { id: '040', alt: 'The bouquet held up to the light', w: 1800, h: 2400 },
  { id: '041', alt: 'The rings nested in the bouquet', w: 1800, h: 2400 },
  { id: '042', alt: 'Sunflower and baby\'s breath', w: 1800, h: 2400 },
  { id: '043', alt: 'The bands together among the flowers', w: 1800, h: 2400 },
  { id: '044', alt: 'Two rings in the heart of the sunflower', w: 1800, h: 2400 },
  { id: '045', alt: 'The bouquet, close', w: 1800, h: 2400 },
  { id: '046', alt: 'Lisa and Dale up on the rocks', w: 1800, h: 2400 },
  { id: '047', alt: 'The last light of the day', w: 1800, h: 2400 },
]
