import type { BookPage } from '../data/pages'

export default function ProsePage({
  title,
  paragraphs,
  centered,
}: {
  title?: string
  paragraphs: NonNullable<BookPage['paragraphs']>
  centered?: boolean
}) {
  return (
    <div className={`page-content ${centered ? 'centered' : 'top'}`}>
      <div className={`prose-body ${centered ? 'text-center' : ''}`}>
        {title && <h2>{title}</h2>}
        {paragraphs.map((p, i) => (
          <p key={i} className={p.italic ? 'italic' : ''}>
            {p.text}
          </p>
        ))}
      </div>
    </div>
  )
}
