import { useState, useSyncExternalStore } from 'react'
import './styles/theme.css'
import './App.css'
import TerminalPrompt from './components/TerminalPrompt'
import AsciiPortrait from './components/AsciiPortrait'
import Links from './components/Links'

// false during SSR + first client paint, true after hydration. Lets the static
// HTML carry full content while the client replays the intro animation.
const subscribe = () => () => {}
function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  )
}

export default function App() {
  const animating = useHydrated()
  const [ready, setReady] = useState(false)

  const showContent = !animating || ready

  return (
    <main className="app">
      <div className="content">
        <TerminalPrompt animate={animating} onDone={() => setReady(true)} />
        {/* Stay mounted while typing so they reserve layout space (no reflow);
            visibility toggles the reveal. */}
        <div className={`reveal${showContent ? ' reveal--visible' : ''}`}>
          <AsciiPortrait />
          <Links />
        </div>
      </div>
    </main>
  )
}
