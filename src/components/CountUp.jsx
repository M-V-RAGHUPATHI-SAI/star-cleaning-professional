import { useState, useEffect, useRef } from 'react'

export default function CountUp({ end, duration = 2000, suffix = '' }) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true)
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    let startTime = null
    const endValue = parseInt(String(end).replace(/\D/g, ''))

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * endValue))
      if (progress < 1) requestAnimationFrame(animate)
      else setCount(endValue)
    }
    requestAnimationFrame(animate)
  }, [started, end, duration])

  const formatted = count >= 1000 ? count.toLocaleString() : count.toString()

  return <span ref={ref}>{formatted}{suffix}</span>
}
