import { useCallback, useRef } from 'react'

/**
 * Tracks the cursor position over an element via CSS custom properties
 * (--spot-x / --spot-y) instead of React state, so the glow in the
 * `.spotlight` CSS class updates every frame without triggering re-renders.
 */
export function useSpotlight<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)

  const onMouseMove = useCallback((e: React.MouseEvent<T>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    ref.current?.style.setProperty('--spot-x', `${x}%`)
    ref.current?.style.setProperty('--spot-y', `${y}%`)
  }, [])

  return { ref, onMouseMove }
}
