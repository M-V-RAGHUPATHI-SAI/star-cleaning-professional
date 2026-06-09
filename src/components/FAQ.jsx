import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { businessConfig } from '../businessConfig'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0)
  const faqs = businessConfig.faq

  return (
    <section id="faq" className="section-padding bg-bg-light overflow-hidden">
      <div className="container-page">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="section-label mb-4">FAQ</p>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-text-dark mb-6 leading-tight">
              Your questions,<br />our answers
            </h2>
            <p className="text-muted mb-12">
              Have questions about our cleaning services? We&apos;re here to make everything clear — from booking to pricing.
            </p>

            {/* Still Have Questions Card */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl border border-border flex items-center gap-6 card-shadow"
            >
              <div className="w-16 h-16 rounded-full bg-bg-light flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-headset text-2xl text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-bold text-text-dark mb-2">Still Have Questions?</h4>
                <p className="text-sm text-muted mb-4">We&apos;re here to help — reach out any time.</p>
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href={`tel:${businessConfig.phone}`}
                  className="btn-primary w-full py-3 rounded-xl font-medium text-center block text-white"
                >
                  Call {businessConfig.phone}
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - FAQ Items */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i
              return (
                <div
                  key={i}
                  className={`rounded-xl overflow-hidden transition-all duration-300 ${
                    isOpen
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-white border border-border'
                  }`}
                >
                  <button
                    className="w-full px-6 py-4 flex justify-between items-center font-bold text-left"
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  >
                    <span className={isOpen ? 'text-white' : 'text-text-dark'}>
                      {faq.q}
                    </span>
                    <motion.i
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      className={`fa-solid ${isOpen ? 'fa-chevron-up text-white' : 'fa-chevron-down text-muted'} text-sm ml-4 flex-shrink-0`}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && faq.a && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="px-6 pb-4 text-sm text-white/90 overflow-hidden"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
