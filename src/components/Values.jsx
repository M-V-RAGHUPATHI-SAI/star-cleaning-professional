import { motion } from 'framer-motion'
import { businessConfig } from '../businessConfig'
import Icon from './Icon'

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

export default function Values() {
  return (
    <section className="section-padding bg-bg-cream overflow-hidden">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="section-label mb-4">What We Stand For</p>
          <h2 className="font-bold text-text-dark leading-tight" style={{ fontSize: 'clamp(30px, 3.6vw, 46px)' }}>
            Our values, in every clean
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {businessConfig.values.map((v) => (
            <motion.div
              key={v.title}
              variants={item}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl border border-[var(--color-lightGray)] p-8"
            >
              <div className="w-14 h-14 rounded-xl bg-[var(--color-primary)] text-white flex items-center justify-center mb-6">
                <Icon name={v.icon} size={22} />
              </div>
              <h3 className="text-lg font-bold text-text-dark mb-2">{v.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{v.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
