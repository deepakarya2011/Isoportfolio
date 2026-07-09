import { motion } from 'framer-motion'
import { EDUCATION } from '../data/portfolioData'
import { HiAcademicCap } from 'react-icons/hi2'

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function Education() {
  return (
    <section id="education" className="section">
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
            Education
          </span>
          <h2
            className="gradientText"
            style={{ fontSize: 'clamp(36px, 4.5vw, 52px)', fontWeight: 700 }}
          >
            Academic Background
          </h2>
        </motion.div>

       {/* Timeline */}
        <div style={{ position: 'relative', maxWidth: 700, margin: '0 auto' }} className="education-timeline">
          {/* Vertical line - centered on dots */}
          <div
            style={{
              position: 'absolute',
              left: 29,
              top: 0,
              bottom: 0,
              width: 2,
              background: 'linear-gradient(180deg, var(--color-primary), var(--color-accent), transparent)',
              opacity: 0.5,
            }}
            className="education-line"
          />

          {EDUCATION.map((item, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUp}
              custom={i}
              style={{
                position: 'relative',
                paddingLeft: 76,
                paddingBottom: i < EDUCATION.length - 1 ? 60 : 0,
              }}
            >
              {/* Dot - centered on line */}
              <div
                style={{
                  position: 'absolute',
                  left: 18,
                  top: 6,
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  background: 'var(--color-bg)',
                  border: '3px solid var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 2,
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: 'var(--color-primary)',
                  }}
                />
              </div>

               {/* Card */}
               <div
                 style={{
                   padding: '28px 32px',
                   position: 'relative',
                 }}
                 className="liquidGlassCard"
               >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    marginBottom: 10,
                  }}
                >
                  <HiAcademicCap
                    style={{
                      fontSize: 22,
                      color: 'var(--color-primary-soft)',
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: 'var(--color-accent)',
                      textTransform: 'uppercase',
                      letterSpacing: 1,
                    }}
                  >
                    {item.field}
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    fontFamily: 'var(--font-heading)',
                    marginBottom: 6,
                  }}
                >
                  {item.degree}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: 'var(--color-text-dim)',
                    marginBottom: 6,
                  }}
                >
                  {item.school}
                </p>
                <span
                  style={{
                    fontSize: 13,
                    color: 'var(--color-text-dimmer)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {item.period}
                </span>
                <p
                  style={{
                    fontSize: 14,
                    color: 'var(--color-text-dimmer)',
                    lineHeight: 1.7,
                    marginTop: 12,
                  }}
                >
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .education-line {
            display: none !important;
          }
          .education-timeline > div {
            padding-left: 16px !important;
          }
          .education-timeline .liquidGlassCard {
            padding: 20px 16px !important;
          }
        }
      `}</style>
    </section>
  )
}
