import { motion } from 'framer-motion'

export default function VideoSection({ label, title, videos = [], bg = 'bg-bg-light' }) {
  if (!videos.length) return null
  const single = videos.length === 1

  return (
    <section className={`section-padding ${bg} overflow-hidden`}>
      <div className="container-page">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          {label && <p className="section-label mb-4">{label}</p>}
          <h2 className="font-bold text-text-dark leading-tight" style={{ fontSize: 'clamp(28px, 3.4vw, 44px)' }}>
            {title}
          </h2>
        </motion.div>

        <div className={`grid gap-8 ${single ? 'max-w-3xl mx-auto' : 'md:grid-cols-2'}`}>
          {videos.map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl overflow-hidden border border-[var(--color-lightGray)] bg-black aspect-video"
            >
              <iframe
                src={src}
                title={`Video ${i + 1}`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
