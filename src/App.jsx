import { Routes, Route } from 'react-router-dom'
import AgeGate from './components/AgeGate'
import Footer from './components/Footer'
import Home from './pages/Home'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import './App.css'

export default function App() {
  return (
    <AgeGate>
      <div className="app-shell">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
        <Footer />
      </div>
    </AgeGate>
  )
}
