/* ══════════════════════════════════════════════
   SŌMA — construa quem você quer ser
   script.js
══════════════════════════════════════════════ */

const CATS = {
  'saude-fisica':    { l: 'Saúde física',     c: '#B5C4AE', bg: '#EEF3EC', d: '#5A7352' },
  'saude-mental':    { l: 'Saúde mental',     c: '#C0B4D4', bg: '#F0EDF8', d: '#5A4878' },
  'alimentacao':     { l: 'Alimentação',      c: '#CEC0A8', bg: '#F5F0E8', d: '#7A6245' },
  'intelecto':       { l: 'Intelecto',        c: '#A8BDD4', bg: '#EAF1F8', d: '#3A5F7A' },
  'espiritualidade': { l: 'Espiritualidade',  c: '#D4AEBA', bg: '#F8EEF2', d: '#7A3F52' },
  'social':          { l: 'Social',           c: '#D4AFA8', bg: '#F7EFED', d: '#8A4E45' },
  'financeiro':      { l: 'Financeiro',       c: '#C0B4D4', bg: '#F0EDF8', d: '#5A4878' },
};

const ICONS = {
  correr: `<svg viewBox="0 0 28 28" fill="none" stroke="#5A7352" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="17" cy="6" r="2.2" fill="#B5C4AE" stroke="none"/>
    <path d="M13 10l2 3 4-2" stroke="#5A7352"/>
    <path d="M11 13l-3 5" /><path d="M15 13l2 5-3 2"/>
    <path d="M8 18l2-5" />
  </svg>`,
  agua: `<svg viewBox="0 0 28 28" fill="none" stroke="#9AB3C4" stroke-width="1.5" stroke-linecap="round">
    <path d="M14 5 C14 5 7 13 7 17.5 a7 7 0 0014 0 C21 13 14 5 14 5Z" fill="#EAF1F8" stroke="#3A5F7A"/>
    <path d="M11 19 C11 19 10 17 11 15" stroke="#9AB3C4" stroke-width="1" opacity=".7"/>
  </svg>`,
  sono: `<svg viewBox="0 0 28 28" fill="none" stroke-width="1.5" stroke-linecap="round">
    <path d="M18 7 A8 8 0 1 1 7 18 A6 6 0 0 0 18 7Z" fill="#EDEAF5" stroke="#5A4878"/>
    <circle cx="11" cy="11" r="1" fill="#C0B4D4" stroke="none"/>
    <circle cx="14" cy="9"  r=".7" fill="#C0B4D4" stroke="none"/>
    <circle cx="9"  cy="14" r=".7" fill="#C0B4D4" stroke="none"/>
  </svg>`,
  flexoes: `<svg viewBox="0 0 28 28" fill="none" stroke="#5A7352" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <line x1="5" y1="18" x2="23" y2="18"/>
    <path d="M8 18 L8 14 L13 11 L18 14 L18 18"/>
    <circle cx="13" cy="9" r="2" fill="#B5C4AE" stroke="none"/>
    <path d="M13 11 L13 8.5"/>
  </svg>`,
  caminhada: `<svg viewBox="0 0 28 28" fill="none" stroke="#5A7352" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="14" cy="6" r="2" fill="#B5C4AE" stroke="none"/>
    <path d="M14 8 L12 15 L9 20"/>
    <path d="M14 8 L16 15 L19 20"/>
    <path d="M10 12 L18 12"/>
  </svg>`,
  alongamento: `<svg viewBox="0 0 28 28" fill="none" stroke="#5A7352" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="14" cy="6" r="2" fill="#B5C4AE" stroke="none"/>
    <path d="M14 8 L14 16"/>
    <path d="M8 12 L14 10 L20 12"/>
    <path d="M10 16 L14 16 L18 16"/>
    <path d="M10 16 L8 21"/><path d="M18 16 L20 21"/>
  </svg>`,
  meditacao: `<svg viewBox="0 0 28 28" fill="none" stroke-width="1.5" stroke-linecap="round">
    <circle cx="14" cy="6" r="2" fill="#EDEAF5" stroke="#5A4878"/>
    <path d="M9 14 C9 14 9 10 14 10 C19 10 19 14 19 14" stroke="#5A4878"/>
    <path d="M6 14 L9 14 M19 14 L22 14" stroke="#C0B4D4"/>
    <path d="M7 20 C7 20 9 14 14 14 C19 14 21 20 21 20" stroke="#5A4878" fill="#EDEAF5"/>
  </svg>`,
  tela: `<svg viewBox="0 0 28 28" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="5" y="7" width="18" height="12" rx="2" fill="#EAF1F8" stroke="#3A5F7A"/>
    <line x1="11" y1="22" x2="17" y2="22" stroke="#9AB3C4"/>
    <line x1="14" y1="19" x2="14" y2="22" stroke="#9AB3C4"/>
    <line x1="9" y1="13" x2="9" y2="13.1" stroke="#E24B4A" stroke-width="2.5" stroke-linecap="round"/>
    <path d="M12 11 L16 15 M16 11 L12 15" stroke="#E24B4A" stroke-width="1.2"/>
  </svg>`,
  semCigarro: `<svg viewBox="0 0 28 28" fill="none" stroke-width="1.5" stroke-linecap="round">
    <rect x="7" y="17" width="14" height="3" rx="1.5" fill="#F5F0E8" stroke="#7A6245"/>
    <line x1="16" y1="17" x2="16" y2="20" stroke="#CEC0A8"/>
    <path d="M17 14 C17 14 18 12 17 10" stroke="#CEC0A8" stroke-width="1" opacity=".7"/>
    <line x1="5" y1="5" x2="23" y2="23" stroke="#C97A72" stroke-width="1.8"/>
  </svg>`,
  fruta: `<svg viewBox="0 0 28 28" fill="none" stroke-width="1.5" stroke-linecap="round">
    <path d="M14 10 C14 10 10 9 9 13 C8 17 10 22 14 22 C18 22 20 17 19 13 C18 9 14 10 14 10Z" fill="#F5EBEC" stroke="#7A3F52"/>
    <path d="M14 10 C14 10 14 7 17 6" stroke="#5A7352" stroke-width="1.2"/>
  </svg>`,
  refrigerante: `<svg viewBox="0 0 28 28" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M10 8 L11 22 L17 22 L18 8Z" fill="#EAF1F8" stroke="#3A5F7A"/>
    <path d="M9 8 L19 8" stroke="#3A5F7A"/>
    <path d="M10.5 10 L11 12" stroke="#9AB3C4" stroke-width="1" opacity=".6"/>
    <line x1="5" y1="5" x2="23" y2="23" stroke="#C97A72" stroke-width="1.8"/>
  </svg>`,
  alcool: `<svg viewBox="0 0 28 28" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M10 7 L10 16 C10 19.3 17 19.3 17 16 L17 7Z" fill="#F5F0E8" stroke="#7A6245"/>
    <path d="M9 7 L18 7" stroke="#7A6245"/>
    <line x1="10" y1="21" x2="17" y2="21" stroke="#CEC0A8"/>
    <line x1="13.5" y1="19" x2="13.5" y2="21" stroke="#CEC0A8"/>
    <line x1="5" y1="5" x2="23" y2="23" stroke="#C97A72" stroke-width="1.8"/>
  </svg>`,
  leitura: `<svg viewBox="0 0 28 28" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M7 8 C7 8 10 7 14 9 C18 7 21 8 21 8 L21 20 C21 20 18 19 14 21 C10 19 7 20 7 20Z" fill="#EAF1F8" stroke="#3A5F7A"/>
    <line x1="14" y1="9" x2="14" y2="21" stroke="#9AB3C4"/>
    <line x1="10" y1="11" x2="13" y2="12" stroke="#9AB3C4" stroke-width="1"/>
    <line x1="10" y1="14" x2="13" y2="15" stroke="#9AB3C4" stroke-width="1"/>
  </svg>`,
  escrita: `<svg viewBox="0 0 28 28" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <rect x="7" y="6" width="14" height="17" rx="2" fill="#F5F0E8" stroke="#7A6245"/>
    <line x1="10" y1="11" x2="18" y2="11" stroke="#CEC0A8"/>
    <line x1="10" y1="14" x2="18" y2="14" stroke="#CEC0A8"/>
    <line x1="10" y1="17" x2="15" y2="17" stroke="#CEC0A8"/>
    <path d="M16 19 L20 15 L22 17 L18 21Z" fill="#8FAB85" stroke="#5A7352" stroke-width="1"/>
  </svg>`,
  gratidao: `<svg viewBox="0 0 28 28" fill="none" stroke-width="1.5" stroke-linecap="round">
    <path d="M14 21 C14 21 6 16 6 10.5 A4.5 4.5 0 0 1 14 9 A4.5 4.5 0 0 1 22 10.5 C22 16 14 21 14 21Z" fill="#F8EEF2" stroke="#7A3F52"/>
    <path d="M11 13 C11 13 11 11 13 11" stroke="#D4AEBA" stroke-width="1.2"/>
  </svg>`,
  telefone: `<svg viewBox="0 0 28 28" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M9 7 C9 7 10 9 10 11 L8 13 C8 13 10 17 15 20 L17 18 C17 18 19 19 21 20 C21 20 21 22 19 22 C13 22 6 15 6 9 C6 7 9 7 9 7Z" fill="#F7EFED" stroke="#8A4E45"/>
  </svg>`,
  dinheiro: `<svg viewBox="0 0 28 28" fill="none" stroke-width="1.5" stroke-linecap="round">
    <circle cx="14" cy="14" r="9" fill="#EDEAF5" stroke="#5A4878"/>
    <text x="14" y="18.5" text-anchor="middle" font-size="11" font-family="Georgia,serif" fill="#5A4878" stroke="none">$</text>
  </svg>`,
  hobby: `<svg viewBox="0 0 28 28" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M8 20 L10 12 L14 8 L18 12 L20 20" stroke="#7A6245" fill="#F5F0E8"/>
    <path d="M8 20 L20 20" stroke="#7A6245"/>
    <path d="M14 8 L14 5" stroke="#CEC0A8"/>
    <circle cx="14" cy="4.5" r="1.5" fill="#CEC0A8" stroke="none"/>
    <path d="M10 15 L18 15" stroke="#CEC0A8" stroke-width="1"/>
  </svg>`,
  autocuidado: `<svg viewBox="0 0 28 28" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M8 10 Q8 6 14 6 Q20 6 20 10 L20 16 Q20 22 14 22 Q8 22 8 16Z" fill="#F7EFED" stroke="#8A4E45"/>
    <path d="M11 13 Q14 16 17 13" stroke="#D4AFA8"/>
    <circle cx="11.5" cy="11" r="1" fill="#D4AFA8" stroke="none"/>
    <circle cx="16.5" cy="11" r="1" fill="#D4AFA8" stroke="none"/>
  </svg>`,
};

