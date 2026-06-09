import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { businessConfig } from '../businessConfig'

const easeOut = [0.22, 1, 0.36, 1]
const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }
const item = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } } }

function initials(name) {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
}

export default function TestimonialsStrip() {
  const reviews = businessConfig.testimonials.slice(0, 3)

  return (
    <section className="bg-white py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="section-label mb-3">Client Stories</p>
          <h2 className="font-extrabold text-[var(--color-dark)]" style={{ fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '-0.02em' }}>
            Loved by clients across {businessConfig.location.split(',')[0]}
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6"
        >
          {reviews.map((t) => (
            <motion.div key={t.name} variants={item} className="bg-[var(--color-cream)] rounded-[20px] p-8">
              <div className="text-[var(--color-primary)] mb-4" style={{ fontSize: '15px' }}>★★★★★</div>
              <span className="block font-light text-[var(--color-primary)] leading-none" style={{ fontSize: '36px' }}>&ldquo;</span>
              <p className="text-[var(--color-dark)] -mt-3" style={{ fontSize: '16px', lineHeight: 1.75 }}>{t.text}</p>
              <div className="flex items-center gap-3 mt-6">
                <div className="w-11 h-11 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-semibold text-sm">
                  {initials(t.name)}
                </div>
                <div>
                  <div className="font-semibold text-[var(--color-dark)]" style={{ fontSize: '15px' }}>{t.name}</div>
                  <div className="text-[var(--color-muted)]" style={{ fontSize: '13px' }}>{t.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-12">
          <Link to="/testimonials" className="inline-flex items-center px-8 py-3 rounded-full border border-[var(--color-dark)] text-[var(--color-dark)] font-medium hover:bg-[var(--color-primary)] hover:border-[var(--color-primary)] hover:text-white transition-colors">
            Read all reviews →
          </Link>
        </div>
      </div>
    </section>
  )
}
