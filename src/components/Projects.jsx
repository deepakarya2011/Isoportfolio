import { motion } from 'framer-motion'
import { PROJECTS } from '../data/portfolioData'
import { FiGithub, FiExternalLink } from 'react-icons/fi'
import { GlassTag } from './LiquidGlass'

const fadeUp = {
  hidden: { y: 48 },
  visible: (i = 0) => ({
    y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
}

function ProjectCard({ project, i }) {
  return (
    <motion.div
      initial="hidden" whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={fadeUp} custom={i}
      style={{ height: '100%' }}
    >
      <article className="project-card">
        {/* Thumbnail */}
        <div className="project-media">
          {project.thumbnail && (
            <img
              src={project.thumbnail}
              alt={project.title}
              loading="lazy"
            />
          )}
        </div>

        {/* Content */}
        <div className="project-body">
          <h3 className="project-title">{project.title}</h3>
          <p className="project-desc">{project.description}</p>

          {/* Tech tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 20 }}>
            {project.tech.map(t => (
              <GlassTag key={t}>{t}</GlassTag>
            ))}
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <a
              className="btn btn--sm btn--ghost"
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiGithub size={14} /> GitHub
            </a>
            <a
              className="btn btn--sm btn--primary"
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FiExternalLink size={14} /> Live Demo
            </a>
          </div>
        </div>
      </article>
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
          className="section-head"
        >
          <span className="section-label">Projects</span>
          <h2 className="section-title">
            Featured <span className="text-orange">Projects</span>
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
