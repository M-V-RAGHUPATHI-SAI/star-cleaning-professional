import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

function InitialsAvatar({ name, size = 90 }) {
  const parts = name.trim().split(' ')
  const initials = parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : parts[0].slice(0, 2).toUpperCase()
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: 'var(--color-primary)', border: '3px solid rgba(28,63,58,0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <span style={{ color: 'white', fontWeight: 700, fontSize: size * 0.3, fontFamily: 'Inter, sans-serif' }}>
        {initials}
      </span>
    </div>
  )
}

function Stars({ rating, size = 18 }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{ fontSize: size, color: i <= Math.round(rating) ? 'var(--color-primary)' : '#d1d5db', lineHeight: 1 }}>★</span>
      ))}
    </div>
  )
}

function Card({ t, onExpand }) {
  return (
    <div style={{ perspective: '1200px', height: '100%' }}>
      <motion.div
        whileHover={{ rotateX: 2, rotateY: 2, rotate: 3, scale: 1.02 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        onClick={() => onExpand(t)}
        style={{
          height: '480px',
          background: 'linear-gradient(135deg, var(--color-cream) 0%, #f7f5f0 100%)',
          borderRadius: '20px',
          padding: '36px 28px',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '4px 4px 0px var(--color-primary)',
        }}
      >
        {/* Quote mark */}
        <div style={{ fontSize: '52px', color: 'var(--color-primary)', lineHeight: 0.8, fontFamily: 'Georgia, serif', opacity: 0.6, marginBottom: '20px' }}>&ldquo;</div>

        {/* Review text */}
        <p style={{ flex: 1, fontSize: '15px', fontWeight: 400, color: 'var(--color-dark)', lineHeight: 1.8, margin: 0, overflow: 'hidden' }}>
          {t.text}
        </p>

        {/* Stars */}
        <div style={{ marginTop: '20px' }}>
          <Stars rating={t.rating} />
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(28,63,58,0.15)', margin: '20px 0' }} />

        {/* Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <InitialsAvatar name={t.name} size={52} />
          <div>
            <p style={{ margin: 0, fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800, fontStyle: 'italic', fontSize: '16px', color: 'var(--color-dark)' }}>
              {t.name}
            </p>
            <p style={{ margin: 0, fontSize: '12px', fontWeight: 400, fontStyle: 'italic', color: 'var(--color-primary)', textDecoration: 'underline', marginTop: '2px' }}>
              {t.designation || t.location}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function RetroTestimonialCarousel({ testimonials }) {
  const [startIndex, setStartIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [navKey, setNavKey] = useState(0)
  const [expanded, setExpanded] = useState(null)

  const canPrev = startIndex > 0
  const canNext = startIndex < testimonials.length - 1

  const navigate = (dir) => {
    setDirection(dir)
    setStartIndex(i => i + dir)
    setNavKey(k => k + 1)
  }

  // Desktop shows 3 cards, mobile shows 1 (CSS handles hiding cards 1+2)
  const visibleCards = [
    testimonials[startIndex],
    testimonials[startIndex + 1],
    testimonials[startIndex + 2],
  ].filter(Boolean)

  return (
    <div>
      {/* Card row */}
      <div style={{ overflow: 'hidden' }}>
        <AnimatePresence mode="wait" custom={direction} initial={false}>
          <motion.div
            key={navKey}
            custom={direction}
            initial={(d) => ({ opacity: 0, x: d * 80 })}
            animate={{ opacity: 1, x: 0 }}
            exit={(d) => ({ opacity: 0, x: d * -80 })}
            transition={{ duration: 0.45, ease }}
            className="retro-carousel-grid"
          >
            {visibleCards.map((t, i) => (
              <div key={t.name} className={i > 0 ? 'hidden md:block' : 'block'}>
                <Card t={t} onExpand={setExpanded} />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Nav buttons — bottom right */}
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', marginTop: '32px' }}>
        <button
          onClick={() => navigate(-1)}
          disabled={!canPrev}
          aria-label="Previous"
          style={{
            width: '44px', height: '44px', borderRadius: '50%',
            background: 'var(--color-primary)', border: 'none',
            cursor: canPrev ? 'pointer' : 'default',
            opacity: canPrev ? 1 : 0.4,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: '18px', transition: 'opacity 0.2s, background 0.2s',
          }}
          onMouseEnter={e => { if (canPrev) e.currentTarget.style.background = 'var(--color-primaryDark)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-primary)' }}
        >
          ←
        </button>
        <button
          onClick={() => navigate(1)}
          disabled={!canNext}
          aria-label="Next"
          style={{
            width: '44px', height: '44px', borderRadius: '50%',
            background: 'var(--color-primary)', border: 'none',
            cursor: canNext ? 'pointer' : 'default',
            opacity: canNext ? 1 : 0.4,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: '18px', transition: 'opacity 0.2s, background 0.2s',
          }}
          onMouseEnter={e => { if (canNext) e.currentTarget.style.background = 'var(--color-primaryDark)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-primary)' }}
        >
          →
        </button>
      </div>

      {/* Expanded overlay */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setExpanded(null)}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(10,12,41,0.6)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              zIndex: 100,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '24px',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              transition={{ duration: 0.35, ease }}
              onClick={e => e.stopPropagation()}
              style={{
                background: 'linear-gradient(135deg, var(--color-cream) 0%, var(--color-white) 100%)',
                borderRadius: '24px',
                padding: '48px',
                maxWidth: '560px',
                width: '100%',
                boxShadow: '0 40px 80px rgba(0,0,0,0.3)',
                position: 'relative',
              }}
            >
              {/* Close */}
              <button
                onClick={() => setExpanded(null)}
                style={{
                  position: 'absolute', top: '20px', right: '20px',
                  background: 'none', border: 'none', fontSize: '24px',
                  cursor: 'pointer', color: 'var(--color-muted)', lineHeight: 1,
                  padding: '4px 8px',
                }}
              >
                ×
              </button>

              <div style={{ fontSize: '56px', color: 'var(--color-primary)', lineHeight: 0.8, fontFamily: 'Georgia, serif', opacity: 0.6, marginBottom: '24px' }}>&ldquo;</div>

              <p style={{ fontSize: '18px', fontWeight: 400, color: 'var(--color-dark)', lineHeight: 1.8, margin: '0 0 28px' }}>
                {expanded.text}
              </p>

              <Stars rating={expanded.rating} size={22} />

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '28px', paddingTop: '24px', borderTop: '1px solid rgba(28,63,58,0.15)' }}>
                <InitialsAvatar name={expanded.name} size={64} />
                <div>
                  <p style={{ margin: 0, fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800, fontStyle: 'italic', fontSize: '20px', color: 'var(--color-dark)' }}>
                    {expanded.name}
                  </p>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: 400, fontStyle: 'italic', color: 'var(--color-primary)', textDecoration: 'underline', marginTop: '4px' }}>
                    {expanded.designation || expanded.location}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
