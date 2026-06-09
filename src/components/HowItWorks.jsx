import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { businessConfig } from '../businessConfig'

export default function HowItWorks() {
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
    document.querySelectorAll('.hiw-step').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const goTo = (i) => {
    const el = document.getElementById(`hiw-${i}`)
    if (!el) return
    const top = el.getBoundingClientRect().top - document.body.getBoundingClientRect().top - 120
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <section className="bg-white py-28">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left panel — sticky on desktop */}
          <div className="lg:sticky" style={{ top: '80px', alignSelf: 'flex-start', maxWidth: '380px' }}>
            <p className="section-label mb-3">How It Works</p>
            <h2 style={{ fontSize: 'clamp(32px, 4vw, 42px)', letterSpacing: '-0.02em', lineHeight: 1.08, marginBottom: '20px' }}>
              <span style={{ display: 'block', fontWeight: 300, color: 'var(--color-dark)' }}>Our cleaning</span>
              <span style={{ display: 'block', fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800, fontStyle: 'italic', color: 'var(--color-primary)' }}>process.</span>
            </h2>
            <p style={{ fontWeight: 400, fontSize: '16px', color: 'var(--color-muted)', lineHeight: 1.8, maxWidth: '340px' }}>
              Booking a clean takes minutes. Here&apos;s exactly what happens from the moment you reach out.
            </p>
            <Link
              to={businessConfig.ctaPrimary.link}
              className="inline-flex items-center px-8 py-3 rounded-full bg-[var(--color-primary)] text-white font-semibold"
              style={{ marginTop: '20px', marginBottom: '12px' }}
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
                      marginBottom: isLast ? 0 : '16px',
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

            {/* Mobile tab list */}
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

          {/* Mobile right panel — progress line + cards */}
          <div className="lg:hidden" style={{ position: 'relative' }}>
            <div style={{ position: 'absolute', left: '7px', top: '8px', bottom: '8px', width: '2px', background: 'var(--color-border)', borderRadius: '9999px', zIndex: 0 }} />
            <div style={{
              position: 'absolute', left: '7px', top: '8px', width: '2px', borderRadius: '9999px',
              background: 'linear-gradient(to bottom, var(--color-primary), var(--color-primaryDark))',
              boxShadow: '0 0 8px rgba(var(--color-darkRgb),0.7), 0 0 16px rgba(var(--color-darkRgb),0.3)',
              height: `${steps.length > 1 ? (active / (steps.length - 1)) * 100 : 0}%`,
              transition: 'height 0.6s cubic-bezier(0.22,1,0.36,1)', zIndex: 0
            }} />

            {steps.map((step, i) => (
              <div
                key={i}
                id={`hiw-${i}`}
                data-i={i}
                className="hiw-step"
                style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', paddingLeft: '28px', position: 'relative', marginBottom: '48px' }}
              >
                <div style={{
                  position: 'absolute', left: '0px', top: '20px',
                  width: '16px', height: '16px', borderRadius: '9999px',
                  background: i <= active ? 'var(--color-primary)' : 'var(--color-border)',
                  boxShadow: i === active ? '0 0 0 4px rgba(28,63,58,0.15), 0 0 14px rgba(28,63,58,0.6)' : 'none',
                  transition: 'all 0.5s ease', zIndex: 2, flexShrink: 0
                }} />
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

          {/* Desktop right panel */}
          <div className="hidden lg:block space-y-20 pb-24">
            {steps.map((step, i) => (
              <div
                key={step.number}
                id={`hiw-${i}`}
                data-i={i}
                className={`hiw-step transition-all duration-700 ${active === i ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-6'}`}
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