const SUGS = [
  { name: 'Correr todo dia',          cat: 'saude-fisica',    days: 30,  desc: '30 min diários para corpo e mente.',         icon: 'correr' },
  { name: 'Beber 2L de água',         cat: 'saude-fisica',    days: 21,  desc: 'Hidratação como ritual diário.',             icon: 'agua' },
  { name: 'Dormir 8 horas',           cat: 'saude-fisica',    days: 30,  desc: 'Sono de qualidade muda tudo.',               icon: 'sono' },
  { name: '50 flexões/dia',           cat: 'saude-fisica',    days: 90,  desc: 'Força progressiva com constância.',          icon: 'flexoes' },
  { name: 'Caminhada diária',         cat: 'saude-fisica',    days: 30,  desc: '30 min ao ar livre.',                       icon: 'caminhada' },
  { name: 'Alongamento matinal',      cat: 'saude-fisica',    days: 21,  desc: '10 min para começar bem.',                  icon: 'alongamento' },
  { name: 'Rotina de sono',           cat: 'saude-fisica',    days: 21,  desc: 'Dormir e acordar no mesmo horário todo dia.',icon: 'sono' },
  { name: 'Meditação',                cat: 'saude-mental',    days: 21,  desc: '10 min de presença plena.',                 icon: 'meditacao' },
  { name: 'Tempo de tela limitado',   cat: 'saude-mental',    days: 30,  desc: 'Máximo 2h de redes sociais por dia.',        icon: 'tela' },
  { name: 'Sem cigarro',              cat: 'saude-mental',    days: 30,  desc: 'Um dia de cada vez, sem fumar.',             icon: 'semCigarro' },
  { name: 'Tempo para hobbies',       cat: 'saude-mental',    days: 30,  desc: '30 min por dia para o que você ama fazer.', icon: 'hobby' },
  { name: 'Uma fruta por dia',        cat: 'alimentacao',     days: 30,  desc: 'Pequeno hábito, grande diferença.',         icon: 'fruta' },
  { name: 'Zero refrigerante',        cat: 'alimentacao',     days: 30,  desc: 'Substituir pelo que faz bem.',              icon: 'refrigerante' },
  { name: 'Zero álcool',              cat: 'alimentacao',     days: 30,  desc: 'Clareza, sono melhor, mais energia.',       icon: 'alcool' },
  { name: 'Ler 20 páginas',           cat: 'intelecto',       days: 30,  desc: 'Leitura diária transforma a mente.',        icon: 'leitura' },
  { name: 'Escrita ativa',            cat: 'intelecto',       days: 21,  desc: '15 min de escrita todo dia.',               icon: 'escrita' },
  { name: 'Gratidão diária',          cat: 'espiritualidade', days: 21,  desc: 'Reconhecer pequenas vitórias.',             icon: 'gratidao' },
  { name: 'Autocuidado diário',       cat: 'espiritualidade', days: 30,  desc: 'Skincare, banho lento, cuidar do corpo com atenção.',  icon: 'autocuidado' },
  { name: 'Ligar pra alguém querido', cat: 'social',          days: 30,  desc: 'Manter vínculos afetivos vivos.',           icon: 'telefone' },
  { name: 'Guardar dinheiro',         cat: 'financeiro',      days: 30,  desc: 'O hábito de poupar, qualquer quantia.',     icon: 'dinheiro' },
];

