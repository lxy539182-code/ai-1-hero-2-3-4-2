import { useEffect, useRef, useState } from 'react'
import {
  capabilities,
  experience,
  mediaUrl,
  navItems,
  profileStats,
  projectFilters,
  projects,
} from './data.js'

function ArrowUpRight({ size = 18 }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path d="M5 19 19 5M8 5h11v11" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function ArrowDown({ size = 18 }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path d="M12 4v16m0 0 6-6m-6 6-6-6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function CloseIcon({ size = 20 }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

function PlayIcon({ size = 18 }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path d="m9 6 9 6-9 6V6Z" fill="currentColor" />
    </svg>
  )
}

function SectionMark({ index, children }) {
  return (
    <div className="section-mark">
      <span className="section-mark__index">{index}</span>
      <span className="section-mark__rule" />
      <span>{children}</span>
    </div>
  )
}

function Header({ activeId }) {
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrolled(window.scrollY > 24)
      setProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}`}>
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />
      <div className="container site-header__inner">
        <a className="brand" href="#home" aria-label="李鑫宇作品集，返回首页">
          <span className="brand__mark">LX</span>
          <span className="brand__divider" />
          <span className="brand__name">
            李鑫宇
            <small>VISUAL PRACTICE</small>
          </span>
        </a>

        <nav className="main-nav" aria-label="主导航">
          {navItems.map((item) => (
            <a
              key={item.id}
              className={activeId === item.id ? 'is-active' : ''}
              href={`#${item.id}`}
              aria-current={activeId === item.id ? 'page' : undefined}
            >
              <span>{item.index}</span>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="header-contact" href="#contact">
          <span>聊聊合作</span>
          <ArrowUpRight size={16} />
        </a>
      </div>
    </header>
  )
}

