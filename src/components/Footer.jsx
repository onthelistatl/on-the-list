import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="app-footer">
      <p className="footer-disclaimer">
        Info is crowdsourced and may be inaccurate. Always verify cover,
        dress code, and hours with the venue directly.
      </p>
      <nav className="footer-links">
        <Link to="/terms">Terms of Service</Link>
        <span className="footer-dot">·</span>
        <Link to="/privacy">Privacy Policy</Link>
      </nav>
    </footer>
  )
}