/* ── STATE ── */
let challenges   = JSON.parse(localStorage.getItem('soma_ch') || '[]');
let gratitudes   = JSON.parse(localStorage.getItem('soma_gr') || '[]');
let activeFilter = 'all';
let editingId    = null;
let pendingDelId = null;
let detChart     = null;
let curScreen    = 'hoje';
let rulerOffset  = 0;
let selectedDate = tod();

/* ── PERSISTENCE ── */
function save() {
  localStorage.setItem('soma_ch', JSON.stringify(challenges));
  localStorage.setItem('soma_gr', JSON.stringify(gratitudes));
}

/* ── DATE HELPERS ── */
function tod() { return new Date().toISOString().split('T')[0]; }
function ds(d) { return d.toISOString().split('T')[0]; }
function addD(base, n) { const d = new Date(base); d.setDate(d.getDate() + n); return d; }

/* ── BUSINESS LOGIC ── */
function getStreak(c) {
  const chk = c.checkins || [];
  if (!chk.length) return 0;
  let s = 0;
  const d = new Date(tod());
  while (chk.includes(ds(d))) { s++; d.setDate(d.getDate() - 1); }
  return s;
}

function getMissed(c) {
  const chk = c.checkins || [];
  const missed = [];
  const d = new Date(c.startDate);
  const now = new Date(tod());
  while (d < now) {
    const s = ds(d);
    if (!chk.includes(s)) missed.push(s);
    d.setDate(d.getDate() + 1);
  }
  return missed;
}

