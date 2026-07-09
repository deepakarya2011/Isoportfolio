import { motion } from 'framer-motion'
import { GITHUB_STATS, GITHUB_USERNAME, SOCIAL_LINKS } from '../data/portfolioData'
import { FiGithub, FiStar, FiGitCommit, FiActivity, FiCalendar } from 'react-icons/fi'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
}

const iconMap = [FiGithub, FiGitCommit, FiActivity, FiCalendar]

export default function GitHubStats() {
  return (
    <section id="github" className="section">
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
            GitHub
          </span>
          <h2
            className="gradientText"
            style={{ fontSize: 'clamp(36px, 4.5vw, 52px)', fontWeight: 700 }}
          >
            GitHub Activity
          </h2>
        </motion.div>

        {/* Stats grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 20,
            marginBottom: 40,
          }}
          className="github-stats-grid"
        >
          {GITHUB_STATS.map((stat, i) => {
            const Icon = iconMap[i] || FiGithub
            return (
              <motion.div
                key={stat.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -6, borderColor: 'rgba(255,255,255,0.2)' }}
                style={{
                  padding: '28px 24px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--glass-bg)',
                  border: '1px solid var(--glass-border)',
                  backdropFilter: 'blur(16px)',
                  textAlign: 'center',
                  transition: '0.3s var(--ease-premium)',
                }}
              >
                <Icon
                  style={{
                    fontSize: 28,
                    color: 'var(--color-primary-soft)',
                    marginBottom: 12,
                    marginInline: 'auto',
                  }}
                />
                <div
                  style={{
                    fontSize: 'clamp(28px, 3.5vw, 40px)',
                    fontWeight: 700,
                    fontFamily: 'var(--font-heading)',
                    background: 'var(--gradient-text)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    lineHeight: 1.1,
                    marginBottom: 4,
                  }}
                >
                  {stat.value}
                  <span style={{ fontSize: '0.5em' }}>{stat.suffix}</span>
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: 'var(--color-text-dim)',
                    fontWeight: 500,
                  }}
                >
                  {stat.label}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* GitHub profile button */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={4}
          style={{ textAlign: 'center' }}
        >
          <motion.a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '14px 36px',
              borderRadius: 'var(--radius-pill)',
              background: 'var(--color-bg-elevated)',
              border: '1px solid var(--color-border-strong)',
              color: '#fff',
              fontWeight: 600,
              fontSize: 15,
              cursor: 'pointer',
              transition: '0.2s',
            }}
          >
            <FiGithub /> View GitHub Profile
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}