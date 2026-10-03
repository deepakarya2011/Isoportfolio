import { motion } from 'framer-motion'
import { SKILL_GROUPS } from '../data/portfolioData'
import { TechIcon } from '../utils/icons'

const fadeUp = {
  hidden: { y: 40 },
  visible: (i = 0) => ({
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
}

const CATEGORY_GLOWS = {
  Frontend: '#FF8A00',
  Backend: '#FF9D1A',
  Database: '#FF9D1A',
  Mobile: '#FF8A00',
  Tools: '#FF8A00',
  Other: '#FF9D1A',
}

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <motion.div
          initial="hidden" whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="section-head"
        >
          <span className="section-label">Skills</span>
          <h2 className="section-title">
            Technical <span className="text-orange">Skills</span>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }} className="skills-grid">
          {SKILL_GROUPS.map((group, gi) => (
            <motion.div
              key={group.category}
              initial="hidden" whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUp} custom={gi}
            >
              <div className="card card--interactive" style={{ padding: '28px 24px', height: '100%' }}>
                {/* Category header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                  <span className="skill-dot" />
                  <h3 style={{
                    fontSize: 15, fontWeight: 700, fontFamily: 'var(--font-heading)',
                    color: CATEGORY_GLOWS[group.category], letterSpacing: '-0.01em',
                  }}>
                    {group.category}
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {group.skills.map((skill) => (
                    <div key={skill.name} className="skill-row">
                      <div className="skill-icon">
                        <TechIcon name={skill.icon} />
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text)' }}>
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
