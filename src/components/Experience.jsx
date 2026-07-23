import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { EXPERIENCE } from '../data/portfolioData'
import { TechIcon } from '../utils/icons'
import {
  FaBriefcase,
  FaCalendar,
  FaUserTie,
  FaCircleCheck,
  FaStar,
  FaArrowRight,
  FaClock,
  FaCode,
} from 'react-icons/fa6'

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] },
  }),
}

// Animated counter hook
function useCountUp(target, duration = 2000, startOnView = true) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const hasStarted = useRef(false)

  useEffect(() => {
    if (!startOnView) {
      animateCount()
      return
    }

    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true
          animateCount()
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  function animateCount() {
    if (target === 0) return
    const startTime = performance.now()

    function step(currentTime) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))

      if (progress < 1) {
        requestAnimationFrame(step)
      } else {
        setCount(target)
      }
    }

    requestAnimationFrame(step)
  }

  return [count, ref]
}

// Single metric card with animated counter
function MetricItem({ label, value, suffix }) {
  const [count, ref] = useCountUp(value)

  return (
    <div
      ref={ref}
      style={{
        textAlign: 'center',
        padding: '16px 12px',
        borderRadius: 'var(--radius-md)',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid var(--glass-border)',
        transition: 'all 0.3s var(--ease-premium)',
      }}
      className="metric-item"
    >
      <div
        style={{
          fontSize: 'clamp(24px, 2.5vw, 32px)',
          fontWeight: 800,
          fontFamily: 'var(--font-heading)',
          background: 'var(--gradient-primary)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1.2,
        }}
      >
        {count}{suffix}
      </div>
      <div
        style={{
          fontSize: 12,
          color: 'var(--color-text-dimmer)',
          fontWeight: 500,
          marginTop: 4,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        }}
      >
        {label}
      </div>
    </div>
  )
}

