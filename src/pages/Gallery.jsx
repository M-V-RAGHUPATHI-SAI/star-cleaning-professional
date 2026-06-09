import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { businessConfig } from '../businessConfig'
import MultiImageMarquee from '../components/MultiImageMarquee'
import CTABanner from '../components/CTABanner'

const MotionLink = motion.create(Link)

const ease = [0.22, 1, 0.36, 1]

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease },
}

const CATEGORIES = ['All', 'Residential', 'Kitchen', 'Commercial', 'Industrial', 'Move-Out']

export default function Gallery() {
  const pairs = businessConfig.beforeAfter
  const [activeFilter, setActiveFilter] = useState('All')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const filtered = activeFilter === 'All' ? pairs : pairs.filter(p => p.category === activeFilter)

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <>
      {/* ── HERO ── */}
      <section
        style={{ background: 'var(--color-primary)', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}
        className="pt-[120px] pb-12 px-6 lg:pt-[160px] lg:pb-20 lg:px-20"
      >
        {/* Decorative circle */}
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '420px', height: '420px', borderRadius: '9999px', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-120px', left: '40%', width: '280px', height: '280px', borderRadius: '9999px', background: 'rgba(255,255,255,0.02)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '720px', position: 'relative', zIndex: 1 }}>
          <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', display: 'block', marginBottom: '20px' }}>
            OUR WORK
          </span>
          <h1 style={{ margin: 0, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
            <span style={{ display: 'block', fontSize: 'clamp(44px,5vw,72px)', fontWeight: 300, color: 'white' }}>
              Spaces we&apos;ve
            </span>
            <span style={{ display: 'block', fontSize: 'clamp(44px,5vw,72px)', fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800, fontStyle: 'italic', color: 'white' }}>
              transformed.
            </span>
          </h1>
          <p style={{ fontSize: '17px', fontWeight: 400, color: 'rgba(255,255,255,0.65)', maxWidth: '520px', lineHeight: 1.75, marginTop: '20px', marginBottom: '28px' }}>
            A look at the homes, offices and spaces our team has brought back to spotless across {businessConfig.city}.
          </p>
        </div>
      </section>

      {/* ── FILTER + BEFORE/AFTER GRID ── */}
      <section style={{ background: 'var(--color-white)' }} className="pt-20 pb-20 lg:pt-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">

          {/* Desktop filter pills — hidden on mobile */}
          <motion.div {...fadeUp} className="hidden lg:flex flex-wrap gap-3" style={{ marginBottom: '48px' }}>
            {CATEGORIES.map(cat => {
              const isActive = cat === activeFilter
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-6 py-2.5 rounded-full text-sm transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[var(--color-primary)] text-white border-2 border-[var(--color-primary)] font-semibold'
                      : 'bg-white text-[var(--color-dark)] border-2 border-[var(--color-border)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] font-medium'
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </motion.div>

          {/* Mobile dropdown — hidden on desktop */}
          <div className="lg:hidden" style={{ marginBottom: '32px', position: 'relative' }} ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(o => !o)}
              style={{ width: '100%', background: 'white', border: '1.5px solid var(--color-primary)', borderRadius: '12px', padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontWeight: 600, fontSize: '14px', color: 'var(--color-dark)', cursor: 'pointer' }}
            >
              <span>{activeFilter}</span>
              <motion.span
                animate={{ rotate: dropdownOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                style={{ color: 'var(--color-primary)', fontSize: '16px', lineHeight: 1, display: 'inline-block' }}
              >
                ↓
              </motion.span>
            </button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease }}
                  style={{ overflow: 'hidden', background: 'white', border: '1.5px solid var(--color-border)', borderRadius: '12px', marginTop: '6px', position: 'absolute', width: '100%', zIndex: 20 }}
                >
                  {CATEGORIES.map((cat, i) => {
                    const isActive = cat === activeFilter
                    return (
                      <button
                        key={cat}
                        onClick={() => { setActiveFilter(cat); setDropdownOpen(false) }}
                        style={{ display: 'block', width: '100%', padding: '13px 18px', textAlign: 'left', fontWeight: isActive ? 600 : 500, fontSize: '14px', color: isActive ? 'white' : 'var(--color-dark)', background: isActive ? 'var(--color-primary)' : 'white', border: 'none', borderBottom: i < CATEGORIES.length - 1 ? '1px solid var(--color-border)' : 'none', cursor: 'pointer', transition: 'background 0.15s ease' }}
                        onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'var(--color-lightGray)' }}
                        onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'white' }}
                      >
                        {cat}
                      </button>
                    )
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Before/After grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {filtered.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--color-muted)', fontSize: '15px' }}>
                  No projects in this category yet.
                </div>
              ) : (
                <div className="ba-grid">
                  {filtered.map((pair, index) => (
                    <motion.div
                      key={pair.id}
                      initial={{ opacity: 0, y: 32 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: false, amount: 0.2 }}
                      transition={{ duration: 0.7, ease, delay: index * 0.1 }}
                      whileHover={{ y: -3, transition: { duration: 0.2, ease: 'easeOut' } }}
                      style={{
                        background: 'white',
                        borderRadius: '20px',
                        boxShadow: '6px 6px 0px var(--color-primary)',
                        overflow: 'hidden',
                        transition: 'box-shadow 0.2s ease',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.boxShadow = '9px 9px 0px var(--color-primary)' }}
                      onMouseLeave={e => { e.currentTarget.style.boxShadow = '6px 6px 0px var(--color-primary)' }}
                    >
                      {/* Image pair */}
                      <div style={{ position: 'relative', display: 'flex' }}>
                        {/* Before */}
                        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                          <img
                            src={pair.before}
                            alt={`Before — ${pair.title}`}
                            className="ba-img"
                            style={{ width: '100%', objectFit: 'cover', display: 'block' }}
                            onError={e => { e.target.style.background = 'var(--color-lightGray)'; e.target.removeAttribute('src') }}
                          />
                          <span style={{ position: 'absolute', top: '12px', left: '12px', background: 'var(--color-dark)', color: 'white', fontSize: '10px', fontWeight: 600, padding: '4px 10px', borderRadius: '9999px' }}>
                            Before
                          </span>
                        </div>

                        {/* Divider */}
                        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', background: 'white', zIndex: 2, transform: 'translateX(-50%)' }} />

                        {/* After */}
                        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                          <img
                            src={pair.after}
                            alt={`After — ${pair.title}`}
                            className="ba-img"
                            style={{ width: '100%', objectFit: 'cover', display: 'block' }}
                            onError={e => { e.target.style.background = 'var(--color-lightGray)'; e.target.removeAttribute('src') }}
                          />
                          <span style={{ position: 'absolute', top: '12px', right: '12px', background: 'var(--color-primary)', color: 'white', fontSize: '10px', fontWeight: 600, padding: '4px 10px', borderRadius: '9999px' }}>
                            After
                          </span>
                        </div>
                      </div>

                      {/* Card footer */}
                      <div style={{ padding: '16px 20px' }}>
                        <span style={{ fontSize: '10px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-primary)', background: '#E8F1EE', borderRadius: '9999px', padding: '3px 10px' }}>
                          {pair.category}
                        </span>
                        <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-dark)', marginTop: '6px' }}>{pair.title}</div>
                        <div style={{ fontSize: '13px', fontWeight: 400, color: 'var(--color-muted)', marginTop: '2px' }}>{pair.description}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── IMAGE MARQUEE ── */}
      <div style={{ position: 'relative' }}>
        <MultiImageMarquee />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 10, pointerEvents: 'none' }}>
          <MotionLink
            to={businessConfig.ctaPrimary.link}
            className="marquee-cta"
            style={{ display: 'inline-block', padding: '16px 40px', borderRadius: '999px', background: 'var(--color-primary)', color: 'white', fontWeight: 700, fontSize: '16px', letterSpacing: '0.02em', textDecoration: 'none', boxShadow: '0 4px 24px rgba(0,0,0,0.25)', pointerEvents: 'auto' }}
            whileHover={{
              scale: 1.12,
              boxShadow: '0 8px 40px rgba(0,0,0,0.35)',
              letterSpacing: '0.08em',
              padding: '18px 52px',
            }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            Book a Clean →
          </MotionLink>
        </div>
      </div>

      {/* ── VIDEO SECTION ── */}
      <section style={{ background: 'var(--color-lightGray)', padding: '96px 0' }}>
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <motion.div {...fadeUp} style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p className="section-label" style={{ marginBottom: '12px' }}>SEE IT IN ACTION</p>
            <h2 style={{ margin: 0, letterSpacing: '-0.02em' }}>
              <span style={{ display: 'block', fontWeight: 300, fontSize: 'clamp(32px, 4vw, 44px)', color: 'var(--color-dark)', lineHeight: 1.1 }}>
                Watch a {businessConfig.name}
              </span>
              <span style={{ display: 'block', fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800, fontStyle: 'italic', fontSize: 'clamp(32px, 4vw, 44px)', color: 'var(--color-primary)', lineHeight: 1.1 }}>
                clean.
              </span>
            </h2>
          </motion.div>

          <motion.div {...fadeUp} style={{ maxWidth: '720px', margin: '0 auto' }}>
            {businessConfig.videoUrl ? (
              <div style={{ borderRadius: '16px', overflow: 'hidden', aspectRatio: '16/9' }}>
                <video
                  src={businessConfig.videoUrl}
                  controls
                  playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', background: '#000' }}
                />
              </div>
            ) : (
              <div style={{ background: '#d1d5db', borderRadius: '16px', aspectRatio: '16/9', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '9999px', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', color: 'white', marginBottom: '16px' }}>
                  ▶
                </div>
                <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-muted)', margin: 0 }}>
                  Add your video URL to businessConfig.js
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <CTABanner />
    </>
  )
}
