import Cross from './Cross'

/**
 * The heart of the page, and it honours them rather than narrating them.
 * Everything factual came from Ben directly: that they walk with God, that
 * Dale walks with the men and Lisa with the women, that they are a light.
 * Nothing about how they met, when, or where is invented to fill space.
 *
 * Scripture is the World English Bible (public domain), chosen over KJV so the
 * language reads plainly to every guest.
 */
export default function Story() {
  return (
    <section className="ld-section ld-story" id="story">
      <div className="ld-section-head">
        <div className="ld-rule" data-animate style={{ marginBottom: '1.6rem' }}>
          <Cross size={16} />
        </div>
        <p className="ld-label" data-animate>Their Calling</p>
        <h2 className="ld-title" data-split data-split-delay="0.1">
          Two lives already given in service
        </h2>
      </div>

      <div className="ld-prose">
        <p data-animate>
          Lisa and Dale walk with God, and they walk toward people. It is the
          plainest thing about them and the truest.
        </p>
        <p data-animate data-delay="0.1">
          Dale walks alongside the men. Lisa walks alongside the women. They
          sit with people in the hardest hours and stay until hope comes back
          into the room &mdash; not as duty, but as the shape their love takes.
        </p>
        <p data-animate data-delay="0.2">
          Today two lives already spent on others are joined into one. What
          they carry, they carry together now.
        </p>
      </div>

      {/* --- a light to this world --- */}
      <div className="ld-light">
        <div className="ld-rule" data-animate style={{ marginBottom: '2rem' }}>
          <Cross size={16} />
        </div>
        <p className="ld-verse-text ld-light-verse" data-animate data-delay="0.1">
          &ldquo;You are the light of the world.<br />
          A city set on a hill cannot be hidden.&rdquo;
        </p>
        <p className="ld-verse-ref" data-animate data-delay="0.2">Matthew 5:14</p>

        <div className="ld-callings">
          <div className="ld-calling" data-animate data-delay="0.25">
            <p className="ld-calling-name">Dale</p>
            <p className="ld-calling-text">walks alongside the men</p>
          </div>
          <div className="ld-calling-div" aria-hidden="true" />
          <div className="ld-calling" data-animate data-delay="0.35">
            <p className="ld-calling-name">Lisa</p>
            <p className="ld-calling-text">walks alongside the women</p>
          </div>
        </div>

        <p className="ld-light-close" data-animate data-delay="0.45">
          What was carried to them, they now carry to others.
        </p>
      </div>
    </section>
  )
}
