/**
 * BeJoy — app.js
 * Requires: i18n.js + posts.js loaded before this file
 */

/* ─── LANGUAGE ─── */
let currentLang = localStorage.getItem('bejoy_lang') || 'de';
let currentCat  = 'all';

function applyLang(lang) {
  if (!window.i18n[lang]) return;
  currentLang = lang;
  localStorage.setItem('bejoy_lang', lang);
  document.documentElement.lang = lang;
  const t = window.i18n[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.innerHTML = t[key];
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.dataset.i18nPlaceholder;
    if (t[key]) el.placeholder = t[key];
  });
  document.querySelectorAll('.lang-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.lang === lang));
  renderBlog(currentCat);
  renderSidebar();
  buildTicker();
}

/* (Sprachschalter-Klicks werden im zentralen Klick-Handler unten behandelt) */

/* ─── TICKER ─── */
const tickerItems = {
  de:["Mindfulness","Resilienz","Selbstbestimmung","KI & Menschlichkeit","Glück weltweit","Purpose & Sinn","Flow-Zustände","Wabi-Sabi","Hygge","Ikigai","Ubuntu","Digitales Wohlbefinden"],
  en:["Mindfulness","Resilience","Self-determination","AI & Humanity","Joy worldwide","Purpose & Meaning","Flow States","Wabi-Sabi","Hygge","Ikigai","Ubuntu","Digital Wellbeing"],
  es:["Mindfulness","Resiliencia","Autodeterminación","IA & Humanidad","Alegría mundial","Propósito","Estados de Flow","Wabi-Sabi","Hygge","Ikigai","Ubuntu","Bienestar Digital"],
};
function buildTicker() {
  const track = document.getElementById('ticker-track');
  if (!track) return;
  const items = tickerItems[currentLang] || tickerItems.de;
  const doubled = [...items, ...items];
  track.innerHTML =
    doubled.map(i=>`<span class="ticker-item"><span class="ticker-dot"></span>${i}</span>`).join('');
}

/* ─── CATEGORY NAMES (Badge-Label) ─── */
function catLabel(cat) {
  const map = { mindful:"Mindful", joyful:"Joyful", resilient:"Resilient", future:"Future-Self", worldwide:"Worldwide" };
  return map[cat] || cat;
}

/* ─── BLOG ─── */
function renderBlog(cat) {
  currentCat = cat;
  const lang = currentLang;
  const grid = document.getElementById('blog-grid');
  if (!grid) return;
  const filtered = cat === 'all' ? window.posts : window.posts.filter(p => p.cat === cat);
  grid.innerHTML = filtered.map(p => {
    const d = p[lang] || p.de;
    const isWide = p.wide && cat === 'all';
    return `
    <div class="blog-card${isWide?' wide':''}" data-cat="${p.cat}" data-id="${p.id}">
      <div class="card-thumb" style="background:${p.bg}">
        <div class="thumb-bg">${p.emoji}</div>
        <span class="card-badge" style="color:${p.badgeColor}">${catLabel(p.cat)}</span>
      </div>
      <div class="card-body">
        <div class="card-meta"><span>${p.date}</span><span class="dot"></span><span>${p.read}</span></div>
        <h3>${d.title}</h3>
        <p>${d.excerpt}</p>
      </div>
      <div class="card-footer">
        <div class="author-chip">
          <div class="av" style="background:${p.av}">${p.author}</div>
          <span>${p.authorName}</span>
        </div>
        <a href="#" class="read-link" data-id="${p.id}">${window.i18n[lang]?.read_more||'Lesen →'}</a>
      </div>
    </div>`;
  }).join('');
  attachHovers();
}

const filterTabs = document.getElementById('filter-tabs');
if (filterTabs) {
  filterTabs.addEventListener('click', e => {
    const tab = e.target.closest('.filter-tab');
    if (!tab) return;
    document.querySelectorAll('.filter-tab').forEach(t=>t.classList.remove('active'));
    tab.classList.add('active');
    renderBlog(tab.dataset.cat);
  });
}

