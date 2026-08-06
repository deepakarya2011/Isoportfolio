import { motion } from 'framer-motion'
import { HIGHLIGHTS } from '../data/portfolioData'
import { TechIcon } from '../utils/icons'
import { GlassCard, LiquidGlass } from './LiquidGlass'

const fadeUp = {
  hidden: { y: 44 },
  visible: (i = 0) => ({
    y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function About() {
  return (
    <section id="about" className="section">
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
          }}>About</span>
          <h2 className="gradientText" style={{ fontSize: 'clamp(36px, 4.5vw, 52px)', fontWeight: 700 }}>
            About Me
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }} className="about-grid">
          {/* Left */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} custom={0}>
            <GlassCard glow="#06b6d4" blur={6} style={{ padding: '36px 32px' }}>
              <p style={{ fontSize: 'clamp(15px, 1.2vw, 17px)', lineHeight: 1.85, color: 'var(--color-text)', marginBottom: 20, textShadow: '0 1px 2px rgba(0,0,0,0.40), 0 0 8px rgba(0,0,0,0.25)' }}>
                I am Deepak Arya, a Full Stack Developer and Artificial Intelligence & Machine Learning student with a strong interest in web development, software engineering, and modern technologies.
              </p>
              <p style={{ fontSize: 'clamp(15px, 1.2vw, 17px)', lineHeight: 1.85, color: 'var(--color-text)', marginBottom: 20, textShadow: '0 1px 2px rgba(0,0,0,0.40), 0 0 8px rgba(0,0,0,0.25)' }}>
                I enjoy building scalable applications, creating responsive user interfaces, developing backend APIs, and solving real-world problems through technology.
              </p>
              <p style={{ fontSize: 'clamp(15px, 1.2vw, 17px)', lineHeight: 1.85, color: 'var(--color-text)', textShadow: '0 1px 2px rgba(0,0,0,0.40), 0 0 8px rgba(0,0,0,0.25)' }}>
                My goal is to become a highly skilled software engineer and contribute to impactful products while continuously learning new technologies.
              </p>
            </GlassCard>
          </motion.div>

          {/* Right — highlights */}
          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}
            className="about-highlights-grid"
          >
            {HIGHLIGHTS.map((item, i) => (
              <motion.div key={item.title} variants={fadeUp} custom={i}>
                <LiquidGlass
                  radius={18}
                  blur={6}
                  tint="rgba(255,255,255,0.02)"
                  tintHover="rgba(255,255,255,0.01)"
                  glow="#6366f1"
                  intensity={0.9}
                  style={{ padding: '20px 18px' }}
                >
                  <div style={{
                    width: 40, height: 40, borderRadius: 12,
                    background: 'rgba(99,102,241,0.14)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18, color: 'var(--color-primary-soft)', marginBottom: 12,
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.15)',
                  }}>
                    <TechIcon name={item.icon} />
                  </div>
                  <span style={{ fontSize: 13.5, fontWeight: 600, fontFamily: 'var(--font-heading)', color: 'var(--color-text)', textShadow: '0 1px 2px rgba(0,0,0,0.40), 0 0 8px rgba(0,0,0,0.25)' }}>
                    {item.title}
                  </span>
                </LiquidGlass>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .about-highlights-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .about-highlights-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
