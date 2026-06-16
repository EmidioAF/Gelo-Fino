/**
 * scenes.js — SceneManager e todas as telas
 */

// ─────────────────────────────────────────────────────────────────────────────
// SceneManager
// ─────────────────────────────────────────────────────────────────────────────

class SceneManager {
  constructor() {
    this._scenes = {};
    this.current = null;
  }

  register(name, scene) {
    this._scenes[name] = scene;
    scene._name = name;
  }

  replace(name, data = {}) {
    if (this.current && this.current.exit) this.current.exit();
    this.current = this._scenes[name];
    if (this.current && this.current.enter) this.current.enter(data);
  }

  update(dt) {
    if (this.current && this.current.update) this.current.update(dt);
  }

  draw(p) {
    if (this.current && this.current.draw) this.current.draw(p);
  }

  keyPressed(key) {
    if (this.current && this.current.keyPressed) this.current.keyPressed(key);
  }

  mousePressed(mx, my, p) {
    if (this.current && this.current.mousePressed) this.current.mousePressed(mx, my, p);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Utilitários de UI compartilhados
// ─────────────────────────────────────────────────────────────────────────────

class Button {
  constructor(label, x, y, w, h, action) {
    this.label  = label;
    this.x      = x; this.y = y;
    this.w      = w; this.h = h;
    this.action = action;
    this.hover  = false;
  }

  contains(mx, my) {
    return mx >= this.x && mx <= this.x + this.w &&
           my >= this.y && my <= this.y + this.h;
  }

  update(mx, my) {
    this.hover = this.contains(mx, my);
  }

  draw(p) {
    const alpha = this.hover ? 255 : 200;
    p.push();

    // sombra
    p.noStroke();
    p.fill(0, 0, 0, 40);
    p.rect(this.x + 3, this.y + 3, this.w, this.h, 10);

    // fundo
    if (this.hover) {
      p.fill(50, 130, 220);
    } else {
      p.fill(20, 70, 160);
    }
    p.stroke(80, 160, 255, 180);
    p.strokeWeight(1.5);
    p.rect(this.x, this.y, this.w, this.h, 10);

    // texto
    p.noStroke();
    p.fill(255, 255, 255, alpha);
    p.textSize(16);
    p.textStyle(p.BOLD);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(this.label, this.x + this.w / 2, this.y + this.h / 2);
    p.textStyle(p.NORMAL);

    p.pop();
  }

  click() {
    if (this.action) { AudioManager.playMenuClick(); this.action(); }
  }
}

// Fundo animado de neve/flocos compartilhado
class SnowBackground {
  constructor(W, H, count = 60) {
    this.W = W; this.H = H;
    this.flakes = [];
    for (let i = 0; i < count; i++) {
      this.flakes.push({
        x:    Math.random() * W,
        y:    Math.random() * H,
        r:    Math.random() * 3 + 1,
        spd:  Math.random() * 30 + 15,
        sway: Math.random() * 0.5,
        t:    Math.random() * Math.PI * 2,
      });
    }
    this.timer = 0;
  }

  update(dt) {
    this.timer += dt;
    this.flakes.forEach(f => {
      f.t += dt * f.sway;
      f.y += f.spd * dt;
      f.x += Math.sin(f.t) * 0.5;
      if (f.y > this.H + 10) { f.y = -10; f.x = Math.random() * this.W; }
    });
  }

  draw(p) {
    // limpa o canvas antes de desenhar
    p.clear();
    // fundo gradiente
    for (let y = 0; y < this.H; y += 2) {
      const t = y / this.H;
      const r = lerp(5, 15, t);
      const g = lerp(15, 35, t);
      const b = lerp(55, 90, t);
      p.stroke(r, g, b);
      p.line(0, y, this.W, y);
    }

    // flocos
    p.noStroke();
    this.flakes.forEach(f => {
      const alpha = 160 + Math.sin(f.t * 2) * 50;
      p.fill(200, 230, 255, alpha);
      p.ellipse(f.x, f.y, f.r * 2);
    });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SceneMenu
// ─────────────────────────────────────────────────────────────────────────────

class SceneMenu {
  constructor(game) {
    this.game    = game;
    this.bg      = null;
    this.buttons = [];
    this.logoAnim = 0;
  }

  enter() {
    const W = 600, H = 600;
    this.bg = new SnowBackground(W, H);

    const bw = 200, bh = 46;
    const bx = (W - bw) / 2;

    this.buttons = [
      new Button('🎮  Jogar',         bx, 330, bw, bh, () => this.game.startGame()),
      new Button('📖  Instruções',     bx, 390, bw, bh, () => this.game.sceneManager.replace('instructions')),
      new Button('👥  Sobre',          bx, 450, bw, bh, () => this.game.sceneManager.replace('about')),
      new Button('🏆  Ranking',        bx, 510, bw, bh, () => this.game.sceneManager.replace('ranking')),
    ];
    this.logoAnim = 0;
  }

  update(dt) {
    this.bg.update(dt);
    this.logoAnim += dt;
    const p = this.game._p;
    this.buttons.forEach(b => b.update(p.mouseX, p.mouseY));
  }

  draw(p) {
    this.bg.draw(p);
    const W = p.width, H = p.height;

    // logo / título
    const bounce = Math.sin(this.logoAnim * 1.8) * 6;

    p.push();
    p.translate(W / 2, 200 + bounce);

    // pinguim decorativo
    p.noStroke();
    p.fill(20, 20, 30);
    p.ellipse(0, 0, 70, 85);
    p.fill(240, 240, 250);
    p.ellipse(0, 8, 38, 55);
    p.fill(255, 160, 30);
    p.triangle(-8, -5, 8, -5, 0, 10);
    p.fill(255); p.ellipse(-12, -14, 14, 14);
    p.fill(255); p.ellipse( 12, -14, 14, 14);
    p.fill(20);  p.ellipse(-11, -13, 8, 8);
    p.fill(20);  p.ellipse( 13, -13, 8, 8);

    p.pop();

    // título
    p.textFont('Fredoka One');
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(52);
    p.fill(30, 100, 200);
    p.text('GELO FINO', W / 2 + 2, 265 + bounce);
    p.fill(200, 235, 255);
    p.text('GELO FINO', W / 2, 263 + bounce);

    p.textFont('Nunito');
    p.textSize(14);
    p.fill(140, 190, 255);
    p.text('The Ice Journey', W / 2, 290 + bounce);

    // botões
    this.buttons.forEach(b => b.draw(p));

    // créditos rodapé
    p.textSize(11);
    p.fill(80, 120, 180);
    p.text('PUCPR · Sistemas de Informação · 2026', W / 2, H - 15);
  }

  mousePressed(mx, my) {
    this.buttons.forEach(b => { if (b.contains(mx, my)) b.click(); });
  }

  keyPressed(k) {}
}

// ─────────────────────────────────────────────────────────────────────────────
// SceneInstructions
// ─────────────────────────────────────────────────────────────────────────────

class SceneInstructions {
  constructor(game) {
    this.game = game;
    this.bg   = null;
    this.btn  = null;
  }

  enter() {
    this.bg  = new SnowBackground(600, 600, 30);
    this.btn = new Button('← Voltar', 220, 540, 160, 42, () => this.game.sceneManager.replace('menu'));
  }

  update(dt) {
    this.bg.update(dt);
    const p = this.game._p;
    this.btn.update(p.mouseX, p.mouseY);
  }

  draw(p) {
    this.bg.draw(p);
    const W = p.width;

    p.textFont('Fredoka One');
    p.textAlign(p.CENTER, p.TOP);
    p.textSize(36);
    p.fill(200, 235, 255);
    p.text('Como Jogar', W / 2, 24);

    p.textFont('Nunito');
    p.textSize(15);
    p.textAlign(p.LEFT, p.TOP);

    const linhas = [
      ['🎮 CONTROLES', true],
      ['  ↑↓←→ ou W A S D — Mover o pinguim', false],
      ['  P — Pausar / Retomar', false],
      ['  R — Reiniciar fase   M — Menu', false],
      ['  S — Liga/desliga som', false],
      ['', false],
      ['🎯 OBJETIVO', true],
      ['  Pise em TODOS os blocos de gelo para', false],
      ['  destruí-los e vencer a fase!', false],
      ['  Cuidado: ao pisar, o bloco some.', false],
      ['  Não caia na água!', false],
      ['', false],
      ['❄ TIPOS DE BLOCO', true],
      ['  ❄ Gelo Normal  — 1 passo  (+10 pts)', false],
      ['  💧 Água          — intransponível', false],
    ];

    let y = 74;
    linhas.forEach(([txt, bold]) => {
      if (bold) {
        p.textStyle(p.BOLD);
        p.fill(100, 200, 255);
        p.textSize(16);
      } else {
        p.textStyle(p.NORMAL);
        p.fill(200, 225, 255);
        p.textSize(14);
      }
      p.text(txt, 40, y);
      y += (bold ? 22 : 18);
    });

    p.textStyle(p.NORMAL);
    this.btn.draw(p);
  }

  mousePressed(mx, my) {
    if (this.btn.contains(mx, my)) this.btn.click();
  }

  keyPressed(k) {
    if (k === 'Escape') this.game.sceneManager.replace('menu');
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SceneAbout
// ─────────────────────────────────────────────────────────────────────────────

class SceneAbout {
  constructor(game) {
    this.game = game;
    this.bg   = null;
    this.btn  = null;
  }

  enter() {
    this.bg  = new SnowBackground(600, 600, 30);
    this.btn = new Button('← Voltar', 220, 540, 160, 42, () => this.game.sceneManager.replace('menu'));
  }

  update(dt) {
    this.bg.update(dt);
    const p = this.game._p;
    this.btn.update(p.mouseX, p.mouseY);
  }

  draw(p) {
    this.bg.draw(p);
    const W = p.width;

    p.textFont('Fredoka One');
    p.textAlign(p.CENTER, p.TOP);
    p.textSize(36);
    p.fill(200, 235, 255);
    p.text('Sobre', W / 2, 24);

    // card
    p.fill(10, 25, 70, 180);
    p.stroke(40, 100, 200, 120);
    p.strokeWeight(1);
    p.rect(60, 70, W - 120, 200, 12);
    p.noStroke();

    p.textFont('Nunito');
    p.textAlign(p.CENTER, p.TOP);

    p.fill(100, 200, 255);
    p.textSize(13);
    p.text('Participantes', W / 2, 84);

    const nomes = [
      'Emidio Angelotti Filho',
      'Julio Cezar Sampaio Silva',
      'Mateus Glowaski',
      'William Wosch',
    ];
    p.textSize(18);
    p.textStyle(p.BOLD);
    nomes.forEach((n, i) => {
      p.fill(220, 240, 255);
      p.text(n, W / 2, 108 + i * 36);
    });
    p.textStyle(p.NORMAL);

    // info do projeto
    p.fill(10, 25, 70, 180);
    p.stroke(40, 100, 200, 120);
    p.strokeWeight(1);
    p.rect(60, 290, W - 120, 230, 12);
    p.noStroke();

    p.fill(100, 200, 255);
    p.textSize(13);
    p.text('Projeto', W / 2, 304);

    const info = [
      'Gelo Fino — The Ice Journey',
      'Disciplina: Web Development',
      'HTML5 Canvas & Games',
      'Bacharelado em Sistemas de Informação',
      'PUCPR · 2026',
      '',
      'Tecnologia: p5.js + Web Audio API',
    ];
    p.fill(200, 225, 255);
    p.textSize(15);
    info.forEach((ln, i) => {
      if (i === 0) { p.textStyle(p.BOLD); p.fill(255, 230, 100); }
      else { p.textStyle(p.NORMAL); p.fill(190, 220, 255); }
      p.text(ln, W / 2, 326 + i * 26);
    });

    p.textStyle(p.NORMAL);
    this.btn.draw(p);
  }

  mousePressed(mx, my) {
    if (this.btn.contains(mx, my)) this.btn.click();
  }

  keyPressed(k) {
    if (k === 'Escape') this.game.sceneManager.replace('menu');
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SceneRanking
// ─────────────────────────────────────────────────────────────────────────────

class SceneRanking {
  constructor(game) {
    this.game = game;
    this.bg   = null;
    this.btn  = null;
  }

  enter() {
    this.bg  = new SnowBackground(600, 600, 30);
    this.btn = new Button('← Voltar', 220, 540, 160, 42, () => this.game.sceneManager.replace('menu'));
  }

  update(dt) {
    this.bg.update(dt);
    const p = this.game._p;
    this.btn.update(p.mouseX, p.mouseY);
  }

  draw(p) {
    this.bg.draw(p);
    const W = p.width;

    p.textFont('Fredoka One');
    p.textAlign(p.CENTER, p.TOP);
    p.textSize(36);
    p.fill(200, 235, 255);
    p.text('Ranking', W / 2, 24);

    const entries = this.game.rankingManager.getTop(8);

    if (entries.length === 0) {
      p.textFont('Nunito');
      p.fill(140, 180, 255);
      p.textSize(16);
      p.text('Nenhuma partida registrada ainda.\nJogue para aparecer aqui! 🐧', W / 2, 200);
    } else {
      entries.forEach((e, i) => {
        const y = 80 + i * 52;
        // card
        p.fill(i === 0 ? [60, 40, 0] : [10, 25, 70], 180);
        p.stroke(i === 0 ? [255, 200, 50] : [40, 100, 200], 120);
        p.strokeWeight(1);
        p.rect(60, y, W - 120, 42, 8);
        p.noStroke();

        // medalha
        const medal = ['🥇', '🥈', '🥉'][i] || `${i + 1}.`;
        p.textFont('Nunito');
        p.textSize(22);
        p.textAlign(p.LEFT, p.CENTER);
        p.fill(255, 220, 80);
        p.text(medal, 80, y + 21);

        // nome
        p.fill(220, 240, 255);
        p.textSize(16);
        p.textAlign(p.LEFT, p.CENTER);
        p.text(e.name, 130, y + 21);

        // score
        p.fill(255, 220, 60);
        p.textStyle(p.BOLD);
        p.textAlign(p.RIGHT, p.CENTER);
        p.text(e.score + ' pts', W - 70, y + 21);
        p.textStyle(p.NORMAL);
      });
    }

    this.btn.draw(p);
  }

  mousePressed(mx, my) {
    if (this.btn.contains(mx, my)) this.btn.click();
  }

  keyPressed(k) {
    if (k === 'Escape') this.game.sceneManager.replace('menu');
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// ScenePause
// ─────────────────────────────────────────────────────────────────────────────

class ScenePause {
  constructor(game) {
    this.game    = game;
    this.bg      = null;
    this.buttons = [];
  }

  enter() {
    this.bg = new SnowBackground(600, 600, 20);
    const W = 600;
    const bw = 220, bh = 46;
    const bx = (W - bw) / 2;

    this.buttons = [
      new Button('▶  Continuar',   bx, 280, bw, bh, () => this.game.resumeGame()),
      new Button('🔄  Reiniciar Fase', bx, 340, bw, bh, () => this.game.restartLevel()),
      new Button('🏠  Menu',        bx, 400, bw, bh, () => this.game.goToMenu()),
    ];
  }

  update(dt) {
    this.bg.update(dt);
    const p = this.game._p;
    this.buttons.forEach(b => b.update(p.mouseX, p.mouseY));
  }

  draw(p) {
    this.bg.draw(p);
    const W = p.width, H = p.height;

    // overlay escuro
    p.fill(0, 0, 0, 120);
    p.noStroke();
    p.rect(0, 0, W, H);

    p.textFont('Fredoka One');
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(56);
    p.fill(200, 235, 255);
    p.text('PAUSADO', W / 2, 180);

    p.textFont('Nunito');
    p.textSize(14);
    p.fill(120, 170, 255);
    p.text('Pressione P para continuar', W / 2, 230);

    this.buttons.forEach(b => b.draw(p));
  }

  keyPressed(k) {
    if (k === 'p' || k === 'P' || k === 'Escape') this.game.resumeGame();
  }

  mousePressed(mx, my) {
    this.buttons.forEach(b => { if (b.contains(mx, my)) b.click(); });
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SceneGameOver
// ─────────────────────────────────────────────────────────────────────────────

class SceneGameOver {
  constructor(game) {
    this.game    = game;
    this.buttons = [];
    this.bg      = null;
    this.reason  = '';
    this.animT   = 0;
  }

  enter({ reason } = {}) {
    if (reason === 'manual') {
      this.reason = '💀 Sem Vidas Restantes!';
    } else {
      this.reason = '💧 Você Caiu!';
    }
    this.animT  = 0;
    this.bg     = new SnowBackground(600, 600, 40);

    const W = 600;
    const bw = 220, bh = 46;
    const bx = (W - bw) / 2;

    this.buttons = [
      new Button('🔄  Tentar Novamente', bx, 380, bw, bh, () => this.game.startGame()),
      new Button('🏠  Menu',             bx, 440, bw, bh, () => this.game.goToMenu()),
      new Button('🏆  Ranking',          bx, 500, bw, bh, () => this.game.sceneManager.replace('ranking')),
    ];
  }

  update(dt) {
    this.bg.update(dt);
    this.animT += dt;
    const p = this.game._p;
    this.buttons.forEach(b => b.update(p.mouseX, p.mouseY));
  }

  draw(p) {
    this.bg.draw(p);
    const W = p.width;

    const shake = Math.sin(this.animT * 8) * (Math.max(0, 1 - this.animT) * 4);

    p.textFont('Fredoka One');
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(58);
    p.fill(220, 50, 80);
    p.text('GAME OVER', W / 2 + shake, 160);

    p.textSize(22);
    p.fill(255, 160, 120);
    p.text(this.reason, W / 2, 210);

    p.textFont('Nunito');
    p.textSize(20);
    p.fill(255, 220, 60);
    p.text(`Pontuação Final: ${this.game.score}`, W / 2, 260);

    p.fill(140, 180, 255);
    p.textSize(14);
    p.text(`Fase ${this.game.levelIndex + 1} de ${LEVELS.length}`, W / 2, 298);

    this.buttons.forEach(b => b.draw(p));
  }

  mousePressed(mx, my) {
    this.buttons.forEach(b => { if (b.contains(mx, my)) b.click(); });
  }

  keyPressed(k) {
    if (k === 'Enter') this.game.startGame();
    if (k === 'Escape') this.game.goToMenu();
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// SceneVictory
// ─────────────────────────────────────────────────────────────────────────────

class SceneVictory {
  constructor(game) {
    this.game      = game;
    this.isFinal   = false;
    this.levelScore = 0;
    this.buttons   = [];
    this.bg        = null;
    this.confetti  = [];
    this.animT     = 0;
  }

  enter({ isFinal = false, levelScore = 0 } = {}) {
    this.isFinal    = isFinal;
    this.levelScore = levelScore;
    this.animT      = 0;
    this.bg         = new SnowBackground(600, 600, 20);

    // confetti
    this.confetti = [];
    for (let i = 0; i < 80; i++) {
      this.confetti.push({
        x:   Math.random() * 600,
        y:   Math.random() * 300 - 100,
        vx:  (Math.random() - 0.5) * 60,
        vy:  Math.random() * 100 + 60,
        rot: Math.random() * Math.PI * 2,
        rotV:Math.random() * 3 - 1.5,
        w:   Math.random() * 8 + 4,
        h:   Math.random() * 5 + 3,
        col: [
          [255, 220, 60], [100, 200, 255], [255, 100, 150],
          [100, 255, 150], [255, 180, 100],
        ][Math.floor(Math.random() * 5)],
      });
    }

    const W = 600;
    const bw = 220, bh = 46;
    const bx = (W - bw) / 2;

    if (isFinal) {
      this.buttons = [
        new Button('🏠  Menu',    bx, 430, bw, bh, () => this.game.goToMenu()),
        new Button('🏆  Ranking', bx, 490, bw, bh, () => this.game.sceneManager.replace('ranking')),
      ];
    } else {
      this.buttons = [
        new Button('▶  Próxima Fase', bx, 400, bw, bh, () => this.game.nextLevel()),
        new Button('🏠  Menu',         bx, 460, bw, bh, () => this.game.goToMenu()),
      ];
    }
  }

  update(dt) {
    this.bg.update(dt);
    this.animT += dt;
    this.confetti.forEach(c => {
      c.x   += c.vx * dt;
      c.y   += c.vy * dt;
      c.rot += c.rotV * dt;
      c.vy  += 40 * dt;
    });
    const p = this.game._p;
    this.buttons.forEach(b => b.update(p.mouseX, p.mouseY));
  }

  draw(p) {
    this.bg.draw(p);
    const W = p.width;

    // confetti
    this.confetti.forEach(c => {
      p.push();
      p.translate(c.x, c.y);
      p.rotate(c.rot);
      p.noStroke();
      p.fill(c.col[0], c.col[1], c.col[2], 220);
      p.rect(-c.w / 2, -c.h / 2, c.w, c.h, 2);
      p.pop();
    });

    const bounce = Math.sin(this.animT * 3) * 5;

    p.textFont('Fredoka One');
    p.textAlign(p.CENTER, p.CENTER);

    if (this.isFinal) {
      p.textSize(48);
      p.fill(255, 220, 60);
      p.text('PARABÉNS!', W / 2, 140 + bounce);
      p.textSize(26);
      p.fill(200, 235, 255);
      p.text('Você completou todas as fases!', W / 2, 195);
    } else {
      p.textSize(52);
      p.fill(100, 255, 160);
      p.text('FASE COMPLETA!', W / 2, 140 + bounce);
    }

    p.textFont('Nunito');
    p.textSize(20);
    p.fill(255, 220, 60);
    p.text(`Pontuação Total: ${this.game.score}`, W / 2, 250);

    p.fill(140, 200, 255);
    p.textSize(16);
    p.text(`Pontos nesta fase: +${this.levelScore}`, W / 2, 282);

    // vidas restantes
    p.textSize(14);
    p.fill(180, 220, 255);
    p.text('Vidas: ' + '♥'.repeat(this.game.lives), W / 2, 316);

    this.buttons.forEach(b => b.draw(p));
  }

  mousePressed(mx, my) {
    this.buttons.forEach(b => { if (b.contains(mx, my)) b.click(); });
  }

  keyPressed(k) {
    if ((k === 'Enter' || k === ' ') && !this.isFinal) this.game.nextLevel();
    if (k === 'Escape') this.game.goToMenu();
  }
}