function getProg(c) {
  const el = Math.max(0, Math.floor((new Date(tod()) - new Date(c.startDate)) / 86400000));
  return { el, pct: Math.min(100, Math.round((el / c.days) * 100)) };
}

function getRate(c) {
  const { el } = getProg(c);
  if (!el) return 0;
  return Math.round(((c.checkins || []).length / el) * 100);
}

function isActive(c) { return new Date(tod()) <= addD(c.startDate, c.days); }

function recentMissed(c) {
  const missed = getMissed(c);
  const yesterday = ds(addD(tod(), -1));
  return missed.filter(d => d >= yesterday);
}

/* ══════════════════════════════════════════════
   SPLASH + ONBOARDING
══════════════════════════════════════════════ */
let obSlide = 0;
const OB_TOTAL = 4;

function initApp() {
  /* Splash: show for 3.3s then decide onboarding or app */
  setTimeout(() => {
    document.getElementById('splash').classList.add('hide');
    const seen = localStorage.getItem('soma_ob_done');
    if (seen) {
      launchApp();
    } else {
      setTimeout(() => {
        document.getElementById('onboarding').classList.remove('hide');
        updateObUI();
      }, 300);
    }
  }, 3300);
}

function updateObUI() {
  /* Slide */
  document.getElementById('ob-slides').style.transform = `translateX(-${obSlide * 100}%)`;

  /* Dots */
  document.querySelectorAll('.ob-dot').forEach((d, i) => {
    d.classList.toggle('active', i === obSlide);
  });

  /* Button label */
  const btn = document.getElementById('ob-btn');
  btn.textContent = obSlide === OB_TOTAL - 1 ? 'Entrar no Sōma' : 'Continuar';

  /* Hide skip on last slide */
  document.getElementById('ob-skip').style.opacity = obSlide === OB_TOTAL - 1 ? '0' : '1';
}

function obNext() {
  if (obSlide < OB_TOTAL - 1) {
    obSlide++;
    updateObUI();
  } else {
    obFinish();
  }
}

function obFinish() {
  localStorage.setItem('soma_ob_done', '1');
  document.getElementById('onboarding').classList.add('hide');
  launchApp();
}

