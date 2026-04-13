import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Theme } from '../data/pages'

export default function Navigation({
  label,
  theme,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: {
  label: string
  theme: Theme
  onPrev: () => void
  onNext: () => void
  hasPrev: boolean
  hasNext: boolean
}) {
  const isDark = theme === 'dark'
  const iconColor = isDark ? '#e8e4df' : '#1a1a1a'

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 sm:px-5 sm:py-4"
      style={{
        background: isDark
          ? 'linear-gradient(transparent, rgba(10,10,10,0.6))'
          : 'linear-gradient(transparent, rgba(250,248,245,0.8))',
      }}
    >
      <button
        onClick={onPrev}
        disabled={!hasPrev}
        aria-label="Previous page"
        className="p-3 opacity-50 hover:opacity-100 disabled:opacity-15 disabled:cursor-default transition-opacity touch-manipulation"
      >
        <ChevronLeft size={22} color={iconColor} strokeWidth={1.5} />
      </button>

      <div
        className="text-[0.7rem] tracking-[0.08em] opacity-45 text-center max-w-[60%] truncate"
        style={{ color: isDark ? '#e8e4df' : '#1a1a1a' }}
        dangerouslySetInnerHTML={{ __html: label }}
      />

      <button
        onClick={onNext}
        disabled={!hasNext}
        aria-label="Next page"
        className="p-3 opacity-50 hover:opacity-100 disabled:opacity-15 disabled:cursor-default transition-opacity touch-manipulation"
      >
        <ChevronRight size={22} color={iconColor} strokeWidth={1.5} />
      </button>
    </div>
  )
}
