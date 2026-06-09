import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { businessConfig } from '../businessConfig'

const easeOut = [0.22, 1, 0.36, 1]
const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } }
const item = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } } }

export default function ProjectsShowcase() {
  return (
    <section className="bg-[var(--color-lightGray)] py-28 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="section-label mb-3">Our Work</p>
          <h2 className="font-extrabold text-[var(--color-dark)]" style={{ fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '-0.02em' }}>
            Spaces we&apos;ve transformed
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 gap-6"
        >
          {businessConfig.projects.map((p) => (
            <motion.div
              key={p.title}
              variants={item}
              className="group relative rounded-[20px] overflow-hidden aspect-[4/3] cursor-pointer"
            >
              <img src={p.img} alt={p.title} className="w-full h-full object-cover transition-transform duration-[600ms] group-hover:scale-105" onError={e => { e.target.style.display = 'none' }} />

              {/* Hover overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: 'linear-gradient(to top, rgba(var(--color-darkRgb),0.70) 0%, rgba(var(--color-darkRgb),0.38) 35%, rgba(var(--color-darkRgb),0.10) 65%, rgba(var(--color-darkRgb),0.0) 100%)' }}
              />
              <div className="absolute bottom-0 left-0 p-7 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className="inline-block px-3 py-1 rounded-full bg-[var(--color-primary)]/30 backdrop-blur border border-[var(--color-primary)]/50 text-white text-xs font-semibold mb-3">
                  {p.category}
                </span>
                <h3 className="text-white font-bold" style={{ fontSize: '20px' }}>{p.title}</h3>
                <p className="text-white/70 text-[13px] flex items-center gap-2 mt-1">
                  <i className="fa-solid fa-location-dot" /> {p.location}
                </p>
              </div>

              {/* Corner arrow */}
              <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <i className="fa-solid fa-arrow-up-right-from-square text-sm" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="text-center mt-14">
          <Link to="/gallery" className="inline-flex items-center px-10 py-4 rounded-full bg-[var(--color-primary)] text-white font-bold hover:bg-[var(--color-primaryDark)] transition-colors duration-300">
            View All Work
          </Link>
        </div>
      </div>
    </section>
  )
}
