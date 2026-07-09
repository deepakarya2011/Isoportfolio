import { useState } from 'react'
import { motion } from 'framer-motion'
import { PROFILE, SOCIAL_LINKS } from '../data/portfolioData'
import { FiGithub, FiLinkedin, FiGlobe, FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import { HiPaperAirplane } from 'react-icons/hi'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          style={{ textAlign: 'center', marginBottom: 72 }}
        >
          <span
            style={{
              display: 'inline-block',
              padding: '6px 18px',
              borderRadius: 'var(--radius-pill)',
              background: 'rgba(6,182,212,0.12)',
              border: '1px solid rgba(6,182,212,0.25)',
              color: 'var(--color-accent)',
              fontSize: 13,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: 2,
              marginBottom: 16,
            }}
          >
            Contact
          </span>
          <h2
            className="gradientText"
            style={{ fontSize: 'clamp(36px, 4.5vw, 52px)', fontWeight: 700 }}
          >
            Get In Touch
          </h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 60,
            alignItems: 'start',
          }}
          className="contact-grid"
        >
          {/* Left — Contact info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            custom={0}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
               {/* Email */}
               <div
                 style={{
                   display: 'flex',
                   alignItems: 'center',
                   gap: 16,
                   padding: '16px 20px',
                   position: 'relative',
                 }}
                 className="liquidGlassCard"
               >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 14,
                    background: 'rgba(99,102,241,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 20,
                    color: 'var(--color-primary-soft)',
                    flexShrink: 0,
                  }}
                >
                  <FiMail />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: 1,
                      color: 'var(--color-text-dimmer)',
                      marginBottom: 4,
                    }}
                  >
                    Email
                  </div>
                  <a
                    href={`mailto:${PROFILE.email}`}
                    style={{
                      fontSize: 15,
                      fontWeight: 500,
                      color: 'var(--color-text)',
                      transition: 'color 0.2s',
                    }}
                  >
                    {PROFILE.email}
                  </a>
                </div>
              </div>

              {/* Location */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '16px 20px',
                  position: 'relative',
                }}
                className="liquidGlassCard"
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 14,
                    background: 'rgba(168,85,247,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 20,
                    color: 'var(--color-purple)',
                    flexShrink: 0,
                  }}
                >
                  <FiMapPin />
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: 1,
                      color: 'var(--color-text-dimmer)',
                      marginBottom: 4,
                    }}
                  >
                    Location
                  </div>
                  <span style={{ fontSize: 15, fontWeight: 500 }}>
                    {PROFILE.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div
              style={{
                display: 'flex',
                gap: 12,
                marginTop: 28,
              }}
            >
              <motion.a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, background: 'rgba(255,255,255,0.1)' }}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: 'var(--glass-bg-strong)',
                  border: '1px solid var(--glass-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  color: 'var(--color-text-dim)',
                  transition: '0.25s',
                }}
              >
                <FiGithub />
              </motion.a>
              <motion.a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, background: 'rgba(255,255,255,0.1)' }}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: 'var(--glass-bg-strong)',
                  border: '1px solid var(--glass-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  color: 'var(--color-text-dim)',
                  transition: '0.25s',
                }}
              >
                <FiLinkedin />
              </motion.a>
              <motion.a
                href={SOCIAL_LINKS.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4, background: 'rgba(255,255,255,0.1)' }}
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  background: 'var(--glass-bg-strong)',
                  border: '1px solid var(--glass-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  color: 'var(--color-text-dim)',
                  transition: '0.25s',
                }}
              >
                <FiGlobe />
              </motion.a>
            </div>
          </motion.div>

          {/* Right — Contact form */}
          <motion.form
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            custom={1}
            onSubmit={handleSubmit}
            style={{
              padding: '36px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              backdropFilter: 'blur(16px)',
              display: 'flex',
              flexDirection: 'column',
              gap: 18,
            }}
          >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="contact-form-grid">
              <input
                type="text"
                placeholder="Your Name"
                required
                style={{
                  padding: '14px 18px',
                  borderRadius: 12,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid var(--glass-border)',
                  fontSize: 14,
                  color: '#fff',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#6366f1')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--glass-border)')}
              />
              <input
                type="email"
                placeholder="Your Email"
                required
                style={{
                  padding: '14px 18px',
                  borderRadius: 12,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid var(--glass-border)',
                  fontSize: 14,
                  color: '#fff',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => (e.target.style.borderColor = '#6366f1')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--glass-border)')}
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              required
              style={{
                padding: '14px 18px',
                borderRadius: 12,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--glass-border)',
                fontSize: 14,
                color: '#fff',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#6366f1')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--glass-border)')}
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              required
              style={{
                padding: '14px 18px',
                borderRadius: 12,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid var(--glass-border)',
                fontSize: 14,
                color: '#fff',
                outline: 'none',
                resize: 'vertical',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#6366f1')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--glass-border)')}
            />

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                padding: '14px 32px',
                borderRadius: 'var(--radius-pill)',
                background: 'var(--gradient-primary)',
                color: '#fff',
                fontWeight: 600,
                fontSize: 15,
                border: 'none',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-glow-primary)',
                transition: '0.2s',
              }}
            >
              {sent ? 'Message Sent! ✓' : 'Send Message'}
              {!sent && <HiPaperAirplane />}
            </motion.button>
          </motion.form>
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  )
}