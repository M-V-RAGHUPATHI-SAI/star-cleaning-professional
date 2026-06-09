import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { businessConfig } from '../businessConfig'
import CountUp from '../components/CountUp'
import Icon from '../components/Icon'
import CTABanner from '../components/CTABanner'

const ease = [0.22, 1, 0.36, 1]

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease },
}

function initials(name) {
  return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
}

/* ─── SECTION 1 — HERO ─── */
function Hero() {
  return (
    <section
      style={{ background: 'var(--color-primary)', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}
      className="pt-[120px] pb-12 px-6 lg:pt-[160px] lg:pb-20 lg:px-20"
    >
      {/* Decorative circles */}
      <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '420px', height: '420px', borderRadius: '9999px', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-120px', left: '40%', width: '280px', height: '280px', borderRadius: '9999px', background: 'rgba(255,255,255,0.02)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: '720px', position: 'relative', zIndex: 1 }}>
        <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', display: 'block', marginBottom: '20px' }}>
          OUR STORY
        </span>
        <h1 style={{ margin: 0, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
          <span style={{ display: 'block', fontSize: 'clamp(44px,5vw,72px)', fontWeight: 300, color: 'white' }}>
            People behind
          </span>
          <span style={{ display: 'block', fontSize: 'clamp(44px,5vw,72px)', fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800, fontStyle: 'italic', color: 'white' }}>
            the clean.
          </span>
        </h1>
        <p style={{ fontSize: '17px', fontWeight: 400, color: 'rgba(255,255,255,0.65)', maxWidth: '520px', lineHeight: 1.75, marginTop: '20px', marginBottom: 0 }}>
          {businessConfig.aboutHeroSubtitle}
        </p>
      </div>
    </section>
  )
}

/* ─── SECTION 2 — OUR STORY ─── */
function Story() {
  return (
    <section className="py-16 lg:py-28" style={{ background: 'var(--color-white)' }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Left — image */}
          <motion.div {...fadeUp}>
            <div style={{ height: '520px', borderRadius: '24px', overflow: 'hidden' }}>
              <img
                src={businessConfig.aboutImage}
                alt="Our Story"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={e => { e.target.style.display = 'none' }}
              />
            </div>
          </motion.div>

          {/* Right — text */}
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }}>
            <span style={{ display: 'block', fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '16px' }}>
              Our Story
            </span>
            <h2 style={{ lineHeight: 1.06, letterSpacing: '-0.02em', margin: 0 }}>
              <span style={{ display: 'block', fontSize: 'clamp(32px,3.5vw,44px)', fontWeight: 300, color: 'var(--color-dark)' }}>
                Built on a
              </span>
              <span style={{ display: 'block', fontSize: 'clamp(32px,3.5vw,44px)', fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800, fontStyle: 'italic', color: 'var(--color-primary)' }}>
                simple promise.
              </span>
            </h2>
            <p style={{ fontSize: '16px', fontWeight: 400, color: 'var(--color-muted)', lineHeight: 1.8, marginTop: '24px' }}>
              {businessConfig.story}
            </p>

            {/* Founded row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '32px' }}>
              <div style={{ flex: 1, height: '1px', background: 'var(--color-border)' }} />
              <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-dark)', whiteSpace: 'nowrap' }}>
                Founded {businessConfig.founded} · {businessConfig.location}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─── SECTION 3 — VALUES ─── */
function Values() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.2 })

  const isDown = useRef(false)
  const startX = useRef(0)
  const scrollLeftVal = useRef(0)

  const onMouseDown = (e) => {
    isDown.current = true
    containerRef.current.style.cursor = 'grabbing'
    startX.current = e.pageX
    scrollLeftVal.current = containerRef.current.scrollLeft
  }
  const onMouseMove = (e) => {
    if (!isDown.current) return
    e.preventDefault()
    containerRef.current.scrollLeft = scrollLeftVal.current - (e.pageX - startX.current) * 1.5
  }
  const stopDrag = () => {
    isDown.current = false
    if (containerRef.current) containerRef.current.style.cursor = 'grab'
  }

  return (
    <section style={{ background: 'var(--color-lightGray)', padding: '112px 0' }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        <motion.div {...fadeUp} style={{ marginBottom: '56px' }}>
          <span style={{ display: 'block', fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '16px' }}>
            What We Stand For
          </span>
          <h2 style={{ lineHeight: 1.06, letterSpacing: '-0.02em', margin: 0 }}>
            <span style={{ display: 'block', fontSize: 'clamp(32px,3.5vw,48px)', fontWeight: 300, color: 'var(--color-dark)' }}>Our values,</span>
            <span style={{ display: 'block', fontSize: 'clamp(32px,3.5vw,48px)', fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800, fontStyle: 'italic', color: 'var(--color-primary)' }}>in every clean.</span>
          </h2>
        </motion.div>

        {/* Mobile 2×2 grid */}
        <div className="grid grid-cols-2 lg:hidden" style={{ gap: '12px' }}>
          {businessConfig.values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              style={{ background: 'white', borderRadius: '16px', padding: '20px 16px', border: '1.5px solid var(--color-border)', boxShadow: '4px 4px 0px var(--color-primary)' }}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: '9999px', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                <Icon name={v.icon} size={18} className="text-white" />
              </div>
              <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-dark)', margin: '0 0 8px 0' }}>{v.title}</h3>
              <p style={{ fontSize: '12px', color: 'var(--color-muted)', lineHeight: 1.6, margin: 0 }}>{v.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Desktop 4-column grid */}
        <div
          className="hidden lg:grid"
          style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginTop: '48px' }}
        >
          {businessConfig.values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.4 }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4, boxShadow: '9px 9px 0px var(--color-primary)' }}
              style={{ background: 'white', borderRadius: '20px', padding: '32px 28px', border: '1.5px solid var(--color-border)', boxShadow: '6px 6px 0px var(--color-primary)', cursor: 'default', transition: 'transform 0.2s, box-shadow 0.2s' }}
            >
              <div style={{ width: '48px', height: '48px', background: 'var(--color-primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Icon name={v.icon} size={22} className="text-white" />
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-dark)', margin: '0 0 8px 0' }}>{v.title}</h3>
              <p style={{ fontSize: '14px', color: 'var(--color-muted)', lineHeight: 1.65, margin: 0 }}>{v.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── SECTION 4 — TEAM ─── */
function Team() {
  return (
    <section style={{ background: 'var(--color-white)', padding: '112px 0' }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        <motion.div {...fadeUp} style={{ marginBottom: '56px' }}>
          <span style={{ display: 'block', fontSize: '11px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '16px' }}>
            Our Team
          </span>
          <h2 style={{ lineHeight: 1.06, letterSpacing: '-0.02em', margin: 0 }}>
            <span style={{ display: 'block', fontSize: 'clamp(32px,3.5vw,48px)', fontWeight: 300, color: 'var(--color-dark)' }}>The people who take</span>
            <span style={{ display: 'block', fontSize: 'clamp(32px,3.5vw,48px)', fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800, fontStyle: 'italic', color: 'var(--color-primary)' }}>care of your space.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {businessConfig.team.map((member, i) => (
            <motion.div
              key={member.name}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.08 }}
              style={{ background: 'white', borderRadius: '20px', padding: '28px', border: '2px solid var(--color-primary)', textAlign: 'center', transition: 'transform 0.2s, box-shadow 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(28,63,58,0.12)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
            >
              {member.image ? (
                <img src={member.image} alt={member.name} style={{ width: '80px', height: '80px', borderRadius: '9999px', objectFit: 'cover', margin: '0 auto 16px' }} />
              ) : (
                <div style={{ width: '80px', height: '80px', borderRadius: '9999px', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <span style={{ color: 'white', fontSize: '20px', fontWeight: 700 }}>{initials(member.name)}</span>
                </div>
              )}

              <div style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-dark)' }}>{member.name}</div>
              <div style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-primary)', marginTop: '4px' }}>{member.role}</div>
              <div style={{ fontSize: '13px', fontWeight: 400, color: 'var(--color-muted)', marginTop: '12px', lineHeight: 1.6 }}>{member.bio}</div>

              {/* Social icons — only rendered when URL is set in businessConfig.team[].social */}
              {member.social && (member.social.linkedin || member.social.instagram) && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
                  {[
                    { icon: 'fa-brands fa-linkedin-in', url: member.social.linkedin },
                    { icon: 'fa-brands fa-instagram',   url: member.social.instagram },
                  ].filter(s => s.url).map(({ icon, url }) => (
                    <a
                      key={icon}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ width: '32px', height: '32px', borderRadius: '9999px', background: 'var(--color-lightGray)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-dark)', textDecoration: 'none', transition: 'all 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-primary)'; e.currentTarget.style.color = 'var(--color-white)' }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-lightGray)'; e.currentTarget.style.color = 'var(--color-dark)' }}
                    >
                      <i className={icon} style={{ fontSize: '12px' }} />
                    </a>
                  ))}
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
export default function About() {
  return (
    <>
      <Hero />
      <Story />
      <Values />
      <Team />
      <CTABanner />
    </>
  )
}
