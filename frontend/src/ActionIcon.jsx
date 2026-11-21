import React from 'react'

export default function ActionIcon({ type = 'forward' }) {
  const paths = {
    forward: 'M4 12h15m-6-6 6 6-6 6',
    external: 'M9 5h10v10M19 5 5 19',
    mail: 'M4 6h16v12H4zM4 7l8 6 8-6',
    up: 'M12 20V4m-6 6 6-6 6 6'
  }
  return <svg className={`action-icon icon-${type}`} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d={paths[type] || paths.forward}/></svg>
}
