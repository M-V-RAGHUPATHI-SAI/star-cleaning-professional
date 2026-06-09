import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { businessConfig } from '../businessConfig'
import Icon from '../components/Icon'
import Counter from '../components/Counter'
import CountUp from '../components/CountUp'
import CTABanner from '../components/CTABanner'

const ease = [0.22, 1, 0.36, 1]
const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease },
}

function initials(name) {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
}

/* ──────────────────────────────── SECTION 2 — HERO ──────────────────────────────── */
// Time-based beats (seconds) mapped from original frame analysis
const HERO_BEATS = [
  { id: 'before',  startTime: 0.8,  endTime: 2.2,  label: `${businessConfig.city?.toUpperCase()}, UK`,  line: 'Before.' },
  { id: 'service', startTime: 3.6,  endTime: 5.2,  label: businessConfig.name?.toUpperCase(),            line: 'The transformation.' },
  { id: 'after',   startTime: 6.3,  endTime: 7.7,  label: 'THE RESULT',                                  line: 'Spotless.' },
]
const VIDEO_DURATION = 8 // seconds

function Hero() {
  const videoRef    = useRef(null)
  const [phase, setPhase]           = useState('loading') // loading | playing | complete
  const [activeBeat, setActiveBeat] = useState(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video || !businessConfig.heroVideo) {
      setPhase('complete')
      return
    }

    function onTimeUpdate() {
      const t = video.currentTime
      const beat = HERO_BEATS.find(b => t >= b.startTime && t <= b.endTime)
      setActiveBeat(beat?.id ?? null)
    }

    function onEnded() {
      setActiveBeat(null)
      setPhase('complete')
    }

    function onCanPlay() {
      setPhase('playing')
      video.play().catch(() => {})
    }

    video.addEventListener('timeupdate', onTimeUpdate)
    video.addEventListener('ended', onEnded)
    video.addEventListener('canplay', onCanPlay)
    if (video.readyState >= 3) onCanPlay()

    return () => {
      video.removeEventListener('timeupdate', onTimeUpdate)
      video.removeEventListener('ended', onEnded)
      video.removeEventListener('canplay', onCanPlay)
    }
  }, [])

  const beatData = activeBeat ? HERO_BEATS.find(b => b.id === activeBeat) : null

  return (
    /*
     * Mobile  : flex-col — video in 4/3 aspect box (shows 87% of frame width, full house visible)
     *           hero content slides up as a white card beneath
     * Desktop : block, h-screen — video absolute full-screen, content overlaid
     */
    <section className="hero-section relative overflow-hidden bg-[#ebebeb]">

      {/* ── VIDEO WRAPPER ──────────────────────────────────────────────────────────────────
          Mobile : 4/3 aspect-ratio → object-fit:cover crops only 13% of width → full house
          Desktop: absolute inset-0 → fills viewport, aspect-ratio ignored by inset
      ── */}
      <div className="hero-video-wrapper">
        {businessConfig.heroVideo ? (
          <video
            ref={videoRef}
            muted playsInline preload="auto"
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{ transform: 'translateZ(0)' }}
          >
            <source src={businessConfig.heroVideo} type="video/mp4" />
          </video>
        ) : (
          <img
            ref={videoRef}
            src={businessConfig.heroImage}
            alt={businessConfig.name}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        )}

        {/* Progress bar */}
        {phase === 'playing' && (
          <motion.div
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: VIDEO_DURATION, ease: 'linear' }}
            className="absolute bottom-0 left-0 right-0 h-px origin-left z-20"
            style={{ background: 'var(--color-primary)', opacity: 0.4 }}
          />
        )}

        {/* Story beat pills — always inside the video area */}
        <AnimatePresence mode="wait">
          {beatData && (
            <motion.div
              key={beatData.id}
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0,  scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.96 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: 'absolute',
                bottom: 'clamp(20px, 6%, 72px)',
                left: '16px', right: '16px',
                margin: '0 auto',
                width: 'fit-content',
                maxWidth: 'calc(100% - 32px)',
                textAlign: 'center', zIndex: 15, pointerEvents: 'none',
                background: 'rgba(10,12,41,0.72)',
                backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.10)',
                borderRadius: '16px',
                padding: 'clamp(10px,1.6vh,18px) clamp(16px,3vw,40px)',
                boxShadow: '0 8px 40px rgba(10,12,41,0.20)',
              }}
            >
              <div style={{ color: 'rgba(255,255,255,0.46)', fontFamily: 'Inter,sans-serif', fontSize: 'clamp(8px,2.2vw,11px)', fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', marginBottom: '5px' }}>
                {beatData.label}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.95)', fontFamily: "'Playfair Display',Georgia,serif", fontSize: 'clamp(22px,5.5vw,52px)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.1 }}>
                {beatData.line}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── LOADING OVERLAY — covers full section regardless of layout phase ── */}
      <AnimatePresence>
        {phase === 'loading' && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center gap-5"
            style={{ background: 'var(--color-primary)' }}
          >
            <div>
              <span style={{ color: 'white', fontFamily: 'Inter,sans-serif', fontSize: '20px', fontWeight: 800, letterSpacing: '-0.02em' }}>{businessConfig.namePart1}</span>
              <span style={{ color: 'rgba(255,255,255,0.48)', fontFamily: 'Inter,sans-serif', fontSize: '20px', fontWeight: 300, letterSpacing: '-0.02em' }}> {businessConfig.namePart2}</span>
            </div>
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
              style={{ width: '6px', height: '6px', borderRadius: '9999px', background: 'rgba(255,255,255,0.55)' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HERO CONTENT ────────────────────────────────────────────────────────────────────
          Mobile : white card, rounded top corners, sits below video, slides up
          Desktop: absolute overlay, dark navy text on light house background
      ── */}
      <AnimatePresence>
        {phase === 'complete' && (
          <motion.div
            key="hero"
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="
              relative flex-1 z-10
              bg-white rounded-t-[28px] -mt-6
              md:absolute md:inset-0 md:bg-transparent md:rounded-none md:mt-0
              flex flex-col justify-center
            "
          >
            {/* Padding: mobile uses px-6 py-8, desktop uses calc-based horizontal */}
            <div className="px-6 py-8 md:py-0 md:flex md:items-center md:h-full" style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ width: '100%', maxWidth: '520px' }}
                   className="md:ml-[max(28px,calc(50vw-580px))]">
                <motion.div
                  variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }}
                  initial="hidden" animate="visible"
                >

                  {/* Eyebrow */}
                  <div className="md:hidden">
                  <motion.div
                    variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                    style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}
                  >
                    <span style={{ width: '26px', height: '1.5px', background: 'var(--color-primary)', opacity: 0.4, flexShrink: 0 }} />
                    <span style={{ color: 'var(--color-primary)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.6, WebkitTextStroke: '1px rgba(255,255,255,0.5)', paintOrder: 'stroke fill' }}>
                      {businessConfig.eyebrow}
                    </span>
                  </motion.div>
                  </div>

                  {/* Headline */}
                  <motion.h1
                    variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65 } } }}
                    style={{ margin: '0 0 18px', lineHeight: 1.04, letterSpacing: '-0.03em' }}
                  >
                    <span className="hero-text-stroke" style={{ display: 'block', fontSize: 'clamp(34px, 5vw, 74px)', fontWeight: 300, color: 'var(--color-primary)', fontFamily: 'Inter,sans-serif' }}>
                      {businessConfig.headlineLight}
                    </span>
                    <span className="hero-text-stroke" style={{ display: 'block', fontSize: 'clamp(34px, 5vw, 74px)', fontWeight: 700, fontStyle: 'italic', color: 'var(--color-primary)', fontFamily: "'Playfair Display',Georgia,serif" }}>
                      {businessConfig.headlineBold}
                    </span>
                  </motion.h1>

                  {/* Subtext */}
                  <motion.p
                    variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55 } } }}
                    style={{ fontSize: '15px', lineHeight: 1.75, color: 'var(--color-secondary)', maxWidth: '400px', margin: '0 0 32px', fontWeight: 400 }}
                  >
                    {businessConfig.heroSubtext}
                  </motion.p>

                  {/* CTAs */}
                  <motion.div
                    variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                    style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '32px' }}
                  >
                    <Link
                      to={businessConfig.ctaPrimary.link}
                      style={{ background: 'var(--color-primary)', color: 'white', fontWeight: 700, fontSize: '14px', padding: '14px 28px', borderRadius: '9999px', textDecoration: 'none', whiteSpace: 'nowrap', boxShadow: '0 4px 20px rgba(var(--color-darkRgb),0.26)', transition: 'transform 0.2s ease, box-shadow 0.2s ease' }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(var(--color-darkRgb),0.36)' }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(var(--color-darkRgb),0.26)' }}
                    >
                      {businessConfig.ctaPrimary.label} →
                    </Link>
                    <Link
                      to={businessConfig.ctaSecondary.link}
                      style={{ background: 'rgba(255,255,255,0.55)', color: 'var(--color-primary)', fontWeight: 600, fontSize: '14px', padding: '13px 28px', borderRadius: '9999px', textDecoration: 'none', border: '1.5px solid rgba(var(--color-darkRgb),0.55)', whiteSpace: 'nowrap', transition: 'border-color 0.2s ease, background 0.2s ease' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(var(--color-darkRgb),0.85)'; e.currentTarget.style.background = 'rgba(255,255,255,0.75)' }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(var(--color-darkRgb),0.55)'; e.currentTarget.style.background = 'rgba(255,255,255,0.55)' }}
                    >
                      {businessConfig.ctaSecondary.label}
                    </Link>
                  </motion.div>

                  {/* Stats */}
                  <div className="md:hidden">
                  <motion.div
                    variants={{ hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                    style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}
                  >
                    {businessConfig.statValues.slice(0, 3).map((s, i) => (
                      <div key={i} style={{ borderLeft: '2px solid rgba(var(--color-darkRgb),0.15)', paddingLeft: '12px' }}>
                        <div style={{ fontSize: 'clamp(18px, 2.2vw, 26px)', fontWeight: 800, color: 'var(--color-primary)', lineHeight: 1.1, WebkitTextStroke: '1.5px rgba(255,255,255,0.5)', paintOrder: 'stroke fill' }}>{s.num}{s.suffix}</div>
                        <div style={{ fontSize: '11px', color: 'var(--color-secondary)', marginTop: '2px', fontWeight: 400, letterSpacing: '0.02em' }}>{s.label}</div>
                      </div>
                    ))}
                  </motion.div>
                  </div>

                </motion.div>
              </div>
            </div>

            {/* Rating cluster — desktop only */}
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="hidden md:flex"
              style={{ position: 'absolute', bottom: '36px', right: '52px', zIndex: 20, alignItems: 'center', gap: '12px' }}
            >
              <div className="flex">
                {['PS', 'RM', 'SR', 'IK', 'AI'].map((ini, i) => (
                  <div key={i} style={{ width: '34px', height: '34px', borderRadius: '9999px', background: 'rgba(var(--color-darkRgb),0.07)', border: '2px solid rgba(var(--color-darkRgb),0.13)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', fontSize: '10px', fontWeight: 700, marginLeft: i === 0 ? '0' : '-8px' }}>
                    {ini}
                  </div>
                ))}
              </div>
              <div>
                <div style={{ color: 'var(--color-primary)', fontSize: '13px', letterSpacing: '2px', marginBottom: '2px', opacity: 0.78 }}>★★★★★</div>
                <div style={{ color: 'rgba(var(--color-darkRgb),0.42)', fontSize: '12px', fontWeight: 400 }}>5.0 · 1,200+ reviews</div>
              </div>
            </motion.div>


          </motion.div>
        )}
      </AnimatePresence>

    </section>
  )
}

