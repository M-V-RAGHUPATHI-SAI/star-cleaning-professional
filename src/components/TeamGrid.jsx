import { motion } from 'framer-motion'
import { businessConfig } from '../businessConfig'

const socials = [
  { icon: 'fa-brands fa-x-twitter', href: '#' },
  { icon: 'fa-brands fa-linkedin-in', href: '#' },
  { icon: 'fa-brands fa-instagram', href: businessConfig.social.instagram },
]

function initials(name) {
  return name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
}

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
}
const item = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

export default function TeamGrid() {
  return (
    <section className="section-padding bg-bg-light overflow-hidden">
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <p className="section-label mb-4">Our Team</p>
          <h2 className="font-bold text-text-dark leading-tight" style={{ fontSize: 'clamp(30px, 3.6vw, 46px)' }}>
            The people who take care of your space
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {businessConfig.team.map((member) => (
            <motion.div
              key={member.name}
              variants={item}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl border border-[var(--color-lightGray)] p-8 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center mx-auto mb-5">
                {member.image ? (
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover rounded-full" />
                ) : (
                  <span className="text-2xl font-bold">{initials(member.name)}</span>
                )}
              </div>
              <h4 className="text-lg font-bold text-text-dark mb-1">{member.name}</h4>
              <p className="text-sm text-primary font-medium mb-3">{member.role}</p>
              <p className="text-sm text-muted mb-5">{member.bio}</p>
              <div className="flex justify-center gap-2">
                {socials.map((so) => (
                  <a
                    key={so.icon}
                    href={so.href}
                    className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--color-lightGray)] text-muted hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)] transition-colors"
                  >
                    <i className={so.icon} />
                  </a>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
