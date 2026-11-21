import React, { useEffect } from 'react'
import './motion.css'

export function Motion({ path }) {
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const animations = []
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        animations.push(entry.target.animate([{ transform: 'translateY(10px)', opacity: .8 }, { transform: 'translateY(0)', opacity: 1 }], { duration: 400, easing: 'cubic-bezier(.22, 1, .36, 1)' }))
        observer.unobserve(entry.target)
      }
    }), { threshold: .12 })
    document.querySelectorAll('main section:not(.hero):not(.timeline):not(:has(.project-card)), .project-card, .timeline article, .detail-card').forEach(el => observer.observe(el))
    return () => { observer.disconnect(); animations.forEach(animation => animation.cancel()) }
  }, [path])
  return null
}

export function Network() {
  return <svg className="hero-network" viewBox="0 0 1000 600" aria-hidden="true"><g fill="none" stroke="currentColor"><path d="M50 100L250 180L450 80L650 220L900 120M250 180L320 410L650 220L780 470L950 380M50 100L80 450L320 410L450 80M320 410L510 530L780 470" /></g>{[[50,100],[250,180],[450,80],[650,220],[900,120],[320,410],[780,470],[950,380],[80,450],[510,530]].map(([x,y],i)=><circle key={x} cx={x} cy={y} r="4" style={{animationDelay: i * -.7+'s'}} />)}</svg>
}

export function Timeline() {
  return <section className="container timeline"><span className="eyebrow">Experience beyond the screen</span><h2>Responsibility. Leadership. Practice.</h2>{[
    ['December 2023 – July 2024','Teller intern · People’s Bank','Supported deposits, withdrawals, cash management and daily balancing.'],
    ['HOPE 2.0 · Chapters 1–4','Design team lead · IEEE WIE SUSL','Assigned design tasks, created the event flyer and coordinated delivery across all four chapters.'],
    ['15 October 2025','Event organizer · Pawra 2025','Coordinated the programme, prepared the proposal and assigned task leaders.'],
    ['October 2023 – present','Owner · Bluepearl','Ornamental fish breeding and supply, with daily attention to water quality, routines and customer needs.']
  ].map(([date,title,body])=><article key={title}><span className="eyebrow">{date}</span><h3>{title}</h3><p>{body}</p></article>)}</section>
}

export function Architecture({ id }) {
  const flows = {
    '01':['Dashboard / mobile','FastAPI engines','SQL database'],
    '02':['gLAB observations','Filter / weight','SLD99 output'],
    '03':['Customer text','TF-IDF model','Category / confidence'],
    '04':['React interface','Flask API','MySQL storage']
  }
  return <figure className="architecture"><figcaption>Architecture overview{ id === '03' ? ' · current classifier baseline' : ''}</figcaption><svg viewBox="0 0 660 150" role="img" aria-label={flows[id].join(' to ')}><path className="flow-line" d="M190 70H240M420 70H470"/>{flows[id].map((label,i)=><g key={label}><rect x={i*230} y="35" width="190" height="70" rx="10"/><text x={i*230+95} y="75" textAnchor="middle">{label}</text></g>)}<circle className="flow-dot" r="4" cx="210" cy="70"/><circle className="flow-dot" r="4" cx="440" cy="70"/></svg></figure>
}
