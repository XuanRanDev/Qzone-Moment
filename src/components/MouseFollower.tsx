import { useEffect, useRef, useState } from 'react'

export default function MouseFollower() {
  const [isVisible, setIsVisible] = useState(false)
  const trailRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Purely a desktop cursor decoration (hidden via CSS below `md`) — on
    // touch devices there's no mousemove to drive it, so skip the rAF loop
    // and listeners entirely rather than spinning them for nothing.
    if (window.matchMedia('(pointer: coarse)').matches) return

    let animId: number
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX
      targetY = e.clientY
      if (!isVisible) setIsVisible(true)
    }

    const onMouseLeave = () => setIsVisible(false)
    const onMouseEnter = () => setIsVisible(true)

    const animate = () => {
      currentX += (targetX - currentX) * 0.15
      currentY += (targetY - currentY) * 0.15

      if (trailRef.current) {
        trailRef.current.style.transform = `translate(${currentX - 20}px, ${currentY - 20}px)`
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${currentX - 150}px, ${currentY - 150}px)`
      }

      animId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)
    animate()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
    }
  }, [isVisible])

  return (
    <>
      <div
        ref={trailRef}
        className="fixed top-0 left-0 w-10 h-10 pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        style={{
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.3s',
        }}
      >
        <div className="w-full h-full rounded-full border-2 border-brand-500 dark:border-white/60 transition-transform duration-100" />
      </div>
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-[300px] h-[300px] pointer-events-none z-[9998] hidden md:block"
        style={{
          opacity: isVisible ? 0.15 : 0,
          transition: 'opacity 0.5s',
          background: 'radial-gradient(circle, rgba(99,102,241,0.4) 0%, transparent 70%)',
        }}
      />
    </>
  )
}
