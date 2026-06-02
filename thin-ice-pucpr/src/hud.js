/**
 * hud.js — classe HUD
 * Barra superior e barra de progresso.
 */
class HUD {
  constructor(p) {
    this.p = p;
  }

  draw({ levelIndex, score, lives, tilesLeft, totalTiles, timeRemaining, soundEnabled }) {
    const p = this.p;
    const W = p.width;

    // fundo da barra
    p.noStroke();
    p.fill(5, 18, 50);
    p.rect(0, 0, W, 44);

    // linha divisória
    p.stroke(30, 80, 160);
    p.strokeWeight(1);
    p.line(0, 44, W, 44);

    p.noStroke();
    p.textFont('Nunito');

    // FASE
    p.fill(100, 180, 255);
    p.textSize(12);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('FASE', 12, 14);
    p.fill(255);
    p.textSize(20);
    p.textStyle(p.BOLD);
    p.text(`${levelIndex}`, 12, 33);
    p.textStyle(p.NORMAL);

    // SCORE
    p.fill(100, 180, 255);
    p.textSize(12);
    p.textAlign(p.CENTER, p.CENTER);
    p.text('PONTOS', W / 2, 14);
    p.fill(255, 220, 60);
    p.textSize(20);
    p.textStyle(p.BOLD);
    p.text(score, W / 2, 33);
    p.textStyle(p.NORMAL);

    // VIDAS
    const liveStartX = W - 110;
    p.fill(100, 180, 255);
    p.textSize(12);
    p.textAlign(p.LEFT, p.CENTER);
    p.text('VIDAS', liveStartX, 14);
    for (let i = 0; i < 3; i++) {
      p.fill(i < lives ? [255, 80, 100] : [50, 60, 90]);
      p.textSize(18);
      p.text('♥', liveStartX + i * 24, 32);
    }

    // TEMPO
    if (timeRemaining !== null) {
      const urgente = timeRemaining < 15;
      p.fill(urgente ? [255, 80, 60] : [100, 200, 255]);
      p.textSize(12);
      p.textAlign(p.RIGHT, p.CENTER);
      p.text('TEMPO', W - 8, 14);
      p.fill(urgente ? [255, 120, 80] : 255);
      p.textSize(18);
      p.textStyle(urgente ? p.BOLD : p.NORMAL);
      p.text(formatTime(timeRemaining), W - 8, 33);
      p.textStyle(p.NORMAL);
    }

    // SOM (ícone)
    p.fill(soundEnabled ? [100, 200, 255] : [80, 80, 80]);
    p.textSize(14);
    p.textAlign(p.RIGHT, p.CENTER);
    p.text(soundEnabled ? '🔊' : '🔇', W - (timeRemaining !== null ? 82 : 10), 22);
  }

  /** Barra de progresso de tiles (abaixo da HUD) */
  drawProgress(tilesLeft, totalTiles) {
    const p     = this.p;
    const W     = p.width;
    const y     = 44;
    const H     = 10;
    const ratio = totalTiles > 0 ? 1 - tilesLeft / totalTiles : 0;

    p.noStroke();
    p.fill(10, 28, 70);
    p.rect(0, y, W, H);

    // barra
    const barW = ratio * W;
    p.fill(60, 180, 100);
    p.rect(0, y, barW, H, 0, 2, 2, 0);

    // texto "X restantes"
    p.fill(180, 240, 200);
    p.textSize(9);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(`${tilesLeft} blocos restantes`, W / 2, y + H / 2);
  }
}