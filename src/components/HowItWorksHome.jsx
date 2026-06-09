import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { businessConfig } from '../businessConfig'

export default function HowItWorksHome() {
  const steps = businessConfig.howItWorks
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveStep(parseInt(entry.target.getAttribute('data-step-index')))
          }
        })
      },
      { threshold: 0.5, rootMargin: '-20% 0px -20% 0px' }
    )
    document.querySelectorAll('.hiw-step').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const scrollToStep = (i) => {
    const el = document.getElementById(`hiw-${i}`)
    if (!el) return
    const top = el.getBoundingClientRect().top - document.body.getBoundingClientRect().top - 120
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <section className="bg-white py-28">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Sticky left */}
          <div className="lg:sticky lg:top-28 h-fit self-start">
            <p className="section-label mb-3">How It Works</p>
            <h2 className="font-extrabold text-[var(--color-dark)] mb-5" style={{ fontSize: 'clamp(32px, 4vw, 42px)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Our cleaning process
            </h2>
            <p className="text-[var(--color-muted)] max-w-sm" style={{ fontSize: '16px', lineHeight: 1.8 }}>
              Booking a clean takes minutes. Here&apos;s exactly what happens from the moment you reach out.
            </p>
            <Link to={businessConfig.ctaPrimary.link} className="mt-8 inline-flex items-center px-8 py-3 rounded-full bg-[var(--color-primary)] text-white font-semibold">
              {businessConfig.ctaPrimary.label}
            </Link>

            {/* Step tabs */}
            <div className="mt-10 space-y-2">
              {steps.map((step, i) => {
                const active = activeStep === i
                return (
                  <button
                    key={step.number}
                    onClick={() => scrollToStep(i)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all duration-300 ${
                      active ? 'bg-[var(--color-primary)] text-white' : 'text-[var(--color-dark)]/40 hover:text-[var(--color-dark)]/70'
                    }`}
                  >
                    <span className="font-extrabold">{step.number}</span>
                    <span className={active ? 'font-semibold' : 'font-normal'}>{step.title}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Scrolling right */}
          <div className="space-y-20 pb-24">
            {steps.map((step, i) => (
              <div
                key={step.number}
                id={`hiw-${i}`}
                data-step-index={i}
                className={`hiw-step transition-all duration-700 ${activeStep === i ? 'opacity-100 translate-y-0' : 'opacity-30 translate-y-6'}`}
              >
                <div className="relative rounded-2xl overflow-hidden aspect-video">
                  <img src={step.img} alt={step.title} className="w-full h-full object-cover" onError={e => { e.target.style.display = 'none' }} />
                  <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold" style={{ fontSize: '18px' }}>
                    {step.number}
                  </div>
                </div>
                <h3 className="font-bold text-[var(--color-dark)] mt-6" style={{ fontSize: '28px' }}>{step.title}</h3>
                <p className="text-[var(--color-muted)] mt-3" style={{ fontSize: '16px', lineHeight: 1.8 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
