import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section
      style={{
        background: 'var(--color-primary)',
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
        padding: '40px 24px',
      }}
    >
      {/* Decorative circles */}
      <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '420px', height: '420px', borderRadius: '9999px', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-120px', left: '40%', width: '280px', height: '280px', borderRadius: '9999px', background: 'rgba(255,255,255,0.02)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ fontSize: '120px', fontWeight: 300, color: 'white', lineHeight: 1, fontFamily: 'Inter, sans-serif', letterSpacing: '-0.04em' }}>
          404
        </div>

        <h1 style={{ margin: '16px 0 0', fontSize: '40px', fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800, fontStyle: 'italic', color: 'white', lineHeight: 1.1 }}>
          Page not found.
        </h1>

        <p style={{ marginTop: '20px', fontSize: '17px', fontWeight: 400, color: 'rgba(255,255,255,0.65)', lineHeight: 1.75 }}>
          The page you're looking for doesn't exist.
        </p>

        <Link
          to="/"
          style={{
            display: 'inline-block',
            marginTop: '36px',
            background: 'white',
            color: 'var(--color-primary)',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 700,
            fontSize: '15px',
            padding: '14px 32px',
            borderRadius: '9999px',
            textDecoration: 'none',
            transition: 'opacity 0.2s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.9' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
        >
          Go Home →
        </Link>
      </div>
    </section>
  )
}
