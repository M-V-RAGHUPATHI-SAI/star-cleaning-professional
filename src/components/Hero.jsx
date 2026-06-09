import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { businessConfig } from '../businessConfig'

const easeOut = [0.22, 1, 0.36, 1]

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
}
const item = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } }
}

const trustChips = [
  '✓ Vetted Team',
  '✓ Same-Day Booking',
  '✓ Eco-Friendly',
  '✓ Satisfaction Guarantee',
]

export default function Hero() {
  return (
    <header className="relative bg-[var(--color-primary)] text-white min-h-screen flex items-center overflow-hidden pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div variants={container} initial="hidden" animate="visible">
            {/* Trust chip */}
            <motion.div variants={item} className="inline-flex items-center gap-2 bg-white/10 border border-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-[13px] font-medium">
              <span className="text-yellow-400">★</span> {businessConfig.stats.rating} · Rated Best in {businessConfig.location.split(',')[0]}
            </motion.div>

            {/* Headline */}
            <motion.h1 variants={item} className="mt-6" style={{ letterSpacing: '-0.02em', lineHeight: 1.05 }}>
              <span className="block font-light" style={{ fontSize: 'clamp(44px, 5.5vw, 72px)' }}>{businessConfig.headlineLight}</span>
              <span className="block font-extrabold italic" style={{ fontSize: 'clamp(44px, 5.5vw, 72px)' }}>{businessConfig.headlineBold}</span>
            </motion.h1>

            {/* Subtext */}
            <motion.p variants={item} className="mt-6 text-white/70" style={{ fontSize: '17px', lineHeight: 1.7, maxWidth: '460px' }}>
              {businessConfig.heroSubtext}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={item} className="mt-9 flex flex-col sm:flex-row gap-4">
              <Link to={businessConfig.ctaPrimary.link} className="bg-white text-[var(--color-dark)] font-bold px-8 py-3.5 rounded-full text-center hover:bg-[var(--color-cream)] transition-colors">
                {businessConfig.ctaPrimary.label}
              </Link>
              <Link to={businessConfig.ctaSecondary.link} className="border-2 border-white/40 text-white bg-transparent px-8 py-3.5 rounded-full text-center hover:border-white hover:bg-white/10 transition-colors">
                {businessConfig.ctaSecondary.label}
              </Link>
            </motion.div>

            {/* Trust chips row */}
            <motion.div variants={item} className="mt-12 flex flex-wrap gap-x-6 gap-y-3">
              {trustChips.map((c) => (
                <span key={c} className="text-[13px] font-medium text-white/70">{c}</span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — card stack */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: easeOut }}
            className="relative hidden lg:block"
          >
            {/* Main card */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-[var(--color-primary)]">
              <img src={businessConfig.heroImage} alt={businessConfig.name} className="w-full h-full object-cover opacity-90" onError={e => { e.target.style.display = 'none' }} />
            </div>

            {/* Floating stat card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6, ease: easeOut }}
              className="absolute bottom-8 -left-8 bg-white rounded-xl p-4 shadow-xl"
            >
              <div className="text-[var(--color-dark)] font-extrabold text-2xl">{businessConfig.stats.clients}+</div>
              <div className="text-[var(--color-muted)] text-xs">Homes Cleaned</div>
            </motion.div>

            {/* Floating rating card */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05, duration: 0.6, ease: easeOut }}
              className="absolute top-8 -right-4 bg-white rounded-xl p-4 shadow-xl"
            >
              <div className="text-[var(--color-primary)] tracking-tight">★★★★★</div>
              <div className="text-[var(--color-dark)] font-semibold text-sm mt-0.5">{businessConfig.stats.rating} Rating</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </header>
  )
}
