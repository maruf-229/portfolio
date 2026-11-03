import { useEffect, useRef, useState } from 'react'
import { motion, MotionConfig, useScroll, useSpring, useTransform, useInView, animate } from 'framer-motion'
import { links, stats, stack, skills, jobs, projects, research, now, edu } from './data.js'

const img = (n) => `${import.meta.env.BASE_URL}images/${n}`
const NAV = ['About','Experience','Projects','Research','Beyond code','Contact']
const id = (s) => s.toLowerCase().replace(/\s/g, '-')

function Count({ n, suffix = '', dec = 0, plain }) {
  const ref = useRef(null); const seen = useInView(ref, { once: true })
  const [v, setV] = useState(plain ? n : 0)
  useEffect(() => { if (seen && !plain) { const c = animate(0, n, { duration: 1.6, ease: 'easeOut', onUpdate: (x) => setV(x) }); return () => c.stop() } }, [seen])
  return <span ref={ref}>{plain ? n : v.toFixed(dec)}{suffix}</span>
}

function Nav() {
  const { scrollYProgress } = useScroll(); const w = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  return (
    <header className="nav">
      <motion.div className="progress" style={{ scaleX: w }} />
      <a href="#top" className="brand">Maruf Hossain</a>
      <nav aria-label="Primary">{NAV.map((n) => <a key={n} href={`#${id(n)}`}>{n}</a>)}</nav>
    </header>
  )
}

