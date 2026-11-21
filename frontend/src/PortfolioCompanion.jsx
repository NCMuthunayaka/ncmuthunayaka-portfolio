import React, { useEffect, useRef, useState } from 'react'
import './companion.css'
import './companion-polish.css'
import WireOrbit from './WireOrbit'
import './orbit-button.css'
import './orbit-raised.css'

const answers = {
  'Explore the projects': 'Explore GoviSense, the GNSS coordinate processor, WedaLink and Learnify on the Projects page. Each card identifies the current project status.',
  'Internship availability': 'Nayana is seeking an AI Engineering internship from June 2027 for a flexible six-month period.',
  'Get in touch': 'Email Nayana at ncmuthunayaka@gmail.com for internship enquiries and collaboration.'
}

export default function PortfolioCompanion() {
  const [open, setOpen] = useState(false)
  const [question, setQuestion] = useState('')
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
      <p>A quick introduction to Nayana’s work and availability.</p>
      <div className="companion-questions">{Object.keys(answers).map(item => <button key={item} onClick={() => setQuestion(item)}>{item}<span aria-hidden="true">↗</span></button>)}</div>
      {question && <div className="companion-answer" role="status"><p>{answers[question]}</p><a href={question === 'Explore the projects' ? '/projects' : '/contact'}>View {question === 'Explore the projects' ? 'projects' : 'contact details'} →</a></div>}
      <small>Quick answers from this portfolio. Live AI chat is not connected yet.</small>
    </section>}
    <button ref={trigger} className="companion-trigger" aria-expanded={open} aria-controls="companion-panel" aria-label={open ? 'Close portfolio guide' : 'Open portfolio guide'} onClick={() => setOpen(!open)}>
      <span className="orbit-stage wire-stage" aria-hidden="true"><WireOrbit /></span>
      <span className="companion-label"><span className="orbit-button-text">{open ? 'Close guide' : 'Meet Orbit'}</span></span>
    </button>
  </aside>
}
