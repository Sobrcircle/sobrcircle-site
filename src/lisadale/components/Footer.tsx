import Cross from './Cross'

export default function Footer() {
  return (
    <footer className="ld-footer">
      <div className="ld-rule" data-animate>
        <Cross size={18} />
      </div>
      <p className="ld-footer-script" data-animate data-delay="0.15">
        Lisa &amp; Dale Laporte
      </p>
    </footer>
  )
}
