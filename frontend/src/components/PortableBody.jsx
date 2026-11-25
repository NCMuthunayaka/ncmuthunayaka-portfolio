import React from 'react'
import { safeURL } from '../lib/content.mjs'
export default function PortableBody({ blocks = [] }) {
  return blocks.map((block, i) => {
    if (block._type === 'codeBlock') return <pre key={block._key || i}><code>{block.code}</code></pre>
    if (block._type !== 'block') return null
    const children = (block.children || []).map((span, j) => {
      let node = span.text
      for (const mark of span.marks || []) {
        if (mark === 'strong') node = <strong>{node}</strong>
        else if (mark === 'em') node = <em>{node}</em>
        else if (mark === 'code') node = <code>{node}</code>
        else { const def = block.markDefs?.find(d => d._key === mark); if (safeURL(def?.href)) node = <a href={safeURL(def.href)}>{node}</a> }
      }
      return <React.Fragment key={j}>{node}</React.Fragment>
    })
    const Tag = ['h2', 'h3', 'h4', 'blockquote'].includes(block.style) ? block.style : 'p'
    return block.listItem ? <ul key={block._key || i}><li>{children}</li></ul> : <Tag key={block._key || i}>{children}</Tag>
  })
}
