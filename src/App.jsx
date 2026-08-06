import { useEffect } from 'react'
import AuroraBackground from './components/AuroraBackground'
import PremiumBackground from './components/PremiumBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Education from './components/Education'
import Certificates from './components/Certificates'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CodeRain from './components/CodeRain'

function App() {
  useEffect(() => {
    document.body.style.overflowX = 'clip'
  }, [])

  return (
    <div style={{ position: 'relative' }}>
      <AuroraBackground>
        <PremiumBackground />
        <CodeRain />
        <Navbar />
        <main style={{ position: 'relative', zIndex: 1 }}>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Education />
          <Certificates />
          <Contact />
        </main>
        <Footer />
        <ScrollToTop />
      </AuroraBackground>
    </div>
  )
}

function ScrollToTop() {
  useEffect(() => {
    const btn = document.getElementById('scroll-top-btn')
    const handleScroll = () => {
      if (!btn) return
      const show = window.scrollY > 600
      btn.style.opacity = show ? '1' : '0'
      btn.style.pointerEvents = show ? 'auto' : 'none'
      btn.style.transform = show ? 'translateY(0)' : 'translateY(20px)'
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <button
      id="scroll-top-btn"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{
        position: 'fixed',
        bottom: 32,
        right: 32,
        zIndex: 999,
        width: 48,
        height: 48,
        borderRadius: '50%',
        background: 'var(--gradient-primary)',
        border: 'none',
        color: '#fff',
        cursor: 'pointer',
        boxShadow: 'var(--shadow-glow-primary)',
        transition: 'opacity 0.3s, transform 0.3s var(--ease-premium)',
        opacity: 0,
        pointerEvents: 'none',
        transform: 'translateY(20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      aria-label="Scroll to top"
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 17V3M4 9l6-6 6 6" />
      </svg>
    </button>
  )
}

export default App
