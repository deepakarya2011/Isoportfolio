import { useState } from 'react'
import { motion } from 'framer-motion'
import { PROJECTS } from '../data/portfolioData'
import { FiGithub, FiExternalLink } from 'react-icons/fi'

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
}

function ProjectCard({ project, i }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeUp}
      custom={i}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -10, scale: 1.015 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      style={{
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        background: 'var(--glass-bg)',
        border: `1px solid ${hovered ? project.accent + '50' : 'var(--glass-border)'}`,
        backdropFilter: 'blur(30px)',
        WebkitBackdropFilter: 'blur(30px)',
        boxShadow: hovered
          ? `0 24px 60px rgba(0,0,0,0.35), 0 0 40px ${project.accent}20`
          : 'var(--glass-shadow)',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
    >
      {/* Top highlight line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: hovered
            ? `linear-gradient(90deg, transparent, ${project.accent}80, transparent)`
            : 'var(--glass-highlight)',
          transition: 'background 0.4s',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Shimmer — pointer-events: none so it never blocks clicks */}
      <motion.div
        animate={hovered ? { x: '200%' } : { x: '-120%' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '40%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
          transform: 'skewX(-20deg)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Thumbnail */}
      <div
        style={{
          aspectRatio: '16 / 9',
          background: `linear-gradient(135deg, ${project.accent}22, ${project.accent}08)`,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {project.thumbnail && (
          <motion.img
            src={project.thumbnail}
            alt={project.title}
            loading="lazy"
            animate={hovered ? { scale: 1.06 } : { scale: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              inset: 0,
            }}
          />
        )}
        {/* Gradient overlay on image */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(to top, ${project.accent}30 0%, transparent 60%)`,
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          padding: '24px 24px 28px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          position: 'relative',
          zIndex: 2,
        }}
      >
        <h3
          style={{
            fontSize: 18,
            fontWeight: 700,
            fontFamily: 'var(--font-heading)',
            marginBottom: 10,
            letterSpacing: '-0.01em',
            color: 'var(--color-text-heading)',
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
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 20 }}>
          {project.tech.map((t) => (
            <span
              key={t}
              style={{
                padding: '4px 12px',
                borderRadius: 'var(--radius-pill)',
                background: `${project.accent}12`,
                border: `1px solid ${project.accent}30`,
                fontSize: 12,
                fontWeight: 500,
                color: 'var(--color-text-dim)',
              }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Buttons — explicit z-index and pointer-events to guarantee clickability */}
        <div style={{ display: 'flex', gap: 10, position: 'relative', zIndex: 10 }}>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 20px',
              borderRadius: 'var(--radius-pill)',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid var(--glass-border)',
              color: 'var(--color-text)',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'background 0.2s, border-color 0.2s',
              pointerEvents: 'auto',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.borderColor = 'var(--glass-border)' }}
          >
            <FiGithub /> GitHub
          </a>
          <a
            href={project.demo}
            target="_blank"
            rel="noopener noreferrer"
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
              transition: 'opacity 0.2s, transform 0.2s',
              pointerEvents: 'auto',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'scale(1.03)' }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1)' }}
          >
            <FiExternalLink /> Live Demo
          </a>
        </div>
      </div>
    </motion.div>
  )
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
            <ProjectCard key={project.id} project={project} i={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
