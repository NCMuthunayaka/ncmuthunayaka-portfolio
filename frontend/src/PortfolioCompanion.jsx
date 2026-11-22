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
  const [customQuestion, setCustomQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)
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
  const ask = async (value) => {
    const requested = value.trim()
    if (!requested) return
    setQuestion(''); setAnswer(''); setLoading(true)
    try {
      const endpoint = import.meta.env.VITE_API_URL
      if (!endpoint) throw new Error('fallback')
      const response = await fetch(`${endpoint.replace(/\/$/, '')}/api/ask`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ question: requested }) })
      if (!response.ok) throw new Error('request failed')
      const data = await response.json()
      setAnswer(data.answer || 'No answer is available from the approved portfolio sources.')
    } catch {
      setAnswer('Live assistant chat is not connected yet. Please use the project pages or contact Nayana directly.')
    } finally { setLoading(false) }
  }
  return <aside className="companion-widget" aria-label="Portfolio guide">
    {open && <section id="companion-panel" className="companion-panel" aria-label="Portfolio guide">
      <header><div><span className="eyebrow">Meet Orbit</span><h2>Your portfolio guide</h2></div><button ref={closeButton} onClick={close} aria-label="Close portfolio guide">×</button></header>
      <p>A quick introduction to Nayana’s work and availability.</p>
      <div className="companion-questions">{Object.keys(answers).map(item => <button key={item} onClick={() => ask(item)}>{item}<span aria-hidden="true">↗</span></button>)}</div>
      <form className="companion-form" onSubmit={(event) => { event.preventDefault(); ask(customQuestion) }}><label htmlFor="portfolio-question">Ask about the portfolio</label><div><input id="portfolio-question" value={customQuestion} maxLength={300} onChange={event => setCustomQuestion(event.target.value)} placeholder="Try: What is Nayana building?" /><button type="submit" disabled={loading || !customQuestion.trim()}>{loading ? '…' : 'Ask'}</button></div></form>
      {(question || answer || loading) && <div className="companion-answer" role="status"><p>{loading ? 'Checking the approved portfolio information…' : answer || answers[question]}</p>{question && <a href={question === 'Explore the projects' ? '/projects' : '/contact'}>View {question === 'Explore the projects' ? 'projects' : 'contact details'} →</a>}</div>}
      <small>Answers stay within approved portfolio information. Live provider chat is optional.</small>
    </section>}
    <button ref={trigger} className="companion-trigger" aria-expanded={open} aria-controls="companion-panel" aria-label={open ? 'Close portfolio guide' : 'Open portfolio guide'} onClick={() => setOpen(!open)}>
      <span className="orbit-stage wire-stage" aria-hidden="true"><WireOrbit /></span>
      <span className="companion-label"><span className="orbit-button-text">{open ? 'Close guide' : 'Meet Orbit'}</span></span>
    </button>
  </aside>
}
