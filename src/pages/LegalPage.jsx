import { Link } from 'react-router-dom'
import './LegalPage.css'

export default function LegalPage({ title, children }) {
  return (
    <div className="legal-page">
      <Link to="/" className="legal-back-link">
        ← Back to On The List
      </Link>
      <h1 className="legal-title">{title}</h1>
      <div className="legal-body">{children}</div>
    </div>
  )
}
