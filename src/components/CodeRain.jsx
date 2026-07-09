import { useEffect, useRef, useCallback } from 'react'

// English programming characters mix
const CHARS = [
  // HTML tags
  '<div>', '</div>', '<span>', '<br/>', '<hr/>', '<nav>', '<img>', '<a>', '<p>', '<h1>', '<h2>', '<h3>', '<ul>', '<li>', '<section>', '<main>', '<footer>', '<header>', '<form>', '<input>', '<button>', '<label>', '<meta>', '<link>', '<script>', '<style>',
  // JavaScript keywords
  'function()', 'const', 'let', 'var', 'return', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'try', 'catch', 'finally', 'throw', 'new', 'this', 'typeof', 'instanceof', 'class', 'extends', 'import', 'export', 'default', 'async', 'await', 'yield', 'null', 'undefined', 'true', 'false', 'NaN',
  // React snippets
  'React', 'useState', 'useEffect', 'useRef', 'useCallback', 'useMemo', 'useContext', 'useReducer', 'createContext', 'Fragment', 'component', 'props', 'state', 'setState', 'render', 'className', 'onClick', 'onChange', 'onSubmit', 'key', 'children', 'return()',
  // Node.js keywords
  'Node', 'require', 'module.exports', 'process', '__dirname', '__filename', 'global', 'Buffer', 'setTimeout', 'setInterval', 'console.log', 'fs.readFile', 'path.join', 'http.createServer', 'express', 'app.get', 'app.post', 'app.listen',
  // MongoDB keywords
  'MongoDB', 'mongoose', 'Schema', 'model', 'find()', 'findById()', 'findOne()', 'create()', 'save()', 'updateOne()', 'deleteOne()', 'aggregate', 'populate', 'sort()', 'limit()', 'skip()',
  // CSS symbols
  '#id', '.class', 'px', 'rem', 'em', 'vw', 'vh', '%', 'flex', 'grid', 'auto', 'none', 'block', 'inline', 'absolute', 'relative', 'fixed', 'sticky', 'padding', 'margin', 'border', 'display:', 'position:', 'color:', 'background:', 'font-size:', 'z-index:', 'opacity:', 'transform:',
  // API & other
  'API', 'GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'JSON', 'async', 'fetch()', 'then()', 'catch()', 'promise', 'callback',
  // Symbols & operators
  '=>', '===', '!==', '<=', '>=', '&&', '||', '++', '--', '+=', '-=', '*=', '/=', '%', '&', '|', '^', '~', '?', ':',
  // Brackets
  '{}', '[]', '()', '<>', '${}',
  // Numbers
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
]