function Hero() {
  const videoRef = useRef(null)
  const [clock, setClock] = useState('')

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.playbackRate = 0.82
    }

    const setTime = () => {
      setClock(
        new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Shanghai',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(new Date()),
      )
    }

    setTime()
    const timer = window.setInterval(setTime, 30_000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <video
        ref={videoRef}
        className="hero__video"
        autoPlay
        muted
        loop
        playsInline
        poster={mediaUrl('/media/hero-poster.jpg')}
        aria-hidden="true"
      >
        <source src={mediaUrl('/media/hero-loop.webm')} type="video/webm" />
      </video>
      <div className="hero__wash" aria-hidden="true" />
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__frame" aria-hidden="true" />
      <div className="hero__wordmark" aria-hidden="true">
        LIXINYU
      </div>

      <div className="container hero__inner">
        <div className="hero__top">
          <div className="hero__kicker">
            <span className="signal-dot" />
            <span>Li Xinyu / Visual Portfolio</span>
            <span className="hero__kicker-slash">/</span>
            <span>2026</span>
          </div>
          <div className="hero__roles">
            <span>剪辑师</span>
            <span>AIGC Designer</span>
            <span>品牌设计</span>
          </div>
        </div>

        <div className="hero__main">
          <div className="hero__orbit" aria-hidden="true">
            <svg viewBox="0 0 820 280" fill="none">
              <path
                d="M23 154C174 48 471 15 682 87C795 126 744 194 566 236C347 288 111 244 38 185"
                stroke="rgba(240,235,225,.52)"
              />
              <path
                d="M103 201C250 263 489 273 668 212C768 178 787 125 704 93"
                stroke="rgba(216,255,84,.48)"
                strokeDasharray="4 7"
              />
              <g transform="translate(472 86) rotate(-8)">
                <circle r="30" fill="rgba(8,9,9,.7)" stroke="rgba(240,235,225,.56)" />
                <ellipse rx="12" ry="30" stroke="rgba(240,235,225,.36)" />
                <path d="M-30 0h60M-26 11h52M-26-11h52" stroke="rgba(240,235,225,.36)" />
                <circle cx="27" cy="-27" r="4" fill="#d8ff54" />
              </g>
              <path
                d="m704 92 7-18 6 18 18 6-18 6-6 19-7-19-18-6 18-6Z"
                stroke="rgba(216,255,84,.8)"
              />
            </svg>
            <span className="hero__orbit-label">EDIT / GENERATE / BUILD</span>
            <span className="hero__orbit-year">SINCE 2023</span>
          </div>

          <div className="hero__folio">
            <div className="hero__folio-meta">
              <span>VISUAL PRACTICE</span>
              <span>PORTFOLIO / 2026</span>
            </div>

            <h1
              className="hero__folio-title"
              id="hero-title"
              aria-label="Portfolio，作品集"
            >
              <span className="hero__folio-line">
                Port
                <span className="hero__spark" aria-hidden="true">
                  ✦
                </span>
              </span>
              <span className="hero__folio-line hero__folio-line--second">
                Folio<span className="hero__folio-period">.</span>
              </span>
            </h1>

            <div className="hero__folio-caption">
              <span className="hero__folio-caption-rule" />
              <p>
                把画面，剪成<span>回响</span>。
              </p>
              <small>剪辑 / AIGC / 品牌视觉</small>
            </div>
          </div>

          <div className="hero__vertical" aria-hidden="true">
            <span>作</span>
            <span>品</span>
            <span>集</span>
          </div>
        </div>

        <div className="hero__bottom">
          <a className="hero__scroll" href="#about">
            <span className="hero__scroll-icon">
              <ArrowDown size={17} />
            </span>
            <span>
              VIEW
              <br />
              DOWN
            </span>
          </a>

          <p className="hero__statement">
            我在<span>剪辑、AIGC 与品牌视觉</span>之间工作，
            <br />
            让每一帧都有它存在的理由。
          </p>

          <div className="hero__actions">
            <a className="button button--light" href="#work">
              查看精选项目
              <ArrowUpRight />
            </a>
            <a className="button button--ghost" href="#contact">
              联系我
              <ArrowUpRight />
            </a>
          </div>

          <div className="hero__system">
            <span>CHINA / UTC+8</span>
            <span>{clock}</span>
            <span className="hero__system-live">
              <i />
              OPEN TO WORK
            </span>
          </div>
        </div>
      </div>

      <div className="hero__ticker" aria-hidden="true">
        <div className="hero__ticker-track">
          {[0, 1].map((group) => (
            <div className="hero__ticker-group" key={group}>
              <span>LI XINYU / VISUAL PORTFOLIO</span>
              <i>✦</i>
              <span>AIGC FILM</span>
              <i>✦</i>
              <span>TOUCHDESIGNER</span>
              <i>✦</i>
              <span>NARRATIVE FILM</span>
              <i>✦</i>
              <span>2026</span>
              <i>✦</i>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Profile() {
  return (
    <section className="section profile" id="about" aria-labelledby="profile-title">
      <div className="container">
        <SectionMark index="01">PROFILE / 个人经历</SectionMark>

        <div className="profile__lead" data-reveal>
          <p className="profile__lead-en">
            VISUAL DIRECTOR
            <br />
            IN THE MAKING.
          </p>
          <h2 className="profile__headline" id="profile-title">
            我在不同媒介之间，
            <br />
            寻找同一种<span>表达力度</span>。
          </h2>
        </div>

        <div className="profile__grid">
          <figure className="identity-plate" data-reveal>
            <div className="identity-plate__glow" aria-hidden="true" />
            <div className="identity-plate__grid" aria-hidden="true" />
            <div className="identity-plate__head">
              <span>VISUAL PRACTICE / IDENTITY</span>
              <span>001</span>
            </div>
            <div className="identity-plate__monogram" aria-hidden="true">
              <span>L</span>
              <span>X</span>
            </div>
            <div className="identity-plate__tracks" aria-hidden="true">
              <div className="identity-track">
                <span>01 / EDIT</span>
                <svg viewBox="0 0 420 62" preserveAspectRatio="none">
                  <path d="M0 31h54l9-21 12 43 13-31 9 18 11-36 13 54 16-38 11 25 12-14 10 23 9-15 12 9 9-27 12 38 14-21 12 9 10-18 13 29 9-12 11 5 10-19 14 31 12-14 10 7 10-24 12 26 8-12 12 4 10-20 10 26 12-8 10 3 4-20" />
                </svg>
              </div>
              <div className="identity-track">
                <span>02 / GENERATE</span>
                <div className="identity-track__nodes">
                  {Array.from({ length: 18 }, (_, index) => (
                    <i key={index} />
                  ))}
                </div>
              </div>
              <div className="identity-track">
                <span>03 / BRAND</span>
                <div className="identity-track__blocks">
                  <i />
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            </div>
            <div className="identity-plate__playhead" aria-hidden="true">
              <span>PLAYHEAD</span>
            </div>
            <div className="identity-plate__footer">
              <div>
                <small>DISCIPLINES</small>
                <strong>03</strong>
              </div>
              <div>
                <small>APPROACH</small>
                <strong>FRAME BY FRAME</strong>
              </div>
              <span className="identity-plate__status">
                <i />
                OPEN TO WORK
              </span>
            </div>
            <figcaption>
              <span>LI XINYU</span>
              <span>VISUAL IDENTITY / 2026</span>
            </figcaption>
          </figure>

          <div className="profile__content">
            <div className="profile__copy" data-reveal>
              <div className="profile__copy-head">
                <span>HELLO, I&apos;M</span>
                <strong>李鑫宇</strong>
              </div>
              <p>
                数字媒体艺术专业在读，目前持续实践剪辑、AIGC
                视觉与品牌设计。习惯从内容本身出发，先想清楚为什么，再决定画面长什么样。
              </p>
              <p>
                做过 AIGC 广告、实时交互、情景短片、博物馆文创和线下陈列。比起把工具用得更复杂，我更在意
                <em>一个创意能否被准确地做出来、被更多人看见。</em>
              </p>
            </div>

            <div className="profile__contact" data-reveal>
              <a href="tel:+8613661751338">
                <span>PHONE</span>
                +86 136 6175 1338
              </a>
              <a href="mailto:13661751338@163.com">
                <span>EMAIL</span>
                13661751338@163.com
              </a>
              <div>
                <span>BASE</span>
                CHINA · OPEN TO WORK
              </div>
            </div>

            <div className="profile__stats" data-reveal>
              {profileStats.map((stat) => (
                <div className="stat" key={stat.label}>
                  <span className="stat__note">{stat.note}</span>
                  <strong>{stat.value}</strong>
                  <p>{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="experience" data-reveal>
              <div className="experience__head">
                <span>EXPERIENCE &amp; EDUCATION</span>
                <span>经历 / 教育</span>
              </div>
              <div className="experience__list">
                {experience.map((item) => (
                  <div className="experience__row" key={item.period}>
                    <span className="experience__period">{item.period}</span>
                    <div>
                      <h3>{item.place}</h3>
                      <p>{item.role}</p>
                    </div>
                    <span className="experience__note">{item.note}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, onSelect }) {
  return (
    <button
      type="button"
      className={`project-card project-card--${project.size} project-card--video`}
      onClick={() => onSelect(project)}
      aria-label={`查看项目：${project.title}`}
    >
      <span className="project-card__visual">
        <img src={project.image} alt={project.alt} loading="lazy" />
        <span className="project-card__shade" aria-hidden="true" />
        <span className="project-card__tag">
          <i />
          {project.categoryLabel}
        </span>
        <span className="project-card__play" aria-hidden="true">
          <PlayIcon size={17} />
        </span>
        <span className="project-card__view">
          播放预览
          <ArrowUpRight size={17} />
        </span>
      </span>
      <span className="project-card__info">
        <span className="project-card__index">{project.index}</span>
        <span className="project-card__title">
          <strong>{project.title}</strong>
          <small>{project.subtitle}</small>
        </span>
        <span className="project-card__meta">
          <span>{project.year}</span>
          <span>{project.metrics[0].value}</span>
        </span>
        <span className="project-card__arrow">
          <ArrowUpRight size={22} />
        </span>
      </span>
    </button>
  )
}

function Projects({ onSelect }) {
  const [activeFilter, setActiveFilter] = useState('all')
  const visibleProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((project) => project.category === activeFilter)

  return (
    <section className="section projects" id="work" aria-labelledby="work-title">
      <div className="container">
        <SectionMark index="02">SELECTED WORK / 精选项目</SectionMark>

        <div className="projects__head" data-reveal>
          <h2 id="work-title">
            Selected
            <br />
            <span>Works.</span>
          </h2>
          <div className="projects__head-copy">
            <p>
              六件作品沿着生成影像、实时交互与实拍叙事展开。
              <br />
              从被控制的画面，到能够自己生长的镜头。
            </p>
            <span>06 PROJECTS / 04 AIGC · 01 INTERACTIVE · 01 FILM</span>
          </div>
        </div>

        <div className="work-toolbar" data-reveal>
          <div className="work-toolbar__index">
            <span>INDEX / 2026</span>
            <strong>06 PROJECTS</strong>
          </div>
          <div className="work-filters" role="group" aria-label="按作品类型筛选">
            {projectFilters.map((filter) => (
              <button
                type="button"
                key={filter.id}
                className={activeFilter === filter.id ? 'is-active' : ''}
                onClick={() => setActiveFilter(filter.id)}
                aria-pressed={activeFilter === filter.id}
              >
                <span>{filter.en}</span>
                {filter.label}
                <sup>{filter.count}</sup>
              </button>
            ))}
          </div>
        </div>

        <div
          className={`projects__grid projects__grid--${activeFilter}`}
          data-reveal
          aria-live="polite"
        >
          {visibleProjects.map((project) => (
            <ProjectCard
              project={project}
              key={`${activeFilter}-${project.id}`}
              onSelect={onSelect}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function Capabilities() {
  return (
    <section
      className="section capabilities"
      id="capabilities"
      aria-labelledby="capabilities-title"
    >
      <div className="container">
        <SectionMark index="03">WHAT I DO / 个人优势</SectionMark>

        <div className="capabilities__head" data-reveal>
          <h2 id="capabilities-title">
            不只一种
            <br />
            <span>视觉能力。</span>
          </h2>
          <p>
            剪辑是节奏判断，AIGC 是方向控制，品牌是系统一致性。
            <br />
            三种能力在同一条工作流里发生，而不是彼此孤立的工具清单。
          </p>
        </div>

        <div className="capabilities__grid">
          {capabilities.map((capability) => (
            <article className="capability" key={capability.id} data-reveal>
              <div className="capability__top">
                <span>{capability.eyebrow}</span>
                <span>{capability.index}</span>
              </div>
              <div className="capability__signal" aria-hidden="true">
                <span />
                <span />
                <span />
                <i />
              </div>
              <p className="capability__en">{capability.en}</p>
              <h3>{capability.title}</h3>
              <p className="capability__description">{capability.description}</p>
              <ul>
                {capability.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <span className="capability__number" aria-hidden="true">
                {capability.index}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const [clock, setClock] = useState('')

  useEffect(() => {
    const setTime = () =>
      setClock(
        new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Shanghai',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(new Date()),
      )

    setTime()
    const timer = window.setInterval(setTime, 30_000)
    return () => window.clearInterval(timer)
  }, [])

  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="contact__orb" aria-hidden="true" />
      <div className="contact__grid" aria-hidden="true" />
      <div className="container contact__inner">
        <div className="contact__top">
          <SectionMark index="04">CONTACT / 联系方式</SectionMark>
          <span className="contact__availability">
            <i />
            AVAILABLE FOR SELECTED PROJECTS
          </span>
        </div>

        <div className="contact__main">
          <p className="contact__eyebrow" data-reveal>
            HAVE A STORY? LET&apos;S PUT IT IN MOTION.
          </p>
          <h2 id="contact-title" data-reveal>
            让下一帧，
            <br />
            <span>值得被看见。</span>
          </h2>

          <div className="contact__links" data-reveal>
            <a className="contact__email" href="mailto:13661751338@163.com">
              <span className="contact__email-label">START A CONVERSATION</span>
              <span className="contact__email-value">
                13661751338@163.com
                <ArrowUpRight size={42} />
              </span>
            </a>

            <div className="contact__details">
              <a href="tel:+8613661751338">
                <span>PHONE / 电话</span>
                +86 136 6175 1338
              </a>
              <div>
                <span>BASE / 所在地</span>
                CHINA · UTC+8
              </div>
              <div>
                <span>LOCAL TIME / 当前时间</span>
                {clock}
              </div>
            </div>
          </div>
        </div>

        <footer className="site-footer">
          <span>© 2026 LI XINYU</span>
          <span>EDITOR / AIGC DESIGNER / BRAND VISUAL</span>
          <a href="#home">
            BACK TO TOP
            <ArrowUpRight size={15} />
          </a>
        </footer>
      </div>
    </section>
  )
}

function ProjectModal({ project, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!project) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [project, onClose])

  if (!project) return null

  return (
    <div
      className="project-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className="project-modal__panel">
        <button
          ref={closeRef}
          className="project-modal__close"
          type="button"
          onClick={onClose}
          aria-label="关闭项目详情"
        >
          <CloseIcon />
        </button>

        <div
          className={`project-modal__visual${project.video ? ' project-modal__visual--video' : ''}`}
        >
          <video
            controls
            playsInline
            preload="none"
            poster={project.image}
            aria-label={`${project.title} 视频预览`}
          >
            <source src={project.video} type="video/webm" />
          </video>
          <span>
            <i />
            PREVIEW / {project.previewLabel}
          </span>
        </div>

        <div className="project-modal__content">
          <div className="project-modal__heading">
            <p>
              {project.index} / {project.categoryLabel} / {project.subtitle}
            </p>
            <h2 id="project-modal-title">{project.title}</h2>
          </div>

          {project.downloadUrl && (
            <div className="project-modal__download-row">
              <div className="project-modal__download-copy">
                <span>
                  <i />
                  MASTER FILE / DIRECT DOWNLOAD
                </span>
                <strong>下载完整成片</strong>
                <small>
                  MP4 / {project.downloadDuration} / {project.downloadSize} / ORIGINAL CUT
                </small>
              </div>
              <a
                className="project-modal__download-action"
                href={project.downloadUrl}
                download={project.downloadName}
                aria-label={`下载《${project.title}》完整成片，${project.downloadSize}`}
              >
                <span>
                  <small>FULL FILM</small>
                  <b>保存 .MP4</b>
                </span>
                <ArrowDown size={24} />
              </a>
            </div>
          )}

          <div className="project-modal__body">
            <div>
              <p className="project-modal__lead">{project.excerpt}</p>
              <p className="project-modal__description">{project.description}</p>
              <div className="project-modal__roles">
                {project.roles.map((role) => (
                  <span key={role}>{role}</span>
                ))}
              </div>
              <div className="project-modal__tools">
                <span>TOOLS /</span>
                {project.tools.map((tool) => (
                  <span key={tool}>{tool}</span>
                ))}
              </div>
            </div>

            <aside>
              <span className="project-modal__year">YEAR / {project.year}</span>
              <div className="project-modal__metrics">
                {project.metrics.map((metric) => (
                  <div key={metric.label}>
                    <strong>{metric.value}</strong>
                    <span>{metric.label}</span>
                  </div>
                ))}
              </div>
            </aside>
          </div>

          {project.gallery?.length > 0 && (
            <div className="project-modal__gallery-wrap">
              <div className="project-modal__gallery-head">
                <span>STILLS &amp; PROCESS</span>
                <span>{String(project.gallery.length).padStart(2, '0')} IMAGES</span>
              </div>
              <div className="project-modal__gallery">
                {project.gallery.map((image, index) => (
                  <figure key={image.src}>
                    <img src={image.src} alt={image.alt} loading="lazy" />
                    <figcaption>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      {image.label}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [activeId, setActiveId] = useState('home')
  const [selectedProject, setSelectedProject] = useState(null)

  useEffect(() => {
    const revealNodes = [...document.querySelectorAll('[data-reveal]')]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -7% 0px' },
    )

    revealNodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const sectionNodes = navItems
      .map((item) => document.getElementById(item.id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible[0]) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-28% 0px -58% 0px', threshold: [0, 0.1, 0.35] },
    )

    sectionNodes.forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">
        跳到主要内容
      </a>
      <div className="noise-layer" aria-hidden="true" />
      <Header activeId={activeId} />
      <main id="main">
        <Hero />
        <Profile />
        <Projects onSelect={setSelectedProject} />
        <Capabilities />
        <Contact />
      </main>
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  )
}
