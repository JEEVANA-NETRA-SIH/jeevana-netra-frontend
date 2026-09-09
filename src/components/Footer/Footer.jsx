import './Footer.css'

const links = [
  { label: 'Roadmap', href: '#roadmap' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Explainable AI', href: '#explainable-ai' },
  { label: 'Impact', href: '#impact' },
  { label: 'Login', href: '#' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__top">
          <div className="footer__brand">
            <a href="#" className="footer__logo">
              <img className="footer__logo-img" src="/newheronavbarlogo.png" alt="Jeevana Netra" />
            </a>
            <p className="footer__tagline">Protecting Vision. Preserving Life.</p>
          </div>

          <nav className="footer__nav" aria-label="Footer navigation">
            {links.map((link) => (
              <a key={link.href + link.label} href={link.href} className="footer__link">
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="footer__divider" />

        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; 2026 Jeevana Netra. Smart India Hackathon 2026 • SIH26038 • MATLAB + Simulink.
          </p>
          <p className="footer__disclaimer">
            Jeevana Netra is an AI-assisted retinal screening and risk-assessment prototype designed to support healthcare workflows. It is not a substitute for professional medical diagnosis, clinical judgment, or treatment.
          </p>
        </div>
      </div>
    </footer>
  )
}