/* ──────────────────────────────── SECTION 3 — TRUST BAR ──────────────────────────────── */
function TrustBar() {
  const items = [...businessConfig.trustBar, ...businessConfig.trustBar]
  return (
    <section className="bg-[var(--color-primary)] overflow-hidden" style={{ height: '52px' }}>
      <div className="flex items-center h-full w-max animate-marquee">
        {items.map((item, i) => (
          <div key={i} className="flex items-center flex-shrink-0">
            <span className="uppercase text-white whitespace-nowrap" style={{ fontWeight: 600, fontSize: '11px', letterSpacing: '0.14em', opacity: 0.85 }}>
              {item}
            </span>
            <span className="mx-6 text-white" style={{ opacity: 0.4 }}>·</span>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ──────────────────────────────── SECTION 4 — WHO WE ARE ──────────────────────────────── */
function WhoWeAre() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{ minHeight: '100vh', background: 'var(--color-white)', padding: '96px 0', overflowX: 'hidden' }}
    >
      <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 32px' }}>

        {/* TOP ROW — label + headline */}
        <div style={{ marginBottom: '64px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-primary)', display: 'block', marginBottom: '16px' }}>
            Who We Are
          </span>
          <h2 style={{ maxWidth: '800px', lineHeight: 1.05 }}>
            <span style={{ display: 'block', fontSize: 'clamp(36px, 4.5vw, 62px)', fontWeight: 300, color: 'var(--color-dark)', letterSpacing: '-0.02em' }}>
              We don&apos;t just clean —
            </span>
            <span style={{ display: 'block', fontSize: 'clamp(36px, 4.5vw, 62px)', fontWeight: 800, fontStyle: 'italic', fontFamily: "'Playfair Display', Georgia, serif", color: 'var(--color-primary)', letterSpacing: '-0.02em' }}>
              we transform spaces.
            </span>
          </h2>
        </div>

        {/* BOTTOM ROW — 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-12 items-start">

          {/* LEFT — tall image + floating badges */}
          <div style={{ position: 'relative', overflow: 'hidden' }} className="lg:overflow-visible">
            <img
              onError={e => { e.target.style.display = 'none' }}
              src={businessConfig.aboutImage}
              alt={`About ${businessConfig.name}`}
              className="w-full object-cover"
              style={{ height: '580px', borderRadius: '24px', display: 'block' }}
            />
            {/* Badge — top left */}
            <div style={{ position: 'absolute', top: '24px', left: '-20px', background: 'var(--color-primary)', color: 'var(--color-white)', borderRadius: '16px', padding: '20px 24px', boxShadow: '0 20px 60px rgba(28,63,58,0.35)' }}>
              <div style={{ fontSize: '28px', fontWeight: 800, lineHeight: 1 }}><CountUp end={businessConfig.statValues[0].num} suffix={businessConfig.statValues[0].suffix} duration={1500} /></div>
              <div style={{ fontSize: '12px', fontWeight: 500, opacity: 0.8, marginTop: '4px' }}>Years in Business</div>
            </div>
            {/* Badge — bottom right (rating) */}
            <div className="rating-badge" style={{ position: 'absolute', bottom: '28px', right: '-20px', background: 'var(--color-white)', borderRadius: '16px', padding: '20px 24px', boxShadow: '8px 8px 0px var(--color-primary)', border: '1px solid var(--color-border)' }}>
              <div className="rating-number" style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-primary)', lineHeight: 1 }}>★ {businessConfig.statValues[2].num}</div>
              <div className="rating-label" style={{ fontSize: '12px', color: 'var(--color-muted)', marginTop: '4px' }}>Average Rating</div>
            </div>
          </div>

          {/* RIGHT — content */}
          <div style={{ paddingTop: '8px' }}>

            {/* Body text */}
            <p style={{ fontSize: '16px', fontWeight: 400, color: 'var(--color-muted)', lineHeight: 1.8, marginBottom: '40px' }}>
              {businessConfig.about}
            </p>

            {/* 3D stat cards */}
            <div className="stat-cards-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '40px', overflow: 'hidden', padding: '6px', maxWidth: '100%', boxSizing: 'border-box' }}>
              <div
                className="stat-card-white"
                style={{ background: 'white', border: '1.5px solid var(--color-border)', borderRadius: '20px', padding: '28px 24px', boxShadow: '6px 6px 0px var(--color-primary)', transition: 'transform 0.2s, box-shadow 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-3px,-3px)'; e.currentTarget.style.boxShadow = '9px 9px 0px var(--color-primary)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translate(0,0)'; e.currentTarget.style.boxShadow = '6px 6px 0px var(--color-primary)' }}
              >
                <div className="stat-number" style={{ fontSize: '42px', fontWeight: 800, color: 'var(--color-primary)', lineHeight: 1 }}><CountUp end={businessConfig.statValues[1].num} suffix={businessConfig.statValues[1].suffix} duration={2000} /></div>
                <div className="stat-label" style={{ fontSize: '13px', color: 'var(--color-muted)', marginTop: '8px' }}>Homes Cleaned</div>
              </div>
              <div
                className="stat-card-dark"
                style={{ background: 'var(--color-primary)', borderRadius: '20px', padding: '28px 24px', boxShadow: '6px 6px 0px var(--color-dark)', transition: 'transform 0.2s, box-shadow 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-3px,-3px)'; e.currentTarget.style.boxShadow = '9px 9px 0px var(--color-dark)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translate(0,0)'; e.currentTarget.style.boxShadow = '6px 6px 0px var(--color-dark)' }}
              >
                <div className="stat-number" style={{ fontSize: '42px', fontWeight: 800, color: 'var(--color-white)', lineHeight: 1 }}><CountUp end={businessConfig.statValues[3].num} suffix={businessConfig.statValues[3].suffix} duration={2200} /></div>
                <div className="stat-label" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', marginTop: '8px' }}>5-Star Reviews</div>
              </div>
            </div>

            {/* Checklist */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '40px' }}>
              {businessConfig.whoWeAreChecklist.map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '6px', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ color: 'white', fontSize: '12px', fontWeight: 700 }}>✓</span>
                  </div>
                  <span style={{ fontSize: '15px', color: 'var(--color-dark)', fontWeight: 500 }}>{item}</span>
                </div>
              ))}
            </div>

            {/* CTA link */}
            <Link
              to="/about"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: 700, color: 'var(--color-primary)', textDecoration: 'none', borderBottom: '2px solid var(--color-primary)', paddingBottom: '2px', transition: 'gap 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.gap = '14px')}
              onMouseLeave={e => (e.currentTarget.style.gap = '8px')}
            >
              More About Us →
            </Link>

          </div>
        </div>
      </div>
    </motion.section>
  )
}

