import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PROFILE, HERO_TECH_ICONS, SOCIAL_LINKS } from '../data/portfolioData'
import { TechIcon } from '../utils/icons'
import {
  HiArrowRight,
  HiDownload,
  HiPaperAirplane,
} from 'react-icons/hi'

const TYPING_SPEED = 80
const DELETE_SPEED = 40
const PAUSE_MS = 2000

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  const currentRole = PROFILE.roles[roleIndex]

  useEffect(() => {
    if (isPaused) return

    let timer
    if (!deleting) {
      if (displayed.length < currentRole.length) {
        timer = setTimeout(() => {
          setDisplayed(currentRole.slice(0, displayed.length + 1))
        }, TYPING_SPEED)
      } else {
        timer = setTimeout(() => {
          setIsPaused(true)
          setTimeout(() => {
            setIsPaused(false)
            setDeleting(true)
          }, PAUSE_MS)
        }, PAUSE_MS)
      }
    } else {
      if (displayed.length > 0) {
        timer = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1))
        }, DELETE_SPEED)
      } else {
        setDeleting(false)
        setRoleIndex((i) => (i + 1) % PROFILE.roles.length)
      }
    }

    return () => clearTimeout(timer)
  }, [displayed, deleting, isPaused, currentRole, roleIndex])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="section"
      style={{
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 'var(--nav-h)',
        paddingBottom: 0,
        position: 'relative',
      }}
    >
      <div className="container" style={{ width: '100%', position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 80,
            alignItems: 'center',
          }}
          className="hero-grid"
        >
          {/* ========== LEFT (Text) ========== */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Greeting */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{
                display: 'inline-block',
                padding: '6px 18px',
                borderRadius: 'var(--radius-pill)',
                background: 'rgba(99,102,241,0.15)',
                border: '1px solid rgba(99,102,241,0.3)',
                color: 'var(--color-primary-soft)',
                fontSize: 14,
                fontWeight: 500,
                marginBottom: 20,
              }}
            >
              Hi, I'm
            </motion.span>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6 }}
              style={{
                fontSize: 'clamp(32px, 7vw, 56px)',
                fontWeight: 700,
                lineHeight: 1.1,
                marginBottom: 16,
              }}
            >
              <span className="gradientText">Deepak Arya</span>
            </motion.h1>

            {/* Typing effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              style={{
                fontSize: 'clamp(16px, 2.2vw, 22px)',
                fontWeight: 500,
                fontFamily: 'var(--font-heading)',
                color: 'var(--color-text-dim)',
                marginBottom: 24,
                minHeight: 36,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: 5,
                  height: 22,
                  background: 'var(--color-accent)',
                  borderRadius: 3,
                  marginRight: 4,
                  animation: 'blink 1s step-end infinite',
                }}
              />
              {displayed}
              <style>{`
                @keyframes blink {
                  0%, 100% { opacity: 1; }
                  50% { opacity: 0; }
                }
              `}</style>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              style={{
                fontSize: 'clamp(14px, 1.1vw, 16px)',
                lineHeight: 1.7,
                color: 'var(--color-text-dim)',
                maxWidth: '100%',
                marginBottom: 32,
              }}
            >
              {PROFILE.description}
            </motion.p>

            {/* Buttons - Stacked on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.5 }}
              className="hero-buttons"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 12,
              }}
            >
               <motion.a
                 href="#projects"
                 onClick={(e) => {
                   e.preventDefault()
                   scrollTo('projects')
                 }}
                 style={{
                   display: 'inline-flex',
                   alignItems: 'center',
                   gap: 10,
                   padding: '12px 24px',
                   borderRadius: 'var(--radius-pill)',
                   color: '#fff',
                   fontWeight: 600,
                   fontSize: 14,
                   border: 'none',
                   cursor: 'pointer',
                   position: 'relative',
                   minWidth: 44,
                   minHeight: 44,
                 }}
                 className="liquidGlassButton"
                 whileHover={{ scale: 1.05, boxShadow: '0 0 50px -8px rgba(99,102,241,0.7)' }}
                 whileTap={{ scale: 0.95 }}
               >
                 View Projects <HiArrowRight />
               </motion.a>

              <motion.a
                href={PROFILE.resumeUrl}
                download
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '12px 24px',
                  borderRadius: 'var(--radius-pill)',
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid var(--glass-border)',
                  color: '#fff',
                  fontWeight: 500,
                  fontSize: 14,
                  cursor: 'pointer',
                  backdropFilter: 'blur(10px)',
                  minWidth: 44,
                  minHeight: 44,
                }}
                whileHover={{
                  scale: 1.05,
                  background: 'rgba(255,255,255,0.1)',
                  borderColor: 'rgba(255,255,255,0.2)',
                }}
                whileTap={{ scale: 0.95 }}
              >
                Download Resume <HiDownload />
              </motion.a>

              <motion.a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo('contact')
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '12px 24px',
                  borderRadius: 'var(--radius-pill)',
                  background: 'transparent',
                  border: '1px solid rgba(168, 85, 247, 0.4)',
                  color: 'var(--color-purple)',
                  fontWeight: 500,
                  fontSize: 14,
                  cursor: 'pointer',
                  minWidth: 44,
                  minHeight: 44,
                }}
                whileHover={{
                  scale: 1.05,
                  background: 'rgba(168, 85, 247, 0.1)',
                  borderColor: 'rgba(168, 85, 247, 0.6)',
                }}
                whileTap={{ scale: 0.95 }}
              >
                Contact Me <HiPaperAirplane />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* ========== RIGHT (Profile & Floating Icons) ========== */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
            }}
            className="hero-image-container"
          >
            {/* Glowing ring */}
            <div
              style={{
                position: 'relative',
                width: 'clamp(220px, 22vw, 320px)',
                height: 'clamp(220px, 22vw, 320px)',
              }}
            >
              {/* Animated ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute',
                  inset: -10,
                  borderRadius: '50%',
                  background:
                    'conic-gradient(from 0deg, transparent, var(--color-primary), var(--color-accent), var(--color-purple), transparent 70%)',
                  WebkitMask:
                    'radial-gradient(farthest-side, transparent calc(100% - 3px), #fff calc(100% - 2px))',
                  mask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #fff calc(100% - 2px))',
                }}
              />

              {/* Second ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute',
                  inset: -16,
                  borderRadius: '50%',
                  background:
                    'conic-gradient(from 90deg, transparent, var(--color-accent), transparent 40%, var(--color-purple), transparent 70%)',
                  WebkitMask:
                    'radial-gradient(farthest-side, transparent calc(100% - 2px), #fff calc(100% - 1px))',
                  mask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #fff calc(100% - 1px))',
                  opacity: 0.5,
                }}
              />

              {/* Profile image */}
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #1a1f36 0%, #0e1320 100%)',
                  border: '1px solid var(--color-border-strong)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                <img
                  src={PROFILE.avatar}
                  alt="Deepak Arya"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '50%',
                  }}
                />
              </div>
            </div>

            {/* Floating tech icons - responsive radius */}
            {HERO_TECH_ICONS.map((name, i) => {
              const angle = (i / HERO_TECH_ICONS.length) * Math.PI * 2
              const isMobile = typeof window !== 'undefined' && window.innerWidth < 820
              const radius = isMobile ? 100 + (i % 2 === 0 ? 15 : 0) : 160 + (i % 2 === 0 ? 20 : 0)
              const startX = Math.cos(angle) * radius
              const startY = Math.sin(angle) * radius

              return (
                <motion.div
                  key={name}
                  initial={{ x: startX, y: startY, opacity: 0 }}
                  animate={{
                    x: [
                      startX,
                      startX + Math.sin(i * 1.3) * 12,
                      startX - Math.cos(i * 0.9) * 10,
                      startX,
                    ],
                    y: [
                      startY,
                      startY + Math.cos(i * 1.1) * 12,
                      startY - Math.sin(i * 0.8) * 10,
                      startY,
                    ],
                    opacity: 1,
                  }}
                  transition={{
                    x: { duration: 5 + i * 0.5, repeat: Infinity, ease: 'easeInOut' },
                    y: { duration: 4 + i * 0.6, repeat: Infinity, ease: 'easeInOut' },
                    opacity: { delay: 0.8 + i * 0.1, duration: 0.5 },
                  }}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: -18,
                    marginLeft: -18,
                    zIndex: 3,
                  }}
                  className="hero-tech-icon"
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 12,
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid var(--glass-border)',
                      backdropFilter: 'blur(12px)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 18,
                      color: 'var(--color-text-dim)',
                      boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
                    }}
                  >
                    <TechIcon name={name} />
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>

      {/* Hero grid responsive styles - handled in CSS */}
      <style>{`
        @media (max-width: 820px) {
          .hero-tech-icon {
            display: none !important;
          }
        }
      `}</style>
    </section>
  )
}
