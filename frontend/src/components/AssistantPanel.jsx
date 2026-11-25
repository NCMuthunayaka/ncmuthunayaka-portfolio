import React, { useEffect, useRef, useState } from 'react'
import { useContent } from '../lib/ContentContext'
import { safeURL } from '../lib/content.mjs'
export default function AssistantPanel() {
  const { faqs } = useContent()
  const [question, setQuestion] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [waking, setWaking] = useState(false)
  const active = useRef(null)
  useEffect(() => () => active.current?.abort(), [])
  async function ask(value) {
    if (loading || !value.trim()) return
    const blocked = /secret|password|salary|customer|private|api.?key/i.test(value)
    if (blocked) { setResult({ answer: 'I cannot provide private data, secrets, salary or customer details.', sources: [] }); return }
    const faq = faqs.find(f => f.question.toLowerCase() === value.trim().toLowerCase())
    const fallback = faq ? { answer: faq.shortAnswer, sources: safeURL(faq.linkedSourceURL) ? [{ title: 'Source', url: safeURL(faq.linkedSourceURL) }] : [] } : { answer: 'No approved answer is available yet. Explore the project pages or contact Nayana directly.', sources: [{ title: 'Projects', url: '/projects' }, { title: 'Contact', url: '/contact' }] }
    if (!import.meta.env.VITE_API_URL) { setResult(fallback); return }
    setLoading(true); setWaking(false); setResult(null)
    const controller = new AbortController(); active.current = controller
    const wake = setTimeout(() => setWaking(true), 5000)
    const timeout = setTimeout(() => controller.abort(), 15000)
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL.replace(/\/$/, '')}/api/ask`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ question: value }), signal: controller.signal })
      if (!response.ok) throw new Error('Unavailable')
      setResult(await response.json())
    } catch { setResult({ ...fallback, notice: 'The assistant service is unavailable. Showing the available portfolio guidance.' }) }
    finally { clearTimeout(wake); clearTimeout(timeout); setLoading(false); setWaking(false) }
  }
  return <div className="assistant-panel"><div className="companion-questions">{(faqs.length ? faqs.map(f => f.question).slice(0, 4) : ['What projects can I explore?', 'How can I get in touch?']).map(q => <button key={q} disabled={loading} onClick={() => { setQuestion(q); ask(q) }}>{q}</button>)}</div><form className="companion-form" onSubmit={e => { e.preventDefault(); ask(question) }}><label>Ask about the portfolio<input value={question} onChange={e => setQuestion(e.target.value)} maxLength={300} required /></label><button type="submit" disabled={loading || !question.trim()}>Ask</button></form><div role="status" aria-live="polite">{loading && <p>{waking ? 'The service may be waking up. Approved answers remain available below.' : 'Checking approved answers…'}</p>}{result && <><p>{result.notice}</p><p>{result.answer}</p><ul>{result.sources?.filter(s => safeURL(s.url) || /^\/(?!\/)/.test(s.url)).map(s => <li key={s.url}><a href={s.url}>{s.title}</a></li>)}</ul></>}</div>{faqs.length > 0 && <section><h2>Approved answers</h2>{faqs.map(f => <details key={f.question}><summary>{f.question}</summary><p>{f.shortAnswer}</p>{safeURL(f.linkedSourceURL) && <a href={safeURL(f.linkedSourceURL)}>View source</a>}</details>)}</section>}<small>Answers are limited to approved public FAQs. Generative AI is disabled.</small></div>
}