/* ──────────────────────────────── SECTION 5 — SERVICES ──────────────────────────────── */
function Services() {
  const services = businessConfig.services
  const [activeIndex, setActiveIndex] = useState(0)
  const serviceRefs = useRef([])
  const timeoutRef = useRef(null)

  useEffect(() => {
    const isMobile = window.innerWidth < 768

    if (isMobile) {
      // Scroll-based: whichever card center is closest to viewport center wins.
      // Reliable regardless of card height — no threshold tuning needed.
      let rafId = null
      let current = 0
      const check = () => {
        const mid = window.innerHeight / 2
        let best = 0, bestDist = Infinity
        serviceRefs.current.forEach((ref, i) => {
          if (!ref) return
          const { top, height } = ref.getBoundingClientRect()
          const dist = Math.abs(top + height / 2 - mid)
          if (dist < bestDist) { bestDist = dist; best = i }
        })
        // Only trigger a React re-render when the active card actually changes
        if (best !== current) { current = best; setActiveIndex(best) }
      }
      const onScroll = () => {
        if (rafId) return
        rafId = requestAnimationFrame(() => { rafId = null; check() })
      }
      window.addEventListener('scroll', onScroll, { passive: true })
      check()
      return () => {
        window.removeEventListener('scroll', onScroll)
        if (rafId) cancelAnimationFrame(rafId)
      }
    }

    // Desktop: IntersectionObserver (unchanged)
    const observers = []
    serviceRefs.current.forEach((ref, index) => {
      if (!ref) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            clearTimeout(timeoutRef.current)
            timeoutRef.current = setTimeout(() => setActiveIndex(index), 100)
          }
        },
        { threshold: 0.6, rootMargin: '-35% 0px -35% 0px' }
      )
      observer.observe(ref)
      observers.push(observer)
    })
    return () => {
      observers.forEach(o => o.disconnect())
      clearTimeout(timeoutRef.current)
    }
  }, [])

  const rowVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22,1,0.36,1], delay: i * 0.1 } })
  }

  return (
    <section className="bg-[var(--color-cream)] py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div {...fadeUp} className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-16">
          <div>
            <p className="section-label mb-3">What We Offer</p>
            <h2 style={{ lineHeight: 1.08, letterSpacing: '-0.02em' }}>
              <span style={{ display: 'block', fontSize: 'clamp(36px, 4vw, 54px)', fontWeight: 300, color: 'var(--color-dark)' }}>Cleaning solutions</span>
              <span style={{ display: 'block', fontSize: 'clamp(36px, 4vw, 54px)', fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800, fontStyle: 'italic', color: 'var(--color-primary)' }}>for every space.</span>
            </h2>
          </div>
          <Link to="/services" className="text-[var(--color-primary)] whitespace-nowrap hover:underline" style={{ fontWeight: 500, fontSize: '14px' }}>
            View all services →
          </Link>
        </motion.div>

        {/* Service rows */}
        <div className="flex flex-col gap-4 lg:block lg:gap-0">
          {services.map((service, i) => {
            const isActive = i === activeIndex
            const num = String(i + 1).padStart(2, '0')

            // Derive all style values from isActive
            const rowBg        = isActive ? 'var(--color-primary)'                       : 'transparent'
            const rowOpacity   = isActive ? 1                                : 0.5
            const numColor     = isActive ? 'rgba(255,255,255,0.4)'          : 'rgba(28,63,58,0.5)'
            const nameColor    = isActive ? 'var(--color-white)'                        : 'var(--color-dark)'
            const oneColor     = isActive ? 'rgba(255,255,255,0.7)'         : 'var(--color-muted)'
            const pillBg       = isActive ? 'rgba(255,255,255,0.12)'        : 'white'
            const pillBorder   = isActive ? '1px solid rgba(255,255,255,0.2)' : '1px solid var(--color-border)'
            const pillColor    = isActive ? 'white'                         : 'var(--color-dark)'
            const arrowColor   = isActive ? 'white'                         : 'var(--color-primary)'
            const arrowOpacity = isActive ? 1                                : 0
            const imgFilter    = isActive ? 'brightness(1.1)'               : 'grayscale(30%)'
            const dividerOp    = isActive ? 0                                : 1

            return (
              <div key={service.name}>
                {/* Separator — desktop only, fades when row above is active */}
                {i > 0 && (
                  <div className="hidden lg:block" style={{ height: '1px', background: '#d1d5db', opacity: dividerOp, transition: 'opacity 0.4s ease' }} />
                )}

                <motion.div
                  ref={el => serviceRefs.current[i] = el}
                  custom={i}
                  variants={rowVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="cursor-pointer flex flex-col lg:flex-row lg:items-center overflow-hidden lg:min-h-[120px]"
                  style={{
                    background: rowBg,
                    borderRadius: '16px',
                    opacity: rowOpacity,
                    transition: 'background 0.7s ease, opacity 0.7s ease, border-radius 0.7s ease',
                  }}
                >
                  {/* Mobile-only image — full width at top of card */}
                  <div className="block lg:hidden w-full flex-shrink-0" style={{ height: '200px', overflow: 'hidden' }}>
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover"
                      style={{ filter: imgFilter, transition: 'filter 0.7s ease, transform 0.7s ease', transform: isActive ? 'scale(1.03)' : 'scale(1)' }}
                      onError={e => { e.target.parentElement.style.display = 'none' }}
                    />
                  </div>

                  {/* Content row */}
                  <div className="flex items-center gap-6 lg:gap-12 w-full" style={{ padding: 'clamp(20px, 4vw, 32px)' }}>

                    {/* Number */}
                    <span className="hidden sm:block" style={{ fontSize: '13px', fontWeight: 800, color: numColor, minWidth: '32px', transition: 'color 0.7s ease' }}>
                      {num}
                    </span>

                    {/* Name + one-liner + mobile pills + mobile learn more */}
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '22px', fontWeight: 700, color: nameColor, transition: 'color 0.7s ease' }}>
                        {service.name}
                      </div>
                      <div style={{ fontSize: '15px', fontWeight: 400, color: oneColor, marginTop: '4px', transition: 'color 0.7s ease' }}>
                        {service.oneliner}
                      </div>
                      {/* Mobile pills — max 2 */}
                      <div className="flex lg:hidden flex-wrap gap-2 mt-3">
                        {service.features.slice(0, 2).map((f, fi) => (
                          <span key={fi} style={{ padding: '4px 12px', borderRadius: '9999px', fontSize: '12px', fontWeight: 500, background: pillBg, border: pillBorder, color: pillColor, transition: 'all 0.7s ease' }}>
                            {f}
                          </span>
                        ))}
                      </div>
                      {/* Mobile learn more */}
                      <span className="block lg:hidden mt-4" style={{ fontSize: '13px', fontWeight: 600, color: isActive ? 'white' : 'var(--color-primary)', transition: 'color 0.7s ease' }}>
                        Learn more →
                      </span>
                    </div>

                    {/* Feature pills — desktop only, 3 pills */}
                    <div className="hidden lg:flex flex-wrap gap-2" style={{ flex: 1 }}>
                      {service.features.slice(0, 3).map((f) => (
                        <span key={f} style={{ background: pillBg, border: pillBorder, borderRadius: '9999px', padding: '4px 12px', fontSize: '12px', color: pillColor, transition: 'all 0.7s ease' }}>
                          {f}
                        </span>
                      ))}
                    </div>

                    {/* Image — desktop only */}
                    <div className="hidden lg:block" style={{ width: '180px', height: '120px', flexShrink: 0, borderRadius: '14px', overflow: 'hidden' }}>
                      <img
                        src={service.image}
                        alt={service.name}
                        className="w-full h-full object-cover transition-all duration-[400ms]"
                        style={{ filter: imgFilter }}
                        onError={e => { e.target.style.display = 'none' }}
                      />
                    </div>

                    {/* Arrow */}
                    <span style={{ fontSize: '20px', color: arrowColor, opacity: arrowOpacity, transition: 'all 0.7s ease', flexShrink: 0 }}>→</span>

                  </div>
                </motion.div>
              </div>
            )
          })}

          {/* Final separator — desktop only */}
          <div className="hidden lg:block" style={{ height: '1px', background: '#d1d5db', opacity: activeIndex === services.length - 1 ? 0 : 1, transition: 'opacity 0.4s ease' }} />
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14">
          <Link
            to="/services"
            style={{ background: 'white', color: 'var(--color-primary)', border: '2px solid var(--color-primary)', padding: '16px 40px', borderRadius: '9999px', fontSize: '15px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.25s ease', display: 'inline-block' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-primary)'; e.currentTarget.style.color = 'white' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = 'var(--color-primary)' }}
          >
            See all {services.length} services
          </Link>
        </div>

      </div>
    </section>
  )
}

