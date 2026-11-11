'use strict';
/* Tuon — bite-size language lessons. Browser-only: accounts and progress live in localStorage. */
const C = window.COURSES;
const COURSE_IDS = Object.keys(C);
const GOALS = [{ xp: 10, min: 5, label: 'Casual' }, { xp: 20, min: 10, label: 'Regular' }, { xp: 30, min: 15, label: 'Serious' }, { xp: 50, min: 20, label: 'Intense' }];
const REASONS = [['🧳', 'Travel'], ['💼', 'Work & career'], ['🧠', 'Train my brain'], ['🎓', 'School'], ['💬', 'Talk with people'], ['✨', 'Just for fun']];
const LEVELS = [['🌱', "I'm new to {L}", 'Start from the very beginning', 0], ['📖', 'I know some common words', 'Start at Unit 2', 5], ['💬', 'I can have basic conversations', 'Start at Unit 3', 10]];
const SKILL_LEVELS = [['🌱', "I'm new to {L}", 'Start from the very beginning', 0], ['📖', 'I know the basics', 'Start at Unit 2', 5], ['🏆', 'I play regularly', 'Start at Unit 3', 10]];
const CODE_LEVELS = [['🌱', "I'm new to {L}", 'Start from the very beginning', 0], ['💻', "I've written a little {L}", 'Start at Unit 2', 5], ['🚀', 'I use it regularly', 'Start at Unit 3', 10]];
const TRIVIA_LEVELS = [['🌱', "I'm new to {L}", 'Start from the very beginning', 0], ['📖', 'I know some fun facts', 'Start at Unit 2', 5], ['🏆', 'I’m a trivia expert', 'Start at Unit 3', 10]];
const SCHOOL_LEVELS = [['🌱', "I'm new to {L}", 'Start from the very beginning', 0], ['📖', 'I know the basics', 'Start at Unit 2', 5], ['🎓', 'I’m confident in {L}', 'Start at Unit 3', 10]];
const LPU = 5, MAX_HEARTS = 5, HEART_MS = 30 * 60 * 1000, REFILL_COST = 100, FREEZE_COST = 50;
const OFFS = [0, 52, 78, 52, 0];
const LEAGUES = [['🌱', 'Seedling'], ['🌿', 'Sprout'], ['🌳', 'Grove'], ['🌲', 'Forest'], ['🏔️', 'Summit']];

