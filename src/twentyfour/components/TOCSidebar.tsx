const chapters = [
  { title: 'i. illusion', poems: ['sixteen', 'taken', 'nights', 'again', 'born', 'promises'] },
  { title: 'ii. pattern', poems: ['enough', 'rehab', 'clear', 'bend', 'gone', 'hollow'] },
  {
    title: 'iii. realization',
    poems: ['back', 'hidden', 'split', 'real', 'crash', 'last'],
  },
  {
    title: 'iv. change',
    poems: ['habit', 'phoenix', 'almost', 'finding', 'god', 'twentyfour'],
  },
]

const poemTitles: Record<string, string> = {
  sixteen: 'sixteen',
  taken: 'taken',
  nights: 'nights',
  again: 'again',
  born: 'born',
  promises: 'promises',
  enough: 'enough',
  rehab: 'rehab',
  clear: 'clear',
  bend: 'bend',
  gone: 'gone',
  hollow: 'hollow',
  back: 'back',
  hidden: 'hidden',
  split: 'split',
  real: 'real',
  crash: 'crash',
  last: 'last',
  habit: 'habit',
  phoenix: 'phoenix',
  almost: 'almost',
  finding: 'finding',
  god: 'god',
  twentyfour: 'twenty four',
}

export default function TOCSidebar({
  open,
  onClose,
  currentId,
  onGoTo,
  bookmarks = [],
}: {
  open: boolean
  onClose: () => void
  currentId: string
  onGoTo: (id: string) => void
  bookmarks?: string[]
}) {
  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-[200] bg-black/50 transition-opacity duration-250 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-[320px] max-w-[85vw] z-[201] overflow-y-auto transition-transform duration-300 ease-out ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          background: 'var(--dark-bg)',
          color: 'var(--dark-text)',
          WebkitOverflowScrolling: 'touch',
          padding: '48px 28px 28px',
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[1.4rem] opacity-50 hover:opacity-100 p-2 bg-transparent border-none cursor-pointer"
          style={{ color: 'var(--dark-text)' }}
        >
          &times;
        </button>

        <h2 className="text-[1.1rem] font-normal tracking-[0.08em] mb-7 lowercase">contents</h2>

        {chapters.map((ch) => (
          <div key={ch.title} className="mb-5">
            <div
              className="italic text-[0.85rem] tracking-[0.03em] mb-2"
              style={{ color: 'var(--dark-muted)' }}
            >
              {ch.title}
            </div>
            {ch.poems.map((poemId) => (
              <button
                key={poemId}
                onClick={() => {
                  onGoTo(poemId)
                  onClose()
                }}
                className={`block w-full text-left py-[6px] text-[0.95rem] bg-transparent border-none cursor-pointer font-[inherit] transition-opacity duration-150 ${
                  currentId === poemId ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                }`}
                style={{
                  color: currentId === poemId ? 'var(--accent)' : 'var(--dark-text)',
                }}
              >
                <span className="flex items-center gap-2">
                  {poemTitles[poemId]}
                  {bookmarks.includes(poemId) && (
                    <span
                      className="inline-block w-[5px] h-[5px] rounded-full flex-shrink-0"
                      style={{ background: 'var(--accent)' }}
                    />
                  )}
                </span>
              </button>
            ))}
          </div>
        ))}
      </div>
    </>
  )
}
