import { businessConfig } from '../businessConfig'

export default function TrustBar() {
  const items = [...businessConfig.trustBar, ...businessConfig.trustBar]

  return (
    <section className="bg-[var(--color-primary)] overflow-hidden" style={{ height: '52px' }}>
      <div className="flex items-center h-full w-max animate-marquee">
        {items.map((item, i) => (
          <div key={i} className="flex items-center flex-shrink-0">
            <span
              className="uppercase text-white whitespace-nowrap"
              style={{ fontWeight: 600, fontSize: '12px', letterSpacing: '0.12em', opacity: 0.85 }}
            >
              {item}
            </span>
            <span className="mx-7 w-1 h-1 rounded-full bg-white flex-shrink-0" style={{ opacity: 0.4 }} />
          </div>
        ))}
      </div>
    </section>
  )
}
