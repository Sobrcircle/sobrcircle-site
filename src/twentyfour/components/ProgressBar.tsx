export default function ProgressBar({
  current,
  total,
}: {
  current: number
  total: number
}) {
  const pct = total > 1 ? (current / (total - 1)) * 100 : 0

  return (
    <div
      className="fixed top-0 left-0 h-[2px] z-50 transition-[width] duration-300 ease-out"
      style={{
        width: `${pct}%`,
        background: 'var(--accent)',
      }}
    />
  )
}
