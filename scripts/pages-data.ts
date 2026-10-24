// Content for the generated static pages (see scripts/build-pages.ts).
// Every local link and phone number here was checked against the
// organization's own website on 2026-10-24. Re-check before adding more.

import { socials, type Social } from '../src/data/socials.ts'
import { cities as cityData } from './cities-data.ts'

export const SITE = 'https://sobrcircle.com'
export const APP_ID = '6760403731'
export const APP_STORE_URL = `https://apps.apple.com/app/sobrcircle/id${APP_ID}`
export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.sobrcircle.app'
export const MEETING_COUNT = '195,000+'

export { socials, type Social }

export type Resource = {
  name: string
  url: string
  phone?: string | null
  note?: string
  kind?: string
}

export type Fellowship = {
  slug: string
  short: string
  /** Label used in links; spelled out where the initials are ambiguous. */
  label: string
  name: string
  title: string
  description: string
  h1: string
  lede: string
  blurb: string
  about: string[]
  formats: Array<[string, string]>
  official: Resource[]
  faq: Array<[string, string]>
}

export type City = {
  slug: string
  name: string
  region: string
  country: 'CA' | 'US'
  lede?: string
  note?: string
  aa?: Resource | null
  na?: Resource | null
  ca?: Resource | null
  alanon?: Resource | null
  other?: Resource[]
  helplines?: Resource[]
  nearby?: string[]
}

const openClosed: Array<[string, string]> = [
  ['Open meetings', 'Anyone can attend, including family, friends, students and people who are just curious.'],
  ['Closed meetings', 'For people who have, or think they may have, a problem and want to stop.'],
]

