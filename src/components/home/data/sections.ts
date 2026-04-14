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
}

export const sections: HomeSection[] = [
  {
    id: 'recovery',
    type: 'hero',
    title: 'Recovery',
    content: [
      [{ type: 'plain', text: 'Recovery is harder alone.' }],
      [{ type: 'accent', text: 'You don\u2019t have to be.' }],
      [{ type: 'plain', text: 'A private space for the people who show up.' }],
    ],
    phoneImage: '/assets/1.png?v=2',
  },
  {
    id: 'circles',
    type: 'feature',
    title: 'Your Circle',
    content: [
      [{ type: 'callout', text: 'You already know who your people are.' }],
      [{ type: 'plain', text: 'Every person in your circle is someone you chose. No strangers. No suggestions. Just a private invite code that you share on purpose.' }],
      [
        { type: 'plain', text: 'Start with the people who answer at 2 AM. ' },
        { type: 'accent', text: 'Your circle grows with you.' },
      ],
    ],
    phoneImage: '/assets/3.png?v=2',
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
    phoneImage: '/assets/4.png?v=2',
  },
  {
    id: 'map',
    type: 'feature',
    title: 'Recovery Map',
    content: [
      [{ type: 'plain', text: 'New city. Same recovery.' }],
      [
        { type: 'plain', text: 'Find meetings nearby and see friends who choose to share their location.' },
      ],
      [{ type: 'accent', text: 'Your next meeting is a tap away.' }],
    ],
    phoneImage: '/assets/6.png?v=2',
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
    phoneImage: '/assets/5.png?v=2',
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
    phoneImage: '/assets/2.png?v=2',
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
