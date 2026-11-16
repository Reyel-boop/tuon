/* Mata, Tuon's guide: the man with the magnifying glass.
   Live character "Look" by ChienPham (rive/look.riv, Rive Marketplace, CC BY 4.0); changed for Tuon: the white background
   is transparent, the hair buns are hidden (short hair, so Mata is a man) and the shirt is red. mascot() in app.js writes <span class="mascot guide"><canvas></canvas></span>; this file finds those
   spans, plays the character in them and cleans up the ones that leave the page. Rive's layout bounds draw only
   his 424-unit square of the 528x465 artboard. rive/look.png is the still shown while he loads.
   The state machine has two inputs: "hover" (a surprised "oh!") and "press" (he pulls the glass in close). */
const GUIDE_CROP = {x: 66, y: -4, size: 424, w: 528, h: 465};
const GUIDES = new Set();
let guideBuf = null;
function guideFile(){
  return guideBuf || (guideBuf = heroLoadRive().then(() => fetch('rive/look.riv')).then(r => { if (!r.ok) throw 0; return r.arrayBuffer(); }).catch(e => { guideBuf = null; throw e; }));
}
function guideFit(g){
  const cv = g.cv, n = cv.clientWidth; if (!n) return;
  const N = Math.round(n * Math.min(2, window.devicePixelRatio || 1)); if (cv.width !== N) cv.width = cv.height = N;
  const k = N / GUIDE_CROP.size, x0 = -GUIDE_CROP.x * k, y0 = -GUIDE_CROP.y * k;
  g.r.layout = new rive.Layout({fit: rive.Fit.Fill, minX: x0, minY: y0, maxX: x0 + GUIDE_CROP.w * k, maxY: y0 + GUIDE_CROP.h * k});
  g.el.classList.add('live');
}
function guideInput(el, name, on){
  const g = el && el._guide; if (!g || !g.ok) return;
  try { const i = g.r.stateMachineInputs('State Machine 1').find(x => x.name === name); if (i) i.value = on; } catch (e) {}
}
// "press" or "hover" for a moment
function guidePulse(el, name, ms){ guideInput(el, name, true); setTimeout(() => guideInput(el, name, el.dataset.hold === name), ms); }
function guideMood(g){
  const el = g.el, m = el.dataset.mood;
  if (m === 'wow') { el.dataset.hold = 'hover'; guideInput(el, 'hover', true); }
  else if (m === 'cheer') { guidePulse(el, 'press', 900); setTimeout(() => guidePulse(el, 'press', 900), 1500); }
  else if (m === 'wave') { setTimeout(() => guidePulse(el, 'press', 1100), 500); }
}
function guideMount(el){
  if (el._guide) return; const cv = el.querySelector('canvas'); if (!cv) return;
  const g = el._guide = {el, cv};
  guideFile().then(buffer => {
    if (!el.isConnected) { el._guide = null; return; }
    g.r = new rive.Rive({buffer, canvas: cv, artboard: 'Main', stateMachines: 'State Machine 1', autoplay: true,
      onLoad: () => { g.ok = true; guideFit(g); guideMood(g); }});
    GUIDES.add(g);
    try { g.ro = new ResizeObserver(() => g.ok && guideFit(g)); g.ro.observe(cv); } catch (e) {}
  }).catch(() => { el._guide = null; });
}
function guideScan(){ document.querySelectorAll('.mascot.guide').forEach(el => { if (!el._guide && el.isConnected) guideMount(el); }); }
function guideSweep(){
  for (const g of GUIDES) if (!g.el.isConnected) { try { g.ro && g.ro.disconnect(); g.r.cleanup(); } catch (e) {} GUIDES.delete(g); }
}
let guideRaf = 0;
new MutationObserver(() => { if (!guideRaf) guideRaf = requestAnimationFrame(() => { guideRaf = 0; guideSweep(); guideScan(); }); })
  .observe(document.documentElement, {childList: true, subtree: true});
document.addEventListener('pointerover', e => { const m = e.target.closest && e.target.closest('.mascot.guide'); if (m && e.pointerType === 'mouse') guideInput(m, 'hover', true); });
document.addEventListener('pointerout', e => { const m = e.target.closest && e.target.closest('.mascot.guide'); if (m && !m.contains(e.relatedTarget)) guideInput(m, 'hover', m.dataset.hold === 'hover'); });
