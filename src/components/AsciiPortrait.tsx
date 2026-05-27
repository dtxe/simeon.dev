import { useCallback, useEffect, useRef } from 'react'
import { ASCII_ART } from '../generated/ascii-art'
import './AsciiPortrait.css'

const SIGMA = 90
const ROWS = ASCII_ART.split('\n')

function gaussian(d: number, sigma: number) {
  return Math.exp(-(d * d) / (2 * sigma * sigma))
}

// positions[row][col] = {cx, cy} center of that character span
type CharPos = { cx: number; cy: number }

export default function AsciiPortrait() {
  const containerRef = useRef<HTMLPreElement>(null)
  const rafRef = useRef<number>(0)
  const positionsRef = useRef<CharPos[][]>([])
  const spansRef = useRef<HTMLSpanElement[][]>([])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Measure a single span to get char cell size, then compute all centers
    const firstSpan = container.querySelector<HTMLSpanElement>('span[data-r="0"][data-c="0"]')
    if (!firstSpan) return

    const rect0 = firstSpan.getBoundingClientRect()
    const cw = rect0.width
    const ch = rect0.height
    const containerRect = container.getBoundingClientRect()

    positionsRef.current = ROWS.map((row, ri) =>
      row.split('').map((_, ci) => ({
        cx: ci * cw + cw / 2 - containerRect.left + container.scrollLeft,
        cy: ri * ch + ch / 2 - containerRect.top + container.scrollTop,
      }))
    )

    // Cache span refs
    spansRef.current = ROWS.map((row, ri) =>
      row.split('').map((_, ci) =>
        container.querySelector<HTMLSpanElement>(`span[data-r="${ri}"][data-c="${ci}"]`)!
      )
    )
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLPreElement>) => {
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const container = containerRef.current
      if (!container || positionsRef.current.length === 0) return

      const containerRect = container.getBoundingClientRect()
      const mx = e.clientX - containerRect.left
      const my = e.clientY - containerRect.top

      const style = getComputedStyle(document.documentElement)
      const accentColor = style.getPropertyValue('--accent').trim()
      const fgColor = style.getPropertyValue('--fg').trim()
      const dimColor = style.getPropertyValue('--dim').trim()

      ROWS.forEach((row, ri) => {
        row.split('').forEach((_, ci) => {
          const pos = positionsRef.current[ri]?.[ci]
          const span = spansRef.current[ri]?.[ci]
          if (!pos || !span) return

          const d = Math.hypot(mx - pos.cx, my - pos.cy)
          const w = gaussian(d, SIGMA)

          if (w > 0.65) {
            span.style.color = accentColor
            span.style.transform = 'rotateY(180deg)'
            span.style.textShadow = `0 0 ${Math.round(w * 14)}px ${accentColor}`
          } else if (w > 0.15) {
            const t = (w - 0.15) / 0.5
            span.style.color = fgColor
            span.style.transform = ''
            span.style.textShadow = `0 0 ${Math.round(w * 10)}px ${fgColor}`
            void t
          } else {
            span.style.color = dimColor
            span.style.transform = ''
            span.style.textShadow = ''
          }
        })
      })
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    ROWS.forEach((row, ri) => {
      row.split('').forEach((_, ci) => {
        const span = spansRef.current[ri]?.[ci]
        if (!span) return
        span.style.color = ''
        span.style.transform = ''
        span.style.textShadow = ''
      })
    })
  }, [])

  return (
    <pre
      ref={containerRef}
      className="ascii-portrait"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {ROWS.map((row, ri) => (
        <div key={ri} className="ascii-row">
          {row.split('').map((ch, ci) => (
            <span key={ci} data-r={ri} data-c={ci}>
              {ch}
            </span>
          ))}
        </div>
      ))}
    </pre>
  )
}
