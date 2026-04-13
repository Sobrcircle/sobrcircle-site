import { useState, useEffect, useCallback } from 'react'
import { ArrowUpFromLine, Download, Copy, Link, X } from 'lucide-react'
import { generateQuoteCard } from './QuoteCard'

const BASE_URL = 'https://sobrcircle.com/twentyfour'

export default function ShareButton({
  poemId,
  poemTitle,
  chapter,
  stanzas,
}: {
  poemId: string
  poemTitle: string
  chapter: string
  stanzas: string[][]
}) {
  const [modalOpen, setModalOpen] = useState(false)
  const [cardBlob, setCardBlob] = useState<Blob | null>(null)
  const [cardUrl, setCardUrl] = useState<string>('')
  const [copied, setCopied] = useState('')
  const iconColor = '#1a1a1a'

  const shareUrl = `${BASE_URL}/#${poemId}`
  const shareText = `"${poemTitle}" \u2014 twenty four, by bm`

  // Generate card when modal opens
  useEffect(() => {
    if (!modalOpen) return
    let revoked = false
    generateQuoteCard({ chapter, title: poemTitle, stanzas }).then((blob) => {
      if (revoked) return
      setCardBlob(blob)
      setCardUrl(URL.createObjectURL(blob))
    })
    return () => {
      revoked = true
      if (cardUrl) URL.revokeObjectURL(cardUrl)
    }
  }, [modalOpen, chapter, poemTitle, stanzas])

  // Clean up on unmount
  useEffect(() => {
    return () => { if (cardUrl) URL.revokeObjectURL(cardUrl) }
  }, [cardUrl])

  const close = useCallback(() => {
    setModalOpen(false)
    setCopied('')
  }, [])

  // Lock body scroll when modal open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [modalOpen])

  const handleNativeShare = async () => {
    if (!cardBlob) return
    const file = new File([cardBlob], `${poemId}-twentyfour.png`, { type: 'image/png' })
    try {
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: 'twenty four', text: shareText })
        return
      }
    } catch {}
    // fallback: try share without file
    try {
      await navigator.share({ title: 'twenty four', text: shareText, url: shareUrl })
    } catch {}
  }

  const handleSaveImage = () => {
    if (!cardUrl) return
    const a = document.createElement('a')
    a.href = cardUrl
    a.download = `${poemId}-twentyfour.png`
    a.click()
    flash('saved!')
  }

  const handleCopyImage = async () => {
    if (!cardBlob) return
    try {
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': cardBlob })
      ])
      flash('copied!')
    } catch {
      // fallback to save
      handleSaveImage()
    }
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      flash('copied!')
    } catch {}
  }

  const flash = (msg: string) => {
    setCopied(msg)
    setTimeout(() => setCopied(''), 1500)
  }

  const openUrl = (url: string) => {
    window.open(url, '_blank')
  }

  const handleInstagram = () => {
    handleSaveImage()
    flash('image saved \u2014 open instagram to post')
  }

  const handleSnapchat = () => {
    handleSaveImage()
    flash('image saved \u2014 open snapchat to post')
  }

  const platforms = [
    { label: 'x / twitter', action: () => openUrl(`https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`) },
    { label: 'facebook', action: () => openUrl(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`) },
    { label: 'threads', action: () => openUrl(`https://www.threads.net/intent/post?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`) },
    { label: 'whatsapp', action: () => openUrl(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`) },
    { label: 'instagram', action: handleInstagram },
    { label: 'snapchat', action: handleSnapchat },
    { label: 'reddit', action: () => openUrl(`https://www.reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`) },
    { label: 'email', action: () => openUrl(`mailto:?subject=${encodeURIComponent('twenty four \u2014 ' + poemTitle)}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`) },
  ]

  return (
    <>
      {/* Share icon button — arrow pointing straight up in box */}
      <button
        onClick={() => setModalOpen(true)}
        aria-label="share this poem"
        className="p-2 opacity-40 hover:opacity-80 transition-opacity touch-manipulation"
      >
        <ArrowUpFromLine size={18} color={iconColor} strokeWidth={1.5} />
      </button>

      {/* Share modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center" style={{ background: 'rgba(0,0,0,0.85)' }}>
          {/* Backdrop */}
          <div className="absolute inset-0" onClick={close} />

          {/* Modal */}
          <div
            className="relative w-full max-w-[420px] max-h-[90dvh] overflow-y-auto rounded-t-2xl sm:rounded-2xl border border-white/5"
            style={{ background: '#0a0a0a', color: 'var(--dark-text)' }}
          >
            {/* Close */}
            <button
              onClick={close}
              className="absolute top-4 right-4 p-2 opacity-50 hover:opacity-100 bg-transparent border-none cursor-pointer z-10"
              style={{ color: 'var(--dark-text)' }}
            >
              <X size={20} strokeWidth={1.5} />
            </button>

            <div className="p-6 pt-8">
              {/* Card preview */}
              <div className="mb-6 rounded-lg overflow-hidden aspect-square flex items-center justify-center" style={{ background: '#000' }}>
                {cardUrl ? (
                  <img src={cardUrl} alt="quote card" className="w-full h-full object-contain" />
                ) : (
                  <div className="text-[0.8rem] opacity-30">generating...</div>
                )}
              </div>

              {/* Toast */}
              {copied && (
                <div className="text-center text-[0.8rem] tracking-[0.06em] mb-4" style={{ color: 'var(--accent)' }}>
                  {copied}
                </div>
              )}

              {/* Primary actions */}
              <div className="space-y-1 mb-4">
                {typeof navigator !== 'undefined' && 'share' in navigator && (
                  <ShareAction icon={<ArrowUpFromLine size={16} strokeWidth={1.5} />} label="share" onClick={handleNativeShare} />
                )}
                <ShareAction icon={<Download size={16} strokeWidth={1.5} />} label="save image" onClick={handleSaveImage} />
                <ShareAction icon={<Copy size={16} strokeWidth={1.5} />} label="copy image" onClick={handleCopyImage} />
                <ShareAction icon={<Link size={16} strokeWidth={1.5} />} label="copy link" onClick={handleCopyLink} />
              </div>

              {/* Divider */}
              <div className="h-px mb-4" style={{ background: 'rgba(255,255,255,0.06)' }} />

              {/* Platform links */}
              <div className="space-y-1 pb-2">
                {platforms.map((p) => (
                  <button
                    key={p.label}
                    onClick={p.action}
                    className="block w-full text-left py-2 px-3 rounded-lg text-[0.85rem] bg-transparent border-none cursor-pointer font-[inherit] opacity-60 hover:opacity-100 hover:bg-white/5 transition-all"
                    style={{ color: 'var(--dark-text)' }}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function ShareAction({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 py-2.5 px-3 rounded-lg text-[0.85rem] bg-transparent border-none cursor-pointer font-[inherit] opacity-70 hover:opacity-100 hover:bg-white/5 transition-all"
      style={{ color: 'var(--dark-text)' }}
    >
      {icon}
      {label}
    </button>
  )
}