export const fellowships: Fellowship[] = [
  {
    slug: 'aa',
    short: 'AA',
    label: 'AA',
    name: 'Alcoholics Anonymous',
    title: 'AA Meetings Near Me: Find Alcoholics Anonymous Meetings Tonight',
    description:
      'Find AA meetings near you tonight, in person or online. Open and closed meetings, what to expect at your first one, and a free app that maps meetings with directions.',
    h1: 'Find AA meetings near you',
    lede: 'Alcoholics Anonymous meetings happen every day, in almost every town. SobrCircle shows the ones near you on a map, with directions, for free.',
    blurb: 'For anyone who wants to stop drinking. In person, online and by phone.',
    about: [
      'AA meetings are gatherings where people who want to quit drinking support each other by talking honestly about their own experience. Anyone who wants to stop drinking can come, and there are no dues or fees.',
      'Meetings are run by local groups. Most last about an hour, start and end on time, and follow a simple format so a newcomer can sit back and listen.',
    ],
    formats: [
      ...openClosed,
      ['Speaker meetings', 'One or two members share their own story of drinking and getting sober.'],
      ['Discussion meetings', 'A topic is chosen and members share about it in turn.'],
      ['Step and book studies', 'The group reads and talks through the Twelve Steps or a piece of AA literature.'],
      ['Online and phone meetings', 'Video and phone meetings run around the clock, so there is always one starting soon.'],
    ],
    official: [
      { name: 'Find A.A. Near You (aa.org)', url: 'https://www.aa.org/find-aa', note: 'Official contact list for local AA offices worldwide.' },
      { name: 'Meeting Guide app', url: 'https://www.aa.org/meeting-guide-app', note: "AA's own meeting app, with listings from local AA offices." },
    ],
    faq: [
      [
        'How do I find an AA meeting near me tonight?',
        'Open SobrCircle and the map shows AA meetings near you with directions. You can also call the local AA office in your city, which keeps an up to date list with meeting times.',
      ],
      [
        'What happens at a first AA meeting?',
        'Someone usually reads a short welcome, then members share or a speaker tells their story. You can just listen. Many people mention they are new so others can offer phone numbers and support, but you never have to.',
      ],
      [
        'Do I have to stop drinking before I go?',
        'No. The only thing you need is a wish to stop. Plenty of people walk into their first meeting still drinking.',
      ],
      [
        'Are AA meetings religious?',
        'AA is not linked to any religion. Some meetings take place in churches because the space is available, and members are free to define a higher power, or none, however they like.',
      ],
    ],
  },
  {
    slug: 'na',
    short: 'NA',
    label: 'NA',
    name: 'Narcotics Anonymous',
    title: 'NA Meetings Near Me: Find Narcotics Anonymous Meetings Tonight',
    description:
      'Find NA meetings near you tonight, in person or online. What Narcotics Anonymous meetings are like, and a free app that maps meetings near you with directions.',
    h1: 'Find NA meetings near you',
    lede: 'Narcotics Anonymous meetings are free and open to anyone who wants to stop using. SobrCircle shows the meetings near you on a map, with directions.',
    blurb: 'For anyone who wants to stop using drugs, whatever the drug.',
    about: [
      'Narcotics Anonymous is a fellowship of people who help each other stay clean. It focuses on the disease of addiction rather than any one drug, so anyone who wants to stop using is welcome, including people whose drug was alcohol.',
      'Meetings are free, run by local groups, and usually last about an hour. You can come as you are and simply listen.',
    ],
    formats: [
      ...openClosed,
      ['Speaker meetings', 'A member shares their story of addiction and recovery.'],
      ['Participation meetings', 'Members take turns sharing on a topic or reading.'],
      ['Step and literature studies', 'The group reads and discusses the Twelve Steps or NA literature together.'],
      ['Online and phone meetings', 'Virtual NA meetings run every day for when you cannot get to a room.'],
    ],
    official: [
      { name: 'Find NA Near You (na.org)', url: 'https://na.org/meetingsearch/', note: 'Links to local NA websites, phonelines and virtual meetings.' },
    ],
    faq: [
      [
        'How do I find an NA meeting near me tonight?',
        'Open SobrCircle and the map shows NA meetings near you with directions. Your local NA area or region website also lists meeting times and a helpline.',
      ],
      [
        'Is NA only for people who used narcotics?',
        'No. NA welcomes anyone who wants to stop using any drug, including alcohol, cannabis, pills and stimulants.',
      ],
      [
        'What does "clean" mean in NA?',
        'In NA, clean means not using any mind altering drugs. Members count clean time from the last day they used.',
      ],
      [
        'Do NA meetings cost money?',
        'No. There are no dues or fees. Groups pass a basket for voluntary contributions, and newcomers are never expected to give.',
      ],
    ],
  },
  {
    slug: 'cocaine-anonymous',
    short: 'CA',
    label: 'Cocaine Anonymous',
    name: 'Cocaine Anonymous',
    title: 'Cocaine Anonymous Meetings Near Me: Find CA Meetings Tonight',
    description:
      'Find Cocaine Anonymous (CA) meetings near you, in person or online. What CA meetings are like, and a free app that maps recovery meetings near you with directions.',
    h1: 'Find Cocaine Anonymous meetings near you',
    lede: 'Cocaine Anonymous meetings are free and open to anyone who wants to quit cocaine, crack or any other drug. SobrCircle helps you find one nearby.',
    blurb: 'For anyone who wants to quit cocaine, crack or any other drug.',
    about: [
      'CA meetings bring together people who want to quit cocaine, crack and other drugs, so they can support each other through recovery.',
      'CA meetings are smaller and less common than AA or NA meetings in many cities, so it helps to look at a map. If there is no CA meeting nearby, online CA meetings run every day.',
    ],
    formats: [
      ...openClosed,
      ['Speaker and discussion meetings', 'A member shares their story, or the group talks about a topic in turn.'],
      ['Step studies', 'The group works through the Twelve Steps together.'],
      ['Online and phone meetings', 'Virtual CA meetings are open to anyone, wherever they live.'],
    ],
    official: [
      { name: 'Find a CA Meeting (ca.org)', url: 'https://ca.org/meetings/', note: 'Cocaine Anonymous World Services meeting directory by country and region.' },
    ],
    faq: [
      [
        'How do I find a CA meeting near me?',
        'Open SobrCircle to see recovery meetings near you on a map. Cocaine Anonymous also keeps a directory of meetings by region, and online CA meetings run every day.',
      ],
      [
        'Is CA only for cocaine?',
        'No. CA welcomes anyone who wants to quit drugs, whether or not cocaine was their main one.',
      ],
      [
        'What if there is no CA meeting in my city?',
        'Many people go to online CA meetings, or to AA or NA meetings nearby, until a local CA meeting is available.',
      ],
    ],
  },
]

export const cities: City[] = cityData
