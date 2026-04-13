import { useState, useEffect, useCallback } from 'react'
import { ArrowUpFromLine, Download, Link, X } from 'lucide-react'
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
  const [toast, setToast] = useState('')
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
    }
  }, [modalOpen, chapter, poemTitle, stanzas])

  // Clean up blob URL
  useEffect(() => {
    return () => { if (cardUrl) URL.revokeObjectURL(cardUrl) }
  }, [cardUrl])

  const close = useCallback(() => {
    setModalOpen(false)
    setToast('')
  }, [])

  // Lock body scroll when modal open
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = '' }
    }
  }, [modalOpen])

  const flash = (msg: string) => {
    setToast(msg)
    setTimeout(() => setToast(''), 2000)
  }

  // Native share — sends link (OG preview shows on receiving end)
  const handleShare = async () => {
    try {
      await navigator.share({ title: 'twenty four', text: shareText, url: shareUrl })
    } catch {}
  }

  // Native share with image — for social media posting
  const handleShareImage = async () => {
    if (!cardBlob) return
    const file = new File([cardBlob], `${poemId}-twentyfour.png`, { type: 'image/png' })
    try {
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: 'twenty four', text: shareText })
        return
      }
    } catch {}
    // fallback: download
    handleDownloadCard()
  }

  // Download the quote card image
  const handleDownloadCard = () => {
    if (!cardUrl) return
    const a = document.createElement('a')
    a.href = cardUrl
    a.download = `${poemId}-twentyfour.png`
    a.click()
    flash('saved')
  }

  // Copy link
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      flash('link copied')
    } catch {}
  }

  const openUrl = (url: string) => window.open(url, '_blank')

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        aria-label="share this poem"
        className="p-2 opacity-40 hover:opacity-80 transition-opacity touch-manipulation"
      >
        <ArrowUpFromLine size={18} color={iconColor} strokeWidth={1.5} />
      </button>

      {modalOpen && (
        <div
          className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.88)' }}
        >
          <div className="absolute inset-0" onClick={close} />

          <div
            className="relative w-full max-w-[420px] max-h-[90dvh] overflow-y-auto rounded-t-2xl sm:rounded-2xl border border-white/5"
            style={{ background: '#0a0a0a', color: '#e8e4df' }}
          >
            <button
              onClick={close}
              className="absolute top-4 right-4 p-2 opacity-50 hover:opacity-100 bg-transparent border-none cursor-pointer z-10"
              style={{ color: '#e8e4df' }}
            >
              <X size={20} strokeWidth={1.5} />
            </button>

            <div className="p-6 pt-8">
              {/* Quote card preview */}
              <div className="mb-5 rounded-lg overflow-hidden aspect-square" style={{ background: '#000' }}>
                {cardUrl ? (
                  <img src={cardUrl} alt="quote card" className="w-full h-full object-contain" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[0.8rem] opacity-30">generating...</div>
                )}
              </div>

              {/* Toast */}
              {toast && (
                <div className="text-center text-[0.8rem] tracking-[0.06em] mb-3" style={{ color: '#c4a882' }}>
                  {toast}
                </div>
              )}

              {/* Actions */}
              <div className="space-y-0.5 mb-4">
                {typeof navigator !== 'undefined' && 'share' in navigator && (
                  <ActionBtn icon={<ArrowUpFromLine size={16} strokeWidth={1.5} />} label="share link" onClick={handleShare} />
                )}
                {typeof navigator !== 'undefined' && 'share' in navigator && (
                  <ActionBtn icon={<ArrowUpFromLine size={16} strokeWidth={1.5} />} label="share quote card" onClick={handleShareImage} />
                )}
                <ActionBtn icon={<Download size={16} strokeWidth={1.5} />} label="save quote card" onClick={handleDownloadCard} />
                <ActionBtn icon={<Link size={16} strokeWidth={1.5} />} label="copy link" onClick={handleCopyLink} />
              </div>

              {/* Divider */}
              <div className="h-px mb-3" style={{ background: 'rgba(255,255,255,0.06)' }} />

              {/* Platform share links — these send the link, platform shows OG preview */}
              <div className="space-y-0.5 pb-2">
                <PlatformBtn label="x / twitter" onClick={() => openUrl(`https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`)} />
                <PlatformBtn label="facebook" onClick={() => openUrl(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`)} />
                <PlatformBtn label="threads" onClick={() => openUrl(`https://www.threads.net/intent/post?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`)} />
                <PlatformBtn label="whatsapp" onClick={() => openUrl(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`)} />
                <PlatformBtn label="reddit" onClick={() => openUrl(`https://www.reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`)} />
                <PlatformBtn label="email" onClick={() => openUrl(`mailto:?subject=${encodeURIComponent('twenty four \u2014 ' + poemTitle)}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`)} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function ActionBtn({ icon, label, onClick }: { icon: React.ReactNode; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 py-2.5 px-3 rounded-lg text-[0.85rem] bg-transparent border-none cursor-pointer font-[inherit] opacity-70 hover:opacity-100 hover:bg-white/5 transition-all"
      style={{ color: '#e8e4df' }}
    >
      {icon}
      {label}
    </button>
  )
}

function PlatformBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="block w-full text-left py-2 px-3 rounded-lg text-[0.85rem] bg-transparent border-none cursor-pointer font-[inherit] opacity-50 hover:opacity-100 hover:bg-white/5 transition-all"
      style={{ color: '#e8e4df' }}
    >
      {label}
    </button>
  )
}