/* ─── ARTICLE READER (Overlay) ─────────────────────────────
   Öffnet den vollen content-Text eines Beitrags.
   Styles werden hier injiziert → unabhängig von main.css.
──────────────────────────────────────────────────────────── */
(function injectReaderStyles(){
  if (document.getElementById('bejoy-reader-style')) return;
  const css = `
  #bejoy-reader{position:fixed;inset:0;z-index:9999;display:none;}
  #bejoy-reader.open{display:block;}
  #bejoy-reader .reader-backdrop{position:absolute;inset:0;background:rgba(44,24,16,.55);backdrop-filter:blur(4px);}
  #bejoy-reader .reader-panel{position:absolute;top:0;right:0;height:100%;width:min(720px,100%);
    background:#FAF7F2;color:#2C1810;overflow-y:auto;box-shadow:-24px 0 80px rgba(44,24,16,.25);
    transform:translateX(40px);opacity:0;transition:transform .35s ease,opacity .35s ease;}
  #bejoy-reader.open .reader-panel{transform:translateX(0);opacity:1;}
  #bejoy-reader .reader-hero{padding:64px 56px 28px;position:relative;}
  #bejoy-reader .reader-emoji{font-size:56px;line-height:1;margin-bottom:18px;}
  #bejoy-reader .reader-badge{display:inline-block;font-size:12px;font-weight:600;letter-spacing:.08em;
    text-transform:uppercase;padding:5px 12px;border-radius:100px;background:#E8F5F3;color:#1A7A6E;margin-bottom:18px;}
  #bejoy-reader .reader-title{font-family:Georgia,'Playfair Display',serif;font-size:34px;line-height:1.18;margin:0 0 14px;font-weight:700;}
  #bejoy-reader .reader-meta{font-size:14px;color:#6B6560;display:flex;gap:10px;align-items:center;}
  #bejoy-reader .reader-meta .dot{width:4px;height:4px;border-radius:50%;background:#C9C2BA;display:inline-block;}
  #bejoy-reader .reader-body{padding:8px 56px 80px;font-size:17px;line-height:1.72;}
  #bejoy-reader .reader-body h2{font-family:Georgia,'Playfair Display',serif;font-size:23px;margin:34px 0 12px;color:#1A7A6E;}
  #bejoy-reader .reader-body p{margin:0 0 18px;}
  #bejoy-reader .reader-body strong{color:#2C1810;}
  #bejoy-reader .reader-close{position:absolute;top:24px;right:28px;width:42px;height:42px;border:none;
    border-radius:50%;background:#FFF;color:#2C1810;font-size:22px;cursor:pointer;box-shadow:0 4px 16px rgba(44,24,16,.12);
    display:flex;align-items:center;justify-content:center;transition:transform .2s;}
  #bejoy-reader .reader-close:hover{transform:rotate(90deg) scale(1.05);}
  @media(max-width:600px){
    #bejoy-reader .reader-hero{padding:56px 24px 22px;}
    #bejoy-reader .reader-body{padding:8px 24px 64px;font-size:16px;}
    #bejoy-reader .reader-title{font-size:27px;}
  }`;
  const style = document.createElement('style');
  style.id = 'bejoy-reader-style';
  style.textContent = css;
  document.head.appendChild(style);
})();

function ensureReaderEl(){
  let r = document.getElementById('bejoy-reader');
  if (r) return r;
  r = document.createElement('div');
  r.id = 'bejoy-reader';
  r.innerHTML = `
    <div class="reader-backdrop" data-close="1"></div>
    <article class="reader-panel">
      <button class="reader-close" data-close="1" aria-label="Close">✕</button>
      <div class="reader-hero">
        <div class="reader-emoji"></div>
        <span class="reader-badge"></span>
        <h1 class="reader-title"></h1>
        <div class="reader-meta"></div>
      </div>
      <div class="reader-body"></div>
    </article>`;
  document.body.appendChild(r);
  r.addEventListener('click', e => { if (e.target.dataset.close) closeReader(); });
  return r;
}

function openReader(id){
  const post = window.posts.find(p => String(p.id) === String(id));
  if (!post) return;
  const d = post[currentLang] || post.de;
  const r = ensureReaderEl();
  r.querySelector('.reader-emoji').textContent = post.emoji;
  const badge = r.querySelector('.reader-badge');
  badge.textContent = catLabel(post.cat);
  badge.style.color = post.badgeColor;
  r.querySelector('.reader-title').textContent = d.title;
  r.querySelector('.reader-meta').innerHTML =
    `<span>${post.authorName}</span><span class="dot"></span><span>${post.date}</span><span class="dot"></span><span>${post.read}</span>`;
  r.querySelector('.reader-body').innerHTML = d.content || `<p>${d.excerpt}</p>`;
  r.querySelector('.reader-panel').scrollTop = 0;
  r.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeReader(){
  const r = document.getElementById('bejoy-reader');
  if (!r) return;
  r.classList.remove('open');
  document.body.style.overflow = '';
}

/* Esc schließt den Reader */
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeReader(); });

