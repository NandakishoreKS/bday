// surprise.js — Exact cake build timing + typewriter + confetti rain
const initSurprise = () => {
  const btn     = document.getElementById('surprise-btn');
  const overlay = document.getElementById('popup-overlay');
  const closeBtn = document.getElementById('popup-close');
  if (!btn || !overlay) return;

  let built = false;
  let confettiRAF = null;

  const open = () => {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    if (!built) { built = true; buildCake(); }
  };

  btn.addEventListener('touchstart', open, { passive: true });
  btn.addEventListener('click', open);

  const close = () => {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    if (confettiRAF) cancelAnimationFrame(confettiRAF);
    confettiRAF = null;
  };
  closeBtn.addEventListener('touchstart', close, { passive: true });
  closeBtn.addEventListener('click', close);

  // ── CAKE BUILD ──────────────────────────────────────────────
  const buildCake = () => {
    const tierBot = document.getElementById('tier-bot');
    const tierMid = document.getElementById('tier-mid');
    const tierTop = document.getElementById('tier-top');
    const dripsBot = document.getElementById('drips-bot');
    const dripsMid = document.getElementById('drips-mid');
    const dripsTop = document.getElementById('drips-top');
    const candlesRow = document.getElementById('candles-row');
    const candles   = [document.getElementById('c1'), document.getElementById('c2'), document.getElementById('c3')];
    const flames    = [document.getElementById('f1'), document.getElementById('f2'), document.getElementById('f3')];
    const sparkRings = [document.getElementById('sr1'), document.getElementById('sr2'), document.getElementById('sr3')];
    const cakeGlow   = document.getElementById('cake-glow');

    // t=0.0 bottom tier
    setTimeout(() => { tierBot.classList.add('rise'); }, 0);

    // t=0.3 bottom drips
    setTimeout(() => {
      dripsBot.style.opacity = '1';
      dripsBot.classList.add('dripping');
    }, 300);

    // t=0.5 middle tier
    setTimeout(() => { tierMid.classList.add('rise'); }, 500);

    // t=0.7 middle drips
    setTimeout(() => {
      dripsMid.style.opacity = '1';
      dripsMid.classList.add('dripping');
    }, 700);

    // t=0.9 top tier
    setTimeout(() => { tierTop.classList.add('rise'); }, 900);

    // t=1.1 top drips
    setTimeout(() => {
      dripsTop.style.opacity = '1';
      dripsTop.classList.add('dripping');
    }, 1100);

    // t=1.2 candles (staggered 100ms each)
    setTimeout(() => {
      candlesRow.style.opacity = '1';
      candles.forEach((c, i) => {
        setTimeout(() => c.classList.add('rise'), i * 100);
      });
    }, 1200);

    // t=1.4 flames
    setTimeout(() => {
      flames.forEach((f, i) => {
        setTimeout(() => f.classList.add('lit'), i * 80);
      });
    }, 1400);

    // t=1.5 sparkles burst from each candle
    setTimeout(() => {
      sparkRings.forEach(ring => burstSparkles(ring));
    }, 1500);

    // t=1.7 cake glow pulses in
    setTimeout(() => {
      if (cakeGlow) cakeGlow.classList.add('pulse');
    }, 1700);

    // t=2.0 after cake built → confetti rain, typewriter, then photo
    setTimeout(() => {
      startConfettiRain();
      startTypewriter();
    }, 2000);
  };

  // ── SPARKLE BURST ────────────────────────────────────────────
  const burstSparkles = (ring) => {
    const colors = ['#ffb6c1', '#c9a96e', '#fff0c0', '#ff4d8f'];
    for (let i = 0; i < 8; i++) {
      const dot = document.createElement('div');
      dot.className = 'sparkle-dot';
      dot.style.setProperty('--angle', `${i * 45}deg`);
      dot.style.background = colors[i % colors.length];
      ring.appendChild(dot);
      setTimeout(() => dot.classList.add('burst'), i * 60);
      setTimeout(() => dot.remove(), 700 + i * 60);
    }
  };

  // ── CONFETTI RAIN (4 seconds) ────────────────────────────────
  const startConfettiRain = () => {
    if (typeof confetti !== 'function') return;
    const end = Date.now() + 4000;
    const opts = { particleCount: 4, spread: 50, colors: ['#ffb6c1','#c9a96e','#fff0c0','#ff4d8f','#fff'] };
    const frame = () => {
      confetti({ ...opts, angle: 60,  origin: { x: 0,   y: 0 } });
      confetti({ ...opts, angle: 120, origin: { x: 1,   y: 0 } });
      if (Date.now() < end) confettiRAF = requestAnimationFrame(frame);
    };
    confettiRAF = requestAnimationFrame(frame);
  };

  // ── TYPEWRITER ────────────────────────────────────────────────
  const startTypewriter = () => {
    const reveal  = document.getElementById('popup-reveal');
    const twText  = document.getElementById('tw-text');
    const twCursor = document.getElementById('tw-cursor');
    const msgLines = document.querySelectorAll('.pm-line');
    const bHearts  = document.querySelectorAll('.b-heart');
    const closeBtn = document.getElementById('popup-close');

    if (!reveal) return;

    const txt = "Happy Birthday Jiya ❤️";
    let i = 0;
    const type = setInterval(() => {
      if (i < txt.length) {
        twText.textContent += txt[i++];
      } else {
        clearInterval(type);
        twCursor.style.display = 'none';
        // Show photo + message
        setTimeout(() => {
          reveal.classList.add('show');
          closeBtn.classList.add('show');
          msgLines.forEach((line, idx) => {
            setTimeout(() => line.classList.add('reveal'), idx * 300);
          });
          // Bottom hearts
          setTimeout(() => {
            bHearts.forEach(h => h.classList.add('show'));
          }, msgLines.length * 300 + 400);
        }, 400);
      }
    }, 80);
  };
};
