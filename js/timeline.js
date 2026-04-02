// js/timeline.js — Accordion: one item open at a time, stagger reveal on scroll
const initTimeline = () => {
  const accordion = document.getElementById('timeline-accordion');
  if (!accordion) return;

  const items = accordion.querySelectorAll('.acc-item');

  // Scroll-triggered stagger reveal
  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      items.forEach((item, i) => {
        setTimeout(() => item.classList.add('vis'), i * 100);
      });
      obs.disconnect();
    }
  }, { threshold: 0.1 });
  obs.observe(accordion);

  // Accordion tap — one open at a time
  items.forEach(item => {
    const trigger = item.querySelector('.acc-trigger');
    const toggle = () => {
      const isActive = item.classList.contains('active');
      // Close all
      items.forEach(i => {
        i.classList.remove('active');
        const arrow = i.querySelector('.acc-arrow');
        if (arrow) arrow.textContent = '+';
      });
      // Re-open if wasn't active
      if (!isActive) {
        item.classList.add('active');
        const arrow = item.querySelector('.acc-arrow');
        if (arrow) arrow.textContent = '−';
      }
    };
    trigger.addEventListener('touchstart', toggle, { passive: true });
    trigger.addEventListener('click', toggle);
  });
};
