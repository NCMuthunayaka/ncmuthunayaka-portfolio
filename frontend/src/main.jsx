import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import './navy.css'
import './exploring.css'
import ActionIcon from './ActionIcon'
import PortfolioCompanion from './PortfolioCompanion'
import AnimatedIntro from './AnimatedIntro'
import { Motion, Network, Timeline, Architecture } from './Motion'

const siteConfig = {
  name: 'M P Nayana Chandupa Muthunayaka',
  shortName: 'NC',
  email: 'ncmuthunayaka@gmail.com',
  github: 'https://github.com/NCMuthunayaka',
  linkedin: 'https://www.linkedin.com/in/muthunayaka',
}

const projects = [
  { id: '01', title: 'GoviSense', type: 'In progress · AI + agriculture', description: 'Agricultural recommendations using real CBSL, weather, and crop-planning data. Hosted demo is currently unavailable.', tags: ['Python', 'FastAPI', 'LightGBM'], tone: 'sage' },
  { id: '02', title: 'GNSS Gaussian SLD99 Processor', type: 'Completed · desktop tool', description: 'A Python application for parsing GNSS observations, rejecting outliers, calculating weighted coordinates, and transforming to SLD99.', tags: ['Python', 'Tkinter', 'GNSS'], tone: 'blue' },
  { id: '03', title: 'WedaLink classifier', type: 'In progress · AI module', description: 'A hybrid service classifier for multilingual home-service requests, with a local model first and fallback paths planned.', tags: ['TF-IDF', 'FastAPI', 'Classification'], tone: 'peach' },
  { id: '04', title: 'Learnify', type: 'Capstone · contribution unverified', description: 'A student productivity platform for study planning, resources, community, analytics, and AI-assisted learning workflows.', tags: ['React', 'Flask', 'MySQL'], tone: 'violet' },
]

const navItems = [['/', 'Home'], ['/projects', 'Projects'], ['/about', 'About me'], ['/resume', 'Résumé'], ['/contact', 'Contact'], ['/blog', 'Blog']]

function navigate(path) { window.history.pushState({}, '', path); window.dispatchEvent(new PopStateEvent('popstate')) }
function Link({ href, children, className = '', onClick }) { return <a className={className} href={href} onClick={(e) => { onClick?.(); if (href.startsWith('/')) { e.preventDefault(); navigate(href) } }}>{children}</a> }

function Header() {
  const [open, setOpen] = useState(false)
  const currentPath = window.location.pathname
  useEffect(() => { const close = (e) => { if (e.key === 'Escape') setOpen(false) }; window.addEventListener('keydown', close); return () => window.removeEventListener('keydown', close) }, [])
  return <header className="site-header"><div className="container nav-wrap">
    <Link href="/" className="brand header-brand"><img className="brand-monogram" src="/nc-monogram.svg" alt="" width="42" height="42" /><span className="brand-name">Nayana <span>Muthunayaka</span></span></Link>
    <button className="menu-button" aria-label="Toggle navigation" aria-expanded={open} onClick={() => setOpen(!open)}><i></i><i></i></button>
    <nav className={open ? 'nav open' : 'nav'}>{navItems.map(([path, label]) => <Link key={path} href={path} className={`nav-link ${currentPath === path || (path === '/projects' && currentPath.startsWith('/projects/')) || (path === '/blog' && currentPath.startsWith('/blog/')) ? 'active' : ''}`} onClick={() => setOpen(false)}>{label}</Link>)}</nav>
    <Link href="/contact" className="nav-cta">Let’s talk <ActionIcon /></Link>
  </div></header>
}

function Footer() { return <footer className="portfolio-footer"><div className="container"><div className="footer-top"><div className="footer-identity"><img className="footer-avatar" src="/profile-photo.png" alt="Nayana Muthunayaka" width="48" height="48" loading="lazy" /><h2>Nayana Muthunayaka<span style={{color:'#7fb6ff'}}>.</span></h2><p>Software Engineering undergraduate exploring applied AI through practical projects.</p><a className="footer-email" href={`mailto:${siteConfig.email}`}>{siteConfig.email} <ActionIcon type="external" /></a></div><nav aria-label="Footer navigation"><span className="eyebrow">Explore</span>{navItems.map(([href,label])=><Link key={href} href={href}>{label}</Link>)}</nav><nav aria-label="Social links"><span className="eyebrow">Connect</span><a href={siteConfig.github}>GitHub <ActionIcon type="external" /></a><a href={siteConfig.linkedin}>LinkedIn <ActionIcon type="external" /></a><Link href="/contact">Internship enquiries</Link><p className="muted">Veyangoda, Sri Lanka<br/>Available June 2027</p></nav></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Nayana Muthunayaka. All rights reserved.</span><span>Built with React · Designed with care</span><button onClick={()=>window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}>Back to top <ActionIcon type="up" /></button></div></div></footer> }

