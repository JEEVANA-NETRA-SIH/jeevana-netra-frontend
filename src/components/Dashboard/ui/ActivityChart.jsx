export default function ActivityChart({ data }) {
  const width = 640
  const height = 260
  const pad = { top: 20, right: 12, bottom: 30, left: 36 }
  const innerW = width - pad.left - pad.right
  const innerH = height - pad.top - pad.bottom

  const max = Math.max(...data.map((d) => d.value))
  const bars = data.length
  const slot = innerW / bars
  const barWidth = Math.min(44, slot * 0.52)
  const gridLines = 4

  const yTicks = Array.from({ length: gridLines + 1 }, (_, i) => [
    Math.round((max / gridLines) * (gridLines - i)),
    pad.top + (innerH / gridLines) * i,
  ])

  return (
    <svg
      className="d-chart"
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label="Screening activity over the last 7 days"
      preserveAspectRatio="xMidYMid meet"
    >
      {yTicks.map(([label, yPos], i) => (
        <g key={i}>
          <line
            className="d-chart__grid"
            x1={pad.left}
            y1={yPos}
            x2={width - pad.right}
            y2={yPos}
          />
          <text className="d-chart__tick" x={pad.left - 8} y={yPos + 4} textAnchor="end">
            {label}
          </text>
        </g>
      ))}

      {data.map((d, i) => {
        const x = pad.left + slot * i + (slot - barWidth) / 2
        const barH = (d.value / max) * innerH
        const y = pad.top + innerH - barH
        const isHighlight = d.value === max
        return (
          <g key={d.day}>
            <rect
              className={`d-chart__bar d-chart__bar--${i % 2 === 0 ? 'alt' : 'base'}${isHighlight ? ' d-chart__bar--hl' : ''}`}
              x={x}
              y={y}
              width={barWidth}
              height={barH}
              rx={6}
            />
            <text className="d-chart__tick" x={x + barWidth / 2} y={height - 10} textAnchor="middle">
              {d.day}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
