/* The welcome post: a full-screen page on the lessons page each time a learner opens Tuon (once per
   browser visit), with their reminders (streak, daily goal, hearts, mistakes, next lesson) on top and
   "What's new in Tuon" below. Closes with ✕, "Got it!" or Escape. Brand-new learners (who just made
   a profile) don't see it. "🎉 What's new" in Settings opens it again.
   To announce an update, change TUON_NEWS. */
const TUON_NEWS = {
  id: '2026-11-17', date: 'November 17, 2026',
  items: [
    { icon: '🔎', title: 'Meet the new Mata', text: 'Your guide is now a sharp-eyed guy with a magnifying glass. He blinks, looks surprised when you point at him, and zooms in when you tap him.' },
    { icon: '🦸', title: 'Your hero runs the stages', text: 'A hero jumps from lesson to lesson on your path. Tap your hero to choose one of 10 characters.', act: 'hero', cta: 'Choose my hero' },
    { icon: '🛠️', title: 'Smoother lessons', text: 'Tapping fast at the end of a lesson no longer freezes it.' },
    { icon: '🏫', title: 'Inside the School Hub', text: 'Signing out of Tuon in the School Hub now takes you back to Reyel, ready for the next learner.' },
  ],
};

// once per browser visit (sessionStorage) and learner
function newsKey() { const u = me(); return 'tuon-opened:' + (u ? (u.email || u.name) : 'guest'); }
function newsSeen() { try { return sessionStorage.getItem(newsKey()) === '1'; } catch (e) { return true; } }
function newsMark() { try { sessionStorage.setItem(newsKey(), '1'); } catch (e) {} }

// the learner's reminders: streak, today's goal, hearts, mistakes to review, next lesson
function tuonReminders(u) {
  const out = [], cid = u.course, front = u.progress[cid] || 0, xp = (u.daily[today()] || {}).xp || 0, goal = goalXp(u);
  if (u.lastActive !== today()) out.push(u.streak > 0
    ? { icon: '🔥', text: `Do one lesson today to keep your ${u.streak}-day streak!`, act: 'learn', urgent: true }
    : { icon: '🔥', text: 'Start a streak: finish one lesson today!', act: 'learn' });
  else out.push({ icon: '🔥', text: `${u.streak}-day streak! You already practiced today. 🎉` });
  out.push(xp < goal ? { icon: '🎯', text: `Today's goal: ${xp} of ${goal} XP.`, act: 'learn' } : { icon: '🎯', text: `Daily goal done: ${xp} XP today!` });
  if ((u.hearts ?? MAX_HEARTS) < MAX_HEARTS) out.push({ icon: '❤️', text: `You have ${u.hearts} of ${MAX_HEARTS} hearts. Practice earns hearts back.`, act: 'practice' });
  if ((u.mistakes || []).length) out.push({ icon: '🔁', text: `Review your ${u.mistakes.length} recent mistake${u.mistakes.length === 1 ? '' : 's'} in Practice.`, act: 'practice' });
  if (C[cid] && front < totalLessons(cid)) out.push({ icon: '📘', text: `Next in ${C[cid].name}: Unit ${Math.floor(front / LPU) + 1} · ${lessonTitle(front % LPU, cid, Math.floor(front / LPU))}.`, act: 'learn' });
  return out;
}

function closeWhatsNew() {
  newsMark(); const el = document.getElementById('tnews'); if (el) el.remove();
  document.removeEventListener('keydown', newsKeyClose); document.body.style.overflow = '';
}
function newsKeyClose(e) { if (e.key === 'Escape') closeWhatsNew(); }

function showWhatsNew() {
  const u = me(); if (!u) return;
  const old = document.getElementById('tnews'); if (old) old.remove();
  const first = String(u.name || '').split(/\s+/)[0] || 'there';
  const el = document.createElement('div'); el.id = 'tnews'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-modal', 'true'); el.setAttribute('aria-labelledby', 'tnewsT');
  const rem = tuonReminders(u); window.__tnRem = rem;
  const day = new Date().toLocaleDateString('en-PH', { weekday: 'long', month: 'long', day: 'numeric' });
  el.innerHTML = `<button class="tnx" aria-label="Close" onclick="closeWhatsNew()">✕</button>
    <div class="tnhead"><div class="tnpop" aria-hidden="true">👋</div><small>${esc(day)}</small>
      <h1 id="tnewsT">Welcome back, ${esc(first)}!</h1><p>Here are your reminders and what's new in Tuon.</p></div>
    <div class="tnrem"><div><h2>🔔 Your reminders</h2><ul>${rem.map((r, i) => `<li>${r.act
        ? `<button class="tnri ${r.urgent ? 'urgent' : ''}" onclick="remAct(${i})"><span aria-hidden="true">${r.icon}</span><span class="tx">${esc(r.text)}</span><span class="op">Go →</span></button>`
        : `<div class="tnri"><span aria-hidden="true">${r.icon}</span><span class="tx">${esc(r.text)}</span></div>`}</li>`).join('')}</ul></div></div>
    <h2 class="tnh2">🎉 What's new in Tuon <small>· ${esc(TUON_NEWS.date)}</small></h2>
    <div class="tngrid after">${TUON_NEWS.items.map((it, i) => `<article class="tncard"><div class="tnico" aria-hidden="true">${it.icon}</div><div>
      <h2>${esc(it.title)}</h2><p>${esc(it.text)}</p>${it.act ? `<button class="tngo" onclick="newsAct(${i})">${esc(it.cta || 'Try it')} →</button>` : ''}</div></article>`).join('')}</div>
    <div class="tnfoot"><button class="btn primary" onclick="closeWhatsNew()">Got it!</button><small>This opens each time you open Tuon. See it again anytime in Settings → “🎉 What's new”.</small></div>`;
  document.body.appendChild(el); document.body.style.overflow = 'hidden'; document.addEventListener('keydown', newsKeyClose);
}
function remAct(i) { const r = (window.__tnRem || [])[i]; closeWhatsNew(); if (r && r.act === 'practice') go('#/practice'); }
function newsAct(i) { const it = TUON_NEWS.items[i]; closeWhatsNew(); if (it.act === 'hero' && typeof heroChooser === 'function') heroChooser(); }
// called from the lessons page: show once per update (not on a learner's very first visit)
function whatsNewCheck(firstVisit) { if (firstVisit) return newsMark(); if (!newsSeen()) setTimeout(showWhatsNew, 600); }
