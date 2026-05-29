import { useEffect, useRef, useState } from 'react'
import './TerminalPrompt.css'

const FULL_TEXT = `$ ./simeon.dev

hi i'm Simeon Wong, a neuroscientist turned full-stack AI engineer.`
const DURATION_MS = 500

export default function TerminalPrompt({
  animate = false,
  onDone,
}: {
  animate?: boolean
  onDone?: () => void
}) {
  // Default to the finished state so SSR / first client paint render the full
  // text. The animation only replays once `animate` flips true after mount.
  const [displayed, setDisplayed] = useState(FULL_TEXT)
  const [done, setDone] = useState(true)
  const rafRef = useRef<number>(0)
  const startRef = useRef<number>(0)
  const onDoneRef = useRef(onDone)
  useEffect(() => {
    onDoneRef.current = onDone
  })

  useEffect(() => {
    if (!animate) return
    const total = FULL_TEXT.length
    startRef.current = 0

    function tick(now: number) {
      if (!startRef.current) {
        startRef.current = now
        setDone(false)
      }
      const elapsed = now - startRef.current
      const progress = Math.min(elapsed / DURATION_MS, 1)
      const count = Math.floor(progress * total)
      setDisplayed(FULL_TEXT.slice(0, count))
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setDisplayed(FULL_TEXT)
        setDone(true)
        onDoneRef.current?.()
      }
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [animate])

  return (
    <div className="terminal-prompt">
      <pre className="terminal-text">
        {/* Hidden sizer pins the box to the full text so the centered layout
            doesn't reflow/recenter on every animation frame. */}
        <span className="terminal-sizer" aria-hidden="true">
          {FULL_TEXT}
        </span>
        <span className="terminal-live">
          {displayed}
          <span className={`cursor${done ? ' blink' : ''}`}>█</span>
        </span>
      </pre>
    </div>
  )
}
