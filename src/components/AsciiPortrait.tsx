import { useCallback, useRef } from 'react'
import { ASCII_ART } from '../generated/ascii-art'
import './AsciiPortrait.css'

const ROWS = ASCII_ART.split('\n')
const CHAR_ROWS = ROWS.map((row) => [...row])

export default function AsciiPortrait() {
  const containerRef = useRef<HTMLPreElement>(null)
  const rafRef = useRef<number>(0)
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLPreElement>) => {
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      const container = containerRef.current
      if (!container) return

      const containerRect = container.getBoundingClientRect()
      const mx = e.clientX - containerRect.left
      const my = e.clientY - containerRect.top

      container.style.setProperty('--mx', `${mx}px`)
      container.style.setProperty('--my', `${my}px`)
      container.classList.add('ascii-portrait--active')
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    containerRef.current?.classList.remove('ascii-portrait--active')
  }, [])

  return (
    <div data-nosnippet>
      <pre
        ref={containerRef}
        className="ascii-portrait"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {CHAR_ROWS.map((row, ri) => (
          <div key={ri} className="ascii-row">
            {row.map((ch, ci) => (
              <span key={ci}>{ch}</span>
            ))}
          </div>
        ))}
      </pre>
    </div>
  )
}
