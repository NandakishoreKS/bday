// js/surprise.js — Envelope letter animation sequence
const initSurprise = () => {
  const openBtn  = document.getElementById('open-letter-btn');
  const overlay  = document.getElementById('letter-overlay');
  const closeBtn = document.getElementById('letter-close');
  const env      = document.getElementById('env');
  const lines    = document.querySelectorAll('.ll');
  const closing  = document.getElementById('letter-closing');
  const sign     = document.getElementById('letter-sign');

  if (!openBtn || !overlay) return;

  let sequenced = false;

  const open = () => {
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    if (!sequenced) {
      sequenced = true;
      runSequence();
    }
  };

  openBtn.addEventListener('touchstart', open, { passive: true });
  openBtn.addEventListener('click', open);

  const close = () => {
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };
  closeBtn.addEventListener('touchstart', close, { passive: true });
  closeBtn.addEventListener('click', close);

  // Tap outside letter content to close
  overlay.addEventListener('touchstart', (e) => {
    if (e.target === overlay) close();
  }, { passive: true });

  // ── SEQUENCE ──────────────────────────────────────────────
  const runSequence = () => {
    const letterContent = document.getElementById('letter-content');

    // t=0.4s: Open envelope flap
    setTimeout(() => env?.classList.add('opened'), 400);

    // t=1.1s: Show the letter card below envelope
    setTimeout(() => letterContent?.classList.add('show'), 1100);

    // Fire gentle confetti
    setTimeout(() => {
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.4 },
          colors: ['#E29595', '#FFFDF9', '#d4a0a0', '#f5ebe0'],
          gravity: 0.6, scalar: 0.8, ticks: 120,
        });
      }
    }, 900);

    // t=1.3s–2.5s: Letter lines appear one by one
    lines.forEach((line, i) => {
      setTimeout(() => line.classList.add('show'), 1300 + i * 280);
    });

    // After all lines
    const totalDelay = 1300 + lines.length * 280;
    setTimeout(() => closing?.classList.add('show'), totalDelay + 200);
    setTimeout(() => sign?.classList.add('show'),    totalDelay + 600);
  };
};
