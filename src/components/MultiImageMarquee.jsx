import { useRef, useEffect, useState } from 'react'
import { businessConfig } from '../businessConfig'

// Negative = scroll UP, positive = scroll DOWN
const SPEED = [-0.5, 0.8, -1.1, 0.6]

// Desktop heights [evenIndexHeight, oddIndexHeight] per column
const COL_HEIGHTS = [
  [280, 180],  // col 0
  [200, 320],  // col 1
  [240, 160],  // col 2
  [300, 200],  // col 3
]

export default function MultiImageMarquee() {
  const containerRef = useRef(null)
  const track0Ref = useRef(null)
  const track1Ref = useRef(null)
  const track2Ref = useRef(null)
  const track3Ref = useRef(null)

  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 1024 : false
  )

  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth < 1024)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  // Distribute marquee URLs across 4 columns, triple each to ensure loop has no gaps
  const urls = businessConfig.marqueeImages
  const rawCols = [[], [], [], []]
  urls.forEach((url, i) => rawCols[i % 4].push(url))
  const cols = rawCols.map(col => {
    const base = col.length >= 1 ? col : urls
    return [...base, ...base, ...base]
  })

  useEffect(() => {
    const trackRefs = [track0Ref, track1Ref, track2Ref, track3Ref]
    const pos = [0, 0, 0, 0]

    // DOWN-scrolling tracks start at -halfHeight
    trackRefs.forEach((ref, i) => {
      if (SPEED[i] > 0 && ref.current) {
        const half = ref.current.scrollHeight / 2
        pos[i] = -half
        ref.current.style.transform = `translateY(${pos[i]}px)`
      }
    })

    let rafId = null

    function tick() {
      trackRefs.forEach((ref, i) => {
        const track = ref.current
        if (!track) return
        const speed = SPEED[i]
        const half = track.scrollHeight / 2

        pos[i] += speed

        if (speed < 0 && pos[i] <= -half) pos[i] += half
        if (speed > 0 && pos[i] >= 0) pos[i] -= half

        track.style.transform = `translateY(${pos[i].toFixed(2)}px)`
      })
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => { if (rafId !== null) cancelAnimationFrame(rafId) }
  }, [])

  const trackRefs = [track0Ref, track1Ref, track2Ref, track3Ref]

  const getHeight = (ci, ii) => {
    const [h0, h1] = COL_HEIGHTS[ci]
    const desktop = ii % 2 === 0 ? h0 : h1
    return isMobile ? Math.round(desktop * 0.65) : desktop
  }

  return (
    <div id="products-scroll-container" ref={containerRef}>
      <div id="products-sticky">
        <div className="products-grid">
          {cols.map((images, ci) => (
            <div key={ci} className="prod-col marquee-column">
              <div className="marquee-track" ref={trackRefs[ci]}>
                {images.map((url, ii) => (
                  <div key={`a${ii}`} className="prod-cell">
                    <img
                      src={url}
                      alt=""
                      loading="lazy"
                      style={{ height: `${getHeight(ci, ii)}px`, width: '100%', objectFit: 'cover', borderRadius: '12px', display: 'block', flexShrink: 0 }}
                      onError={e => { e.target.style.display = 'none' }}
                    />
                  </div>
                ))}
                {images.map((url, ii) => (
                  <div key={`b${ii}`} className="prod-cell" aria-hidden="true">
                    <img
                      src={url}
                      alt=""
                      loading="lazy"
                      style={{ height: `${getHeight(ci, ii)}px`, width: '100%', objectFit: 'cover', borderRadius: '12px', display: 'block', flexShrink: 0 }}
                      onError={e => { e.target.style.display = 'none' }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
