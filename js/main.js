// main.js — Hero entrance, special memory, audio unlock, scroll init
document.addEventListener('DOMContentLoaded', () => {

  // ── INITIALIZE MODULES ─────────────────────────────────────
  if (typeof Particles       !== 'undefined') new Particles();
  if (typeof initTimeline    === 'function')  initTimeline();
  if (typeof initGallery     === 'function')  initGallery();
  if (typeof initConfetti    === 'function')  initConfetti();
  if (typeof initSurprise    === 'function')  initSurprise();

  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 700, once: true, easing: 'ease-out-cubic' });
  }

  // ── HERO ENTRANCE SEQUENCE ─────────────────────────────────
  const glow       = document.getElementById('hero-glow');
  const heartsWrap = document.getElementById('hero-hearts');
  const words      = document.querySelectorAll('.hero-word');
  const heroName   = document.getElementById('hero-name');
  const subtitle   = document.getElementById('hero-subtitle');
  const ctaBtn     = document.getElementById('scroll-down-btn');
  const musicBtn   = document.getElementById('music-btn');

  // t=0.3s glowing dot appears + expands
  setTimeout(() => {
    if (glow) glow.classList.add('burst');
  }, 300);

  // t=0.8s  25 DOM hearts spawn from center, float outward
  setTimeout(() => {
    spawnHeroHearts(heartsWrap);
  }, 800);

  // t=1.2s "Happy Birthday" word-by-word blur→clear
  words.forEach((w, i) => {
    setTimeout(() => w.classList.add('reveal'), 1200 + i * 200);
  });

  // t=1.8s "Jiya ❤️" letterSpacing wide→normal + pink glow
  setTimeout(() => {
    if (heroName) heroName.classList.add('reveal');
  }, 1800);

  // t=2.4s subtitle fades in
  setTimeout(() => {
    if (subtitle) subtitle.classList.add('reveal');
  }, 2400);

  // t=2.8s CTA button bounces up
  setTimeout(() => {
    if (ctaBtn) ctaBtn.classList.add('show');
  }, 2800);

  // Show music button
  setTimeout(() => {
    if (musicBtn) musicBtn.classList.add('visible');
  }, 3000);

  // CTA smooth scroll
  if (ctaBtn) {
    const scrollTo = () => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    ctaBtn.addEventListener('touchstart', scrollTo, { passive: true });
    ctaBtn.addEventListener('click', scrollTo);
  }

  // ── SPECIAL MEMORY TYPEWRITER ──────────────────────────────
  initSpecialMemory();

  // ── AUDIO UNLOCK ──────────────────────────────────────────
  initAudio();
});

// ── DOM HEART EXPLOSION ──────────────────────────────────────
const spawnHeroHearts = (container) => {
  if (!container) return;
  const N = 25;
  const cx = window.innerWidth  / 2;
  const cy = window.innerHeight / 2;
  const colors = ['♥'];

  for (let i = 0; i < N; i++) {
    const h = document.createElement('div');
    h.className = 'dom-heart';
    h.textContent = '♥';
    const angle  = (i / N) * Math.PI * 2;
    const dist1  = 30 + Math.random() * 40;
    const dist2  = 80 + Math.random() * 120;
    const tx  = Math.cos(angle) * dist1;
    const ty  = Math.sin(angle) * dist1;
    const tx2 = Math.cos(angle) * dist2;
    const ty2 = Math.sin(angle) * dist2 - 60; // drift up

    h.style.left        = cx + 'px';
    h.style.top         = cy + 'px';
    h.style.fontSize    = (0.7 + Math.random() * 0.8) + 'rem';
    h.style.color       = ['#ffb6c1','#c9a96e','#ff4d8f'][i % 3];
    h.style.setProperty('--tx',  tx  + 'px');
    h.style.setProperty('--ty',  ty  + 'px');
    h.style.setProperty('--tx2', tx2 + 'px');
    h.style.setProperty('--ty2', ty2 + 'px');
    h.style.animationDelay    = (i * 30) + 'ms';
    h.style.animationDuration = (1.2 + Math.random() * 0.6) + 's';
    h.style.animationName     = 'heartFloat';
    h.style.animationFillMode = 'forwards';
    h.style.animationTimingFunction = 'ease-out';

    container.appendChild(h);
    setTimeout(() => h.remove(), 2500);
  }
};

// ── SPECIAL MEMORY TYPEWRITER (triggered on scroll) ──────────
const initSpecialMemory = () => {
  const section    = document.getElementById('special');
  const target     = document.getElementById('memory-text');
  const memHeart   = document.getElementById('memory-heart');
  const envelope   = document.getElementById('envelope-icon');
  if (!section || !target) return;

  const text = "I still remember the day of the entrance exam. The stress, the tension — and amidst it all, you were my calm. We sat together flipping through pages, but all I could focus on was how cute you looked when you were deeply concentrated. In a room full of people worried about their futures, I realized my future was sitting right next to me.";
  let started = false;

  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !started) {
      started = true;
      obs.disconnect();

      // Envelope opens
      if (envelope) envelope.style.animation = 'envelopeOpen 1s ease forwards';

      // Typewriter at 25ms/char
      let i = 0;
      const cursor = document.createElement('span');
      cursor.className = 'typewriter-cursor';
      target.appendChild(cursor);

      const interval = setInterval(() => {
        if (i < text.length) {
          cursor.insertAdjacentText('beforebegin', text[i++]);
        } else {
          clearInterval(interval);
          cursor.remove();
          // Heart bounces in at the end
          if (memHeart) {
            memHeart.classList.remove('hidden');
            memHeart.classList.add('bounce');
          }
        }
      }, 25);
    }
  }, { threshold: 0.4 });

  obs.observe(section);
};

// ── AUDIO ─────────────────────────────────────────────────────
const initAudio = () => {
  const audio    = document.getElementById('bgmusic');
  const btn      = document.getElementById('music-btn');
  const vinyl    = btn?.querySelector('.vinyl-svg');
  let playing    = false;
  let unlocked   = false;

  const tryPlay = () => {
    if (!unlocked && audio) {
      audio.play()
        .then(() => { unlocked = true; playing = true; vinyl?.classList.add('spinning'); })
        .catch(() => {});
    }
  };

  document.addEventListener('touchstart', tryPlay, { once: true, passive: true });
  document.addEventListener('click',      tryPlay, { once: true });

  if (btn && audio) {
    const toggle = (e) => {
      e.stopPropagation();
      if (playing) {
        audio.pause();
        vinyl?.classList.remove('spinning');
        btn.classList.remove('active');
      } else {
        audio.play().catch(() => {});
        vinyl?.classList.add('spinning');
        btn.classList.add('active');
      }
      playing = !playing;
      unlocked = true;
    };
    btn.addEventListener('touchstart', toggle, { passive: true });
    btn.addEventListener('click',      toggle);
  }
};
