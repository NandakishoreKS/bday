// timeline.js — SVG line drawing + IntersectionObserver reveals
const initTimeline = () => {
  const line = document.getElementById('tl-line');
  const section = document.getElementById('timeline');
  const items = document.querySelectorAll('.tl-item');
  if (!line || !section) return;

  // SVG line draws itself in sync with scroll
  const drawLine = () => {
    const rect = section.getBoundingClientRect();
    const progress = Math.min(Math.max((-rect.top + window.innerHeight * 0.5) / rect.height, 0), 1);
    line.style.strokeDashoffset = 2000 - progress * 2000;
  };
  window.addEventListener('scroll', drawLine, { passive: true });
  drawLine();

  // Dot pulse + card reveal per item
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  items.forEach(item => revealObs.observe(item));
};