/* ──────────────────────────────── SECTION 6 — HOW IT WORKS ──────────────────────────────── */
function HowItWorks() {
  const steps = businessConfig.howItWorks
  const [active, setActive] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(parseInt(entry.target.getAttribute('data-i')))
        })
      },
      { threshold: 0.5, rootMargin: '-20% 0px -20% 0px' }
    )
    document.querySelectorAll('.home-hiw-step').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const goTo = (i) => {
    const el = document.getElementById(`home-hiw-${i}`)
    if (!el) return
    const top = el.getBoundingClientRect().top - document.body.getBoundingClientRect().top - 120
    window.scrollTo({ top, behavior: 'smooth' })
  }

  // Progress line fill percentage for mobile
  const fillPct = steps.length > 1 ? (active / (steps.length - 1)) * 100 : 0

  return (
    <section className="bg-white py-28">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left panel — static on mobile, sticky on desktop */}
          <div className="lg:sticky" style={{ top: '80px', alignSelf: 'flex-start', maxWidth: '380px' }}>
            <p className="section-label mb-3">How It Works</p>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 42px)', letterSpacing: '-0.02em', lineHeight: 1.08, marginBottom: '20px' }}>
              <span style={{ display: 'block', fontWeight: 300, color: 'var(--color-dark)' }}>Our cleaning</span>
              <span style={{ display: 'block', fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800, fontStyle: 'italic', color: 'var(--color-primary)' }}>process.</span>
            </h2>
            <p className="text-[var(--color-muted)] max-w-sm" style={{ fontWeight: 400, fontSize: '16px', lineHeight: 1.8 }}>
              Booking a clean takes minutes. Here&apos;s exactly what happens from the moment you reach out.
            </p>
            <Link
              to={businessConfig.ctaPrimary.link}
              className="inline-flex items-center px-8 py-3 rounded-full bg-[var(--color-primary)] text-white font-semibold"
              style={{ marginTop: '24px', marginBottom: '20px' }}
            >
              {businessConfig.ctaPrimary.label}
            </Link>

            {/* Desktop step tabs */}
            <div className="hidden lg:block">
              {steps.map((step, i) => {
                const on = active === i
                const isLast = i === steps.length - 1
                return (
                  <button
                    key={step.number}
                    onClick={() => goTo(i)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      background: on ? 'var(--color-primary)' : 'transparent',
                      transition: 'all 0.3s ease',
                      marginBottom: isLast ? 0 : '24px',
                    }}
                  >
                    <span style={{ fontWeight: 700, fontSize: '13px', color: on ? 'white' : 'var(--color-muted)', transition: 'color 0.3s ease' }}>
                      {step.number}
                    </span>
                    <span style={{ fontWeight: 600, fontSize: '15px', color: on ? 'white' : 'var(--color-muted)', transition: 'color 0.3s ease' }}>
                      {step.title}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Mobile tab list — same style as desktop, no dots/line */}
            <div className="block lg:hidden mt-10 space-y-2">
              {steps.map((step, i) => {
                const on = active === i
                return (
                  <button
                    key={step.number}
                    onClick={() => goTo(i)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '12px',
                      padding: '14px 16px', borderRadius: '12px',
                      width: '100%', border: 'none', cursor: 'pointer', textAlign: 'left',
                      transition: 'all 0.4s ease',
                      background: on ? 'var(--color-primary)' : 'transparent',
                      opacity: on ? 1 : 0.45,
                    }}
                  >
                    <span style={{ fontWeight: 800, fontSize: '13px', color: on ? 'white' : 'var(--color-primary)' }}>
                      {step.number}
                    </span>
                    <span style={{ fontSize: '15px', fontWeight: on ? 600 : 400, color: on ? 'white' : 'var(--color-dark)' }}>
                      {step.title}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* ── MOBILE right panel — progress line + cards ── */}
          <div className="lg:hidden" style={{ position: 'relative' }}>
            {/* Track line */}
            <div style={{ position: 'absolute', left: '7px', top: '8px', bottom: '8px', width: '2px', background: 'var(--color-border)', borderRadius: '9999px', zIndex: 0 }} />
            {/* Active fill */}
            <div style={{
              position: 'absolute', left: '7px', top: '8px', width: '2px', borderRadius: '9999px',
              background: 'linear-gradient(to bottom, var(--color-primary), var(--color-primaryDark))',
              boxShadow: '0 0 8px rgba(var(--color-darkRgb),0.7), 0 0 16px rgba(var(--color-darkRgb),0.3)',
              height: `${steps.length > 1 ? (active / (steps.length - 1)) * 100 : 0}%`,
              transition: 'height 0.6s cubic-bezier(0.22,1,0.36,1)', zIndex: 0
            }} />

            {steps.map((step, i) => (
              <div key={i} id={`home-hiw-${i}`} data-i={i} className="home-hiw-step"
                style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', paddingLeft: '28px', position: 'relative', marginBottom: '48px' }}>
                {/* Glowing dot */}
                <div style={{
                  position: 'absolute', left: '0px', top: '20px',
                  width: '16px', height: '16px', borderRadius: '9999px',
                  background: i <= active ? 'var(--color-primary)' : 'var(--color-border)',
                  boxShadow: i === active ? '0 0 0 4px rgba(28,63,58,0.15), 0 0 14px rgba(28,63,58,0.6)' : 'none',
                  transition: 'all 0.5s ease', zIndex: 2, flexShrink: 0
                }} />
                {/* Card content */}
                <div style={{ flex: 1 }}>
                  <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', opacity: i === active ? 1 : 0.4, transition: 'opacity 0.5s ease' }}>
                    <img src={step.img} alt={step.title} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }} onError={e => { e.target.style.display = 'none' }} />
                    <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'var(--color-primary)', color: 'white', width: '36px', height: '36px', borderRadius: '9999px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 800 }}>
                      {step.number}
                    </div>
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-dark)', marginTop: '16px', opacity: i === active ? 1 : 0.4, transition: 'opacity 0.5s ease' }}>{step.title}</h3>
                  <p style={{ fontSize: '15px', color: 'var(--color-muted)', marginTop: '8px', lineHeight: 1.7, opacity: i === active ? 1 : 0.4, transition: 'opacity 0.5s ease' }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* ── DESKTOP right panel — unchanged ── */}
          <div className="hidden lg:block space-y-20 pb-24">
            {steps.map((step, i) => (
              <div
                key={step.number}
                id={`home-hiw-${i}`}
                data-i={i}
                className={`home-hiw-step transition-all duration-700 ${active === i ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-6'}`}
              >
                <div className="relative overflow-hidden aspect-video" style={{ borderRadius: '20px' }}>
                  <img src={step.img} alt={step.title} className="w-full h-full object-cover" onError={e => { e.target.style.display = 'none' }} />
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center" style={{ fontWeight: 700, fontSize: '18px' }}>
                    {step.number}
                  </div>
                </div>
                <h3 className="text-[var(--color-dark)] mt-6" style={{ fontWeight: 700, fontSize: '28px' }}>{step.title}</h3>
                <p className="text-[var(--color-muted)] mt-3" style={{ fontWeight: 400, fontSize: '16px', lineHeight: 1.8 }}>{step.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────────── SECTION 7 — PROJECTS ──────────────────────────────── */
function ProjectCard({ p, fadeDelay, hoverShadow }) {
  return (
    <motion.div
      {...fadeUp}
      transition={{ ...fadeUp.transition, delay: fadeDelay }}
      className="group relative overflow-hidden cursor-pointer w-full h-full"
      style={{ borderRadius: '28px', border: '1px solid rgba(255,255,255,0.06)', transition: 'box-shadow 0.3s' }}
      onMouseEnter={hoverShadow ? (e => { e.currentTarget.style.boxShadow = hoverShadow }) : undefined}
      onMouseLeave={hoverShadow ? (e => { e.currentTarget.style.boxShadow = 'none' }) : undefined}
    >
      {/* Image */}
      <img
        src={p.img}
        alt={p.title}
        className="w-full h-full object-cover transition-transform duration-[700ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
        onError={e => { e.target.style.display = 'none' }}
      />

      {/* Bottom-to-top gradient — top clear, bottom dark for text */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(
            to top,
            rgba(var(--color-darkRgb),0.70) 0%,
            rgba(var(--color-darkRgb),0.38) 35%,
            rgba(var(--color-darkRgb),0.10) 65%,
            rgba(var(--color-darkRgb),0.0) 100%
          )`,
        }}
      />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0" style={{ padding: '28px 32px' }}>
        {/* Category pill — frosted glass */}
        <span
          style={{
            display: 'inline-flex', alignItems: 'center',
            background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.18)', color: 'white',
            fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em',
            textTransform: 'uppercase', padding: '5px 14px',
            borderRadius: '9999px', marginBottom: '12px',
          }}
        >
          {p.category}
        </span>

        {/* Title */}
        <span
          style={{
            display: 'block', fontWeight: 700, fontSize: '24px', color: 'white',
            lineHeight: 1.2, letterSpacing: '-0.01em', marginBottom: '10px',
            textShadow: '0 2px 12px rgba(0,0,0,0.3)',
          }}
        >
          {p.title}
        </span>

        {/* Location row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <i className="fa-solid fa-location-dot" style={{ color: 'white', opacity: 0.5, fontSize: '12px' }} />
          <span style={{ fontWeight: 400, fontSize: '13px', color: 'rgba(255,255,255,0.65)' }}>{p.location}</span>
        </div>
      </div>

      {/* Hover arrow — top right */}
      <div
        className="absolute opacity-0 scale-[0.85] group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 flex items-center justify-center"
        style={{
          top: '20px', right: '20px', width: '44px', height: '44px',
          borderRadius: '9999px', background: 'rgba(255,255,255,0.12)',
          backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)',
        }}
      >
        <span style={{ color: 'white', fontSize: '18px' }}>↗</span>
      </div>
    </motion.div>
  )
}

function Projects() {
  const projects = businessConfig.projects

  return (
    <section className="bg-[var(--color-lightGray)] py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div {...fadeUp} className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12">
          <div>
            <p className="section-label mb-3">Our Work</p>
            <h2 style={{ lineHeight: 1.08, letterSpacing: '-0.02em' }}>
              <span style={{ display: 'block', fontWeight: 300, fontSize: 'clamp(36px, 4vw, 56px)', color: 'var(--color-dark)' }}>Spaces we&apos;ve</span>
              <span style={{ display: 'block', fontWeight: 800, fontStyle: 'italic', fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(36px, 4vw, 56px)', color: 'var(--color-primary)' }}>transformed.</span>
            </h2>
          </div>
          <Link to="/gallery" className="text-[var(--color-primary)] whitespace-nowrap hover:underline" style={{ fontWeight: 500, fontSize: '14px' }}>
            View all work →
          </Link>
        </motion.div>

        {/* Desktop asymmetric grid */}
        <div className="hidden sm:block">
          {/* Row 1 — 60/40 split, 440px tall */}
          <div className="grid gap-4" style={{ gridTemplateColumns: '3fr 2fr', height: '440px' }}>
            <ProjectCard p={projects[0]} fadeDelay={0} hoverShadow="inset 0 0 0 1.5px rgba(255,255,255,0.12)" />
            <ProjectCard p={projects[1]} fadeDelay={0.08} />
          </div>
          {/* Row 2 — 40/60 inverted, 340px tall */}
          <div className="grid gap-4 mt-4" style={{ gridTemplateColumns: '2fr 3fr', height: '340px' }}>
            <ProjectCard p={projects[2]} fadeDelay={0.16} />
            <ProjectCard p={projects[3]} fadeDelay={0.24} hoverShadow="0 0 0 2px var(--color-primary)" />
          </div>
        </div>

        {/* Mobile — single column, fixed 280px height */}
        <div className="sm:hidden flex flex-col gap-4">
          {projects.map((p, i) => (
            <div key={p.title} className="relative overflow-hidden" style={{ height: '280px', borderRadius: '28px' }}>
              <ProjectCard p={p} fadeDelay={i * 0.08} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link
            to="/gallery"
            className="inline-flex items-center px-10 py-4 rounded-full"
            style={{ background: 'white', border: '2px solid var(--color-primary)', color: 'var(--color-primary)', fontSize: '15px', fontWeight: 600, transition: 'all 0.25s ease' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-primary)'; e.currentTarget.style.color = 'white' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = 'var(--color-primary)' }}
          >
            View All Work
          </Link>
        </div>

      </div>
    </section>
  )
}

/* ──────────────────────────────── SECTION 8 — TESTIMONIALS ──────────────────────────────── */
function Testimonials() {
  const reviews = businessConfig.testimonials.slice(0, 3)
  return (
    <section className="bg-white py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div {...fadeUp} className="mb-14">
          <p className="section-label mb-3">Client Stories</p>
          <h2 style={{ fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '-0.02em', lineHeight: 1.08 }}>
            <span style={{ display: 'block', fontWeight: 300, color: 'var(--color-dark)' }}>Loved by clients</span>
            <span style={{ display: 'block', fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800, fontStyle: 'italic', color: 'var(--color-primary)' }}>across {businessConfig.location.split(',')[0]}.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((t, i) => (
            <motion.div
              key={t.name}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.08 }}
              className="bg-[var(--color-cream)] p-8"
              style={{ borderRadius: '20px', boxShadow: '4px 4px 0px var(--color-primary)', transition: 'transform 0.2s, box-shadow 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-2px,-2px)'; e.currentTarget.style.boxShadow = '6px 6px 0px var(--color-primary)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translate(0,0)'; e.currentTarget.style.boxShadow = '4px 4px 0px var(--color-primary)' }}
            >
              <div className="text-[var(--color-primary)] mb-4" style={{ fontSize: '15px' }}>★★★★★</div>
              <p className="text-[var(--color-dark)]" style={{ fontWeight: 400, fontSize: '16px', lineHeight: 1.75 }}>&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3 mt-6">
                <div className="w-11 h-11 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center" style={{ fontWeight: 600, fontSize: '14px' }}>
                  {initials(t.name)}
                </div>
                <div>
                  <div className="text-[var(--color-dark)]" style={{ fontWeight: 600, fontSize: '15px' }}>{t.name}</div>
                  <div className="text-[var(--color-muted)]" style={{ fontWeight: 400, fontSize: '13px' }}>{t.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/testimonials"
            className="inline-flex items-center px-10 py-4 rounded-full"
            style={{ background: 'white', border: '2px solid var(--color-primary)', color: 'var(--color-primary)', fontSize: '15px', fontWeight: 600, transition: 'all 0.25s ease' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-primary)'; e.currentTarget.style.color = 'white' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = 'var(--color-primary)' }}
          >
            Read all reviews →
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────────────── SECTION 9 — CTA BANNER ──────────────────────────────── */

/* ──────────────────────────────── PAGE ──────────────────────────────── */
export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <WhoWeAre />
      <Services />
      <HowItWorks />
      <Projects />
      <Testimonials />
      <CTABanner />
    </>
  )
}
