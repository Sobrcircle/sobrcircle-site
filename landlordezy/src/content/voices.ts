/**
 * Words from real LandlordEzy customers. Deliberately empty: never invent a
 * quote. Add one only with the person's written permission, in their exact
 * words, and with details they agreed to share. The section on the homepage and
 * each `pages` entry renders only once there is at least one real quote.
 *
 *   {
 *     quote: '<their exact words>',
 *     name: '<first name and last initial>',
 *     place: '<city>',
 *     doors: 0, // optional: how many doors they manage
 *     pages: ['', 'notices/'], // where it appears ('' = homepage)
 *   }
 */
export type Voice = {
  quote: string
  name: string
  place: string
  doors?: number
  /** Site paths where this quote appears; '' is the homepage. */
  pages: string[]
}

export const voices: Voice[] = []

export function voicesFor(path: string): Voice[] {
  return voices.filter((v) => v.pages.includes(path))
}
