/**
 * LiquidGlass — True Apple iOS 26 Physical Glass Primitive
 *
 * 8-layer glass stack:
 *  L1  backdrop blur (sampled background)
 *  L2  glass tint (semi-transparent fill)
 *  L3  internal ambient glow
 *  L4  edge highlight border (curved rim light)
 *  L5  top-edge inner reflection band
 *  L6  chromatic aberration fringe
 *  L7  cursor-reactive moving specular highlight
 *  L8  drop shadow + contact shadow for float depth
 */

import { memo, useRef, useState, useCallback } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

// Spring config — physical, never snappy
const SPRING = { stiffness: 180, damping: 28, mass: 1 }
const SPRING_SLOW = { stiffness: 80, damping: 20, mass: 1.2 }

export function LiquidGlass({
  children,
  className = '',
  style = {},
  contentStyle = {},
  radius = 28,
  blur = 6,
  tint = 'rgba(255,255,255,0.02)',
  tintHover = 'rgba(255,255,255,0.01)',
  glow = null,           // accent color for ambient glow e.g. '#FF8A00'
  intensity = 1,         // 0–2, scales all effects
  sheen = true,          // false → hides white light layers (L4 rim, L5 top band, L7 specular)
  as = 'div',
  onClick,
  href,
  ...rest
}) {
  const ref = useRef(null)
  const [hovered, setHovered] = useState(false)

  // Raw mouse position relative to element center (–1 to 1)
  const rawX = useRef(0)
  const rawY = useRef(0)

  // Springy mouse values
  const springX = useSpring(0, SPRING)
  const springY = useSpring(0, SPRING)
  const springXSlow = useSpring(0, SPRING_SLOW)
  const springYSlow = useSpring(0, SPRING_SLOW)
  const hoverSpring = useSpring(0, SPRING)

  const handleMouseMove = useCallback((e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    rawX.current = (e.clientX - cx) / (rect.width / 2)
    rawY.current = (e.clientY - cy) / (rect.height / 2)
    springX.set(rawX.current)
    springY.set(rawY.current)
    springXSlow.set(rawX.current)
    springYSlow.set(rawY.current)
  }, [springX, springY, springXSlow, springYSlow])

  const handleMouseEnter = useCallback(() => {
    setHovered(true)
    hoverSpring.set(1)
  }, [hoverSpring])

  const handleMouseLeave = useCallback(() => {
    setHovered(false)
    hoverSpring.set(0)
    springX.set(0)
    springY.set(0)
    springXSlow.set(0)
    springYSlow.set(0)
  }, [hoverSpring, springX, springY, springXSlow, springYSlow])

  // Specular highlight position (L7) — moves with cursor
  const specX = useTransform(springXSlow, [-1, 1], ['10%', '90%'])
  const specY = useTransform(springYSlow, [-1, 1], ['5%', '60%'])

  // Subtle tilt for 3D depth feel
  const rotateX = useTransform(springY, [-1, 1], [3 * intensity, -3 * intensity])
  const rotateY = useTransform(springX, [-1, 1], [-4 * intensity, 4 * intensity])

  // Edge rim brightness reacts to cursor angle
  const rimOpacity = useTransform(hoverSpring, [0, 1], [0.12, 0.28 * intensity])

  // Lift on hover
  const liftY = useTransform(hoverSpring, [0, 1], [0, -6 * intensity])
  const liftScale = useTransform(hoverSpring, [0, 1], [1, 1.008])

  const Tag = href ? motion.a : motion[as] || motion.div

  const extraProps = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {}

  return (
    <Tag
      ref={ref}
      className={className}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        borderRadius: radius,
        isolation: 'isolate',
        // NO overflow:hidden on the outer shell — that is what clips text
        // Glass layers are absolute+pointer-events:none and stay inside via inset:0
        rotateX,
        rotateY,
        y: liftY,
        scale: liftScale,
        cursor: onClick || href ? 'pointer' : 'default',
        ...style,
      }}
      {...extraProps}
      {...rest}
    >
      {/* ── L1: Backdrop blur — the deepest layer ── */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: radius,
          backdropFilter: `blur(${blur}px) saturate(180%) brightness(${hovered ? 1.08 : 1.04})`,
          WebkitBackdropFilter: `blur(${blur}px) saturate(180%) brightness(${hovered ? 1.08 : 1.04})`,
          transition: 'backdrop-filter 0.4s ease, -webkit-backdrop-filter 0.4s ease',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* ── L2: Glass tint ── */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: radius,
          background: hovered ? tintHover : tint,
          transition: 'background 0.35s ease',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* ── L3: Internal ambient glow (color bleeds from accent) ── */}
      {glow && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: radius,
            background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${glow}22 0%, transparent 70%)`,
            zIndex: 2,
            pointerEvents: 'none',
            opacity: hovered ? 1 : 0.6,
            transition: 'opacity 0.4s ease',
          }}
        />
      )}

      {/* ── L4: Edge highlight border (rim light) — white sheen, skippable ── */}
      {sheen && (
        <motion.div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: radius,
            border: '1px solid transparent',
            backgroundImage: `
              linear-gradient(
                ${hovered ? '145deg' : '135deg'},
                rgba(255,255,255,${hovered ? 0.35 : 0.18}) 0%,
                rgba(255,255,255,0.06) 40%,
                rgba(255,255,255,0.02) 60%,
                rgba(255,255,255,${hovered ? 0.22 : 0.10}) 100%
              )
            `,
            backgroundOrigin: 'border-box',
            WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'destination-out',
            maskComposite: 'exclude',
            zIndex: 3,
            pointerEvents: 'none',
            transition: 'background-image 0.3s ease',
          }}
        />
      )}

      {/* ── L5: Top-edge inner reflection band — white sheen, skippable ── */}
      {sheen && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: 0,
            left: '8%',
            right: '8%',
            height: 1,
            borderRadius: '50%',
            background: `linear-gradient(90deg,
              transparent 0%,
              rgba(255,255,255,${hovered ? 0.55 : 0.30}) 30%,
              rgba(255,255,255,${hovered ? 0.70 : 0.45}) 50%,
              rgba(255,255,255,${hovered ? 0.55 : 0.30}) 70%,
              transparent 100%
            )`,
            zIndex: 4,
            pointerEvents: 'none',
            transition: 'background 0.3s ease',
            filter: 'blur(0.5px)',
          }}
        />
      )}

      {/* ── L6: Chromatic aberration fringe (subtle RGB split on edges) ── */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: -1,
          borderRadius: radius + 1,
          background: 'transparent',
          boxShadow: hovered
            ? `inset 1px 0 0 rgba(255,138,0,0.30), inset -1px 0 0 rgba(255, 157, 26,0.22), inset 0 1px 0 rgba(255,157,26,0.18)`
            : `inset 1px 0 0 rgba(255,138,0,0.12), inset -1px 0 0 rgba(255,157,26,0.08)`,
          zIndex: 5,
          pointerEvents: 'none',
          transition: 'box-shadow 0.4s ease',
        }}
      />

      {/* ── L7: Cursor-reactive specular highlight — white sheen, skippable ── */}
      {sheen && (
        <motion.div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: radius,
            background: 'transparent',
            backgroundImage: `radial-gradient(ellipse 55% 40% at ${specX} ${specY}, rgba(255,255,255,${0.13 * intensity}) 0%, transparent 70%)`,
            zIndex: 6,
            pointerEvents: 'none',
            opacity: hovered ? 1 : 0.4,
            transition: 'opacity 0.3s ease',
          }}
        />
      )}

      {/* ── L8: Drop shadow + contact shadow ── */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: radius,
          boxShadow: hovered
            ? `0 24px 64px rgba(0,0,0,0.40), 0 8px 24px rgba(0,0,0,0.25), 0 2px 6px rgba(0,0,0,0.15)${glow ? `, 0 0 60px -8px ${glow}35` : ''}`
            : `0 12px 40px rgba(0,0,0,0.28), 0 4px 12px rgba(0,0,0,0.18)`,
          zIndex: 7,
          pointerEvents: 'none',
          transition: 'box-shadow 0.4s ease',
        }}
      />

      {/* ── Content — NO overflow:hidden, glass layers are all absolute+pointer-events:none ── */}
      <div
        style={{
          position: 'relative',
          zIndex: 8,
          // overflow intentionally omitted — clipping is handled per-component
          // (e.g. image thumbnails clip themselves, not the whole card)
          ...contentStyle,
        }}
      >
        {children}
      </div>
    </Tag>
  )
}

/**
 * GlassButton — orange-accented capsule button
 * variant: 'primary' | 'secondary' | 'ghost' ('accent' alias for secondary)
 */
export const GlassButton = memo(function GlassButton({
  children,
  onClick,
  href,
  variant = 'ghost',
  style = {},
  className = '',
  ...rest
}) {
  const VARIANTS = {
    primary: 'btn--primary',
    secondary: 'btn--secondary',
    accent: 'btn--secondary',
    ghost: 'btn--ghost',
  }

  const classes = `btn ${VARIANTS[variant] || VARIANTS.ghost}${className ? ` ${className}` : ''}`

  if (href) {
    return (
      <a
        href={href}
        target={rest.target ?? '_blank'}
        rel={rest.rel ?? 'noopener noreferrer'}
        onClick={onClick}
        className={classes}
        style={style}
        {...rest}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      type={rest.type ?? 'button'}
      onClick={onClick}
      className={classes}
      style={style}
      {...rest}
    >
      {children}
    </button>
  )
})

/**
 * GlassCard — Primary content card with full 8-layer glass
 */
export const GlassCard = memo(function GlassCard({ children, style = {}, radius = 28, glow = null, blur = 6, ...rest }) {
  return (
    <LiquidGlass
      radius={radius}
      blur={blur}
      tint="rgba(255,255,255,0.02)"
      tintHover="rgba(255,255,255,0.01)"
      glow={glow}
      intensity={1}
      style={style}
      {...rest}
    >
      {children}
    </LiquidGlass>
  )
})

/**
 * GlassTag — Small pill label. Pass `color` for an orange-tinted pill,
 * omit it for a neutral chip with an orange hover.
 */
export const GlassTag = memo(function GlassTag({ children, color, style = {}, className = '' }) {
  const tinted = Boolean(color)

  return (
    <span
      className={`tag${tinted ? ' tag--orange' : ''}${className ? ` ${className}` : ''}`}
      style={{
        ...(tinted ? { background: `${color}14`, borderColor: `${color}3D` } : null),
        ...style,
      }}
    >
      {children}
    </span>
  )
})
