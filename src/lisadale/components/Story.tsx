import Cross from './Cross'

/**
 * The heart of the page. Everything factual here came from Ben directly —
 * that they walk with God, that they came through battles, that Dale walks
 * with the men and Lisa with the women, that they are a light. Nothing about
 * how they met, when, or where is invented to fill space.
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
        <p className="ld-label" data-animate>Two Made One</p>
        <h2 className="ld-title" data-split data-split-delay="0.1">
          Perfectly imperfect, and held the whole way
        </h2>
      </div>

      <div className="ld-prose">
        <p data-animate>
          Lisa and Dale did not come to this day by an easy road. They came
          through battles — the kind that test what a person is made of, and
          the kind no one is meant to fight alone.
        </p>
        <p data-animate data-delay="0.1">
          What carried them was never their own strength. It was the third
          strand in the cord: a God who does not let go, who takes two people
          and makes them one, and who finishes what He begins.
        </p>
        <p data-animate data-delay="0.2">
          Perfectly imperfect. Still standing. Still choosing each other.
          Still His.
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
