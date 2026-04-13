import { Bookmark } from 'lucide-react'

export default function BookmarkButton({
  active,
  onToggle,
}: {
  active: boolean
  onToggle: () => void
}) {
  return (
    <button
      onClick={onToggle}
      aria-label={active ? 'Remove bookmark' : 'Bookmark this poem'}
      className="p-2 transition-all duration-200 touch-manipulation"
      style={{ opacity: active ? 1 : 0.35 }}
    >
      <Bookmark
        size={18}
        strokeWidth={1.5}
        color={active ? 'var(--accent)' : 'var(--light-muted)'}
        fill={active ? 'var(--accent)' : 'none'}
      />
    </button>
  )
}
