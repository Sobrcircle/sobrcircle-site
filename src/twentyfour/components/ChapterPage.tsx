export default function ChapterPage({ title }: { title: string }) {
  return (
    <div className="page-content centered">
      <div className="text-[clamp(1.3rem,3vw,1.8rem)] font-normal italic tracking-[0.05em]">
        {title}
      </div>
    </div>
  )
}
