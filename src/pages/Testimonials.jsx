import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { businessConfig } from '../businessConfig'
import { StaggerTestimonials } from '../components/ui/stagger-testimonials'
import CTABanner from '../components/CTABanner'

const ease = [0.22, 1, 0.36, 1]

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease },
}

function InitialsAvatar({ name, size = 44 }) {
  const parts = name.trim().split(' ')
  const initials = parts.length >= 2
    ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    : parts[0].slice(0, 2).toUpperCase()
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: 'var(--color-primary)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexShrink: 0,
    }}>
      <span style={{ color: 'white', fontWeight: 700, fontSize: size * 0.32, fontFamily: 'Inter, sans-serif' }}>
        {initials}
      </span>
    </div>
  )
}

function StarRow({ rating = 5, size = 18 }) {
  return (
    <div style={{ display: 'flex', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} style={{ fontSize: size, color: i <= Math.round(rating) ? 'var(--color-primary)' : '#d1d5db', lineHeight: 1 }}>★</span>
      ))}
    </div>
  )
}

/* ─── SECTION 1 — HERO ─── */
function Hero() {
  return (
    <section
      style={{ background: 'var(--color-primary)', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}
      className="pt-[120px] pb-12 px-6 lg:pt-[160px] lg:pb-20 lg:px-20"
    >
      <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '420px', height: '420px', borderRadius: '9999px', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-120px', left: '40%', width: '280px', height: '280px', borderRadius: '9999px', background: 'rgba(255,255,255,0.02)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '720px', position: 'relative', zIndex: 1 }}>
        <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', display: 'block', marginBottom: '20px' }}>
          Testimonials
        </span>
        <h1 style={{ margin: 0, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
          <span style={{ display: 'block', fontSize: 'clamp(44px,5vw,72px)', fontWeight: 300, color: 'white' }}>
            Don&apos;t take our
          </span>
          <span style={{ display: 'block', fontSize: 'clamp(44px,5vw,72px)', fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800, fontStyle: 'italic', color: 'white' }}>
            word for it.
          </span>
        </h1>
        <p style={{ fontSize: '17px', fontWeight: 400, color: 'rgba(255,255,255,0.65)', maxWidth: '520px', lineHeight: 1.75, marginTop: '20px', marginBottom: '28px' }}>
          Real reviews from real clients across {businessConfig.city} who trust {businessConfig.name} with their space.
        </p>
      </div>
    </section>
  )
}

/* ─── SECTION 2 — RATING SUMMARY ─── */
function RatingSummary() {
  const ref         = useRef(null)
  const inView      = useInView(ref, { once: true, margin: '-50px' })
  const ratingValue = businessConfig.stats[2].num       // "4.9"
  const reviewCount = businessConfig.stats[3]
  const chars       = ratingValue.split('')             // ['4', '.', '9']
  const charDelays  = [0.1, 0.25, 0.4]

  return (
    <section style={{ background: 'var(--color-white)', padding: '80px 0' }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div
          ref={ref}
          style={{
            maxWidth: '560px', margin: '0 auto',
            background: 'var(--color-cream)', borderRadius: '24px',
            padding: '48px', textAlign: 'center',
          }}
        >
          {/* Stars — scale in with spring, staggered */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '16px' }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.span
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 + (i - 1) * 0.08 }}
                style={{ display: 'inline-block', fontSize: '32px', color: 'var(--color-primary)' }}
              >
                ★
              </motion.span>
            ))}
          </div>

          {/* Slot machine ticker — each char falls down into place */}
          <div style={{ fontWeight: 800, fontSize: '80px', color: 'var(--color-dark)', lineHeight: 1, fontFamily: 'Inter, sans-serif', display: 'flex', justifyContent: 'center', alignItems: 'baseline' }}>
            {chars.map((char, i) => (
              <div key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
                <motion.span
                  style={{ display: 'inline-block' }}
                  initial={{ y: '-100%' }}
                  animate={inView ? { y: '0%' } : {}}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: charDelays[i] }}
                >
                  {char}
                </motion.span>
              </div>
            ))}
          </div>

          {/* Supporting text */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease, delay: 0.7 }}
            style={{ fontWeight: 500, fontSize: '18px', color: 'var(--color-dark)', marginTop: '12px', marginBottom: 0 }}
          >
            Rated {ratingValue} out of 5 by {reviewCount.num}{reviewCount.suffix} happy clients
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease, delay: 0.8 }}
            style={{ fontWeight: 400, fontSize: '15px', color: 'var(--color-muted)', marginTop: '8px', marginBottom: 0 }}
          >
            Across {businessConfig.location}, families and businesses trust {businessConfig.name}.
          </motion.p>

          {/* Verified badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease, delay: 0.9 }}
            style={{ marginTop: '32px' }}
          >
            <span style={{
              display: 'inline-block',
              background: 'var(--color-primary)', color: 'white',
              padding: '10px 24px', borderRadius: '9999px',
              fontWeight: 600, fontSize: '14px',
              fontFamily: 'Inter, sans-serif',
            }}>
              ✓ Verified Reviews
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─── SECTION 3 — RETRO CAROUSEL ─── */
function CarouselSection() {
  return (
    <section style={{ background: 'var(--color-lightGray)', padding: '112px 0' }}>
      {/* Heading stays constrained */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div {...fadeUp} style={{ marginBottom: '56px' }}>
          <p style={{ fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-primary)', marginBottom: '16px' }}>
            Client Stories
          </p>
          <h2 style={{ margin: 0, letterSpacing: '-0.02em' }}>
            <span style={{ display: 'block', fontWeight: 300, fontSize: 'clamp(32px,4vw,48px)', color: 'var(--color-dark)', lineHeight: 1.1 }}>
              What our clients
            </span>
            <span style={{ display: 'block', fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800, fontStyle: 'italic', fontSize: 'clamp(32px,4vw,48px)', color: 'var(--color-primary)', lineHeight: 1.1 }}>
              say about us.
            </span>
          </h2>
        </motion.div>
      </div>

      {/* Carousel breaks out to full section width — no max-w constraint */}
      <StaggerTestimonials
        testimonials={businessConfig.testimonials.map((t, i) => ({
          testimonial: t.text,
          by:          `${t.name}, ${t.designation || t.location}`,
          imgSrc:      `https://i.pravatar.cc/150?img=${i + 1}`,
        }))}
      />
    </section>
  )
}

/* ─── SECTION 4 — STATIC REVIEW GRID ─── */
function ReviewGrid() {
  const reviews = businessConfig.testimonials

  return (
    <section style={{ background: 'var(--color-white)', padding: '112px 0' }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div {...fadeUp} style={{ marginBottom: '56px' }}>
          <p style={{ fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-primary)', marginBottom: '16px' }}>
            More Reviews
          </p>
          <h2 style={{ margin: 0, letterSpacing: '-0.02em' }}>
            <span style={{ display: 'block', fontWeight: 300, fontSize: 'clamp(32px,4vw,48px)', color: 'var(--color-dark)', lineHeight: 1.1 }}>
              Loved by clients
            </span>
            <span style={{ display: 'block', fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800, fontStyle: 'italic', fontSize: 'clamp(32px,4vw,48px)', color: 'var(--color-primary)', lineHeight: 1.1 }}>
              across {businessConfig.city}.
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease, delay: i * 0.08 }}
              style={{
                background: 'var(--color-cream)',
                borderRadius: '20px',
                padding: '32px',
                boxShadow: '4px 4px 0px var(--color-primary)',
                transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translate(-2px,-2px)'
                e.currentTarget.style.boxShadow = '6px 6px 0px var(--color-primary)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translate(0,0)'
                e.currentTarget.style.boxShadow = '4px 4px 0px var(--color-primary)'
              }}
            >
              <StarRow rating={r.rating} size={18} />

              <p style={{ fontSize: '16px', fontWeight: 400, color: 'var(--color-dark)', lineHeight: 1.75, marginTop: '16px', marginBottom: 0 }}>
                &ldquo;{r.text}&rdquo;
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '24px' }}>
                <InitialsAvatar name={r.name} size={44} />
                <div>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: '15px', color: 'var(--color-dark)' }}>{r.name}</p>
                  <p style={{ margin: 0, fontWeight: 400, fontSize: '13px', color: 'var(--color-muted)' }}>{r.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp} style={{ textAlign: 'center', marginTop: '56px' }}>
          <a
            href="https://g.page/r/purespace-reviews"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block', padding: '12px 32px',
              border: '2px solid var(--color-primary)', color: 'var(--color-primary)',
              borderRadius: '9999px', fontWeight: 600, fontSize: '15px',
              textDecoration: 'none', transition: 'all 0.2s ease',
              fontFamily: 'Inter, sans-serif',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-primary)'; e.currentTarget.style.color = 'white' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-primary)' }}
          >
            Read all reviews →
          </a>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── SECTION 5 — VIDEO TESTIMONIALS ─── */
