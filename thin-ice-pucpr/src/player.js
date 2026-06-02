/**
 * player.js — classe Player
 *
 * Movimento em grade com interpolação visual suave.
 */
class Player {
  /**
   * @param {number} col     — coluna inicial
   * @param {number} row     — linha inicial
   * @param {number} tileSize
   */
  constructor(col, row, tileSize) {
    this.col      = col;      // posição lógica
    this.row      = row;
    this.tileSize = tileSize;

    // posição visual (pixels), inicia na posição lógica
    this.vx = col * tileSize + tileSize / 2;
    this.vy = row * tileSize + tileSize / 2;

    // destino visual
    this.targetX = this.vx;
    this.targetY = this.vy;

    this.moving   = false;
    this.moveSpeed = 12; // fator lerp por frame

    // animação de respiro
    this.breathTimer = 0;

    // direção do último movimento (para sprite)
    this.dir = 'down';
  }

  /** Move para (col, row) se chamado externamente. Chamado por Level. */
  moveTo(col, row) {
    const dx = col - this.col;
    const dy = row - this.row;

    if (dx >  0) this.dir = 'right';
    if (dx < -0) this.dir = 'left';
    if (dy >  0) this.dir = 'down';
    if (dy < -0) this.dir = 'up';

    this.col = col;
    this.row = row;
    this.targetX = col * this.tileSize + this.tileSize / 2;
    this.targetY = row * this.tileSize + this.tileSize / 2;
    this.moving  = true;

    AudioManager.playStep();
  }

  update(dt) {
    this.breathTimer += dt;

    const speed = this.moveSpeed;
    this.vx = lerp(this.vx, this.targetX, Math.min(1, speed * dt * 60 / 60));
    this.vy = lerp(this.vy, this.targetY, Math.min(1, speed * dt * 60 / 60));

    const dist = Math.hypot(this.targetX - this.vx, this.targetY - this.vy);
    if (dist < 0.5) {
      this.vx     = this.targetX;
      this.vy     = this.targetY;
      this.moving = false;
    }
  }

  draw(p) {
    const s  = this.tileSize;
    const r  = s * 0.38;
    const bx = this.vx;
    const by = this.vy + Math.sin(this.breathTimer * 2.5) * 1.5;

    p.push();
    p.translate(bx, by);

    // sombra
    p.noStroke();
    p.fill(0, 0, 0, 50);
    p.ellipse(0, r * 0.55, r * 1.2, r * 0.35);

    // corpo
    p.fill(20, 20, 30);
    p.ellipse(0, 0, r * 1.8, r * 2.2);

    // barriga
    p.fill(240, 240, 250);
    p.ellipse(0, r * 0.15, r, r * 1.4);

    // olhos
    const eyeX = (this.dir === 'left') ? -r * 0.45 : (this.dir === 'right') ? r * 0.45 : r * 0.25;
    const eyeY = -r * 0.35;
    p.fill(255);
    p.ellipse(-eyeX * 0.6, eyeY, r * 0.32, r * 0.32);
    p.ellipse( eyeX * 0.6, eyeY, r * 0.32, r * 0.32);
    p.fill(20, 20, 30);
    p.ellipse(-eyeX * 0.6 + 1, eyeY + 1, r * 0.18, r * 0.18);
    p.ellipse( eyeX * 0.6 + 1, eyeY + 1, r * 0.18, r * 0.18);

    // bico
    p.fill(255, 160, 30);
    p.triangle(-r * 0.15, -r * 0.1, r * 0.15, -r * 0.1, 0, r * 0.12);

    // asas (chapéu arredondado no topo)
    p.fill(30, 30, 40);
    p.ellipse(-r * 0.8, r * 0.1, r * 0.55, r * 0.3);
    p.ellipse( r * 0.8, r * 0.1, r * 0.55, r * 0.3);

    p.pop();
  }
}