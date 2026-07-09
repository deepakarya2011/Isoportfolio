import { motion } from 'framer-motion'
import { PROFILE, SOCIAL_LINKS, NAV_LINKS } from '../data/portfolioData'
import { FiGithub, FiLinkedin, FiGlobe, FiHeart } from 'react-icons/fi'

export default function Footer() {
  const year = new Date().getFullYear()

  const scrollTo = (href) => {
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer
      style={{
        borderTop: '1px solid var(--color-border)',
        padding: '60px 0 32px',
        position: 'relative',
      }}
      className="liquidGlass"
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr',
            gap: 48,
            marginBottom: 48,
          }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <motion.button
              onClick={() => scrollTo('#home')}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 16,
                cursor: 'pointer',
              }}
              whileHover={{ scale: 1.04 }}
            >
              <span
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: 'var(--gradient-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: 16,
                  fontFamily: 'var(--font-heading)',
                  color: '#fff',
                }}
              >
                DA
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 700,
                  fontSize: 18,
                  background: 'var(--gradient-text)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                Deepak Arya
              </span>
            </motion.button>
            <p
              style={{
                fontSize: 14,
                color: 'var(--color-text-dimmer)',
                lineHeight: 1.7,
                maxWidth: 320,
              }}
            >
              Full Stack Developer &amp; AI/ML Student. Building modern, scalable web applications with cutting-edge technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontSize: 14,
                fontWeight: 700,
                fontFamily: 'var(--font-heading)',
                marginBottom: 16,
                color: 'var(--color-text)',
              }}
            >
              Quick Links
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {NAV_LINKS.slice(0, 5).map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    color: 'var(--color-text-dimmer)',
                    fontSize: 14,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'color 0.2s',
                  }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4
              style={{
                fontSize: 14,
                fontWeight: 700,
                fontFamily: 'var(--font-heading)',
                marginBottom: 16,
                color: 'var(--color-text)',
              }}
            >
              Connect
            </h4>
            <div style={{ display: 'flex', gap: 10 }}>
              <motion.a
                href={SOCIAL_LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, color: '#fff' }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: 'var(--glass-bg-strong)',
                  border: '1px solid var(--glass-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                  color: 'var(--color-text-dimmer)',
                  transition: '0.2s',
                }}
              >
                <FiGithub />
              </motion.a>
              <motion.a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, color: '#fff' }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: 'var(--glass-bg-strong)',
                  border: '1px solid var(--glass-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                  color: 'var(--color-text-dimmer)',
                  transition: '0.2s',
                }}
              >
                <FiLinkedin />
              </motion.a>
              <motion.a
                href={SOCIAL_LINKS.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, color: '#fff' }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: 'var(--glass-bg-strong)',
                  border: '1px solid var(--glass-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                  color: 'var(--color-text-dimmer)',
                  transition: '0.2s',
                }}
              >
                <FiGlobe />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            borderTop: '1px solid var(--color-border)',
            paddingTop: 24,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
          }}
          className="footer-bottom"
        >
          <span
            style={{
              fontSize: 13,
              color: 'var(--color-text-dimmer)',
            }}
          >
            &copy; {year} {PROFILE.name}. All rights reserved.
          </span>
          <span
            style={{
              fontSize: 13,
              color: 'var(--color-text-dimmer)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            Made with <FiHeart style={{ color: 'var(--color-primary)', fontSize: 14 }} /> using React &amp; Framer Motion
          </span>
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
        }
        @media (max-width: 480px) {
          .footer-grid {
            gap: 24px !important;
          }
        }
      `}</style>
    </footer>
  )
}