export default function Experience() {
  const exp = EXPERIENCE[0]
  if (!exp) return null

  return (
    <section id="experience" className="section">
      <div className="container">
        {/* Section Header */}
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
            Experience
          </span>
          <h2
            className="gradientText"
            style={{ fontSize: 'clamp(36px, 4.5vw, 52px)', fontWeight: 700 }}
          >
            Professional Experience & Client Work
          </h2>
        </motion.div>

        {/* Main Experience Card */}
        <div
          style={{
            maxWidth: 900,
            margin: '0 auto',
            position: 'relative',
          }}
        >
          {/* Timeline line */}
          <div
            style={{
              position: 'absolute',
              left: 36,
              top: 0,
              bottom: 0,
              width: 2,
              background:
                'linear-gradient(180deg, var(--color-primary), var(--color-accent), transparent)',
              opacity: 0.5,
            }}
            className="exp-line"
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            style={{
              position: 'relative',
              paddingLeft: 76,
            }}
          >
            {/* Timeline dot */}
            <div
              style={{
                position: 'absolute',
                left: 24,
                top: 28,
                width: 26,
                height: 26,
                borderRadius: '50%',
                background: 'var(--color-bg)',
                border: '3px solid var(--color-accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: 'var(--color-accent)',
                  boxShadow: '0 0 12px rgba(6,182,212,0.5)',
                }}
              />
            </div>

            {/* Glass Card */}
            <div className="liquidGlassCard" style={{ padding: 0, overflow: 'hidden' }}>
              {/* Card Header with gradient accent */}
              <div
                style={{
                  padding: '28px 32px 20px',
                  position: 'relative',
                  borderBottom: '1px solid var(--glass-border)',
                }}
              >
                {/* Top accent bar */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    background: 'var(--gradient-primary)',
                  }}
                />

                {/* Status badge */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '4px 14px',
                    borderRadius: 'var(--radius-pill)',
                    background: 'rgba(34,197,94,0.12)',
                    border: '1px solid rgba(34,197,94,0.25)',
                    color: '#22c55e',
                    fontSize: 12,
                    fontWeight: 600,
                    marginBottom: 16,
                  }}
                >
                  <FaCircleCheck size={12} />
                  {exp.status} {exp.statusIcon}
                </div>

                {/* Role + Company */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    marginBottom: 8,
                  }}
                >
                  <FaBriefcase
                    size={20}
                    style={{ color: 'var(--color-primary-soft)', flexShrink: 0 }}
                  />
                  <h3
                    style={{
                      fontSize: 22,
                      fontWeight: 700,
                      fontFamily: 'var(--font-heading)',
                    }}
                  >
                    {exp.role}
                  </h3>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    marginBottom: 12,
                    flexWrap: 'wrap',
                  }}
                >
                  <FaUserTie
                    size={15}
                    style={{ color: 'var(--color-text-dimmer)', flexShrink: 0 }}
                  />
                  <span
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: 'var(--color-accent)',
                    }}
                  >
                    {exp.company}
                  </span>
                </div>

                {/* Meta info row */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 20,
                    fontSize: 13,
                    color: 'var(--color-text-dim)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <FaCalendar size={12} style={{ color: 'var(--color-text-dimmer)' }} />
                    {exp.duration}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <FaClock size={12} style={{ color: 'var(--color-text-dimmer)' }} />
                    {exp.employmentType}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '24px 32px' }}>
                {/* Description */}
                <p
                  style={{
                    fontSize: 14.5,
                    lineHeight: 1.8,
                    color: 'var(--color-text-dim)',
                    marginBottom: 28,
                  }}
                >
                  {exp.description}
                </p>

                {/* Responsibilities */}
                <div style={{ marginBottom: 28 }}>
                  <h4
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      fontFamily: 'var(--font-heading)',
                      color: 'var(--color-primary-soft)',
                      marginBottom: 14,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <FaStar size={14} />
                    Responsibilities
                  </h4>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                      gap: 8,
                    }}
                    className="resp-grid"
                  >
                    {exp.responsibilities.map((item, i) => (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 10,
                          padding: '10px 14px',
                          borderRadius: 'var(--radius-sm)',
                          background: 'rgba(255,255,255,0.02)',
                          border: '1px solid var(--glass-border)',
                          fontSize: 13.5,
                          color: 'var(--color-text-dim)',
                          lineHeight: 1.6,
                          transition: 'all 0.3s var(--ease-premium)',
                        }}
                        className="resp-item"
                      >
                        <span
                          style={{
                            color: 'var(--color-accent)',
                            flexShrink: 0,
                            marginTop: 3,
                            fontSize: 11,
                          }}
                        >
                          ●
                        </span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div style={{ marginBottom: 28 }}>
                  <h4
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      fontFamily: 'var(--font-heading)',
                      color: 'var(--color-primary-soft)',
                      marginBottom: 14,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <FaCode size={14} />
                    Tech Stack
                  </h4>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 8,
                    }}
                  >
                    {exp.techStack.map((tech, i) => (
                      <motion.div
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.04, duration: 0.3 }}
                        whileHover={{ y: -3, scale: 1.05 }}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          padding: '6px 14px',
                          borderRadius: 'var(--radius-pill)',
                          background: 'rgba(99,102,241,0.08)',
                          border: '1px solid rgba(99,102,241,0.2)',
                          fontSize: 13,
                          fontWeight: 500,
                          color: 'var(--color-text-dim)',
                          cursor: 'default',
                          transition: 'all 0.3s var(--ease-premium)',
                        }}
                        className="tech-badge"
                      >
                        {tech}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div style={{ marginBottom: 28 }}>
                  <h4
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      fontFamily: 'var(--font-heading)',
                      color: 'var(--color-primary-soft)',
                      marginBottom: 14,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <FaStar size={14} />
                    Project Highlights
                  </h4>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 8,
                    }}
                  >
                    {exp.highlights.map((h, i) => (
                      <motion.div
                        key={h}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05, duration: 0.3 }}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          padding: '5px 12px',
                          borderRadius: 'var(--radius-pill)',
                          background: 'rgba(6,182,212,0.08)',
                          border: '1px solid rgba(6,182,212,0.15)',
                          fontSize: 12.5,
                          fontWeight: 500,
                          color: 'var(--color-text-dim)',
                        }}
                      >
                        <FaCircleCheck size={11} style={{ color: '#22c55e' }} />
                        {h}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Metrics Grid */}
                <div>
                  <h4
                    style={{
                      fontSize: 15,
                      fontWeight: 700,
                      fontFamily: 'var(--font-heading)',
                      color: 'var(--color-primary-soft)',
                      marginBottom: 16,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <FaStar size={14} />
                    Metrics
                  </h4>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                      gap: 12,
                    }}
                    className="metrics-grid"
                  >
                    {exp.metrics.map((m, i) => (
                      <MetricItem
                        key={m.label}
                        label={m.label}
                        value={m.value}
                        suffix={m.suffix}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .exp-line {
            display: none !important;
          }
          section#experience > div > div > div {
            padding-left: 0 !important;
          }
          section#experience .liquidGlassCard > div:first-child {
            padding: 20px 16px !important;
          }
          section#experience .liquidGlassCard > div:last-child {
            padding: 16px 16px !important;
          }
          .resp-grid {
            grid-template-columns: 1fr !important;
          }
          .metrics-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .metric-item {
            padding: 12px 8px !important;
          }
        }
        @media (min-width: 641px) and (max-width: 768px) {
          .metrics-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        /* Hover effects */
        .resp-item:hover {
          background: rgba(99,102,241,0.06) !important;
          border-color: rgba(99,102,241,0.3) !important;
          transform: translateX(4px);
        }
        .tech-badge:hover {
          background: rgba(99,102,241,0.15) !important;
          border-color: rgba(99,102,241,0.4) !important;
          color: var(--color-text) !important;
          box-shadow: 0 0 20px rgba(99,102,241,0.15);
        }
        .metric-item:hover {
          background: rgba(255,255,255,0.06) !important;
          border-color: rgba(99,102,241,0.3) !important;
          transform: translateY(-2px);
          box-shadow: var(--shadow-glow-primary);
        }
      `}</style>
    </section>
  )
}