function launchApp() {
  document.getElementById('main-app').style.display = '';
  document.getElementById('main-nav').style.display = '';
  renderHoje();
  renderExplorar();
}

/* ══════════════════════════════════════════════
   NAVIGATION
══════════════════════════════════════════════ */
function nav(screen, id) {
  curScreen = screen;
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('nav button').forEach((b, i) => {
    b.classList.remove('active');
    if (['hoje', 'desafios', 'explorar', 'gratidao'][i] === screen) b.classList.add('active');
  });
  document.getElementById('s-' + screen).classList.add('active');
  if (screen === 'hoje')     renderHoje();
  if (screen === 'desafios') renderDesafios();
  if (screen === 'detalhe' && id) renderDetalhe(id);
  if (screen === 'explorar') renderExplorar();
  if (screen === 'gratidao') { selectedDate = tod(); rulerOffset = 0; renderRuler(); renderEntries(); }
}

/* ══════════════════════════════════════════════
   HOJE
══════════════════════════════════════════════ */
function renderHoje() {
  const h = new Date().getHours();
  document.getElementById('greet').textContent =
    h < 12 ? 'Bom dia' : h < 18 ? 'Boa tarde' : 'Boa noite';
  document.getElementById('hoje-date').textContent = new Date()
    .toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })
    .replace(/^\w/, c => c.toUpperCase());

  const active = challenges.filter(isActive);
  const td = tod();
  const done = active.filter(c => (c.checkins || []).includes(td));
  const maxS = challenges.reduce((m, c) => Math.max(m, getStreak(c)), 0);

  document.getElementById('st-a').textContent = active.length;
  document.getElementById('st-f').textContent = done.length + '/' + active.length;
  document.getElementById('st-s').textContent = maxS;

  const el = document.getElementById('daily-list');
  if (!active.length) {
    el.innerHTML = `<div class="empty"><span class="empty-icon">🌱</span>Nenhum desafio ativo ainda.<br>Explore sugestões ou crie o seu.</div>`;
    return;
  }

  el.innerHTML = [...active]
    .sort((a, b) => ((a.checkins || []).includes(td) ? 1 : 0) - ((b.checkins || []).includes(td) ? 1 : 0))
    .map(c => {
      const isDone = (c.checkins || []).includes(td);
      const streak = getStreak(c);
      const cat = CATS[c.cat] || { l: c.cat, c: '#bbb', bg: '#eee', d: '#555' };
      return `<div class="daily-item">
        <button class="check-ring${isDone ? ' done' : ''}" onclick="toggleCheck('${c.id}')"
          style="${isDone ? `background:${cat.c};border-color:${cat.c}` : `border-color:${cat.c}`}">
          <svg viewBox="0 0 13 13" stroke="${isDone ? '#fff' : cat.c}"><polyline points="2,6.5 5,9.5 11,3.5"/></svg>
        </button>
        <div style="flex:1;min-width:0">
          <div class="daily-name${isDone ? ' crossed' : ''}">${c.name}</div>
          <div class="daily-meta">
            <span class="dot7" style="background:${cat.c}"></span>
            <span class="daily-cat">${cat.l}</span>
            ${streak > 1 ? `<span class="streak-p">🔥 ${streak}</span>` : ''}
          </div>
        </div>
      </div>`;
    }).join('');
}

function toggleCheck(id) {
  const c = challenges.find(x => x.id === id);
  if (!c) return;
  if (!c.checkins) c.checkins = [];
  const td = tod();
  const i = c.checkins.indexOf(td);
  if (i >= 0) c.checkins.splice(i, 1); else c.checkins.push(td);
  save();
  renderHoje();
}

