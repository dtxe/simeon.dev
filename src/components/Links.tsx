import './Links.css'

const LINKS = [
  { label: 'google scholar', href: 'https://scholar.google.com/citations?user=23OCXlIAAAAJ' },
  { label: 'github',  href: 'https://github.com/dtxe' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/simeonwong/' },
]

export default function Links() {
  return (
		<>
		<p className="links-label">Find me and my work on:</p>
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
		</>
  )
}
