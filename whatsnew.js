/* "What's new in Tuon": a full-screen post shown once after each update, on the lessons page.
   Closes with ✕, "Got it!" or Escape; remembered per learner in this browser. Brand-new learners
   (who just made a profile) don't see it. "🎉 What's new" in Settings opens it again.
   To announce an update, change TUON_NEWS (a new id shows it to everyone once more). */
const TUON_NEWS = {
  id: '2026-11-17', date: 'November 17, 2026',
  items: [
    { icon: '🔎', title: 'Meet the new Mata', text: 'Your guide is now a sharp-eyed guy with a magnifying glass. He blinks, looks surprised when you point at him, and zooms in when you tap him.' },
    { icon: '🦸', title: 'Your hero runs the stages', text: 'A hero jumps from lesson to lesson on your path. Tap your hero to choose one of 10 characters.', act: 'hero', cta: 'Choose my hero' },
    { icon: '🛠️', title: 'Smoother lessons', text: 'Tapping fast at the end of a lesson no longer freezes it.' },
    { icon: '🏫', title: 'Inside the School Hub', text: 'Signing out of Tuon in the School Hub now takes you back to Reyel, ready for the next learner.' },
  ],
};

function newsKey() { const u = me(); return 'tuon-whats-new:' + (u ? (u.email || u.name) : 'guest'); }
function newsSeen() { try { return localStorage.getItem(newsKey()) === TUON_NEWS.id; } catch (e) { return true; } }
function newsMark() { try { localStorage.setItem(newsKey(), TUON_NEWS.id); } catch (e) {} }

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
  el.innerHTML = `<button class="tnx" aria-label="Close" onclick="closeWhatsNew()">✕</button>
    <div class="tnhead"><div class="tnpop" aria-hidden="true">🎉</div><small>Update · ${esc(TUON_NEWS.date)}</small>
      <h1 id="tnewsT">What's new in Tuon</h1><p>Hi ${esc(first)}! Here's what changed. Tap a button to try it, or close this to keep learning.</p></div>
    <div class="tngrid">${TUON_NEWS.items.map((it, i) => `<article class="tncard"><div class="tnico" aria-hidden="true">${it.icon}</div><div>
      <h2>${esc(it.title)}</h2><p>${esc(it.text)}</p>${it.act ? `<button class="tngo" onclick="newsAct(${i})">${esc(it.cta || 'Try it')} →</button>` : ''}</div></article>`).join('')}</div>
    <div class="tnfoot"><button class="btn primary" onclick="closeWhatsNew()">Got it!</button><small>Open this again anytime in Settings → “🎉 What's new”.</small></div>`;
  document.body.appendChild(el); document.body.style.overflow = 'hidden'; document.addEventListener('keydown', newsKeyClose);
}
function newsAct(i) { const it = TUON_NEWS.items[i]; closeWhatsNew(); if (it.act === 'hero' && typeof heroChooser === 'function') heroChooser(); }
// called from the lessons page: show once per update (not on a learner's very first visit)
function whatsNewCheck(firstVisit) { if (firstVisit) return newsMark(); if (!newsSeen()) setTimeout(showWhatsNew, 600); }
