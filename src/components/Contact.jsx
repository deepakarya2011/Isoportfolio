import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { PROFILE, SOCIAL_LINKS, EMAILJS_CONFIG } from '../data/portfolioData'
import { FiGithub, FiLinkedin, FiGlobe, FiMail, FiMapPin } from 'react-icons/fi'
import { HiPaperAirplane } from 'react-icons/hi'
import { GlassButton } from './LiquidGlass'
const fadeUp = {
  hidden: { y: 40 },
  visible: (i = 0) => ({
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
}

// Form fields use the shared `.contact-input` styles defined in index.css

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
          className="section-head"
        >
          <span className="section-label">Contact</span>
          <h2 className="section-title">
            Get In <span className="text-orange">Touch</span>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }} className="contact-grid">

          {/* Left — info */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp} custom={0}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Email card */}
              <div className="card card--interactive" style={{ padding: '18px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div className="icon-tile" style={{ width: 44, height: 44, fontSize: 20 }}>
                    <FiMail />
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1.2, color: 'var(--color-text-dimmer)', marginBottom: 4 }}>Email</div>
                    <a href={`mailto:${PROFILE.email}`} style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text)', transition: 'color 0.2s' }}>
                      {PROFILE.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Location card */}
              <div className="card card--interactive" style={{ padding: '18px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  <div className="icon-tile" style={{ width: 44, height: 44, fontSize: 20 }}>
                    <FiMapPin />
                  </div>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1.2, color: 'var(--color-text-dimmer)', marginBottom: 4 }}>Location</div>
                    <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-text)' }}>{PROFILE.location}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              {[
                { href: SOCIAL_LINKS.github, icon: <FiGithub size={20} />, label: 'GitHub' },
                { href: SOCIAL_LINKS.linkedin, icon: <FiLinkedin size={20} />, label: 'LinkedIn' },
                { href: SOCIAL_LINKS.portfolio, icon: <FiGlobe size={20} />, label: 'Portfolio' },
              ].map(({ href, icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={label}
                >
                  {icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-60px' }} variants={fadeUp} custom={1}>
            <div className="card" style={{ padding: '36px 32px' }}>
              <form ref={formRef} onSubmit={handleSubmit} className="contact-form" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="contact-form-grid">
                  <input type="text" name="name" placeholder="Your Name" required className="contact-input" />
                  <input type="email" name="email" placeholder="Your Email" required className="contact-input" />
                </div>
                <input type="text" name="title" placeholder="Subject" required className="contact-input" />
                <textarea name="message" placeholder="Your Message" rows={5} required className="contact-input" style={{ resize: 'vertical' }} />
                <GlassButton
                  type="submit"
                  disabled={sending}
                  variant="primary"
                  style={{ width: '100%', padding: '15px 32px', fontSize: 15 }}
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
            </div>
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
          color: #B0B3B8;
          opacity: 0.7;
        }
      `}</style>
    </section>
  )
}
