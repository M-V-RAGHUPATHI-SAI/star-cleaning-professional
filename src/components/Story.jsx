import { motion } from 'framer-motion'
import { businessConfig } from '../businessConfig'

export default function Story() {
  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container-page">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl overflow-hidden aspect-[4/5] order-1 lg:order-none"
          >
            <img src="https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=80" alt={`${businessConfig.name} story`} className="w-full h-full object-cover" onError={e => { e.target.style.display = 'none' }} />
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-label mb-4">Our Story</p>
            <h2 className="font-bold text-text-dark leading-tight mb-6" style={{ fontSize: 'clamp(30px, 3.6vw, 46px)' }}>
              Built on a simple promise
            </h2>
            <p className="text-muted leading-relaxed mb-5">{businessConfig.story}</p>
            <p className="text-muted leading-relaxed">{businessConfig.about}</p>

            <div className="mt-8 flex items-center gap-3 text-sm text-text-dark">
              <span className="w-10 h-px bg-[var(--color-primary)]" />
              <span className="font-semibold">Founded {businessConfig.founded} · {businessConfig.location}</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
