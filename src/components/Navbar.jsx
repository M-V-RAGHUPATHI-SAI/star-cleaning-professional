import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { businessConfig } from '../businessConfig'

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Testimonials', to: '/testimonials' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Home page has a light video background — use navy. Other pages have dark heroes — use white.
  const textColor = scrolled ? 'text-[var(--color-dark)]' : isHome ? 'text-[var(--color-primary)]' : 'text-white'
  const mutedColor = scrolled ? 'text-[var(--color-dark)]/60' : isHome ? 'text-[var(--color-primary)]/65' : 'text-white/70'

  return (
    <>
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md border-b border-[var(--color-border)]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">

          {/* Logo */}
          <Link to="/" className="tracking-tight flex-shrink-0" style={{ fontSize: '20px' }}>
            <span className="font-extrabold" style={{ color: scrolled || isHome ? 'var(--color-primary)' : 'var(--color-white)' }}>{businessConfig.namePart1}</span>
            {businessConfig.namePart2 && <span className="font-light" style={{ color: scrolled || isHome ? 'var(--color-secondary)' : 'var(--color-white)' }}> {businessConfig.namePart2}</span>}
          </Link>

          {/* Center links */}
          <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-7">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `transition-colors ${textColor} ${isActive ? 'opacity-100 font-semibold' : 'opacity-60 hover:opacity-100'}`
                }
                style={({ isActive }) => ({
                  fontSize: '13px',
                  letterSpacing: '0.01em',
                  paddingBottom: '3px',
                  borderBottom: isActive
                    ? `1.5px solid ${scrolled || isHome ? 'var(--color-primary)' : 'rgba(255,255,255,0.8)'}`
                    : '1.5px solid transparent',
                })}
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          {/* Right side — phone (lg+) + CTA */}
          <div className="hidden md:flex items-center gap-4 flex-shrink-0">
            {/* Phone — lg+ only */}
            <a
              href={`tel:${businessConfig.phone}`}
              className={`hidden lg:flex items-center gap-2 transition-colors ${mutedColor} hover:opacity-100`}
              style={{ fontSize: '13px' }}
            >
              <i className="fa-solid fa-phone text-xs" />
              <span style={{ fontWeight: 500 }}>{businessConfig.phone}</span>
            </a>

            {/* Divider — lg+ only */}
            <span className="hidden lg:block w-px h-4 bg-[var(--color-border)]" />

            {/* CTA pill */}
            <Link
              to={businessConfig.ctaPrimary.link}
              className="inline-flex items-center rounded-full font-semibold transition-colors"
              style={{
                padding: '8px 20px',
                fontSize: '13px',
                background: scrolled || isHome ? 'var(--color-primary)' : 'var(--color-white)',
                color: scrolled || isHome ? 'var(--color-white)' : 'var(--color-primary)',
              }}
            >
              {businessConfig.ctaPrimary.label}
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(true)}
            className={`md:hidden p-2 ${textColor}`}
            aria-label="Open menu"
          >
            <i className="fa-solid fa-bars text-2xl" />
          </button>
        </div>
      </div>

    </nav>

    {/* Mobile full-screen overlay — sibling of nav, never inside backdrop-filter parent */}
    <AnimatePresence>
      {open && (
        <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'var(--color-primary)',
              zIndex: 999,
              display: 'flex',
              flexDirection: 'column',
              padding: '0 32px 40px',
            }}
            className="md:hidden"
          >
            {/* Top bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px', flexShrink: 0 }}>
              <span style={{ fontSize: '22px', fontFamily: "'Inter', system-ui, sans-serif" }}>
                <span style={{ fontWeight: 800, color: 'var(--color-white)' }}>{businessConfig.namePart1}</span>
                {businessConfig.namePart2 && <span style={{ fontWeight: 300, color: 'var(--color-white)' }}> {businessConfig.namePart2}</span>}
              </span>
              <button onClick={() => setOpen(false)} style={{ padding: '8px', color: 'white', background: 'none', border: 'none', cursor: 'pointer' }} aria-label="Close menu">
                <i className="fa-solid fa-xmark" style={{ fontSize: '28px' }} />
              </button>
            </div>

            {/* Nav links */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0', marginTop: '48px', flex: 1 }}>
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                >
                  <NavLink
                    to={l.to}
                    onClick={() => setOpen(false)}
                    style={({ isActive }) => ({
                      display: 'block',
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: '32px',
                      fontWeight: 400,
                      letterSpacing: '-0.01em',
                      color: 'white',
                      opacity: isActive ? 1 : 0.5,
                      padding: '12px 0',
                      borderBottom: '1px solid rgba(255,255,255,0.1)',
                      textDecoration: 'none',
                    })}
                  >
                    {l.label}
                  </NavLink>
                </motion.div>
              ))}
            </div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: links.length * 0.07 + 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to={businessConfig.ctaPrimary.link}
                onClick={() => setOpen(false)}
                style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', padding: '16px', borderRadius: '9999px', background: 'var(--color-white)', color: 'var(--color-primary)', fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 700, fontSize: '16px', textDecoration: 'none' }}
              >
                {businessConfig.ctaPrimary.label}
              </Link>
            </motion.div>
          </motion.div>
        )}
    </AnimatePresence>
    </>
  )
}
