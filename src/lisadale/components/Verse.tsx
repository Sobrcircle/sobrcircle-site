import Cross from './Cross'

/**
 * Scripture beat between the hero and the film. The quotation is KJV/public
 * domain, so nothing here needs licensing.
 */
export default function Verse() {
  return (
    <section className="ld-verse">
      <div className="ld-rule" data-animate>
        <Cross size={18} />
      </div>
      <p className="ld-verse-text" data-animate data-delay="0.15">
        &ldquo;So they are no longer two, but one.
        What God has joined together, let no one separate.&rdquo;
      </p>
      <p className="ld-verse-ref" data-animate data-delay="0.3">
        Matthew 19:6
      </p>
    </section>
  )
}
