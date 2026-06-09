import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { businessConfig } from '../businessConfig'
import Counter from './Counter'

const easeOut = [0.22, 1, 0.36, 1]

export default function WhoWeAre() {
  const { stats } = businessConfig

  return (
    <section className="bg-white py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="rounded-2xl overflow-hidden aspect-[4/5] bg-[var(--color-lightGray)]"
          >
            <img src={businessConfig.aboutImage} alt={businessConfig.name} className="w-full h-full object-cover" onError={e => { e.target.style.display = 'none' }} />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: easeOut, delay: 0.1 }}
          >
            <p className="section-label mb-4">Who We Are</p>
            <h2 className="text-[var(--color-dark)]" style={{ letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              <span className="block font-light" style={{ fontSize: 'clamp(32px, 4vw, 44px)' }}>A clean space creates</span>
              <span className="block font-extrabold" style={{ fontSize: 'clamp(32px, 4vw, 44px)' }}>a clearer mind.</span>
            </h2>

            <p className="mt-6 text-[var(--color-muted)]" style={{ fontSize: '16px', lineHeight: 1.8 }}>
              {businessConfig.about}
            </p>

            {/* Stats */}
            <div className="mt-10 flex gap-12">
              <div>
                <div className="font-extrabold text-[var(--color-primary)]" style={{ fontSize: '42px' }}>
                  <Counter value={stats.clients} suffix="+" />
                </div>
                <div className="text-[var(--color-muted)] text-[13px] mt-1">Homes Cleaned</div>
              </div>
              <div>
                <div className="font-extrabold text-[var(--color-primary)]" style={{ fontSize: '42px' }}>
                  <Counter value={stats.rating} />
                </div>
                <div className="text-[var(--color-muted)] text-[13px] mt-1">Average Rating</div>
              </div>
            </div>

            <Link to="/about" className="group mt-8 inline-flex items-center gap-2 font-semibold text-[var(--color-primary)]" style={{ fontSize: '15px' }}>
              More About Us
              <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
