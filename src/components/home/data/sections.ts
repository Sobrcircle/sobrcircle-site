export type TextSpan =
  | { type: 'plain'; text: string }
  | { type: 'accent'; text: string }
  | { type: 'callout'; text: string }

export type SectionType = 'hero' | 'feature' | 'twentyfour'

export type HomeSection = {
  id: string
  type: SectionType
  title: string
  content: TextSpan[][]
  phoneImage?: string
  cta?: { href: string; label: string }
}

export const sections: HomeSection[] = [
  {
    id: 'recovery',
    type: 'hero',
    title: 'Recovery',
    content: [
      [{ type: 'plain', text: 'The sobriety app built by someone in recovery.' }],
      [{ type: 'accent', text: 'Recovery is harder alone. You don\u2019t have to be.' }],
      [{ type: 'plain', text: 'Count your days, find a meeting tonight, and stay close to the people who show up.' }],
    ],
    phoneImage: '/assets/1.jpg?v=3',
  },
  {
    id: 'map',
    type: 'feature',
    title: 'Find a Meeting',
    content: [
      [{ type: 'callout', text: 'New city. Same recovery.' }],
      [
        { type: 'plain', text: '195,000+ meetings on one map, with the time, the place and live navigation to the door. Drive, walk, bike or take transit.' },
      ],
      [
        { type: 'plain', text: 'Community events show up on the map too, along with friends who choose to share their location, so nobody has to walk in alone. ' },
        { type: 'accent', text: 'Your next meeting is a tap away.' },
      ],
    ],
    phoneImage: '/assets/6.png?v=3',
    cta: { href: '/meetings/', label: 'find meetings near you' },
  },
  {
    id: 'circles',
    type: 'feature',
    title: 'Your Circle',
    content: [
      [{ type: 'callout', text: 'You already know who your people are.' }],
      [{ type: 'plain', text: 'Add the people you trust with a private 6-character code. There\u2019s no limit on your circle, and you decide who\u2019s in it.' }],
      [
        { type: 'plain', text: 'Start with the people who answer at 2 AM. ' },
        { type: 'accent', text: 'Your circle grows with you.' },
      ],
    ],
    phoneImage: '/assets/3.jpg?v=3',
  },
  {
    id: 'community',
    type: 'feature',
    title: 'Rooms and Events',
    content: [
      [{ type: 'callout', text: 'Recovery happens between meetings too.' }],
      [
        { type: 'plain', text: 'Join a public room to talk with people who get it, or join a private room of up to 50. Group chats keep up to 12 of your closest in one thread.' },
      ],
      [
        { type: 'plain', text: 'Anyone can join a room or event. Supporters create their own, which helps cover server costs.' },
      ],
      [
        { type: 'plain', text: 'Find members near you who\u2019ve chosen to be discoverable, make yourself discoverable when you\u2019re ready, and find community events close to home. ' },
        { type: 'accent', text: 'Show up for each other.' },
      ],
    ],
  },
  {
    id: 'checkin',
    type: 'feature',
    title: 'Check In',
    content: [
      [{ type: 'plain', text: 'Some days you need to say it out loud.' }],
      [
        { type: 'plain', text: 'A check in is a moment of honesty\u2009—\u2009for you, and for someone who needs to hear they\u2019re not the only one.' },
      ],
      [
        { type: 'plain', text: 'Every response here is ' },
        { type: 'accent', text: 'an act of service' },
        { type: 'plain', text: '.' },
      ],
    ],
    phoneImage: '/assets/4.jpg?v=3',
  },
  {
    id: 'journey',
    type: 'feature',
    title: 'Your Journey',
    content: [
      [{ type: 'callout', text: 'Every day counts. Especially today.' }],
      [
        { type: 'plain', text: 'Your sobriety tracker counts the days, shows how close your next milestone is, and marks each one with a badge, from 24 hours to years.' },
      ],
      [
        { type: 'plain', text: 'When you hit a milestone, your circle hears about it. ' },
        { type: 'accent', text: 'One day at a time, together.' },
      ],
    ],
    cta: { href: '/sobriety-calculator/', label: 'count your days' },
  },
  {
    id: 'journal',
    type: 'feature',
    title: 'Journal',
    content: [
      [{ type: 'plain', text: 'Not everything needs to be shared.' }],
      [
        { type: 'plain', text: 'A private space to process the hard days, track your progress, and put your thoughts somewhere safe. ' },
        { type: 'accent', text: 'Never visible to anyone.' },
      ],
    ],
    phoneImage: '/assets/5.jpg?v=3',
  },
  {
    id: 'story',
    type: 'feature',
    title: 'Our Story',
    content: [
      [{ type: 'plain', text: 'I built SobrCircle because I needed it and it didn\u2019t exist.' }],
      [
        { type: 'plain', text: 'I struggled with addiction for most of my life. Rehab, relapses, and more second chances than I deserved. And when I finally started getting better, I realized there was no space built for what recovery actually looks like\u2009—\u2009the daily part. The showing up part.' },
      ],
      [
        { type: 'accent', text: 'Sobriety is more than a number. It\u2019s the people beside you when the number almost resets.' },
      ],
      [
        { type: 'plain', text: 'I looked for that place. It didn\u2019t exist. ' },
        { type: 'accent', text: 'So I built one.' },
      ],
      [{ type: 'plain', text: 'No ads. No data selling. No outside influences deciding what this becomes.' }],
    ],
    phoneImage: '/assets/2.jpg?v=3',
  },
  {
    id: 'twentyfour',
    type: 'twentyfour',
    title: 'twenty four',
    content: [
      [{ type: 'plain', text: 'The story behind SobrCircle began long before the app. Addiction, relapses, recovery, and everything in between\u2009—\u2009written by the founder who lived it.' }],
      [{ type: 'plain', text: 'Twenty four poems across four chapters, in the order they were lived.' }],
      [{ type: 'accent', text: 'Recovery happens twenty four hours at a time.' }],
    ],
  },
]
