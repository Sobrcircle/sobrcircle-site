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
      'Find AA meetings near you tonight, in person or online. Open and closed meetings, what to expect at your first one, and an app that maps meetings with directions.',
    h1: 'Find AA meetings near you',
    lede: 'Alcoholics Anonymous meetings happen every day, in almost every town. SobrCircle shows the ones near you on a map, with their times and live navigation.',
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
        'Open SobrCircle and the map shows AA meetings near you with their times and live navigation to the door. You can also call the local AA office in your city, which keeps its own up to date list.',
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
      'Find NA meetings near you tonight, in person or online. What Narcotics Anonymous meetings are like, and an app that maps meetings near you with directions.',
    h1: 'Find NA meetings near you',
    lede: 'Narcotics Anonymous meetings are free and open to anyone who wants to stop using. SobrCircle shows the meetings near you on a map, with their times and live navigation.',
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
        'Open SobrCircle and the map shows NA meetings near you with their times and live navigation. Your local NA area or region website also lists meetings and a helpline.',
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
      'Find Cocaine Anonymous (CA) meetings near you, in person or online. What CA meetings are like, and an app that maps recovery meetings near you with directions.',
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

// ── Feature landing pages (one search intent each) ─────────────────────────

export type Topic = {
  slug: string
  nav?: string
  title: string
  description: string
  eyebrow: string
  h1: string
  lede: string
  phone: { src: string; alt: string; caption: string }
  sections: Array<{ h2: string; paragraphs?: string[]; points?: Array<[string, string]> }>
  faq: Array<[string, string]>
  related: Array<[string, string]>
  /** One sentence for the download section at the bottom of the page. */
  getApp: string
  note?: string
}

export const MILESTONES =
  '24 hours, every month through your first year, 18 months, and every year after that'

