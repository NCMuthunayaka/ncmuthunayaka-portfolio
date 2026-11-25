import React, { useEffect, useRef, useState } from 'react'
import './companion.css'
import AssistantPanel from './components/AssistantPanel'
import './companion-polish.css'
import WireOrbit from './WireOrbit'
import './orbit-button.css'
import './orbit-raised.css'

export default function PortfolioCompanion() {
  const [open, setOpen] = useState(false)
  const trigger = useRef(null)
  const closeButton = useRef(null)
  const close = () => { setOpen(false); trigger.current?.focus() }
  useEffect(() => {
    if (!open) return
    closeButton.current?.focus()
    const escape = e => { if (e.key === 'Escape') close() }
    window.addEventListener('keydown', escape)
    return () => window.removeEventListener('keydown', escape)
  }, [open])
  return <aside className="companion-widget" aria-label="Portfolio guide">
    {open && <section id="companion-panel" className="companion-panel" aria-label="Portfolio guide">
      <header><div><span className="eyebrow">Meet Orbit</span><h2>Your portfolio guide</h2></div><button ref={closeButton} onClick={close} aria-label="Close portfolio guide">×</button></header>
      <AssistantPanel />
    </section>}
    <button ref={trigger} className="companion-trigger" aria-expanded={open} aria-controls="companion-panel" aria-label={open ? 'Close portfolio guide' : 'Open portfolio guide'} onClick={() => setOpen(!open)}>
      <span className="orbit-stage wire-stage" aria-hidden="true"><WireOrbit /></span>
      <span className="companion-label"><span className="orbit-button-text">{open ? 'Close guide' : 'Meet Orbit'}</span></span>
    </button>
  </aside>
}
