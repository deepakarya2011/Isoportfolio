import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { PROFILE, HERO_TECH_ICONS } from '../data/portfolioData'
import { TechIcon } from '../utils/icons'
import { LiquidGlass, GlassButton, GlassTag } from './LiquidGlass'
import { HiArrowRight, HiDownload, HiPaperAirplane, HiX } from 'react-icons/hi'

const TYPING_SPEED = 80
const DELETE_SPEED = 40
const PAUSE_MS = 2000
const MODAL_TECH_BADGES = ['React', 'React Native', 'JavaScript', 'Node.js', 'Express.js', 'MongoDB', 'MySQL', 'Python', 'Tailwind CSS', 'Git', 'GitHub', 'HTML', 'CSS']

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  const currentRole = PROFILE.roles[roleIndex]

  useEffect(() => {
    if (isPaused) return
    let timer
    if (!deleting) {
      if (displayed.length < currentRole.length) {
        timer = setTimeout(() => setDisplayed(currentRole.slice(0, displayed.length + 1)), TYPING_SPEED)
      } else {
        timer = setTimeout(() => {
          setIsPaused(true)
          setTimeout(() => { setIsPaused(false); setDeleting(true) }, PAUSE_MS)
        }, PAUSE_MS)
      }
    } else {
      if (displayed.length > 0) {
        timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), DELETE_SPEED)
      } else {
        setDeleting(false)
        setRoleIndex(i => (i + 1) % PROFILE.roles.length)
      }
    }
    return () => clearTimeout(timer)
  }, [displayed, deleting, isPaused, currentRole])

  useEffect(() => {
    if (!isProfileOpen) {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      return
    }

    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsProfileOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [isProfileOpen])

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  const openProfileModal = () => setIsProfileOpen(true)
  const closeProfileModal = () => setIsProfileOpen(false)

  return (
    <>
      <section
        id="home"
        className="section"
        style={{ minHeight: '100svh', display: 'flex', alignItems: 'center', paddingTop: 'var(--nav-h)', paddingBottom: 'var(--nav-h)', position: 'relative' }}
      >
        <div className="container" style={{ width: '100%', position: 'relative', zIndex: 1, transform: 'translateX(3px)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="hero-grid">

            {/* LEFT */}
            <div>
              <div style={{ marginBottom: 20 }}>
                <GlassTag color="#FF8A00" style={{ fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                  Hi, I'm Deepak 👋
                </GlassTag>
              </div>

              <h1 style={{ fontSize: 'clamp(32px, 7vw, 58px)', fontWeight: 700, lineHeight: 1.08, marginBottom: 16, letterSpacing: '-0.035em' }}>
                <span>Deepak </span>
                <span className="text-orange" style={{ textShadow: '0 0 32px rgba(255, 138, 0, 0.35)' }}>Arya</span>
              </h1>

              <div
                style={{
                  fontSize: 'clamp(16px, 2.2vw, 22px)', fontWeight: 500,
                  fontFamily: 'var(--font-heading)', color: 'var(--color-text)',
                  marginBottom: 24, minHeight: 36, display: 'flex', alignItems: 'center', gap: 8,
                }}
              >
                <span style={{
                  display: 'inline-block', width: 3, height: 22,
                  background: 'var(--color-accent)', borderRadius: 2,
                  animation: 'blink 1s step-end infinite',
                }} />
                {displayed}
              </div>

              <p style={{ fontSize: 'clamp(14px, 1.1vw, 16px)', lineHeight: 1.8, color: 'var(--color-text-dim)', marginBottom: 36, maxWidth: 540 }}>
                {PROFILE.description}
              </p>

              <div
                className="hero-buttons"
                style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}
              >
                <GlassButton
                  href="#projects"
                  onClick={(e) => { e.preventDefault(); scrollTo('projects') }}
                  variant="primary"
                >
                  <span style={{ lineHeight: 1 }}>View Projects</span>
                  <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0, lineHeight: 1 }}>
                    <HiArrowRight />
                  </span>
                </GlassButton>

                <GlassButton
                  href={PROFILE.resumeUrl}
                  download
                  variant="secondary"
                >
                  <span style={{ lineHeight: 1 }}>Resume</span>
                  <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0, lineHeight: 1 }}>
                    <HiDownload />
                  </span>
                </GlassButton>

                <GlassButton
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); scrollTo('contact') }}
                  variant="ghost"
                >
                  <span style={{ lineHeight: 1 }}>Contact</span>
                  <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0, lineHeight: 1 }}>
                    <HiPaperAirplane />
                  </span>
                </GlassButton>
              </div>
            </div>

            <div
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}
              className="hero-image-container"
            >
              <motion.div
                layoutId="profileImage"
                role="button"
                tabIndex={0}
                onClick={openProfileModal}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    openProfileModal()
                  }
                }}
                initial={false}
                transition={{ type: 'spring', stiffness: 180, damping: 24, mass: 0.95 }}
                whileHover={prefersReducedMotion ? undefined : { y: -8, scale: 1.03, rotate: -3 }}
                whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
                style={{ position: 'relative', width: 'clamp(255px, 25.5vw, 375px)', height: 'clamp(255px, 25.5vw, 375px)', cursor: 'pointer' }}
                className="profile-image-shell"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                  style={{
                    position: 'absolute', inset: -12, borderRadius: '50%',
                    background: 'conic-gradient(from 0deg, transparent 0%, #FF8A00 25%, #FF9D1A 50%, #FF9D1A 75%, transparent 100%)',
                    WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #fff calc(100% - 2px))',
                    mask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #fff calc(100% - 2px))',
                    filter: 'blur(1px)',
                  }}
                />

                <LiquidGlass
                  radius={999}
                  blur={6}
                  tint="rgba(255,255,255,0.02)"
                  tintHover="rgba(255,255,255,0.01)"
                  glow="#FF8A00"
                  intensity={1.4}
                  sheen={false}
                  style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                >
                  <div className="profile-image-frame">
                    <img
                      src={PROFILE.avatar}
                      alt="Deepak Arya"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', display: 'block' }}
                    />
                  </div>
                </LiquidGlass>
              </motion.div>

              {HERO_TECH_ICONS.map((name, i) => {
                const angle = (i / HERO_TECH_ICONS.length) * Math.PI * 2
                const radius = 193 + (i % 2 === 0 ? 21 : 0)
                const sx = Math.cos(angle) * radius
                const sy = Math.sin(angle) * radius
                return (
                  <motion.div
                    key={name}
                    className="hero-tech-icon"
                    animate={{
                      x: [sx, sx + Math.sin(i * 1.4) * 10, sx - Math.cos(i * 0.9) * 8, sx],
                      y: [sy, sy + Math.cos(i * 1.1) * 10, sy - Math.sin(i * 0.8) * 8, sy],
                    }}
                    transition={{
                      x: { duration: 5 + i * 0.6, repeat: Infinity, ease: 'easeInOut' },
                      y: { duration: 4.5 + i * 0.5, repeat: Infinity, ease: 'easeInOut' },
                    }}
                    style={{ position: 'absolute', top: '50%', left: '50%', marginTop: -20, marginLeft: -20, zIndex: 3 }}
                  >
                    <div className="hero-tech-tile">
                      <TechIcon name={name} />
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="hero-scroll-cue" aria-hidden="true" />

        <style>{`
          @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
          @media (max-width: 820px) {
            .hero-tech-icon { display: none !important; }
          }
        `}</style>
      </section>

      <AnimatePresence>
        {isProfileOpen && (
          <motion.div
            className="profile-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            onClick={closeProfileModal}
          >
            <motion.div
              className="profile-modal-card"
              initial={{ opacity: 0, scale: 0.9, y: 24, filter: 'blur(18px)' }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.94, y: 16, filter: 'blur(10px)' }}
              transition={{ type: 'spring', stiffness: 220, damping: 26, mass: 0.95, duration: 0.45 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="profile-modal-glow profile-modal-glow-one" />
              <div className="profile-modal-glow profile-modal-glow-two" />
              <div className="profile-modal-bubble profile-modal-bubble-one" />
              <div className="profile-modal-bubble profile-modal-bubble-two" />
              <div className="profile-modal-bubble profile-modal-bubble-three" />
              <div className="profile-modal-particle profile-modal-particle-one" />
              <div className="profile-modal-particle profile-modal-particle-two" />
              <div className="profile-modal-particle profile-modal-particle-three" />

              <div className="profile-modal-main">
                <div className="profile-modal-image-panel">
                  <motion.div
                    layoutId="profileImage"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 220, damping: 24, mass: 0.95 }}
                    className="profile-modal-image-shell"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
                      className="profile-modal-ring profile-modal-ring-one"
                    />
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
                      className="profile-modal-ring profile-modal-ring-two"
                    />
                    <div className="profile-modal-image-frame">
                      <img src={PROFILE.avatar} alt="Deepak Arya" className="profile-modal-image" />
                    </div>
                  </motion.div>
                </div>

                <div className="profile-modal-content">
                  <button type="button" className="profile-modal-close" onClick={closeProfileModal} aria-label="Close profile view">
                    <HiX />
                  </button>

                  <GlassTag color="#FF8A00" style={{ fontSize: 12, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                    Premium Profile
                  </GlassTag>

                  <h2 className="profile-modal-title">Deepak Arya</h2>
                  <p className="profile-modal-subtitle">Full Stack Developer</p>
                  <p className="profile-modal-subtitle profile-modal-subtitle-soft">Android &amp; iOS App Developer</p>
                  <p className="profile-modal-subtitle profile-modal-subtitle-soft">AI/ML Student</p>

                  <div className="profile-modal-meta">
                    <div className="profile-modal-pill">📍 Lucknow, India</div>
                    <div className="profile-modal-pill">🎓 B.Tech in AI & ML</div>
                    <div className="profile-modal-pill">💼 Open to Work</div>
                  </div>

                  <div className="profile-modal-tech-grid">
                    {MODAL_TECH_BADGES.map((item) => (
                      <motion.div
                        key={item}
                        whileHover={prefersReducedMotion ? undefined : { y: -6, scale: 1.04 }}
                        transition={{ type: 'spring', stiffness: 220, damping: 18 }}
                        className="profile-tech-badge"
                      >
                        {item}
                      </motion.div>
                    ))}
                  </div>

                  <div className="profile-modal-actions">
                    <GlassButton href={PROFILE.resumeUrl} download variant="primary">
                      Resume
                    </GlassButton>
                    <GlassButton href="https://www.linkedin.com/in/deepak-arya-860881276/" target="_blank" rel="noreferrer" variant="secondary">
                      LinkedIn
                    </GlassButton>
                    <GlassButton href={`mailto:${PROFILE.email}`} variant="ghost">
                      Email
                    </GlassButton>
                    <GlassButton href="https://github.com/deepakarya2011" target="_blank" rel="noreferrer" variant="secondary">
                      GitHub
                    </GlassButton>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
