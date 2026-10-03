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
  hidden: { y: 50 },
  visible: (i = 0) => ({
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
        padding: '12px 10px',
        borderRadius: 'var(--radius-md)',
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid var(--color-border)',
        transition: 'all 0.3s var(--ease-premium)',
      }}
      className="metric-item"
    >
      <div
        style={{
          fontSize: 'clamp(20px, 2.2vw, 26px)',
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
          fontSize: 11,
          color: 'var(--color-text)',
          fontWeight: 600,
          marginTop: 4,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
          textShadow: '0 1px 2px rgba(0,0,0,0.40), 0 0 8px rgba(0,0,0,0.25)',
        }}
      >
        {label}
      </div>
    </div>
  )
}

export default function Experience() {
  const [showAllResp, setShowAllResp] = useState(false)
  const exp = EXPERIENCE[0]
  if (!exp) return null

  const RESP_COLLAPSED_COUNT = 5
  const visibleResp = showAllResp
    ? exp.responsibilities
    : exp.responsibilities.slice(0, RESP_COLLAPSED_COUNT)
  const hiddenRespCount = exp.responsibilities.length - RESP_COLLAPSED_COUNT

  return (
    <section id="experience" className="section">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={fadeUp}
          className="section-head"
        >
          <span className="section-label">Experience</span>
          <h2 className="section-title">
            Professional Experience &amp; <span className="text-orange">Client Work</span>
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
                'linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.06) 70%, transparent)',
              opacity: 1,
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
                top: 22,
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
                  background: 'var(--color-primary)',
                  boxShadow: '0 0 12px rgba(255,138,0,0.55)',
                }}
              />
            </div>

            {/* Glass Card */}
            <div className="liquidGlassCard" style={{ padding: 0, overflow: 'hidden' }}>
              {/* Card Header with gradient accent */}
              <div
                style={{
                  padding: '18px 22px 14px',
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
                    background: 'rgba(255, 138, 0,0.12)',
                    border: '1px solid rgba(255, 138, 0,0.25)',
                    color: '#FF9D1A',
                    fontSize: 12,
                    fontWeight: 600,
                    marginBottom: 10,
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
                    size={18}
                    style={{ color: 'var(--color-primary-soft)', flexShrink: 0 }}
                  />
                  <h3
                    style={{
                      fontSize: 19,
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
                    marginBottom: 8,
                    flexWrap: 'wrap',
                  }}
                >
                  <FaUserTie
                    size={14}
                    style={{ color: 'var(--color-text-dimmer)', flexShrink: 0 }}
                  />
                  <span
                    style={{
                      fontSize: 14,
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
                    gap: 16,
                    fontSize: 12.5,
                    color: 'var(--color-text)',
                    textShadow: '0 1px 2px rgba(0,0,0,0.40), 0 0 8px rgba(0,0,0,0.25)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <FaCalendar size={12} style={{ color: 'var(--color-text)' }} />
                    {exp.duration}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <FaClock size={12} style={{ color: 'var(--color-text)' }} />
                    {exp.employmentType}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: '16px 22px 18px' }}>
                {/* Description */}
                <p
                  style={{
                    fontSize: 13.5,
                    lineHeight: 1.7,
                    color: 'var(--color-text)',
                    marginBottom: 18,
                    textShadow: '0 1px 2px rgba(0,0,0,0.40), 0 0 8px rgba(0,0,0,0.25)',
                  }}
                >
                  {exp.description}
                </p>

                {/* Responsibilities */}
                <div style={{ marginBottom: 18 }}>
                  <h4
                    style={{
                      fontSize: 13.5,
                      fontWeight: 700,
                      fontFamily: 'var(--font-heading)',
                      color: 'var(--color-primary-soft)',
                      marginBottom: 10,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <FaStar size={13} />
                    Responsibilities
                  </h4>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                      gap: 6,
                    }}
                    className="resp-grid"
                  >
                    {visibleResp.map((item, i) => (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 8,
                          padding: '7px 11px',
                          borderRadius: 'var(--radius-sm)',
                          background: 'rgba(255,255,255,0.02)',
                          border: '1px solid var(--glass-border)',
                          fontSize: 12.5,
                          color: 'var(--color-text)',
                          lineHeight: 1.5,
                          transition: 'all 0.3s var(--ease-premium)',
                          textShadow: '0 1px 2px rgba(0,0,0,0.40), 0 0 8px rgba(0,0,0,0.25)',
                        }}
                        className="resp-item"
                      >
                        <span
                          style={{
                            color: 'var(--color-accent)',
                            flexShrink: 0,
                            marginTop: 3,
                            fontSize: 9,
                          }}
                        >
                          ●
                        </span>
                        {item}
                      </div>
                    ))}
                  </div>
                  {hiddenRespCount > 0 && (
                    <button
                      type="button"
                      onClick={() => setShowAllResp((v) => !v)}
                      className="exp-toggle"
                    >
                      {showAllResp
                        ? 'Show less'
                        : `Show all ${exp.responsibilities.length} responsibilities`}
                      <FaArrowRight
                        size={11}
                        style={{
                          transform: showAllResp ? 'rotate(-90deg)' : 'rotate(90deg)',
                          transition: 'transform 0.3s var(--ease-premium)',
                        }}
                      />
                    </button>
                  )}
                </div>

                {/* Tech Stack */}
                <div style={{ marginBottom: 18 }}>
                  <h4
                    style={{
                      fontSize: 13.5,
                      fontWeight: 700,
                      fontFamily: 'var(--font-heading)',
                      color: 'var(--color-primary-soft)',
                      marginBottom: 10,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <FaCode size={13} />
                    Tech Stack
                  </h4>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 6,
                    }}
                  >
                    {exp.techStack.map((tech, i) => (
                      <motion.div
                        key={tech}
                        initial={{ scale: 0.8 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.04, duration: 0.3 }}
                        whileHover={{ y: -3, scale: 1.05 }}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          padding: '5px 12px',
                          borderRadius: 'var(--radius-pill)',
                          background: 'rgba(21, 23, 25, 0.80)',
                          border: '1px solid rgba(255, 255, 255, 0.20)',
                          fontSize: 12,
                          fontWeight: 600,
                          color: 'var(--color-text)',
                          cursor: 'default',
                          transition: 'all 0.3s var(--ease-premium)',
                          textShadow: '0 1px 2px rgba(0,0,0,0.40), 0 0 8px rgba(0,0,0,0.25)',
                        }}
                        className="tech-badge"
                      >
                        {tech}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div style={{ marginBottom: 18 }}>
                  <h4
                    style={{
                      fontSize: 13.5,
                      fontWeight: 700,
                      fontFamily: 'var(--font-heading)',
                      color: 'var(--color-primary-soft)',
                      marginBottom: 10,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <FaStar size={13} />
                    Project Highlights
                  </h4>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 6,
                    }}
                  >
                    {exp.highlights.map((h, i) => (
                      <motion.div
                        key={h}
                        initial={{ x: -10 }}
                        whileInView={{ x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05, duration: 0.3 }}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          padding: '4px 11px',
                          borderRadius: 'var(--radius-pill)',
                          background: 'rgba(255,255,255,0.035)',
                          border: '1px solid rgba(255,255,255,0.09)',
                          fontSize: 12,
                          fontWeight: 600,
                          color: 'var(--color-text)',
                          textShadow: '0 1px 2px rgba(0,0,0,0.40), 0 0 8px rgba(0,0,0,0.25)',
                        }}
                      >
                        <FaCircleCheck size={11} style={{ color: '#FF9D1A' }} />
                        {h}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Metrics Grid */}
                <div>
                  <h4
                    style={{
                      fontSize: 13.5,
                      fontWeight: 700,
                      fontFamily: 'var(--font-heading)',
                      color: 'var(--color-primary-soft)',
                      marginBottom: 12,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    <FaStar size={13} />
                    Metrics
                  </h4>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                      gap: 10,
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
            padding: 16px 14px !important;
          }
          section#experience .liquidGlassCard > div:last-child {
            padding: 14px 14px !important;
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
          background: rgba(255, 255, 255,0.06) !important;
          border-color: rgba(255,138,0,0.35) !important;
          transform: translateX(4px);
        }
        .tech-badge:hover {
          background: rgba(255,138,0,0.10) !important;
          border-color: rgba(255,138,0,0.45) !important;
          color: var(--color-text) !important;
          box-shadow: 0 0 20px rgba(255,138,0,0.18);
        }
        .metric-item:hover {
          background: rgba(255,255,255,0.05) !important;
          border-color: rgba(255,138,0,0.35) !important;
          transform: translateY(-2px);
          box-shadow: var(--shadow-glow-primary);
        }
        .exp-toggle {
          margin-top: 10px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 14px;
          border-radius: var(--radius-pill);
          background: rgba(255,138,0,0.08);
          border: 1px solid rgba(255,138,0,0.28);
          color: var(--color-primary-soft);
          font-size: 12px;
          font-weight: 600;
          font-family: var(--font-heading);
          cursor: pointer;
          transition: all 0.3s var(--ease-premium);
        }
        .exp-toggle:hover {
          background: rgba(255,138,0,0.16);
          border-color: rgba(255,138,0,0.50);
          box-shadow: 0 0 20px rgba(255,138,0,0.16);
          transform: translateY(-1px);
        }
      `}</style>
    </section>
  )
}