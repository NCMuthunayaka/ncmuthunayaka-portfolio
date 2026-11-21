import React, { useEffect, useRef } from 'react'
import './wire-orbit.css'

export default function WireOrbit() {
  const svg = useRef(null)
  useEffect(() => {
    const trigger = svg.current.closest('button')
    const arm = svg.current.querySelector('.waving-arm')
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    let animation
    const wave = () => {
      if (reduced.matches || animation?.playState === 'running') return
      animation = arm.animate(
        [0, -130, -108, -138, -108, -130, 0].map(angle => ({ transform: `rotate(${angle}deg)` })),
        { duration: 2400, easing: 'ease-in-out', iterations: 1 }
      )
    }
    const stop = () => { if (reduced.matches) animation?.cancel() }
    trigger.addEventListener('pointerenter', wave)
    trigger.addEventListener('focus', wave)
    reduced.addEventListener('change', stop)
    return () => { animation?.cancel(); trigger.removeEventListener('pointerenter', wave); trigger.removeEventListener('focus', wave); reduced.removeEventListener('change', stop) }
  }, [])
  return <svg ref={svg} className="wire-orbit" viewBox="0 0 180 190" aria-hidden="true">
    <defs>
      <linearGradient id="orbit-smooth" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#e4f6ff"/><stop offset=".5" stopColor="#86b9d7"/><stop offset="1" stopColor="#437a9e"/></linearGradient>
      <linearGradient id="orbit-screen" x2="0" y2="1"><stop stopColor="#163851"/><stop offset="1" stopColor="#071827"/></linearGradient>
    </defs>
    <ellipse cx="90" cy="173" rx="28" ry="4" fill="#65bcf4" opacity=".15"/>
    <g className="wire-character">
      <path d="M90 33V22" stroke="#8ec5e3" strokeWidth="3" strokeLinecap="round"/>
      <circle cx="90" cy="19" r="4" fill="#8eeaff"/>
      <g fill="url(#orbit-smooth)" stroke="#b5deed" strokeWidth="1">
        <path d="M59 104Q44 111 47 130Q48 137 54 136Q59 135 58 128Q57 118 65 114Z"/>
        <g className="waving-arm"><path d="M121 104Q136 111 133 130Q132 137 126 136Q121 135 122 128Q123 118 115 114Z"/></g>
        <path d="M73 94Q58 99 60 117L64 142Q67 158 90 159Q113 158 116 142L120 117Q122 99 107 94Z"/>
      </g>
      <rect x="80" y="88" width="20" height="10" rx="4" fill="#5b90b0"/>
      <path d="M46 66V58C46 18 134 18 134 58V66" fill="none" stroke="#365e80" strokeWidth="6" strokeLinecap="round"/>
      <path d="M46 61V58C46 20 134 20 134 58V61" fill="none" stroke="#b1d9ef" strokeWidth="2" strokeLinecap="round"/>
      <rect x="49" y="35" width="82" height="59" rx="26" fill="url(#orbit-smooth)" stroke="#c6e8f5" strokeWidth="1.2"/>
      <g>
        <rect x="41" y="55" width="10" height="23" rx="5" fill="#16344f"/>
        <rect x="36" y="53" width="12" height="27" rx="6" fill="url(#orbit-smooth)" stroke="#b9e0f2" strokeWidth="1"/>
        <path d="M40 61V72" stroke="#78dfff" strokeWidth="2" strokeLinecap="round"/>
        <rect x="129" y="55" width="10" height="23" rx="5" fill="#16344f"/>
        <rect x="132" y="53" width="12" height="27" rx="6" fill="url(#orbit-smooth)" stroke="#b9e0f2" strokeWidth="1"/>
        <path d="M140 61V72" stroke="#78dfff" strokeWidth="2" strokeLinecap="round"/>
      </g>
      <rect x="58" y="45" width="64" height="38" rx="18" fill="url(#orbit-screen)"/>
      <path d="M65 48Q90 42 115 48" stroke="#e4f8ff" strokeOpacity=".45" fill="none" strokeLinecap="round"/>
      <ellipse className="wire-eye" cx="78" cy="62" rx="4.5" ry="6.5" fill="#9af1ff"/>
      <ellipse className="wire-eye" cx="102" cy="62" rx="4.5" ry="6.5" fill="#9af1ff"/>
      <path d="M85 74Q90 78 95 74" fill="none" stroke="#90e4f4" strokeWidth="1.6" strokeLinecap="round"/>
      <rect x="77" y="110" width="26" height="21" rx="8" fill="#164365" stroke="#abcfe0" strokeWidth="1"/>
      <circle cx="90" cy="120.5" r="4" fill="#8ce8fb"/>
      <path d="M78 144H102" stroke="#396c91" strokeWidth="2" strokeLinecap="round" opacity=".5"/>
    </g>
  </svg>
}
