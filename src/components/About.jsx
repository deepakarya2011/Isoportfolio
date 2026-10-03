import { motion } from 'framer-motion'
import { HIGHLIGHTS } from '../data/portfolioData'
import { TechIcon } from '../utils/icons'

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
          className="section-head"
        >
          <span className="section-label">About</span>
          <h2 className="section-title">
            About <span className="text-orange">Me</span>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }} className="about-grid">
          {/* Left */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={fadeUp} custom={0}>
            <div className="card card--interactive card--top-accent" style={{ padding: '36px 32px' }}>
              <p style={{ fontSize: 'clamp(15px, 1.2vw, 17px)', lineHeight: 1.85, color: 'var(--color-text)', marginBottom: 20, textShadow: '0 1px 2px rgba(0,0,0,0.40), 0 0 8px rgba(0,0,0,0.25)' }}>
                I am Deepak Arya, a Full Stack Developer, Android &amp; iOS App Developer, and Artificial Intelligence &amp; Machine Learning student with a strong interest in web development, mobile apps, software engineering, and modern technologies.
              </p>
              <p style={{ fontSize: 'clamp(15px, 1.2vw, 17px)', lineHeight: 1.85, color: 'var(--color-text)', marginBottom: 20, textShadow: '0 1px 2px rgba(0,0,0,0.40), 0 0 8px rgba(0,0,0,0.25)' }}>
                I enjoy building scalable applications, creating responsive user interfaces, developing backend APIs with Node.js and Python, designing databases with MongoDB and MySQL, and crafting cross-platform mobile apps — solving real-world problems through technology.
              </p>
              <p style={{ fontSize: 'clamp(15px, 1.2vw, 17px)', lineHeight: 1.85, color: 'var(--color-text)', textShadow: '0 1px 2px rgba(0,0,0,0.40), 0 0 8px rgba(0,0,0,0.25)' }}>
                My goal is to become a highly skilled software engineer and contribute to impactful products while continuously learning new technologies.
              </p>
            </div>
          </motion.div>

          {/* Right — highlights */}
          <motion.div
            initial="hidden" whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}
            className="about-highlights-grid"
          >
            {HIGHLIGHTS.map((item, i) => (
              <motion.div key={item.title} variants={fadeUp} custom={i} style={{ height: '100%' }}>
                <div className="card card--interactive" style={{ padding: '20px 18px', height: '100%' }}>
                  <div className="icon-tile" style={{ width: 40, height: 40, borderRadius: 12, fontSize: 18, marginBottom: 12 }}>
                    <TechIcon name={item.icon} />
                  </div>
                  <span style={{ fontSize: 13.5, fontWeight: 600, fontFamily: 'var(--font-heading)', color: 'var(--color-text)' }}>
                    {item.title}
                  </span>
                </div>
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
