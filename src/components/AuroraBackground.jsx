import { useEffect, useRef } from 'react'

export default function AuroraBackground({ children }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let t = 0

    const resize = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      t += 0.0018
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      const colours = [
        [99, 102, 241],
        [6, 182, 212],
        [168, 85, 247],
        [99, 102, 241],
      ]

      colours.forEach(([r, g, b], i) => {
        const shift = Math.sin(t * 0.4 + i * 1.2) * 80
        const shift2 = Math.cos(t * 0.35 + i * 0.9) * 60
        const cx =
          w * (0.2 + i * 0.2) +
          Math.sin(t * 0.15 + i * 1.8) * 180 +
          shift
        const cy =
          h * (i % 2 === 0 ? 0.35 : 0.7) +
          Math.cos(t * 0.12 + i * 1.2) * 100 +
          shift2
        const radius = 460 + Math.sin(t * 0.2 + i * 0.9) * 60

        const gradient = ctx.createRadialGradient(
          cx, cy, 20, cx, cy, radius
        )
        // Check for light theme to reduce intensity
        const isLight = document.documentElement.getAttribute('data-theme') === 'light'
        const intensity = isLight ? 0.15 : 0.25
        const midIntensity = isLight ? 0.06 : 0.12
        const endIntensity = isLight ? 0.01 : 0.02
        
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${intensity})`)
        gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${midIntensity})`)
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, ${endIntensity})`)
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, w, h)
      })

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'clip',
      }}
    >
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -2,
        pointerEvents: 'none',
        opacity: 0.85,
      }}
    />
      {/* Grain overlay - reduced opacity */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          pointerEvents: 'none',
          opacity: 0.015,
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }}
      />
      {children}
    </div>
  )
}