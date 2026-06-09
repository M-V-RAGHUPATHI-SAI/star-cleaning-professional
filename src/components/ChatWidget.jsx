import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { businessConfig } from '../businessConfig'

const ease = [0.22, 1, 0.36, 1]

const GROQ_ENDPOINT = '/api/chat'
const GROQ_MODEL = 'llama-3.1-8b-instant'

/* Build the system prompt from businessConfig */
function buildSystemPrompt() {
  const b = businessConfig

  const services = b.services.map(s =>
    `• ${s.name} (${s.price})\n  ${s.description}\n  Includes: ${s.features.join(', ')}`
  ).join('\n\n')

  const hours = Object.entries(b.hours).map(([day, time]) => `  ${day}: ${time}`).join('\n')

  const faq = b.faq.map(f => `Q: ${f.q}\nA: ${f.a}`).join('\n\n')

  return `You are a warm, professional booking assistant for ${b.name} — a premium cleaning company in ${b.location}.

ABOUT ${b.name.toUpperCase()}:
${b.about}
Founded: ${b.founded} | Rating: 4.9★ | ${b.stats[1].num}${b.stats[1].suffix} clients served | ${b.stats[3].num} five-star reviews
Values: Trustworthy service, eco-friendly products, transparent quotes, premium quality, fully equipped teams.

SERVICES & PRICING:
${services}

AREAS SERVED:
${b.city} and surrounding areas.

BUSINESS HOURS:
${hours}

CONTACT:
  Phone: ${b.phone}
  Email: ${b.email}
  WhatsApp: https://wa.me/${b.whatsapp}
  Address: ${b.address}
  Online booking: ${b.calendlyUrl}

HOW IT WORKS:
1. Contact us for a free quote
2. Receive a personalised quote based on your needs
3. Our fully equipped team arrives and delivers the clean
4. We conduct a quality check to ensure satisfaction

FREQUENTLY ASKED QUESTIONS:
${faq}

INSTRUCTIONS:
- Be friendly, warm, and concise. You represent a premium brand.
- Answer questions about services, pricing, areas, and booking confidently using the information above.
- When someone wants to book, guide them to ${b.calendlyUrl} or offer to take their name and preferred date/time so the team can confirm via WhatsApp.
- For quotes, gather: type of property, number of rooms, and preferred date — then say the team will send a tailored quote.
- Keep replies under 4 sentences unless more detail is genuinely needed.
- Never invent information not listed above. If unsure, offer to connect them via WhatsApp: https://wa.me/${b.whatsapp}
- Do not discuss competitors or make negative comparisons.`
}

/* ─── ICONS (inline SVG, no emoji) ─── */
function SparkleIcon({ size = 24, color = 'white' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 2l1.8 5.6L19.5 9l-5.7 1.4L12 16l-1.8-5.6L4.5 9l5.7-1.4L12 2z" fill={color} />
      <path d="M19 14l.7 2.2L22 17l-2.3.8L19 20l-.7-2.2L16 17l2.3-.8L19 14z" fill={color} opacity="0.7" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
      <line x1="6" y1="6" x2="18" y2="18" /><line x1="18" y1="6" x2="6" y2="18" />
    </svg>
  )
}

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}