/* ─── ZENTRALER KLICK-HANDLER ───
   Ein einziger delegierter Handler für alle interaktiven Elemente.
   Reihenfolge = Priorität.
──────────────────────────────────────────────────────────── */
function scrollToBlogFiltered(cat){
  const tab = document.querySelector(`.filter-tab[data-cat="${cat}"]`);
  if (tab) tab.click();
  document.getElementById('blog')?.scrollIntoView({behavior:'smooth', block:'start'});
}

document.addEventListener('click', e => {
  // 1) Sprachschalter
  const langBtn = e.target.closest('[data-lang]');
  if (langBtn?.dataset.lang) { e.preventDefault(); applyLang(langBtn.dataset.lang); return; }

  // 2) Beitrag öffnen (Lesen-Link, AI-Karten, Wisdom-Karten, Sidebar, Blog-Karten)
  const opener = e.target.closest('[data-open-id]');
  if (opener) { e.preventDefault(); openReader(opener.dataset.openId); return; }
  const readLink = e.target.closest('.read-link');
  if (readLink) { e.preventDefault(); openReader(readLink.dataset.id); return; }
  const blogCard = e.target.closest('.blog-card');
  if (blogCard && blogCard.dataset.id) { e.preventDefault(); openReader(blogCard.dataset.id); return; }

  // 3) Kategorie-Navigation (5 Wege, Footer-Themen, Wabi-Sabi, AI-CTA)
  const aiAll = e.target.closest('[data-ai-all], .ai-all-link');
  if (aiAll) { e.preventDefault(); scrollToBlogFiltered('future'); return; }
  const catLink = e.target.closest('[data-cat-link]');
  if (catLink) { e.preventDefault(); scrollToBlogFiltered(catLink.dataset.catLink); return; }

  // 4) Reader schließen
  if (e.target.closest('#bejoy-reader [data-close]')) { closeReader(); return; }

  // 5) Cookie-Einstellungen erneut öffnen
  if (e.target.closest('#cookie-reopen')) {
    e.preventDefault();
    if (banner) { banner.style.display=''; banner.scrollIntoView?.({behavior:'smooth'}); }
    return;
  }

  // 6) Smooth-Scroll für echte #-Anker (Menü etc.)
  const anchor = e.target.closest('a[href^="#"]');
  if (anchor) {
    const href = anchor.getAttribute('href');
    if (href.length > 1) {
      const target = document.getElementById(href.slice(1));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
        document.getElementById('hamburger')?.classList.remove('open');
        document.getElementById('mobile-nav')?.classList.remove('open');
      }
    }
  }
});

/* ─── SIDEBAR ─── */
function renderSidebar() {
  const list = document.getElementById('sidebar-list');
  if (!list) return;
  list.innerHTML = window.sidebarPosts.map((p,i)=>
    `<li data-open-id="${p.id}" style="cursor:pointer;"><span class="num">${String(i+1).padStart(2,'0')}</span>${p[currentLang]||p.de}</li>`
  ).join('');
}

/* ─── READING PROGRESS ─── */
window.addEventListener('scroll', () => {
  const el = document.getElementById('featured');
  if (!el) return;
  const rect = el.getBoundingClientRect();
  const total = el.offsetHeight - window.innerHeight;
  const pct = total > 0 ? Math.min(Math.max(-rect.top,0)/total*100,100) : 0;
  const bar = document.getElementById('read-progress');
  if (bar) bar.style.width = pct.toFixed(1)+'%';
}, {passive:true});

