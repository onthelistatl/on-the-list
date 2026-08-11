import './CoverChips.css'

function chipLabel(tier, index) {
  const amount = tier.price === 0 ? 'FREE' : `$${tier.price}`
  if (tier.until) return `${amount} til ${tier.until}`
  return index === 0 ? amount : `${amount} after`
}

export default function CoverChips({ coverTiers, activeTier }) {
  return (
    <div className="cover-chips">
      {coverTiers.map((tier, i) => {
        const isFree = tier.price === 0
        const isActive = activeTier === tier
        return (
          <span
            key={i}
            className={`chip ${isFree ? 'chip-free' : ''} ${isActive ? 'chip-active' : ''}`}
          >
            {chipLabel(tier, i)}
          </span>
        )
      })}
    </div>
  )
}
