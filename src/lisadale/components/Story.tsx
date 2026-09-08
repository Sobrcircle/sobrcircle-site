import Cross from './Cross'

/**
 * Scripture, then their calling.
 *
 * Everything factual came from Ben directly: that they walk with God, that
 * they give themselves in service to others, that they are a light. Nothing
 * about how they met, when, or where is invented to fill space, and nothing
 * here narrates them — it honours them.
 *
 * Scripture is the World English Bible (public domain), which reads plainly
 * rather than in thee-and-thou.
 */
export default function Story() {
  return (
    <section className="ld-section ld-story" id="story">
      <div className="ld-light-verse-block">
        <div className="ld-rule" data-animate style={{ marginBottom: '2rem' }}>
          <Cross size={16} />
        </div>
        <p className="ld-verse-text" data-animate data-delay="0.1">
          &ldquo;You are the light of the world.<br />
          A city set on a hill cannot be hidden.&rdquo;
        </p>
        <p className="ld-verse-ref" data-animate data-delay="0.2">Matthew 5:14</p>
      </div>

      <div className="ld-section-head">
        <p className="ld-label" data-animate>Their Calling</p>
        <h2 className="ld-title" data-split data-split-delay="0.1">
          A faith you can see from the outside
        </h2>
      </div>

      <div className="ld-prose">
        <p data-animate>
          Faith is not something Lisa and Dale talk about. It is the ground they
          stand on, and you can tell by where their feet keep taking them.
        </p>
        <p data-animate data-delay="0.1">
          They have spent years walking into rooms where hope had gone quiet.
          Sitting with people in the hours that have no words. Staying long
          past the point where staying is easy, and coming back the next day,
          and the day after that. Not because anyone asked them to, but because
          they were once met that way themselves, in their own dark, by a God
          who did not look away &mdash; and you cannot be handed something like
          that and keep it.
        </p>
        <p data-animate data-delay="0.2">
          So they give it away. Quietly, without announcement, to whoever is in
          front of them. It is the plainest thing about them and the truest,
          and it is why the people in these photographs came.
        </p>
        <p data-animate data-delay="0.3">
          Today those two lives become one. The work does not change. There is
          simply more of it now, and they will carry it together.
        </p>
      </div>
    </section>
  )
}
