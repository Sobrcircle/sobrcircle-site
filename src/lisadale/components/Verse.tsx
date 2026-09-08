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
        &ldquo;Therefore a man will leave his father and his mother,
        and will join with his wife, and they will be one flesh.&rdquo;
      </p>
      <p className="ld-verse-ref" data-animate data-delay="0.3">
        Genesis 2:24
      </p>
    </section>
  )
}
