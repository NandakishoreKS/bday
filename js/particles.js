// js/particles.js — Very subtle floating hearts (12% opacity via CSS)
class Particles {
  constructor() {
    this.canvas = document.getElementById('hearts-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.last = 0;
    this.resize();
    this.spawn();
    this.loop(0);
    window.addEventListener('resize', () => {
      clearTimeout(this._rt);
      this._rt = setTimeout(() => this.resize(), 250);
    }, { passive: true });
  }

  resize() {
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  spawn() {
    // Only 15 particles — very subtle
    this.particles = Array.from({ length: 15 }, () => this.make(true));
  }

  make(scatter) {
    return {
      x:    Math.random() * (this.canvas.width || 400),
      y:    scatter ? Math.random() * (this.canvas.height || 800) : (this.canvas.height || 800) + 20,
      size: Math.random() * 6 + 3,
      vy:   -(Math.random() * 0.3 + 0.08),  // very slow
      swayA: Math.random() * Math.PI * 2,
      swayS: Math.random() * 0.008 + 0.003,
      alpha: Math.random() * 0.4 + 0.2,     // low opacity (canvas opacity, canvas element is 12% already)
    };
  }

  drawHeart(x, y, size, a) {
    const ctx = this.ctx;
    ctx.save();
    ctx.globalAlpha = a;
    ctx.translate(x, y);
    const s = size / 24;
    ctx.scale(s, s);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(0, -3, -5, -12, -13, -12);
    ctx.bezierCurveTo(-22, -12, -22, -2, -22, -2);
    ctx.bezierCurveTo(-22, 9, -10, 17, 0, 26);
    ctx.bezierCurveTo(10, 17, 22, 9, 22, -2);
    ctx.bezierCurveTo(22, -2, 22, -12, 13, -12);
    ctx.bezierCurveTo(5, -12, 0, -3, 0, 0);
    ctx.fillStyle = '#E29595';
    ctx.fill();
    ctx.restore();
  }

  loop(ts) {
    if (ts - this.last < 50) { // ~20fps — very gentle
      requestAnimationFrame(t => this.loop(t));
      return;
    }
    this.last = ts;
    const { ctx } = this;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (const p of this.particles) {
      p.y    += p.vy;
      p.swayA += p.swayS;
      p.x    += Math.sin(p.swayA) * 0.25;
      if (p.y < -30) Object.assign(p, this.make(false));
      this.drawHeart(p.x, p.y, p.size, p.alpha);
    }
    requestAnimationFrame(t => this.loop(t));
  }
}