/* ══════════════════════════════════════════════
   DESAFIOS
══════════════════════════════════════════════ */
function renderDesafios() {
  const cats = ['all', ...new Set(challenges.map(c => c.cat))];
  document.getElementById('filter-bar').innerHTML = cats.map(cat =>
    `<button class="chip${activeFilter === cat ? ' active' : ''}" onclick="setFilter('${cat}')">
      ${cat === 'all' ? 'Todos' : (CATS[cat]?.l || cat)}
    </button>`
  ).join('');

  const el = document.getElementById('ch-list');
  const filtered = challenges.filter(c => activeFilter === 'all' || c.cat === activeFilter);
  if (!filtered.length) {
    el.innerHTML = `<div class="empty"><span class="empty-icon">📋</span>Nenhum desafio.<br>Toque em + para adicionar.</div>`;
    return;
  }

  el.innerHTML = filtered.map(c => {
    const cat = CATS[c.cat] || { l: c.cat, c: '#bbb', bg: '#eee', d: '#555' };
    const { pct } = getProg(c);
    const streak = getStreak(c);
    const rm = recentMissed(c);
    return `<div class="ch-card${rm.length ? ' missed' : ''}" onclick="nav('detalhe','${c.id}')">
      <div class="ch-top">
        <div class="ch-name">${c.name}</div>
        <div class="ch-actions" onclick="event.stopPropagation()">
          <button class="ibt" onclick="openModal('${c.id}')">
            <svg viewBox="0 0 14 14"><path d="M2 10.5L9.5 3a1.5 1.5 0 012 2L4 12.5H2v-2z"/></svg>
          </button>
        </div>
      </div>
      <div class="ch-foot">
        <span class="ch-badge" style="background:${cat.bg};color:${cat.d}">${cat.l}</span>
        <span class="ch-meta">${pct}% · ${c.days}d</span>
        ${streak > 0 ? `<span class="stk-sm">🔥 ${streak}</span>` : ''}
        ${rm.length ? `<span class="miss-tag">⚠ ${rm.length}d perdido${rm.length > 1 ? 's' : ''}</span>` : ''}
        ${!isActive(c) ? `<span class="ch-meta">Encerrado</span>` : ''}
      </div>
      <div class="prog"><div class="prog-f" style="width:${pct}%;background:${cat.c}"></div></div>
    </div>`;
  }).join('');
}

function setFilter(f) { activeFilter = f; renderDesafios(); }

/* ══════════════════════════════════════════════
   DETALHE
══════════════════════════════════════════════ */
function renderDetalhe(id) {
  const c = challenges.find(x => x.id === id);
  if (!c) return;
  const cat = CATS[c.cat] || { l: c.cat, c: '#B5C4AE', bg: '#EEF3EC', d: '#5A7352' };
  const { pct } = getProg(c);
  const streak = getStreak(c);
  const missed = getMissed(c);
  const rate = getRate(c);
  const chk = c.checkins || [];

  const calDays = [];
  const cs = new Date(tod());
  cs.setDate(cs.getDate() - 27);
  for (let i = 0; i < 28; i++) {
    const d = new Date(cs);
    d.setDate(d.getDate() + i);
    calDays.push(ds(d));
  }

  const last30 = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date(tod());
    d.setDate(d.getDate() - i);
    last30.push(ds(d));
  }

  document.getElementById('det-content').innerHTML = `
    <div class="det-hero">
      <span class="ch-badge" style="background:${cat.bg};color:${cat.d}">${cat.l}</span>
      <div class="det-name">${c.name}</div>
      ${c.desc ? `<div class="det-desc">${c.desc}</div>` : ''}
      <div class="det-prog-label"><span>Período</span><span style="font-weight:500">${pct}%</span></div>
      <div class="det-prog-bar"><div class="det-prog-fill" style="width:${pct}%;background:${cat.c}"></div></div>
      <div class="det-dates">
        <span>${new Date(c.startDate).toLocaleDateString('pt-BR')}</span>
        <span>${addD(c.startDate, c.days).toLocaleDateString('pt-BR')}</span>
      </div>
    </div>
    <div class="det-stats">
      <div class="ds"><div class="ds-v">${streak}</div><div class="ds-l">sequência 🔥</div></div>
      <div class="ds"><div class="ds-v">${chk.length}</div><div class="ds-l">realizados</div></div>
      <div class="ds"><div class="ds-v" style="color:${missed.length ? '#C97A72' : cat.c}">${missed.length}</div><div class="ds-l">perdidos</div></div>
      <div class="ds"><div class="ds-v">${rate}%</div><div class="ds-l">taxa</div></div>
    </div>
    ${missed.length ? `
    <div class="alert-box">
      <div class="alert-t">Dias não realizados</div>
      <div class="alert-b">
        ${missed.slice(-7).map(d => new Date(d).toLocaleDateString('pt-BR', { weekday: 'short', day: 'numeric', month: 'short' })).join(' · ')}
        ${missed.length > 7 ? ` · +${missed.length - 7} anteriores` : ''}
      </div>
    </div>` : ''}
    <div class="chart-sec">
      <div class="slabel" style="padding:0;margin-bottom:10px">Últimos 30 dias</div>
      <div class="chart-wrap">
        <canvas id="det-chart" role="img" aria-label="Histórico de check-ins">Histórico de check-ins.</canvas>
      </div>
    </div>
    <div class="cal-sec">
      <div class="slabel" style="padding:0;margin-bottom:8px">Calendário</div>
      <div class="cal-days-hd">${['D','S','T','Q','Q','S','S'].map(x => `<span>${x}</span>`).join('')}</div>
      <div class="cal-grid">
        ${calDays.map(d => {
          const done = chk.includes(d);
          const fut  = d > tod();
          const num  = new Date(d).getDate();
          return `<div class="cal-cell${done ? ' cdone' : ''}${fut ? ' cfut' : ''}"
            style="background:${done ? cat.c : fut ? 'transparent' : 'var(--surf)'}">${num}</div>`;
        }).join('')}
      </div>
      <div class="cal-legend">
        <span><span class="cal-ldot" style="background:${cat.c}"></span>Realizado</span>
        <span><span class="cal-ldot" style="background:var(--surf)"></span>Não realizado</span>
      </div>
    </div>
    <div class="det-actions">
      <button class="btn btn-outline btn-sm" onclick="openModal('${c.id}')">Editar</button>
      <button class="btn btn-danger btn-sm" onclick="askDel('${c.id}')">Excluir</button>
    </div>`;

  if (detChart) { detChart.destroy(); detChart = null; }
  setTimeout(() => {
    const ctx = document.getElementById('det-chart');
    if (!ctx) return;
    const data   = last30.map(d => chk.includes(d) ? 1 : 0);
    const labels = last30.map(d => new Date(d).toLocaleDateString('pt-BR', { day: 'numeric', month: 'numeric' }));
    detChart = new Chart(ctx, {
      type: 'bar',
      data: { labels, datasets: [{ data, backgroundColor: data.map(v => v ? cat.c + 'cc' : '#F2F1ED'), borderWidth: 0, borderRadius: 4 }] },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { callbacks: { label: c => c.raw ? 'Realizado' : 'Não realizado' } } },
        scales: {
          x: { ticks: { autoSkip: true, maxTicksLimit: 6, font: { size: 9 }, color: '#ABABAB' }, grid: { display: false }, border: { display: false } },
          y: { display: false, min: 0, max: 1.5 }
        }
      }
    });
  }, 100);
}

