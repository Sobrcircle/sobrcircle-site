import React from 'react'

import { FullScreenScrollFX, type FullScreenFXAPI } from '@/components/ui/full-screen-scroll-fx'
import '@/styles/slide-content.css'

function SlideContent({
  paragraphs,
  phoneSrc,
  copyClassName,
  children,
}: {
  paragraphs: string[]
  phoneSrc: string
  copyClassName?: string
  children?: React.ReactNode
}) {
  return (
    <div className="slide-panel">
      <div className={['slide-copy', copyClassName].filter(Boolean).join(' ')}>
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
        {children}
      </div>

      <div className="phone-stage" aria-hidden="true">
        <div className="phone-shell">
          <div className="phone-screen">
            <img src={phoneSrc} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DemoOne() {
  const apiRef = React.useRef<FullScreenFXAPI>(null)
  const [betaEmail, setBetaEmail] = React.useState('')
  const [betaStatus, setBetaStatus] = React.useState<'idle' | 'sending' | 'sent'>('idle')

  const handleBetaSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const cleanEmail = betaEmail.trim()
    if (!cleanEmail || !cleanEmail.includes('@') || betaStatus === 'sending') return

    setBetaStatus('sending')
    try {
      const response = await fetch('https://formsubmit.co/ajax/ben@sobrcircle.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email: cleanEmail,
          _subject: 'SobrCircle Beta Interest',
          _captcha: 'false',
          message: `${cleanEmail} is interested in joining the beta.`,
        }),
      })

      if (!response.ok) {
        throw new Error('Request failed')
      }

      setBetaStatus('sent')
      setBetaEmail('Request Sent.')
    } catch {
      setBetaStatus('idle')
    }
  }

  const sections = [
    {
      leftLabel: 'Recovery',
      title: (
        <SlideContent
          phoneSrc="/assets/1.png"
          copyClassName="slide-copy--recovery"
          paragraphs={[
            "You don't have to recover alone.",
            'A private space for recovery.',
            'Built for connection.',
            'Designed with intention.',
          ]}
        />
      ),
      background: '/assets/mono-1.svg',
    },
    {
      leftLabel: 'Origin',
      title: (
        <SlideContent
          phoneSrc="/assets/2.png"
          paragraphs={[
            "Hi, I'm Ben.",
            'I had the idea for SobrCircle after seeing someone share a screenshot of their sobriety counter. It was meaningful. But something felt incomplete.',
            "Sobriety isn't just a number. It's connection.",
            "It's having people who understand without explanation. It's celebrating milestones together. It's not feeling alone in your progress.",
            "I realized there wasn't a space built for that. A private circle. An intentional space. A place to show up honestly.",
            "Since I couldn't find something to fill that space. I decided to build it.",
          ]}
        />
      ),
      background: '/assets/mono-2.svg',
    },
    {
      leftLabel: 'Circles',
      title: (
        <SlideContent
          phoneSrc="/assets/4.png"
          paragraphs={[
            "This isn't a social feed.",
            "It's a space designed specifically for recovery.",
            'Your circle is intentional and invite-only.',
            "There's no contact syncing. No searching for people. Every member has a private code they choose to share.",
            'Connection happens on purpose.',
            'Most circles start small based on your core support system. If your support grows, your circle can grow with it.',
            "Support works best when it's real.",
          ]}
        />
      ),
      background: '/assets/mono-3.svg',
    },
    {
      leftLabel: 'Check-in',
      title: (
        <SlideContent
          phoneSrc="/assets/3.png"
          paragraphs={[
            "Check-Ins are moments of accountability. They're encouragement when someone else needs it. They're quiet strength when you do.",
            "Sharing where you're at doesn't just keep you accountable. It may be exactly what someone else needs to read in that moment.",
            'And comments matter here.',
            "A comment isn't noise. It's an act of service.",
            'A few words can steady someone. A reminder can carry someone through a hard hour. Encouragement compounds.',
            'This is a community built on support. On uplifting each other. On staying recovery-focused.',
            "Your notifications aren't noise.",
            "They're milestones. They're encouragement. They're a different kind of birthday.",
          ]}
        />
      ),
      background: '/assets/mono-4.svg',
    },
    {
      leftLabel: 'Principles',
      title: (
        <SlideContent
          phoneSrc="/assets/5.png"
          copyClassName="slide-copy--philosophy"
          paragraphs={[
            'Recovery grows through honesty and respect.',
            'No ads. No selling your data. No outside influence shaping the space.',
            'Just people showing up for each other.',
          ]}
        />
      ),
      background: '/assets/mono-5.svg',
    },
    {
      leftLabel: 'Beta',
      title: (
        <SlideContent
          phoneSrc="/assets/6.png"
          paragraphs={[
            "We're preparing to open SobrCircle publicly.",
            "Before we do, we're inviting a small group to help shape it.",
            "We're looking for people willing to test it honestly.",
            "As a beta tester, you'll receive early access to the app. In return, we ask for feedback.",
            "Tell us what broke. Tell us what feels off. Tell us what should exist but doesn't yet.",
            'Help us build this the right way.',
          ]}
        >
          <form className="beta-form" onSubmit={handleBetaSubmit}>
            <input
              className="beta-input"
              type="email"
              value={betaEmail}
              onChange={(event) => setBetaEmail(event.target.value)}
              onFocus={() => {
                if (betaStatus === 'sent') {
                  setBetaEmail('')
                  setBetaStatus('idle')
                }
              }}
              placeholder={betaStatus === 'sent' ? 'Request Sent.' : 'Enter your email'}
              disabled={betaStatus === 'sending'}
              required
            />
            <button className="beta-button" type="submit" disabled={betaStatus === 'sending'}>
              {betaStatus === 'sending' ? 'Sending...' : 'Request Beta Access'}
            </button>
          </form>
        </SlideContent>
      ),
      background: '/assets/mono-6.svg',
    },
  ]

  return (
    <FullScreenScrollFX
      sections={sections}
      apiRef={apiRef}
      header={
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0',
            textTransform: 'none',
          }}
        >
          <img
            src="/assets/circle.png"
            alt="Logo"
            style={{
              width: 'clamp(70px, 8vw, 120px)',
              height: 'clamp(70px, 8vw, 120px)',
              display: 'block',
              objectFit: 'contain',
              filter: 'invert(1) brightness(1.15)',
            }}
          />
          <div
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.5rem)',
              letterSpacing: '0.02em',
              lineHeight: 1.1,
              color: 'rgba(245,245,245,0.96)',
              marginTop: '-0.5rem',
            }}
          >
            <span style={{ fontWeight: 600 }}>Sobr</span>
            <span style={{ fontWeight: 300 }}>Circle</span>
          </div>
          <div
            style={{
              marginTop: '0.28rem',
              fontSize: 'clamp(0.72rem, 1.05vw, 0.88rem)',
              fontWeight: 400,
              letterSpacing: '0.02em',
              color: 'rgba(236,236,236,0.82)',
              textAlign: 'center',
              textTransform: 'none',
            }}
          >
            Built in recovery. For recovery.
          </div>
          <div
            style={{
              marginTop: '2.4rem',
              fontSize: 'clamp(0.7rem, 1vw, 0.86rem)',
              fontWeight: 500,
              letterSpacing: '0.07em',
              color: '#1877F2',
              textAlign: 'center',
              textTransform: 'uppercase',
            }}
          >
            PRIVATE BETA BEGINS FIRST WEEK OF MARCH. PUBLIC LAUNCH IN APRIL
          </div>
          <div
            style={{
              marginTop: '0.52rem',
              fontSize: 'clamp(0.66rem, 0.92vw, 0.8rem)',
              fontWeight: 500,
              letterSpacing: '0.09em',
              color: 'rgba(24,119,242,0.84)',
              textAlign: 'center',
              textTransform: 'uppercase',
            }}
          >
            SPOTS ARE LIMITED
          </div>
        </div>
      }
      footer={<div />}
      showProgress
      durations={{ change: 0.35, snap: 180 }}
      smoothScroll={false}
    />
  )
}
