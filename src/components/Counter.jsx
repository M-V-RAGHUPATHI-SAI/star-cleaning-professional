import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

// Animates a number from 0 to `value` when scrolled into view.
// `value` may be like "2400", "4.9", "5". Renders prefix/suffix around it.
export default function Counter({ value, suffix = '', prefix = '', duration = 1800, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [display, setDisplay] = useState('0')

  const target = parseFloat(String(value).replace(/[^\d.]/g, '')) || 0
  const decimals = String(value).includes('.') ? 1 : 0

  useEffect(() => {
    if (!inView) return
    let raf
    const start = performance.now()
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3) // easeOutCubic
      setDisplay((eased * target).toFixed(decimals))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setDisplay(target.toFixed(decimals))
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, decimals, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  )
}
