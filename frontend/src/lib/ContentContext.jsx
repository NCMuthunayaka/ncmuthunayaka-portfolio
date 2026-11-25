import React, { createContext, useContext, useEffect, useState } from 'react'
import { fallbackContent, fallbackProfile, fetchContent } from './content.mjs'
const Context = createContext(fallbackContent)
export const useContent = () => useContext(Context)
export function ContentProvider({ children }) {
  const configured = Boolean(import.meta.env.VITE_SANITY_PROJECT_ID)
  const [content, setContent] = useState(configured ? { profile: fallbackProfile, projects: [], posts: [], activities: [], faqs: [] } : fallbackContent)
  const [status, setStatus] = useState(configured ? 'loading' : 'local')
  useEffect(() => {
    if (!configured) return
    let active = true
    const refresh = async () => { try {
      const data = await fetchContent({ projectId: import.meta.env.VITE_SANITY_PROJECT_ID, dataset: import.meta.env.VITE_SANITY_DATASET || 'production' })
      if (active) { setContent(data); setStatus('ready') }
    } catch { if (active) { setContent({ profile: fallbackProfile, projects: [], posts: [], activities: [], faqs: [] }); setStatus('error') } } }
    refresh(); const timer = setInterval(refresh, 60000)
    return () => { active = false; clearInterval(timer) }
  }, [configured])
  return <Context.Provider value={{ ...content, status }}>{children}</Context.Provider>
}
