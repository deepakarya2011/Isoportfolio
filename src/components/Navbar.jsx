import { memo, useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence, useSpring, useTransform } from 'framer-motion'
import { NAV_LINKS, HAMBURGER_LINKS, PROFILE } from '../data/portfolioData'
import { HiSun, HiMoon } from 'react-icons/hi'

const SPRING = { stiffness: 160, damping: 26, mass: 1 }

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hamburgerOpen, setHamburgerOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [darkMode, setDarkMode] = useState(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('theme') : null
    const isDark = stored !== 'light'
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light')
    }
    return isDark
  })
  const hamburgerRef = useRef(null)
  const navRef = useRef(null)

  // Cursor-reactive specular on navbar pill
  const mouseX = useSpring(0.5, SPRING)
  const mouseY = useSpring(0.5, SPRING)
  const specX = useTransform(mouseX, [0, 1], ['15%', '85%'])
  const specY = useTransform(mouseY, [0, 1], ['0%', '100%'])

  const handleNavMouseMove = useCallback((e) => {
    const el = navRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width)
    mouseY.set((e.clientY - rect.top) / rect.height)
  }, [mouseX, mouseY])

  useEffect(() => {
    const allLinks = [...NAV_LINKS, ...HAMBURGER_LINKS]
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const sections = allLinks.map(l => l.href.replace('#', ''))
      const current = sections.find(id => {
        const el = document.getElementById(id)
        if (!el) return false
        const rect = el.getBoundingClientRect()
        return rect.top <= 120 && rect.bottom >= 120
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

  useEffect(() => {
    const handler = (e) => {
      if (hamburgerRef.current && !hamburgerRef.current.contains(e.target))
        setHamburgerOpen(false)
    }
    if (hamburgerOpen) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [hamburgerOpen])

  const scrollTo = (href) => {
    setMenuOpen(false)
    setHamburgerOpen(false)
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
  }

  const blur = scrolled ? 48 : 36
  const tintOpacity = scrolled ? 0.10 : 0.06

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        height: 72,
        padding: '0 16px',
        marginTop: 16,
      }}
    >
      {/* ── True Glass Pill ── */}
      <div
        ref={navRef}
        onMouseMove={handleNavMouseMove}
        style={{
          position: 'absolute',
          inset: 0,
          margin: '0 16px',
          borderRadius: 999,
          isolation: 'isolate',
          // NO overflow:hidden — glass layers are absolute, content must not be clipped
        }}
      >
        {/* L1: Backdrop */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 999,
          backdropFilter: `blur(${blur}px) saturate(200%) brightness(${scrolled ? 1.06 : 1.03})`,
          WebkitBackdropFilter: `blur(${blur}px) saturate(200%) brightness(${scrolled ? 1.06 : 1.03})`,
          transition: 'backdrop-filter 0.5s ease, -webkit-backdrop-filter 0.5s ease',
          pointerEvents: 'none',
        }} />
        {/* L2: Tint */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 999,
          background: `rgba(255,255,255,${tintOpacity})`,
          transition: 'background 0.4s ease',
          pointerEvents: 'none',
        }} />
        {/* L3: Ambient glow */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 999,
          background: 'radial-gradient(ellipse 60% 80% at 20% 50%, rgba(99,102,241,0.12) 0%, transparent 60%), radial-gradient(ellipse 40% 80% at 80% 50%, rgba(6,182,212,0.08) 0%, transparent 60%)',
          pointerEvents: 'none',
        }} />
        {/* L4: Rim border */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 999,
          border: '1px solid transparent',
          backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.06) 40%, rgba(255,255,255,0.02) 60%, rgba(255,255,255,0.14) 100%)',
          backgroundOrigin: 'border-box',
          WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'destination-out',
          maskComposite: 'exclude',
          pointerEvents: 'none',
        }} />
        {/* L5: Top reflection */}
        <div style={{
          position: 'absolute', top: 0, left: '10%', right: '10%', height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.55) 30%, rgba(255,255,255,0.70) 50%, rgba(255,255,255,0.55) 70%, transparent)',
          filter: 'blur(0.5px)',
          pointerEvents: 'none',
        }} />
        {/* L6: Chromatic fringe */}
        <div style={{
          position: 'absolute', inset: -1, borderRadius: 1000,
          boxShadow: 'inset 1px 0 0 rgba(99,102,241,0.15), inset -1px 0 0 rgba(6,182,212,0.12)',
          pointerEvents: 'none',
        }} />
        {/* L7: Cursor specular */}
        <motion.div style={{
          position: 'absolute', inset: 0, borderRadius: 999,
          backgroundImage: `radial-gradient(ellipse 40% 80% at ${specX} ${specY}, rgba(255,255,255,0.10) 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />
        {/* L8: Shadow */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 999,
          boxShadow: scrolled
            ? '0 16px 48px rgba(0,0,0,0.35), 0 4px 12px rgba(0,0,0,0.20)'
            : '0 8px 32px rgba(0,0,0,0.22), 0 2px 8px rgba(0,0,0,0.12)',
          transition: 'box-shadow 0.4s ease',
          pointerEvents: 'none',
        }} />
      </div>

      {/* ── Nav Content ── */}
      <div
        className="container"
        style={{
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%', position: 'relative', zIndex: 1,
        }}
      >
        {/* Logo */}
        <motion.button
          onClick={() => scrollTo('#home')}
          className="navbar-logo"
          style={{ background: 'none', border: 'none', padding: 0, display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
        >
          <img src={PROFILE.logo} alt="Deepak Arya" style={{ height: 36, width: 'auto', borderRadius: 10, objectFit: 'contain' }} />
          <span style={{
            fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 19,
            letterSpacing: '-0.03em',
            background: 'var(--gradient-text)',
            WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
          }}>
            Deepak Arya
          </span>
        </motion.button>

        {/* Desktop links */}
        <div className="nav-desktop" style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.replace('#', '')
            return (
              <motion.button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                style={{
                  background: 'none', border: 'none',
                  padding: '8px 15px', borderRadius: 10,
                  color: isActive ? 'var(--color-text)' : 'var(--color-text-dim)',
                  fontSize: 14, fontWeight: isActive ? 600 : 500,
                  cursor: 'pointer', position: 'relative',
                  transition: 'color 0.2s',
                }}
                whileHover={{ color: 'var(--color-text)' }}
                whileTap={{ scale: 0.95 }}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    style={{
                      position: 'absolute', inset: 0, borderRadius: 10,
                      background: 'rgba(255,255,255,0.09)',
                      backdropFilter: 'blur(8px)',
                      WebkitBackdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255,255,255,0.14)',
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.20)',
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span style={{ position: 'relative', zIndex: 1 }}>{link.label}</span>
              </motion.button>
            )
          })}

          {/* Theme toggle */}
          <NavIconButton onClick={() => setDarkMode(p => !p)} aria-label="Toggle theme">
            {darkMode ? <HiSun size={17} /> : <HiMoon size={17} />}
          </NavIconButton>

          {/* Hamburger dropdown */}
          <div ref={hamburgerRef} style={{ position: 'relative' }}>
            <NavIconButton onClick={() => setHamburgerOpen(o => !o)} aria-label="More">
              <HamburgerIcon open={hamburgerOpen} />
            </NavIconButton>

            <AnimatePresence>
              {hamburgerOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                  style={{
                    position: 'absolute', top: 'calc(100% + 10px)', right: 0,
                    minWidth: 176, borderRadius: 18,
                    isolation: 'isolate',
                    // overflow:hidden removed — clips dropdown menu items
                  }}
                >
                  {/* Dropdown glass layers */}
                  <div style={{ position: 'absolute', inset: 0, borderRadius: 18, backdropFilter: 'blur(40px) saturate(200%)', WebkitBackdropFilter: 'blur(40px) saturate(200%)', pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', inset: 0, borderRadius: 18, background: 'rgba(255,255,255,0.08)', pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', inset: 0, border: '1px solid transparent', backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.30) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.12) 100%)', backgroundOrigin: 'border-box', WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'destination-out', maskComposite: 'exclude', borderRadius: 18, pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, borderRadius: 18, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.60) 50%, transparent)', pointerEvents: 'none' }} />
                  <div style={{ position: 'absolute', inset: 0, boxShadow: '0 20px 60px rgba(0,0,0,0.45)', borderRadius: 18, pointerEvents: 'none' }} />

                  <div style={{ position: 'relative', zIndex: 1, padding: 8 }}>
                    {HAMBURGER_LINKS.map((link) => (
                      <motion.button
                        key={link.href}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.15 }}
                        onClick={() => scrollTo(link.href)}
                        style={{
                          display: 'block', width: '100%', background: 'none', border: 'none',
                          padding: '11px 16px', borderRadius: 10,
                          color: 'var(--color-text-dim)', fontSize: 14, fontWeight: 500,
                          textAlign: 'left', cursor: 'pointer',
                        }}
                        whileTap={{ scale: 0.97 }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'var(--color-text)' }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--color-text-dim)' }}
                      >
                        {link.label}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile controls */}
        <div className="hamburger-group" style={{ display: 'none', alignItems: 'center', gap: 8 }}>
          <NavIconButton onClick={() => setDarkMode(p => !p)} aria-label="Toggle theme">
            {darkMode ? <HiSun size={18} /> : <HiMoon size={18} />}
          </NavIconButton>
          <NavIconButton onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
            <HamburgerIcon open={menuOpen} />
          </NavIconButton>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            style={{
              position: 'fixed', top: 'calc(72px + 24px)', left: 16, right: 16,
              borderRadius: 22, isolation: 'isolate', zIndex: 999,
              // overflow:hidden removed — was clipping mobile menu text at rounded corners
            }}
          >
            <div style={{ position: 'absolute', inset: 0, borderRadius: 22, backdropFilter: 'blur(44px) saturate(200%)', WebkitBackdropFilter: 'blur(44px) saturate(200%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', inset: 0, borderRadius: 22, background: 'rgba(255,255,255,0.07)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', inset: 0, border: '1px solid transparent', backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.12) 100%)', backgroundOrigin: 'border-box', WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'destination-out', maskComposite: 'exclude', borderRadius: 22, pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', top: 0, left: '8%', right: '8%', height: 1, borderRadius: 22, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.55) 50%, transparent)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', inset: 0, boxShadow: '0 24px 64px rgba(0,0,0,0.50)', borderRadius: 22, pointerEvents: 'none' }} />

            <div style={{ position: 'relative', zIndex: 1, padding: 12 }}>
              {[...NAV_LINKS, ...HAMBURGER_LINKS].map((link) => {
                const isActive = activeSection === link.href.replace('#', '')
                return (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15 }}
                    onClick={() => scrollTo(link.href)}
                    style={{
                      display: 'block', width: '100%', border: 'none',
                      padding: '13px 16px', borderRadius: 12,
                      background: isActive ? 'rgba(99,102,241,0.14)' : 'none',
                      color: isActive ? 'var(--color-text)' : 'var(--color-text-dim)',
                      fontSize: 15, fontWeight: isActive ? 600 : 500,
                      textAlign: 'left', cursor: 'pointer', minHeight: 44,
                    }}
                    whileTap={{ scale: 0.97 }}
                    onMouseEnter={e => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
                        e.currentTarget.style.color = 'var(--color-text)'
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'none'
                        e.currentTarget.style.color = 'var(--color-text-dim)'
                      }
                    }}
                  >
                    {link.label}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 820px) {
          .nav-desktop { display: none !important; }
          .hamburger-group { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}

const NavIconButton = memo(function NavIconButton({ children, onClick, ...rest }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      style={{
        background: 'rgba(255,255,255,0.07)',
        border: '1px solid rgba(255,255,255,0.14)',
        borderRadius: 11,
        padding: 9,
        color: 'var(--color-text)',
        cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minWidth: 38, minHeight: 38,
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18), 0 2px 8px rgba(0,0,0,0.18)',
        marginLeft: 4,
      }}
      {...rest}
    >
      {children}
    </motion.button>
  )
})

const HamburgerIcon = memo(function HamburgerIcon({ open }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <motion.line x1="2" y1="4.5" x2="16" y2="4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
        animate={open ? { rotate: 45, y: 4.5 } : { rotate: 0, y: 0 }}
        style={{ transformOrigin: '9px 4.5px' }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      />
      <motion.line x1="2" y1="9" x2="16" y2="9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        style={{ transformOrigin: '9px 9px' }}
        transition={{ duration: 0.18 }}
      />
      <motion.line x1="2" y1="13.5" x2="16" y2="13.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"
        animate={open ? { rotate: -45, y: -4.5 } : { rotate: 0, y: 0 }}
        style={{ transformOrigin: '9px 13.5px' }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      />
    </svg>
  )
})