function VideoTestimonials() {
  const videos = businessConfig.testimonialVideos

  return (
    <section style={{ background: 'var(--color-lightGray)', padding: '96px 0' }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div {...fadeUp} style={{ marginBottom: '48px' }}>
          <p style={{ fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-primary)', marginBottom: '16px' }}>
            In Their Words
          </p>
          <h2 style={{ margin: 0, letterSpacing: '-0.02em' }}>
            <span style={{ display: 'block', fontWeight: 300, fontSize: 'clamp(32px,4vw,44px)', color: 'var(--color-dark)', lineHeight: 1.1 }}>
              Video
            </span>
            <span style={{ display: 'block', fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800, fontStyle: 'italic', fontSize: 'clamp(32px,4vw,44px)', color: 'var(--color-primary)', lineHeight: 1.1 }}>
              testimonials.
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {videos.map((url, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ duration: 0.7, ease, delay: i * 0.12 }}
              style={{ borderRadius: '20px', overflow: 'hidden', aspectRatio: '16/9', position: 'relative' }}
            >
              {url ? (
                <video
                  src={url}
                  controls
                  playsInline
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', background: '#000' }}
                />
              ) : (
                <div style={{
                  width: '100%', height: '100%',
                  background: 'rgba(28,63,58,0.1)',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  <div style={{
                    width: '64px', height: '64px', borderRadius: '50%',
                    background: 'var(--color-primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '24px', color: 'white',
                  }}>
                    ▶
                  </div>
                  <p style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-muted)', marginTop: '16px', marginBottom: 0 }}>
                    Client testimonial coming soon
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── PAGE ─── */
export default function Testimonials() {
  return (
    <>
      <Hero />
      <RatingSummary />
      <CarouselSection />
      <ReviewGrid />
      <VideoTestimonials />
      <CTABanner />
    </>
  )
}
