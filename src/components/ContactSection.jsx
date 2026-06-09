import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { businessConfig } from '../businessConfig'

// Determine which hours row matches today.
function todaysHoursKey() {
  const day = new Date().getDay() // 0 = Sun ... 6 = Sat
  const keys = Object.keys(businessConfig.hours)
  const findKey = (re) => keys.find((k) => re.test(k))
  if (day === 0) return findKey(/sun/i) || null
  if (day === 6) return findKey(/sat/i) || null
  // Weekday: prefer an explicit weekday range, else the first key.
  return findKey(/mon|week|fri/i) || keys[0]
}

export default function ContactSection() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', message: '' })
  const activeHours = todaysHoursKey()

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const msg =
      `Hi ${businessConfig.name}! I'd like to book a cleaning.%0A%0A` +
      `Name: ${form.name}%0A` +
      `Phone: ${form.phone}%0A` +
      `Email: ${form.email}%0A` +
      `Service: ${form.service || 'Not specified'}%0A` +
      `Message: ${form.message || '-'}`
    window.open(`https://wa.me/${businessConfig.whatsapp}?text=${msg}`, '_blank')
    setSent(true)
  }

  return (
    <section className="section-padding bg-white overflow-hidden">
      <div className="container-page">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left — form */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-bg-cream rounded-3xl p-8 md:p-10 border border-[var(--color-lightGray)]"
          >
            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-14"
                >
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-xl font-bold text-text-dark mb-2">Booking request sent!</h3>
                  <p className="text-muted text-sm">We&apos;ve opened WhatsApp — send the message and we&apos;ll confirm within 24 hours.</p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4"
                >
                  <p className="section-label mb-1">Book a Clean</p>
                  <h3 className="text-2xl font-bold text-text-dark mb-1">Schedule your cleaning</h3>
                  <p className="text-sm text-muted mb-3">Fill in your details and we&apos;ll get back to you promptly.</p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-text-dark mb-1">Full Name *</label>
                      <input required name="name" value={form.name} onChange={handleChange} placeholder="Jane Smith"
                        className="w-full px-4 py-3 rounded-lg border border-[var(--color-lightGray)] bg-white text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-text-dark mb-1">Phone</label>
                      <input name="phone" value={form.phone} onChange={handleChange} placeholder="+91 00000 00000"
                        className="w-full px-4 py-3 rounded-lg border border-[var(--color-lightGray)] bg-white text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text-dark mb-1">Email *</label>
                    <input required type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-lg border border-[var(--color-lightGray)] bg-white text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all" />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text-dark mb-1">Service</label>
                    <select name="service" value={form.service} onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-[var(--color-lightGray)] bg-white text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all">
                      <option value="">Select a service…</option>
                      {businessConfig.services.map((s) => <option key={s.name}>{s.name}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-text-dark mb-1">Message</label>
                    <textarea name="message" value={form.message} onChange={handleChange} rows={3} placeholder="Tell us about your space…"
                      className="w-full px-4 py-3 rounded-lg border border-[var(--color-lightGray)] bg-white text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition-all resize-none" />
                  </div>

                  <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} type="submit"
                    className="btn-primary w-full py-3.5 rounded-xl font-bold mt-1">
                    Send via WhatsApp
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right — info + hours */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <div className="p-8 rounded-2xl bg-bg-light border border-[var(--color-lightGray)]">
              <h3 className="font-bold text-text-dark text-lg mb-5 flex items-center gap-2">
                <i className="fa-solid fa-address-book text-primary" /> Contact Info
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-4 text-sm text-text-dark">
                  <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-primary border border-[var(--color-lightGray)]"><i className="fa-solid fa-location-dot" /></span>
                  <span>{businessConfig.address}</span>
                </li>
                <li className="flex items-center gap-4 text-sm text-text-dark">
                  <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-primary border border-[var(--color-lightGray)]"><i className="fa-solid fa-phone" /></span>
                  <a href={`tel:${businessConfig.phone}`} className="hover:text-primary transition-colors">{businessConfig.phone}</a>
                </li>
                <li className="flex items-center gap-4 text-sm text-text-dark">
                  <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-primary border border-[var(--color-lightGray)]"><i className="fa-solid fa-envelope" /></span>
                  <a href={`mailto:${businessConfig.email}`} className="hover:text-primary transition-colors">{businessConfig.email}</a>
                </li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl bg-bg-light border border-[var(--color-lightGray)]">
              <h3 className="font-bold text-text-dark text-lg mb-5 flex items-center gap-2">
                <i className="fa-solid fa-clock text-primary" /> Working Hours
              </h3>
              <ul className="space-y-2">
                {Object.entries(businessConfig.hours).map(([day, time]) => {
                  const isToday = day === activeHours
                  return (
                    <li key={day}
                      className={`flex justify-between items-center text-sm px-3 py-2 rounded-lg ${isToday ? 'bg-[var(--color-primary)] text-white' : ''}`}>
                      <span className={isToday ? 'font-semibold' : 'text-muted'}>
                        {day}{isToday && <span className="ml-2 text-[10px] uppercase tracking-wider opacity-80">Today</span>}
                      </span>
                      <span className="font-semibold">{time}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
