// Particle Engine — 30fps capped, 25 particles, devicePixelRatio: 1
class Particles {
  constructor() {
    this.canvas = document.getElementById('particles-canvas');
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.lastFrame = 0;
    this.colors = ['#ffb6c1', '#c9a96e', '#ff4d8f'];
    this.resize();
    this.spawn();
    this.loop(0);
    window.addEventListener('resize', () => {
      clearTimeout(this._rt);
      this._rt = setTimeout(() => this.resize(), 200);
    }, { passive: true });
  }

  resize() {
    // Always render at 1:1 — no high-DPR on mobile
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  spawn() {
    this.particles = [];
    const N = 25;
    for (let i = 0; i < N; i++) {
      this.particles.push(this.make(true));
    }
  }

  make(scatter) {
    return {
      x:     scatter ? Math.random() * this.canvas.width : Math.random() * this.canvas.width,
      y:     scatter ? Math.random() * this.canvas.height : this.canvas.height + 20,
      size:  Math.random() * 5 + 3,
      vy:    -(Math.random() * 0.6 + 0.2),
      swayA: Math.random() * Math.PI * 2,
      swayS: Math.random() * 0.015 + 0.005,
      pulse: Math.random() * Math.PI * 2,
      isHeart: Math.random() > 0.45,
      color: this.colors[Math.floor(Math.random() * this.colors.length)],
      opacity: Math.random() * 0.4 + 0.15,
    };
  }

  drawHeart(ctx, x, y, size, color, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(x, y);
    const s = size / 28;
    ctx.scale(s, s);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(0, -3, -5, -13, -14, -13);
    ctx.bezierCurveTo(-23, -13, -23, -2, -23, -2);
    ctx.bezierCurveTo(-23, 9, -10, 18, 0, 27);
    ctx.bezierCurveTo(10, 18, 23, 9, 23, -2);
    ctx.bezierCurveTo(23, -2, 23, -13, 14, -13);
    ctx.bezierCurveTo(5, -13, 0, -3, 0, 0);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  }

  drawDot(ctx, x, y, r, color, alpha) {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.arc(x, y, r / 2, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  }

  loop(ts) {
    // 30fps cap
    if (ts - this.lastFrame < 33) {
      requestAnimationFrame(t => this.loop(t));
      return;
    }
    this.lastFrame = ts;
    const { ctx } = this;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (const p of this.particles) {
      p.y    += p.vy;
      p.swayA += p.swayS;
      p.x    += Math.sin(p.swayA) * 0.4;
      p.pulse += 0.04;
      const a = Math.abs(Math.sin(p.pulse)) * 0.45 + 0.1;

      if (p.y < -30) {
        Object.assign(p, this.make(false));
      }

      if (p.isHeart) this.drawHeart(ctx, p.x, p.y, p.size, p.color, a);
      else           this.drawDot(ctx, p.x, p.y, p.size, p.color, a);
    }

    requestAnimationFrame(t => this.loop(t));
  }
}