function CodeRain() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const dropsRef = useRef([])
  const particlesRef = useRef([])
  const ripplesRef = useRef([])
  const frameRef = useRef(null)
  const lastTimeRef = useRef(0)
  const fpsIntervalRef = useRef(1000 / 60)

  const getRandomChar = useCallback(() => {
    return CHARS[Math.floor(Math.random() * CHARS.length)]
  }, [])

  const getRandomColor = useCallback(() => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light'
    
    // Dark mode colors (liquid glass - subtle, translucent)
    const darkColors = [
      { r: 220, g: 230, b: 255 },   // light blue-white
      { r: 190, g: 200, b: 255 },   // soft blue
      { r: 170, g: 190, b: 255 },   // pale blue
      { r: 200, g: 180, b: 255 },   // lavender
    ]
    
    // Light mode colors (liquid glass - subtle, translucent)
    const lightColors = [
      { r: 40, g: 50, b: 80 },   // dark blue-gray
      { r: 50, g: 60, b: 95 },   // muted blue
      { r: 60, g: 70, b: 100 },  // slate blue
      { r: 45, g: 55, b: 85 },   // dark slate
    ]
    
    const colors = isLight ? lightColors : darkColors
    return colors[Math.floor(Math.random() * colors.length)]
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    // Track mouse for ripple effect
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 }
    }
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)

    let animationId = null
    let fontSize = 12
    let columns = 0
    let drops = []
    let particles = []
    let ripples = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      fontSize = Math.max(10, Math.min(16, canvas.width / 70))
      columns = Math.floor(canvas.width / (fontSize * 1.1))

      // Reset drops array with new size
      const newDrops = []
      for (let i = 0; i < columns; i++) {
        newDrops[i] = drops[i] !== undefined
          ? drops[i]
          : {
              y: Math.random() * -canvas.height / fontSize,
              speed: 0.3 + Math.random() * 0.7,
              char: getRandomChar(),
              color: getRandomColor(),
              brightness: 0.3 + Math.random() * 0.7,
              isBright: Math.random() > 0.95,
              glowSize: Math.random() > 0.9 ? 8 : 0,
            }
      }
      drops = newDrops
    }

    resize()
    window.addEventListener('resize', resize)

    // Tab visibility tracking
    let isTabVisible = true
    const handleVisibility = () => {
      isTabVisible = !document.hidden
      if (!isTabVisible && animationId) {
        cancelAnimationFrame(animationId)
        animationId = null
      } else if (isTabVisible) {
        lastTimeRef.current = performance.now()
        animationId = requestAnimationFrame(draw)
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)

    // Theme change listener - reinitialize drops with new colors
    const handleThemeChange = () => {
      for (let i = 0; i < drops.length; i++) {
        drops[i].color = getRandomColor()
      }
    }
    const themeObserver = new MutationObserver(handleThemeChange)
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    })

    // Generate random particles - reduced count
    const spawnParticle = () => {
      if (particles.length < 8) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: 1 + Math.random() * 1.5,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: -0.2 - Math.random() * 0.3,
          life: 1,
          decay: 0.005 + Math.random() * 0.008,
          color: getRandomColor(),
        })
      }
    }

    // Generate ripple at mouse position - reduced
    const spawnRipple = (x, y) => {
      if (ripples.length < 3) {
        ripples.push({
          x,
          y,
          radius: 5,
          maxRadius: 40 + Math.random() * 20,
          life: 1,
          color: getRandomColor(),
        })
      }
    }

    let frameCount = 0
    let particleTimer = 0

    const getTrailColor = () => {
      const isLight = document.documentElement.getAttribute('data-theme') === 'light'
      return isLight ? 'rgba(248, 249, 252, 0.008)' : 'rgba(11, 15, 25, 0.008)'
    }

    const draw = (timestamp) => {
      if (!isTabVisible) return

      // FPS control
      const elapsed = timestamp - lastTimeRef.current
      if (elapsed < fpsIntervalRef.current) {
        animationId = requestAnimationFrame(draw)
        return
      }
      lastTimeRef.current = timestamp

      const w = canvas.width
      const h = canvas.height

      // Clear canvas completely - no persistent artifacts
      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'source-over'

      frameCount++

      // Spawn particles occasionally
      particleTimer++
      if (particleTimer > 15) {
        spawnParticle()
        particleTimer = 0
      }

      // Mouse ripple - check if mouse is on canvas
      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      if (mx > 0 && my > 0 && mx < w && my < h && frameCount % 8 === 0) {
        spawnRipple(mx + (Math.random() - 0.5) * 30, my + (Math.random() - 0.5) * 30)
      }

      // Draw and update particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.speedX
        p.y += p.speedY
        p.life -= p.decay

        if (p.life <= 0) {
          particles.splice(i, 1)
          continue
        }

        const alpha = p.life * 0.8
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha})`
        ctx.fill()

        // Subtle glow for liquid glass effect
        if (p.size > 1.5) {
          ctx.shadowBlur = 4
          ctx.shadowColor = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha * 0.15})`
          ctx.fill()
        }
      }
      // Reset shadow after all particles
      ctx.shadowBlur = 0

      // Draw and update ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i]
        r.radius += 1.5
        r.life -= 0.015

        if (r.life <= 0 || r.radius > r.maxRadius) {
          ripples.splice(i, 1)
          continue
        }

        const alpha = r.life * 0.15
        ctx.beginPath()
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(${r.color.r}, ${r.color.g}, ${r.color.b}, ${alpha})`
        ctx.lineWidth = 1.5 - (r.radius / r.maxRadius) * 1.2
        ctx.stroke()

        // Inner glow
        if (r.radius < r.maxRadius * 0.3) {
          ctx.beginPath()
          ctx.arc(r.x, r.y, r.radius * 0.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${r.color.r}, ${r.color.g}, ${r.color.b}, ${alpha * 0.3})`
          ctx.fill()
        }
      }
      // Reset shadow after all ripples
      ctx.shadowBlur = 0

      // Draw code rain drops
      ctx.font = `${fontSize}px "JetBrains Mono", monospace`
      ctx.textAlign = 'center'

      for (let i = 0; i < drops.length; i++) {
        const drop = drops[i]
        const x = i * fontSize * 1.1 + fontSize * 0.5
        const y = drop.y * fontSize

        // Set color based on drop properties (reduced by 80%)
        const baseAlpha = drop.isBright ? 0.08 : 0.02
        const alpha = baseAlpha * drop.brightness

        // Glow effect for bright drops
        if (drop.isBright && drop.glowSize > 0) {
          ctx.shadowBlur = drop.glowSize
          ctx.shadowColor = `rgba(${drop.color.r}, ${drop.color.g}, ${drop.color.b}, 0.2)`
        }

        ctx.fillStyle = `rgba(${drop.color.r}, ${drop.color.g}, ${drop.color.b}, ${alpha})`
        ctx.fillText(drop.char, x, y)

        // Reset shadow
        ctx.shadowBlur = 0

        // Move drop
        drop.y += drop.speed

        // Reset when reaching bottom
        if (y > h + fontSize * 2) {
          drops[i] = {
            y: -Math.random() * h / fontSize,
            speed: 0.3 + Math.random() * 0.7,
            char: getRandomChar(),
            color: getRandomColor(),
            brightness: 0.3 + Math.random() * 0.7,
            isBright: Math.random() > 0.95,
            glowSize: Math.random() > 0.9 ? 8 : 0,
          }
        }

        // Occasionally change character mid-fall
        if (Math.random() > 0.998) {
          drops[i].char = getRandomChar()
        }
      }

      animationId = requestAnimationFrame(draw)
    }

    // Start animation
    lastTimeRef.current = performance.now()
    animationId = requestAnimationFrame(draw)

    // Cleanup
    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('visibilitychange', handleVisibility)
      if (animationId) cancelAnimationFrame(animationId)
      themeObserver.disconnect()
    }
  }, [getRandomChar, getRandomColor])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 1,
        animation: 'codeRainFadeIn 2s ease-in-out',
      }}
    />
  )
}

export default CodeRain