function Button({ href, children, secondary = false }) { return <Link href={href} className={secondary ? 'button button-secondary' : 'button'}><span className="button-label">{children}</span>{!secondary && <span className="button-icon"><ActionIcon type={href === '/contact' ? 'mail' : 'forward'} /></span>}</Link> }
function SectionTitle({ eyebrow, title, text }) { return <div className="section-title"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{text && <p>{text}</p>}</div> }
function ProjectCard({ project, featured = false }) {
  return <article className={`project-card ${featured ? 'featured' : ''}`}>
    <div className={`project-art ${project.tone}`}>
      <img className="project-cover-image" src={`/projects/${project.id}-cover.png`} alt={`${project.title} — AI-generated conceptual cover`} width="1536" height="1024" loading="lazy" decoding="async" />
    </div>
    <div className="project-info">
      <div><span className="eyebrow">{project.type}</span><h3>{project.title}</h3></div>
      <p>{project.description}</p>
      <div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      <Link className="evidence-link" href={`/projects/${project.title.toLowerCase().replaceAll(" ", "-")}`}>View project <span className="project-action-icon"><ActionIcon /></span></Link>
    </div>
  </article>
}

function Home() { return <><main id="main-content">
  <section className="hero"><Network /><div className="container hero-grid"><div className="hero-copy"><div className="status"><span></span> Open to internship opportunities</div><p className="hero-kicker">Software engineering · AI systems · Sri Lanka</p><h1>Learning AI<br /><em>by building it.</em></h1><AnimatedIntro /><p className="hero-lede">I’m Nayana — a Software Engineering undergraduate who turns ideas into working projects with clear sources, thoughtful interfaces, and honest results.</p><div className="hero-actions"><Button href="/projects">View my work</Button><Button href="/about" secondary>More about me</Button></div><div className="hero-meta"><span><b>06/27</b> internship start</span><span><b>04</b> projects in view</span></div></div><div className="hero-art"><div className="hero-orbit orbit-one"></div><div className="hero-orbit orbit-two"></div><div className="portrait-card"><div className="portrait-glow"></div><img src="/profile-photo.png" alt="Portrait of Nayana" onError={(e) => { e.currentTarget.style.display = 'none' }} /><span className="portrait-fallback">NC</span><div className="portrait-label"><span>Hi, I’m Nayana</span><small>builder / learner / owner</small></div></div><div className="hero-caption">01 / A work in progress<br /><span>always becoming</span></div></div></div></section>
  <section className="exploring-strip" aria-labelledby="exploring-label"><div className="container exploring-inner"><h2 id="exploring-label"><span aria-hidden="true" className="exploring-dot" />Currently exploring</h2><ul className="exploring-topics"><li><span aria-hidden="true">01</span>Retrieval systems</li><li><span aria-hidden="true">02</span>Human-centred AI</li><li><span aria-hidden="true">03</span>Reliable software</li></ul></div></section>
  <section className="section"><div className="container"><div className="section-heading-row"><SectionTitle eyebrow="Selected work" title="A few things I’ve been thinking through." text="Early-stage work, honest labels, and the decisions behind the interface." /><Link href="/projects" className="text-link">See all projects <ActionIcon /></Link></div><div className="project-grid">{projects.map((project, i) => <ProjectCard key={project.id} project={project} featured={i === 0} />)}</div></div></section>
  <section className="statement"><div className="container statement-inner"><span className="eyebrow">A small philosophy</span><p>Good technology should make a person feel <em>more capable</em>, not more impressed.</p><Link href="/about" className="round-link">About</Link></div></section>
  <section className="contact-band"><div className="container contact-inner"><div><span className="eyebrow">Have a good question?</span><h2>Let’s make<br /><em>something useful.</em></h2></div><Button href="/contact">Get in touch</Button></div></section>
 </main></> }

