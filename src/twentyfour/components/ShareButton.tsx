import { useState, useRef, useEffect } from 'react'
import { Share2, Link, X as XIcon } from 'lucide-react'

const BASE_URL = 'https://sobrcircle.com/twentyfour'

export default function ShareButton({
  poemId,
  poemTitle,
  theme,
}: {
  poemId: string
  poemTitle: string
  theme: 'dark' | 'light'
}) {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const isDark = theme === 'dark'
  const iconColor = isDark ? '#e8e4df' : '#1a1a1a'

  const shareUrl = `${BASE_URL}/#${poemId}`
  const shareText = `"${poemTitle}" — twenty four, by bm`

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handle = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [open])

  const handleShare = async () => {
    // Try native share first (mobile)
    if (navigator.share) {
      try {
        await navigator.share({ title: 'twenty four', text: shareText, url: shareUrl })
        return
      } catch {}
    }
    // Fallback: open menu
    setOpen(!open)
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => { setCopied(false); setOpen(false) }, 1500)
    } catch {}
  }

  const shareToX = () => {
    window.open(
      `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      '_blank',
    )
    setOpen(false)
  }

  const shareToFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      '_blank',
    )
    setOpen(false)
  }

  const shareToThreads = () => {
    window.open(
      `https://www.threads.net/intent/post?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
      '_blank',
    )
    setOpen(false)
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={handleShare}
        aria-label="Share this poem"
        className="p-2 opacity-40 hover:opacity-80 transition-opacity touch-manipulation"
      >
        <Share2 size={18} color={iconColor} strokeWidth={1.5} />
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-48 rounded-lg overflow-hidden shadow-xl z-50"
          style={{
            background: 'var(--dark-bg)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <button
            onClick={copyLink}
            className="w-full flex items-center gap-3 px-4 py-3 text-[0.85rem] text-left hover:bg-white/5 transition-colors"
            style={{ color: 'var(--dark-text)' }}
          >
            <Link size={15} strokeWidth={1.5} />
            {copied ? 'Copied!' : 'Copy link'}
          </button>
          <button
            onClick={shareToX}
            className="w-full flex items-center gap-3 px-4 py-3 text-[0.85rem] text-left hover:bg-white/5 transition-colors"
            style={{ color: 'var(--dark-text)' }}
          >
            <XIcon size={15} strokeWidth={1.5} />
            Share to X
          </button>
          <button
            onClick={shareToFacebook}
            className="w-full flex items-center gap-3 px-4 py-3 text-[0.85rem] text-left hover:bg-white/5 transition-colors"
            style={{ color: 'var(--dark-text)' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            Facebook
          </button>
          <button
            onClick={shareToThreads}
            className="w-full flex items-center gap-3 px-4 py-3 text-[0.85rem] text-left hover:bg-white/5 transition-colors"
            style={{ color: 'var(--dark-text)' }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 14.5c-1.5 1-3.5 1.5-5 .5s-2-3-.5-4.5 4-1.5 5.5 0 1.5 3 0 4z"/></svg>
            Threads
          </button>
        </div>
      )}
    </div>
  )
}