/* ─── CURSOR ───
   Grundlegend überarbeitet:
   • pointer-events:none erzwungen → fängt NIE Klicks ab
   • wird sofort sichtbar gemacht (kein Warten auf erstes mousemove)
   • auf Touch-Geräten komplett deaktiviert (dort stört er nur)
──────────────────────────────────────────────────────────── */
const cursor = document.getElementById('cursor');
const isTouch = window.matchMedia('(hover: none)').matches || 'ontouchstart' in window;
if (cursor && isTouch) {
  cursor.style.display = 'none';            // Touch: weg damit
} else if (cursor) {
  cursor.style.pointerEvents = 'none';      // ← Klicks gehen immer durch
  cursor.style.position = 'fixed';
  cursor.style.zIndex = '99998';
  // Fallback-Styling, falls main.css den Cursor nicht sichtbar macht:
  if (!cursor.style.width)  cursor.style.width  = '22px';
  if (!cursor.style.height) cursor.style.height = '22px';
  cursor.style.borderRadius = '50%';
  cursor.style.transform = 'translate(-50%, -50%)';
  cursor.style.transition = 'width .18s ease, height .18s ease, background .18s ease';
  if (!cursor.style.border && !cursor.style.background)
    cursor.style.border = '2px solid #1A7A6E';   // Brand-Teal Ring als Fallback
  cursor.classList.remove('hidden');
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top  = e.clientY + 'px';
  }, {passive:true});
  document.addEventListener('mouseenter', ()=>cursor.classList.remove('hidden'));
  document.addEventListener('mouseleave', ()=>cursor.classList.add('hidden'));
}
function attachHovers() {
  if (!cursor || isTouch) return;
  document.querySelectorAll('a,button,.cat-card,.blog-card,.wisdom-card,.ai-card,.sidebar-list li,[data-open-id],[data-cat-link]').forEach(el=>{
    if (el.dataset.hoverBound) return;        // nicht doppelt binden
    el.dataset.hoverBound = '1';
    el.addEventListener('mouseenter',()=>cursor.classList.add('hovering'));
    el.addEventListener('mouseleave',()=>cursor.classList.remove('hovering'));
  });
}

/* ─── SCROLL REVEAL ─── */
const obs = new IntersectionObserver(entries=>{
  entries.forEach((e,i)=>{
    if(e.isIntersecting){
      setTimeout(()=>e.target.classList.add('visible'), i*90);
      obs.unobserve(e.target);
    }
  });
},{threshold:0.08});
document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));

/* ─── NAV SCROLL ─── */
const nav = document.getElementById('main-nav');
window.addEventListener('scroll',()=>{
  if (nav) nav.classList.toggle('scrolled', window.scrollY>24);
  document.getElementById('scroll-top')?.classList.toggle('visible', window.scrollY>400);
},{passive:true});

/* ─── HAMBURGER ─── */
const ham = document.getElementById('hamburger');
const mob = document.getElementById('mobile-nav');
if (ham && mob) {
  ham.addEventListener('click',()=>{
    ham.classList.toggle('open');
    mob.classList.toggle('open');
  });
  mob.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
    ham.classList.remove('open'); mob.classList.remove('open');
  }));
}

/* ─── SCROLL TOP ─── */
document.getElementById('scroll-top')?.addEventListener('click',()=>
  window.scrollTo({top:0,behavior:'smooth'}));

/* ─── NEWSLETTER ─── */
document.getElementById('nl-btn')?.addEventListener('click', function(){
  const input = document.getElementById('nl-input');
  const t = window.i18n[currentLang];
  if (input.value?.includes('@')){
    this.textContent = t.nl_success||'✓';
    this.style.background='#1A7A6E';
    input.value=''; input.placeholder=t.nl_success||'✓';
  } else {
    input.style.outline='2px solid var(--rose)';
    input.placeholder=t.nl_error_placeholder||'Bitte E-Mail eingeben…';
    setTimeout(()=>input.style.outline='none',2200);
  }
});

/* ─── COOKIE ─── */
const banner = document.getElementById('cookie-banner');
if (banner && localStorage.getItem('bejoy_cookie')) banner.style.display='none';
document.getElementById('cookie-accept')?.addEventListener('click',()=>{
  localStorage.setItem('bejoy_cookie','accepted'); if(banner) banner.style.display='none';
});
document.getElementById('cookie-decline')?.addEventListener('click',()=>{
  localStorage.setItem('bejoy_cookie','declined'); if(banner) banner.style.display='none';
});
/* (Cookie-Einstellungen-erneut-öffnen wird im zentralen Klick-Handler behandelt) */

/* ─── INIT ─── */
applyLang(currentLang);
attachHovers();
