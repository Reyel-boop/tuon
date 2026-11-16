/* Your hero: the character you play as on the lesson stages. It's one of ten characters from
   "StudioRun" by thelittlelabs (rive/studiorun.riv, Rive Marketplace, CC BY 4.0). The file draws them inside
   its own night-sky scene, so the hero is a framed portrait: Rive's layout bounds draw only the hero's
   380-unit square of the 1920x1080 game artboard into a small canvas. Tap the hero to choose another.
   Mata (girl.js) stays as Tuon's guide everywhere else. */
const HEROES = ['Painter', 'Planner', 'Coder', 'Designer', '3D Maker', 'Dreamweaver', 'Builder', 'Writer', 'Chef', 'Santa'];
const HERO_CROP = {x: 370, y: 630, size: 380, w: 1920, h: 1080};
let HERO = null, HERO_EL = null, heroRiveP = null;
(function heroFromUrl(){ try { const v = new URLSearchParams(location.search).get('hero'); if (v !== null && +v >= 0 && +v < 10) localStorage.setItem('tuon-hero', String(+v)); } catch (e) {} })();
function heroNo(){ try { const v = localStorage.getItem('tuon-hero'); if (v !== null && +v >= 0 && +v < 10) return +v; } catch (e) {} return 5; }
function heroLoadRive(){
  if (window.rive) return Promise.resolve();
  return heroRiveP || (heroRiveP = new Promise((ok, no) => { const s = document.createElement('script'); s.src = 'rive/rive.js';
    s.onload = () => { try { rive.RuntimeLoader.setWasmUrl('rive/rive.wasm'); ok(); } catch (e) { no(e); } }; s.onerror = no; document.head.appendChild(s); }));
}
function heroPick(){ try { const i = HERO && HERO.stateMachineInputs('STATE MACHINE').find(x => x.name === 'CHHH Selected'); if (i) i.value = heroNo(); } catch (e) {} }
function heroFit(){
  if (!HERO || !HERO_EL) return; const cv = HERO_EL.querySelector('canvas'), n = cv.clientWidth; if (!n) { if (cv.isConnected) setTimeout(heroFit, 200); return; }
  const N = Math.round(n * Math.min(2, window.devicePixelRatio || 1)); if (cv.width !== N) cv.width = cv.height = N;
  const k = N / HERO_CROP.size, x0 = -HERO_CROP.x * k, y0 = -HERO_CROP.y * k;
  HERO.layout = new rive.Layout({fit: rive.Fit.Fill, minX: x0, minY: y0, maxX: x0 + HERO_CROP.w * k, maxY: y0 + HERO_CROP.h * k}); HERO_EL.classList.add('live');
}
function heroMount(slot){
  if (!slot) return;
  if (!HERO_EL) {
    HERO_EL = document.createElement('button'); HERO_EL.type = 'button'; HERO_EL.className = 'herofr'; HERO_EL.setAttribute('aria-label', 'Your hero. Tap to choose another');
    HERO_EL.innerHTML = `<img src="rive/heroes/${heroNo()}.jpg" alt=""><canvas></canvas>`; HERO_EL.onclick = heroChooser;
    const cv = HERO_EL.querySelector('canvas'); slot.appendChild(HERO_EL);
    heroLoadRive().then(() => { HERO = new rive.Rive({src: 'rive/studiorun.riv', canvas: cv, artboard: 'Artboard', stateMachines: 'STATE MACHINE', autoplay: true,
      onLoad: () => { heroPick(); heroFit(); try { new ResizeObserver(() => heroFit()).observe(cv); } catch (e) {} }}); }).catch(() => {});
  } else { slot.appendChild(HERO_EL); requestAnimationFrame(heroFit); }
}
function heroSet(n){ try { localStorage.setItem('tuon-hero', String(n)); } catch (e) {} heroPick(); const img = HERO_EL && HERO_EL.querySelector('img'); if (img) img.src = 'rive/heroes/' + n + '.jpg'; }
function heroChooser(){
  modal(`<h2>Choose your hero</h2><p class="muted">Your hero jumps from lesson to lesson.</p><div class="heropickgrid">${HEROES.map((nm, n) =>
    `<button class="${n === heroNo() ? 'on' : ''}" onclick="heroSet(${n});closeModal()"><img src="rive/heroes/${n}.jpg" alt=""><span>${nm}</span></button>`).join('')}</div>
    <p class="muted" style="font-size:12px">Characters from <a href="https://rive.app/community/files/26133-49002-studiorun-a-cosmic-game-by-thelittlelabs/" target="_blank" rel="noopener">StudioRun by thelittlelabs</a> (CC BY 4.0)</p>
    <div class="acts"><button class="btn" onclick="closeModal()">Close</button></div>`);
}
