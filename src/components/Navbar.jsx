import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS, HAMBURGER_LINKS, PROFILE } from '../data/portfolioData'
import { HiSun, HiMoon } from 'react-icons/hi'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hamburgerOpen, setHamburgerOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') !== 'light'
    }
    return true
  })
  const hamburgerRef = useRef(null)

  useEffect(() => {
    const allLinks = [...NAV_LINKS, ...HAMBURGER_LINKS]
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const sections = allLinks.map(l => l.href.replace('#', ''))
      const current = sections.find(id => {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          return rect.top <= 120 && rect.bottom >= 120
        }
        return false
      })
      if (current) setActiveSection(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light')
    localStorage.setItem('theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  // Close hamburger on outside click
  useEffect(() => {
    const handler = (e) => {
      if (hamburgerRef.current && !hamburgerRef.current.contains(e.target)) {
        setHamburgerOpen(false)
      }
    }
    if (hamburgerOpen) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [hamburgerOpen])

  const scrollTo = (href) => {
    setMenuOpen(false)
    setHamburgerOpen(false)
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20, delay: 0.1 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        height: 72,
        marginTop: 16,
        padding: '0 16px',
      }}
    >
      {/* Glass pill background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          margin: '0 16px',
          borderRadius: 'var(--radius-pill)',
          background: scrolled ? 'var(--glass-bg-strong)' : 'var(--glass-bg)',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
          border: '1px solid var(--glass-border)',
          boxShadow: scrolled
            ? '0 8px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.12)'
            : '0 4px 24px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.08)',
          transition: 'all 0.4s var(--ease-premium)',
          pointerEvents: 'none',
        }}
      />

      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <motion.button
          onClick={() => scrollTo('#home')}
          className="navbar-logo"
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            cursor: 'pointer',
            position: 'relative',
            zIndex: 2,
          }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <img
            src={PROFILE.logo}
            alt="Deepak Arya"
            style={{ height: 38, width: 'auto', borderRadius: 10, objectFit: 'contain' }}
          />
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: 20,
              letterSpacing: '-0.03em',
              background: 'var(--gradient-text)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Deepak Arya
          </span>
        </motion.button>

        {/* Desktop nav */}
        <div
          className="nav-desktop"
          style={{ display: 'flex', gap: 4, alignItems: 'center' }}
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace('#', '')
            return (
              <motion.button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                style={{
                  background: isActive ? 'rgba(99,102,241,0.15)' : 'none',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: 10,
                  color: isActive ? 'var(--color-text)' : 'var(--color-text-dim)',
                  fontSize: 14,
                  fontWeight: isActive ? 600 : 500,
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.2s',
                  zIndex: 2,
                }}
                whileHover={{ color: 'var(--color-text)', background: 'rgba(255,255,255,0.07)' }}
                whileTap={{ scale: 0.95 }}
              >
                {link.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    style={{
                      position: 'absolute',
                      bottom: 2,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 18,
                      height: 2,
                      background: 'var(--gradient-primary)',
                      borderRadius: 2,
                    }}
                  />
                )}
              </motion.button>
            )
          })}

          {/* Theme toggle */}
          <motion.button
            onClick={() => setDarkMode(p => !p)}
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              borderRadius: 12,
              padding: 9,
              color: 'var(--color-text)',
              cursor: 'pointer',
              fontSize: 18,
              lineHeight: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 4,
              zIndex: 2,
              minWidth: 40,
              minHeight: 40,
            }}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <HiSun /> : <HiMoon />}
          </motion.button>

          {/* Desktop hamburger for About/Education/Certificates */}
          <div ref={hamburgerRef} style={{ position: 'relative', zIndex: 2 }}>
            <motion.button
              onClick={() => setHamburgerOpen(o => !o)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: hamburgerOpen ? 'rgba(99,102,241,0.15)' : 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                borderRadius: 12,
                padding: '9px 12px',
                color: 'var(--color-text)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 5,
                marginLeft: 4,
                minWidth: 44,
                minHeight: 40,
                transition: 'all 0.2s',
              }}
              aria-label="More navigation"
            >
              <HamburgerIcon open={hamburgerOpen} />
            </motion.button>

            <AnimatePresence>
              {hamburgerOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 10px)',
                    right: 0,
                    minWidth: 180,
                    background: 'var(--glass-bg-strong)',
                    backdropFilter: 'blur(40px)',
                    WebkitBackdropFilter: 'blur(40px)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: 16,
                    padding: 8,
                    boxShadow: '0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
                    zIndex: 100,
                  }}
                >
                  {HAMBURGER_LINKS.map((link, i) => (
                    <motion.button
                      key={link.href}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => scrollTo(link.href)}
                      style={{
                        display: 'block',
                        width: '100%',
                        background: 'none',
                        border: 'none',
                        padding: '11px 16px',
                        borderRadius: 10,
                        color: 'var(--color-text-dim)',
                        fontSize: 14,
                        fontWeight: 500,
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                      }}
                      whileHover={{ background: 'rgba(99,102,241,0.12)', color: 'var(--color-text)' }}
                      whileTap={{ scale: 0.97 }}
                    >
                      {link.label}
                    </motion.button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile controls */}
        <div
          className="hamburger-group"
          style={{ display: 'none', alignItems: 'center', gap: 8 }}
        >
          <motion.button
            onClick={() => setDarkMode(p => !p)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              borderRadius: 12,
              padding: 8,
              color: 'var(--color-text)',
              cursor: 'pointer',
              fontSize: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: 44,
              minHeight: 44,
              zIndex: 2,
            }}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <HiSun /> : <HiMoon />}
          </motion.button>

          <motion.button
            onClick={() => setMenuOpen(o => !o)}
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              borderRadius: 12,
              padding: 8,
              color: 'var(--color-text)',
              cursor: 'pointer',
              minWidth: 44,
              minHeight: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2,
            }}
            whileTap={{ scale: 0.9 }}
            aria-label="Toggle menu"
          >
            <HamburgerIcon open={menuOpen} />
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -12, scaleY: 0.95 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: 'calc(72px + 24px)',
              left: 16,
              right: 16,
              background: 'var(--glass-bg-strong)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              border: '1px solid var(--glass-border)',
              borderRadius: 20,
              padding: 12,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              zIndex: 999,
              boxShadow: '0 24px 64px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)',
            }}
          >
            {[...NAV_LINKS, ...HAMBURGER_LINKS].map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => scrollTo(link.href)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '13px 16px',
                  borderRadius: 12,
                  color: activeSection === link.href.replace('#', '') ? 'var(--color-text)' : 'var(--color-text-dim)',
                  fontSize: 15,
                  fontWeight: activeSection === link.href.replace('#', '') ? 600 : 500,
                  textAlign: 'left',
                  cursor: 'pointer',
                  background: activeSection === link.href.replace('#', '') ? 'rgba(99,102,241,0.12)' : 'none',
                  minHeight: 44,
                }}
                whileHover={{ background: 'rgba(255,255,255,0.06)', color: 'var(--color-text)' }}
                whileTap={{ scale: 0.97 }}
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 820px) {
          .nav-desktop { display: none !important; }
          .hamburger-group { display: flex !important; }
        }
      `}</style>
    </motion.nav>
  )
}

function HamburgerIcon({ open }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <motion.line
        x1="3" y1="5" x2="17" y2="5"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
        animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
        style={{ transformOrigin: '10px 5px' }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.line
        x1="3" y1="10" x2="17" y2="10"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        style={{ transformOrigin: '10px 10px' }}
        transition={{ duration: 0.2 }}
      />
      <motion.line
        x1="3" y1="15" x2="17" y2="15"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
        animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
        style={{ transformOrigin: '10px 15px' }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  )
}
