import React, { useEffect, useState } from 'react'
import './animated-intro.css'

const phrases = ['Learning AI by building it.', 'Turning data into decisions.', 'Building with clear evidence.']

export default function AnimatedIntro() {
  const [text, setText] = useState(phrases[0])
  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const query = matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduced(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])
  useEffect(() => {
    if (reduced) return
    let timer, index = 0, count = phrases[0].length, deleting = true
    setText(phrases[0])
    const tick = () => {
      const phrase = phrases[index]
      count += deleting ? -1 : 1
      setText(phrase.slice(0, count))
      let delay = deleting ? 50 : 100
      if (count === 0) {
        index = (index + 1) % phrases.length
        deleting = false
        delay = 250
      } else if (!deleting && count === phrase.length) {
        deleting = true
        delay = 3200
      }
      timer = setTimeout(tick, delay)
    }
    timer = setTimeout(tick, 3200)
    return () => clearTimeout(timer)
  }, [reduced])
  return <div className="animated-intro">
    <p className="intro-typewriter">
      <span className="sr-only">{phrases.join(' ')}</span>
      {phrases.map(phrase => <span key={phrase} className="intro-size-guide" aria-hidden="true">{phrase}<span className="typing-cursor still">|</span></span>)}
      <span className="intro-visible-text" aria-hidden="true">{reduced ? phrases[0] : text}<span className={reduced ? 'typing-cursor still' : 'typing-cursor'}>|</span></span>
    </p>
  </div>
}
