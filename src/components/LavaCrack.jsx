/**
 * LavaCrack â€” image-based lava reveal overlay. NO procedural cracks.
 *
 * The existing /bg/lavabg.webp is the ONLY crack source. Four fixed divs
 * share that one cached image (no canvas, no geometry, no drawing):
 *
 * â€¢ Normal:  .lava-base shows the image at 0.028 â€” a dark dark-gray page
 *            with barely-visible magma threads.
 * â€¢ Hover:   mousemove only writes --mx/--my (the mask position) and toggles
 *            .is-on. CSS reveals the image inside a wide soft radial gradient
 *            (--mr 320px, peak 0.5) â€” the circle itself is invisible: the
 *            image's black rock is a no-op under the wrapper's screen blend,
 *            only its orange cracks brighten, clearly visible around cursor.
 *            Nothing is ever generated or moved.
 * â€¢ Click:   an invisible expanding wave (pooled mask layers) sweeps across
 *            the SAME fixed image; only the region it crosses is revealed,
 *            slow steady sweep at constant speed, fading back to normal at 3400ms. Max 2 simultaneous waves.
 *
 * Performance: mousemove touches two custom properties on one element; the
 * rAF loop exists only while a wave is animating and stops completely when
 * idle. All listeners are passive â€” links, forms, nav and scrolling keep
 * working. Mobile: no hover; a tap spawns the same wave (drag/long-press
 * do not).
 */

import { useEffect, useRef } from 'react';
import './LavaCrack.css';

const REVEAL = 0.5; // click-wave peak opacity â€” matches the stronger hover reveal
const MAX_WAVES = 2; // pooled .lava-wave layers â€” never hundreds of nodes
const WAVE_MS = 3400; // full timeline: slow wide reveal -> steady travel -> fade -> normal
const R0 = 26; // wavefront radius at 0ms (reveals right at the click point)
const BAND0 = 150; // reveal band half-width at 0ms (wide wave)
const BAND_GROW = 110; // band widens slightly as the wave travels
const EXPAND_MS = 2800; // linear travel time — steady slow speed to the edges
const TAP_SLOP = 12; // px of movement still counted as a tap, not a drag
const TAP_MS = 600; // taps longer than this are long-presses, not clicks

/* Envelope (ms â†’ strength): reveals at the click point immediately, full
   while expanding, fades through 1200â€“1800ms, silent at 1800ms. */
const WT = [0, 200, 700, 1300, 2000, 2800, 3400];
const WV = [0.35, 0.75, 1, 1, 0.9, 0.45, 0];

function waveEnv(t) {
  if (t <= 0) return WV[0];
  if (t >= WAVE_MS) return 0;
  let i = 1;
  while (i < WT.length - 1 && t > WT[i]) i++;
  return WV[i - 1] + ((WV[i] - WV[i - 1]) * (t - WT[i - 1])) / (WT[i] - WT[i - 1]);
}

