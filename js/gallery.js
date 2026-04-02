// js/gallery.js — Polaroid tap-to-reveal notes (mobile & desktop)
const initGallery = () => {
  const polaroids = document.querySelectorAll('.polaroid');
  if (!polaroids.length) return;

  polaroids.forEach(card => {
    const toggle = () => {
      const wasActive = card.classList.contains('active');
      // Close all
      polaroids.forEach(c => c.classList.remove('active'));
      // Open if wasn't
      if (!wasActive) card.classList.add('active');
    };
    card.addEventListener('touchstart', toggle, { passive: true });
    card.addEventListener('click', toggle);
  });
};
