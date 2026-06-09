import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { businessConfig } from '../businessConfig'
import Icon from './Icon'

export default function ServicesList() {
  const services = businessConfig.services
  const [active, setActive] = useState(0)
  const s = services[active]

  return (
    <section id="services" className="section-padding bg-white overflow-hidden">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <p className="section-label mb-4">Our Services</p>
          <h2 className="font-bold text-text-dark leading-tight" style={{ fontSize: 'clamp(30px, 3.8vw, 50px)' }}>
            Precision-driven cleaning solutions
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left — vertical list */}
          <div>
            {services.map((service, i) => {
              const isActive = i === active
              return (
                <button
                  key={service.name}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => setActive(i)}
                  className={`w-full text-left border-l-2 pl-6 py-6 transition-all duration-300 ${
                    isActive ? 'border-[var(--color-primary)]' : 'border-[var(--color-lightGray)] hover:border-[var(--color-primary)]/40'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`text-sm font-mono ${isActive ? 'text-primary' : 'text-muted'}`}>
                      0{i + 1}
                    </span>
                    <h3 className={`text-2xl md:text-3xl font-bold transition-colors ${isActive ? 'text-text-dark' : 'text-muted'}`}>
                      {service.name}
                    </h3>
                  </div>
                  <AnimatePresence>
                    {isActive && (
                      <motion.p
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-muted text-sm mt-2 overflow-hidden pl-9"
                      >
                        {service.oneliner}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </button>
              )
            })}
          </div>

          {/* Right — large card */}
          <div className="lg:sticky lg:top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="bg-bg-cream rounded-3xl overflow-hidden border border-[var(--color-lightGray)]"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={s.image} alt={s.name} className="w-full h-full object-cover" onError={e => { e.target.style.display = 'none' }} />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-[var(--color-primary)] text-white flex items-center justify-center">
                      <Icon name={s.icon} size={18} />
                    </div>
                    <h3 className="text-2xl font-bold text-text-dark">{s.name}</h3>
                  </div>
                  <p className="text-muted leading-relaxed mb-6">{s.description}</p>
                  <ul className="grid sm:grid-cols-2 gap-3 mb-8">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-text-dark/80">
                        <i className="fa-solid fa-check text-primary text-xs" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link to={businessConfig.ctaPrimary.link} className="btn-primary px-7 py-3.5 rounded-full font-semibold inline-block">
                    {businessConfig.ctaPrimary.label}
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
