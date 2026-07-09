import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS, PROFILE } from '../data/portfolioData'
import { HiMenuAlt3, HiX, HiSun, HiMoon } from 'react-icons/hi'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme')
      return stored !== 'light'
    }
    return true
  })

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      
      // Track active section
      const sections = NAV_LINKS.map(link => link.href.replace('#', ''))
      const current = sections.find(section => {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const theme = darkMode ? 'dark' : 'light'
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [darkMode])

  const toggleTheme = () => setDarkMode((prev) => !prev)

  const scrollTo = (href) => {
    setMenuOpen(false)
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 24, delay: 0.2 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: 72,
        display: 'flex',
        alignItems: 'center',
        marginTop: 20,
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 72,
          background: scrolled ? 'var(--glass-bg-strong)' : 'var(--glass-bg)',
          backdropFilter: 'blur(40px)',
          WebkitBackdropFilter: 'blur(40px)',
          border: '1px solid var(--glass-border)',
          borderRadius: 'var(--radius-pill)',
          boxShadow: 'var(--glass-floating)',
          transition: 'background 0.4s var(--ease-premium), backdrop-filter 0.4s var(--ease-premium)',
          margin: '0 16px',
          maxWidth: 'calc(100% - 32px)',
        }}
      ></div>
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
            color: '#fff',
          }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <img
            src={PROFILE.logo}
            alt="Deepak Arya"
            style={{
              height: 40,
              width: 'auto',
              borderRadius: 10,
              objectFit: 'contain',
            }}
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

        {/* Desktop nav + Theme toggle */}
        <div
          style={{
            display: 'flex',
            gap: 6,
            alignItems: 'center',
          }}
          className="nav-desktop"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace('#', '')
            return (
              <motion.button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                style={{
                  background: isActive ? 'var(--glass-bg-strong)' : 'none',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: 10,
                  color: isActive ? 'var(--color-text)' : 'var(--color-text-dim)',
                  fontSize: 14,
                  fontWeight: isActive ? 600 : 500,
                  transition: 'color 0.25s, background 0.25s',
                  cursor: 'pointer',
                  position: 'relative',
                }}
                whileHover={{
                  color: 'var(--color-text)',
                  background: 'var(--glass-bg-strong)',
                }}
                whileTap={{ scale: 0.95 }}
              >
                {link.label}
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 2,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 20,
                      height: 3,
                      background: 'var(--gradient-primary)',
                      borderRadius: 2,
                    }}
                  />
                )}
              </motion.button>
            )
          })}

          {/* Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              borderRadius: 12,
              padding: 10,
              color: 'var(--color-text)',
              cursor: 'pointer',
              fontSize: 18,
              lineHeight: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 4,
              transition: 'background 0.3s, color 0.3s',
            }}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <HiSun /> : <HiMoon />}
          </motion.button>
        </div>

        {/* Hamburger + Theme toggle (mobile) */}
        <div
          style={{
            display: 'none',
            alignItems: 'center',
            gap: 8,
          }}
          className="hamburger-group"
        >
          {/* Mobile Theme Toggle */}
          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              borderRadius: 12,
              padding: 8,
              color: 'var(--color-text-dim)',
              cursor: 'pointer',
              fontSize: 20,
              lineHeight: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.3s, color 0.3s',
              minWidth: 44,
              minHeight: 44,
            }}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <HiSun /> : <HiMoon />}
          </motion.button>

          <motion.button
            onClick={() => setMenuOpen((o) => !o)}
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              borderRadius: 12,
              padding: 8,
              color: 'var(--color-text-dim)',
              cursor: 'pointer',
              fontSize: 22,
              lineHeight: 1,
              minWidth: 44,
              minHeight: 44,
            }}
            className="hamburger"
            whileTap={{ scale: 0.9 }}
          >
            {menuOpen ? <HiX /> : <HiMenuAlt3 />}
          </motion.button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scaleY: 0.96 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -20, scaleY: 0.96 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: 'var(--nav-h)',
              left: 16,
              right: 16,
              background: 'var(--glass-bg)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              border: '1px solid var(--glass-border)',
              borderRadius: 20,
              padding: 16,
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              zIndex: 999,
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              maxWidth: 'calc(100% - 32px)',
            }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => scrollTo(link.href)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '14px 16px',
                  borderRadius: 14,
                  color: 'var(--color-text-dim)',
                  fontSize: 15,
                  fontWeight: 500,
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  minWidth: 44,
                  minHeight: 44,
                }}
                whileHover={{ background: 'var(--glass-bg-strong)', color: 'var(--color-text)' }}
                whileTap={{ scale: 0.97 }}
              >
                {link.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inline styles for responsive hamburger */}
      <style>{`
        @media (max-width: 820px) {
          .nav-desktop { display: none !important; }
          .hamburger-group { display: flex !important; }
        }
      `}</style>
    </motion.nav>
  )
}