/* ---------------- utils ---------------- */
const $ = s => document.querySelector(s);
const app = document.getElementById('app');
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const sample = (a, n) => shuffle(a).slice(0, n);
const pick = a => a[Math.floor(Math.random() * a.length)];
const pad = n => String(n).padStart(2, '0');
const dkey = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const today = () => dkey(new Date());
const dayOffset = n => { const d = new Date(); d.setDate(d.getDate() + n); return dkey(d); };
const yesterday = () => dayOffset(-1);
const daysBetween = (a, b) => Math.round((new Date(b + 'T00:00') - new Date(a + 'T00:00')) / 864e5);
function weekKey() { const d = new Date(); d.setDate(d.getDate() - (d.getDay() + 6) % 7); return dkey(d); }
const tokens = s => s.replace(/[.,!?¿¡;:。、？！،؟।]/g, ' ').split(/\s+/).filter(Boolean);
const norm = s => String(s).toLowerCase().replace(/[’‘`]/g, "'").replace(/[.,!?¿¡;:"“”。、？！،؟।]/g, '').replace(/\s+/g, ' ').trim();
const deacc = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').normalize('NFC');
function lev(a, b) { const m = a.length, n = b.length; const d = Array.from({ length: m + 1 }, (_, i) => [i]); for (let j = 1; j <= n; j++) d[0][j] = j; for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)); return d[m][n]; }
function seeded(str) { let h = 1779033703 ^ str.length; for (let i = 0; i < str.length; i++) { h = Math.imul(h ^ str.charCodeAt(i), 3432918353); h = h << 13 | h >>> 19; } return () => { h = Math.imul(h ^ h >>> 16, 2246822507); h = Math.imul(h ^ h >>> 13, 3266489909); return ((h ^= h >>> 16) >>> 0) / 4294967296; }; }

/* ---------------- storage ---------------- */
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } }
};
let users = store.get('tuon.users', {});
let session = store.get('tuon.session', null);
let prefs = store.get('tuon.prefs', { sound: true });
let draft = store.get('tuon.draft', {});
let welcome = false;
const me = () => (session && users[session]) || null;
const save = () => store.set('tuon.users', users);
const saveDraft = () => store.set('tuon.draft', draft);
async function hash(s) {
  try { const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode('tuon:' + s)); return [...new Uint8Array(b)].map(x => x.toString(16).padStart(2, '0')).join(''); }
  catch (e) { let h = 5381; for (const ch of 'tuon:' + s) h = ((h << 5) + h + ch.charCodeAt(0)) | 0; return 'x' + h; }
}

/* ---------------- icons & art ---------------- */
const ICON = {
  flame: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.6 1.8c.5 3.3 2.6 4.8 4.3 6.9a8 8 0 0 1 1.9 5.4A6.8 6.8 0 0 1 12 21a6.8 6.8 0 0 1-6.8-6.9c0-2.6 1.2-4.4 2.6-5.8.2 1.6.9 2.8 2 3.4-.6-3.6.5-7.4 2.8-9.9z"/><path d="M12 21a3.3 3.3 0 0 1-3.3-3.4c0-1.8 1.3-2.8 2.2-4 .2 1 .8 1.6 1.4 1.8.1-1 .6-2 1.3-2.6.5 1.2 1.7 2.4 1.7 4.6A3.3 3.3 0 0 1 12 21z" fill="#FFD36B"/></svg>',
  gem: '<svg viewBox="0 0 24 24"><path d="M6.5 3h11L22 9l-10 12L2 9z" fill="currentColor"/><path d="M2 9h20M8.5 3 12 21l3.5-18M7 9l5-6 5 6" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width="1.2"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-8.5-5.2-8.5-11.3A4.7 4.7 0 0 1 12 6.6a4.7 4.7 0 0 1 8.5 3.1C20.5 15.8 12 21 12 21z"/><ellipse cx="8" cy="9.3" rx="1.6" ry="1.1" fill="#fff" opacity=".55" transform="rotate(-35 8 9.3)"/></svg>',
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M3.5 10.5 12 3.5l8.5 7V20a1 1 0 0 1-1 1H15v-6.5H9V21H4.5a1 1 0 0 1-1-1z"/></svg>',
  target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2" fill="currentColor"/></svg>',
  trophy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"><path d="M7 3.5h10V9a5 5 0 0 1-10 0z"/><path d="M7 5.5H4v1.5a3.5 3.5 0 0 0 3.5 3.5M17 5.5h3v1.5a3.5 3.5 0 0 1-3.5 3.5M12 14v3.5M8 20.5h8M9.5 17.5h5v3h-5z"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 2.5 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.3l-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9z"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  lock: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 10V7.5a5 5 0 0 1 10 0V10h.5A1.5 1.5 0 0 1 19 11.5v8a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 19.5v-8A1.5 1.5 0 0 1 6.5 10zm2.5 0h5V7.5a2.5 2.5 0 0 0-5 0z"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 2.5 2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.3l-5.8 3.1 1.1-6.5-4.7-4.6 6.5-.9z"/></svg>',
  cup: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 3h12v5a6 6 0 0 1-12 0zM4 4.5h2v4A3.5 3.5 0 0 1 3 5v-.5zm16 0h-2v4A3.5 3.5 0 0 0 21 5v-.5zM10.5 14.5h3V18H16v3H8v-3h2.5z"/></svg>',
  book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M4 5a2 2 0 0 1 2-2h13v15H6a2 2 0 0 0-2 2zM4 20a2 2 0 0 0 2 2h13v-4"/></svg>',
  speaker: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 9h3.5L12 5v14l-4.5-4H4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M18 6a8.5 8.5 0 0 1 0 12" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  snail: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 6a6 6 0 0 1 6 6c0 1.2-.3 2.2-.9 3H21a1 1 0 0 1 0 2H4a2 2 0 0 1-2-2V9.5L1.3 7.2a.7.7 0 0 1 1.3-.5L3.6 9h.8l.6-2.3a.7.7 0 1 1 1.3.4L5.7 9.6A6 6 0 0 1 13 6zm0 2.5a3.5 3.5 0 0 0 0 7 2 2 0 0 0 0-4 .8.8 0 0 1 0 1.6.5.5 0 0 0 0 1 1.9 1.9 0 0 0 0-3.8 2.7 2.7 0 0 1 0 5.4"/></svg>',
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5 8 12l7 7"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  bolt: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 2 4 13.5h6.5L9.5 22 20 9.5h-6.5z"/></svg>',
  aim: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4"/></svg>'
};
const FLAGS = {
  es: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#C60B1E"/><rect y="5" width="30" height="10" fill="#FFC400"/></svg>',
  fr: '<svg viewBox="0 0 30 20"><rect width="10" height="20" fill="#0055A4"/><rect x="10" width="10" height="20" fill="#fff"/><rect x="20" width="10" height="20" fill="#EF4135"/></svg>',
  ja: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#fff"/><circle cx="15" cy="10" r="6" fill="#BC002D"/></svg>',
  ph: '<svg viewBox="0 0 30 20"><rect width="30" height="10" fill="#0038A8"/><rect y="10" width="30" height="10" fill="#CE1126"/><path d="M0 0l17 10L0 20z" fill="#fff"/><circle cx="5.6" cy="10" r="2.2" fill="#FCD116"/><circle cx="1.8" cy="3" r=".8" fill="#FCD116"/><circle cx="1.8" cy="17" r=".8" fill="#FCD116"/><circle cx="13" cy="10" r=".8" fill="#FCD116"/></svg>',
  ko: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#fff"/><g transform="translate(15 10) rotate(33.7)"><path d="M-5 0a5 5 0 0 1 10 0a2.5 2.5 0 0 1-5 0a2.5 2.5 0 0 0-5 0z" fill="#CD2E3A"/><path d="M-5 0a5 5 0 0 0 10 0a2.5 2.5 0 0 0-5 0a2.5 2.5 0 0 1-5 0z" fill="#0047A0"/></g><g fill="#000"><g transform="translate(6.2 4.1) rotate(-56.3)"><rect x="-2.3" y="-1.5" width="4.6" height=".7"/><rect x="-2.3" y="-.35" width="4.6" height=".7"/><rect x="-2.3" y=".8" width="4.6" height=".7"/></g><g transform="translate(23.8 15.9) rotate(-56.3)"><rect x="-2.3" y="-1.5" width="4.6" height=".7"/><rect x="-2.3" y="-.35" width="4.6" height=".7"/><rect x="-2.3" y=".8" width="4.6" height=".7"/></g><g transform="translate(23.8 4.1) rotate(56.3)"><rect x="-2.3" y="-1.5" width="4.6" height=".7"/><rect x="-2.3" y="-.35" width="4.6" height=".7"/><rect x="-2.3" y=".8" width="4.6" height=".7"/></g><g transform="translate(6.2 15.9) rotate(56.3)"><rect x="-2.3" y="-1.5" width="4.6" height=".7"/><rect x="-2.3" y="-.35" width="4.6" height=".7"/><rect x="-2.3" y=".8" width="4.6" height=".7"/></g></g></svg>',
  zh: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#EE1C25"/><g fill="#FFFF00"><polygon transform="translate(5 5) scale(3)" points="0,-1 .2245,-.309 .951,-.309 .363,.118 .588,.809 0,.382 -.588,.809 -.363,.118 -.951,-.309 -.2245,-.309"/><polygon transform="translate(10 2) scale(1) rotate(23)" points="0,-1 .2245,-.309 .951,-.309 .363,.118 .588,.809 0,.382 -.588,.809 -.363,.118 -.951,-.309 -.2245,-.309"/><polygon transform="translate(12 4) scale(1) rotate(46)" points="0,-1 .2245,-.309 .951,-.309 .363,.118 .588,.809 0,.382 -.588,.809 -.363,.118 -.951,-.309 -.2245,-.309"/><polygon transform="translate(12 7) scale(1) rotate(70)" points="0,-1 .2245,-.309 .951,-.309 .363,.118 .588,.809 0,.382 -.588,.809 -.363,.118 -.951,-.309 -.2245,-.309"/><polygon transform="translate(10 9) scale(1) rotate(21)" points="0,-1 .2245,-.309 .951,-.309 .363,.118 .588,.809 0,.382 -.588,.809 -.363,.118 -.951,-.309 -.2245,-.309"/></g></svg>',
  de: '<svg viewBox="0 0 30 20"><rect width="30" height="7" fill="#000"/><rect y="6.67" width="30" height="6.67" fill="#DD0000"/><rect y="13.33" width="30" height="6.67" fill="#FFCE00"/></svg>',
  it: '<svg viewBox="0 0 30 20"><rect width="10" height="20" fill="#009246"/><rect x="10" width="10" height="20" fill="#fff"/><rect x="20" width="10" height="20" fill="#CE2B37"/></svg>',
  br: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#009C3B"/><path d="M15 2.2 27.4 10 15 17.8 2.6 10z" fill="#FFDF00"/><circle cx="15" cy="10" r="4.6" fill="#002776"/><path d="M10.6 9.1q4.6-1.4 8.8 1.4" stroke="#fff" stroke-width=".7" fill="none"/></svg>',
  nl: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#21468B"/><rect width="30" height="13.33" fill="#fff"/><rect width="30" height="6.67" fill="#AE1C28"/></svg>',
  ru: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#D52B1E"/><rect width="30" height="13.33" fill="#0039A6"/><rect width="30" height="6.67" fill="#fff"/></svg>',
  ua: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#FFD500"/><rect width="30" height="10" fill="#005BBB"/></svg>',
  eg: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#000"/><rect width="30" height="13.33" fill="#fff"/><rect width="30" height="6.67" fill="#CE1126"/><path d="M15 7.6l1.6 1.2-.4 2.6h-2.4l-.4-2.6z" fill="#C09300"/></svg>',
  il: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#fff"/><rect y="2" width="30" height="2.6" fill="#0038B8"/><rect y="15.4" width="30" height="2.6" fill="#0038B8"/><g fill="none" stroke="#0038B8" stroke-width=".9"><path d="M15 6.2l3.3 5.7h-6.6z"/><path d="M15 13.8l-3.3-5.7h6.6z"/></g></svg>',
  in: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#138808"/><rect width="30" height="13.33" fill="#fff"/><rect width="30" height="6.67" fill="#FF9933"/><circle cx="15" cy="10" r="2.6" fill="none" stroke="#000080" stroke-width=".6"/><circle cx="15" cy="10" r=".5" fill="#000080"/></svg>',
  th: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#A51931"/><rect y="3.33" width="30" height="13.33" fill="#F4F5F8"/><rect y="6.67" width="30" height="6.67" fill="#2D2A4A"/></svg>',
  ke: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#006600"/><rect width="30" height="13.6" fill="#fff"/><rect width="30" height="6" fill="#000"/><rect y="7.2" width="30" height="5.6" fill="#BB0000"/><ellipse cx="15" cy="10" rx="2.6" ry="5" fill="#BB0000" stroke="#000" stroke-width=".5"/><path d="M15 5v10" stroke="#fff" stroke-width=".5"/></svg>',
  dk: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#C8102E"/><rect x="9" width="3" height="20" fill="#fff"/><rect y="8.5" width="30" height="3" fill="#fff"/></svg>',
  no: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#BA0C2F"/><rect x="8" width="5" height="20" fill="#fff"/><rect y="7.5" width="30" height="5" fill="#fff"/><rect x="9.25" width="2.5" height="20" fill="#00205B"/><rect y="8.75" width="30" height="2.5" fill="#00205B"/></svg>',
  fi: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#fff"/><rect x="8" width="5" height="20" fill="#003580"/><rect y="7.5" width="30" height="5" fill="#003580"/></svg>',
  cz: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#D7141A"/><rect width="30" height="10" fill="#fff"/><path d="M0 0l15 10L0 20z" fill="#11457E"/></svg>',
  sk: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#EE1C25"/><rect width="30" height="13.33" fill="#0B4EA2"/><rect width="30" height="6.67" fill="#fff"/><path d="M6.5 5h7v6.5c0 2.6-3.5 4-3.5 4s-3.5-1.4-3.5-4z" fill="#EE1C25" stroke="#fff" stroke-width=".6"/><path d="M10 6.5v7M8.4 8.6h3.2M8.8 10.4h2.4" stroke="#fff" stroke-width=".8"/><path d="M7.2 13.2q2.8-1.6 5.6 0" fill="#0B4EA2"/></svg>',
  hu: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#477050"/><rect width="30" height="13.33" fill="#fff"/><rect width="30" height="6.67" fill="#CE2939"/></svg>',
  hr: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#171796"/><rect width="30" height="13.33" fill="#fff"/><rect width="30" height="6.67" fill="#FF0000"/><path d="M12.5 5.5h5v5.2c0 1.8-2.5 2.8-2.5 2.8s-2.5-1-2.5-2.8z" fill="#fff" stroke="#FF0000" stroke-width=".3"/><path d="M12.5 5.5h1.25v1.25h-1.25zM15 5.5h1.25v1.25H15zM13.75 6.75H15V8h-1.25zM16.25 6.75h1.25V8h-1.25zM12.5 8h1.25v1.25h-1.25zM15 8h1.25v1.25H15zM13.75 9.25H15v1.25h-1.25zM16.25 9.25h1.25v1.25h-1.25z" fill="#FF0000"/></svg>',
  rs: '<svg viewBox="0 0 30 20"><rect width="30" height="20" fill="#fff"/><rect width="30" height="13.33" fill="#0C4076"/><rect width="30" height="6.67" fill="#C6363C"/><path d="M8 5.5h4.5v4.5c0 1.6-2.25 2.6-2.25 2.6S8 11.6 8 10z" fill="#C6363C" stroke="#EDB92E" stroke-width=".5"/><path d="M10.25 6.5v4.6M8.9 8.4h2.7" stroke="#fff" stroke-width=".7"/></svg>'
};
const flag = (cid, lg) => C[cid].kind ? `<span class="flag ic ${lg ? 'lg' : ''} ${C[cid].iconText ? 'txt' : ''}" style="background:${C[cid].iconBg};${C[cid].iconFg ? `color:${C[cid].iconFg}` : ''}">${esc(C[cid].icon)}</span>` : `<span class="flag ${lg ? 'lg' : ''}">${FLAGS[C[cid].flag]}</span>`;
// Mata the tarsier — layered SVG so each part can move (see .mascot rules in styles.css + mataLife below)
function mascot(mood = 'happy') {
  const S = 'stroke-linecap="round" fill="none"';
  const mouth = {
    happy: `<path d="M52 82q8 7 16 0" stroke="#5A3520" stroke-width="3" ${S}/>`,
    wave: `<path d="M52 82q8 7 16 0" stroke="#5A3520" stroke-width="3" ${S}/>`,
    cheer: '<path d="M50 80q10 13 20 0z" fill="#5A3520"/><path d="M54.5 85.5q5.5 3.5 11 0" fill="#F08E7A"/>',
    wow: '<ellipse cx="60" cy="84" rx="4.5" ry="5.5" fill="#5A3520"/>',
    sad: `<path d="M52 87q8-6 16 0" stroke="#5A3520" stroke-width="3" ${S}/>`
  }[mood] || '';
  const brow = mood === 'sad' ? `<path d="M29 37l14 4M91 37l-14 4" stroke="#7A4B2A" stroke-width="3" ${S}/>` : '';
  const pads = (x, y) => `<circle cx="${x - 4}" cy="${y - 3}" r="2.2" fill="#F3C9A6"/><circle cx="${x}" cy="${y - 5}" r="2.2" fill="#F3C9A6"/><circle cx="${x + 4}" cy="${y - 3}" r="2.2" fill="#F3C9A6"/>`;
  const up = side => side === 'r'
    ? `<g class="m-arm-r"><path d="M86 102q16-6 18-26" stroke="#A86F43" stroke-width="9" ${S}/><circle cx="104" cy="75" r="5.5" fill="#E9B28C"/>${pads(104, 72)}</g>`
    : `<g class="m-arm-l"><path d="M34 102q-16-6-18-26" stroke="#A86F43" stroke-width="9" ${S}/><circle cx="16" cy="75" r="5.5" fill="#E9B28C"/>${pads(16, 72)}</g>`;
  const down = side => side === 'r'
    ? `<g class="m-arm-r"><path d="M86 103q10 4 10 13" stroke="#A86F43" stroke-width="9" ${S}/><circle cx="96" cy="117" r="4.5" fill="#E9B28C"/></g>`
    : `<g class="m-arm-l"><path d="M34 103q-10 4-10 13" stroke="#A86F43" stroke-width="9" ${S}/><circle cx="24" cy="117" r="4.5" fill="#E9B28C"/></g>`;
  const armR = ['wave', 'wow', 'cheer'].includes(mood) ? up('r') : down('r');
  const armL = mood === 'cheer' ? up('l') : down('l');
  const eye = (cx, side) => `<g class="m-eye m-eye-${side}"><circle cx="${cx}" cy="54" r="16.5" fill="#3A2414"/><circle cx="${cx}" cy="54" r="13.2" fill="#F2A33A"/>
    <circle cx="${cx}" cy="54" r="10.5" fill="none" stroke="#DB8420" stroke-width="1.4" opacity=".7"/>
    <g class="m-look"><circle cx="${cx}" cy="55" r="7.5" fill="#1D120A"/><circle cx="${cx - 4}" cy="50.5" r="3.4" fill="#fff"/><circle cx="${cx + 3.5}" cy="58.5" r="1.5" fill="#fff" opacity=".8"/></g>
    <g class="m-lid"><circle cx="${cx}" cy="54" r="17.4" fill="#C48A5A"/><path d="M${cx - 12} 60q12 6 24 0" stroke="#7A4B2A" stroke-width="2.6" fill="none" stroke-linecap="round"/></g></g>`;
  return `<svg class="mascot m-${mood}" viewBox="0 0 120 130" aria-hidden="true">
  <ellipse class="m-shadow" cx="60" cy="126" rx="30" ry="4" fill="#000" opacity=".08"/>
  <g class="m-all">
   <g class="m-tail"><path d="M84 117q26 3 27-17q1-14-6-24" stroke="#8C5A35" stroke-width="3.5" ${S}/><path d="M105 76q-3-9 3-15q4 7 1 15z" fill="#8C5A35"/></g>
   <g class="m-body">
    <ellipse cx="60" cy="106" rx="28" ry="20" fill="#A86F43"/><ellipse cx="60" cy="110" rx="16" ry="12" fill="#D9A47A"/>
    <ellipse cx="44" cy="124" rx="9" ry="4" fill="#A86F43"/><ellipse cx="76" cy="124" rx="9" ry="4" fill="#A86F43"/>
    <circle cx="37" cy="124" r="2" fill="#F3C9A6"/><circle cx="83" cy="124" r="2" fill="#F3C9A6"/>
    ${armL}${armR}
   </g>
   <g class="m-head">
    <g class="m-ear-l"><ellipse cx="20" cy="34" rx="16" ry="20" fill="#B57A4C" transform="rotate(-20 20 34)"/><ellipse cx="20" cy="35" rx="9" ry="13" fill="#EBA98A" transform="rotate(-20 20 35)"/></g>
    <g class="m-ear-r"><ellipse cx="100" cy="34" rx="16" ry="20" fill="#B57A4C" transform="rotate(20 100 34)"/><ellipse cx="100" cy="35" rx="9" ry="13" fill="#EBA98A" transform="rotate(20 100 35)"/></g>
    <circle cx="60" cy="58" r="38" fill="#C48A5A"/>
    <path d="M52 21q4-7 8-1q4-6 8 1" fill="#C48A5A"/>
    <ellipse cx="60" cy="76" rx="24" ry="17" fill="#E9C39D"/>
    ${eye(42, 'l')}${eye(78, 'r')}
    ${brow}<path d="M57 72h6l-3 3z" fill="#5A3520"/>${mouth}
    <ellipse class="m-cheek" cx="32" cy="74" rx="5" ry="3" fill="#F08E7A" opacity=".45"/><ellipse class="m-cheek" cx="88" cy="74" rx="5" ry="3" fill="#F08E7A" opacity=".45"/>
   </g>
  </g>
</svg>`;
}
const LOGO = `<svg viewBox="0 0 40 40"><rect width="40" height="40" rx="12" fill="#0E8C8F"/><circle cx="14" cy="19" r="7.5" fill="#F2A33A"/><circle cx="26" cy="19" r="7.5" fill="#F2A33A"/><circle cx="14" cy="20" r="3.6" fill="#1D120A"/><circle cx="26" cy="20" r="3.6" fill="#1D120A"/><circle cx="12.5" cy="17.5" r="1.4" fill="#fff"/><circle cx="24.5" cy="17.5" r="1.4" fill="#fff"/><path d="M15 30q5 4 10 0" stroke="#fff" stroke-width="2.4" fill="none" stroke-linecap="round"/></svg><span>tuon</span>`;

/* ---------------- sound & speech ---------------- */
let actx;
function tone(seq) {
  if (!prefs.sound) return;
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    let t = actx.currentTime;
    for (const [f, d, type = 'sine', g = 0.12] of seq) {
      const o = actx.createOscillator(), gn = actx.createGain();
      o.type = type; o.frequency.value = f; gn.gain.setValueAtTime(g, t); gn.gain.exponentialRampToValueAtTime(0.001, t + d);
      o.connect(gn).connect(actx.destination); o.start(t); o.stop(t + d); t += d * 0.75;
    }
  } catch (e) { }
}
const sfx = {
  ok: () => tone([[660, .12, 'triangle'], [990, .22, 'triangle']]),
  bad: () => tone([[220, .18, 'square', .06], [180, .25, 'square', .05]]),
  tap: () => tone([[520, .05, 'sine', .05]]),
  win: () => tone([[523, .14, 'triangle'], [659, .14, 'triangle'], [784, .14, 'triangle'], [1047, .4, 'triangle']])
};
let voices = [];
function loadVoices() { try { voices = speechSynthesis.getVoices(); } catch (e) { } }
if ('speechSynthesis' in window) { loadVoices(); speechSynthesis.onvoiceschanged = () => { loadVoices(); }; }
function voiceFor(cid) { for (const p of C[cid].voice) { const v = voices.find(v => v.lang.toLowerCase().replace('_', '-').startsWith(p)); if (v) return v; } return null; }
const canSpeak = cid => !!voiceFor(cid);
function speak(text, cid, slow) {
  const v = voiceFor(cid);
  if (!v) return;
  try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(text); u.voice = v; u.lang = v.lang; u.rate = slow ? 0.55 : 0.9; speechSynthesis.speak(u); mataAll('twitch', 520); } catch (e) { }
}
const sayBtn = (text, cid) => canSpeak(cid) ? `<button class="say" data-say="${esc(text)}" data-cid="${cid}" aria-label="Play audio">${ICON.speaker}</button>` : '';
document.addEventListener('click', e => {
  const s = e.target.closest('[data-say]');
  if (s) speak(s.dataset.say, s.dataset.cid, s.dataset.slow === '1');
});

/* ---------------- UI helpers ---------------- */
function toast(msg) { document.querySelectorAll('.toast').forEach(t => t.remove()); const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; document.body.appendChild(t); setTimeout(() => t.remove(), 2400); }
function modal(html, wide) {
  closeModal();
  const m = document.createElement('div'); m.className = 'modal-bg';
  m.innerHTML = `<div class="modal ${wide ? 'wide' : ''}" role="dialog">${html}</div>`;
  m.addEventListener('click', e => { if (e.target === m) closeModal(); });
  document.body.appendChild(m);
}
function closeModal() { document.querySelectorAll('.modal-bg').forEach(m => m.remove()); }
const go = h => { if (location.hash === h) render(); else location.hash = h; };

/* ---------------- user model ---------------- */
function newUser({ name, age, email, passHash }) {
  const level = LEVELS[draft.level ?? 0][3];
  return {
    name, age, email, passHash, joined: today(), course: draft.course || 'es', courses: [draft.course || 'es'],
    reason: draft.reason ?? null, goal: draft.goal ?? 1,
    progress: { [draft.course || 'es']: level }, xp: 0, gems: 50, hearts: MAX_HEARTS, heartsAt: Date.now(),
    streak: 0, longest: 0, lastActive: null, activeDays: [], freezes: 0,
    daily: {}, weekly: {}, lessons: 0, perfect: 0, mistakes: [], claimed: {}, words: 0
  };
}
function syncHearts(u) {
  if (u.hearts >= MAX_HEARTS) { u.heartsAt = Date.now(); return; }
  const n = Math.floor((Date.now() - u.heartsAt) / HEART_MS);
  if (n > 0) { u.hearts = Math.min(MAX_HEARTS, u.hearts + n); u.heartsAt += n * HEART_MS; }
}
function refreshStreak(u) {
  if (!u.lastActive) return;
  const gap = daysBetween(u.lastActive, today());
  if (gap <= 1) return;
  const missed = gap - 1;
  if (u.streak > 0 && u.freezes >= missed) { u.freezes -= missed; u.lastActive = yesterday(); toast(`A streak freeze saved your ${u.streak}-day streak! 🧊`); }
  else u.streak = 0;
}
function bumpStreak(u) {
  const t = today();
  if (u.lastActive === t) return false;
  u.streak = u.lastActive === yesterday() ? u.streak + 1 : 1;
  u.lastActive = t; u.longest = Math.max(u.longest || 0, u.streak);
  if (!u.activeDays.includes(t)) u.activeDays.push(t);
  u.activeDays = u.activeDays.slice(-60);
  return true;
}
const dayStat = u => (u.daily[today()] ||= { xp: 0, lessons: 0, combo: 0 });
const goalXp = u => GOALS[u.goal].xp;
function quests(u) {
  const d = u.daily[today()] || { xp: 0, lessons: 0, combo: 0 };
  return [
    { id: 'goal', icon: '⚡', title: `Earn ${goalXp(u)} XP`, have: d.xp, need: goalXp(u), gems: 10 },
    { id: 'lessons', icon: '📘', title: 'Complete 2 lessons', have: d.lessons, need: 2, gems: 10 },
    { id: 'combo', icon: '🎯', title: 'Get 8 in a row', have: d.combo, need: 8, gems: 15 }
  ];
}
function claimQuests(u) {
  let got = 0;
  for (const q of quests(u)) { const k = today() + ':' + q.id; if (q.have >= q.need && !u.claimed[k]) { u.claimed[k] = 1; u.gems += q.gems; got += q.gems; } }
  for (const k of Object.keys(u.claimed)) if (!k.startsWith(today())) delete u.claimed[k];
  return got;
}

/* ---------------- course access ---------------- */
function unit(cid, ui) {
  const U = C[cid].units[ui];
  return {
    ...U,
    W: U.words.map((w, i) => ({ t: w[0], e: w[1], i: w[2], r: w[3] || '', ref: `${cid}|w|${ui}|${i}` })),
    S: U.sentences.map((s, i) => { const tok = s.tok || tokens(s.t); const rt = s.r ? s.r.split(' ') : []; return { t: s.t, e: s.e, r: s.r || '', tok, rtok: rt.length === tok.length ? rt : [], ref: `${cid}|s|${ui}|${i}` }; })
  };
}
function itemByRef(ref) { const [cid, k, ui, i] = ref.split('|'); const U = unit(cid, +ui); return { cid, ui: +ui, kind: k, item: k === 'w' ? U.W[+i] : U.S[+i], U }; }
const totalLessons = cid => C[cid].units.length * LPU;
const lessonTitle = (li, cid, ui) => cid && C[cid].kind ? (li < 4 ? C[cid].units[ui].topics[li].card.t : 'Unit review') : ['New words', 'More words', 'First phrases', 'More phrases', 'Unit review'][li];
const stripArticle = t => t.replace(/^(el|la|los|las|un|una|le|les|une|der|die|das|il|lo|gli|i|o|a|os|as|az|de|het)\s+/i, '').replace(/^l'/i, '');
const wordLabel = (w, cid) => `<bdi>${esc(w.t)}</bdi>${C[cid].romaji && w.r ? `<span class="rom">${esc(w.r)}</span>` : ''}`;

/* ---------------- exercise builders ---------------- */
const others = (all, x, n) => sample(all.filter(o => o.e !== x.e && o.t !== x.t), n);
function exPick(cid, w, W, isNew) { const opts = shuffle([w, ...others(W, w, 3)]); return { type: 'pick', cid, ref: w.ref, isNew, prompt: `Which one is “${w.e}”?`, opts, answer: opts.indexOf(w), solution: w.t }; }
function exMeaning(cid, w, W) { const opts = shuffle([w, ...others(W, w, 3)]); return { type: 'meaning', cid, ref: w.ref, w, prompt: 'What does this mean?', opts: opts.map(o => o.e), answer: opts.indexOf(w), solution: w.e }; }
function exListenPick(cid, w, W) { const opts = shuffle([w, ...others(W, w, 3)]); return { type: 'listenPick', cid, ref: w.ref, w, prompt: 'Tap what you hear', opts, answer: opts.indexOf(w), solution: w.t }; }
function exType(cid, w) {
  const acc = [w.t, ['es','fr','de','it','pt','nl','hu'].includes(cid) ? stripArticle(w.t) : w.t, w.r, w.r && w.r.replace(/\s/g, '')].filter(Boolean);
  return { type: 'type', cid, ref: w.ref, w, prompt: `Write “${w.e}” in ${C[cid].name}`, accepts: [...new Set(acc)], solution: w.t };
}
function exMatch(cid, ws) { return { type: 'match', cid, prompt: 'Tap the matching pairs', left: shuffle(ws), right: shuffle(ws) }; }
function exTiles(cid, s, S, dir, listen) {
  const toEn = dir === 'en';
  const answer = toEn ? tokens(s.e) : s.tok;
  const pool = toEn ? S.flatMap(o => tokens(o.e)) : S.flatMap(o => o.tok.map((t, i) => ({ t, r: o.rtok[i] || '' })));
  const have = new Set(answer.map(a => norm(a)));
  const distract = [];
  for (const p of shuffle(pool)) { const t = toEn ? p : p.t; if (!have.has(norm(t)) && !distract.some(d => norm(d.t) === norm(t))) distract.push(toEn ? { t } : p); if (distract.length >= Math.max(3, 7 - answer.length)) break; }
  const bank = shuffle([...answer.map((t, i) => ({ t, r: toEn ? '' : (s.rtok[i] || '') })), ...distract]);
  return { type: listen ? 'listenTiles' : 'tiles', cid, ref: s.ref, s, dir, prompt: listen ? 'Tap what you hear' : (toEn ? 'Translate this sentence' : `Write this in ${C[cid].name}`), bank, answer, solution: toEn ? s.e : s.t };
}
function exChoose(cid, s, S) { const opts = shuffle([s, ...others(S, s, 2)]); return { type: 'choose', cid, ref: s.ref, s, prompt: `How do you say “${s.e}”?`, opts, answer: opts.indexOf(s), solution: s.t }; }


/* ---------------- game & sport courses ---------------- */
const PIECE = { k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟' };
function parseFen(fen) { const b = {}; fen.split('/').forEach((row, ri) => { let f = 0; for (const ch of row) { if (/\d/.test(ch)) f += +ch; else { b['abcdefgh'[f] + (8 - ri)] = ch; f++; } } }); return b; }
function pieceMoves(fen, from) {
  const b = parseFen(fen), p = b[from]; if (!p) return [];
  const white = p === p.toUpperCase(), t = p.toLowerCase(), fx = 'abcdefgh'.indexOf(from[0]), fy = +from[1], out = [];
  const name = (x, y) => 'abcdefgh'[x] + y, at = (x, y) => b[name(x, y)], inb = (x, y) => x >= 0 && x < 8 && y >= 1 && y <= 8;
  const enemy = q => q && (q === q.toUpperCase()) !== white;
  const slide = dirs => dirs.forEach(([dx, dy]) => { let x = fx + dx, y = fy + dy; while (inb(x, y)) { const q = at(x, y); if (q) { if (enemy(q)) out.push(name(x, y)); break; } out.push(name(x, y)); x += dx; y += dy; } });
  const step = dirs => dirs.forEach(([dx, dy]) => { const x = fx + dx, y = fy + dy; if (inb(x, y) && (!at(x, y) || enemy(at(x, y)))) out.push(name(x, y)); });
  const R = [[1, 0], [-1, 0], [0, 1], [0, -1]], B = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
  if (t === 'r') slide(R); else if (t === 'b') slide(B); else if (t === 'q') slide(R.concat(B)); else if (t === 'k') step(R.concat(B));
  else if (t === 'n') step([[1, 2], [2, 1], [-1, 2], [-2, 1], [1, -2], [2, -1], [-1, -2], [-2, -1]]);
  else if (t === 'p') {
    const d = white ? 1 : -1, start = white ? 2 : 7;
    if (inb(fx, fy + d) && !at(fx, fy + d)) { out.push(name(fx, fy + d)); if (fy === start && !at(fx, fy + 2 * d)) out.push(name(fx, fy + 2 * d)); }
    [-1, 1].forEach(dx => { if (inb(fx + dx, fy + d) && enemy(at(fx + dx, fy + d))) out.push(name(fx + dx, fy + d)); });
  }
  return out;
}
function boardHtml(fen, o = {}) {
  const b = parseFen(fen || '8/8/8/8/8/8/8/8'), tag = o.click ? 'button' : 'div';
  let h = `<div class="board ${o.small ? 'small' : ''} ${o.click ? 'click' : ''}">`;
  for (let r = 8; r >= 1; r--) for (let f = 0; f < 8; f++) {
    const sq = 'abcdefgh'[f] + r, p = b[sq], cls = ['sq', (f + r) % 2 === 1 ? 'd' : 'l'];
    if (o.hl && o.hl.includes(sq)) cls.push('hl'); if (o.from === sq) cls.push('from'); if (o.sel === sq) cls.push('sel');
    if (o.good && o.good.includes(sq)) cls.push('good'); if (o.bad === sq) cls.push('bad');
    h += `<${tag} class="${cls.join(' ')}" ${o.click ? `onclick="LQ('${sq}')" aria-label="${sq}"` : ''}>${p ? `<span class="pc ${p === p.toUpperCase() ? 'w' : 'b'}">${PIECE[p.toLowerCase()]}\uFE0E</span>` : ''}${f === 0 ? `<i class="rk">${r}</i>` : ''}${r === 1 ? `<i class="fl">${'abcdefgh'[f]}</i>` : ''}</${tag}>`;
  }
  return h + '</div>';
}
function picHtml(cid, k, credit) {
  const p = C[cid].pics[k];
  return `<figure class="pic"><img src="${p.img}" alt="${esc(p.n)}" loading="lazy">${credit ? `<figcaption>Photo: ${esc(p.author)} · ${esc(p.license)} · <a href="${esc(p.source)}" target="_blank" rel="noopener">source</a></figcaption>` : ''}</figure>`;
}
const codeBlock = c => `<pre class="code"><code>${esc(c)}</code></pre>`;
const skillRef = (cid, ui, t, qi) => `${cid}|q|${ui}|${t}|${qi}`;
function skillQ(cid, ui, t, qi) {
  const q = C[cid].units[ui].topics[t].qs[qi], ref = skillRef(cid, ui, t, qi);
  if (q.from || q.sq) { const targets = q.sq || pieceMoves(q.fen, q.from); return { type: 'squares', cid, ref, prompt: q.q, fen: q.fen, from: q.from || null, targets, why: q.why, solution: targets.length <= 4 ? targets.join(', ') : 'Any of the highlighted squares' }; }
  if (q.pics) { const opts = shuffle(q.pics); return { type: 'mc', pics: true, cid, ref, prompt: q.q, opts, answer: opts.indexOf(q.pics[q.a]), solution: C[cid].pics[q.pics[q.a]].n, why: q.why }; }
  const opts = q.keep ? q.o.slice() : shuffle(q.o);
  return { type: 'mc', img: q.img, cid, ref, prompt: q.q, fen: q.fen, em: q.em, code: q.code, mono: q.mono, opts, answer: opts.indexOf(q.o[q.a]), solution: q.o[q.a], why: q.why };
}
function buildSkill(cid, ui, li) {
  const U = C[cid].units[ui];
  if (li < 4) {
    const T = U.topics[li], ex = [{ type: 'card', cid, ...T.card }];
    ex.push(...shuffle(T.qs.map((_, qi) => skillQ(cid, ui, li, qi))));
    const earlier = []; for (let t = 0; t < li; t++) U.topics[t].qs.forEach((_, qi) => earlier.push([t, qi]));
    sample(earlier, 2).forEach(([t, qi]) => ex.push(skillQ(cid, ui, t, qi)));
    return ex;
  }
  const all = []; U.topics.forEach((T, t) => T.qs.forEach((_, qi) => all.push([t, qi])));
  return sample(all, 10).map(([t, qi]) => skillQ(cid, ui, t, qi));
}
function skillPractice(u, cid, unitsOpen) {
  const all = []; for (let ui = 0; ui < unitsOpen; ui++) C[cid].units[ui].topics.forEach((T, t) => T.qs.forEach((_, qi) => all.push([ui, t, qi])));
  const miss = all.filter(a => u.mistakes.includes(skillRef(cid, ...a))).slice(0, 5);
  return shuffle(miss.concat(sample(all.filter(a => !miss.includes(a)), 9 - miss.length))).map(([ui, t, qi]) => skillQ(cid, ui, t, qi));
}
function skillGuide(ui) {
  const cid = me().course, U = C[cid].units[ui];
  modal(`<h2>Unit ${ui + 1} guidebook · ${esc(U.title)}</h2><p class="muted" style="margin-bottom:16px">The key ideas in this unit.</p>
    ${U.topics.map(T => `<div class="gcard"><h3>${esc(T.card.t)}</h3>${T.card.img ? picHtml(cid, T.card.img, true) : ''}<p>${esc(T.card.x)}</p>${T.card.code ? codeBlock(T.card.code) : ''}${T.card.fen ? boardHtml(T.card.fen, { hl: T.card.hl, small: 1 }) : ''}${T.card.em ? `<div class="hint-em" style="font-size:34px;margin:8px 0 0">${T.card.em}</div>` : ''}</div>`).join('')}
    ${C[cid].pics ? `<details class="credits"><summary>All photo credits</summary><ul>${Object.values(C[cid].pics).map(p => `<li><b>${esc(p.n)}</b> — ${esc(p.author)} · ${esc(p.license)} · <a href="${esc(p.source)}" target="_blank" rel="noopener">source</a></li>`).join('')}</ul></details>` : ''}
    <div class="acts"><button class="btn primary" onclick="closeModal()">Got it</button></div>`, true);
}
function buildLesson(cid, ui, li) {
  if (C[cid].kind) return buildSkill(cid, ui, li);
  const { W, S } = unit(cid, ui), tts = canSpeak(cid);
  let ex = [];
  if (li < 2) {
    const ws = W.slice(li * 4, li * 4 + 4);
    const pool = li ? W : W.slice(0, 4).concat(W.slice(4, 6));
    ws.forEach(w => ex.push(exPick(cid, w, pool, true)));
    const rest = [exMatch(cid, ws), ...ws.slice(0, 2).map(w => exMeaning(cid, w, W)),
      ...ws.slice(2).map(w => tts ? exListenPick(cid, w, W) : exMeaning(cid, w, W)), ...sample(ws, 2).map(w => exType(cid, w))];
    ex = ex.concat(shuffle(rest));
  } else if (li < 4) {
    const ss = S.slice((li - 2) * 3, (li - 2) * 3 + 3);
    ex.push(...ss.map(s => exTiles(cid, s, S, 'en')));
    ex.push(...shuffle([...ss.slice(0, 2).map(s => exTiles(cid, s, S, 'tgt')), exChoose(cid, ss[2], S),
      tts ? exTiles(cid, pick(ss), S, 'tgt', true) : exChoose(cid, ss[0], S), exMatch(cid, sample(W, 5)), exType(cid, pick(W)), exMeaning(cid, pick(W), W)]));
  } else ex = mixed(cid, sample(W, 5).map(w => ({ kind: 'w', item: w, W, S })).concat(sample(S, 5).map(s => ({ kind: 's', item: s, W, S }))), true);
  return ex;
}
function mixed(cid, items, withMatch) {
  const tts = canSpeak(cid);
  const ex = items.map(({ kind, item, W, S }) => {
    if (kind === 'w') { const f = pick(['pick', 'meaning', 'type', tts ? 'listen' : 'meaning']); return f === 'pick' ? exPick(cid, item, W) : f === 'type' ? exType(cid, item) : f === 'listen' ? exListenPick(cid, item, W) : exMeaning(cid, item, W); }
    const f = pick(['en', 'tgt', 'choose', tts ? 'listen' : 'en']); return f === 'choose' ? exChoose(cid, item, S) : exTiles(cid, item, S, f === 'listen' ? 'tgt' : f, f === 'listen');
  });
  if (withMatch) ex.splice(4, 0, exMatch(cid, sample(items.filter(i => i.kind === 'w').map(i => i.item), 4)));
  return shuffle(ex);
}
function buildPractice(u) {
  const cid = u.course, front = u.progress[cid] || 0;
  const unitsOpen = Math.min(C[cid].units.length, Math.ceil(front / LPU) || 0);
  if (!unitsOpen) return null;
  if (C[cid].kind) return skillPractice(u, cid, unitsOpen);
  const all = [];
  for (let ui = 0; ui < unitsOpen; ui++) { const U = unit(cid, ui); U.W.forEach(w => all.push({ kind: 'w', item: w, W: U.W, S: U.S })); U.S.forEach(s => all.push({ kind: 's', item: s, W: U.W, S: U.S })); }
  const miss = u.mistakes.filter(r => r.startsWith(cid + '|')).map(r => all.find(a => a.item.ref === r)).filter(Boolean).slice(0, 5);
  const rest = sample(all.filter(a => !miss.includes(a)), 9 - miss.length);
  return mixed(cid, miss.concat(rest), false);
}

/* ---------------- router ---------------- */
window.addEventListener('hashchange', render);
function render() {
  closeModal();
  const h = location.hash.replace(/^#\/?/, '') || '';
  const [page, arg] = h.split('/');
  const u = me();
  if (u) { syncHearts(u); refreshStreak(u); save(); }
  window.scrollTo(0, 0);
  if (!u) {
    if (page === 'start') return renderOnboard(+arg || 1);
    if (page === 'signup') return renderSignup();
    if (page === 'login') return renderLogin();
    return renderLanding();
  }
  if (page === 'lesson') return L ? renderLesson() : go('#/learn');
  if (page === 'done') return R ? renderResult() : go('#/learn');
  if (page === 'practice') return renderPractice();
  if (page === 'league') return renderLeague();
  if (page === 'profile') return renderProfile();
  return renderLearn();
}

/* ---------------- landing & onboarding ---------------- */
function renderLanding() {
  app.innerHTML = `<div class="landing">
  <header class="topnav"><div class="logo">${LOGO}</div><a class="btn ghost" style="min-height:42px" href="#/login">Log in</a></header>
  <section class="hero">
    <div class="hero-art"><div class="blob"></div>${mascot('wave')}
      <span class="bubble-word" style="top:8%;left:6%">¡Hola!</span><span class="bubble-word" style="top:18%;right:2%">こんにちは</span>
      <span class="bubble-word" style="bottom:16%;left:0">Bonjour</span><span class="bubble-word" style="bottom:6%;right:8%">Maayong buntag</span></div>
    <div>
      <h1>Learn a language in <em>five-minute</em> bites.</h1>
      <p>Meet Mata, the wide-eyed tarsier who keeps you on track. Short lessons, daily streaks and friendly competition — free, and it all runs right in your browser.</p>
      <div class="ctas">
        <a class="btn primary" href="#/start/1">Get started</a>
        <a class="btn ghost" href="#/login">I already have an account</a>
      </div>
    </div>
  </section>
  <footer class="course-strip"><p>${COURSE_IDS.length} courses: languages, coding, games &amp; sports</p><div>${COURSE_IDS.map(c => `<span title="${esc(C[c].name)}" aria-label="${esc(C[c].name)}">${flag(c)}</span>`).join('')}</div></footer>
  </div>`;
}
function obFrame(step, total, question, body, canGo, onNext, mood) {
  app.innerHTML = `<div class="ob">
    <div class="ob-top"><button class="icon-btn" onclick="history.length>1?history.back():go('#/')" aria-label="Back">${ICON.back}</button>
      <div class="bar"><i style="width:${(step / total) * 100}%"></i></div></div>
    <div class="ask">${mascot(mood || 'happy')}<div class="speech">${question}</div></div>
    ${body}
    <div class="ob-foot"><button class="btn primary" id="next" ${canGo ? '' : 'disabled'}>Continue</button></div>
  </div>`;
  $('#next').onclick = onNext;
}
function renderOnboard(step) {
  const T = 4, L = draft.course ? C[draft.course].name : 'it';
  const set = (k, v) => { draft[k] = v; saveDraft(); sfx.tap(); renderOnboard(step); const m = $('.ask .mascot'); if (m && !mataReduce) mataCls(m, 'poke', 600); };
  window.obSet = set;
  if (step === 1) obFrame(1, T, 'What would you like to learn?',
    [['Languages', COURSE_IDS.filter(c => !C[c].kind)], ['School subjects', COURSE_IDS.filter(c => C[c].group === 'school')], ['Programming', COURSE_IDS.filter(c => C[c].group === 'code')], ['Trivia', COURSE_IDS.filter(c => C[c].group === 'trivia')], ['Games & sports', COURSE_IDS.filter(c => C[c].kind && !C[c].group)]].map(([h, ids]) => `<h3 class="ob-sec">${h}</h3><div class="choices grid">${ids.map(c => `<button class="choice course ${draft.course === c ? 'on' : ''}" onclick="obSet('course','${c}')">${flag(c, 1)}${C[c].name}</button>`).join('')}</div>`).join(''),
    !!draft.course, () => go('#/start/2'), 'wave');
  else if (step === 2) obFrame(2, T, `Why are you learning ${L}?`,
    `<div class="choices grid">${REASONS.map((r, i) => `<button class="choice ${draft.reason === i ? 'on' : ''}" onclick="obSet('reason',${i})"><span class="em">${r[0]}</span>${r[1]}</button>`).join('')}</div>`,
    draft.reason != null, () => go('#/start/3'));
  else if (step === 3) obFrame(3, T, `How much ${L} do you know?`,
    `<div class="choices">${(draft.course && C[draft.course].group === 'school' ? SCHOOL_LEVELS : draft.course && C[draft.course].group === 'trivia' ? TRIVIA_LEVELS : draft.course && C[draft.course].group === 'code' ? CODE_LEVELS : draft.course && C[draft.course].kind ? SKILL_LEVELS : LEVELS).map((r, i) => `<button class="choice ${draft.level === i ? 'on' : ''}" onclick="obSet('level',${i})"><span class="em">${r[0]}</span><span>${r[1].replace('{L}', L)}<small>${r[2]}</small></span></button>`).join('')}</div>`,
    draft.level != null, () => go('#/start/4'), 'wow');
  else obFrame(4, T, 'What’s your daily learning goal?',
    `<div class="choices">${GOALS.map((g, i) => `<button class="choice ${draft.goal === i ? 'on' : ''}" onclick="obSet('goal',${i})"><span class="em">${['☕', '🚶', '🏃', '🔥'][i]}</span><span style="flex:1">${g.min} min / day</span><span class="muted">${g.label}</span></button>`).join('')}</div>`,
    draft.goal != null, () => go('#/signup'));
}
function renderSignup() {
  if (!draft.course) return go('#/start/1');
  app.innerHTML = `<div class="ob"><div class="ob-top"><button class="icon-btn" onclick="history.back()" aria-label="Back">${ICON.back}</button><div class="bar"><i style="width:100%"></i></div></div>
  <form class="form" id="f" novalidate>
    <h1>Create your profile</h1>
    <input class="field" name="age" type="number" min="5" max="120" placeholder="Age" required>
    <input class="field" name="name" placeholder="Name" autocomplete="name" required maxlength="40">
    <input class="field" name="email" type="email" placeholder="Email" autocomplete="email" required>
    <input class="field" name="pass" type="password" placeholder="Password (6+ characters)" autocomplete="new-password" required>
    <div class="err" id="err"></div>
    <button class="btn primary block">Create account</button>
    <p class="small-print">Your account is stored only on this device’s browser.</p>
    <p style="text-align:center">Have an account? <a class="link" href="#/login">Log in</a></p>
  </form></div>`;
  $('#f').onsubmit = async e => {
    e.preventDefault();
    const f = new FormData(e.target), age = +f.get('age'), name = f.get('name').trim(), email = f.get('email').trim().toLowerCase(), pass = f.get('pass');
    const err = m => { $('#err').textContent = m; };
    if (!age || age < 5 || age > 120) return err('Please enter a valid age.');
    if (!name) return err('Please enter your name.');
    if (!/^\S+@\S+\.\S+$/.test(email)) return err('Please enter a valid email.');
    if (pass.length < 6) return err('Password must be at least 6 characters.');
    if (users[email]) return err('An account with this email already exists.');
    users[email] = newUser({ name, age, email, passHash: await hash(pass) });
    session = email; save(); store.set('tuon.session', session); draft = {}; saveDraft();
    welcome = true; go('#/learn');
  };
}
function renderLogin() {
  app.innerHTML = `<div class="ob"><div class="ob-top"><button class="icon-btn" onclick="go('#/')" aria-label="Back">${ICON.x}</button><span style="flex:1"></span><a class="btn ghost" style="min-height:42px" href="#/start/1">Sign up</a></div>
  <form class="form" id="f" novalidate>
    <h1>Log in</h1>
    <input class="field" name="email" type="email" placeholder="Email" autocomplete="email">
    <input class="field" name="pass" type="password" placeholder="Password" autocomplete="current-password">
    <div class="err" id="err"></div>
    <button class="btn primary block">Log in</button>
    <p style="text-align:center">New here? <a class="link" href="#/start/1">Create a profile</a></p>
  </form></div>`;
  $('#f').onsubmit = async e => {
    e.preventDefault();
    const f = new FormData(e.target), email = f.get('email').trim().toLowerCase(), u = users[email];
    if (!u || u.passHash !== await hash(f.get('pass'))) { $('#err').textContent = 'Wrong email or password.'; return; }
    session = email; store.set('tuon.session', session); go('#/learn');
  };
}

/* ---------------- app shell ---------------- */
const NAV = [['learn', 'home', 'Learn'], ['practice', 'target', 'Practice'], ['league', 'trophy', 'Leagues'], ['profile', 'user', 'Profile']];
function statsBar(u) {
  const lit = u.lastActive === today();
  return `<div class="stats">
    <button class="stat" onclick="A.courseMenu(event)" style="position:relative" aria-label="Switch course">${flag(u.course)}</button>
    <button class="stat flame ${lit ? '' : 'cold'}" onclick="go('#/profile')" title="Day streak">${ICON.flame}${u.streak}</button>
    <button class="stat gem" onclick="go('#/practice')" title="Gems">${ICON.gem}${u.gems}</button>
    <button class="stat heart" onclick="A.hearts()" title="Hearts">${ICON.heart}${u.hearts}</button>
  </div>`;
}
function streakCard(u) {
  const days = [...Array(7)].map((_, i) => dayOffset(i - 6));
  return `<div class="card"><div class="streak-card"><div class="big">${u.streak}</div><div><b>day streak</b><div class="muted" style="font-size:13px">${u.lastActive === today() ? 'You’re on fire today! 🔥' : u.streak ? 'Do a lesson to keep it alive!' : 'Start a streak today.'}</div></div></div>
  <div class="week">${days.map(d => `<span>${'SMTWTFS'[new Date(d + 'T00:00').getDay()]}<b class="${u.activeDays.includes(d) ? 'on' : ''} ${d === today() ? 'today' : ''}">${u.activeDays.includes(d) ? ICON.check : ''}</b></span>`).join('')}</div></div>`;
}
function goalCard(u) {
  const d = u.daily[today()]?.xp || 0, g = goalXp(u), p = Math.min(100, Math.round(d / g * 100));
  return `<div class="card card-row"><div class="ring" style="--p:${p}"><span>${p}%</span></div><div><h3 style="margin:0">Daily goal</h3><div class="muted">${d} / ${g} XP today</div></div></div>`;
}
function questCard(u) {
  return `<div class="card"><h3>Daily quests</h3>${quests(u).map(q => { const p = Math.min(100, q.have / q.need * 100); return `<div class="quest ${p >= 100 ? 'done' : ''}"><div class="qi">${q.icon}</div><div class="qb"><div class="qt">${q.title}</div><div class="minibar"><i style="width:${p}%"></i><em>${Math.min(q.have, q.need)} / ${q.need}</em></div></div><div class="muted" style="font-size:12px;font-weight:700">+${q.gems}💎</div></div>`; }).join('')}</div>`;
}
function shell(active, main) {
  const u = me();
  const navHtml = NAV.map(n => `<a href="#/${n[0]}" class="nav ${active === n[0] ? 'on' : ''}">${ICON[n[1]]}<span class="lbl">${n[2]}</span></a>`).join('');
  app.innerHTML = `<div class="layout">
    <aside class="side"><a class="logo" href="#/learn">${LOGO}</a><nav>${navHtml}</nav></aside>
    <main class="main">${statsBar(u)}${main}</main>
    <aside class="rail">${statsBar(u)}${streakCard(u)}${goalCard(u)}${questCard(u)}</aside>
    <nav class="bottom">${navHtml}</nav></div>`;
}

/* ---------------- Learn-path scenery: Bohol morning / sunset / night ---------------- */
const LEAF = `<svg viewBox="0 0 170 170" aria-hidden="true">
  <g><path d="M8 162C18 98 66 44 150 30C122 84 82 134 8 162Z" fill="var(--leaf1)"/><path d="M8 162C50 118 92 74 150 30" stroke="var(--leaf3)" stroke-width="2.5" fill="none" opacity=".7"/></g>
  <g transform="rotate(28 8 162)"><path d="M8 162C22 110 60 70 128 54C104 98 70 136 8 162Z" fill="var(--leaf2)"/><path d="M8 162C44 126 80 92 128 54" stroke="var(--leaf3)" stroke-width="2" fill="none" opacity=".6"/></g>
  <g transform="rotate(-30 8 162)"><path d="M8 162C26 116 58 84 112 72C92 108 62 140 8 162Z" fill="var(--leaf3)"/></g>
</svg>`;
const BRANCH = `<svg class="branch" viewBox="0 0 220 60" aria-hidden="true">
  <path d="M0 30C60 26 120 34 220 24" stroke="#7A5232" stroke-width="11" stroke-linecap="round" fill="none"/>
  <path d="M0 30C60 26 120 34 220 24" stroke="#94673F" stroke-width="5" stroke-linecap="round" fill="none" opacity=".7"/>
  <path d="M70 30q12-22 34-24q-10 18-34 24z" fill="var(--leaf1)"/><path d="M150 29q14 20 36 18q-12-16-36-18z" fill="var(--leaf2)"/>
  <path d="M30 29q-6 20 8 30q4-18-8-30z" fill="var(--leaf3)"/>
</svg>`;
function sceneHtml(ui) {
  const t = ui % 5, r = seeded('scene' + ui);
  const dots = (n, cls) => [...Array(n)].map(() => `<i class="${cls}" style="left:${(4 + r() * 92).toFixed(1)}%;top:${(4 + r() * 80).toFixed(1)}%;animation-delay:${(r() * 4).toFixed(2)}s;animation-duration:${(3 + r() * 4).toFixed(2)}s"></i>`).join('');
  return `<div class="scene" aria-hidden="true">
    ${t === 2 ? `<div class="moon"></div>${dots(26, 'star')}` : `<div class="sun"></div>`}
    <div class="cloud" style="top:9%;animation-duration:60s"></div><div class="cloud sm" style="top:30%;animation-duration:85s;animation-delay:-40s"></div>
    <svg class="hills" viewBox="0 0 400 120" preserveAspectRatio="none">
      <path d="M0 120V70Q25 30 50 68Q75 26 100 66Q130 22 160 64Q190 30 215 66Q245 24 275 64Q305 32 330 66Q360 26 400 62V120Z" fill="var(--hill1)"/>
      <path d="M0 120V92Q40 56 80 90Q120 50 165 88Q210 58 250 92Q300 52 345 88Q375 66 400 84V120Z" fill="var(--hill2)"/>
    </svg>
    <div class="leaf tl">${LEAF}</div><div class="leaf mr">${LEAF}</div><div class="leaf bl">${LEAF}</div>
    ${dots(t === 2 ? 14 : 8, 'fly')}
    <svg class="trail"></svg>
  </div>`;
}
function drawTrails() {
  document.querySelectorAll('.path').forEach(p => {
    const svg = p.querySelector('.trail'); if (!svg) return;
    const box = p.getBoundingClientRect(); if (!box.width) return;
    const pts = [...p.querySelectorAll('.node')].map(n => { const b = n.getBoundingClientRect(); return [b.left + b.width / 2 - box.left, b.top + b.height / 2 - box.top]; });
    if (pts.length < 2) return;
    let d = `M${pts[0][0]} ${pts[0][1] - 60}L${pts[0][0]} ${pts[0][1]}`;
    for (let i = 1; i < pts.length; i++) { const [x0, y0] = pts[i - 1], [x1, y1] = pts[i], my = (y0 + y1) / 2; d += `C${x0} ${my} ${x1} ${my} ${x1} ${y1}`; }
    const last = pts[pts.length - 1]; d += `L${last[0]} ${box.height}`;
    svg.setAttribute('viewBox', `0 0 ${box.width} ${box.height}`);
    svg.innerHTML = `<path d="${d}" class="trail-bed"/><path d="${d}" class="trail-dash"/>`;
  });
}
let trailTimer;
window.addEventListener('resize', () => { clearTimeout(trailTimer); trailTimer = setTimeout(drawTrails, 120); });

/* ---------------- learn page ---------------- */
function renderLearn() {
  const u = me(), cid = u.course, front = u.progress[cid] || 0;
  let html = '';
  C[cid].units.forEach((U, ui) => {
    html += `<div class="unit-head u${ui % 5}"><div><p>Unit ${ui + 1}</p><h2>${esc(U.title)}</h2><p style="font-size:14px">${esc(U.desc)}</p></div><button class="guide" onclick="A.guide(${ui})">${ICON.book}<span>Guidebook</span></button></div><div class="path sc${ui % 5}">${sceneHtml(ui)}`;
    for (let li = 0; li < LPU; li++) {
      const n = ui * LPU + li, st = n < front ? 'done' : n === front ? 'cur' : 'locked', trophy = li === LPU - 1;
      const ic = st === 'locked' ? (trophy ? ICON.cup : ICON.lock) : st === 'done' ? (trophy ? ICON.cup : ICON.check) : (trophy ? ICON.cup : ICON.star);
      html += `<div class="node-wrap u${ui % 5}n" id="nw-${n}" style="transform:translateX(${(ui % 2 ? -1 : 1) * OFFS[li]}px)">${st === 'cur' ? '<div class="start-tag">START</div>' : ''}<button class="node ${st} ${trophy ? 'trophy' : ''}" onclick="A.node(${ui},${li},event)" aria-label="${lessonTitle(li, cid, ui)}">${ic}</button></div>`;
    }
    html += `<div class="deco ${ui % 2 ? 'right' : 'left'}" style="top:110px;${ui % 2 ? 'right' : 'left'}:6%">${BRANCH}${mascot(ui === 1 ? 'wow' : ui === 2 ? 'happy' : 'wave')}</div></div>`;
  });
  if (front >= totalLessons(cid)) html += `<div class="card" style="text-align:center">${mascot('wow')}<h3>Course complete! 🎉</h3><p class="muted">You finished every lesson in ${C[cid].name}. Keep practicing to stay sharp, or start another course from your profile.</p></div>`;
  shell('learn', `<div style="max-width:600px;margin:0 auto">${html}</div>`);
  requestAnimationFrame(drawTrails); if (document.fonts) document.fonts.ready.then(drawTrails);
  if (welcome) { welcome = false; modal(`${mascot('wave')}<h2>Welcome, ${esc(u.name)}!</h2><p class="muted">I’m Mata the tarsier. Tap the glowing lesson to start your first ${C[cid].name} lesson.</p><div class="acts"><button class="btn primary" onclick="closeModal()">Let’s go!</button></div>`); }
  const cur = document.getElementById('nw-' + front);
  if (cur && front > 0) setTimeout(() => cur.scrollIntoView({ block: 'center' }), 30);
}

/* ---------------- actions ---------------- */
const A = window.A = {
  node(ui, li, ev) {
    ev.stopPropagation();
    const u = me(), cid = u.course, n = ui * LPU + li, front = u.progress[cid] || 0, wrap = document.getElementById('nw-' + n);
    const open = wrap.querySelector('.pop');
    document.querySelectorAll('.pop').forEach(p => { p.parentElement.style.zIndex = ''; p.remove(); });
    if (open) return;
    const U = C[cid].units[ui], locked = n > front;
    const words = U.topics ? (li < 4 ? 'Learn it, then answer a quick quiz' : 'Review everything in this unit') : li < 2 ? U.words.slice(li * 4, li * 4 + 4).map(w => w[0]).join(', ') : li < 4 ? 'Build sentences with what you know' : 'Prove your skills to finish the unit';
    const pop = document.createElement('div');
    pop.className = 'pop' + (locked ? ' locked' : '');
    pop.innerHTML = `<h4>${lessonTitle(li, cid, ui)}</h4><p>${locked ? 'Complete all lessons above to unlock this.' : `Lesson ${li + 1} of ${LPU} · ${esc(words)}`}</p>
      ${locked ? '' : `<button class="btn" onclick="A.start(${ui},${li})">${n < front ? 'Practice +5 XP' : `Start +${li === LPU - 1 ? 15 : 10} XP`}</button>`}`;
    pop.onclick = e => e.stopPropagation();
    wrap.style.zIndex = 6; wrap.appendChild(pop);
    document.addEventListener('click', () => { pop.remove(); wrap.style.zIndex = ''; }, { once: true });
  },
  start(ui, li) {
    const u = me(); syncHearts(u);
    if (u.hearts <= 0) return A.hearts(true);
    startLesson({ mode: 'lesson', cid: u.course, ui, li, ex: buildLesson(u.course, ui, li) });
  },
  practice() {
    const ex = buildPractice(me());
    if (!ex) return toast('Finish your first lesson to unlock practice.');
    startLesson({ mode: 'practice', cid: me().course, ex });
  },
  guide(ui) {
    if (C[me().course].kind) return skillGuide(ui);
    const u = me(), cid = u.course, U = unit(cid, ui);
    modal(`<h2>Unit ${ui + 1} guidebook · ${esc(U.title)}</h2><p class="muted" style="margin-bottom:16px">Key words and phrases for this unit.</p>
      <h3 style="margin-bottom:10px">Words</h3><div class="vocab">${U.W.map(w => `<div><span class="ve">${w.i}</span><span style="flex:1"><b>${wordLabel(w, cid)}</b><span>${esc(w.e)}</span></span>${sayBtn(w.t, cid)}</div>`).join('')}</div>
      <h3 style="margin:20px 0 10px">Phrases</h3><div class="opts">${U.S.map(s => `<div class="opt" style="cursor:default">${sayBtn(s.t, cid)}<span><b>${esc(s.t)}</b>${s.r ? `<span class="rom">${esc(s.r)}</span>` : ''}<span class="muted" style="display:block;font-weight:500">${esc(s.e)}</span></span></div>`).join('')}</div>
      <div class="acts"><button class="btn primary" onclick="closeModal()">Got it</button></div>`, true);
  },
  hearts(blocking) {
    const u = me(); syncHearts(u); save();
    const mins = u.hearts < MAX_HEARTS ? Math.ceil((HEART_MS - (Date.now() - u.heartsAt)) / 60000) : 0;
    modal(`${mascot(u.hearts ? 'happy' : 'sad')}<h2>${u.hearts ? 'Hearts' : 'You’re out of hearts'}</h2>
      <div class="hearts-row">${[...Array(MAX_HEARTS)].map((_, i) => ICON.heart.replace('<svg', `<svg class="${i < u.hearts ? '' : 'off'}"`)).join('')}</div>
      <p class="muted">${u.hearts >= MAX_HEARTS ? 'You have full hearts. Every mistake in a lesson costs one.' : `Next heart in ${mins} min. Practice to earn hearts back.`}</p>
      <div class="acts">
        ${u.hearts < MAX_HEARTS ? `<button class="btn accent" ${u.gems < REFILL_COST ? 'disabled' : ''} onclick="A.refill()">Refill for ${REFILL_COST} 💎</button>
        <button class="btn ghost" onclick="closeModal();A.practice()">Practice to earn hearts</button>` : ''}
        <button class="btn ${blocking ? 'ghost' : 'primary'}" onclick="closeModal()">${blocking ? 'No thanks' : 'Close'}</button></div>`);
  },
  refill() { const u = me(); if (u.gems < REFILL_COST) return; u.gems -= REFILL_COST; u.hearts = MAX_HEARTS; u.heartsAt = Date.now(); save(); closeModal(); sfx.win(); toast('Hearts refilled! ❤️'); if (L) renderLesson(); else render(); },
  freeze() { const u = me(); if (u.gems < FREEZE_COST || u.freezes >= 2) return; u.gems -= FREEZE_COST; u.freezes++; save(); sfx.win(); toast('Streak freeze equipped 🧊'); render(); },
  courseMenu(ev) {
    ev.stopPropagation();
    const btn = ev.currentTarget; const old = btn.querySelector('.course-menu');
    document.querySelectorAll('.course-menu').forEach(m => m.remove()); if (old) return;
    const u = me(), m = document.createElement('div'); m.className = 'course-menu';
    m.innerHTML = COURSE_IDS.map(c => `<button class="${c === u.course ? 'on' : ''}" onclick="A.setCourse('${c}')">${flag(c)}<span style="flex:1">${C[c].name}</span><span class="muted" style="font-size:12px">${u.progress[c] != null ? Math.round((u.progress[c] / totalLessons(c)) * 100) + '%' : 'New'}</span></button>`).join('');
    btn.appendChild(m);
    document.addEventListener('click', () => m.remove(), { once: true });
  },
  setCourse(c) { const u = me(); u.course = c; if (u.progress[c] == null) u.progress[c] = 0; if (!u.courses.includes(c)) u.courses.push(c); save(); toast(`Switched to ${C[c].name}`); go('#/learn'); },
  setGoal(i) { me().goal = +i; save(); render(); },
  sound() { prefs.sound = !prefs.sound; store.set('tuon.prefs', prefs); render(); },
  logout() { session = null; store.set('tuon.session', null); L = null; go('#/'); },
  del() {
    modal(`${mascot('sad')}<h2>Delete your account?</h2><p class="muted">This removes ${esc(me().name)}’s profile and all progress from this browser. It can’t be undone.</p><div class="acts"><button class="btn danger" onclick="A.reallyDel()">Delete account</button><button class="btn ghost" onclick="closeModal()">Cancel</button></div>`);
  },
  reallyDel() { delete users[session]; save(); A.logout(); }
};

/* ---------------- lesson engine ---------------- */
let L = null, R = null;
function startLesson({ mode, cid, ui, li, ex }) {
  L = { mode, cid, ui, li, queue: ex, i: 0, total: ex.length, done: 0, wrong: 0, combo: 0, best: 0, t0: Date.now(), state: 'answer', sel: null, ok: null, note: '' };
  go('#/lesson');
}
const cur = () => L.queue[L.i];
function renderLesson() {
  const u = me(), ex = cur(), cid = L.cid;
  const pct = Math.round(L.done / L.total * 100);
  if (L.state === 'answer' && L.sel == null) L.sel = (ex.type === 'tiles' || ex.type === 'listenTiles') ? [] : ex.type === 'match' ? { a: null, b: null, ok: [], bad: null } : null;
  let body = '';
  const optKey = i => `<span class="k">${i + 1}</span>`;
  const locked = L.state !== 'answer';
  switch (ex.type) {
    case 'pick':
      body = `${ex.isNew ? '<span class="new-word">✦ New word</span>' : ''}<h2>${esc(ex.prompt)}</h2><div class="cards">${ex.opts.map((o, i) => `<button class="pcard ${L.sel === i ? 'on' : ''}" onclick="LS(${i})" ${locked ? 'disabled' : ''}>${optKey(i)}<span class="pe">${o.i}</span><span>${wordLabel(o, cid)}</span></button>`).join('')}</div>`;
      break;
    case 'meaning':
      body = `<h2>${esc(ex.prompt)}</h2><div class="prompt-row">${mascot(L.state === 'feedback' ? (L.ok ? 'cheer' : 'sad') : 'happy')}<div class="speech" style="display:flex;align-items:center;gap:10px">${sayBtn(ex.w.t, cid)}<span>${wordLabel(ex.w, cid)}</span></div></div>
        <div class="opts">${ex.opts.map((o, i) => `<button class="opt ${L.sel === i ? 'on' : ''}" onclick="LS(${i})" ${locked ? 'disabled' : ''}>${optKey(i)}${esc(o)}</button>`).join('')}</div>`;
      break;
    case 'listenPick':
      body = `<h2>${esc(ex.prompt)}</h2><div class="big-say"><button data-say="${esc(ex.w.t)}" data-cid="${cid}" aria-label="Play">${ICON.speaker}</button><button class="slow" data-say="${esc(ex.w.t)}" data-cid="${cid}" data-slow="1" aria-label="Play slowly">${ICON.snail}</button></div>
        <div class="opts">${ex.opts.map((o, i) => `<button class="opt ${L.sel === i ? 'on' : ''}" onclick="LS(${i})" ${locked ? 'disabled' : ''}>${optKey(i)}<span>${wordLabel(o, cid)}</span></button>`).join('')}</div>`;
      break;
    case 'choose':
      body = `<h2>${esc(ex.prompt)}</h2><div class="opts">${ex.opts.map((o, i) => `<button class="opt ${L.sel === i ? 'on' : ''}" onclick="LS(${i})" ${locked ? 'disabled' : ''}>${optKey(i)}<span>${esc(o.t)}${o.r ? `<span class="rom">${esc(o.r)}</span>` : ''}</span></button>`).join('')}</div>`;
      break;
    case 'tiles': case 'listenTiles': {
      const tile = (b, i, used) => `<button class="tile ${used ? 'used' : ''}" onclick="LT(${i})" ${locked ? 'disabled' : ''}>${esc(b.t)}${b.r ? `<span class="rom">${esc(b.r)}</span>` : ''}</button>`;
      const head = ex.type === 'listenTiles'
        ? `<div class="big-say"><button data-say="${esc(ex.s.t)}" data-cid="${cid}" aria-label="Play">${ICON.speaker}</button><button class="slow" data-say="${esc(ex.s.t)}" data-cid="${cid}" data-slow="1" aria-label="Play slowly">${ICON.snail}</button></div>`
        : `<div class="prompt-row">${mascot(L.state === 'feedback' ? (L.ok ? 'cheer' : 'sad') : 'happy')}<div class="speech" style="display:flex;align-items:center;gap:10px">${ex.dir === 'en' ? sayBtn(ex.s.t, cid) + `<span dir="auto">${esc(ex.s.t)}${ex.s.r ? `<span class="rom">${esc(ex.s.r)}</span>` : ''}</span>` : esc(ex.s.e)}</div></div>`;
      body = `<h2>${esc(ex.prompt)}</h2>${head}<div class="answer-line" ${C[cid].rtl && ex.dir !== 'en' ? 'dir="rtl"' : ''}>${L.sel.map(i => `<button class="tile" onclick="LU(${i})" ${locked ? 'disabled' : ''}>${esc(ex.bank[i].t)}${ex.bank[i].r ? `<span class="rom">${esc(ex.bank[i].r)}</span>` : ''}</button>`).join('')}</div>
        <div class="bank">${ex.bank.map((b, i) => tile(b, i, L.sel.includes(i))).join('')}</div>`;
      break;
    }
    case 'type':
      body = `<h2>${esc(ex.prompt)}</h2><div class="hint-em">${ex.w.i}</div><textarea class="typebox" id="typeIn" dir="auto" placeholder="Type in ${C[cid].name}${C[cid].romaji ? ` (${C[cid].romName || 'romaji'} is fine)` : ''}" autocomplete="off" autocapitalize="off" spellcheck="false" ${locked ? 'disabled' : ''}>${esc(L.typed || '')}</textarea>`;
      break;
    case 'card':
      body = `<span class="new-word">✦ New lesson</span><div class="lcard"><h2>${esc(ex.t)}</h2>${ex.img ? picHtml(cid, ex.img, true) : ''}<p>${esc(ex.x)}</p>${ex.code ? codeBlock(ex.code) : ''}${ex.fen ? boardHtml(ex.fen, { hl: ex.hl }) : ''}${ex.em ? `<div class="hint-em">${ex.em}</div>` : ''}</div>`;
      break;
    case 'mc':
      if (ex.pics) { body = `<h2>${esc(ex.prompt)}</h2><div class="cards picgrid">${ex.opts.map((k, i) => `<button class="pcard pic ${L.sel === i ? 'on' : ''} ${locked && i === ex.answer ? 'right' : ''} ${locked && L.sel === i && i !== ex.answer ? 'wrong' : ''}" onclick="LS(${i})" ${locked ? 'disabled' : ''}>${optKey(i)}<img src="${C[cid].pics[k].img}" alt="Option ${i + 1}" loading="lazy">${locked ? `<span>${esc(C[cid].pics[k].n)}</span>` : ''}</button>`).join('')}</div>`; break; }
      body = `<h2>${esc(ex.prompt)}</h2>${ex.img ? picHtml(cid, ex.img) : ''}${ex.code ? codeBlock(ex.code) : ''}${ex.fen ? boardHtml(ex.fen, { small: 1 }) : ''}${ex.em ? `<div class="hint-em">${ex.em}</div>` : ''}<div class="opts">${ex.opts.map((o, i) => `<button class="opt ${L.sel === i ? 'on' : ''} ${locked && i === ex.answer ? 'right' : ''} ${locked && L.sel === i && i !== ex.answer ? 'wrong' : ''}" onclick="LS(${i})" ${locked ? 'disabled' : ''}>${optKey(i)}${ex.mono ? `<code>${esc(o)}</code>` : esc(o)}</button>`).join('')}</div>`;
      break;
    case 'squares':
      body = `<h2>${esc(ex.prompt)}</h2>${boardHtml(ex.fen, { click: !locked, sel: L.sel, from: ex.from, good: locked ? ex.targets : null, bad: locked && !L.ok ? L.sel : null })}`;
      break;
    case 'match': {
      const m = L.sel;
      const cls = (side, w) => { const done = m.ok.includes(w.ref); return `mtile ${done ? 'gone' : ''} ${m[side] === w.ref ? 'on' : ''} ${m.bad && m.bad.includes(side + w.ref) ? 'bad' : ''}`; };
      body = `<h2>${esc(ex.prompt)}</h2><div class="match"><div class="col">${ex.left.map(w => `<button class="${cls('a', w)}" onclick="LM('a','${w.ref}')">${wordLabel(w, cid)}</button>`).join('')}</div>
        <div class="col">${ex.right.map(w => `<button class="${cls('b', w)}" onclick="LM('b','${w.ref}')">${esc(w.e)}</button>`).join('')}</div></div>`;
      break;
    }
  }
  const canCheck = ex.type === 'type' ? !!(L.typed || '').trim() : ex.type === 'match' ? false : Array.isArray(L.sel) ? L.sel.length > 0 : L.sel != null;
  let foot;
  if (L.state === 'answer' && ex.type === 'card') foot = `<div class="lesson-foot"><div class="in"><span></span><button class="btn primary" id="checkBtn" onclick="LCard()">Got it</button></div></div>`;
  else if (L.state === 'answer') foot = `<div class="lesson-foot"><div class="in"><button class="btn ghost skip" onclick="LSkip()">${ex.type.startsWith('listen') ? 'Can’t listen now' : 'Skip'}</button><button class="btn primary" id="checkBtn" onclick="LCheck()" ${canCheck ? '' : 'disabled'}>Check</button></div></div>`;
  else {
    const praise = pick(['Nice!', 'Great job!', 'Excellent!', 'You got it!', 'Ayos!', 'Correct!']);
    foot = `<div class="lesson-foot ${L.ok ? 'ok' : 'bad'}"><div class="in"><div class="fb"><div class="badge">${mascot(L.ok ? 'cheer' : 'sad')}</div><div><h3>${L.ok ? praise : 'Correct answer:'}</h3><p>${L.ok ? esc(L.note || '') : esc(ex.solution)}</p>${ex.why ? `<p class="why">${esc(ex.why)}</p>` : ''}</div></div><button class="btn primary" id="checkBtn" onclick="LNext()">Continue</button></div></div>`;
  }
  app.innerHTML = `<div class="lesson">
    <div class="lesson-top"><button class="icon-btn" onclick="LQuit()" aria-label="Quit lesson">${ICON.x}</button><div class="bar"><i style="width:${pct}%"></i></div>
      ${L.mode === 'practice' ? `<span class="stat gem">${ICON.aim}</span>` : `<span class="stat heart">${ICON.heart}${u.hearts}</span>`}
      ${L.combo >= 3 && L.state === 'answer' ? `<div class="combo">${L.combo} IN A ROW 🔥</div>` : ''}</div>
    <div class="lesson-body">${body}</div>${foot}</div>`;
  if (ex.type === 'type' && !locked) { const t = $('#typeIn'); t.focus(); t.setSelectionRange(t.value.length, t.value.length); t.oninput = () => { L.typed = t.value; $('#checkBtn').disabled = !t.value.trim(); }; t.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); if (t.value.trim()) LCheck(); } }; }
  if (L.state === 'answer' && !L.played && (ex.type === 'listenPick' || ex.type === 'listenTiles')) { L.played = true; setTimeout(() => speak(ex.type === 'listenPick' ? ex.w.t : ex.s.t, cid), 250); }
}
window.LS = i => { if (L.state !== 'answer' || Array.isArray(L.sel) || !cur().opts) return; L.sel = i; sfx.tap(); const ex = cur(); if (ex.type === 'pick' || ex.type === 'listenPick') speak(ex.opts[i].t, L.cid); renderLesson(); };
window.LQ = sq => { if (L.state !== 'answer') return; L.sel = sq; sfx.tap(); renderLesson(); };
window.LCard = () => { if (L.state !== 'answer') return; L.done++; L.state = 'feedback'; L.ok = true; LNext(); };
window.LT = i => { if (L.state !== 'answer' || L.sel.includes(i)) return; L.sel.push(i); sfx.tap(); const ex = cur(); if (ex.dir !== 'en') speak(ex.bank[i].t, L.cid); renderLesson(); };
window.LU = i => { if (L.state !== 'answer') return; L.sel = L.sel.filter(x => x !== i); renderLesson(); };
window.LM = (side, ref) => {
  const m = L.sel, ex = cur();
  if (m.ok.includes(ref)) return;
  m.bad = null; m[side] = m[side] === ref ? null : ref;
  if (side === 'a' && m.a) speak(ex.left.find(w => w.ref === ref).t, L.cid);
  if (m.a && m.b) {
    if (m.a === m.b) { m.ok.push(m.a); sfx.tap(); L.combo++; L.best = Math.max(L.best, L.combo); }
    else { m.bad = ['a' + m.a, 'b' + m.b]; sfx.bad(); L.combo = 0; }
    m.a = m.b = null;
    if (m.ok.length === ex.left.length) { L.state = 'feedback'; L.ok = true; L.note = 'All pairs matched!'; L.done++; sfx.ok(); }
  }
  renderLesson();
};
function checkTyped(v, accepts) {
  const n = norm(v);
  for (const a of accepts) if (n === norm(a)) return { ok: true };
  for (const a of accepts) if (deacc(n) === deacc(norm(a))) return { ok: true, note: `Watch the accents: ${accepts[0]}` };
  for (const a of accepts) { const b = norm(a); if (b.length > 4 && lev(n, b) <= 1) return { ok: true, note: `Small typo — it’s “${accepts[0]}”` }; }
  return { ok: false };
}
window.LCheck = () => {
  if (L.state !== 'answer') return LNext();
  const ex = cur(), u = me();
  let ok = false; L.note = '';
  if (ex.type === 'squares') { if (!L.sel) return; ok = ex.targets.includes(L.sel); }
  else if (['pick', 'meaning', 'listenPick', 'choose', 'mc'].includes(ex.type)) { if (L.sel == null) return; ok = L.sel === ex.answer; }
  else if (ex.type === 'tiles' || ex.type === 'listenTiles') { if (!L.sel.length) return; ok = norm(L.sel.map(i => ex.bank[i].t).join(' ')) === norm(ex.answer.join(' ')); }
  else if (ex.type === 'type') { const r = checkTyped(L.typed || '', ex.accepts); ok = r.ok; L.note = r.note || ''; }
  else return;
  L.state = 'feedback'; L.ok = ok;
  if (ok) {
    L.done++; L.combo++; L.best = Math.max(L.best, L.combo); sfx.ok();
    if (L.mode === 'practice' && ex.ref) u.mistakes = u.mistakes.filter(r => r !== ex.ref);
    if (ex.type !== 'pick' && ex.type !== 'listenPick' && ex.type !== 'type') { const t = ex.s ? ex.s.t : ex.w ? ex.w.t : null; if (t && (ex.dir === 'en' || ex.type === 'meaning')) { const c = L.cid; setTimeout(() => speak(t, c), 150); }; }
  } else {
    L.wrong++; L.combo = 0; sfx.bad();
    if (L.mode === 'lesson') { syncHearts(u); u.hearts = Math.max(0, u.hearts - 1); if (u.hearts === MAX_HEARTS - 1) u.heartsAt = Date.now(); }
    if (ex.ref && !u.mistakes.includes(ex.ref)) u.mistakes = [ex.ref, ...u.mistakes].slice(0, 40);
    L.queue.push({ ...ex, opts: ex.opts ? shuffle(ex.opts) : ex.opts, bank: ex.bank ? shuffle(ex.bank) : ex.bank });
    const re = L.queue[L.queue.length - 1]; if (re.opts) re.answer = re.opts.indexOf(ex.opts[ex.answer]);
  }
  save(); renderLesson();
};
window.LSkip = () => { if (L.state !== 'answer') return; const ex = cur(); L.state = 'feedback'; L.ok = false; L.combo = 0; L.queue.push({ ...ex }); renderLesson(); };
window.LNext = () => {
  if (L.state === 'answer') return LCheck();
  const u = me();
  L.i++; L.state = 'answer'; L.sel = null; L.typed = ''; L.played = false;
  if (L.mode === 'lesson' && u.hearts <= 0) return outOfHearts();
  if (L.done >= L.total || L.i >= L.queue.length) return finishLesson();
  renderLesson();
};
window.LQuit = () => modal(`${mascot('sad')}<h2>Wait, don’t go!</h2><p class="muted">You’ll lose your progress in this lesson if you quit now.</p><div class="acts"><button class="btn primary" onclick="closeModal()">Keep learning</button><button class="btn ghost" style="color:var(--bad)" onclick="L=null;closeModal();go('#/learn')">End session</button></div>`);
function outOfHearts() {
  const u = me();
  modal(`${mascot('sad')}<h2>You ran out of hearts</h2><p class="muted">Refill to keep going, or practice earlier lessons to earn hearts back.</p>
    <div class="acts"><button class="btn accent" ${u.gems < REFILL_COST ? 'disabled' : ''} onclick="A.refill()">Refill for ${REFILL_COST} 💎 (you have ${u.gems})</button>
    <button class="btn ghost" onclick="L=null;closeModal();A.practice()">Practice to earn hearts</button>
    <button class="btn ghost" style="color:var(--bad)" onclick="L=null;closeModal();go('#/learn')">Quit lesson</button></div>`);
  const bg = document.querySelector('.modal-bg'); bg.replaceWith(bg.cloneNode(true)); // not dismissable by backdrop
}

function finishLesson() {
  const u = me(), secs = Math.round((Date.now() - L.t0) / 1000), acc = Math.round(L.total / (L.total + L.wrong) * 100);
  const n = L.mode === 'lesson' ? L.ui * LPU + L.li : -1, front = u.progress[L.cid] || 0;
  const replay = L.mode === 'lesson' && n < front;
  let xp = L.mode === 'practice' ? 10 : replay ? 5 : (L.li === LPU - 1 ? 15 : 10);
  const perfect = L.wrong === 0; if (perfect && !replay) xp += 5;
  if (L.mode === 'lesson' && n === front) { u.progress[L.cid] = front + 1; if (L.li < 2 && !C[L.cid].kind) u.words += 4; }
  if (L.mode === 'practice' && u.hearts < MAX_HEARTS) { u.hearts++; }
  const d = dayStat(u); const wasGoal = d.xp >= goalXp(u);
  d.xp += xp; d.lessons++; d.combo = Math.max(d.combo, L.best);
  for (const k of Object.keys(u.daily)) if (daysBetween(k, today()) > 14) delete u.daily[k];
  const wk = weekKey(); u.weekly = { [wk]: (u.weekly[wk] || 0) + xp };
  u.xp += xp; u.lessons++; if (perfect) u.perfect++;
  const gems = perfect ? 10 : 5; u.gems += gems;
  const newStreak = bumpStreak(u);
  const questGems = claimQuests(u);
  save();
  R = { xp, acc, secs, perfect, gems: gems + questGems, newStreak, streak: u.streak, goalHit: !wasGoal && d.xp >= goalXp(u), unitDone: L.mode === 'lesson' && n === front && L.li === LPU - 1, unit: L.ui, step: 0 };
  L = null; sfx.win(); go('#/done');
}
function renderResult() {
  const r = R;
  const steps = ['main']; if (r.newStreak) steps.push('streak');
  const s = steps[r.step];
  if (s === 'main') {
    const t = `${Math.floor(r.secs / 60)}:${pad(r.secs % 60)}`;
    app.innerHTML = `${confetti()}<div class="lesson"><div class="result">${mascot('cheer')}
      <h1>${r.unitDone ? `Unit ${r.unit + 1} complete!` : r.perfect ? 'Perfect lesson!' : 'Lesson complete!'}</h1>
      <p class="muted">${r.goalHit ? 'You hit your daily goal — Mata is proud of you! 🎯' : r.perfect ? 'Zero mistakes. Impressive!' : 'Every lesson counts. Keep it up!'}</p>
      <div class="tiles3">
        <div class="tile3" style="--c:var(--sun)"><small>Total XP</small><b>${ICON.bolt}${r.xp}</b></div>
        <div class="tile3" style="--c:var(--ok)"><small>${r.perfect ? 'Amazing' : 'Accuracy'}</small><b>${ICON.aim}${r.acc}%</b></div>
        <div class="tile3" style="--c:var(--gem)"><small>Gems</small><b>${ICON.gem}+${r.gems}</b></div>
      </div><p class="muted" style="font-weight:600">${ICON.clock.replace('<svg', '<svg style="width:16px;height:16px;display:inline;vertical-align:-3px"')} ${t}</p></div>
      <div class="lesson-foot"><div class="in"><span></span><button class="btn primary" id="checkBtn" onclick="RNext()">Continue</button></div></div></div>`;
  } else {
    app.innerHTML = `<div class="lesson"><div class="result"><div class="flame-big">${ICON.flame}</div><div class="streak-num">${r.streak}</div><h1 style="color:var(--flame)">day streak!</h1>
      <p class="muted" style="margin-top:8px">${r.streak === 1 ? 'You started a streak! Come back tomorrow to grow it.' : `That’s ${r.streak} days in a row. Don’t break the chain!`}</p></div>
      <div class="lesson-foot"><div class="in"><span></span><button class="btn accent" id="checkBtn" onclick="RNext()">Continue</button></div></div></div>`;
  }
  window.RNext = () => { r.step++; if (r.step >= steps.length) { R = null; go('#/learn'); } else renderResult(); };
}
document.addEventListener('keydown', e => {
  if (document.querySelector('.modal-bg')) { if (e.key === 'Escape') closeModal(); return; }
  if ((location.hash === '#/lesson' && L) || (location.hash === '#/done' && R)) {
    if (e.target.tagName === 'TEXTAREA' || e.target.tagName === 'INPUT') return;
    if (e.key === 'Enter') { e.preventDefault(); const b = $('#checkBtn'); if (b && !b.disabled) b.click(); }
    else if (L && L.state === 'answer' && /^[1-9]$/.test(e.key)) {
      const ex = cur(), i = +e.key - 1;
      if (ex.opts && i < ex.opts.length) LS(i);
      else if (ex.bank) { const free = ex.bank.map((_, j) => j).filter(j => !L.sel.includes(j)); if (free[i] != null) LT(free[i]); }
    } else if (L && e.key === 'Backspace' && Array.isArray(L.sel) && L.sel.length) { L.sel.pop(); renderLesson(); }
  }
});

/* ---------------- practice / league / profile ---------------- */
function renderPractice() {
  const u = me(), cid = u.course, front = u.progress[cid] || 0, unitsOpen = Math.min(C[cid].units.length, Math.ceil(front / LPU));
  const miss = u.mistakes.filter(r => r.startsWith(cid + '|')).length;
  let vocab = '';
  if (C[cid].kind) for (let ui = 0; ui < unitsOpen; ui++) vocab += C[cid].units[ui].topics.map(T => `<div><span class="ve">${flag(cid)}</span><span style="flex:1"><b>${esc(T.card.t)}</b><span>${esc(C[cid].units[ui].title)}</span></span></div>`).join('');
  else for (let ui = 0; ui < unitsOpen; ui++) vocab += unit(cid, ui).W.map(w => `<div><span class="ve">${w.i}</span><span style="flex:1"><b>${wordLabel(w, cid)}</b><span>${esc(w.e)}</span></span>${sayBtn(w.t, cid)}</div>`).join('');
  shell('practice', `<div class="stack">
    <div><h1 class="page-title">Practice</h1><p class="page-sub">Strengthen what you’ve learned and earn hearts back.</p></div>
    <div class="hero-card">${mascot('wow')}<div><h2>Personalized review</h2><p>${miss ? `Mata picked ${Math.min(miss, 5)} of your ${miss} recent mistake${miss > 1 ? 's' : ''} to fix.` : 'A mix of words and phrases from units you’ve started.'} No hearts lost — and you earn one back.</p><button class="btn" onclick="A.practice()" ${front ? '' : 'disabled'}>Start practice +10 XP</button></div></div>
    <div class="card"><h3>Shop</h3>
      <div class="shop-item" style="padding:6px 0 14px;border-bottom:2px solid var(--line)"><div class="si">❤️</div><div class="sb"><b>Heart refill</b><span>Get all ${MAX_HEARTS} hearts back (${u.hearts}/${MAX_HEARTS} now)</span></div><button class="price" onclick="A.refill()" ${u.gems < REFILL_COST || u.hearts >= MAX_HEARTS ? 'disabled' : ''}>${ICON.gem}${REFILL_COST}</button></div>
      <div class="shop-item" style="padding-top:14px"><div class="si">🧊</div><div class="sb"><b>Streak freeze</b><span>Protects your streak for one missed day (${u.freezes}/2 equipped)</span></div><button class="price" onclick="A.freeze()" ${u.gems < FREEZE_COST || u.freezes >= 2 ? 'disabled' : ''}>${ICON.gem}${FREEZE_COST}</button></div>
    </div>
    <div class="rail-mobile" style="flex-direction:column;gap:16px">${goalCard(u)}${questCard(u)}</div>
    <div class="card"><h3>${C[cid].kind ? 'Topics you’ve unlocked' : 'Words you’ve unlocked'}</h3>${vocab ? `<div class="vocab">${vocab}</div>` : `<p class="muted">Finish a lesson to start your ${C[cid].kind ? 'topic' : 'word'} list.</p>`}</div>
  </div>`);
}
const BOT_NAMES = ['Aiko', 'Mateo', 'Jun', 'Camille', 'Lito', 'Priya', 'Noah', 'Bea', 'Sora', 'Diego', 'Inday', 'Lucas', 'Mina', 'Paolo', 'Elif', 'Tomás', 'Hana', 'Kofi', 'Nena', 'Yuki', 'Rafa', 'Leni', 'Omar', 'Zoe'];
const AV_COLORS = ['#0E8C8F', '#FF7F3F', '#7A5AF8', '#2F80ED', '#E0484E', '#17936A', '#C27C0E', '#D63384'];
function renderLeague() {
  const u = me(), wk = weekKey(), rnd = seeded(wk + u.email);
  const elapsed = Math.min(1, (Date.now() - new Date(wk + 'T00:00')) / (7 * 864e5));
  const names = BOT_NAMES.map(n => [rnd(), n]).sort((a, b) => a[0] - b[0]).slice(0, 14).map(x => x[1]);
  const bots = names.map((n, i) => ({ name: n, xp: Math.round((40 + rnd() * 380) * elapsed + rnd() * 25), color: AV_COLORS[i % AV_COLORS.length] }));
  const rows = [...bots, { name: u.name, xp: u.weekly[wk] || 0, me: true, color: '#0E8C8F' }].sort((a, b) => b.xp - a.xp);
  const tier = Math.min(LEAGUES.length - 1, Math.floor(u.xp / 300));
  const daysLeft = 7 - ((new Date().getDay() + 6) % 7);
  shell('league', `<div class="stack">
    <div class="league-head"><div class="badges">${LEAGUES.map((l, i) => `<span class="${i === tier ? 'on' : ''}" title="${l[1]}">${l[0]}</span>`).join('')}</div>
      <h1 class="page-title">${LEAGUES[tier][1]} League</h1><p class="muted">Top 5 move up next week · ${daysLeft} day${daysLeft > 1 ? 's' : ''} left</p></div>
    <div class="lb">${rows.map((r, i) => `${i === 5 ? '<div class="zone up">▲ Promotion zone</div>' : ''}${i === rows.length - 3 ? '<div class="zone down">▼ Demotion zone</div>' : ''}
      <div class="lb-row ${r.me ? 'me' : ''}"><span class="rk ${i < 3 ? 't' + (i + 1) : ''}">${i + 1}</span><span class="av" style="background:${r.color}">${esc(r.name[0].toUpperCase())}</span><span class="nm">${esc(r.name)}${r.me ? ' (you)' : ''}</span><span class="xp">${r.xp} XP</span></div>`).join('')}</div>
    <p class="small-print">League rivals are simulated in this browser-only demo.</p>
  </div>`);
}
function renderProfile() {
  const u = me(), d = new Date(u.joined + 'T00:00');
  const tier = Math.min(LEAGUES.length - 1, Math.floor(u.xp / 300));
  const ach = [
    ['🔥', 'Wildfire', 'Reach a 7-day streak', u.longest || 0, 7],
    ['⚡', 'Sage', 'Earn 500 XP', u.xp, 500],
    ['🎯', 'Sharpshooter', 'Finish 5 perfect lessons', u.perfect, 5],
    ['📚', 'Scholar', 'Learn 80 words', u.words, 80],
    ['🏆', 'Champion', `Finish a whole course`, Math.max(...u.courses.map(c => (u.progress[c] || 0) / totalLessons(c) * 100)), 100]
  ];
  shell('profile', `<div class="stack">
    <div class="profile-head"><span class="av" style="background:var(--accent)">${esc(u.name[0].toUpperCase())}</span><div><h1>${esc(u.name)}</h1><p class="muted">Joined ${d.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</p>
      <div style="display:flex;gap:6px;margin-top:6px">${u.courses.map(c => flag(c)).join('')}</div></div></div>
    <h3>Statistics</h3>
    <div class="sgrid">
      <div class="sbox" style="color:var(--flame)">${ICON.flame}<div><b style="color:var(--ink)">${u.streak}</b><span>Day streak</span></div></div>
      <div class="sbox" style="color:var(--sun)">${ICON.bolt}<div><b style="color:var(--ink)">${u.xp}</b><span>Total XP</span></div></div>
      <div class="sbox"><span style="font-size:24px">${LEAGUES[tier][0]}</span><div><b>${LEAGUES[tier][1]}</b><span>Current league</span></div></div>
      <div class="sbox" style="color:var(--brand)">${ICON.check}<div><b style="color:var(--ink)">${u.lessons}</b><span>Lessons done</span></div></div>
    </div>
    <div class="rail-mobile">${streakCard(u)}</div>
    <div class="card"><h3>Achievements</h3>${ach.map(a => { const p = Math.min(100, Math.round(a[3] / a[4] * 100)); return `<div class="ach ${p < 100 ? 'lockd' : ''}"><div class="ai">${a[0]}</div><div class="ab"><b>${a[1]}</b><span>${a[2]}</span><div class="minibar"><i style="width:${p}%"></i><em>${Math.min(Math.round(a[3]), a[4])} / ${a[4]}</em></div></div></div>`; }).join('')}</div>
    <div class="card"><h3>Courses</h3>${COURSE_IDS.map(c => `<div class="setrow"><span style="display:flex;align-items:center;gap:12px">${flag(c)}<b>${C[c].name}</b></span><span style="display:flex;align-items:center;gap:12px"><span class="muted">${u.progress[c] != null ? Math.round(u.progress[c] / totalLessons(c) * 100) + '%' : ''}</span>${c === u.course ? '<span class="link">Learning</span>' : `<button class="btn ghost" style="min-height:38px;padding:0 14px;font-size:14px" onclick="A.setCourse('${c}')">${u.progress[c] != null ? 'Switch' : 'Add'}</button>`}</span></div>`).join('')}</div>
    <div class="card"><h3>Settings</h3>
      <div class="setrow"><span>Daily goal</span><select class="field" onchange="A.setGoal(this.value)">${GOALS.map((g, i) => `<option value="${i}" ${u.goal === i ? 'selected' : ''}>${g.label} · ${g.xp} XP</option>`).join('')}</select></div>
      <div class="setrow"><span>Sound effects</span><button class="switch ${prefs.sound ? 'on' : ''}" onclick="A.sound()" aria-label="Toggle sound"></button></div>
      <div class="setrow"><span>Email</span><span class="muted">${esc(u.email)}</span></div>
      <div class="setrow"><button class="btn ghost" onclick="A.logout()">Log out</button><button class="link" style="color:var(--bad)" onclick="A.del()">Delete account</button></div>
    </div>
  </div>`);
}

/* ---------------- Mata's idle life: blinks, glances, ear twitches, head tilts, pointer tracking ---------------- */
const mataReduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
function mataCls(m, c, ms) { m.classList.add(c); setTimeout(() => m.classList.remove(c), ms); }
function mataAll(c, ms) { if (!mataReduce) document.querySelectorAll('svg.mascot').forEach(m => mataCls(m, c, ms)); }
function mataBlink(m) { mataCls(m, 'blink', 140); if (Math.random() < .25) setTimeout(() => mataCls(m, 'blink', 120), 260); }
let mataPointer = 0;
if (!mataReduce) {
  (function tick() {
    document.querySelectorAll('svg.mascot').forEach(m => {
      if (Math.random() < .5) setTimeout(() => mataBlink(m), Math.random() * 900);
      if (Date.now() - mataPointer > 2500 && Math.random() < .35) { m.style.setProperty('--lx', (Math.random() * 6 - 3).toFixed(1) + 'px'); m.style.setProperty('--ly', (Math.random() * 4 - 2).toFixed(1) + 'px'); }
      if (Math.random() < .15) mataCls(m, 'twitch', 520);
      if (Math.random() < .1 && !m.classList.contains('m-sad')) mataCls(m, Math.random() < .5 ? 'tilt-l' : 'tilt-r', 1500);
    });
    setTimeout(tick, 1300 + Math.random() * 1500);
  })();
  document.addEventListener('pointermove', e => {
    mataPointer = Date.now();
    document.querySelectorAll('svg.mascot').forEach(m => {
      const b = m.getBoundingClientRect(); if (!b.width) return;
      const dx = e.clientX - (b.left + b.width / 2), dy = e.clientY - (b.top + b.height * .42), d = Math.hypot(dx, dy) || 1, k = Math.min(1, d / 250);
      m.style.setProperty('--lx', (dx / d * 3.2 * k).toFixed(2) + 'px'); m.style.setProperty('--ly', (dy / d * 2.6 * k).toFixed(2) + 'px');
    });
  }, { passive: true });
}
document.addEventListener('click', e => {
  const m = e.target.closest('svg.mascot'); if (!m) return;
  tone([[900, .06, 'sine', .07], [1400, .09, 'sine', .07]]);
  if (!mataReduce) { mataCls(m, 'poke', 600); mataBlink(m); }
});
function confetti() {
  const c = ['#0E8C8F', '#FF7F3F', '#FFB928', '#7A5AF8', '#2F80ED', '#F0465A'];
  return `<div class="confetti" aria-hidden="true">${[...Array(36)].map((_, i) => `<i style="left:${(Math.random() * 100).toFixed(1)}%;background:${c[i % 6]};animation-delay:${(Math.random() * .8).toFixed(2)}s;animation-duration:${(1.8 + Math.random() * 1.4).toFixed(2)}s;--r:${Math.round(Math.random() * 720 - 360)}deg;--x:${Math.round(Math.random() * 120 - 60)}px"></i>`).join('')}</div>`;
}

if ('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js').catch(() => { });
render();
