import { useEffect, useRef, useState } from 'react'
import './TerminalPrompt.css'

const FULL_TEXT = `$ ./simeon.dev

hi i'm simeon, a neuroscientist turned full-stack AI engineer.`
const DURATION_MS = 500

export default function TerminalPrompt({ onDone }: { onDone?: () => void }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const rafRef = useRef<number>(0)
  const startRef = useRef<number>(0)

  useEffect(() => {
    const total = FULL_TEXT.length

    function tick(now: number) {
      if (!startRef.current) startRef.current = now
      const elapsed = now - startRef.current
      const progress = Math.min(elapsed / DURATION_MS, 1)
      const count = Math.floor(progress * total)
      setDisplayed(FULL_TEXT.slice(0, count))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setDisplayed(FULL_TEXT)
        setDone(true)
        onDone?.()
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <div className="terminal-prompt">
      <pre className="terminal-text">
        {displayed}
        <span className={`cursor${done ? ' blink' : ''}`}>█</span>
      </pre>
    </div>
  )
}