export const topics: Topic[] = [
  {
    slug: 'sobriety-tracker',
    title: 'Sobriety Tracker App: Count Your Days Sober and Milestones',
    description:
      'A sobriety tracker app that counts your days sober, counts down to your next milestone and celebrates it with your circle. No ads. Free to download.',
    eyebrow: 'Sobriety tracker',
    h1: 'A sobriety tracker that celebrates with you',
    lede: 'SobrCircle counts your days sober, shows how close your next milestone is, and lets the people in your circle celebrate it with you. No ads, and free to download on iPhone and Android.',
    phone: {
      src: '/assets/1.jpg?v=3',
      alt: 'SobrCircle sobriety tracker showing 548 days sober, 1 year 6 months 2 days, and the next milestone of 2 years in 182 days',
      caption: 'Your days and your next milestone, front and center.',
    },
    sections: [
      {
        h2: 'What it tracks',
        points: [
          ['Days sober', 'Your total days, plus the years, months and days since your sobriety date.'],
          ['Your next milestone', 'A countdown to the next one, so you always know what you are working toward.'],
          ['Milestone badges', `A badge at ${MILESTONES}.`],
          ['Check ins', 'Every daily check in is counted on your profile alongside your days.'],
        ],
      },
      {
        h2: 'More than a counter',
        paragraphs: [
          'A number alone does not keep anyone sober. When you hit a milestone, the people in your circle hear about it and can celebrate with you. On the hard days, the same people are a message away.',
          'Around the tracker you get a private journal, daily check ins, public and private rooms, community events, and a map of 195,000+ meetings, including AA, NA and CA, with live navigation to the door.',
        ],
      },
    ],
    faq: [
      ['Is the SobrCircle sobriety tracker free?', 'Yes. The sobriety tracker is free to use, with no ads, and your data is never sold.'],
      ['What milestones does it celebrate?', `SobrCircle marks ${MILESTONES}, each with its own badge.`],
      ['Does it work for drugs as well as alcohol?', 'Yes. The tracker counts from your sobriety date, whatever you are recovering from.'],
      ['How do I count my days sober right now?', 'Use the free sobriety calculator on this site, or download SobrCircle to keep counting every day.'],
    ],
    getApp: 'Start counting today. Your days, your next milestone and a circle to celebrate with. Free to download on iPhone and Android.',
    related: [
      ['/sobriety-calculator/', 'Sobriety calculator'],
      ['/sober-community/', 'Sober community'],
      ['/meetings/', 'Find meetings'],
    ],
  },
  {
    slug: 'sober-community',
    title: 'Sober Community App: Rooms, Events and Sober Friends Near You',
    description:
      'Join a sober community app with no ads. Public and private rooms, group chats, members and community events near you, and a private circle of people you trust.',
    eyebrow: 'Sober community',
    h1: 'A sober community that shows up',
    lede: 'Recovery happens between meetings too. SobrCircle gives you rooms to talk, events near you, members nearby who chose to be found, and a private circle of the people you trust.',
    phone: {
      src: '/assets/3.jpg?v=3',
      alt: 'SobrCircle group chat where members plan to go to a meeting together',
      caption: 'A group chat making plans for tonight’s meeting.',
    },
    sections: [
      {
        h2: 'Ways to connect',
        points: [
          ['Public rooms', 'Drop in and talk with people who get it.'],
          ['Private rooms', 'Join private rooms of up to 50 people, or host your own as a Supporter.'],
          ['Group and personal chats', 'Keep up to 12 of your closest in one group chat, or talk one to one.'],
          ['Members near you', 'Find people nearby who have chosen to be discoverable, and choose whether you are discoverable too.'],
          ['Community events', 'See sober events near you on the map and meet the faces behind the messages.'],
        ],
      },
      {
        h2: 'Your circle, your call',
        paragraphs: [
          'Your circle is the people you add with a private 6-character code. There is no limit on its size, and you decide who is in it. Friends can choose to share their location, so you can find each other and walk into a meeting together.',
          'SobrCircle is for adults 18 and over. It is peer support from people who have been there, not medical care, and it has no ads.',
        ],
      },
    ],
    faq: [
      ['How do I meet sober people near me?', 'In SobrCircle you can find members near you who have chosen to be discoverable, join public rooms, and see community events on the map.'],
      ['Can people find me without my permission?', 'No. Only members who choose to be discoverable show up to people nearby, and you decide who joins your circle.'],
      ['Is SobrCircle free?', 'SobrCircle is free to download, with no ads, and your data is never sold. Tracking your days, finding meetings, one to one messages and joining any room or event cost nothing. Creating your own rooms and events is part of SobrCircle Supporter, which helps cover server costs.'],
    ],
    getApp: 'Find your people. Rooms, events, members near you and a private circle. Free to download on iPhone and Android.',
    related: [
      ['/sobriety-tracker/', 'Sobriety tracker'],
      ['/meetings/', 'Find meetings'],
      ['/sober-grid-alternative/', 'Sober Grid alternative'],
      ['/follow/', 'Follow SobrCircle'],
    ],
  },
{
    slug: 'sober-grid-alternative',
    title: 'Sober Grid Alternative: A Sober Community App With No Ads',
    description:
      'Looking for a Sober Grid alternative? SobrCircle is a sober community app with no ads: public rooms, members near you, events, a sobriety tracker and meetings.',
    eyebrow: 'Sober Grid alternative',
    h1: 'Looking for a Sober Grid alternative?',
    lede: 'Sober Grid is no longer available. If you are looking for a new sober community, SobrCircle is a place to find one, built by someone in recovery, with no ads.',
    phone: {
      src: '/assets/4.jpg?v=3',
      alt: 'SobrCircle profile showing check ins, circle size and 548 days sober',
      caption: 'Your profile: check ins, your circle and your days.',
    },
    sections: [
      {
        h2: 'What you will find',
        points: [
          ['Sober people near you', 'Find members nearby who have chosen to be discoverable, and choose whether you are discoverable too.'],
          ['Public rooms', 'Drop in and talk with people who get it.'],
          ['Private rooms and group chats', 'Join private rooms of up to 50 people, or keep up to 12 of your closest in one group chat.'],
          ['Community events', 'See sober events near you on the map.'],
          ['A sobriety tracker', 'Count your days and celebrate each milestone with your circle.'],
        ],
      },
      {
        h2: 'What is different',
        paragraphs: [
          'Your circle is private. People join it with a 6-character code you share, there is no limit on its size, and only members who choose to be discoverable show up to people nearby.',
          'It also finds meetings: 195,000+ of them, including AA, NA and CA, with their times and live navigation to the door.',
          'There are no ads and your data is never sold. Anyone can join rooms and events, and Supporters can create their own.',
        ],
      },
    ],
    faq: [
      ['Is Sober Grid still available?', 'No. Sober Grid is no longer available.'],
      ['Is SobrCircle connected to Sober Grid?', 'No. SobrCircle is an independent app made in Windsor, Ontario, and is not affiliated with Sober Grid.'],
      ['Can I meet sober people near me on SobrCircle?', 'Yes. You can find members nearby who have chosen to be discoverable, join public rooms, and find community events on the map.'],
      ['Is SobrCircle free?', 'SobrCircle is free to download, with no ads, and your data is never sold. Tracking your days, finding meetings, one to one messages and joining any room or event cost nothing. Creating your own rooms and events is part of SobrCircle Supporter, which helps cover server costs.'],
    ],
    getApp: 'Find your sober community again. Free to download on iPhone and Android, with no ads.',
    related: [
      ['/sober-community/', 'Sober community'],
      ['/sobriety-tracker/', 'Sobriety tracker'],
      ['/meetings/', 'Find meetings'],
    ],
    note: 'Sober Grid is a name belonging to its owner. SobrCircle is not affiliated with, endorsed by or connected to Sober Grid.',
  },
]
