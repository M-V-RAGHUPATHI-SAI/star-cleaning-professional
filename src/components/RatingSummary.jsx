import { motion } from 'framer-motion'
import { businessConfig } from '../businessConfig'
import Counter from './Counter'

export default function RatingSummary() {
  const { stats } = businessConfig
  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-bg-cream rounded-3xl border border-[var(--color-lightGray)] p-10 md:p-14 text-center"
        >
          <div className="flex justify-center text-yellow-400 text-2xl gap-1 mb-5">
            {[...Array(5)].map((_, i) => <i key={i} className="fa-solid fa-star" />)}
          </div>
          <div className="font-bold text-primary leading-none mb-3" style={{ fontSize: 'clamp(56px, 9vw, 110px)' }}>
            <Counter value={stats.rating} />
          </div>
          <p className="text-text-dark font-semibold text-lg mb-2">
            Rated {stats.rating} out of 5 by {stats.reviews}+ happy clients
          </p>
          <p className="text-muted max-w-xl mx-auto">
            Across {businessConfig.location}, families and businesses trust {businessConfig.name} to keep their spaces spotless.
          </p>

          <div className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full bg-[var(--color-primary)] text-white text-sm font-semibold">
            <i className="fa-solid fa-circle-check" /> Verified Reviews
          </div>
        </motion.div>
      </div>
    </section>
  )
}
