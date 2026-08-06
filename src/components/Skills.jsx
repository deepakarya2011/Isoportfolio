import { motion } from 'framer-motion'
import { SKILL_GROUPS } from '../data/portfolioData'
import { TechIcon } from '../utils/icons'
import { GlassCard } from './LiquidGlass'

const fadeUp = {
  hidden: { y: 40 },
  visible: (i = 0) => ({
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
}

const CATEGORY_GLOWS = {
  Frontend: '#6366f1',
  Backend: '#06b6d4',
  Database: '#a855f7',
  Tools: '#06b6d4',
  Other: '#6366f1',
}

export default function Skills() {
  return (
    <section id="skills" className="section">
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
            background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.25)',
            color: 'var(--color-purple)', fontSize: 13, fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: 2, marginBottom: 16,
          }}>Skills</span>
          <h2 className="gradientText" style={{ fontSize: 'clamp(36px, 4.5vw, 52px)', fontWeight: 700 }}>
            Technical Skills
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
              <GlassCard
                glow={CATEGORY_GLOWS[group.category]}
                blur={6}
                style={{ padding: '28px 24px', height: '100%' }}
              >
                {/* Category header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: CATEGORY_GLOWS[group.category],
                    boxShadow: `0 0 10px ${CATEGORY_GLOWS[group.category]}80`,
                  }} />
                  <h3 style={{
                    fontSize: 15, fontWeight: 700, fontFamily: 'var(--font-heading)',
                    color: CATEGORY_GLOWS[group.category], letterSpacing: '-0.01em',
                  }}>
                    {group.category}
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {group.skills.map((skill) => (
                    <div key={skill.name} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      {/* Glass icon bubble */}
                      <div style={{ position: 'relative', width: 32, height: 32, borderRadius: 10, isolation: 'isolate', overflow: 'hidden', flexShrink: 0 }}>
                        <div style={{ position: 'absolute', inset: 0, backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', borderRadius: 10, pointerEvents: 'none' }} />
                        <div style={{ position: 'absolute', inset: 0, background: `${CATEGORY_GLOWS[group.category]}08`, borderRadius: 10, pointerEvents: 'none' }} />
                        <div style={{ position: 'absolute', inset: 0, border: '1px solid transparent', backgroundImage: `linear-gradient(135deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.04) 100%)`, backgroundOrigin: 'border-box', WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'destination-out', maskComposite: 'exclude', borderRadius: 10, pointerEvents: 'none' }} />
                        <div style={{ position: 'absolute', top: 0, left: '10%', right: '10%', height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.50) 50%, transparent)', pointerEvents: 'none' }} />
                        <div style={{ position: 'relative', zIndex: 1, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, color: 'var(--color-text)', textShadow: '0 1px 2px rgba(0,0,0,0.40), 0 0 8px rgba(0,0,0,0.25)' }}>
                          <TechIcon name={skill.icon} />
                        </div>
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text)', textShadow: '0 1px 2px rgba(0,0,0,0.40), 0 0 8px rgba(0,0,0,0.25)' }}>
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
