import { motion } from 'framer-motion'

// Reusable inner-page banner — dark ink background with the page keyword behind.
export default function PageHero({ label, title, subtitle, keyword }) {
  return (
    <section className="relative bg-[var(--color-primary)] text-white overflow-hidden pt-40 pb-24">
      {/* Background keyword */}
      {keyword && (
        <div
          style={{
            position: 'absolute',
            fontSize: '20vw',
            fontWeight: 900,
            color: 'var(--color-white)',
            opacity: 0.04,
            top: '55%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            letterSpacing: '-0.02em',
            userSelect: 'none',
            lineHeight: 1,
          }}
        >
          {keyword}
        </div>
      )}

      <div className="container-page relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          {label && (
            <p className="uppercase text-white/70 mb-5" style={{ fontWeight: 600, fontSize: '11px', letterSpacing: '0.12em' }}>{label}</p>
          )}
          <h1 className="font-bold leading-[1.05]" style={{ fontSize: 'clamp(40px, 5vw, 68px)' }}>
            {title}
          </h1>
          {subtitle && (
            <p className="mt-6 text-white/70 text-lg max-w-xl leading-relaxed">{subtitle}</p>
          )}
        </motion.div>
      </div>
    </section>
  )
}
