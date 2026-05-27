import { useState } from 'react'
import './styles/theme.css'
import './App.css'
import TerminalPrompt from './components/TerminalPrompt'
import AsciiPortrait from './components/AsciiPortrait'
import Links from './components/Links'

export default function App() {
  const [ready, setReady] = useState(false)
  return (
    <main className="app">
      <div className="content">
        <TerminalPrompt onDone={() => setReady(true)} />
        {ready && <AsciiPortrait />}
        {ready && <Links />}
      </div>
    </main>
  )
}
