import { motion } from 'framer-motion'
import { businessConfig } from '../businessConfig'
import Counter from './Counter'

export default function WhyChooseUs() {
  const { stats } = businessConfig
  const items = [
    { value: stats.years, suffix: '+', label: 'Years of experience' },
    { value: stats.clients, suffix: '+', label: 'Homes cleaned' },
    { value: stats.rating, suffix: '', label: 'Average rating' },
    { value: stats.reviews, suffix: '+', label: 'Five-star reviews' },
  ]

  return (
    <section className="bg-white section-padding overflow-hidden">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="section-label mb-4">Why Choose Us</p>
          <h2 className="font-bold text-text-dark leading-tight" style={{ fontSize: 'clamp(30px, 3.6vw, 46px)' }}>
            Numbers we&apos;re proud of
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {items.map((it, i) => (
            <motion.div
              key={it.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="font-bold text-primary leading-none" style={{ fontSize: 'clamp(44px, 6vw, 76px)' }}>
                <Counter value={it.value} suffix={it.suffix} />
              </div>
              <p className="text-muted text-sm mt-3">{it.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
