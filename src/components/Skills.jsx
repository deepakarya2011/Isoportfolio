import { motion } from 'framer-motion'
import { SKILL_GROUPS } from '../data/portfolioData'
import { TechIcon } from '../utils/icons'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function Skills() {
  return (
    <section id="skills" className="section">
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
              background: 'rgba(168,85,247,0.12)',
              border: '1px solid rgba(168,85,247,0.25)',
              color: 'var(--color-purple)',
              fontSize: 13,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: 2,
              marginBottom: 16,
            }}
          >
            Skills
          </span>
          <h2
            className="gradientText"
            style={{ fontSize: 'clamp(36px, 4.5vw, 52px)', fontWeight: 700 }}
          >
            Technical Skills
          </h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 20,
          }}
          className="skills-grid"
        >
          {SKILL_GROUPS.map((group, gi) => (
            <motion.div
              key={group.category}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUp}
              custom={gi}
               whileHover={{ y: -6 }}
               style={{
                 padding: '28px 24px',
                 position: 'relative',
               }}
               className="liquidGlassCard"
             >
              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 700,
                  fontFamily: 'var(--font-heading)',
                  marginBottom: 20,
                  color: 'var(--color-primary-soft)',
                  letterSpacing: '-0.01em',
                }}
              >
                {group.category}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {group.skills.map((skill) => (
                  <div
                    key={skill.name}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                    }}
                  >
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 10,
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid var(--glass-border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 16,
                        color: 'var(--color-text-dim)',
                        flexShrink: 0,
                      }}
                    >
                      <TechIcon name={skill.icon} />
                    </div>
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: 'var(--color-text-dim)',
                      }}
                    >
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}