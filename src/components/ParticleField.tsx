import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  baseOpacity: number
  hue: number
  depth: number
  twinklePhase: number
  twinkleSpeed: number
}

interface Comet {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  hue: number
}

const HUES = [225, 260, 190, 320]

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // On phones, skip the expensive O(n^2) connecting-line / shadowBlur /
    // comet work below — this canvas redraws every frame and competes with
    // scroll compositing, which is the main source of mobile jank here.
    const isLite = window.matchMedia('(pointer: coarse), (max-width: 768px)').matches

    let animId: number
    let particles: Particle[] = []
    let comets: Comet[] = []
    let time = 0
    let nextCometAt = 60 + Math.random() * 90
    const mouse = { x: -1000, y: -1000 }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const createParticles = () => {
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 7000), isLite ? 70 : 200)
      particles = Array.from({ length: count }, () => {
        const depth = Math.random()
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * (0.35 + depth * 0.75),
          vy: (Math.random() - 0.5) * (0.35 + depth * 0.75),
          size: 0.8 + depth * 2.6,
          baseOpacity: 0.35 + depth * 0.6,
          hue: HUES[Math.floor(Math.random() * HUES.length)] + (Math.random() - 0.5) * 20,
          depth,
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.02 + Math.random() * 0.03,
        }
      })
    }
    createParticles()

    const spawnComet = () => {
      const fromLeft = Math.random() > 0.5
      const y = Math.random() * canvas.height * 0.6
      comets.push({
        x: fromLeft ? -50 : canvas.width + 50,
        y,
        vx: (fromLeft ? 1 : -1) * (6 + Math.random() * 4),
        vy: 1.5 + Math.random() * 2,
        life: 0,
        maxLife: 60 + Math.random() * 20,
        hue: HUES[Math.floor(Math.random() * HUES.length)],
      })
    }

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    window.addEventListener('mousemove', onMouseMove)

    const animate = () => {
      time++
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (!isLite && time >= nextCometAt) {
        spawnComet()
        nextCometAt = time + 90 + Math.random() * 150
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 150) {
          const force = (150 - dist) / 150
          p.vx -= (dx / dist) * force * 0.02
          p.vy -= (dy / dist) * force * 0.02
        }

        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        p.vx *= 0.999
        p.vy *= 0.999

        const twinkle = 0.5 + 0.5 * Math.sin(time * p.twinkleSpeed + p.twinklePhase)
        const opacity = p.baseOpacity * (0.5 + twinkle * 0.5)

        ctx.beginPath()
        if (!isLite && p.depth > 0.6) {
          ctx.shadowBlur = 8 * p.depth
          ctx.shadowColor = `hsla(${p.hue}, 85%, 65%, ${opacity})`
        } else {
          ctx.shadowBlur = 0
        }
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 85%, 70%, ${opacity})`
        ctx.fill()
        ctx.shadowBlur = 0

        if (!isLite) {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j]
            const ddx = p.x - p2.x
            const ddy = p.y - p2.y
            const dd = Math.sqrt(ddx * ddx + ddy * ddy)

            if (dd < 120) {
              const lineOpacity = 0.22 * (1 - dd / 120) * ((p.depth + p2.depth) / 2)
              const gradient = ctx.createLinearGradient(p.x, p.y, p2.x, p2.y)
              gradient.addColorStop(0, `hsla(${p.hue}, 80%, 65%, ${lineOpacity})`)
              gradient.addColorStop(1, `hsla(${p2.hue}, 80%, 65%, ${lineOpacity})`)
              ctx.beginPath()
              ctx.moveTo(p.x, p.y)
              ctx.lineTo(p2.x, p2.y)
              ctx.strokeStyle = gradient
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          }
        }
      }

      comets = comets.filter((c) => c.life < c.maxLife)
      for (const c of comets) {
        c.life++
        c.x += c.vx
        c.y += c.vy

        const fade = 1 - c.life / c.maxLife
        const tailLen = 14
        const tailX = c.x - c.vx * tailLen
        const tailY = c.y - c.vy * tailLen

        const gradient = ctx.createLinearGradient(c.x, c.y, tailX, tailY)
        gradient.addColorStop(0, `hsla(${c.hue}, 90%, 80%, ${0.9 * fade})`)
        gradient.addColorStop(1, `hsla(${c.hue}, 90%, 80%, 0)`)

        ctx.beginPath()
        ctx.moveTo(c.x, c.y)
        ctx.lineTo(tailX, tailY)
        ctx.strokeStyle = gradient
        ctx.lineWidth = 1.5
        ctx.lineCap = 'round'
        ctx.stroke()

        ctx.beginPath()
        ctx.shadowBlur = 10
        ctx.shadowColor = `hsla(${c.hue}, 90%, 80%, ${fade})`
        ctx.arc(c.x, c.y, 1.4, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${c.hue}, 90%, 85%, ${fade})`
        ctx.fill()
        ctx.shadowBlur = 0
      }

      animId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full dark:opacity-100 opacity-60"
    />
  )
}
