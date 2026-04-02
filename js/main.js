// js/main.js — AOS init, hero fade sequence, audio, scroll
document.addEventListener('DOMContentLoaded', () => {

  // ── AOS ──────────────────────────────────────────────────
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 900,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60,
    });
  }

  // ── INIT MODULES ─────────────────────────────────────────
  if (typeof Particles    !== 'undefined') new Particles();
  if (typeof initGallery  === 'function')  initGallery();
  if (typeof initSurprise === 'function')  initSurprise();

  // ── HERO FADE-IN SEQUENCE ─────────────────────────────────
  const delays = {
    'hero-eyebrow': 300,
    'hero-heading':  700,
    'hero-sub':     1200,
    'enter-btn':    1600
  };

  // Simpler: stagger via .fade-in-N classes
  const fi = [
    document.querySelector('.fade-in-1'),
    document.querySelector('.fade-in-2'),
    document.querySelector('.fade-in-3'),
    document.querySelector('.fade-in-4'),
    document.querySelector('.fade-in-5'),
  ];
  const staggerMs = [200, 600, 1000, 1400, 1800];
  fi.forEach((el, i) => {
    if (el) setTimeout(() => el.classList.add('vis'), staggerMs[i]);
  });

  // Show music button
  setTimeout(() => document.getElementById('music-btn')?.classList.add('ready'), 2200);

  // ── "ENTER OUR STORY" SMOOTH SCROLL ───────────────────────
  const enterBtn = document.getElementById('enter-btn');
  if (enterBtn) {
    const scroll = () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    enterBtn.addEventListener('touchstart', scroll, { passive: true });
    enterBtn.addEventListener('click', scroll);
  }

  // ── AUDIO ─────────────────────────────────────────────────
  const audio  = document.getElementById('bgmusic');
  const btn    = document.getElementById('music-btn');
  let playing  = false;
  let unlocked = false;

  const tryUnlock = () => {
    if (unlocked || !audio) return;
    audio.play()
      .then(() => { unlocked = true; playing = true; btn?.classList.remove('muted'); })
      .catch(() => {});
  };
  document.addEventListener('touchstart', tryUnlock, { once: true, passive: true });
  document.addEventListener('click', tryUnlock, { once: true });

  if (btn && audio) {
    const toggle = (e) => {
      e.stopPropagation();
      if (playing) {
        audio.pause();
        btn.classList.add('muted');
      } else {
        audio.play().catch(() => {});
        btn.classList.remove('muted');
      }
      playing = !playing;
      unlocked = true;
    };
    btn.addEventListener('touchstart', toggle, { passive: true });
    btn.addEventListener('click', toggle);
  }
});
