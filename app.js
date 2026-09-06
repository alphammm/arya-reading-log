/* ===========================================================
   Arya's Reading Log — app logic
   =========================================================== */

const KEY = 'arya-reading-log-v1';
const DEFAULT_STATE = { name: 'Arya', grade: 3, logs: [], quests: {}, stories: [], gems: 0 };

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? Object.assign({}, DEFAULT_STATE, JSON.parse(raw)) : Object.assign({}, DEFAULT_STATE);
  } catch (e) { return Object.assign({}, DEFAULT_STATE); }
}
function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }
let S = load();

const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const uid = () => 'x' + Math.random().toString(36).slice(2, 9);
const today = () => new Date().toISOString().slice(0, 10);
const prettyDate = d => new Date(d + 'T12:00:00').toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });

/* ---------- text helpers ---------- */
function normalize(s) {
  return (s || '').toLowerCase()
    .replace(/[’‘`]/g, "'")
    .replace(/[^a-z0-9' ]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
const wordsOf = s => normalize(s).split(' ').filter(Boolean);
function hasPhrase(said, phrase) {
  const p = normalize(phrase);
  if (!p) return false;
  if (p.includes(' ')) return normalize(said).includes(p);
  return wordsOf(said).includes(p);
}
function overlap(said, target) {
  const t = wordsOf(target);
  if (!t.length) return 0;
  const set = new Set(wordsOf(said));
  let hit = 0;
  t.forEach(w => { if (set.has(w)) hit++; });
  return hit / t.length;
}

/* ===========================================================
   SPEECH  (recognition + synthesis)
   =========================================================== */
const Speech = {
  Rec: window.SpeechRecognition || window.webkitSpeechRecognition,
  rec: null, want: false, finalText: '', timer: null, cb: {},
  supported() { return !!this.Rec; },

  start(cb, maxMs) {
    if (!this.supported()) { cb.onError && cb.onError('unsupported'); return; }
    this.cb = cb; this.want = true; this.finalText = '';
    this._make();
    try { this.rec.start(); } catch (e) { /* already started */ }
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.stop(), maxMs || 20000);
  },

  stop() {
    this.want = false;
    clearTimeout(this.timer);
    if (this.rec) { try { this.rec.stop(); } catch (e) {} }
  },

  _make() {
    if (this.rec) return;
    const r = new this.Rec();
    r.lang = 'en-US';
    r.continuous = true;
    r.interimResults = true;
    r.maxAlternatives = 3;

    r.onresult = e => {
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const res = e.results[i];
        if (res.isFinal) this.finalText += ' ' + res[0].transcript;
        else interim += res[0].transcript;
      }
      this.cb.onPartial && this.cb.onPartial((this.finalText + ' ' + interim).trim());
    };

    r.onerror = e => {
      if (e.error === 'no-speech' || e.error === 'aborted') return; // onend will handle
      this.want = false;
      this.cb.onError && this.cb.onError(e.error);
    };

    r.onend = () => {
      if (this.want) { try { r.start(); } catch (e) {} return; }
      clearTimeout(this.timer);
      this.cb.onEnd && this.cb.onEnd(this.finalText.trim());
    };

    this.rec = r;
  },

  say(text, rate) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = rate || 0.92;
    u.pitch = 1.05;
    window.speechSynthesis.speak(u);
  }
};

/* ===========================================================
   ROUTER
   =========================================================== */
let currentGrade = S.grade;
let lastShelf = S.grade;

function go(view, arg) {
  Speech.stop();
  if (window.speechSynthesis) window.speechSynthesis.cancel();
  $$('.view').forEach(v => v.classList.remove('active'));
  const el = $('#view-' + view);
  if (el) el.classList.add('active');
  $$('.nav button').forEach(b => b.classList.toggle('active', b.dataset.go === view));
  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (view === 'home') renderHome();
  if (view === 'library') renderLibrary(arg || currentGrade);
  if (view === 'book') renderBook(arg);
  if (view === 'log') renderLog();
  if (view === 'quests') renderQuestMap();
  if (view === 'stories') renderStories();
}

document.addEventListener('click', e => {
  const t = e.target.closest('[data-go]');
  if (t) { go(t.dataset.go); }
});

/* ===========================================================
   STATS + BADGES
   =========================================================== */
function totalMinutes() { return S.logs.reduce((a, l) => a + (Number(l.minutes) || 0), 0); }

function streak() {
  if (!S.logs.length) return 0;
  const days = new Set(S.logs.map(l => l.date));
  let n = 0;
  const d = new Date();
  for (;;) {
    const key = d.toISOString().slice(0, 10);
    if (days.has(key)) { n++; d.setDate(d.getDate() - 1); }
    else if (n === 0 && key === today()) { d.setDate(d.getDate() - 1); } // today not logged yet: still count from yesterday
    else break;
    if (n > 999) break;
  }
  return n;
}

function clearedLevels() { return Object.values(S.quests).filter(q => q.done).length; }

const BADGE_DEFS = [
  { e: '📖', n: 'First Book', d: 'Log 1 book', on: () => S.logs.length >= 1 },
  { e: '🖐️', n: 'High Five', d: 'Log 5 books', on: () => S.logs.length >= 5 },
  { e: '🏆', n: 'Book Champion', d: 'Log 10 books', on: () => S.logs.length >= 10 },
  { e: '⏱️', n: 'Century', d: 'Read 100 minutes', on: () => totalMinutes() >= 100 },
  { e: '🔥', n: 'On Fire', d: '3 day streak', on: () => streak() >= 3 },
  { e: '🎤', n: 'Brave Voice', d: 'Clear 1 quest', on: () => clearedLevels() >= 1 },
  { e: '🎮', n: 'Quest Master', d: 'Clear 5 quests', on: () => clearedLevels() >= 5 },
  { e: '✨', n: 'Storyteller', d: 'Tell 1 story', on: () => S.stories.length >= 1 },
  { e: '📚', n: 'Author', d: 'Tell 5 stories', on: () => S.stories.length >= 5 },
  { e: '💎', n: 'Gem Hunter', d: 'Earn 50 gems', on: () => S.gems >= 50 }
];

function updateChip() { $('#gemchip').textContent = '💎 ' + S.gems; }

/* ===========================================================
   HOME
   =========================================================== */
function renderHome() {
  $('#hello').textContent = `Hi ${S.name}! 👋`;
  $('#s-books').textContent = S.logs.length;
  $('#s-minutes').textContent = totalMinutes();
  $('#s-streak').textContent = streak();
  $('#s-stories').textContent = S.stories.length;
  updateChip();

  const suffix = n => (n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th');
  $('#grade-grid').innerHTML = Object.keys(LIBRARY).map(g => {
    const mine = Number(g) === Number(S.grade);
    return `<button class="grade-card ${mine ? 'mine' : ''}" data-grade="${g}">
      ${mine ? '<span class="mytag">MY GRADE</span>' : ''}
      <div class="num">${g}</div>
      <div class="lbl">${g}${suffix(Number(g))} Grade</div>
      <div class="cnt">${LIBRARY[g].length} books</div>
    </button>`;
  }).join('');

  $$('#grade-grid .grade-card').forEach(b => {
    b.onclick = () => { currentGrade = Number(b.dataset.grade); go('library', currentGrade); };
  });

  const recent = S.logs.slice(0, 3);
  $('#recent-home').innerHTML = recent.length
    ? recent.map(l => logItemHTML(l, false)).join('')
    : `<div class="empty-state"><span class="e">🌱</span>No books logged yet. Pick a shelf above and start reading!</div>`;

  $('#badges').innerHTML = BADGE_DEFS.map(b =>
    `<div class="badge ${b.on() ? 'on' : ''}"><div class="e">${b.e}</div><div class="n">${b.n}</div><div class="d">${b.d}</div></div>`
  ).join('');
}

/* ===========================================================
   LIBRARY
   =========================================================== */
const COVERS = [
  'linear-gradient(135deg,#ffd6e0,#ffb3c6)', 'linear-gradient(135deg,#d8f3ff,#a2d2ff)',
  'linear-gradient(135deg,#fff3c4,#ffd166)', 'linear-gradient(135deg,#d9f7e8,#8ce0c0)',
  'linear-gradient(135deg,#e7dcff,#c1aaff)', 'linear-gradient(135deg,#ffe0cc,#ffb997)'
];
let libFilter = 'All';
let libQuery = '';

function renderLibrary(grade) {
  currentGrade = Number(grade); lastShelf = currentGrade;
  const books = LIBRARY[currentGrade] || [];
  const suffix = n => (n === 1 ? 'st' : n === 2 ? 'nd' : n === 3 ? 'rd' : 'th');
  $('#lib-title').textContent = `${currentGrade}${suffix(currentGrade)} Grade Shelf 📚`;
  $('#lib-sub').textContent = `${books.length} books picked for this grade. Tap a book to read about it and log it.`;

  const tags = ['All'].concat(Array.from(new Set(books.flatMap(b => b.tags))).sort());
  if (!tags.includes(libFilter)) libFilter = 'All';
  $('#lib-filters').innerHTML = tags.map(t =>
    `<button class="${t === libFilter ? 'active' : ''}" data-tag="${t}">${t}</button>`).join('');
  $$('#lib-filters button').forEach(b => b.onclick = () => { libFilter = b.dataset.tag; drawBooks(); });

  const setBtn = $('#set-grade');
  const isMine = Number(S.grade) === currentGrade;
  setBtn.textContent = isMine ? '⭐ This is my grade' : '⭐ Make this my grade';
  setBtn.disabled = isMine;
  setBtn.onclick = () => {
    S.grade = currentGrade;
    activeBand = bandForGrade(S.grade).id;   // quests follow the new grade
    save();
    renderLibrary(currentGrade);
  };

  $('#lib-search').value = libQuery;
  $('#lib-search').oninput = e => { libQuery = e.target.value; drawBooks(); };

  drawBooks();
}

function drawBooks() {
  const books = (LIBRARY[currentGrade] || []).filter(b => {
    const okTag = libFilter === 'All' || b.tags.includes(libFilter);
    const q = libQuery.toLowerCase().trim();
    const okQ = !q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q);
    return okTag && okQ;
  });

  $('#book-grid').innerHTML = books.length ? books.map((b, i) => {
    const done = S.logs.some(l => l.bookId === b.id);
    return `<button class="book-card" data-book="${b.id}">
      <div class="cover" style="background:${COVERS[i % COVERS.length]}">${b.emoji}${done ? '<span class="done">✓ READ</span>' : ''}</div>
      <div class="body">
        <div class="t">${b.title}</div>
        <div class="a">${b.author}</div>
        <div class="b">${b.blurb}</div>
        <div class="tags">${b.tags.map(t => `<span class="tag ${t === 'Famous' ? 'famous' : ''}">${t}</span>`).join('')}</div>
      </div>
    </button>`;
  }).join('') : `<div class="empty-state"><span class="e">🔍</span>No books match that. Try another word!</div>`;

  $$('#book-grid .book-card').forEach(c => c.onclick = () => go('book', c.dataset.book));
}

/* ===========================================================
   BOOK DETAIL + LOGGING
   =========================================================== */
let bookStars = 5;
let timerId = null, timerSec = 0;

function findBook(id) {
  for (const g in LIBRARY) {
    const b = LIBRARY[g].find(x => x.id === id);
    if (b) return { book: b, grade: Number(g) };
  }
  return null;
}

function renderBook(id) {
  const found = findBook(id);
  if (!found) { go('library'); return; }
  const b = found.book;
  bookStars = 5; timerSec = 0; clearInterval(timerId);
  const readTimes = S.logs.filter(l => l.bookId === b.id).length;

  $('#book-back').onclick = () => go('library', found.grade);

  $('#book-detail').innerHTML = `
    <div class="row">
      <div class="panel" style="flex:1 1 320px">
        <div class="cover" style="height:190px;border-radius:18px;font-size:82px;background:${COVERS[0]}">${b.emoji}</div>
        <h1 style="margin-top:18px;font-size:1.6rem">${b.title}</h1>
        <p class="sub" style="margin-bottom:10px">by ${b.author}</p>
        <p style="line-height:1.6;font-weight:600">${b.blurb}</p>
        <div class="tags">${b.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
        <p class="sub" style="margin:16px 0 0">📄 ${b.pages} pages &nbsp;·&nbsp; ⏱️ about ${b.minutes} min per sitting &nbsp;·&nbsp; 🎒 Grade ${found.grade}</p>
        ${readTimes ? `<p class="sub" style="color:var(--mint);font-weight:900">✓ You have logged this ${readTimes} time${readTimes > 1 ? 's' : ''}!</p>` : ''}
        <button class="btn ghost" id="say-blurb" style="margin-top:14px">🔊 Read this to me</button>
      </div>

      <div class="panel" style="flex:1 1 320px">
        <h2 style="margin-top:0">I read this! 📝</h2>

        <div style="background:#f6f3ff;border-radius:18px;padding:16px;text-align:center;margin-bottom:6px">
          <div style="font-size:2.2rem;font-weight:900" id="timer-display">00:00</div>
          <button class="btn sun" id="timer-btn" style="margin-top:8px">▶️ Start reading timer</button>
        </div>

        <label class="f">Minutes I read</label>
        <input type="number" id="b-min" value="${b.minutes}" min="1">
        <label class="f">Pages I read</label>
        <input type="number" id="b-pages" value="" min="0" placeholder="optional">
        <label class="f">My stars</label>
        <div class="stars" id="b-stars"></div>
        <label class="f">My favorite part / what I learned</label>
        <textarea id="b-note" placeholder="I liked the part where…"></textarea>
        <button class="btn ghost" id="b-voice-note" style="margin-top:10px">🎤 Say my notes instead</button>
        <button class="btn mint" id="b-save" style="margin-top:10px">✅ Add to my reading log</button>
      </div>
    </div>`;

  bindStars('#b-stars', bookStars, v => { bookStars = v; });

  $('#say-blurb').onclick = () => Speech.say(`${b.title}, by ${b.author}. ${b.blurb}`);

  $('#timer-btn').onclick = () => {
    const btn = $('#timer-btn');
    if (timerId) {
      clearInterval(timerId); timerId = null;
      btn.textContent = '▶️ Resume timer';
      $('#b-min').value = Math.max(1, Math.round(timerSec / 60));
    } else {
      btn.textContent = '⏸️ Pause timer';
      timerId = setInterval(() => {
        timerSec++;
        const m = String(Math.floor(timerSec / 60)).padStart(2, '0');
        const s = String(timerSec % 60).padStart(2, '0');
        $('#timer-display').textContent = `${m}:${s}`;
        $('#b-min').value = Math.max(1, Math.round(timerSec / 60));
      }, 1000);
    }
  };

  $('#b-voice-note').onclick = function () {
    const btn = this;
    if (Speech.want) { Speech.stop(); return; }
    if (!Speech.supported()) { alert('Voice typing needs Chrome, Edge or Safari. You can still type your notes!'); return; }
    btn.textContent = '⏹️ Stop and keep it';
    Speech.start({
      onPartial: t => { $('#b-note').value = t; },
      onEnd: t => { $('#b-note').value = t; btn.textContent = '🎤 Say my notes instead'; },
      onError: () => { btn.textContent = '🎤 Say my notes instead'; alert(micHelp()); }
    }, 30000);
  };

  $('#b-save').onclick = () => {
    clearInterval(timerId); timerId = null;
    addLog({
      id: uid(), bookId: b.id, title: b.title, author: b.author, emoji: b.emoji,
      date: today(), minutes: Number($('#b-min').value) || 0,
      pages: Number($('#b-pages').value) || 0, rating: bookStars, note: $('#b-note').value.trim()
    });
    burst();
    Speech.say(`Great job! You logged ${b.title}.`);
    setTimeout(() => go('log'), 700);
  };
}

/* Draws 5 clickable stars into `sel`, starting at `value`, calling onPick(v) each time. */
function bindStars(sel, value, onPick) {
  const host = $(sel);
  if (!host) return;
  const paint = v => {
    host.innerHTML = [1, 2, 3, 4, 5].map(i => `<span class="${i <= v ? 'on' : ''}" data-v="${i}">⭐</span>`).join('');
    Array.from(host.children).forEach(s => s.onclick = () => {
      const nv = Number(s.dataset.v);
      onPick(nv);
      paint(nv);
    });
  };
  paint(value);
}

/* ===========================================================
   MY LOG
   =========================================================== */
let manStars = 5;

function addLog(entry) {
  S.logs.unshift(entry);
  S.gems += 5;
  save(); updateChip();
}

function logItemHTML(l, withDelete) {
  return `<div class="log-item">
    <div class="em">${l.emoji || '📘'}</div>
    <div style="flex:1">
      <div class="t">${l.title}</div>
      <div class="m">${l.author ? l.author + ' · ' : ''}${prettyDate(l.date)} · ${l.minutes} min${l.pages ? ' · ' + l.pages + ' pages' : ''} · ${'⭐'.repeat(l.rating || 0)}</div>
      ${l.note ? `<div class="n">“${l.note}”</div>` : ''}
    </div>
    ${withDelete ? `<button class="del" data-del="${l.id}" title="Remove">✕</button>` : ''}
  </div>`;
}

function renderLog() {
  $('#log-count').textContent = S.logs.length ? `(${S.logs.length})` : '';
  $('#log-list').innerHTML = S.logs.length
    ? S.logs.map(l => logItemHTML(l, true)).join('')
    : `<div class="empty-state"><span class="e">📗</span>Nothing here yet. Go to the Library and log your first book!</div>`;

  $$('#log-list [data-del]').forEach(b => b.onclick = () => {
    S.logs = S.logs.filter(l => l.id !== b.dataset.del);
    save(); renderLog();
  });

  bindStars('#man-stars', manStars, v => { manStars = v; });
  $('#man-save').onclick = () => {
    const t = $('#man-title').value.trim();
    if (!t) { alert('What is the title? 😊'); return; }
    addLog({
      id: uid(), bookId: null, title: t, author: $('#man-author').value.trim(), emoji: '📘',
      date: today(), minutes: Number($('#man-min').value) || 0, pages: 0,
      rating: manStars, note: $('#man-note').value.trim()
    });
    $('#man-title').value = ''; $('#man-author').value = ''; $('#man-note').value = '';
    burst(); renderLog();
  };
}

/* ===========================================================
   QUEST MAP
   =========================================================== */
let activeBand = null;

function micHelp() {
  return 'The microphone did not turn on.\n\n• Use Chrome, Edge or Safari\n• Allow the microphone when the browser asks\n• If you opened the file directly, run it with a small local server (see README)\n\nYou can always use the "Type it instead" box under the mic.';
}

function renderQuestMap() {
  if (!activeBand) activeBand = bandForGrade(S.grade).id;

  $('#mic-notice').innerHTML = Speech.supported()
    ? ''
    : `<div class="notice">🎤 This browser cannot listen to your voice. Open this page in <b>Chrome</b>, <b>Edge</b> or <b>Safari</b> to speak your answers. You can still play by typing.</div>`;

  $('#band-filters').innerHTML = BANDS.map(b =>
    `<button class="${b.id === activeBand ? 'active' : ''}" data-band="${b.id}">${b.emoji} ${b.name} · Grade ${b.grades[0]}–${b.grades[b.grades.length - 1]}</button>`).join('');
  $$('#band-filters button').forEach(b => b.onclick = () => { activeBand = b.dataset.band; renderQuestMap(); });

  const levels = QUESTS[activeBand];
  $('#level-grid').innerHTML = levels.map((lv, i) => {
    const rec = S.quests[lv.id];
    const prev = i === 0 ? null : S.quests[levels[i - 1].id];
    const locked = i > 0 && !(prev && prev.done);
    const stars = rec ? '⭐'.repeat(rec.stars) : '';
    return `<button class="level-card ${locked ? 'locked' : ''} ${rec && rec.done ? 'done' : ''}" data-level="${lv.id}" ${locked ? 'disabled' : ''}>
      ${locked ? '<span class="lock">🔒</span>' : ''}
      <div class="e">${lv.emoji}</div>
      <div class="t">Level ${i + 1} · ${lv.title}</div>
      <div class="b">${lv.blurb}</div>
      ${rec && rec.done ? `<div class="score">${stars} ${rec.best}%</div>` : locked ? `<div class="score" style="color:var(--ink-soft)">Clear level ${i} first</div>` : `<div class="score" style="color:var(--brand)">Ready — tap to play 🎤</div>`}
    </button>`;
  }).join('');

  $$('#level-grid .level-card').forEach(c => {
    if (c.disabled) return;
    c.onclick = () => startLevel(activeBand, c.dataset.level);
  });
}

/* ===========================================================
   QUEST PLAYER
   =========================================================== */
let P = null;

function startLevel(bandId, levelId) {
  const level = QUESTS[bandId].find(l => l.id === levelId);
  P = { bandId, level, idx: 0, correct: 0, tries: 0, heard: '', picked: null, checked: false, listening: false };
  go('play');
  renderQuestion();
}

function progress() {
  const pct = P ? (P.idx / P.level.items.length) * 100 : 0;
  $('#qprogress').style.width = pct + '%';
}

function kindLabel(type) {
  return { repeat: '🗣️ Say it out loud', fill: '🧩 Fill the blank', grammar: '⚡ Grammar', vocab: '🔍 Word detective', talk: '💬 Talk about it', story: '✨ Make up your own story' }[type] || 'Question';
}

function renderQuestion() {
  progress();
  const item = P.level.items[P.idx];
  P.heard = ''; P.picked = null; P.checked = false; P.tries = 0; P.countedThis = false;

  const promptText = item.text || item.prompt;
  const maxMs = (item.type === 'story') ? 90000 : (item.type === 'talk' ? 60000 : 25000);

  let optionsHTML = '';
  if (item.options) {
    optionsHTML = `<div class="opts">${item.options.map(o => `<span class="opt" data-opt="${o}">${o}</span>`).join('')}</div>
      <div class="qhint">${item.anyOf ? '👍 Any of these works — it is your choice!' : 'Say the one that is correct.'}</div>`;
  }
  let bankHTML = '';
  if (item.words) {
    bankHTML = `<div class="wordbank">${item.words.map(w => `<i>${w}</i>`).join('')}</div>
      <div class="qhint" style="margin-top:8px">Try to use some of these words. Speak for at least ${item.minWords} words!</div>`;
  }
  if (item.type === 'talk') {
    bankHTML = `<div class="qhint">${item.hint || ''} Speak for at least ${item.minWords} words.</div>`;
  }

  $('#qstage').innerHTML = `
    <div class="qcard">
      <span class="qkind">${kindLabel(item.type)} · ${P.idx + 1} of ${P.level.items.length}</span>
      <div class="qprompt">${promptText}</div>
      ${item.hint && item.type !== 'talk' ? `<div class="qhint">${item.hint}</div>` : ''}
      ${item.say ? `<div class="qhint">${item.say}</div>` : ''}
      ${optionsHTML}
      ${bankHTML}
      <button class="btn ghost" id="listen" style="margin-top:16px">🔊 Read it to me</button>

      <div class="mic-zone">
        <button class="mic" id="mic">🎤</button>
        <div class="mic-label" id="mic-label">Tap the mic and say your answer</div>
      </div>

      <div class="heard empty" id="heard">…I am listening for your voice…</div>
      <div id="verdict"></div>

      <div class="qactions">
        <button class="btn ghost" id="again">🔁 Try again</button>
        <button class="btn" id="next" disabled>Next →</button>
      </div>

      <details class="typefallback">
        <summary>No microphone? Type it instead ⌨️</summary>
        <div class="box">
          <input type="text" id="typed" placeholder="Type your answer here">
          <button class="btn ghost" id="typed-go">Check</button>
        </div>
      </details>
    </div>`;

  $('#listen').onclick = () => Speech.say(promptText + (item.options && !item.anyOf ? '. Choices: ' + item.options.join(', ') : ''));

  if (item.options) {
    $$('.opt').forEach(o => o.onclick = () => {
      $$('.opt').forEach(x => x.classList.remove('picked'));
      o.classList.add('picked');
      Speech.say(o.dataset.opt);
    });
  }

  $('#mic').onclick = () => toggleMic(item, maxMs);
  $('#again').onclick = () => {           // soft reset: keep the try count so hints can appear
    P.heard = '';
    setHeard('');
    $('#verdict').innerHTML = '';
    $$('.opt').forEach(o => o.classList.remove('picked', 'right', 'wrong'));
    $('#mic-label').textContent = 'Tap the mic and say your answer';
  };
  $('#next').onclick = () => nextQuestion();
  $('#typed-go').onclick = () => {
    const v = $('#typed').value.trim();
    if (!v) return;
    setHeard(v);
    judge(item, v);
  };
}

function setHeard(text) {
  const h = $('#heard');
  if (!h) return;
  if (text) { h.textContent = '“' + text + '”'; h.classList.remove('empty'); }
  else { h.textContent = '…I am listening for your voice…'; h.classList.add('empty'); }
}

function toggleMic(item, maxMs) {
  const mic = $('#mic'), label = $('#mic-label');
  if (P.listening) {
    Speech.stop();
    return;
  }
  if (!Speech.supported()) { alert(micHelp()); return; }

  P.listening = true;
  mic.classList.add('listening');
  mic.textContent = '⏹️';
  label.textContent = 'Listening… tap again when you finish';
  $('#verdict').innerHTML = '';
  setHeard('');

  Speech.start({
    onPartial: t => { P.heard = t; setHeard(t); },
    onEnd: t => {
      P.listening = false;
      mic.classList.remove('listening'); mic.textContent = '🎤';
      label.textContent = 'Tap the mic to try again';
      const said = (t || P.heard || '').trim();
      setHeard(said);
      if (!said) {
        $('#verdict').innerHTML = `<div class="verdict tryagain">I did not hear anything 🙉<small>Tap the mic and speak a little louder.</small></div>`;
        return;
      }
      judge(item, said);
    },
    onError: err => {
      P.listening = false;
      mic.classList.remove('listening'); mic.textContent = '🎤';
      label.textContent = 'Tap the mic to try again';
      $('#verdict').innerHTML = `<div class="verdict tryagain">Microphone problem: ${err} <small>${micHelp().replace(/\n/g, ' ')}</small></div>`;
    }
  }, maxMs);
}

/* ---------- grading ---------- */
function judge(item, said) {
  const v = $('#verdict');
  if (!P || !v || !$('#view-play').classList.contains('active')) return; // left the quest mid-answer
  P.tries++;
  let ok = false, msg = '', detail = '';
  const n = wordsOf(said).length;

  if (item.type === 'repeat') {
    const score = overlap(said, item.text);
    if (score >= 0.75) { ok = true; msg = score >= 0.95 ? '🌟 Perfect reading!' : '✅ Great reading!'; detail = `You matched ${Math.round(score * 100)}% of the words.`; }
    else { msg = '🔁 Almost! Read it once more.'; detail = `You matched ${Math.round(score * 100)}% of the words. Take your time and say every word.`; }

  } else if (item.type === 'fill') {
    const chosen = item.options.find(o => hasPhrase(said, o));
    if (chosen) {
      ok = true;
      msg = `✅ Nice! You chose “${chosen}”.`;
      detail = n >= 5 ? 'And you said a whole sentence — that is even better! 🌟' : 'Next time try saying the WHOLE sentence out loud.';
      $$('.opt').forEach(o => { if (o.dataset.opt === chosen) o.classList.add('right'); });
    } else {
      msg = '🔁 I did not hear one of the choices.';
      detail = 'Say a sentence that uses one of these words: ' + item.options.join(', ') + '.';
    }

  } else if (item.type === 'grammar' || item.type === 'vocab') {
    if (hasPhrase(said, item.answer)) {
      ok = true; msg = '✅ Correct!'; detail = item.explain || '';
      $$('.opt').forEach(o => { if (o.dataset.opt === item.answer) o.classList.add('right'); });
    } else {
      const wrong = item.options.find(o => o !== item.answer && hasPhrase(said, o));
      msg = wrong ? `❌ “${wrong}” is not the one.` : '🔁 I did not catch the answer.';
      detail = P.tries >= 2 ? `The answer is “${item.answer}”. ${item.explain || ''}` : 'Have another think and try again!';
      $$('.opt').forEach(o => { if (wrong && o.dataset.opt === wrong) o.classList.add('wrong'); });
      if (P.tries >= 2) $$('.opt').forEach(o => { if (o.dataset.opt === item.answer) o.classList.add('right'); });
    }

  } else if (item.type === 'talk' || item.type === 'story') {
    if (n >= item.minWords) {
      ok = true;
      msg = item.type === 'story' ? '🌟 What a story! Saved to your Story Book.' : '✅ Great answer!';
      detail = `You spoke ${n} words. `;
      if (item.words) {
        const used = item.words.filter(w => hasPhrase(said, w));
        if (used.length) detail += `You used: ${used.join(', ')}. 👏`;
      }
      if (item.type === 'story') saveStory(item.prompt, said);
    } else {
      msg = '🔁 Keep going — a little more!';
      detail = `You said ${n} words. Try for at least ${item.minWords}. Tell me what happened next!`;
    }
  }

  P.checked = true;
  if (ok && !P.countedThis) { P.correct++; P.countedThis = true; S.gems += 3; save(); updateChip(); }
  v.innerHTML = `<div class="verdict ${ok ? 'good' : 'tryagain'}">${msg}${detail ? `<small>${detail}</small>` : ''}</div>`;
  $('#next').disabled = false;
  if (ok) { $('#next').classList.add('mint'); sparkle(); Speech.say(msg.replace(/[^\w\s!,.]/g, '')); }
}

function nextQuestion() {
  P.countedThis = false;
  P.idx++;
  if (P.idx >= P.level.items.length) return finishLevel();
  renderQuestion();
}

function finishLevel() {
  progress();
  $('#qprogress').style.width = '100%';
  const total = P.level.items.length;
  const pct = Math.round((P.correct / total) * 100);
  const stars = pct >= 90 ? 3 : pct >= 60 ? 2 : pct > 0 ? 1 : 0;
  const done = pct >= 50;

  const prev = S.quests[P.level.id] || { best: 0, stars: 0, done: false };
  S.quests[P.level.id] = {
    best: Math.max(prev.best, pct),
    stars: Math.max(prev.stars, stars),
    done: prev.done || done
  };
  if (done) S.gems += 10;
  save(); updateChip();

  const levels = QUESTS[P.bandId];
  const i = levels.findIndex(l => l.id === P.level.id);
  const nextLv = levels[i + 1];

  $('#qstage').innerHTML = `<div class="qcard">
    <div style="font-size:70px">${done ? '🎉' : '💪'}</div>
    <h1 style="margin:10px 0">${done ? 'Level cleared!' : 'Good effort!'}</h1>
    <div style="font-size:2.4rem">${'⭐'.repeat(stars)}${'☆'.repeat(3 - stars)}</div>
    <p class="sub" style="margin-top:14px">You got <b>${P.correct} of ${total}</b> right (${pct}%). ${done ? (nextLv ? `Level ${i + 2} is unlocked! 🔓` : 'You finished this whole band! 🏆') : 'Get half of them right to unlock the next level.'}</p>
    <div class="qactions">
      <button class="btn ghost" id="replay">🔁 Play this level again</button>
      ${done && nextLv ? `<button class="btn mint" id="nextlv">Next level →</button>` : ''}
      <button class="btn" data-go="quests">🗺️ Quest map</button>
    </div>
  </div>`;

  if (done) { burst(); Speech.say('Level cleared! Great job!'); }
  $('#replay').onclick = () => startLevel(P.bandId, P.level.id);
  if ($('#nextlv')) $('#nextlv').onclick = () => startLevel(P.bandId, nextLv.id);
}

/* ===========================================================
   STORIES
   =========================================================== */
function saveStory(prompt, text) {
  const clean = text.charAt(0).toUpperCase() + text.slice(1);
  S.stories.unshift({ id: uid(), date: today(), prompt, text: clean, words: wordsOf(text).length });
  S.gems += 15;
  save(); updateChip();
}

function renderStories() {
  $('#story-list').innerHTML = S.stories.length ? S.stories.map(s => `
    <div class="story-card">
      <h3>✨ ${s.prompt}</h3>
      <div class="m">${prettyDate(s.date)} · ${s.words} words</div>
      <p>${s.text}</p>
      <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap">
        <button class="btn ghost" data-say="${s.id}">🔊 Read it back to me</button>
        <button class="btn ghost" data-delstory="${s.id}">🗑️ Delete</button>
      </div>
    </div>`).join('')
    : `<div class="empty-state"><span class="e">✨</span>No stories yet! Go to <b>Quests</b> → the last level of any band → <b>Make Up Your Own Story</b>.</div>`;

  $$('#story-list [data-say]').forEach(b => b.onclick = () => {
    const s = S.stories.find(x => x.id === b.dataset.say);
    if (s) Speech.say(s.text);
  });
  $$('#story-list [data-delstory]').forEach(b => b.onclick = () => {
    S.stories = S.stories.filter(x => x.id !== b.dataset.delstory);
    save(); renderStories();
  });
}

/* ===========================================================
   CONFETTI
   =========================================================== */
const cv = $('#confetti'), ctx = cv.getContext('2d');
let parts = [], raf = null;
function sizeCanvas() { cv.width = innerWidth; cv.height = innerHeight; }
sizeCanvas(); addEventListener('resize', sizeCanvas);

let lastFrame = 0, sweepId = null;

/* Safety net: if requestAnimationFrame is throttled (background tab, low-power mode),
   wipe the confetti anyway so it never freezes on top of the page. */
function sweepConfetti() {
  clearTimeout(sweepId);
  sweepId = setTimeout(() => {
    parts = [];
    if (raf) { cancelAnimationFrame(raf); raf = null; }
    ctx.clearRect(0, 0, cv.width, cv.height);
  }, 3200);
}

function burst(n) {
  const colors = ['#6c4cf1', '#ff5d8f', '#ffb703', '#06d6a0', '#4cc9f0'];
  const dieAt = performance.now() + 2600;   // wall-clock life, so a throttled tab still clears
  for (let i = 0; i < (n || 90); i++) {
    parts.push({
      x: innerWidth / 2 + (Math.random() - .5) * 260,
      y: innerHeight / 3,
      vx: (Math.random() - .5) * 9,
      vy: Math.random() * -11 - 3,
      s: Math.random() * 9 + 5,
      c: colors[(Math.random() * colors.length) | 0],
      r: Math.random() * 6.3,
      vr: (Math.random() - .5) * .3,
      dieAt
    });
  }
  if (!raf) { lastFrame = performance.now(); raf = requestAnimationFrame(tick); }
  sweepConfetti();
}
function sparkle() { burst(28); }

function tick(now) {
  const t = now || performance.now();
  const dt = Math.min(3, (t - lastFrame) / 16.67);   // frames elapsed, capped
  lastFrame = t;

  ctx.clearRect(0, 0, cv.width, cv.height);
  parts = parts.filter(p => t < p.dieAt && p.y < innerHeight + 60);
  parts.forEach(p => {
    p.vy += 0.32 * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.r += p.vr * dt;
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
    ctx.fillStyle = p.c; ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.62);
    ctx.restore();
  });

  if (parts.length) { raf = requestAnimationFrame(tick); }
  else { ctx.clearRect(0, 0, cv.width, cv.height); raf = null; }
}

/* ===========================================================
   BOOT
   =========================================================== */
bindStars('#man-stars', manStars, v => { manStars = v; });
updateChip();
renderHome();
