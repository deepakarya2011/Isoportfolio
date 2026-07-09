import { motion } from 'framer-motion'
import { PROJECTS } from '../data/portfolioData'
import { FiGithub, FiExternalLink } from 'react-icons/fi'

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function Projects() {
  return (
    <section id="projects" className="section">
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
            Projects
          </span>
          <h2
            className="gradientText"
            style={{ fontSize: 'clamp(36px, 4.5vw, 52px)', fontWeight: 700 }}
          >
            Featured Projects
          </h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: 24,
          }}
          className="projects-grid"
        >
          {PROJECTS.map((project, i) => (
            <motion.div
              key={project.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUp}
              custom={i}
               whileHover={{ y: -8 }}
               style={{
                 borderRadius: 'var(--radius-lg)',
                 overflow: 'hidden',
                 display: 'flex',
                 flexDirection: 'column',
                 position: 'relative',
               }}
               className="liquidGlassCard"
             >
               {/* Thumbnail - unified with card */}
               <div
                 style={{
                   aspectRatio: '16 / 9',
                   background: `linear-gradient(135deg, ${project.accent}22, ${project.accent}08)`,
                   display: 'flex',
                   alignItems: 'center',
                   justifyContent: 'center',
                   position: 'relative',
                   overflow: 'hidden',
                 }}
               >
                {project.thumbnail ? (
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      position: 'absolute',
                      inset: 0,
                    }}
                  />
                ) : (
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: `radial-gradient(circle at 30% 40%, ${project.accent}30, transparent 70%)`,
                    }}
                  />
                )}
              </div>

              {/* Content */}
              <div
                style={{
                  padding: '24px 24px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                }}
              >
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    fontFamily: 'var(--font-heading)',
                    marginBottom: 10,
                    letterSpacing: '-0.01em',
                  }}
                >
                  {project.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.7,
                    color: 'var(--color-text-dimmer)',
                    marginBottom: 20,
                    flex: 1,
                  }}
                >
                  {project.description}
                </p>

                {/* Tech tags */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 8,
                    marginBottom: 20,
                  }}
                >
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        padding: '4px 12px',
                        borderRadius: 'var(--radius-pill)',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid var(--glass-border)',
                        fontSize: 12,
                        fontWeight: 500,
                        color: 'var(--color-text-dim)',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div style={{ display: 'flex', gap: 10 }}>
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.04, background: 'rgba(255,255,255,0.1)' }}
                    whileTap={{ scale: 0.96 }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '10px 20px',
                      borderRadius: 'var(--radius-pill)',
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid var(--glass-border)',
                      color: '#fff',
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer',
                      textDecoration: 'none',
                      transition: '0.2s',
                    }}
                  >
                    <FiGithub /> GitHub
                  </motion.a>
                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '10px 20px',
                      borderRadius: 'var(--radius-pill)',
                      background: `linear-gradient(135deg, ${project.accent}, ${project.accent}cc)`,
                      color: '#fff',
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: 'none',
                      textDecoration: 'none',
                      boxShadow: `0 4px 20px ${project.accent}40`,
                    }}
                  >
                    <FiExternalLink /> Live Demo
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}