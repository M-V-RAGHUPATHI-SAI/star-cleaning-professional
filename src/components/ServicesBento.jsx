import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { businessConfig } from '../businessConfig'
import Icon from './Icon'

const easeOut = [0.22, 1, 0.36, 1]
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut, delay: i * 0.08 } }),
}

export default function ServicesBento() {
  const s = businessConfig.services
  const { stats } = businessConfig

  return (
    <section className="bg-[var(--color-cream)] py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12"
        >
          <div>
            <p className="section-label mb-3">What We Offer</p>
            <h2 className="font-extrabold text-[var(--color-dark)]" style={{ fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Cleaning solutions<br className="hidden sm:block" /> for every space
            </h2>
          </div>
          <Link to="/services" className="text-[var(--color-primary)] font-medium text-sm whitespace-nowrap hover:underline">
            View all services →
          </Link>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto">
          {/* Card 1 — large featured (col 1-2, row 1) */}
          <motion.div
            custom={0} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="md:col-span-2 bg-[var(--color-primary)] text-white rounded-[20px] p-10 flex flex-col min-h-[280px]"
          >
            <Icon name={s[0].icon} size={32} className="text-white" />
            <h3 className="mt-auto font-bold text-white" style={{ fontSize: '26px' }}>{s[0].name}</h3>
            <p className="text-white/70 mt-2" style={{ fontSize: '15px' }}>{s[0].oneliner}</p>
            <Link to="/services" className="text-white font-medium mt-4 inline-flex items-center gap-2 group" style={{ fontSize: '14px' }}>
              Learn more <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>

          {/* Card 2 — tall image (col 3, rows 1-2) */}
          <motion.div
            custom={1} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="md:row-span-2 relative rounded-[20px] overflow-hidden min-h-[280px] group"
          >
            <img src={s[1].image} alt={s[1].name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onError={e => { e.target.style.display = 'none' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--color-primary) 0%, transparent 60%)' }} />
            <div className="absolute bottom-0 left-0 p-7">
              <span className="inline-block px-3 py-1 rounded-full bg-white/15 backdrop-blur border border-white/30 text-white text-[11px] font-semibold uppercase tracking-wider mb-3">
                {s[1].name.split(' ')[0]}
              </span>
              <h3 className="text-white font-bold" style={{ fontSize: '20px' }}>{s[1].name}</h3>
              <p className="text-white/70 mt-1" style={{ fontSize: '13px' }}>{s[1].oneliner}</p>
            </div>
          </motion.div>

          {/* Card 3 — small stat (col 1, row 2) */}
          <motion.div
            custom={2} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="bg-white border border-[var(--color-border)] rounded-[20px] p-8 flex flex-col justify-center"
          >
            <div className="font-extrabold text-[var(--color-primary)]" style={{ fontSize: '48px', lineHeight: 1 }}>{stats.clients}+</div>
            <div className="text-[var(--color-muted)] mt-2" style={{ fontSize: '14px' }}>Homes cleaned and counting</div>
          </motion.div>

          {/* Card 4 — wide service (col 2-3, row... ) */}
          <motion.div
            custom={3} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="md:col-span-2 bg-white border border-[var(--color-border)] rounded-[20px] p-9 flex items-center justify-between gap-6"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-[var(--color-primary)] text-white flex items-center justify-center mb-4">
                <Icon name={s[2].icon} size={18} />
              </div>
              <h3 className="font-bold text-[var(--color-dark)]" style={{ fontSize: '22px' }}>{s[2].name}</h3>
              <p className="text-[var(--color-muted)] mt-1" style={{ fontSize: '14px' }}>{s[2].oneliner}</p>
              <Link to="/services" className="text-[var(--color-primary)] font-medium mt-3 inline-flex items-center gap-2 group" style={{ fontSize: '14px' }}>
                Learn more <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
            <img src={s[2].image} alt={s[2].name} className="w-[100px] h-[100px] rounded-xl object-cover flex-shrink-0 hidden sm:block" onError={e => { e.target.style.display = 'none' }} />
          </motion.div>

          {/* Card 5 — wide service (col 1-2) */}
          <motion.div
            custom={4} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="md:col-span-2 bg-white border border-[var(--color-border)] rounded-[20px] p-9 flex items-center justify-between gap-6"
          >
            <div>
              <div className="w-11 h-11 rounded-xl bg-[var(--color-primary)] text-white flex items-center justify-center mb-4">
                <Icon name={s[3].icon} size={18} />
              </div>
              <h3 className="font-bold text-[var(--color-dark)]" style={{ fontSize: '22px' }}>{s[3].name}</h3>
              <p className="text-[var(--color-muted)] mt-1" style={{ fontSize: '14px' }}>{s[3].oneliner}</p>
              <Link to="/services" className="text-[var(--color-primary)] font-medium mt-3 inline-flex items-center gap-2 group" style={{ fontSize: '14px' }}>
                Learn more <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
            <img src={s[3].image} alt={s[3].name} className="w-[100px] h-[100px] rounded-xl object-cover flex-shrink-0 hidden sm:block" onError={e => { e.target.style.display = 'none' }} />
          </motion.div>

          {/* Card 6 — dark small (col 3) */}
          <motion.div
            custom={5} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="bg-[var(--color-primary)] text-white rounded-[20px] p-8 flex flex-col justify-center items-start"
          >
            <h3 className="font-bold text-white" style={{ fontSize: '22px' }}>Ready to book?</h3>
            <p className="text-white/60 mt-2" style={{ fontSize: '14px' }}>Same-day slots are usually available.</p>
            <Link to={businessConfig.ctaPrimary.link} className="mt-5 inline-flex items-center px-6 py-3 rounded-full bg-white text-[var(--color-dark)] font-bold text-sm hover:bg-[var(--color-cream)] transition-colors">
              {businessConfig.ctaPrimary.label}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