/* ══════════════════════════════════════════════
   MODAL
══════════════════════════════════════════════ */
function openModal(id) {
  editingId = id || null;
  const del = document.getElementById('del-btn');
  if (id) {
    const c = challenges.find(x => x.id === id);
    if (!c) return;
    document.getElementById('f-name').value  = c.name;
    document.getElementById('f-cat').value   = c.cat;
    document.getElementById('f-days').value  = c.days;
    document.getElementById('f-start').value = c.startDate || tod();
    document.getElementById('f-desc').value  = c.desc || '';
    document.getElementById('m-title').textContent = 'Editar desafio';
    del.style.display = 'inline-flex';
  } else {
    document.getElementById('f-name').value  = '';
    document.getElementById('f-cat').value   = 'saude-fisica';
    document.getElementById('f-days').value  = 30;
    document.getElementById('f-start').value = tod();
    document.getElementById('f-desc').value  = '';
    document.getElementById('m-title').textContent = 'Novo desafio';
    del.style.display = 'none';
  }
  document.getElementById('mback').classList.add('open');
  setTimeout(() => document.getElementById('f-name').focus(), 80);
}

function closeModal() { document.getElementById('mback').classList.remove('open'); }
function closeMback(e) { if (e.target === document.getElementById('mback')) closeModal(); }

function saveChallenge() {
  const name = document.getElementById('f-name').value.trim();
  if (!name) return;
  const startDate = document.getElementById('f-start').value || tod();
  if (editingId) {
    const c = challenges.find(x => x.id === editingId);
    if (!c) return;
    c.name      = name;
    c.cat       = document.getElementById('f-cat').value;
    c.days      = parseInt(document.getElementById('f-days').value) || 30;
    c.startDate = startDate;
    c.desc      = document.getElementById('f-desc').value.trim();
  } else {
    challenges.unshift({
      id:        Date.now().toString(),
      name,
      cat:       document.getElementById('f-cat').value,
      days:      parseInt(document.getElementById('f-days').value) || 30,
      desc:      document.getElementById('f-desc').value.trim(),
      startDate,
      checkins:  [],
    });
  }
  save();
  closeModal();
  if (curScreen === 'desafios') renderDesafios();
  else if (curScreen === 'detalhe' && editingId) renderDetalhe(editingId);
  else if (curScreen === 'hoje') renderHoje();
}

function askDel(id) {
  pendingDelId = id || editingId;
  closeModal();
  document.getElementById('cback').classList.add('open');
}

