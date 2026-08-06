import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { PROFILE, SOCIAL_LINKS, EMAILJS_CONFIG } from '../data/portfolioData'
import { FiGithub, FiLinkedin, FiGlobe, FiMail, FiMapPin } from 'react-icons/fi'
import { HiPaperAirplane } from 'react-icons/hi'
import { LiquidGlass, GlassCard, GlassButton } from './LiquidGlass'

const fadeUp = {
  hidden: { y: 40 },
  visible: (i = 0) => ({
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
}

const inputStyle = {
  width: '100%',
  padding: '14px 18px',
  borderRadius: 14,
  background: 'rgba(255,255,255,0.02)',
  border: '1px solid rgba(255,255,255,0.10)',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)',
  fontSize: 14,
  color: 'var(--color-text)',
  caretColor: 'var(--color-text)',
  outline: 'none',
  boxSizing: 'border-box',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.12)',
  transition: 'border-color 0.25s, box-shadow 0.25s',
  fontFamily: 'var(--font-sans)',
  textShadow: '0 1px 2px rgba(0,0,0,0.40), 0 0 8px rgba(0,0,0,0.25)',
}

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const formRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()
    setSending(true)
    emailjs.sendForm(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, formRef.current, EMAILJS_CONFIG.publicKey)
      .then(() => {
        setSent(true); setSending(false); e.target.reset()
        setTimeout(() => setSent(false), 4000)
      }, (err) => {
        console.error(err); setSending(false)
        alert('Failed to send. Please try again.')
      })
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <motion.div
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          style={{ textAlign: 'center', marginBottom: 72 }}
        >
          <span style={{
            display: 'inline-block', padding: '6px 18px',
            borderRadius: 'var(--radius-pill)',
            background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(6,182,212,0.25)',
            color: 'var(--color-accent)', fontSize: 13, fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: 2, marginBottom: 16,
          }}>Contact</span>
          <h2 className="gradientText" style={{ fontSize: 'clamp(36px, 4.5vw, 52px)', fontWeight: 700 }}>
            Get In Touch
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }} className="contact-grid">

          {/* Left — info */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp} custom={0}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Email card */}
              <LiquidGlass radius={18} blur={6} tint="rgba(255,255,255,0.02)" tintHover="rgba(255,255,255,0.01)" glow="#6366f1" intensity={0.9} style={{ padding: '18px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 14, background: 'rgba(99,102,241,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: 'var(--color-primary-soft)', flexShrink: 0, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15)' }}>
                    <FiMail />
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1.2, color: 'var(--color-text-dimmer)', marginBottom: 4 }}>Email</div>
                    <a href={`mailto:${PROFILE.email}`} style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text)', transition: 'color 0.2s' }}>
                      {PROFILE.email}
                    </a>
                  </div>
                </div>
              </LiquidGlass>

              {/* Location card */}
              <LiquidGlass radius={18} blur={6} tint="rgba(255,255,255,0.02)" tintHover="rgba(255,255,255,0.01)" glow="#a855f7" intensity={0.9} style={{ padding: '18px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 14, background: 'rgba(168,85,247,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, color: 'var(--color-purple)', flexShrink: 0, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15)' }}>
                    <FiMapPin />
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1.2, color: 'var(--color-text-dimmer)', marginBottom: 4 }}>Location</div>
                    <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text)' }}>{PROFILE.location}</span>
                  </div>
                </div>
              </LiquidGlass>
            </div>

            {/* Social links */}
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              {[
                { href: SOCIAL_LINKS.github, icon: <FiGithub size={20} />, glow: '#6366f1' },
                { href: SOCIAL_LINKS.linkedin, icon: <FiLinkedin size={20} />, glow: '#06b6d4' },
                { href: SOCIAL_LINKS.portfolio, icon: <FiGlobe size={20} />, glow: '#a855f7' },
              ].map(({ href, icon, glow }, i) => (
                <LiquidGlass
                  key={i}
                  as="a"
                  href={href}
                  radius={14}
                  blur={6}
                  tint="rgba(255,255,255,0.02)"
                  tintHover="rgba(255,255,255,0.01)"
                  glow={glow}
                  intensity={1}
                  style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text)', textShadow: '0 1px 2px rgba(0,0,0,0.40), 0 0 8px rgba(0,0,0,0.25)' }}
                >
                  {icon}
                </LiquidGlass>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp} custom={1}>
            <GlassCard glow="#06b6d4" blur={6} style={{ padding: '36px 32px' }}>
              <form ref={formRef} onSubmit={handleSubmit} className="contact-form" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="contact-form-grid">
                  <input type="text" name="name" placeholder="Your Name" required style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = 'rgba(99,102,241,0.55)'; e.target.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.10), 0 0 0 3px rgba(99,102,241,0.12)' }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.10)'; e.target.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.12)' }}
                  />
                  <input type="email" name="email" placeholder="Your Email" required style={inputStyle}
                    onFocus={e => { e.target.style.borderColor = 'rgba(99,102,241,0.55)'; e.target.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.10), 0 0 0 3px rgba(99,102,241,0.12)' }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.12)' }}
                  />
                </div>
                <input type="text" name="title" placeholder="Subject" required style={inputStyle}
                  onFocus={e => { e.target.style.borderColor = 'rgba(99,102,241,0.55)'; e.target.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.10), 0 0 0 3px rgba(99,102,241,0.12)' }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.10)'; e.target.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.12)' }}
                />
                <textarea name="message" placeholder="Your Message" rows={5} required
                  style={{ ...inputStyle, resize: 'vertical' }}
                  onFocus={e => { e.target.style.borderColor = 'rgba(99,102,241,0.55)'; e.target.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.10), 0 0 0 3px rgba(99,102,241,0.12)' }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.10)'; e.target.style.boxShadow = 'inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.12)' }}
                />
                <GlassButton
                  as="button"
                  type="submit"
                  disabled={sending}
                  variant="ghost"
                  style={{
                    width: '100%', padding: '14px 32px',
                    fontSize: 15, color: 'var(--color-text)',
                    opacity: sending ? 0.7 : 1,
                    cursor: sending ? 'not-allowed' : 'pointer',
                    background: 'rgba(255, 255, 255, 0.16)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    backdropFilter: 'blur(6px)',
                    WebkitBackdropFilter: 'blur(6px)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.10), 0 4px 20px rgba(0,0,0,0.15)',
                  }}
                >
                  {sending ? 'Sending…' : sent ? 'Sent! ✓' : (
                    <>
                      <span style={{ lineHeight: 1 }}>Send Message</span>
                      <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0, lineHeight: 1 }}>
                        <HiPaperAirplane />
                      </span>
                    </>
                  )}
                </GlassButton>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
        @media (max-width: 640px) {
          .contact-form-grid { grid-template-columns: 1fr !important; }
        }
        /* Form inputs — placeholder text white in dark, black in light */
        .contact-form input::placeholder,
        .contact-form textarea::placeholder {
          color: var(--color-text);
          opacity: 0.75;
        }
        [data-theme="light"] .contact-form input::placeholder,
        [data-theme="light"] .contact-form textarea::placeholder {
          color: #0b0f19;
          opacity: 0.6;
        }
      `}</style>
    </section>
  )
}
