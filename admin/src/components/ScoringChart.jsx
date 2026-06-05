export default function ScoringChart({ score = 0, maxScore = 999 }) {
  const cx = 200, cy = 175, r = 66, sw = 32
  const innerR = r - sw / 2

  const toRad = (d) => (d * Math.PI) / 180

  const pt = (radius, deg) => ({
    x: cx + radius * Math.cos(toRad(deg)),
    y: cy + radius * Math.sin(toRad(deg)),
  })

  const arcPath = (s, e, radius = r) => {
    let start = s, end = e
    if (end <= start) end += 360
    const a = pt(radius, start)
    const b = pt(radius, end)
    const large = end - start > 180 ? 1 : 0
    return `M ${a.x.toFixed(1)} ${a.y.toFixed(1)} A ${radius} ${radius} 0 ${large} 1 ${b.x.toFixed(1)} ${b.y.toFixed(1)}`
  }

  const segments = [
    { start: 36, end: 108, color: '#7B1FA2', label: 'Bajo', range: '0 - 299' },
    { start: 108, end: 180, color: '#C62828', label: 'Regular', range: '300 - 499' },
    { start: 180, end: 252, color: '#EF6C00', label: 'Bueno', range: '500 - 649' },
    { start: 252, end: 324, color: '#7CB342', label: 'Muy bueno', range: '650 - 749' },
    { start: 324, end: 36, color: '#2E7D32', label: 'Excelente', range: '750 - 999' },
  ]

  const clamped = Math.max(0, Math.min(maxScore, score))
  const needleAngle = 36 + (clamped / maxScore) * 360

  const statusList = ['BAJO', 'REGULAR', 'BUENO', 'MUY BUENO', 'EXCELENTE']
  const colorList = ['#7B1FA2', '#C62828', '#EF6C00', '#7CB342', '#2E7D32']
  const threshold = [0, 300, 500, 650, 750]
  let idx = 0
  for (let i = threshold.length - 1; i >= 0; i--) {
    if (clamped >= threshold[i]) { idx = i; break }
  }
  const status = statusList[idx]
  const statusColor = colorList[idx]

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <svg viewBox="0 0 400 400" style={{ width: '100%' }}>
        {segments.map((s, i) => (
          <path key={i} d={arcPath(s.start, s.end)} fill="none" stroke={s.color} strokeWidth={sw} strokeLinecap="butt" />
        ))}

        <circle cx={cx} cy={cy} r={innerR} fill="#fff" />

        <g transform={`rotate(${needleAngle}, ${cx}, ${cy})`}>
          <polygon points={`${cx - 7},${cy + 5} ${cx - 7},${cy - 5} ${cx + r - 8},${cy}`} fill="#C62828" />
        </g>
        <circle cx={cx} cy={cy} r={6} fill="#333" />
        <circle cx={cx} cy={cy} r={2.5} fill="#C62828" />

        {segments.map((s, i) => {
          const mid = (s.start + (s.end <= s.start ? s.end + 360 : s.end)) / 2
          const outer = pt(r + sw / 2 + 8, mid)
          const labelR = r + sw / 2 + 50
          const labelPt = pt(labelR, mid)
          const onRight = labelPt.x > cx
          const anchor = onRight ? 'end' : 'start'
          const dx = onRight ? -6 : 6
          return (
            <g key={`lbl-${i}`}>
              <line x1={outer.x} y1={outer.y} x2={labelPt.x} y2={labelPt.y} stroke="#999" strokeWidth={1} />
              <circle cx={outer.x} cy={outer.y} r={2.5} fill="#999" />
              <text x={labelPt.x + dx} y={labelPt.y - 5} textAnchor={anchor} fontSize="10" fill="#444" fontWeight="bold">
                {s.label}
              </text>
              <text x={labelPt.x + dx} y={labelPt.y + 7} textAnchor={anchor} fontSize="8" fill="#888">
                {s.range}
              </text>
            </g>
          )
        })}

        <text x={cx} y={cy + r + 35} textAnchor="middle" fontSize="10" fill="#888" fontWeight="bold">
          Score:
        </text>
        <text x={cx} y={cy + r + 58} textAnchor="middle" fontSize="20" fill="#333" fontWeight="bold">
          {clamped}
          <tspan fontSize="12" fill="#888"> / {maxScore}</tspan>
        </text>
        <text x={cx} y={cy + r + 80} textAnchor="middle" fontSize="14" fill={statusColor} fontWeight="bold">
          {status}
        </text>
      </svg>
    </div>
  )
}