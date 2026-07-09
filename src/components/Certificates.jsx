import { motion } from 'framer-motion'
import { CERTIFICATES } from '../data/portfolioData'
import { HiOutlineDocumentText } from 'react-icons/hi'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function Certificates() {
  return (
    <section id="certificates" className="section">
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
              background: 'rgba(99,102,241,0.12)',
              border: '1px solid rgba(99,102,241,0.25)',
              color: 'var(--color-primary-soft)',
              fontSize: 13,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: 2,
              marginBottom: 16,
            }}
          >
            Certificates
          </span>
          <h2
            className="gradientText"
            style={{ fontSize: 'clamp(36px, 4.5vw, 52px)', fontWeight: 700 }}
          >
            Certifications
          </h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: 20,
          }}
          className="certificates-grid"
        >
          {CERTIFICATES.map((cert, i) => (
            <motion.div
              key={`${cert.title}-${i}`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUp}
              custom={i}
               whileHover={{ y: -6 }}
               style={{
                 padding: '28px 24px',
                 position: 'relative',
                 textAlign: 'center',
               }}
               className="liquidGlassCard"
             >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 16,
                  background: 'rgba(99,102,241,0.12)',
                  border: '1px solid rgba(99,102,241,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  fontSize: 24,
                  color: 'var(--color-primary-soft)',
                }}
              >
                <HiOutlineDocumentText />
              </div>
              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  fontFamily: 'var(--font-heading)',
                  marginBottom: 8,
                  lineHeight: 1.3,
                }}
              >
                {cert.title}
              </h3>
              <p
                style={{
                  fontSize: 13,
                  color: 'var(--color-text-dim)',
                  marginBottom: 4,
                }}
              >
                {cert.issuer}
              </p>
              <span
                style={{
                  fontSize: 12,
                  color: 'var(--color-text-dimmer)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {cert.year}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}