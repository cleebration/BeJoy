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

document.addEventListener('click', e => {
  const btn = e.target.closest('[data-lang]');
  if (btn?.dataset.lang) { e.preventDefault(); applyLang(btn.dataset.lang); }
});

/* ─── TICKER ─── */
const tickerItems = {
  de:["Mindfulness","Resilienz","Selbstbestimmung","KI & Menschlichkeit","Glück weltweit","Purpose & Sinn","Flow-Zustände","Wabi-Sabi","Hygge","Ikigai","Ubuntu","Digitales Wohlbefinden"],
  en:["Mindfulness","Resilience","Self-determination","AI & Humanity","Joy worldwide","Purpose & Meaning","Flow States","Wabi-Sabi","Hygge","Ikigai","Ubuntu","Digital Wellbeing"],
  es:["Mindfulness","Resiliencia","Autodeterminación","IA & Humanidad","Alegría mundial","Propósito","Estados de Flow","Wabi-Sabi","Hygge","Ikigai","Ubuntu","Bienestar Digital"],
};
function buildTicker() {
  const items = tickerItems[currentLang] || tickerItems.de;
  const doubled = [...items, ...items];
  document.getElementById('ticker-track').innerHTML =
    doubled.map(i=>`<span class="ticker-item"><span class="ticker-dot"></span>${i}</span>`).join('');
}

/* ─── BLOG ─── */
function renderBlog(cat) {
  currentCat = cat;
  const lang = currentLang;
  const grid = document.getElementById('blog-grid');
  const filtered = cat === 'all' ? window.posts : window.posts.filter(p => p.cat === cat);
  grid.innerHTML = filtered.map(p => {
    const d = p[lang] || p.de;
    const isWide = p.wide && cat === 'all';
    return `
    <div class="blog-card${isWide?' wide':''}" data-cat="${p.cat}">
      <div class="card-thumb" style="background:${p.bg}">
        <div class="thumb-bg">${p.emoji}</div>
        <span class="card-badge" style="color:${p.badgeColor}">${p.cat}</span>
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
        <a href="#" class="read-link">${window.i18n[lang]?.read_more||'Lesen →'}</a>
      </div>
    </div>`;
  }).join('');
  attachHovers();
}

document.getElementById('filter-tabs').addEventListener('click', e => {
  const tab = e.target.closest('.filter-tab');
  if (!tab) return;
  document.querySelectorAll('.filter-tab').forEach(t=>t.classList.remove('active'));
  tab.classList.add('active');
  renderBlog(tab.dataset.cat);
});

/* ─── SIDEBAR ─── */
function renderSidebar() {
  const list = document.getElementById('sidebar-list');
  if (!list) return;
  list.innerHTML = window.sidebarPosts.map((p,i)=>
    `<li><span class="num">${String(i+1).padStart(2,'0')}</span>${p[currentLang]||p.de}</li>`
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

/* ─── CURSOR ─── */
const cursor = document.getElementById('cursor');
let cursorOn = false;
document.addEventListener('mousemove', e => {
  if (!cursorOn) { cursor.classList.remove('hidden'); cursorOn=true; }
  cursor.style.left = e.clientX+'px';
  cursor.style.top  = e.clientY+'px';
});
document.addEventListener('mouseleave', ()=>cursor.classList.add('hidden'));
function attachHovers() {
  document.querySelectorAll('a,button,.cat-card,.blog-card,.wisdom-card,.ai-card').forEach(el=>{
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
  nav.classList.toggle('scrolled', window.scrollY>24);
  document.getElementById('scroll-top').classList.toggle('visible', window.scrollY>400);
},{passive:true});

/* ─── HAMBURGER ─── */
const ham = document.getElementById('hamburger');
const mob = document.getElementById('mobile-nav');
ham.addEventListener('click',()=>{
  ham.classList.toggle('open');
  mob.classList.toggle('open');
});
mob.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  ham.classList.remove('open'); mob.classList.remove('open');
}));

/* ─── SCROLL TOP ─── */
document.getElementById('scroll-top').addEventListener('click',()=>
  window.scrollTo({top:0,behavior:'smooth'}));

/* ─── NEWSLETTER ─── */
document.getElementById('nl-btn').addEventListener('click', function(){
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
if (localStorage.getItem('bejoy_cookie')) banner.style.display='none';
document.getElementById('cookie-accept').addEventListener('click',()=>{
  localStorage.setItem('bejoy_cookie','accepted'); banner.style.display='none';
});
document.getElementById('cookie-decline').addEventListener('click',()=>{
  localStorage.setItem('bejoy_cookie','declined'); banner.style.display='none';
});

/* ─── INIT ─── */
applyLang(currentLang);
attachHovers();
