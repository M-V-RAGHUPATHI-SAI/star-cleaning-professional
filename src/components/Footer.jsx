import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail } from 'lucide-react'
import { businessConfig } from '../businessConfig'

const topLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'Testimonials', to: '/testimonials' },
  { label: 'Contact', to: '/contact' },
]

const socials = [
  { icon: 'fa-brands fa-facebook-f', href: businessConfig.social.facebook },
  { icon: 'fa-brands fa-instagram', href: businessConfig.social.instagram },
  { icon: 'fa-brands fa-youtube', href: businessConfig.social.youtube || '' },
]

// Which hours row matches today.
function todaysHoursKey() {
  const day = new Date().getDay() // 0 Sun … 6 Sat
  const keys = Object.keys(businessConfig.hours)
  const find = (re) => keys.find((k) => re.test(k))
  if (day === 0) return find(/sun/i) || null
  if (day === 6) return find(/sat/i) || null
  return find(/mon|week|fri/i) || keys[0]
}

export default function Footer() {
  const today = todaysHoursKey()

  return (
    <footer className="bg-white pt-20 pb-8">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-[var(--color-border)]">
          {/* Brand */}
          <div>
            <span style={{ fontWeight: 800, fontSize: '26px' }}>
              <span style={{ color: 'var(--color-secondary)' }}>{businessConfig.namePart1}</span>{businessConfig.namePart2 && <span style={{ color: 'var(--color-primary)' }}> {businessConfig.namePart2}</span>}
            </span>
            <p className="text-[var(--color-dark)] mt-2" style={{ fontWeight: 400, fontSize: '13px' }}>{businessConfig.tagline}</p>
            <p className="text-[var(--color-dark)] mt-4" style={{ fontWeight: 400, fontSize: '14px', lineHeight: 1.7 }}>
              Professional cleaning for homes and offices across {businessConfig.location}. Trusted, vetted, and obsessed with the details.
            </p>
            <div className="flex gap-4 mt-6">
              {socials.filter((s) => s.href).map((s) => (
                <a
                  key={s.icon}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: '#f3f4f6', color: 'var(--color-dark)', transition: 'all 0.25s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-primary)'; e.currentTarget.style.color = 'white' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#f3f4f6'; e.currentTarget.style.color = 'var(--color-dark)' }}
                >
                  <i className={`${s.icon} text-sm`} />
                </a>
              ))}
            </div>
          </div>

          {/* Working Hours */}
          <div>
            <h4 className="text-[var(--color-primary)] mb-6" style={{ fontWeight: 700, fontSize: '15px', letterSpacing: '-0.01em' }}>
              Working Hours
              <div style={{ width: '28px', height: '2.5px', background: 'var(--color-primary)', marginTop: '8px', borderRadius: '2px' }} />
            </h4>
            <ul className="space-y-3 text-sm">
              {Object.entries(businessConfig.hours).map(([day, time], i, arr) => {
                const on = day === today
                return (
                  <li
                    key={day}
                    className={`flex justify-between ${i < arr.length - 1 ? 'border-b border-[var(--color-border)] pb-3' : ''}`}
                  >
                    <span className="text-[var(--color-dark)]" style={{ fontWeight: 600 }}>{day}</span>
                    <span className="text-[var(--color-dark)]">{time}</span>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Top Links */}
          <div>
            <h4 className="text-[var(--color-primary)] mb-6" style={{ fontWeight: 700, fontSize: '15px', letterSpacing: '-0.01em' }}>
              Top Links
              <div style={{ width: '28px', height: '2.5px', background: 'var(--color-primary)', marginTop: '8px', borderRadius: '2px' }} />
            </h4>
            <ul className="space-y-3">
              {topLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="inline-block text-[var(--color-dark)] hover:text-[var(--color-primary)] hover:pl-2 transition-all" style={{ fontWeight: 400, fontSize: '14px' }}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[var(--color-primary)] mb-6" style={{ fontWeight: 700, fontSize: '15px', letterSpacing: '-0.01em' }}>
              Contact Us
              <div style={{ width: '28px', height: '2.5px', background: 'var(--color-primary)', marginTop: '8px', borderRadius: '2px' }} />
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3 text-[var(--color-dark)]" style={{ fontWeight: 400, fontSize: '13px' }}>
                <Phone className="w-4 h-4 text-[var(--color-muted)] mt-0.5 shrink-0" />
                <a href={`tel:${businessConfig.phone}`} className="hover:text-[var(--color-primary)] transition-colors">{businessConfig.phone}</a>
              </li>
              <li className="flex gap-3 text-[var(--color-dark)]" style={{ fontWeight: 400, fontSize: '13px' }}>
                <MapPin className="w-4 h-4 text-[var(--color-muted)] mt-0.5 shrink-0" />
                <span>{businessConfig.address}</span>
              </li>
              <li className="flex gap-3 text-[var(--color-dark)]" style={{ fontWeight: 400, fontSize: '13px' }}>
                <Mail className="w-4 h-4 text-[var(--color-muted)] mt-0.5 shrink-0" />
                <a href={`mailto:${businessConfig.email}`} className="hover:text-[var(--color-primary)] transition-colors">{businessConfig.email}</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Massive brand name */}
        <div className="border-t border-[var(--color-border)] pt-8 text-center overflow-hidden">
          <h2 style={{ fontSize: '13vw', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.02em', textAlign: 'center', userSelect: 'none' }}>
            <span style={{ color: 'var(--color-secondary)' }}>{businessConfig.namePart1}</span>{businessConfig.namePart2 && <span style={{ color: 'var(--color-primary)' }}> {businessConfig.namePart2}</span>}
          </h2>
        </div>

        {/* Copyright */}
        <div className="mt-6 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[var(--color-muted)]" style={{ fontWeight: 400, fontSize: '12px' }}>
            © {new Date().getFullYear()} {businessConfig.name}. All Rights Reserved.
          </p>
          <p className="text-[var(--color-muted)]" style={{ fontWeight: 400, fontSize: '12px' }}>
            <a href={businessConfig.legalUrls.terms} className="hover:text-[var(--color-primary)] transition-colors">Terms &amp; Conditions</a>
            <span className="mx-2">·</span>
            <a href={businessConfig.legalUrls.privacy} className="hover:text-[var(--color-primary)] transition-colors">Privacy Policy</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
