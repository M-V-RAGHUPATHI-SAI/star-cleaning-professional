import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const SQRT_5000 = Math.sqrt(5000)

const C = {
  primary:    'var(--color-primary)',
  primaryHov: 'var(--color-primaryDark)',
  nearBlack:  'var(--color-dark)',
  border:     'var(--color-border)',
  white:      'var(--color-white)',
  muted:      'var(--color-muted)',
  cream:      'var(--color-cream)',
}

function InitialAvatar({ name, isCenter }) {
  const initial = (name || '?').trim()[0].toUpperCase()
  return (
    <div
      className="mb-4"
      style={{
        width: 44, height: 44, borderRadius: '50%',
        background: isCenter ? 'rgba(255,255,255,0.15)' : '#E8F1EE',
        color: isCenter ? C.white : C.primary,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
        fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '18px',
        textTransform: 'uppercase',
      }}
    >
      {initial}
    </div>
  )
}

function TestimonialCard({ position, testimonial, handleMove, cardSize }) {
  const isCenter     = position === 0
  const reviewerName = (testimonial.by || '').split(',')[0]

  return (
    <div
      onClick={() => handleMove(position)}
      className="absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 transition-all duration-500 ease-in-out"
      style={{
        width:       cardSize,
        height:      cardSize,
        zIndex:      isCenter ? 10 : 0,
        background:  isCenter ? C.primary : C.white,
        borderColor: isCenter ? C.primary : C.border,
        color:       isCenter ? C.white   : C.nearBlack,
        clipPath:    `polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)`,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? `0px 8px 0px 4px ${C.border}` : '0px 0px 0px 0px transparent',
      }}
    >
      <span
        className="absolute block origin-top-right rotate-45"
        style={{ right: -2, top: 48, width: SQRT_5000, height: 2, background: C.border }}
      />

      <InitialAvatar name={reviewerName} isCenter={isCenter} />

      <h3
        className="text-base sm:text-xl font-medium"
        style={{ color: isCenter ? C.white : C.nearBlack }}
      >
        &ldquo;{testimonial.testimonial}&rdquo;
      </h3>

      <p
        className="absolute bottom-8 left-8 right-8 mt-2 text-sm italic"
        style={{ color: isCenter ? 'rgba(255,255,255,0.8)' : C.muted }}
      >
        — {testimonial.by}
      </p>
    </div>
  )
}

export function StaggerTestimonials({ testimonials }) {
  const [cardSize,        setCardSize]        = useState(365)
  const [containerHeight, setContainerHeight] = useState(525)
  const [testimonialsList, setTestimonialsList] = useState(() =>
    testimonials.map((t, i) => ({ ...t, tempId: i }))
  )

  const handleMove = (steps) => {
    const newList = [...testimonialsList]
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift()
        if (!item) return
        newList.push({ ...item, tempId: Math.random() })
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop()
        if (!item) return
        newList.unshift({ ...item, tempId: Math.random() })
      }
    }
    setTestimonialsList(newList)
  }

  useEffect(() => {
    const update = () => {
      const isMd = window.matchMedia('(min-width: 640px)').matches
      const size = isMd ? 365 : 290
      setCardSize(size)
      setContainerHeight(size + (isMd ? 240 : 200))
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: containerHeight }}
    >
      {testimonialsList.map((t, index) => {
        const position =
          testimonialsList.length % 2
            ? index - (testimonialsList.length + 1) / 2
            : index - testimonialsList.length / 2
        return (
          <TestimonialCard
            key={t.tempId}
            testimonial={t}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        )
      })}

      {/* Nav — absolute bottom, inside the overflow container */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          style={{
            width: '48px', height: '48px', borderRadius: '50%',
            border: '1.5px solid var(--color-primary)', background: C.white,
            color: C.primary, flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'all 0.2s ease', lineHeight: 1,
          }}
          onMouseEnter={e => { e.currentTarget.style.background = C.primary; e.currentTarget.style.color = C.white }}
          onMouseLeave={e => { e.currentTarget.style.background = C.white;   e.currentTarget.style.color = C.primary }}
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={() => handleMove(1)}
          style={{
            width: '48px', height: '48px', borderRadius: '50%',
            border: '1.5px solid var(--color-primary)', background: C.white,
            color: C.primary, flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', transition: 'all 0.2s ease', lineHeight: 1,
          }}
          onMouseEnter={e => { e.currentTarget.style.background = C.primary; e.currentTarget.style.color = C.white }}
          onMouseLeave={e => { e.currentTarget.style.background = C.white;   e.currentTarget.style.color = C.primary }}
          aria-label="Next testimonial"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  )
}
