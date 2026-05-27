import './Links.css'

const LINKS = [
  { label: 'github',  href: 'https://github.com/simeonkr' },
  { label: 'linkedin', href: 'https://linkedin.com/in/simeonkrastev' },
  { label: 'scholar', href: 'https://scholar.google.com/citations?user=TODO' },
]

export default function Links() {
  return (
    <nav className="links">
      {LINKS.map(({ label, href }) => (
        <a
          key={label}
          className="link-item"
          href={href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="link-prompt">&gt; </span>
          <span className="link-label">{label}</span>
        </a>
      ))}
    </nav>
  )
}
