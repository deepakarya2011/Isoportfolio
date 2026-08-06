import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PROFILE, HERO_TECH_ICONS } from '../data/portfolioData'
import { TechIcon } from '../utils/icons'
import { LiquidGlass, GlassButton, GlassTag } from './LiquidGlass'
import { HiArrowRight, HiDownload, HiPaperAirplane } from 'react-icons/hi'

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

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section
      id="home"
      className="section"
      style={{ minHeight: '100svh', display: 'flex', alignItems: 'center', paddingTop: 'var(--nav-h)', paddingBottom: 0, position: 'relative' }}
    >
      <div className="container" style={{ width: '100%', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="hero-grid">

          {/* LEFT */}
          <div>
            {/* Greeting pill */}
            <div style={{ marginBottom: 20 }}>
              <GlassTag color="#6366f1" style={{ fontSize: 13, padding: '6px 16px' }}>
                Hi, I'm Deepak 👋
              </GlassTag>
            </div>

            {/* Name */}
            <h1 style={{ fontSize: 'clamp(32px, 7vw, 58px)', fontWeight: 700, lineHeight: 1.08, marginBottom: 16 }}>
              <span className="gradientText">Deepak Arya</span>
            </h1>

            {/* Typing */}
            <div
              style={{
                fontSize: 'clamp(16px, 2.2vw, 22px)', fontWeight: 500,
                fontFamily: 'var(--font-heading)', color: 'var(--color-text)',
                marginBottom: 24, minHeight: 36, display: 'flex', alignItems: 'center', gap: 8,
                textShadow: '0 1px 2px rgba(0,0,0,0.40), 0 0 8px rgba(0,0,0,0.25)',
              }}
            >
              <span style={{
                display: 'inline-block', width: 3, height: 22,
                background: 'var(--color-accent)', borderRadius: 2,
                animation: 'blink 1s step-end infinite',
              }} />
              {displayed}
            </div>

            {/* Description */}
            <p style={{ fontSize: 'clamp(14px, 1.1vw, 16px)', lineHeight: 1.75, color: 'var(--color-text)', marginBottom: 36, textShadow: '0 1px 2px rgba(0,0,0,0.40), 0 0 8px rgba(0,0,0,0.25)' }}>
              {PROFILE.description}
            </p>

            {/* Buttons */}
            <div
              className="hero-buttons"
              style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}
            >
              <GlassButton
                as="a"
                href="#projects"
                onClick={(e) => { e.preventDefault(); scrollTo('projects') }}
                variant="primary"
                style={{ color: '#fff' }}
              >
                <span style={{ lineHeight: 1 }}>View Projects</span>
                <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0, lineHeight: 1 }}>
                  <HiArrowRight />
                </span>
              </GlassButton>

              <GlassButton
                as="a"
                href={PROFILE.resumeUrl}
                download
                variant="ghost"
                style={{ color: 'var(--color-text)' }}
              >
                <span style={{ lineHeight: 1 }}>Resume</span>
                <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0, lineHeight: 1 }}>
                  <HiDownload />
                </span>
              </GlassButton>

              <GlassButton
                as="a"
                href="#contact"
                onClick={(e) => { e.preventDefault(); scrollTo('contact') }}
                variant="purple"
                style={{ color: 'var(--color-purple)' }}
              >
                <span style={{ lineHeight: 1 }}>Contact</span>
                <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0, lineHeight: 1 }}>
                  <HiPaperAirplane />
                </span>
              </GlassButton>
            </div>
          </div>

          {/* RIGHT — Glass-framed profile */}
          <div
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}
            className="hero-image-container"
          >
            <div style={{ position: 'relative', width: 'clamp(220px, 22vw, 320px)', height: 'clamp(220px, 22vw, 320px)' }}>
              {/* Spinning conic ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute', inset: -12, borderRadius: '50%',
                  background: 'conic-gradient(from 0deg, transparent 0%, #6366f1 25%, #a855f7 50%, #06b6d4 75%, transparent 100%)',
                  WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #fff calc(100% - 2px))',
                  mask: 'radial-gradient(farthest-side, transparent calc(100% - 3px), #fff calc(100% - 2px))',
                  filter: 'blur(1px)',
                }}
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute', inset: -20, borderRadius: '50%',
                  background: 'conic-gradient(from 120deg, transparent 0%, #06b6d4 30%, transparent 50%, #a855f7 80%, transparent 100%)',
                  WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #fff calc(100% - 1px))',
                  mask: 'radial-gradient(farthest-side, transparent calc(100% - 2px), #fff calc(100% - 1px))',
                  opacity: 0.5,
                }}
              />

              {/* Glass-framed profile image */}
              <LiquidGlass
                radius={999}
                blur={6}
                tint="rgba(255,255,255,0.02)"
                tintHover="rgba(255,255,255,0.01)"
                intensity={1.4}
                style={{ width: '100%', height: '100%', borderRadius: '50%' }}
              >
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', background: 'linear-gradient(135deg, #1a1f36, #0e1320)' }}>
                  <img
                    src={PROFILE.avatar}
                    alt="Deepak Arya"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%', display: 'block' }}
                  />
                </div>
              </LiquidGlass>
            </div>

            {/* Floating glass bubble tech icons */}
            {HERO_TECH_ICONS.map((name, i) => {
              const angle = (i / HERO_TECH_ICONS.length) * Math.PI * 2
              const radius = 165 + (i % 2 === 0 ? 18 : 0)
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
                  {/* Glass bubble */}
                  <div style={{ position: 'relative', width: 40, height: 40, borderRadius: 14, isolation: 'isolate', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', inset: 0, backdropFilter: 'blur(6px) saturate(180%)', WebkitBackdropFilter: 'blur(6px) saturate(180%)', borderRadius: 14, pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.02)', borderRadius: 14, pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', inset: 0, border: '1px solid transparent', backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.15) 100%)', backgroundOrigin: 'border-box', WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'destination-out', maskComposite: 'exclude', borderRadius: 14, pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.65) 50%, transparent)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', inset: 0, boxShadow: '0 8px 24px rgba(0,0,0,0.30)', borderRadius: 14, pointerEvents: 'none' }} />
                    <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, color: 'var(--color-text)', textShadow: '0 1px 2px rgba(0,0,0,0.40), 0 0 8px rgba(0,0,0,0.25)' }}>
                      <TechIcon name={name} />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @media (max-width: 820px) { .hero-tech-icon { display: none !important; } }
      `}</style>
    </section>
  )
}