function Hero() {
  const ref = useRef(null)
  const tilt = (e) => {
    const r = ref.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5
    ref.current.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`
  }
  const reset = () => (ref.current.style.transform = '')
  const words = ['Maruf', 'Hossain']
  return (
    <section id="top" className="hero">
      <div className="hero-copy">
        <motion.p className="kicker" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>Software engineer in Dhaka, Bangladesh</motion.p>
        <h1 aria-label="Maruf Hossain">
          {words.map((w, i) => (
            <span className="mask" key={w}><motion.span initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ delay: 0.15 + i * 0.12, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}>{w}</motion.span></span>
          ))}
        </h1>
        <motion.p className="lede" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
          I build Laravel and full-stack systems that stay fast under load: travel booking engines, ISP billing, pharmacy software. Next, I want to research how AI can make web software safer.
        </motion.p>
        <motion.div className="cta" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}>
          <a className="btn primary" href="#projects">See my work</a>
          <a className="btn" href={`${import.meta.env.BASE_URL}Maruf_Resume.pdf`} download>Download résumé</a>
        </motion.div>
      </div>
      <motion.div className="hero-photo" initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.9 }}>
        <div className="tilt" ref={ref} onMouseMove={tilt} onMouseLeave={reset}>
          <img src={img('profile.jpg')} alt="Maruf Hossain in a navy suit" />
        </div>
        <motion.div className="badge" animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}>
          <b>Open to PhD positions</b><span>AI-assisted software engineering · Finland</span>
        </motion.div>
      </motion.div>
    </section>
  )
}

const Reveal = ({ children, className }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}>{children}</motion.div>
)

function About() {
  return (
    <section id="about" className="sec">
      <div className="stats">
        {stats.map((s) => (<Reveal key={s.label} className="stat"><strong><Count {...s} /></strong><span>{s.label}</span></Reveal>))}
      </div>
      <div className="about">
        <Reveal className="about-img"><img src={img('dev-toon.jpg')} alt="Illustration of Maruf coding with a coffee mug" loading="lazy" /></Reveal>
        <Reveal className="about-copy">
          <h2>Backend depth, shipped end to end</h2>
          <p>I have more than three years of experience building scalable web applications, APIs and full-stack systems in Laravel and PHP. My work spans OTA travel platforms, ISP billing, pharmacy management and corporate sites, from backend architecture through to AWS deployment.</p>
          <p>I hold a BSc in Software Engineering from Daffodil International University and I am finishing an MSc in Information Technology at Jahangirnagar University. After that, I plan to pursue a PhD in AI-assisted software engineering or secure web systems.</p>
          <div className="skills">{skills.map((s) => (<div key={s.g}><h3>{s.g}</h3><ul>{s.t.map((t) => <li key={t}>{t}</li>)}</ul></div>))}</div>
        </Reveal>
      </div>
      <div className="marquee" aria-hidden="true"><div className="track">{[...stack, ...stack].map((s, i) => <span key={i}>{s}</span>)}</div></div>
    </section>
  )
}

function Experience() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] })
  const h = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  return (
    <section id="experience" className="sec">
      <h2 className="sec-title">Experience</h2>
      <div className="timeline" ref={ref}>
        <div className="rail"><motion.div style={{ height: h }} /></div>
        {jobs.map((j) => (
          <Reveal key={j.co} className="job">
            <span className="dot" />
            <div className="job-head"><h3>{j.role}</h3><time>{j.when}</time></div>
            <p className="co">{j.co}</p>
            <ul>{j.pts.map((p) => <li key={p}>{p}</li>)}</ul>
          </Reveal>
        ))}
      </div>
      <div className="edu">{edu.map((e) => (<Reveal key={e.d} className="edu-item"><time>{e.y}</time><h3>{e.d}</h3><p>{e.s}</p><small>{e.n}</small></Reveal>))}</div>
    </section>
  )
}

function Projects() {
  return (
    <section id="projects" className="sec">
      <h2 className="sec-title">Projects</h2>
      <ul className="projects">
        {projects.map((p) => {
          const Tag = p.url ? 'a' : 'div'
          return (
            <li key={p.name}>
              <Tag className="proj" {...(p.url ? { href: p.url, target: '_blank', rel: 'noreferrer' } : {})}>
                <h3>{p.name}{p.wip && <em>In progress</em>}</h3>
                <p>{p.d}</p>
                <div className="tags">{p.t.map((t) => <span key={t}>{t}</span>)}</div>
                {p.url && <span className="visit">Visit site ↗</span>}
              </Tag>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

function Research() {
  return (
    <section id="research" className="sec">
      <h2 className="sec-title">Research</h2>
      <div className="research">
        <div className="r-grid">{research.map(([t, d]) => (<Reveal key={t} className="r-card"><h3>{t}</h3><p>{d}</p></Reveal>))}</div>
        <Reveal className="now"><h3>Right now</h3><ul>{now.map((n) => <li key={n}>{n}</li>)}</ul><p className="open">Open to research collaborations and academic discussions in software engineering and web security.</p></Reveal>
      </div>
    </section>
  )
}

function Beyond() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const a = useTransform(scrollYProgress, [0, 1], [60, -60]), b = useTransform(scrollYProgress, [0, 1], [-40, 40])
  return (
    <section id="beyond-code" className="sec beyond" ref={ref}>
      <div className="beyond-copy">
        <h2>Code by day. Iron by evening.</h2>
        <p>Training is my other discipline. Progressive overload and steady habits teach the same lesson I apply to software: small, consistent improvements compound into something solid.</p>
      </div>
      <div className="gym">
        <motion.figure style={{ y: a }}><img src={img('gym-mirror.jpg')} alt="Maruf in the gym, mirror portrait" loading="lazy" /></motion.figure>
        <motion.figure className="wide" style={{ y: b }}><img src={img('gym-wide.jpg')} alt="Maruf in a gym filming a workout" loading="lazy" /></motion.figure>
      </div>
    </section>
  )
}

function Contact() {
  return (
    <section id="contact" className="sec contact">
      <Reveal>
        <h2>Let’s build, or research, something together.</h2>
        <a className="mail" href={`mailto:${links.email}`}>{links.email}</a>
        <div className="cta"><a className="btn primary" href={`mailto:${links.email}`}>Send an email</a><a className="btn" href={links.github} target="_blank" rel="noreferrer">GitHub profile</a></div>
      </Reveal>
      <footer>© {new Date().getFullYear()} Maruf Hossain · Dhaka, Bangladesh</footer>
    </section>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="bg" aria-hidden="true"><i /><i /></div>
      <Nav />
      <main><Hero /><About /><Experience /><Projects /><Research /><Beyond /><Contact /></main>
    </MotionConfig>
  )
}
