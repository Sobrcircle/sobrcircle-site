export default function PoemPage({
  chapter,
  title,
  stanzas,
}: {
  chapter: string
  title: string
  stanzas: string[][]
}) {
  return (
    <div className="page-content top">
      <div className="poem-body">
        <div className="poem-chapter-label">{chapter}</div>
        <div className="poem-title">{title}</div>
        {stanzas.map((stanza, si) => (
          <div key={si} className="stanza">
            {stanza.map((line, li) => (
              <span key={li} className="line">
                {line}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