function LoadingState() { return <div className="loading-state" role="status">Loading thoughtfully…</div> }
function Page({ type, title, intro, children, pageTitle = type }) { useEffect(() => { document.title = `${pageTitle} — ${siteConfig.name}`; window.scrollTo(0, 0) }, [pageTitle]); return <main id="main-content" className="inner-page"><div className="container page-intro"><span className="eyebrow">{type}</span><h1>{title}</h1>{intro && <p>{intro}</p>}</div>{children}</main> }
function Projects() { return <Page type="Selected work" pageTitle="Projects" title={<>Projects with a point<br /><em>of view.</em></>} intro="A growing collection of experiments and systems. Each one starts with a question, then earns its way toward an answer."><div className="container project-grid page-projects">{projects.map(p => <ProjectCard key={p.id} project={p} featured />)}</div></Page> }
function ProjectDetail({ slug }) { const project = projects.find(p => p.title.toLowerCase().replaceAll(' ', '-').replaceAll('—', '').replaceAll('--', '-') === slug); if (!project) return <NotFound />; return <Page type={project.type} pageTitle={project.title} title={<>{project.title}<br /><em>case study.</em></>} intro={project.description}><div className="container detail-card"><span className="eyebrow">Evidence status</span><h2>{project.title}</h2><p>This case study is structured for the Day 3 content pass. Replace this placeholder with the approved problem statement, contribution, architecture, verified result, links, and improvements from the project evidence register.</p><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div><Architecture id={project.id} /><span className="coming-pill">{project.type} · details pending evidence review</span></div></Page> }
function About() { return <Page type="A little context" pageTitle="About me" title={<>A person behind<br /><em>the projects.</em></>} intro="I’m a Software Engineering undergraduate at Sabaragamuwa University of Sri Lanka, learning AI by building it and looking for an AI Engineering internship."><div className="container about-layout"><div className="about-block"><span className="eyebrow">The short version</span><p className="large-copy">I turn ideas into working projects with clear sources and honest results. Python and AWS have been practical parts of my learning, alongside software, data, and AI experiments.</p></div><div className="about-block"><span className="eyebrow">Right now</span><p>I’m in Year 3, Semester 2 and available from June 2027 for a flexible six-month internship. I’m open to any work mode and not planning to relocate.</p><div className="about-list"><div><span>Focus</span><b>Retrieval AI · Python · cloud apps</b></div><div><span>Based in</span><b>Veyangoda, Sri Lanka</b></div><div><span>Education</span><b>BSc Hons Software Engineering · 2028</b></div><div><span>Beyond code</span><b>Ornamental fish breeder and supplier</b></div></div></div></div><Timeline /></Page> }
function Resume() { return <Page type="A living document" pageTitle="Résumé" title={<>The useful<br /><em>one-page version.</em></>} intro="A concise overview of what I’m learning, making, and hoping to contribute to next."><div className="container resume-card"><div><span className="resume-initials">{siteConfig.shortName}</span><h2>{siteConfig.name}</h2><p>Software Engineering undergraduate · AI builder</p></div><div className="resume-lines"><div><span>Education</span><b>Bachelor of Science Honours in Software Engineering <small>Sabaragamuwa University of Sri Lanka · expected 2028</small></b></div><div><span>Strengths</span><b>Python · AWS · FastAPI · React · data thinking</b></div><div><span>Looking for</span><b>AI Engineering internship · June 2027 · six months flexible</b></div></div><Button href="/contact">Request résumé</Button></div></Page> }
function Contact() { return <Page type="Open channel" pageTitle="Contact" title={<>Let’s start with<br /><em>a hello.</em></>} intro="For internship conversations, thoughtful collaboration, or a good technical question — my inbox is open."><div className="container contact-grid"><a className="contact-card" href={`mailto:${siteConfig.email}`}><span className="eyebrow">Email</span><strong>{siteConfig.email}</strong><span>Send a note <ActionIcon type="mail" /></span></a><a className="contact-card" href={siteConfig.linkedin}><span className="eyebrow">LinkedIn</span><strong>Let’s connect</strong><span>Open profile <ActionIcon type="external" /></span></a><a className="contact-card" href={siteConfig.github}><span className="eyebrow">GitHub</span><strong>See the code</strong><span>Open profile <ActionIcon type="external" /></span></a><div className="availability"><span className="status"><span></span> Available from June 2027</span><p>Seeking a flexible six-month AI Engineering internship. Preferred work mode: any. Relocation: not planned.</p></div></div></Page> }
function Blog() { return <Page type="Notes from the build" pageTitle="Blog" title={<>Thinking in<br /><em>public.</em></>} intro="Short technical notes, decisions, and lessons learned as the portfolio takes shape."><div className="container blog-empty"><span className="blog-number">01</span><div><span className="eyebrow">First note · draft</span><h2>What makes a portfolio feel trustworthy?</h2><p>A short essay about evidence, honest labels, and why the best interface might be the one that knows what it doesn’t know yet.</p></div></div></Page> }
function BlogDetail() { return <Page type="Technical note" pageTitle="What makes a portfolio feel trustworthy?" title={<>What makes a portfolio<br /><em>feel trustworthy?</em></>} intro="A draft about evidence, honest labels, and useful boundaries."><div className="container detail-card"><span className="eyebrow">Draft · 2026</span><h2>Fewer claims, better evidence.</h2><p>The full approved 500–800 word article will be entered during the content and publishing pass. This route is ready for the final article body and related project links.</p><span className="coming-pill">Draft content · related projects pending</span></div></Page> }
function NotFound() { return <Page type="404" pageTitle="Page not found" title={<>This path is<br /><em>still becoming.</em></>} intro="The page you’re looking for hasn’t found its way here yet."><div className="container"><Button href="/">Back home</Button></div></Page> }

function App() { const [path, setPath] = useState(window.location.pathname); useEffect(() => { const fn = () => setPath(window.location.pathname); window.addEventListener('popstate', fn); return () => window.removeEventListener('popstate', fn) }, []); let page = path === '/' ? <Home /> : path === '/projects' ? <Projects /> : path.startsWith('/projects/') ? <ProjectDetail slug={path.split('/')[2]} /> : path === '/about' ? <About /> : path === '/resume' ? <Resume /> : path === '/contact' ? <Contact /> : path === '/assistant' ? <Home /> : path === '/blog' ? <Blog /> : path.startsWith('/blog/') ? <BlogDetail /> : <NotFound />; return <><a className="skip-link" href="#main-content">Skip to content</a><Motion path={path} /><Header />{page}<Footer /><PortfolioCompanion /></> }

import './smooth-motion.css'
import './actions.css'
import './statement-layout.css'

createRoot(document.getElementById('root')).render(<App />)
