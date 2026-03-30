// gallery.js — grayscale bloom on touch, lightbox with swipe
const initGallery = () => {
  const wraps = document.querySelectorAll('.gallery-item-wrap');
  const lightbox = document.getElementById('lightbox');
  const lbImg = document.getElementById('lb-img');
  const lbClose = document.getElementById('lb-close');
  if (!lightbox) return;

  const srcs = Array.from(wraps).map(w => w.querySelector('img').src);
  let current = 0;

  // Bloom on tap
  wraps.forEach((wrap, i) => {
    const activate = () => {
      wrap.classList.add('bloomed');
      current = i;
      lbImg.src = srcs[i];
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    };
    wrap.addEventListener('touchstart', activate, { passive: true });
    wrap.addEventListener('click', activate);
  });

  const close = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };
  lbClose.addEventListener('touchstart', close, { passive: true });
  lbClose.addEventListener('click', close);
  lightbox.addEventListener('touchstart', e => {
    if (e.target === lightbox) close();
  }, { passive: true });

  // Swipe
  let tx0 = 0;
  lightbox.addEventListener('touchstart', e => { tx0 = e.changedTouches[0].screenX; }, { passive: true });
  lightbox.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].screenX - tx0;
    if (Math.abs(dx) > 50) {
      current = dx < 0
        ? (current + 1) % srcs.length
        : (current - 1 + srcs.length) % srcs.length;
      lbImg.src = srcs[current];
    }
  }, { passive: true });
};