/* ─── TYPING INDICATOR ─── */
function TypingDots() {
  return (
    <div style={{ alignSelf: 'flex-start', background: 'white', border: '1px solid var(--color-border)', borderRadius: '4px 16px 16px 16px', padding: '12px 16px', display: 'flex', gap: '4px' }}>
      {[0, 1, 2].map(i => (
        <motion.span
          key={i}
          style={{ width: 6, height: 6, borderRadius: '50%', background: '#9ca3af', display: 'inline-block' }}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

/* ─── MESSAGE BUBBLE ─── */
function Bubble({ role, children }) {
  const isUser = role === 'user'
  return (
    <div
      style={{
        alignSelf: isUser ? 'flex-end' : 'flex-start',
        maxWidth: '85%',
        background: isUser ? 'var(--color-primary)' : 'white',
        color: isUser ? 'white' : 'var(--color-dark)',
        border: isUser ? 'none' : '1px solid var(--color-border)',
        borderRadius: isUser ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
        padding: '10px 14px',
        fontFamily: 'Inter, sans-serif',
        fontSize: '13.5px',
        lineHeight: 1.6,
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      }}
    >
      {children}
    </div>
  )
}

const BOOKING_WORDS = ['book', 'schedule', 'appointment', 'available']
const MAX_MESSAGES = 15   // user turns per session
const INPUT_MAX    = 500  // characters
const SEND_COOLDOWN = 2000 // ms between sends

export default function ChatWidget() {
  const cfg = businessConfig.chatbot
  if (!cfg || !cfg.enabled) return null

  const [open, setOpen]       = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput]     = useState('')
  const [typing, setTyping]   = useState(false)
  const [showReplies, setShowReplies] = useState(true)
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [leadName, setLeadName]   = useState('')
  const [leadPhone, setLeadPhone] = useState('')
  const [limitHit, setLimitHit]   = useState(false)

  const scrollRef  = useRef(null)
  const lastSendAt = useRef(0)

  // Seed greeting once, on first open
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: 'assistant', content: cfg.greeting }])
    }
  }, [open]) // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-scroll to bottom on new content
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, typing, showLeadForm])

  // Count only user turns toward the cap
  const userTurns = messages.filter(m => m.role === 'user').length

  const sendMessage = async (text) => {
    const trimmed = text.trim().slice(0, INPUT_MAX)
    if (!trimmed || typing || limitHit) return

    // Cooldown guard — prevents rapid-fire sends
    const now = Date.now()
    if (now - lastSendAt.current < SEND_COOLDOWN) return
    lastSendAt.current = now

    // Session cap
    if (userTurns >= MAX_MESSAGES) {
      setLimitHit(true)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `You've reached the session limit. To continue, please WhatsApp us directly at ${businessConfig.whatsapp}.`,
        fallback: true,
      }])
      return
    }

    setShowReplies(false)
    const nextHistory = [...messages, { role: 'user', content: trimmed }]
    setMessages(nextHistory)
    setInput('')
    setTyping(true)

    // Booking intent → reveal inline lead form after the reply
    const isBooking = BOOKING_WORDS.some(w => trimmed.toLowerCase().includes(w))

    const callGroq = async () => {
      const res = await fetch(GROQ_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [
            { role: 'system', content: buildSystemPrompt() },
            ...nextHistory.map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.content })),
          ],
          max_tokens: 300,
          temperature: 0.7,
        }),
      })
      const data = await res.json()
      return { status: res.status, data }
    }

    try {
      let { status, data } = await callGroq()

      if (status === 429) {
        await new Promise(r => setTimeout(r, 2000))
        ;({ status, data } = await callGroq())
      }

      const reply = data?.choices?.[0]?.message?.content
      if (!reply || data.error) {
        console.error('[ChatWidget] Groq error', status, data?.error || data)
        throw new Error(data?.error?.message || `No reply (HTTP ${status})`)
      }

      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
      if (isBooking) setShowLeadForm(true)
    } catch (err) {
      console.error('[ChatWidget] request failed:', err.message)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Sorry, I'm having trouble connecting. Please WhatsApp us at ${businessConfig.whatsapp}.`,
        fallback: true,
      }])
    } finally {
      setTyping(false)
    }
  }

  const submitLead = (e) => {
    e.preventDefault()
    if (!leadName.trim() || !leadPhone.trim()) return
    // Persist lead so the owner can retrieve it later
    try {
      const leads = JSON.parse(localStorage.getItem('purespace_leads') || '[]')
      leads.push({ name: leadName, phone: leadPhone, at: new Date().toISOString() })
      localStorage.setItem('purespace_leads', JSON.stringify(leads))
    } catch { /* ignore storage errors */ }

    setMessages(prev => [...prev, {
      role: 'assistant',
      content: `Thanks ${leadName}! We'll WhatsApp you at ${leadPhone} within 30 minutes to confirm.`,
    }])
    setShowLeadForm(false)
    setLeadName('')
    setLeadPhone('')
  }

  const waLink = `https://wa.me/${businessConfig.whatsapp}`

  return (
    <>
      {/* ── Chat panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.35, ease }}
            className="chat-panel"
            style={{
              position: 'fixed', bottom: '92px', right: '24px', zIndex: 999,
              display: 'flex', flexDirection: 'column',
              borderRadius: '20px', overflow: 'hidden', background: 'white',
              boxShadow: '0 8px 40px rgba(0,0,0,0.15)',
            }}
          >
            {/* Header */}
            <div style={{ background: 'var(--color-primary)', borderRadius: '20px 20px 0 0', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--color-secondary)', flexShrink: 0 }} />
                <div>
                  <div style={{ color: 'white', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '14px' }}>
                    {businessConfig.name} Assistant
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontFamily: 'Inter, sans-serif', fontWeight: 400, fontSize: '11px' }}>
                    Typically replies instantly
                  </div>
                </div>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Close chat" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex' }}>
                <CloseIcon />
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="chat-scroll"
              style={{ flex: 1, overflowY: 'auto', padding: '16px', background: '#F9F9F8', display: 'flex', flexDirection: 'column', gap: '10px' }}
            >
              {messages.map((m, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
                  <Bubble role={m.role}>{m.content}</Bubble>
                  {m.fallback && (
                    <a href={waLink} target="_blank" rel="noopener noreferrer"
                      style={{ alignSelf: 'flex-start', background: '#25D366', color: 'white', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '12px', padding: '8px 16px', borderRadius: '999px', textDecoration: 'none' }}>
                      Open WhatsApp →
                    </a>
                  )}
                </div>
              ))}

              {/* Suggested quick replies */}
              {showReplies && messages.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '4px' }}>
                  {cfg.suggestedReplies.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      style={{ border: '1.5px solid var(--color-primary)', color: 'var(--color-primary)', background: 'white', borderRadius: '999px', padding: '6px 14px', fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}

              {typing && <TypingDots />}

              {/* Inline lead capture form */}
              {showLeadForm && (
                <form onSubmit={submitLead} style={{ background: 'white', border: '1px solid var(--color-border)', borderRadius: '16px', padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    <input value={leadName} onChange={e => setLeadName(e.target.value)} placeholder="Name" required
                      style={{ border: '1px solid var(--color-border)', borderRadius: '8px', padding: '8px 10px', fontFamily: 'Inter, sans-serif', fontSize: '13px', outline: 'none', minWidth: 0 }} />
                    <input value={leadPhone} onChange={e => setLeadPhone(e.target.value)} placeholder="Phone" required
                      style={{ border: '1px solid var(--color-border)', borderRadius: '8px', padding: '8px 10px', fontFamily: 'Inter, sans-serif', fontSize: '13px', outline: 'none', minWidth: 0 }} />
                  </div>
                  <button type="submit" style={{ background: 'var(--color-primary)', color: 'white', border: 'none', borderRadius: '8px', padding: '10px', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}>
                    Send Request
                  </button>
                </form>
              )}
            </div>

            {/* Input */}
            <form
              onSubmit={(e) => { e.preventDefault(); sendMessage(input) }}
              style={{ background: 'white', borderTop: '1px solid var(--color-border)', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}
            >
              <input
                value={input}
                onChange={e => setInput(e.target.value.slice(0, INPUT_MAX))}
                placeholder={limitHit ? 'Session ended — WhatsApp us directly' : 'Type your message…'}
                disabled={limitHit}
                style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: 'Inter, sans-serif', fontSize: '14px', color: 'var(--color-dark)', opacity: limitHit ? 0.5 : 1 }}
              />
              <button
                type="submit"
                disabled={!input.trim() || typing || limitHit}
                aria-label="Send message"
                style={{
                  width: 36, height: 36, borderRadius: '50%', background: 'var(--color-primary)',
                  border: 'none', cursor: input.trim() && !typing && !limitHit ? 'pointer' : 'default',
                  opacity: input.trim() && !typing && !limitHit ? 1 : 0.4,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  transition: 'opacity 0.2s ease',
                }}
              >
                <SendIcon />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating button ── */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        whileHover={{ scale: 1.08, boxShadow: '0 6px 28px rgba(28,63,58,0.5)' }}
        whileTap={{ scale: 0.96 }}
        style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 999,
          width: 56, height: 56, borderRadius: '50%', background: 'var(--color-primary)',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(28,63,58,0.4)',
        }}
      >
        {open ? <CloseIcon /> : <SparkleIcon />}
      </motion.button>
    </>
  )
}
