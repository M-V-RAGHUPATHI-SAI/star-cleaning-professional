import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { businessConfig } from '../businessConfig'

export default function CTA({
  title = "Ready for a space you don't have to think about?",
  subtitle = "Book your first clean today — same-day slots are usually available.",
}) {
  return (
    <section className="bg-[var(--color-primary)] py-24 relative overflow-hidden">
      {/* subtle decorations */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-10 left-10 w-40 h-40 bg-white/5 rounded-full blur-2xl pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 14, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-0 right-16 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none"
      />

      <div className="container-page relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10 text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-xl mx-auto md:mx-0"
        >
          <h2 className="text-white font-bold leading-tight" style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}>
            {title}
          </h2>
          {subtitle && <p className="mt-4 text-white/70">{subtitle}</p>}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-col sm:flex-row gap-4 justify-center md:justify-end flex-shrink-0"
        >
          <Link
            to={businessConfig.ctaPrimary.link}
            className="bg-white text-[var(--color-primary)] px-8 py-4 rounded-full font-bold hover:bg-[var(--color-cream)] transition-colors text-center"
          >
            {businessConfig.ctaPrimary.label}
          </Link>
          <Link
            to={businessConfig.ctaSecondary.link}
            className="border border-white/50 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-colors text-center"
          >
            {businessConfig.ctaSecondary.label}
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
