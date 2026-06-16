/**
 * tile.js — classe Tile
 *
 * Tipos  : 0=água | 1=normal
 * Estados: 'intact' | 'destroyed'
 */
class Particle {
  constructor(x, y, col) {
    this.x    = x; this.y = y;
    this.vx   = (Math.random() - 0.5) * 3;
    this.vy   = (Math.random() - 0.5) * 3 - 1;
    this.life = 1.0;
    this.col  = col;
    this.size = Math.random() * 5 + 2;
  }

  update(dt) {
    this.x   += this.vx;
    this.y   += this.vy;
    this.vy  += 0.15;
    this.life -= dt * 2.5;
  }

  isDead() { return this.life <= 0; }

  draw(p) {
    p.push();
    p.noStroke();
    p.fill(this.col[0], this.col[1], this.col[2], this.life * 220);
    p.ellipse(this.x, this.y, this.size * this.life);
    p.pop();
  }
}

// ─────────────────────────────────────────────────────────────────────────────

class Tile {
  /**
   * @param {number} type  — 0..1
   * @param {number} col   — coluna na grade
   * @param {number} row   — linha na grade
   * @param {number} size  — tamanho do tile em px
   */
  constructor(type, col, row, size) {
    this.type  = type;
    this.col   = col;
    this.row   = row;
    this.size  = size;

    // estado: 'intact' | 'destroyed'
    this.state = (type === 0) ? 'destroyed' : 'intact';

    // animação de "shake" ao receber passo
    this.shakeTimer = 0;

    // partículas ao destruir
    this.particles = [];

    // animação de spawn (escala ao entrar na fase)
    this.spawnScale = 0;
    this.spawnDelay = (col + row) * 0.015;
    this.spawnTimer = 0;
    this._spawned   = false;
  }

  // ── Getters ────────────────────────────────────────────────────────────────

  get isWalkable() {
    return this.type !== 0 && this.state !== 'destroyed';
  }

  get x() { return this.col * this.size; }
  get y() { return this.row * this.size; }

  // ── Lógica ─────────────────────────────────────────────────────────────────

  /**
   * Aplica um passo do jogador neste tile.
   * @returns {{ destroyed: boolean, points: number }}
   */
  step() {
    this.shakeTimer = 0.18;

    if (this.state === 'destroyed') return { destroyed: false, points: 0 };

    // qualquer outro caso: destrói
    this._destroy();
    return { destroyed: true, points: 10 };
  }

  _destroy() {
    this.state = 'destroyed';
    this._emitParticles();
    AudioManager.playIceBreak();
  }

  _emitParticles() {
    const cx   = this.x + this.size / 2;
    const cy   = this.y + this.size / 2;
    const col  = this._particleColor();
    for (let i = 0; i < 10; i++) {
      this.particles.push(new Particle(cx, cy, col));
    }
  }

  _particleColor() {
    switch (this.type) {
      case 1: return [180, 220, 255];
      default: return [200, 230, 255];
    }
  }

  // ── Atualização ────────────────────────────────────────────────────────────

  update(dt) {
    // spawn
    if (!this._spawned) {
      this.spawnTimer += dt;
      if (this.spawnTimer >= this.spawnDelay) {
        this.spawnScale = Math.min(1, this.spawnScale + dt * 5);
        if (this.spawnScale >= 1) { this.spawnScale = 1; this._spawned = true; }
      }
    }

    // shake
    if (this.shakeTimer > 0) this.shakeTimer -= dt;

    // partículas
    this.particles = this.particles.filter(pr => { pr.update(dt); return !pr.isDead(); });
  }

  // ── Desenho ────────────────────────────────────────────────────────────────

  draw(p) {
    const s = this.size;
    const x = this.x;
    const y = this.y;
    const cx = x + s / 2;
    const cy = y + s / 2;

    // partículas (sempre, mesmo destruído)
    this.particles.forEach(pr => pr.draw(p));

    if (this.state === 'destroyed' && this.type !== 0) return;
    if (!this._spawned && this.spawnScale <= 0) return;

    p.push();
    p.translate(cx, cy);

    // scale de spawn
    const sc = this._spawned ? 1 : easeOut(this.spawnScale);
    p.scale(sc);

    // shake
    if (this.shakeTimer > 0) {
      const mag = this.shakeTimer * 3;
      p.translate((Math.random() - 0.5) * mag, (Math.random() - 0.5) * mag);
    }

    p.translate(-s / 2, -s / 2);

    if (this.type === 0) {
      this._drawWater(p, s);
    } else {
      this._drawIce(p, s);
    }

    p.pop();
  }

  _drawWater(p, s) {
    p.noStroke();
    p.fill(10, 40, 100);
    p.rect(0, 0, s, s, 4);
    // ondas simples
    p.stroke(20, 70, 160, 120);
    p.strokeWeight(1.5);
    p.noFill();
    const t = (performance.now() / 800 + this.col * 0.3 + this.row * 0.5);
    for (let i = 0; i < 2; i++) {
      const wy = s * 0.35 + i * s * 0.25 + Math.sin(t + i) * 2;
      p.beginShape();
      for (let wx = 2; wx <= s - 2; wx += 4) {
        p.vertex(wx, wy + Math.sin(t * 1.5 + wx * 0.3) * 2);
      }
      p.endShape();
    }
  }

  _drawIce(p, s) {
    const margin = 2;
    const m      = margin;

    // sombra suave
    p.noStroke();
    p.fill(0, 0, 0, 30);
    p.rect(m + 2, m + 2, s - m * 2, s - m * 2, 6);

    // cor base do tile
    let baseR, baseG, baseB;
    switch (this.type) {
      case 1: [baseR, baseG, baseB] = [160, 210, 255]; break;
      default:[baseR, baseG, baseB] = [150, 200, 240];
    }

    p.fill(baseR, baseG, baseB);
    p.stroke(255, 255, 255, 60);
    p.strokeWeight(1);
    p.rect(m, m, s - m * 2, s - m * 2, 6);

    // brilho superior
    p.noStroke();
    p.fill(255, 255, 255, 60);
    p.rect(m + 3, m + 3, s - m * 2 - 6, (s - m * 2) * 0.35, 4);

  }

  _drawStar(p, cx, cy, pts, outerR, innerR) {
    p.beginShape();
    for (let i = 0; i < pts * 2; i++) {
      const angle = (i * Math.PI) / pts - Math.PI / 2;
      const r     = (i % 2 === 0) ? outerR : innerR;
      p.vertex(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r);
    }
    p.endShape(p.CLOSE);
  }
}