// confetti.js — fires when birthday message section scrolls into view
const initConfetti = () => {
  const section = document.getElementById('bday-msg');
  const cakeEmoji = document.getElementById('cake-drop');
  const lines = document.querySelectorAll('.bday-line');
  if (!section) return;

  let fired = false;
  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !fired) {
      fired = true;
      obs.disconnect();

      // Confetti from both bottom corners
      if (typeof confetti === 'function') {
        confetti({ particleCount: 80, angle: 60,  spread: 55, origin: { x: 0.1, y: 1 }, colors: ['#ffb6c1','#c9a96e','#fff0c0','#ff69b4','#ffffff'] });
        confetti({ particleCount: 80, angle: 120, spread: 55, origin: { x: 0.9, y: 1 }, colors: ['#ffb6c1','#c9a96e','#fff0c0','#ff69b4','#ffffff'] });
      }

      // Emoji drop
      if (cakeEmoji) cakeEmoji.classList.add('drop');

      // Stagger lines
      lines.forEach((line, i) => {
        setTimeout(() => line.classList.add('reveal'), 600 + i * 250);
      });
    }
  }, { threshold: 0.2 });

  obs.observe(section);
};