function confirmDel() {
  challenges = challenges.filter(c => c.id !== pendingDelId);
  pendingDelId = null;
  save();
  document.getElementById('cback').classList.remove('open');
  nav('desafios');
}

/* ══════════════════════════════════════════════
   EXPLORAR
══════════════════════════════════════════════ */
function renderExplorar() {
  document.getElementById('sug-grid').innerHTML = SUGS.map(s => {
    const cat = CATS[s.cat] || { l: s.cat, bg: '#eee', d: '#555' };
    const svgIcon = ICONS[s.icon] || '';
    return `<div class="sug-card" onclick='fromSug(${JSON.stringify(s)})'>
      <span class="sug-icon">${svgIcon}</span>
      <div class="sug-name">${s.name}</div>
      <div class="sug-desc">${s.desc}</div>
      <span class="sug-tag" style="background:${cat.bg};color:${cat.d}">${cat.l} · ${s.days}d</span>
    </div>`;
  }).join('');
}

function fromSug(s) {
  document.getElementById('f-name').value  = s.name;
  document.getElementById('f-cat').value   = s.cat;
  document.getElementById('f-days').value  = s.days;
  document.getElementById('f-start').value = tod();
  document.getElementById('f-desc').value  = s.desc || '';
  document.getElementById('m-title').textContent = 'Novo desafio';
  document.getElementById('del-btn').style.display = 'none';
  editingId = null;
  nav('desafios');
  document.getElementById('mback').classList.add('open');
}

/* ══════════════════════════════════════════════
   GRATIDÃO — date ruler
══════════════════════════════════════════════ */
function getWeekStart(offset) {
  const d = new Date();
  d.setDate(d.getDate() - d.getDay() + offset * 7);
  d.setHours(0, 0, 0, 0);
  return d;
}

function rulerShift(dir) { rulerOffset += dir; renderRuler(); }

function renderRuler() {
  const ws = getWeekStart(rulerOffset);
  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(ws);
    d.setDate(d.getDate() + i);
    days.push(d);
  }

  const todStr = tod();
  const mid = days[3];
  document.getElementById('ruler-month').textContent =
    mid.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }).replace(/^\w/, c => c.toUpperCase());

  const entryDates = new Set(gratitudes.map(g => g.date));
  const DN = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  document.getElementById('date-ruler').innerHTML = days.map(d => {
    const dStr  = ds(d);
    const isTod = dStr === todStr;
    const isSel = dStr === selectedDate;
    const hasE  = entryDates.has(dStr);
    return `<div class="date-pill${isSel ? ' sel' : ''}${isTod ? ' is-today' : ''}${hasE ? ' has-entry' : ''}"
      onclick="selectDate('${dStr}')">
      <span class="dp-day">${DN[d.getDay()]}</span>
      <span class="dp-num">${d.getDate()}</span>
      <span class="dp-dot"></span>
    </div>`;
  }).join('');
}

function selectDate(dStr) {
  selectedDate = dStr;
  renderRuler();
  renderEntries();
  const label = dStr === tod()
    ? 'Registrar para hoje'
    : `Registrar para ${new Date(dStr + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}`;
  document.getElementById('grat-lbl').textContent = label;
}

function renderEntries() {
  const entries = gratitudes.filter(g => g.date === selectedDate);
  const el = document.getElementById('grat-entries');
  if (!entries.length) {
    el.innerHTML = `<div class="grat-empty"><span class="grat-empty-icon">🌸</span>Nenhum registro para este dia.<br>Escreva acima para guardar um momento.</div>`;
    return;
  }
  el.innerHTML = entries.map(g =>
    `<div class="grat-entry"><div class="grat-entry-text">${g.text}</div></div>`
  ).join('');
}

function addGrat() {
  const t = document.getElementById('grat-input').value.trim();
  if (!t) return;
  gratitudes.push({ id: Date.now().toString(), text: t, date: selectedDate });
  document.getElementById('grat-input').value = '';
  save();
  renderRuler();
  renderEntries();
}

/* ══════════════════════════════════════════════
   KEYBOARD
══════════════════════════════════════════════ */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.getElementById('mback').classList.remove('open');
    document.getElementById('cback').classList.remove('open');
  }
  if (e.key === 'Enter' && document.getElementById('mback').classList.contains('open')) {
    const a = document.activeElement;
    if (a && a.tagName !== 'TEXTAREA' && a.tagName !== 'BUTTON') saveChallenge();
  }
});

/* ══════════════════════════════════════════════
   INIT
══════════════════════════════════════════════ */
initApp();
