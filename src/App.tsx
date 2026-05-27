import './styles/theme.css'
import './App.css'
import TerminalPrompt from './components/TerminalPrompt'
import AsciiPortrait from './components/AsciiPortrait'
import Links from './components/Links'

export default function App() {
  return (
    <main className="app">
      <div className="content">
        <TerminalPrompt />
        <AsciiPortrait />
        <Links />
      </div>
    </main>
  )
}
