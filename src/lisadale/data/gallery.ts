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

/** The film is uploaded exactly as exported — no re-encode, no compression.
 *  Change this to the real filename; the extension must match the file, since
 *  the proxy infers Content-Type from it when R2 has no stored type. */
const FILM_FILE = 'lisa-dale-film.mp4'

export const media = {
  /** Display copy shown in the grid and lightbox. */
  photo: (id: string) => `${BASE}/photos/web/${id}.jpg`,
  /** Full-resolution copy, forced to save rather than open. */
  photoDownload: (id: string) =>
    `${BASE}/photos/full/${id}.jpg?download=1&filename=lisa-and-dale-${id}.jpg`,
  /** Streamed and downloaded from the same untouched original. */
  film: `${BASE}/film/${FILM_FILE}`,
  filmPoster: `${BASE}/film/poster.jpg`,
  filmDownload: `${BASE}/film/${FILM_FILE}?download=1&filename=Lisa-and-Dale-Wedding-Film.mp4`,
  allPhotos: `${BASE}/lisa-and-dale-photos.zip?download=1&filename=Lisa-and-Dale-Photographs.zip`,
}

/** The frame behind the title. 008 is chosen because Lisa and Dale stand at
 *  either edge of it, leaving clean water behind the type — most of the set
 *  puts them dead centre, where the title would land on their faces.
 *  Runner-up is 001. Change this one id to swap the hero. */
export const HERO_ID = '008'

export interface Photo {
  /** Filename stem in the bucket. */
  id: string
  /** Alt text — real descriptions, not "wedding photo 4". */
  alt: string
  /** Wider tile on desktop, to break the grid's rhythm. */
  wide?: boolean
}

/**
 * The 47 photographs, in the order they were taken — the iPhone filenames sort
 * chronologically, so the scroll follows the day. Generated from the graded
 * output; the landscape frames are marked `wide` and become the two-column
 * feature tiles.
 */
export const photos: Photo[] = [
  { id: '001', alt: 'Lisa and Dale together on the shoreline' },
  { id: '002', alt: 'Lisa laughing with Dale, sunflowers in hand' },
  { id: '003', alt: 'Lisa leaning into Dale, the lake behind them' },
  { id: '004', alt: 'The two of them at the water\'s edge' },
  { id: '005', alt: 'Dale holding Lisa close on the sand' },
  { id: '006', alt: 'Lisa and Dale with the bay stretching out behind' },
  { id: '007', alt: 'The couple on the beach in the afternoon light' },
  { id: '008', alt: 'Lisa and Dale, hand in hand' },
  { id: '009', alt: 'Dale reaching for Lisa\'s hand' },
  { id: '010', alt: 'Dale with his arms thrown wide, Lisa laughing' },
  { id: '011', alt: 'The two of them laughing together on the sand' },
  { id: '012', alt: 'A quiet moment down on the sand', wide: true },
  { id: '013', alt: 'Resting by the water before the ceremony', wide: true },
  { id: '014', alt: 'The couple surrounded by everyone who came' },
  { id: '015', alt: 'Guests gathered close around Lisa and Dale' },
  { id: '016', alt: 'Embraces after the vows', wide: true },
  { id: '017', alt: 'Everyone together on the shoreline', wide: true },
  { id: '018', alt: 'Lisa with the women beside her' },
  { id: '019', alt: 'The women together on the beach' },
  { id: '020', alt: 'Laughter by the water' },
  { id: '021', alt: 'Arm in arm on the sand' },
  { id: '022', alt: 'Hands joined during the ceremony' },
  { id: '023', alt: 'Vows spoken on the shoreline' },
  { id: '024', alt: 'Lisa and Dale facing each other' },
  { id: '025', alt: 'The vows, hand in hand' },
  { id: '026', alt: 'Dale and Lisa before the water' },
  { id: '027', alt: 'Holding on to each other as the vows are read' },
  { id: '028', alt: 'The couple with everyone after the ceremony' },
  { id: '029', alt: 'Gathered together on the sand' },
  { id: '030', alt: 'Surrounding Lisa and Dale' },
  { id: '031', alt: 'The whole party on the shoreline' },
  { id: '032', alt: 'Everyone together on the beach', wide: true },
  { id: '033', alt: 'The full gathering by the water', wide: true },
  { id: '034', alt: 'Guests by the water' },
  { id: '035', alt: 'Friends of the couple on the shore' },
  { id: '036', alt: 'The table set for the celebration', wide: true },
  { id: '037', alt: 'Gathered around the table', wide: true },
  { id: '038', alt: 'The rings resting in the sunflower' },
  { id: '039', alt: 'Sunflower, white roses and the wedding bands' },
  { id: '040', alt: 'The bouquet held up to the light' },
  { id: '041', alt: 'The rings nested in the bouquet' },
  { id: '042', alt: 'Sunflower and baby\'s breath' },
  { id: '043', alt: 'The bands together among the flowers' },
  { id: '044', alt: 'Two rings in the heart of the sunflower' },
  { id: '045', alt: 'The bouquet, close' },
  { id: '046', alt: 'Lisa and Dale up on the rocks' },
  { id: '047', alt: 'The last light of the day' },
]
