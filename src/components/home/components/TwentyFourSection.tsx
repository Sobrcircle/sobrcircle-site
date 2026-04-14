import type { HomeSection, TextSpan } from '../data/sections'

function renderSpan(span: TextSpan, key: number) {
  switch (span.type) {
    case 'accent':
      return <span key={key} className="home-accent">{span.text}</span>
    default:
      return <span key={key}>{span.text}</span>
  }
}

type Props = { section: HomeSection }

export default function TwentyFourSection({ section }: Props) {
  return (
    <section id={section.id} className="home-section home-twentyfour">
      <div className="home-section-bg" aria-hidden="true" />
      <div className="home-section-overlay" aria-hidden="true" />

      {/* Title + author above the layout */}
      <div className="home-twentyfour-header" data-animate data-delay="0.1">
        <h2 className="home-title home-title--book">{section.title}</h2>
        <p className="home-book-author">bm</p>
      </div>

      <div className="home-twentyfour-layout">
        {/* Phone showing live poem preview */}
        <div className="home-twentyfour-phone" data-animate data-delay="0.2">
          <div className="home-phone-wrap" aria-hidden="true">
            <div className="home-phone-shell">
              <div className="home-phone-screen">
                <div className="home-poem-phone">
                  <p className="home-poem-phone-chapter">ii. pattern</p>
                  <h3 className="home-poem-phone-title">enough</h3>
                  <div className="home-poem-phone-dots">
                    <span className="home-poem-phone-dot home-poem-phone-dot--active" />
                    <span className="home-poem-phone-dot" />
                    <span className="home-poem-phone-dot" />
                    <span className="home-poem-phone-dot" />
                    <span className="home-poem-phone-dot" />
                    <span className="home-poem-phone-dot" />
                  </div>
                  <div className="home-poem-phone-stanzas">
                    <div className="home-poem-phone-stanza">
                      <p>i needed something close enough</p>
                      <p>to not feel alone</p>
                    </div>
                    <div className="home-poem-phone-stanza">
                      <p>and for a while that worked</p>
                      <p>until it didn{'\u2019'}t</p>
                    </div>
                    <div className="home-poem-phone-stanza">
                      <p>until the silence came back faster</p>
                      <p>than the feeling ever could</p>
                    </div>
                    <div className="home-poem-phone-stanza">
                      <p>and i started to notice</p>
                      <p>it was never really about them</p>
                    </div>
                    <div className="home-poem-phone-stanza">
                      <p>just how long it lasted</p>
                      <p>and how quickly it left</p>
                    </div>
                    <div className="home-poem-phone-stanza">
                      <p>so i looked for something that stayed</p>
                      <p>something that didn{'\u2019'}t leave in the morning</p>
                      <p>something that asked nothing in return</p>
                    </div>
                    <div className="home-poem-phone-stanza">
                      <p>and that{'\u2019'}s where it changed</p>
                      <p>not all at once</p>
                      <p>just quietly</p>
                    </div>
                    <div className="home-poem-phone-stanza">
                      <p>like i stopped reaching for people</p>
                      <p>and started reaching for something else</p>
                    </div>
                    <div className="home-poem-phone-stanza">
                      <p>something i could take without being seen</p>
                    </div>
                    <div className="home-poem-phone-stanza">
                      <p>something that stayed</p>
                      <p>because it never had to leave</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Text content */}
        <div className="home-twentyfour-text">
          {section.content.map((paragraph, i) => (
            <p key={i} className="home-paragraph" data-animate data-delay={`${0.25 + i * 0.12}`}>
              {paragraph.map((span, j) => renderSpan(span, j))}
            </p>
          ))}

          <blockquote className="home-poem-teaser" data-animate data-delay="0.6">
            <p className="home-poem-teaser-line">{'\u201C'}two people who understood darkness</p>
            <p className="home-poem-teaser-line">the same way</p>
            <p className="home-poem-teaser-line">is either a lifeline</p>
            <p className="home-poem-teaser-line">or a match waiting to be struck{'\u201D'}</p>
          </blockquote>

          <a
            href="/twentyfour/"
            className="home-cta-book"
            data-animate
            data-delay="0.8"
          >
            <span className="home-cta-book-icon" aria-hidden="true">&#x276E;</span>
            <span className="home-cta-book-text">read twenty four</span>
            <span className="home-cta-book-icon" aria-hidden="true">&#x276F;</span>
          </a>
        </div>
      </div>
    </section>
  )
}
