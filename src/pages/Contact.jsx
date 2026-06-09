import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { FaWhatsapp } from 'react-icons/fa'
import { businessConfig } from '../businessConfig'

const ease = [0.22, 1, 0.36, 1]

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease },
}

/* ─── INPUT STYLE ─── */
const inputStyle = {
  width: '100%',
  padding: '14px 18px',
  border: '2px solid var(--color-border)',
  borderRadius: '12px',
  fontFamily: 'Inter, sans-serif',
  fontSize: '15px',
  color: 'var(--color-dark)',
  background: 'var(--color-white)',
  outline: 'none',
  boxSizing: 'border-box',
}

/* ─── SECTION 1 — HERO ─── */
function Hero() {
  return (
    <section
      style={{
        background: 'var(--color-primary)',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
      className="pt-[120px] pb-12 px-6 lg:pt-[160px] lg:pb-20 lg:px-20"
    >
      <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '420px', height: '420px', borderRadius: '9999px', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-120px', left: '40%', width: '280px', height: '280px', borderRadius: '9999px', background: 'rgba(255,255,255,0.02)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '720px', position: 'relative', zIndex: 1 }}>
        <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', display: 'block', marginBottom: '20px' }}>
          CONTACT
        </span>
        <h1 style={{ margin: 0, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
          <span style={{ display: 'block', fontSize: 'clamp(44px,5vw,72px)', fontWeight: 300, color: 'white' }}>
            Let&apos;s start
          </span>
          <span style={{ display: 'block', fontSize: 'clamp(44px,5vw,72px)', fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800, fontStyle: 'italic', color: 'white' }}>
            your clean.
          </span>
        </h1>
        <p style={{ fontSize: '17px', fontWeight: 400, color: 'rgba(255,255,255,0.65)', maxWidth: '520px', lineHeight: 1.75, marginTop: '20px', marginBottom: '28px' }}>
          Book online, message us on WhatsApp, or pick a time that suits you. We reply within hours.
        </p>
      </div>
    </section>
  )
}

/* ─── SECTION 2 — FORM + INFO ─── */
function FormAndInfo() {
  const [name,    setName]    = useState('')
  const [phone,   setPhone]   = useState('')
  const [email,   setEmail]   = useState('')
  const [service, setService] = useState('')
  const [msg,     setMsg]     = useState('')

  const focusStyle = (active) => active
    ? { borderColor: 'var(--color-primary)', boxShadow: '0 0 0 3px rgba(28,63,58,0.08)' }
    : {}

  const [focused, setFocused] = useState({})
  const handleFocus = (f) => setFocused(p => ({ ...p, [f]: true }))
  const handleBlur  = (f) => setFocused(p => ({ ...p, [f]: false }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const text = `New booking request:\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nService: ${service}\nMessage: ${msg}`
    window.open(`https://wa.me/${businessConfig.whatsapp}?text=${encodeURIComponent(text)}`)
    setName(''); setPhone(''); setEmail(''); setService(''); setMsg('')
  }

  /* today's hours key */
  const _day = new Date().getDay() // 0=Sun … 6=Sat
  const _keys = Object.keys(businessConfig.hours)
  const _find = (re) => _keys.find(k => re.test(k))
  const todayKey = _day === 0 ? _find(/sun/i)
                 : _day === 6 ? _find(/sat/i)
                 : _find(/mon|week|fri/i) || _keys[0]

  return (
    <section style={{ background: 'var(--color-white)', padding: '112px 0' }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* ── LEFT: FORM ── */}
          <motion.div {...fadeUp}>
            <p style={{ fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-primary)', marginBottom: '12px' }}>
              BOOK A CLEAN
            </p>
            <h2 style={{ margin: 0, letterSpacing: '-0.02em', marginBottom: '12px' }}>
              <span style={{ display: 'block', fontWeight: 300, fontSize: '36px', color: 'var(--color-dark)', lineHeight: 1.1 }}>
                Schedule your
              </span>
              <span style={{ display: 'block', fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800, fontStyle: 'italic', fontSize: '36px', color: 'var(--color-primary)', lineHeight: 1.1 }}>
                cleaning.
              </span>
            </h2>
            <p style={{ fontWeight: 400, fontSize: '15px', color: 'var(--color-muted)', marginTop: '12px', marginBottom: '32px' }}>
              Fill in your details and we&apos;ll get back to you promptly.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Row 1: Name + Phone */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <input
                  type="text" placeholder="Full Name" required value={name}
                  onChange={e => setName(e.target.value)}
                  onFocus={() => handleFocus('name')} onBlur={() => handleBlur('name')}
                  style={{ ...inputStyle, ...focusStyle(focused.name), '::placeholder': { color: '#9ca3af' } }}
                />
                <input
                  type="tel" placeholder="Phone Number" required value={phone}
                  onChange={e => setPhone(e.target.value)}
                  onFocus={() => handleFocus('phone')} onBlur={() => handleBlur('phone')}
                  style={{ ...inputStyle, ...focusStyle(focused.phone) }}
                />
              </div>

              {/* Row 2: Email */}
              <input
                type="email" placeholder="Email Address" value={email}
                onChange={e => setEmail(e.target.value)}
                onFocus={() => handleFocus('email')} onBlur={() => handleBlur('email')}
                style={{ ...inputStyle, ...focusStyle(focused.email) }}
              />

              {/* Row 3: Service */}
              <select
                value={service} onChange={e => setService(e.target.value)}
                onFocus={() => handleFocus('service')} onBlur={() => handleBlur('service')}
                style={{ ...inputStyle, ...focusStyle(focused.service), color: service ? 'var(--color-dark)' : '#9ca3af' }}
              >
                <option value="" disabled>Select a service</option>
                {businessConfig.services.map(s => (
                  <option key={s.id}>{s.name}</option>
                ))}
              </select>

              {/* Row 4: Message */}
              <textarea
                placeholder="Message (optional)" rows={4} value={msg}
                onChange={e => setMsg(e.target.value)}
                onFocus={() => handleFocus('msg')} onBlur={() => handleBlur('msg')}
                style={{ ...inputStyle, ...focusStyle(focused.msg), resize: 'vertical' }}
              />

              {/* Submit */}
              <button
                type="submit"
                style={{
                  width: '100%', marginTop: '8px',
                  background: 'var(--color-primary)', color: 'white',
                  padding: '16px 32px', borderRadius: '12px',
                  fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: '15px',
                  border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--color-primaryDark)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--color-primary)'}
              >
                <FaWhatsapp size={18} />
                Send via WhatsApp
              </button>
            </form>
          </motion.div>

          {/* ── RIGHT: INFO CARDS ── */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

            {/* Card 1 — Contact Info */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.7, ease, delay: 0.1 }}
              style={{ background: 'var(--color-cream)', borderRadius: '20px', padding: '32px' }}
            >
              <p style={{ fontWeight: 700, fontSize: '18px', color: 'var(--color-dark)', marginBottom: '24px', marginTop: 0 }}>
                Contact Info
              </p>
              {[
                { icon: <MapPin size={18} />, text: businessConfig.address },
                { icon: <Phone size={18} />, text: businessConfig.phone },
                { icon: <Mail  size={18} />, text: businessConfig.email },
              ].map(({ icon, text }, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: i < 2 ? '20px' : 0 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}>
                    {icon}
                  </div>
                  <span style={{ fontWeight: 400, fontSize: '15px', color: 'var(--color-dark)' }}>{text}</span>
                </div>
              ))}
            </motion.div>

            {/* Card 2 — Hours */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.7, ease, delay: 0.2 }}
              style={{ background: 'var(--color-primary)', borderRadius: '20px', padding: '32px' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                <Clock size={18} color="white" />
                <p style={{ fontWeight: 700, fontSize: '18px', color: 'white', margin: 0 }}>Working Hours</p>
              </div>
              {Object.entries(businessConfig.hours).map(([day, time], i, arr) => {
                const isToday = day === todayKey
                return (
                  <div
                    key={day}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      borderBottom: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                      paddingBottom: i < arr.length - 1 ? '12px' : 0,
                      marginBottom: i < arr.length - 1 ? '12px' : 0,
                      ...(isToday ? { background: 'rgba(255,255,255,0.12)', borderRadius: '8px', padding: '8px 12px', marginLeft: '-12px', marginRight: '-12px' } : {}),
                    }}
                  >
                    <span style={{ fontWeight: 600, fontSize: '14px', color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {day}
                      {isToday && (
                        <span style={{ background: 'white', color: 'var(--color-primary)', fontWeight: 700, fontSize: '10px', padding: '2px 8px', borderRadius: '9999px' }}>
                          TODAY
                        </span>
                      )}
                    </span>
                    <span style={{ fontWeight: 400, fontSize: '14px', color: 'rgba(255,255,255,0.7)' }}>{time}</span>
                  </div>
                )
              })}
            </motion.div>

            {/* Card 3 — Quick buttons */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.7, ease, delay: 0.3 }}
              style={{ background: 'var(--color-white)', border: '2px solid var(--color-border)', borderRadius: '20px', padding: '24px', display: 'flex', gap: '12px' }}
            >
              <a
                href={`https://wa.me/${businessConfig.whatsapp}`}
                target="_blank" rel="noopener noreferrer"
                style={{
                  flex: 1, background: '#25D366', color: 'white',
                  padding: '12px', borderRadius: '12px',
                  fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '14px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  textDecoration: 'none', transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <FaWhatsapp size={16} /> WhatsApp
              </a>
              <a
                href={`tel:${businessConfig.phone}`}
                style={{
                  flex: 1, background: 'var(--color-primary)', color: 'white',
                  padding: '12px', borderRadius: '12px',
                  fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '14px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  textDecoration: 'none', transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
              >
                <Phone size={16} /> Call Us
              </a>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── SECTION 3 — CALENDLY ─── */
function CalendlySection() {
  const hasUrl = !!businessConfig.calendlyUrl

  useEffect(() => {
    if (!hasUrl) return
    const script = document.createElement('script')
    script.src  = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)
    return () => { document.body.removeChild(script) }
  }, [hasUrl])

  return (
    <section style={{ background: 'var(--color-lightGray)', padding: '96px 0' }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div {...fadeUp} style={{ marginBottom: '48px' }}>
          <p style={{ fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-primary)', marginBottom: '12px' }}>
            PREFER TO SCHEDULE?
          </p>
          <h2 style={{ margin: 0, letterSpacing: '-0.02em' }}>
            <span style={{ display: 'block', fontWeight: 300, fontSize: 'clamp(32px,4vw,48px)', color: 'var(--color-dark)', lineHeight: 1.1 }}>
              Pick a time that
            </span>
            <span style={{ display: 'block', fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800, fontStyle: 'italic', fontSize: 'clamp(32px,4vw,48px)', color: 'var(--color-primary)', lineHeight: 1.1 }}>
              works for you.
            </span>
          </h2>
          <p style={{ fontWeight: 400, fontSize: '16px', color: 'var(--color-muted)', marginTop: '16px', marginBottom: 0 }}>
            Book a free discovery call and we&apos;ll walk you through everything.
          </p>
        </motion.div>

        <motion.div
          {...fadeUp}
          transition={{ duration: 0.7, ease, delay: 0.15 }}
          style={{
            background: 'white',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0,0,0,0.08)',
            border: '1px solid var(--color-border)',
            minHeight: '700px',
          }}
        >
          {hasUrl ? (
            <div
              className="calendly-inline-widget"
              data-url={businessConfig.calendlyUrl}
              style={{ minWidth: '320px', height: '700px' }}
            />
          ) : (
            <div style={{ minHeight: '700px', background: '#f9fafb', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(28,63,58,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              </div>
              <p style={{ fontWeight: 500, fontSize: '16px', color: 'var(--color-muted)', marginTop: '16px', marginBottom: '12px' }}>
                Add your Calendly URL to businessConfig.js
              </p>
              <code style={{ background: 'rgba(28,63,58,0.08)', color: 'var(--color-primary)', fontFamily: 'monospace', padding: '8px 16px', borderRadius: '8px', fontSize: '14px' }}>
                businessConfig.calendlyUrl = &apos;your-calendly-link&apos;
              </code>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}

/* ─── SECTION 4 — MAP ─── */
function MapSection() {
  return (
    <section style={{ background: 'var(--color-white)', paddingTop: '96px', paddingBottom: 0 }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div {...fadeUp} style={{ marginBottom: '48px' }}>
          <p style={{ fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-primary)', marginBottom: '12px' }}>
            FIND US
          </p>
          <h2 style={{ margin: 0, letterSpacing: '-0.02em' }}>
            <span style={{ display: 'block', fontWeight: 300, fontSize: 'clamp(32px,4vw,48px)', color: 'var(--color-dark)', lineHeight: 1.1 }}>
              {businessConfig.location.split(',')[0]},
            </span>
            <span style={{ display: 'block', fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800, fontStyle: 'italic', fontSize: 'clamp(32px,4vw,48px)', color: 'var(--color-primary)', lineHeight: 1.1 }}>
              {businessConfig.location.split(',')[1]?.trim()}.
            </span>
          </h2>
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div style={{ borderRadius: '24px 24px 0 0', overflow: 'hidden', height: '450px' }} className="lg:h-[450px] h-[300px]">
          {businessConfig.mapsEmbed ? (
            <iframe
              src={businessConfig.mapsEmbed}
              width="100%" height="100%"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              title="Our location"
            />
          ) : (
            <div style={{ width: '100%', height: '100%', background: 'var(--color-lightGray)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <MapPin size={48} color="var(--color-primary)" />
              <p style={{ fontWeight: 500, fontSize: '14px', color: 'var(--color-muted)', marginTop: '12px' }}>
                Add Google Maps embed to businessConfig.js
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

/* ─── PAGE ─── */
export default function Contact() {
  return (
    <>
      <Hero />
      <FormAndInfo />
      <CalendlySection />
      <MapSection />
    </>
  )
}
