import { useState } from 'react'
import { motion } from 'framer-motion'
import { PROJECTS } from '../data/portfolioData'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import { LiquidGlass, GlassTag } from './LiquidGlass'

const fadeUp = {
  hidden: { y: 48 },
  visible: (i = 0) => ({
    y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
}

function ProjectCard({ project, i }) {
  const [imgHovered, setImgHovered] = useState(false)

  return (
    <motion.div
      initial="hidden" whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeUp} custom={i}
    >
      <LiquidGlass
        radius={26}
        blur={36}
        tint="rgba(255,255,255,0.055)"
        tintHover="rgba(255,255,255,0.095)"
        glow={project.accent}
        intensity={1.1}
        style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        {/* Thumbnail */}
        <div
          style={{ aspectRatio: '16/9', position: 'relative', overflow: 'hidden', borderRadius: '26px 26px 0 0' }}
          onMouseEnter={() => setImgHovered(true)}
          onMouseLeave={() => setImgHovered(false)}
        >
          {project.thumbnail && (
            <motion.img
              src={project.thumbnail}
              alt={project.title}
              loading="lazy"
              animate={{ scale: imgHovered ? 1.07 : 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 28 }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          )}
          {/* Glass overlay on image */}
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(to top, ${project.accent}40 0%, transparent 55%)`,
            pointerEvents: 'none',
          }} />
          {/* Top reflection on image */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.40) 50%, transparent)',
            pointerEvents: 'none',
          }} />
        </div>

        {/* Content */}
        <div style={{ padding: '24px 24px 28px', display: 'flex', flexDirection: 'column', flex: 1, position: 'relative', zIndex: 2 }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, fontFamily: 'var(--font-heading)', marginBottom: 10, letterSpacing: '-0.01em' }}>
            {project.title}
          </h3>
          <p style={{ fontSize: 13.5, lineHeight: 1.75, color: 'var(--color-text-dimmer)', marginBottom: 18, flex: 1 }}>
            {project.description}
          </p>

          {/* Tech tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 20 }}>
            {project.tech.map(t => (
              <GlassTag key={t} color={project.accent}>{t}</GlassTag>
            ))}
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 10, position: 'relative', zIndex: 10 }}>
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '9px 18px', borderRadius: 999,
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.14)',
                backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                color: 'var(--color-text)', fontSize: 13, fontWeight: 600,
                textDecoration: 'none', cursor: 'pointer',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.18), 0 2px 8px rgba(0,0,0,0.20)',
                transition: 'background 0.2s, box-shadow 0.2s',
                pointerEvents: 'auto',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.13)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)' }}
            >
              <FiGithub size={13} /> GitHub
            </a>
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '9px 18px', borderRadius: 999,
                background: `${project.accent}22`,
                border: `1px solid ${project.accent}45`,
                backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
                color: '#fff', fontSize: 13, fontWeight: 600,
                textDecoration: 'none', cursor: 'pointer',
                boxShadow: `inset 0 1px 0 rgba(255,255,255,0.20), 0 4px 20px ${project.accent}35`,
                transition: 'background 0.2s, box-shadow 0.2s',
                pointerEvents: 'auto',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = `${project.accent}38`; e.currentTarget.style.boxShadow = `inset 0 1px 0 rgba(255,255,255,0.25), 0 6px 28px ${project.accent}50` }}
              onMouseLeave={e => { e.currentTarget.style.background = `${project.accent}22`; e.currentTarget.style.boxShadow = `inset 0 1px 0 rgba(255,255,255,0.20), 0 4px 20px ${project.accent}35` }}
            >
              <FiExternalLink size={13} /> Live Demo
            </a>
          </div>
        </div>
      </LiquidGlass>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section">
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
            background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)',
            color: 'var(--color-primary-soft)', fontSize: 13, fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: 2, marginBottom: 16,
          }}>Projects</span>
          <h2 className="gradientText" style={{ fontSize: 'clamp(36px, 4.5vw, 52px)', fontWeight: 700 }}>
            Featured Projects
          </h2>
        </motion.div>

        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 24 }}
          className="projects-grid"
        >
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
