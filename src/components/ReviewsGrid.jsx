import { motion } from 'framer-motion'
import { businessConfig } from '../businessConfig'

function Stars({ count }) {
  const full = Math.floor(count)
  const half = count % 1 !== 0
  return (
    <div className="flex text-yellow-400 text-sm gap-0.5">
      {[...Array(full)].map((_, i) => <i key={i} className="fa-solid fa-star" />)}
      {half && <i className="fa-solid fa-star-half-stroke" />}
    </div>
  )
}

function initials(name) {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
}

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
}
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

export default function ReviewsGrid() {
  return (
    <section className="section-padding bg-bg-light overflow-hidden">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="section-label mb-4">Client Stories</p>
          <h2 className="font-bold text-text-dark leading-tight" style={{ fontSize: 'clamp(30px, 3.6vw, 46px)' }}>
            What our clients say
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {businessConfig.testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={item}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl border border-[var(--color-lightGray)] p-8 flex flex-col"
            >
              <div className="mb-5"><Stars count={t.rating} /></div>
              <p className="text-text-dark/80 leading-relaxed mb-8 flex-1">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold text-sm">
                  {initials(t.name)}
                </div>
                <div>
                  <h4 className="font-bold text-text-dark">{t.name}</h4>
                  <p className="text-xs text-muted">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
