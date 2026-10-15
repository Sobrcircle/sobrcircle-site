/**
 * LandlordEzy design tokens.
 *
 * Neutrals follow Apple's marketing palette (ink #1d1d1f on white / #f5f5f7)
 * so the product visuals carry the colour. Brand hues are sampled from the
 * LandlordEzy logo: blue #096ef9, navy #050c3b, green #79d220, maple #f40e16.
 * `brand.text` is a darker blue used for links on white, because the logo blue
 * only clears WCAG AA contrast at button sizes (4.6:1), not for body links.
 *
 * @type {import('tailwindcss').Config}
 */
export default {
  content: {
    relative: true,
    files: ['./src/**/*.{ts,tsx}'],
  },
  theme: {
    screens: {
      sm: '640px',
      md: '834px',
      lg: '1068px',
      xl: '1280px',
    },
    extend: {
      colors: {
        ink: {
          DEFAULT: '#1d1d1f',
          2: '#424245',
          3: '#636368',
          4: '#6e6e73',
        },
        canvas: {
          DEFAULT: '#ffffff',
          alt: '#f5f5f7',
          deep: '#e8e8ed',
        },
        line: {
          DEFAULT: '#d2d2d7',
          soft: '#e5e5ea',
        },
        brand: {
          DEFAULT: '#096ef9',
          hover: '#0661e0',
          text: '#0659d6',
          soft: '#eaf2ff',
          ink: '#050c3b',
          night: '#02061f',
          glow: '#4c9bff',
        },
        leaf: '#f40e16',
        go: {
          DEFAULT: '#79d220',
          ink: '#1f7a16',
          soft: '#ecf8e1',
        },
        warn: {
          DEFAULT: '#c46a00',
          ink: '#9a4f00',
          soft: '#fff3e0',
        },
        bad: {
          DEFAULT: '#d70015',
          soft: '#fdecee',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Text"',
          '"Segoe UI Variable Text"',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
        display: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"Segoe UI Variable Display"',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
        mono: ['ui-monospace', '"SF Mono"', 'Menlo', 'Consolas', 'monospace'],
      },
      fontSize: {
        // Apple-like type scale: fluid display sizes, a 17px body.
        'display-xl': ['clamp(2.75rem, 6.4vw, 5.5rem)', { lineHeight: '1.04', letterSpacing: '-0.028em', fontWeight: '700' }],
        'display-lg': ['clamp(2.5rem, 5vw, 4.25rem)', { lineHeight: '1.06', letterSpacing: '-0.025em', fontWeight: '700' }],
        'display-md': ['clamp(2rem, 3.9vw, 3.25rem)', { lineHeight: '1.08', letterSpacing: '-0.02em', fontWeight: '650' }],
        headline: ['clamp(1.625rem, 2.6vw, 2.25rem)', { lineHeight: '1.14', letterSpacing: '-0.015em', fontWeight: '650' }],
        title: ['clamp(1.25rem, 1.6vw, 1.5rem)', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '600' }],
        lead: ['clamp(1.1875rem, 1.55vw, 1.5rem)', { lineHeight: '1.42', letterSpacing: '-0.005em' }],
        body: ['1.0625rem', { lineHeight: '1.6' }],
      },
      maxWidth: {
        text: '42rem',
        content: '61.25rem',
        wide: '75rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)',
        float: '0 2px 6px rgba(5,12,59,0.06), 0 24px 60px -12px rgba(5,12,59,0.22)',
        device: '0 40px 100px -30px rgba(5,12,59,0.45), 0 18px 40px -20px rgba(5,12,59,0.3)',
        glow: '0 0 0 1px rgba(9,110,249,0.18), 0 20px 50px -20px rgba(9,110,249,0.55)',
      },
      transitionTimingFunction: {
        apple: 'cubic-bezier(0.28, 0.11, 0.32, 1)',
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
