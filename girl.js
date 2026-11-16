/* Mata, Tuon's guide: the girl with the magnifying glass.
   Live character "Look" by ChienPham (rive/look.riv, Rive Marketplace, CC BY 4.0); its white background was made
   transparent. mascot() in app.js writes <span class="mascot girl"><canvas></canvas></span>; this file finds those
   spans, plays the character in them and cleans up the ones that leave the page. Rive's layout bounds draw only
   her 424-unit square of the 528x465 artboard. rive/look.png is the still shown while she loads.
   The state machine has two inputs: "hover" (a surprised "oh!") and "press" (she pulls the glass in close). */
const GIRL_CROP = {x: 66, y: -4, size: 424, w: 528, h: 465};
const GIRLS = new Set();
let girlBuf = null;
function girlFile(){
  return girlBuf || (girlBuf = heroLoadRive().then(() => fetch('rive/look.riv')).then(r => { if (!r.ok) throw 0; return r.arrayBuffer(); }).catch(e => { girlBuf = null; throw e; }));
}
function girlFit(g){
  const cv = g.cv, n = cv.clientWidth; if (!n) return;
  const N = Math.round(n * Math.min(2, window.devicePixelRatio || 1)); if (cv.width !== N) cv.width = cv.height = N;
  const k = N / GIRL_CROP.size, x0 = -GIRL_CROP.x * k, y0 = -GIRL_CROP.y * k;
  g.r.layout = new rive.Layout({fit: rive.Fit.Fill, minX: x0, minY: y0, maxX: x0 + GIRL_CROP.w * k, maxY: y0 + GIRL_CROP.h * k});
  g.el.classList.add('live');
}
function girlInput(el, name, on){
  const g = el && el._girl; if (!g || !g.ok) return;
  try { const i = g.r.stateMachineInputs('State Machine 1').find(x => x.name === name); if (i) i.value = on; } catch (e) {}
}
// "press" or "hover" for a moment
function girlPulse(el, name, ms){ girlInput(el, name, true); setTimeout(() => girlInput(el, name, el.dataset.hold === name), ms); }
function girlMood(g){
  const el = g.el, m = el.dataset.mood;
  if (m === 'wow') { el.dataset.hold = 'hover'; girlInput(el, 'hover', true); }
  else if (m === 'cheer') { girlPulse(el, 'press', 900); setTimeout(() => girlPulse(el, 'press', 900), 1500); }
  else if (m === 'wave') { setTimeout(() => girlPulse(el, 'press', 1100), 500); }
}
function girlMount(el){
  if (el._girl) return; const cv = el.querySelector('canvas'); if (!cv) return;
  const g = el._girl = {el, cv};
  girlFile().then(buffer => {
    if (!el.isConnected) { el._girl = null; return; }
    g.r = new rive.Rive({buffer, canvas: cv, artboard: 'Main', stateMachines: 'State Machine 1', autoplay: true,
      onLoad: () => { g.ok = true; girlFit(g); girlMood(g); }});
    GIRLS.add(g);
    try { g.ro = new ResizeObserver(() => g.ok && girlFit(g)); g.ro.observe(cv); } catch (e) {}
  }).catch(() => { el._girl = null; });
}
function girlScan(){ document.querySelectorAll('.mascot.girl').forEach(el => { if (!el._girl && el.isConnected) girlMount(el); }); }
function girlSweep(){
  for (const g of GIRLS) if (!g.el.isConnected) { try { g.ro && g.ro.disconnect(); g.r.cleanup(); } catch (e) {} GIRLS.delete(g); }
}
let girlRaf = 0;
new MutationObserver(() => { if (!girlRaf) girlRaf = requestAnimationFrame(() => { girlRaf = 0; girlSweep(); girlScan(); }); })
  .observe(document.documentElement, {childList: true, subtree: true});
document.addEventListener('pointerover', e => { const m = e.target.closest && e.target.closest('.mascot.girl'); if (m && e.pointerType === 'mouse') girlInput(m, 'hover', true); });
document.addEventListener('pointerout', e => { const m = e.target.closest && e.target.closest('.mascot.girl'); if (m && !m.contains(e.relatedTarget)) girlInput(m, 'hover', m.dataset.hold === 'hover'); });
