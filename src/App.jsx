import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AuroraBackground from './components/AuroraBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Education from './components/Education'
import Certificates from './components/Certificates'
import GitHubStats from './components/GitHubStats'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CodeRain from './components/CodeRain'

function App() {
  // Smooth-reveal animation for the entire page
  useEffect(() => {
    // Force a repaint to ensure animations run
    document.body.style.overflowX = 'clip'
  }, [])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="portfolio"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <AuroraBackground>
          <CodeRain />
          <Navbar />
          <main>
            <Hero />
            <div
              style={{
                position: 'relative',
                zIndex: 1,
                pointerEvents: 'none',
              }}
            >
              {/* Subtle section dividers using gradients */}
              <SectionDivider />
            </div>
            <About />
            <SectionDivider accent="purple" />
            <Skills />
            <SectionDivider accent="primary" />
            <Projects />
            <SectionDivider accent="accent" />
            <Experience />
            <SectionDivider accent="primary" />
            <Education />
            <SectionDivider accent="purple" />
            <Certificates />
            <SectionDivider accent="primary" />
            <GitHubStats />
            <SectionDivider accent="accent" />
            <Contact />
          </main>
          <Footer />

          {/* Floating scroll-to-top button */}
          <ScrollToTop />
        </AuroraBackground>
      </motion.div>
    </AnimatePresence>
  )
}

function SectionDivider({ accent = 'primary' }) {
  const colors = {
    primary: 'var(--color-primary)',
    accent: 'var(--color-accent)',
    purple: 'var(--color-purple)',
  }
  const color = colors[accent] || colors.primary

  return (
    <div
      style={{
        height: 1,
        width: '80%',
        maxWidth: 300,
        margin: '0 auto',
        background: `linear-gradient(90deg, transparent, ${color}40, transparent)`,
        pointerEvents: 'none',
      }}
    />
  )
}

function ScrollToTop() {
  useEffect(() => {
    const handleScroll = () => {
      const btn = document.getElementById('scroll-top-btn')
      if (!btn) return
      if (window.scrollY > 600) {
        btn.style.opacity = '1'
        btn.style.pointerEvents = 'auto'
        btn.style.transform = 'translateY(0)'
      } else {
        btn.style.opacity = '0'
        btn.style.pointerEvents = 'none'
        btn.style.transform = 'translateY(20px)'
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.button
      id="scroll-top-btn"
      onClick={scrollToTop}
      initial={{ opacity: 0, y: 20 }}
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
        fontSize: 20,
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
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Scroll to top"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 17V3M4 9l6-6 6 6" />
      </svg>
    </motion.button>
  )
}

export default App