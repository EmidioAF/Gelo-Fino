/**
 * main.js — ponto de entrada p5.js
 *
 * Participantes:
 *   Emidio Angelotti Filho · Julio Cezar Sampaio Silva
 *   Mateus Glowaski · William Wosch
 *
 * Disciplina: Web Development — HTML5 Canvas & Games
 * PUCPR · Sistemas de Informação · 2026
 */

const CANVAS_W = 600;
const CANVAS_H = 600;
let game;
let lastTime = 0;

new p5(function (p) {
  p.setup = function () {
    const cnv = p.createCanvas(CANVAS_W, CANVAS_H);
    // Remove canvas padrão do p5 e reanexa ao container dedicado
    const container = document.getElementById('game-container');
    cnv.parent(container);
    p.frameRate(60);
    p.textFont('Nunito');

    document.addEventListener('click',   () => AudioManager.init(), { once: true });
    document.addEventListener('keydown', () => AudioManager.init(), { once: true });

    game     = new Game();
    game.init(p);
    lastTime = performance.now();
  };

  p.draw = function () {
    const now = performance.now();
    const dt  = Math.min((now - lastTime) / 1000, 0.05);
    lastTime  = now;
    game.update(dt);
    game.draw(p);
  };

    p.keyPressed = function () {
    const key =
        p.keyCode === p.UP_ARROW ? 'ArrowUp' :
        p.keyCode === p.DOWN_ARROW ? 'ArrowDown' :
        p.keyCode === p.LEFT_ARROW ? 'ArrowLeft' :
        p.keyCode === p.RIGHT_ARROW ? 'ArrowRight' :
        p.key;

    game.keyPressed(key);

    if ([p.UP_ARROW, p.DOWN_ARROW, p.LEFT_ARROW, p.RIGHT_ARROW, 32].includes(p.keyCode)) {
        return false;
    }
    };

  p.mousePressed = function () {
    game.mousePressed(p.mouseX, p.mouseY, p);
  };
});