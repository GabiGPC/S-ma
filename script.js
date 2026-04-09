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

const SUGS = [
  { name: 'Correr todo dia',          cat: 'saude-fisica',    days: 30,  desc: '30 min diários para corpo e mente.',    icon: '🏃' },
  { name: 'Beber 2L de água',         cat: 'saude-fisica',    days: 21,  desc: 'Hidratação como ritual diário.',        icon: '💧' },
  { name: 'Dormir 8 horas',           cat: 'saude-fisica',    days: 30,  desc: 'Sono de qualidade muda tudo.',          icon: '🌙' },
  { name: '50 flexões/dia',           cat: 'saude-fisica',    days: 90,  desc: 'Força progressiva com constância.',     icon: '💪' },
  { name: 'Caminhada diária',         cat: 'saude-fisica',    days: 30,  desc: '30 min ao ar livre.',                  icon: '🌿' },
  { name: 'Alongamento matinal',      cat: 'saude-fisica',    days: 21,  desc: '10 min para começar bem.',             icon: '🤸' },
  { name: 'Meditação',                cat: 'saude-mental',    days: 21,  desc: '10 min de presença plena.',            icon: '🧘' },
  { name: 'Sem redes sociais',        cat: 'saude-mental',    days: 7,   desc: 'Uma semana de desintoxicação.',         icon: '📵' },
  { name: 'Uma fruta por dia',        cat: 'alimentacao',     days: 30,  desc: 'Pequeno hábito, grande diferença.',    icon: '🍎' },
  { name: 'Zero refrigerante',        cat: 'alimentacao',     days: 30,  desc: 'Substituir pelo que faz bem.',         icon: '🚫' },
  { name: 'Zero álcool',              cat: 'alimentacao',     days: 30,  desc: 'Clareza, sono melhor, mais energia.',  icon: '🍃' },
  { name: 'Ler 20 páginas',           cat: 'intelecto',       days: 30,  desc: 'Leitura diária transforma a mente.',   icon: '📚' },
  { name: 'Escrita ativa',            cat: 'intelecto',       days: 21,  desc: '15 min de escrita todo dia.',          icon: '✍️' },
  { name: 'Gratidão diária',          cat: 'espiritualidade', days: 21,  desc: 'Reconhecer pequenas vitórias.',        icon: '🙏' },
  { name: 'Ligar pra alguém querido', cat: 'social',          days: 30,  desc: 'Manter vínculos afetivos vivos.',      icon: '💛' },
  { name: 'Guardar dinheiro',         cat: 'financeiro',      days: 30,  desc: 'O hábito de poupar, qualquer quantia.',icon: '🌱' },
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
  /* Splash: show for 1.8s then decide onboarding or app */
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
  }, 1800);
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
    document.getElementById('f-name').value = c.name;
    document.getElementById('f-cat').value  = c.cat;
    document.getElementById('f-days').value = c.days;
    document.getElementById('f-desc').value = c.desc || '';
    document.getElementById('m-title').textContent = 'Editar desafio';
    del.style.display = 'inline-flex';
  } else {
    document.getElementById('f-name').value = '';
    document.getElementById('f-cat').value  = 'saude-fisica';
    document.getElementById('f-days').value = 30;
    document.getElementById('f-desc').value = '';
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
  if (editingId) {
    const c = challenges.find(x => x.id === editingId);
    if (!c) return;
    c.name = name;
    c.cat  = document.getElementById('f-cat').value;
    c.days = parseInt(document.getElementById('f-days').value) || 30;
    c.desc = document.getElementById('f-desc').value.trim();
  } else {
    challenges.unshift({
      id: Date.now().toString(),
      name,
      cat:       document.getElementById('f-cat').value,
      days:      parseInt(document.getElementById('f-days').value) || 30,
      desc:      document.getElementById('f-desc').value.trim(),
      startDate: tod(),
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
    return `<div class="sug-card" onclick='fromSug(${JSON.stringify(s)})'>
      <span class="sug-icon">${s.icon}</span>
      <div class="sug-name">${s.name}</div>
      <div class="sug-desc">${s.desc}</div>
      <span class="sug-tag" style="background:${cat.bg};color:${cat.d}">${cat.l} · ${s.days}d</span>
    </div>`;
  }).join('');
}

function fromSug(s) {
  document.getElementById('f-name').value = s.name;
  document.getElementById('f-cat').value  = s.cat;
  document.getElementById('f-days').value = s.days;
  document.getElementById('f-desc').value = s.desc || '';
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
