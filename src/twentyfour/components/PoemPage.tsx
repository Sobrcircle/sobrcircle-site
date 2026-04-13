import ShareButton from './ShareButton'
import BookmarkButton from './BookmarkButton'

export default function PoemPage({
  id,
  chapter,
  title,
  stanzas,
  poemIndex,
  chapterPoemCount,
  isBookmarked,
  onToggleBookmark,
}: {
  id: string
  chapter: string
  title: string
  stanzas: string[][]
  poemIndex: number
  chapterPoemCount: number
  isBookmarked: boolean
  onToggleBookmark: () => void
}) {
  return (
    <div className="page-content top">
      <div className="poem-body">
        {/* Header row: chapter label + actions */}
        <div className="flex items-start justify-between mb-1">
          <div className="poem-chapter-label">{chapter}</div>
          <div className="flex items-center gap-0">
            <BookmarkButton active={isBookmarked} onToggle={onToggleBookmark} />
            <ShareButton poemId={id} poemTitle={title} theme="light" />
          </div>
        </div>

        <div className="poem-title">{title}</div>

        {/* Chapter progress dots */}
        <div className="flex items-center gap-[7px] mb-7">
          {Array.from({ length: chapterPoemCount }).map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-colors duration-200"
              style={{
                width: 5,
                height: 5,
                background:
                  i === poemIndex ? 'var(--accent)' : 'rgba(138, 133, 128, 0.25)',
              }}
            />
          ))}
        </div>

        {/* Stanzas */}
        {stanzas.map((stanza, si) => (
          <div key={si} className="stanza">
            {stanza.map((line, li) => (
              <span key={li} className="line">
                {line}
              </span>
            ))}
          </div>
        ))}

        {/* Author signature */}
        <div className="mt-10 italic font-bold text-[0.85rem] tracking-[0.08em]">
          bm
        </div>
      </div>
    </div>
  )
}
