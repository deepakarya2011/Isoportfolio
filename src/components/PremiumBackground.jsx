import { useEffect, useRef } from 'react'

export default function PremiumBackground() {
  const canvasRef = useRef(null)

  // Glass bubbles — generate once, stable references
  const bubblesRef = useRef(null)
  if (!bubblesRef.current) {
    bubblesRef.current = Array.from({ length: 9 }, (_, i) => ({
      id: i,
      size: 24 + Math.random() * 96,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 28 + Math.random() * 22,
      delay: -Math.random() * 35,
      opacity: 0.02 + Math.random() * 0.04,
      blur: 8 + Math.random() * 14,
      scale: 0.6 + Math.random() * 0.8,
    }))
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let width, height
    let nodes = []
    let stars = []
    let lastStarTime = 0
    const mouse = { x: -9999, y: -9999 }
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const COLORS = [
      [99, 102, 241],
      [6, 182, 212],
      [168, 85, 247],
    ]

    const resize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      initNodes()
    }

    const initNodes = () => {
      const count = Math.min(45, Math.max(20, Math.floor((width * height) / 35000)))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        r: 1 + Math.random() * 1.2,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        phase: Math.random() * Math.PI * 2,
      }))
    }

    const spawnStar = () => {
      const fromLeft = Math.random() > 0.5
      const y = Math.random() * height * 0.35
      const speed = 7 + Math.random() * 5
      const angle = fromLeft
        ? -Math.PI / 4 + (Math.random() - 0.5) * 0.25
        : -Math.PI * 3 / 4 + (Math.random() - 0.5) * 0.25
      stars.push({
        x: fromLeft ? -20 : width + 20,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        decay: 0.012 + Math.random() * 0.008,
      })
    }

    const draw = (time) => {
      ctx.clearRect(0, 0, width, height)

      // Neural Network
      nodes.forEach((node) => {
        node.x += node.vx
        node.y += node.vy

        // Mouse attraction
        const dx = mouse.x - node.x
        const dy = mouse.y - node.y
        const dist = Math.hypot(dx, dy)
        if (dist < 180 && dist > 0.1) {
          const force = (180 - dist) / 180 * 0.015
          node.x += dx * force
          node.y += dy * force
        }

        // Wrap around
        if (node.x < -20) node.x = width + 20
        if (node.x > width + 20) node.x = -20
        if (node.y < -20) node.y = height + 20
        if (node.y > height + 20) node.y = -20
      })

      // Connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.hypot(dx, dy)
          if (dist < 150) {
            const pulse = 0.5 + 0.5 * Math.sin(time * 0.001 + a.phase + b.phase)
            const alpha = (1 - dist / 150) * 0.06 * (0.4 + 0.6 * pulse)
            const [r, g, bl] = a.color
            ctx.strokeStyle = `rgba(${r},${g},${bl},${alpha})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // Nodes with glow
      nodes.forEach((node) => {
        const [r, g, bl] = node.color
        const glow = 0.6 + 0.4 * Math.sin(time * 0.002 + node.phase)

        // Glow
        const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.r * 4)
        grad.addColorStop(0, `rgba(${r},${g},${bl},${0.04 * glow})`)
        grad.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.r * 4, 0, Math.PI * 2)
        ctx.fill()

        // Core
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r},${g},${bl},${0.06 * glow})`
        ctx.fill()
      })

      // Shooting Stars
      for (let i = stars.length - 1; i >= 0; i--) {
        const s = stars[i]
        s.x += s.vx
        s.y += s.vy
        s.life -= s.decay

        if (s.life <= 0) {
          stars.splice(i, 1)
          continue
        }

        const trailLen = 12
        const tx = s.x - s.vx * trailLen
        const ty = s.y - s.vy * trailLen

        const grad = ctx.createLinearGradient(s.x, s.y, tx, ty)
        grad.addColorStop(0, `rgba(220,235,255,${s.life * 0.5})`)
        grad.addColorStop(1, 'rgba(220,235,255,0)')

        ctx.strokeStyle = grad
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(s.x, s.y)
        ctx.lineTo(tx, ty)
        ctx.stroke()

        // Head
        ctx.beginPath()
        ctx.arc(s.x, s.y, 1.2, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(220,235,255,${s.life * 0.6})`
        ctx.fill()
      }

      // Spawn stars
      if (!reducedMotion && time - lastStarTime > 5000 + Math.random() * 7000 && stars.length < 2) {
        spawnStar()
        lastStarTime = time
      }

      animId = requestAnimationFrame(draw)
    }

    const handleMouseMove = (e) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const handleMouseLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseleave', handleMouseLeave)

    if (!reducedMotion) {
      animId = requestAnimationFrame(draw)
    }

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <>
      {/* Neural network + shooting stars canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -3,
          pointerEvents: 'none',
        }}
      />

      {/* Glass bubbles */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -2,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        {bubblesRef.current.map((b) => (
          <div
            key={b.id}
            className="premium-bubble"
            style={{
              left: `${b.left}%`,
              top: `${b.top}%`,
              width: b.size,
              height: b.size,
              opacity: b.opacity,
              backdropFilter: `blur(${b.blur}px)`,
              WebkitBackdropFilter: `blur(${b.blur}px)`,
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
              '--bubble-scale': b.scale,
            }}
          >
            <div className="premium-bubble-shine" />
          </div>
        ))}
      </div>

      <style>{`
        .premium-bubble {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 25%, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 40%, transparent 70%);
          border: 1px solid rgba(255,255,255,0.06);
          box-shadow:
            inset 0 1px 2px rgba(255,255,255,0.08),
            inset -2px -3px 8px rgba(0,0,0,0.04),
            0 4px 20px rgba(0,0,0,0.04);
          animation: premiumBubbleFloat ease-in-out infinite alternate;
          will-change: transform;
        }
        .premium-bubble-shine {
          position: absolute;
          top: 12%;
          left: 18%;
          width: 35%;
          height: 22%;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 100%);
          transform: rotate(-25deg);
          animation: premiumBubbleShine 10s ease-in-out infinite;
        }
        @keyframes premiumBubbleFloat {
          0%   { transform: translate(0, 0) scale(var(--bubble-scale, 1)) rotate(0deg); }
          25%  { transform: translate(15px, -25px) scale(var(--bubble-scale, 1)) rotate(1.5deg); }
          50%  { transform: translate(-12px, -45px) scale(var(--bubble-scale, 1)) rotate(-1.5deg); }
          75%  { transform: translate(8px, -15px) scale(var(--bubble-scale, 1)) rotate(1deg); }
          100% { transform: translate(-18px, -55px) scale(var(--bubble-scale, 1)) rotate(-1deg); }
        }
        @keyframes premiumBubbleShine {
          0%, 100% { opacity: 0.4; transform: translate(0, 0) rotate(-25deg); }
          50%      { opacity: 0.8; transform: translate(5px, 3px) rotate(-20deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .premium-bubble { animation: none !important; }
          .premium-bubble-shine { animation: none !important; }
        }
      `}</style>
    </>
  )
}
