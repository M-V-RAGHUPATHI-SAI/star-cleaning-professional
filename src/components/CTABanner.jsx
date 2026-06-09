import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { businessConfig } from '../businessConfig'

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
}

const Star = ({ size, style }) => (
  <svg width={size} height={size} viewBox="0 0 50 50" fill="none" style={style}>
    <path d="M25 0 C25 0 27 20 50 25 C27 25 25 50 25 50 C25 50 23 25 0 25 C23 25 25 0 25 0Z" fill="white" opacity="0.9" />
  </svg>
)

export default function CTABanner() {
  return (
    <section className="py-20 px-12 lg:px-24" style={{ background: 'var(--color-primary)', position: 'relative', overflow: 'hidden' }}>
      <Star size={52} style={{ position: 'absolute', top: '20px', right: '140px', pointerEvents: 'none', zIndex: 1 }} />
      <Star size={32} style={{ position: 'absolute', top: '16px', right: '90px', opacity: 0.6, pointerEvents: 'none', zIndex: 1 }} />
      <Star size={20} style={{ position: 'absolute', top: '50px', right: '60px', opacity: 0.4, pointerEvents: 'none', zIndex: 1 }} />

      <motion.div
        {...fadeUp}
        className="max-w-6xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10"
        style={{ position: 'relative', zIndex: 2 }}
      >
        {/* Left */}
        <div>
          <h2 style={{ margin: 0 }}>
            <span style={{ display: 'block', fontSize: 'clamp(32px,4vw,56px)', fontWeight: 300, color: 'var(--color-white)', letterSpacing: '-0.02em', lineHeight: 1.1, fontFamily: 'var(--font-primary, Inter), sans-serif' }}>
              {businessConfig.ctaBannerHeadline}
            </span>
          </h2>
          <p style={{ fontWeight: 400, fontSize: '16px', color: 'rgba(255,255,255,0.65)', marginTop: '16px', maxWidth: '28rem', lineHeight: 1.75 }}>
            {businessConfig.ctaBannerSubtext}
          </p>
        </div>

        {/* Right — buttons */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-4 lg:items-stretch lg:min-w-[200px]" style={{ flexShrink: 0 }}>
          <Link
            to={businessConfig.ctaPrimary.link}
            style={{ display: 'inline-block', textAlign: 'center', textDecoration: 'none', background: 'white', color: 'var(--color-primary)', fontWeight: 700, fontSize: '15px', padding: '14px 32px', borderRadius: '9999px', border: '2px solid white', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-primaryDark)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'var(--color-primaryDark)'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.3)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = 'var(--color-primary)'; e.currentTarget.style.borderColor = 'white'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
          >
            {businessConfig.ctaPrimary.label}
          </Link>
          <Link
            to={businessConfig.ctaSecondary.link}
            style={{ display: 'inline-block', textAlign: 'center', textDecoration: 'none', background: 'transparent', color: 'white', fontWeight: 500, fontSize: '15px', padding: '14px 32px', borderRadius: '9999px', border: '2px solid rgba(255,255,255,0.35)', cursor: 'pointer', transition: 'all 0.3s cubic-bezier(0.22,1,0.36,1)' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.8)'; e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.2)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
          >
            {businessConfig.ctaSecondary.label}
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
