import { useState, useEffect, useCallback } from "react";
import { i18n } from "./i18n.js";
import { posts, sidebarPosts } from "./data.js";
import { impressumHTML, datenschutzHTML } from "./legal.js";

/* ─────────────────────────────────────────────────────────────
   BeJoy — React/Vite (Architektur nach DerNachruf).
   Navigation läuft komplett über React-State (onClick) bzw.
   native Anker-Links. KEIN preventDefault, KEIN scrollIntoView,
   keine document-Klick-Delegation → Klicks funktionieren überall.
───────────────────────────────────────────────────────────── */

const LANGS = ["de", "en", "es"];

const Logo = () => (
  <svg className="logo-svg" viewBox="0 0 42 42" fill="none" aria-label="BeJoy Logo">
    <g opacity=".88">
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <ellipse key={deg} cx="21" cy="8" rx="2.2" ry="4.5" fill="#F5A623" transform={`rotate(${deg} 21 21)`} />
      ))}
    </g>
    <circle cx="21" cy="21" r="9.5" fill="#1A7A6E" />
    <text x="16.5" y="25.5" fontFamily="Georgia,serif" fontSize="12" fontWeight="700" fill="#FAF7F2">B</text>
  </svg>
);

export default function App() {
  const [lang, setLang] = useState(() => {
    try { const s = localStorage.getItem("bejoy_lang"); if (LANGS.includes(s)) return s; } catch (e) {}
    return "de";
  });
  const [view, setView] = useState("home");          // home | impressum | datenschutz
  const [activePost, setActivePost] = useState(null); // Artikel-Reader
  const [filterCat, setFilterCat] = useState("all");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [nlState, setNlState] = useState({ msg: "", ok: null });
  const [cookie, setCookie] = useState(() => {
    try { return localStorage.getItem("bejoy_cookie"); } catch (e) { return "x"; }
  });

  const t = useCallback((k) => (i18n[lang] && i18n[lang][k]) ?? i18n.de[k] ?? k, [lang]);

  const catLabel = useCallback((cat) => {
    const map = { mindful: "filter_mindful", joyful: "filter_joyful", resilient: "filter_resilient", future: "filter_future", worldwide: "filter_world" };
    return t(map[cat] || "filter_all");
  }, [t]);

  /* Sprache wechseln + merken */
  const changeLang = (l) => {
    setLang(l);
    try { localStorage.setItem("bejoy_lang", l); } catch (e) {}
    document.documentElement.lang = l;
  };

  /* Artikel öffnen (per Objekt oder id) */
  const openPost = (p) => { if (p) { setActivePost(p); setMobileOpen(false); } };
  const openPostById = (id) => { const p = posts.find((x) => String(x.id) === String(id)); if (p) openPost(p); };

  /* Auf Home zu Abschnitt springen — nativ über location.hash (zuverlässig) */
  const goSection = (id) => {
    setMobileOpen(false);
    if (view !== "home") { setView("home"); setTimeout(() => { location.hash = id; }, 40); }
    else { location.hash = id; }
  };

  /* Kategorie filtern + zum Blog */
  const filterTo = (cat) => { setFilterCat(cat); goSection("blog"); };

  /* Rechtsseiten öffnen */
  const openLegal = (which) => { setView(which); setActivePost(null); setMobileOpen(false); window.scrollTo(0, 0); };
  const goHome = () => { setView("home"); window.scrollTo(0, 0); };

  /* Newsletter (noch ohne Backend) */
  const submitNl = () => {
    const input = document.getElementById("nl-input");
    const val = (input && input.value || "").trim();
    if (!val || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val)) {
      setNlState({ msg: t("nl_error_placeholder") || "Bitte gültige E-Mail eingeben", ok: false });
      return;
    }
    setNlState({ msg: t("nl_success") || "Danke! Bald mehr.", ok: true });
    if (input) input.value = "";
  };

  /* Reveal-Animationen aktivieren + Scroll-Fortschritt + Top-Button */
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".reveal"));
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); } });
      }, { threshold: 0.12 });
      els.forEach((el) => io.observe(el));
      // Sicherheitsnetz: nach 1.2s alles sichtbar (falls IO mal nicht greift)
      const tmr = setTimeout(() => els.forEach((el) => el.classList.add("visible")), 1200);
      return () => { io.disconnect(); clearTimeout(tmr); };
    } else {
      els.forEach((el) => el.classList.add("visible"));
    }
  }, [view]);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? Math.min(100, (h.scrollTop / max) * 100) : 0);
      setShowTop(window.scrollY > 500);
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Body-Scroll sperren, wenn Reader offen */
  useEffect(() => {
    document.body.style.overflow = activePost ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [activePost]);

  /* ESC schließt Reader */
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setActivePost(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* ── Rechtsseiten-Ansicht ─────────────────────────────── */
  if (view === "impressum" || view === "datenschutz") {
    return (
      <div className="legal-page">
        <div className="wrap">
          <button className="back" onClick={goHome}>← Zurück zu BeJoy</button>
          <div dangerouslySetInnerHTML={{ __html: view === "impressum" ? impressumHTML : datenschutzHTML }} />
        </div>
      </div>
    );
  }

  const featuredPost = posts.find((p) => p.wide) || posts[0];
  const visiblePosts = filterCat === "all" ? posts : posts.filter((p) => p.cat === filterCat);

  const filterTabs = [
    ["all", "filter_all"], ["mindful", "filter_mindful"], ["joyful", "filter_joyful"],
    ["resilient", "filter_resilient"], ["future", "filter_future"], ["worldwide", "filter_world"],
  ];

  const cats = [
    { id: "mindful", icon: "🧘", c: "teal", n: "c1_name", d: "c1_desc", l: "c1_link" },
    { id: "joyful", icon: "✨", c: "joy", n: "c2_name", d: "c2_desc", l: "c2_link" },
    { id: "resilient", icon: "💪", c: "rose", n: "c3_name", d: "c3_desc", l: "c3_link" },
    { id: "future", icon: "🤖", c: "earth", n: "c4_name", d: "c4_desc", l: "c4_link" },
    { id: "worldwide", icon: "🌍", c: "warm", n: "c5_name", d: "c5_desc", l: "c5_link" },
  ];

  const aiCards = [
    { id: "11", emoji: "🧠", h: "ai1_h", p: "ai1_p" },
    { id: "12", emoji: "🎨", h: "ai2_h", p: "ai2_p" },
    { id: "3", emoji: "📵", h: "ai3_h", p: "ai3_p" },
    { id: "7", emoji: "🌱", h: "ai4_h", p: "ai4_p" },
  ];

  const wisdom = [
    { id: "8", emoji: "☀️", origin: "Japan", word: "Ikigai", meaning: "Der Grund aufzustehen — die Schnittmenge von Leidenschaft, Berufung, Mission und Beruf." },
    { id: "9", emoji: "🕯️", origin: "Dänemark", word: "Hygge", meaning: "Behaglichkeit und Gemütlichkeit — das Gefühl von Wärme, Geborgenheit und Zusammensein." },
    { id: "10", emoji: "🌿", origin: "Afrika", word: "Ubuntu", meaning: "„Ich bin, weil wir sind.\" — Menschlichkeit durch Verbundenheit mit anderen." },
    { id: null, emoji: "🌸", origin: "Japan", word: "Wabi-Sabi", meaning: "Schönheit im Unvollkommenen, Vergänglichen und Unvollständigen." },
  ];

  return (
    <>
      {/* ── NAV ─────────────────────────────────────────── */}
      <nav id="main-nav" className={scrolled ? "scrolled" : ""}>
        <button className="logo-wrap" onClick={goHome} aria-label="BeJoy Home" style={{ background: "none", border: "none", cursor: "pointer" }}>
          <Logo />
          <span className="logo-text">Be<span>Joy</span></span>
        </button>
        <div className="nav-links">
          <a href="#categories" onClick={() => setMobileOpen(false)}>{t("nav_topics")}</a>
          <a href="#blog" onClick={() => setMobileOpen(false)}>{t("nav_blog")}</a>
          <a href="#ai" onClick={() => setMobileOpen(false)}>{t("nav_ai")}</a>
          <a href="#newsletter" onClick={() => setMobileOpen(false)}>{t("nav_newsletter")}</a>
        </div>
        <div className="nav-right">
          <div className="lang-switcher" role="group" aria-label="Language">
            {LANGS.map((l) => (
              <button key={l} className={`lang-btn ${lang === l ? "active" : ""}`} onClick={() => changeLang(l)}>{l.toUpperCase()}</button>
            ))}
          </div>
        </div>
        <button className={`hamburger ${mobileOpen ? "open" : ""}`} aria-label="Menu" onClick={() => setMobileOpen((v) => !v)}>
          <span></span><span></span><span></span>
        </button>
      </nav>

      {/* Mobile-Menü */}
      <div className={`mobile-nav ${mobileOpen ? "open" : ""}`} id="mobile-nav">
        <a href="#categories" onClick={() => setMobileOpen(false)}>{t("nav_topics")}</a>
        <a href="#blog" onClick={() => setMobileOpen(false)}>{t("nav_blog")}</a>
        <a href="#ai" onClick={() => setMobileOpen(false)}>{t("nav_ai")}</a>
        <a href="#newsletter" onClick={() => setMobileOpen(false)}>{t("nav_newsletter")}</a>
        <div className="lang-switcher">
          {LANGS.map((l) => (
            <button key={l} className={`lang-btn ${lang === l ? "active" : ""}`} onClick={() => changeLang(l)}>{l.toUpperCase()}</button>
          ))}
        </div>
      </div>

      {/* ── HERO ────────────────────────────────────────── */}
      <section className="hero" id="home">
        <div className="hero-bg"></div>
        <div className="orb orb-1"></div><div className="orb orb-2"></div><div className="orb orb-3"></div>
        <div className="hero-content">
          <div className="hero-badge">{t("hero_badge")}</div>
          <h1>
            <span>{t("hero_h1_l1")}</span><br />
            <em>{t("hero_h1_l2")}</em><br />
            <span className="acc">{t("hero_h1_l3")}</span>
          </h1>
          <p className="hero-sub">{t("hero_sub")}</p>
          <div className="hero-actions">
            <a href="#blog" className="btn-primary"><span>{t("hero_cta")}</span> <span className="arr">→</span></a>
            <a href="#categories" className="btn-ghost"><span>{t("hero_ghost")}</span> ↓</a>
          </div>
          <div className="hero-stats">
            <div><div className="stat-num">{t("stat1_n")}</div><div className="stat-label">{t("stat1_l")}</div></div>
            <div><div className="stat-num">{t("stat2_n")}</div><div className="stat-label">{t("stat2_l")}</div></div>
            <div><div className="stat-num">{t("stat3_n")}</div><div className="stat-label">{t("stat3_l")}</div></div>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="orbit-ring">
            <div className="orbit-card oc-top"><div className="oc-emoji">🧘</div><div className="oc-label">Mindful</div></div>
            <div className="orbit-card oc-right"><div className="oc-emoji">🌍</div><div className="oc-label">Worldwide</div></div>
            <div className="orbit-card oc-bottom"><div className="oc-emoji">🤖</div><div className="oc-label">Future-Self</div></div>
            <div className="orbit-card oc-left"><div className="oc-emoji">💪</div><div className="oc-label">Resilient</div></div>
            <div className="orbit-inner"><Logo /></div>
          </div>
        </div>
      </section>

      {/* ── KATEGORIEN ──────────────────────────────────── */}
      <section className="categories" id="categories">
        <div className="section-head reveal">
          <span className="section-tag">{t("section_topics")}</span>
          <h2>{t("topics_h")}</h2>
          <p>{t("topics_p")}</p>
        </div>
        <div className="cat-grid reveal">
          {cats.map((c) => (
            <div key={c.id} className="cat-card" data-c={c.c} onClick={() => filterTo(c.id)} style={{ cursor: "pointer" }}>
              <div className="cat-icon">{c.icon}</div>
              <div className="cat-name">{t(c.n)}</div>
              <div className="cat-desc">{t(c.d)}</div>
              <span className="cat-link">{t(c.l)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED ────────────────────────────────────── */}
      <section className="featured-section" id="featured">
        <div className="featured-inner">
          <div className="featured-left reveal">
            <div className="featured-label">{t("feat_label")}</div>
            <h2 style={{ cursor: "pointer" }} onClick={() => openPost(featuredPost)}>{t("feat_h")}</h2>
            <div className="featured-meta">
              <div className="author-chip"><div className="av" style={{ background: "var(--teal)" }}>BJ</div><span>BeJoy Redaktion</span></div>
              <span className="dot"></span><span>{t("feat_read")}</span>
            </div>
            <div className="featured-body">
              <p>{t("feat_p1")}</p>
              <blockquote>{t("feat_quote")}</blockquote>
              <p>{t("feat_p2")}</p>
              <p>{t("feat_p3")}</p>
            </div>
            <div className="featured-tags">
              <span className="featured-tag">{t("feat_tag1")}</span>
              <span className="featured-tag">{t("feat_tag2")}</span>
              <span className="featured-tag">{t("feat_tag3")}</span>
              <span className="featured-tag">{t("feat_tag4")}</span>
            </div>
            <div style={{ marginTop: 22 }}>
              <button className="btn-primary" onClick={() => openPost(featuredPost)}><span>{t("read_more")}</span> <span className="arr">→</span></button>
            </div>
          </div>
          <div className="featured-sidebar reveal">
            <div className="sidebar-card">
              <div className="progress-bar"><div className="progress-fill" style={{ width: progress + "%" }}></div></div>
              <p className="read-time">{t("sidebar_prog")}</p>
            </div>
            <div className="sidebar-card">
              <h4>{t("sidebar_also")}</h4>
              <ul className="sidebar-list">
                {sidebarPosts.map((s) => (
                  <li key={s.id}><button onClick={() => openPostById(s.id)}>{s[lang] || s.de}</button></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── BLOG ────────────────────────────────────────── */}
      <section className="blog" id="blog">
        <div className="section-head reveal">
          <span className="section-tag">{t("section_blog")}</span>
          <h2>{t("blog_h")}</h2>
          <p>{t("blog_p")}</p>
        </div>
        <div className="blog-controls reveal">
          <div className="filter-tabs">
            {filterTabs.map(([cat, key]) => (
              <button key={cat} className={`filter-tab ${filterCat === cat ? "active" : ""}`} onClick={() => setFilterCat(cat)}>{t(key)}</button>
            ))}
          </div>
        </div>
        <div className="blog-grid">
          {visiblePosts.map((p) => {
            const d = p[lang] || p.de;
            return (
              <article key={p.id} className={`blog-card ${p.wide ? "wide" : ""}`} onClick={() => openPost(p)}>
                <div className="card-thumb">
                  <div className="thumb-bg" style={{ background: p.bg }}>{p.emoji}</div>
                  <div className="card-badge" style={{ color: p.badgeColor }}>{catLabel(p.cat)}</div>
                </div>
                <div className="card-body">
                  <div className="card-meta"><span>{p.date}</span><span className="dot"></span><span>{p.read}</span></div>
                  <h3>{d.title}</h3>
                  <p>{d.excerpt}</p>
                </div>
                <div className="card-footer">
                  <div className="author-chip"><div className="av" style={{ background: p.av }}>{p.author}</div><span>{p.authorName}</span></div>
                  <span className="read-link">{t("read_more")} →</span>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* ── KI / FUTURE-SELF ────────────────────────────── */}
      <section className="ai-world" id="ai">
        <div className="ai-world-bg"></div>
        <div className="ai-inner">
          <div className="ai-left reveal">
            <span className="section-tag">{t("section_ai")}</span>
            <h2 dangerouslySetInnerHTML={{ __html: t("ai_h").replace("KI-Welt", "<em>" + (t("ai_em") || "KI-Welt") + "</em>") }} />
            <p>{t("ai_p")}</p>
            <button className="btn-primary" style={{ background: "var(--joy)", color: "var(--earth)" }} onClick={() => filterTo("future")}>
              <span>{t("ai_cta")}</span> <span className="arr">→</span>
            </button>
          </div>
          <div className="ai-grid reveal">
            {aiCards.map((c) => (
              <div key={c.id} className="ai-card" style={{ cursor: "pointer" }} onClick={() => openPostById(c.id)}>
                <span className="emoji">{c.emoji}</span><h4>{t(c.h)}</h4><p>{t(c.p)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORLD WISDOM ────────────────────────────────── */}
      <section className="wisdom" id="wisdom">
        <div className="section-head reveal">
          <span className="section-tag">{t("section_wisdom")}</span>
          <h2>{t("wisdom_h")}</h2>
          <p>{t("wisdom_p")}</p>
        </div>
        <div className="wisdom-grid reveal">
          {wisdom.map((w, i) => (
            <div key={i} className="wisdom-card" style={{ cursor: "pointer" }}
              onClick={() => (w.id ? openPostById(w.id) : filterTo("worldwide"))}>
              <div className="wisdom-bg"></div>
              <div className="wisdom-big-emoji">{w.emoji}</div>
              <div className="wisdom-origin">{w.origin}</div>
              <div className="wisdom-word">{w.word}</div>
              <div className="wisdom-meaning">{w.meaning}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── NEWSLETTER ──────────────────────────────────── */}
      <section className="newsletter" id="newsletter">
        <div className="nl-inner reveal">
          <span className="section-tag">{t("section_nl")}</span>
          <h2>{t("nl_h")}</h2>
          <p>{t("nl_p")}</p>
          <div className="nl-form">
            <input type="email" id="nl-input" placeholder={t("nl_placeholder")} autoComplete="email" />
            <button type="button" onClick={submitNl}>{t("nl_btn")}</button>
          </div>
          {nlState.msg
            ? <p className="nl-note" style={{ color: nlState.ok ? "var(--teal)" : "var(--rose)", fontWeight: 600 }}>{nlState.msg}</p>
            : <p className="nl-note">{t("nl_note")}</p>}
        </div>
      </section>

      {/* ── ÜBER UNS ────────────────────────────────────── */}
      <section className="about-section" id="about" style={{ padding: "88px 24px", background: "var(--cream,#FAF7F2)" }}>
        <div className="about-inner reveal" style={{ maxWidth: 760, margin: "0 auto", textAlign: "center" }}>
          <span className="section-tag" style={{ color: "var(--teal,#1A7A6E)" }}>{t("section_about")}</span>
          <h2 style={{ fontFamily: "Georgia,'Playfair Display',serif", fontSize: "clamp(26px,4vw,38px)", margin: "14px 0 22px", color: "var(--earth,#2C1810)" }}>{t("about_h")}</h2>
          <p style={{ fontSize: 18, lineHeight: 1.7, color: "var(--gray,#6B6560)", margin: "0 auto 36px", maxWidth: 620 }}>{t("about_p")}</p>
          <a href="https://www.cleebration.com" target="_blank" rel="noopener noreferrer" style={{ display: "inline-block" }} aria-label="cleebration — zur Website">
            <img src="/cleebration-logo.jpg" alt="cleebration Logo" style={{ maxWidth: 280, width: "100%", height: "auto" }} loading="lazy" />
          </a>
          <p style={{ marginTop: 14, fontSize: 14, color: "var(--gray,#6B6560)" }}>
            <a href="https://www.cleebration.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--teal,#1A7A6E)", textDecoration: "none" }}>www.cleebration.com →</a>
          </p>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────── */}
      <footer>
        <div className="footer-langbar">
          <span className="footer-langbar-label">{lang === "de" ? "Sprache" : lang === "es" ? "Idioma" : "Language"}</span>
          <div className="footer-lang">
            {LANGS.map((l) => (
              <button key={l} className={lang === l ? "active" : ""} onClick={() => changeLang(l)}>
                {l === "de" ? "Deutsch" : l === "en" ? "English" : "Español"}
              </button>
            ))}
          </div>
        </div>
        <div className="footer-top">
          <div className="footer-brand">
            <button className="logo-wrap" onClick={goHome} style={{ background: "none", border: "none", cursor: "pointer" }}>
              <Logo /><span className="logo-text">Be<span>Joy</span></span>
            </button>
            <p>{t("footer_tagline")}</p>
            <div className="social-row">
              <a className="social-btn" href="https://www.instagram.com/bejoylife/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
              </a>
              <a className="social-btn" href="https://www.facebook.com/beJoyLife" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
              </a>
              <a className="social-btn" href="https://twitter.com/BeJoyLife" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                <svg viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg>
              </a>
              <a className="social-btn" href="https://youtube.com/@beJoyLife" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <svg viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg>
              </a>
            </div>
          </div>
          <div className="footer-col">
            <h5>{t("footer_h_topics")}</h5>
            <ul>
              {cats.map((c) => (
                <li key={c.id}><button onClick={() => filterTo(c.id)}>{t(c.n)}</button></li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h5>{t("footer_h_bejoy")}</h5>
            <ul>
              <li><a href="#about" onClick={() => setMobileOpen(false)}>{t("footer_about")}</a></li>
              <li><a href="#blog" onClick={() => setMobileOpen(false)}>{t("footer_blog")}</a></li>
              <li><a href="#newsletter" onClick={() => setMobileOpen(false)}>{t("footer_nl")}</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h5>{t("footer_h_legal")}</h5>
            <ul>
              <li><button onClick={() => openLegal("impressum")}>{t("footer_imprint")}</button></li>
              <li><button onClick={() => openLegal("datenschutz")}>{t("footer_privacy")}</button></li>
              <li><button onClick={() => { try { localStorage.removeItem("bejoy_cookie"); } catch (e) {} setCookie(null); }}>{t("footer_cookies")}</button></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{t("footer_copy")}</p>
        </div>
      </footer>

      {/* ── COOKIE-BANNER ───────────────────────────────── */}
      {cookie !== "accepted" && cookie !== "declined" && (
        <div id="cookie-banner" role="dialog" aria-label="Cookie consent">
          <p>{t("cookie_text")}</p>
          <div className="cookie-btns">
            <button className="cookie-accept" onClick={() => { try { localStorage.setItem("bejoy_cookie", "accepted"); } catch (e) {} setCookie("accepted"); }}>{t("cookie_accept")}</button>
            <button className="cookie-decline" onClick={() => { try { localStorage.setItem("bejoy_cookie", "declined"); } catch (e) {} setCookie("declined"); }}>{t("cookie_decline")}</button>
          </div>
        </div>
      )}

      {/* ── SCROLL-TOP ──────────────────────────────────── */}
      <button id="scroll-top" className={showTop ? "visible" : ""} aria-label="Scroll to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>↑</button>

      {/* ── READER (Artikel) ────────────────────────────── */}
      {activePost && (() => {
        const d = activePost[lang] || activePost.de;
        return (
          <div className="reader" role="dialog" aria-modal="true">
            <div className="reader-backdrop" onClick={() => setActivePost(null)}></div>
            <article className="reader-panel">
              <button className="reader-close" aria-label="Close" onClick={() => setActivePost(null)}>✕</button>
              <div className="reader-hero">
                <div className="reader-emoji">{activePost.emoji}</div>
                <span className="reader-badge" style={{ color: activePost.badgeColor }}>{catLabel(activePost.cat)}</span>
                <h1 className="reader-title">{d.title}</h1>
                <div className="reader-meta">
                  <span>{activePost.authorName}</span><span className="dot"></span>
                  <span>{activePost.date}</span><span className="dot"></span><span>{activePost.read}</span>
                </div>
              </div>
              <div className="reader-body" dangerouslySetInnerHTML={{ __html: d.content || `<p>${d.excerpt}</p>` }} />
            </article>
          </div>
        );
      })()}
    </>
  );
}
