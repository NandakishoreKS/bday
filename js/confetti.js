// js/confetti.js — Birthday message section: confetti + emoji + staggered lines
const initConfetti = () => {
  const section   = document.getElementById('bday-msg');
  const cakeDrop  = document.getElementById('cake-drop');
  const lines     = document.querySelectorAll('.bday-line');
  if (!section) return;

  let fired = false;
  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !fired) {
      fired = true; obs.disconnect();

      // Confetti from both bottom corners
      if (typeof confetti === 'function') {
        const colors = ['#ffb6c1', '#c9a96e', '#fff0c0', '#ff69b4', '#ffffff'];
        confetti({ particleCount: 80, angle: 60,  spread: 55, origin: { x: 0.05, y: 1 }, colors });
        confetti({ particleCount: 80, angle: 120, spread: 55, origin: { x: 0.95, y: 1 }, colors });
      }

      // Cake emoji drop
      if (cakeDrop) cakeDrop.classList.add('drop');

      // Stagger message lines
      lines.forEach((line, i) => {
        setTimeout(() => line.classList.add('show'), 700 + i * 250);
      });
    }
  }, { threshold: 0.2 });
  obs.observe(section);
};