export default function LavaCrack() {
  const hoverRef = useRef(null);
  const waveRefs = useRef([]);
  const wavesRef = useRef([]); // active: { el, t0, maxR }

  useEffect(() => {
    const hover = hoverRef.current;
    if (!hover) return undefined;
    // Copy ref values up front so the cleanup never reads .current directly
    const waves = wavesRef.current;
    const layers = waveRefs.current;
    let raf = 0;
    const canHover =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    let disposed = false;
    let idleTimer = 0; // cursor-stopped timer -> slow fade, never an abrupt cut
    const IDLE_MS = 350; // stop moving this long -> reveal fades out slowly

    /* Animates only the wave layers: mask radius/band + opacity per frame.
       Runs strictly while a wave is alive, then stops until the next input. */
    const frame = () => {
      raf = 0;
      if (disposed) return;
      const now = performance.now();
      for (let i = waves.length - 1; i >= 0; i--) {
        const w = waves[i];
        const age = now - w.t0;
        if (age >= WAVE_MS) {
          w.el.style.opacity = '0';
          waves.splice(i, 1);
          continue;
        }
        const p = Math.min(1, age / EXPAND_MS);
        const eased = p; // linear — constant slow speed (ease-out would burst fast at start)
        const r = R0 + (w.maxR - R0) * eased;
        const band = BAND0 + BAND_GROW * p;
        w.el.style.setProperty('--wr', `${r.toFixed(1)}px`);
        w.el.style.setProperty('--wi', `${Math.max(0, r - band).toFixed(1)}px`);
        w.el.style.setProperty('--wo', `${(r + band).toFixed(1)}px`);
        w.el.style.opacity = (waveEnv(age) * REVEAL).toFixed(3);
      }
      if (waves.length) raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (!raf && !disposed) raf = requestAnimationFrame(frame);
    };

    /* Hover: only mask coordinates + a class. The image itself never moves,
       no crack is created, nothing is recomputed â€” CSS does the revealing. */
    const armIdleFade = () => {
      if (idleTimer) clearTimeout(idleTimer); // moving -> stay revealed
      idleTimer = setTimeout(() => {
        idleTimer = 0;
        if (!disposed) hover.classList.remove('is-on'); // stopped -> slow CSS fade
      }, IDLE_MS);
    };
    const onMove = (e) => {
      if (!canHover) return;
      hover.style.setProperty('--mx', `${e.clientX}px`);
      hover.style.setProperty('--my', `${e.clientY}px`);
      if (!hover.classList.contains('is-on')) hover.classList.add('is-on');
      armIdleFade(); // restart the stop-timer on every move
    };
    const onLeave = () => {
      if (idleTimer) {
        clearTimeout(idleTimer);
        idleTimer = 0;
      }
      hover.classList.remove('is-on'); // slow CSS fade back to invisible
    };

    /* Click: ONE invisible expanding wave through the EXISTING image. */
    const spawnWave = (x, y) => {
      let el = null;
      for (let i = 0; i < layers.length; i++) {
        const cand = layers[i];
        if (cand && !waves.some((w) => w.el === cand)) {
          el = cand;
          break;
        }
      }
      if (!el && waves.length) {
        const oldest = waves.shift(); // pool busy â†’ recycle the oldest wave
        oldest.el.style.opacity = '0';
        el = oldest.el;
      }
      if (!el) return;
      waves.push({
        el,
        t0: performance.now(),
        // 60â€“80% of the viewport diagonal
        maxR: Math.hypot(window.innerWidth, window.innerHeight) * (0.6 + Math.random() * 0.2),
      });
      el.style.setProperty('--wx', `${x}px`);
      el.style.setProperty('--wy', `${y}px`);
      el.style.setProperty('--wi', '0px');
      el.style.setProperty('--wr', `${R0}px`);
      el.style.setProperty('--wo', `${R0 + BAND0}px`);
      el.style.opacity = (waveEnv(0) * REVEAL).toFixed(3);
      start();
    };

    /* Passive â€” never preventDefault/stopPropagation, so buttons, links,
       nav, forms and scrolling behave exactly as before. */
    const onDown = (e) => {
      if (e.pointerType === 'touch' || e.button) return; // touch handled below
      spawnWave(e.clientX, e.clientY);
    };

    /* Mobile: a tap = the same wave; a drag/scroll or long-press does not. */
    let touchX = 0;
    let touchY = 0;
    let touchAt = 0;
    const onTouchStart = (e) => {
      if (!e.touches || !e.touches.length) return;
      touchX = e.touches[0].clientX;
      touchY = e.touches[0].clientY;
      touchAt = performance.now();
    };
    const onTouchEnd = (e) => {
      if (!e.changedTouches || !e.changedTouches.length) return;
      const t = e.changedTouches[0];
      if (Math.hypot(t.clientX - touchX, t.clientY - touchY) > TAP_SLOP) return;
      if (performance.now() - touchAt > TAP_MS) return;
      spawnWave(t.clientX, t.clientY);
    };

    const onVis = () => {
      if (!document.hidden) return;
      for (const w of waves) w.el.style.opacity = '0';
      waves.length = 0;
      hover.classList.remove('is-on');
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    document.addEventListener('mouseleave', onLeave, { passive: true });
    window.addEventListener('blur', onLeave, { passive: true });
    document.addEventListener('visibilitychange', onVis);

    return () => {
      disposed = true;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      for (const w of waves) w.el.style.opacity = '0';
      waves.length = 0;
      hover.classList.remove('is-on');
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
      document.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('blur', onLeave);
      if (idleTimer) clearTimeout(idleTimer);
      document.removeEventListener('visibilitychange', onVis);
    };
  }, []);

  return (
    <div className="lava-background" aria-hidden="true">
      <div className="lava-base" />
      <div className="lava-hover" ref={hoverRef} />
      {Array.from({ length: MAX_WAVES }, (_, i) => (
        <div
          key={i}
          className="lava-wave"
          ref={(el) => {
            waveRefs.current[i] = el;
          }}
        />
      ))}
    </div>
  );
}

