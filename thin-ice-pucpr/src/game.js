/**
 * game.js — classe Game
 *
 * Orquestra o jogo: gerencia cenas, nível atual,
 * score, vidas e transições.
 */

class RankingManager {
  constructor() {
    this.entries = [];
  }

  add(score) {
    this.entries.push({ name: 'Jogador', score });
    this.entries.sort((a, b) => b.score - a.score);
    if (this.entries.length > 10) this.entries.length = 10;
  }

  getTop(n = 10) {
    return this.entries.slice(0, n);
  }
}

class SceneGame {
  /**
   * @param {Game} game
   */
  constructor(game) {
    this.game = game;
    this.level = null;
    this.hud = null;
  }

  enter() {
    // a criação do Level é feita em game.startGame()
  }

  update(dt, p) {
    if (!this.level) return;
    const W = p.width;
    const H = p.height;
    this.level.update(dt, W, H - 44 - 22);
  }

  draw(p) {
    if (!this.level) {
      p.background(8, 20, 50);
      return;
    }

    p.background(8, 20, 50);

    p.push();
    p.translate(0, 44);
    this.level.draw(p);
    p.pop();

    const info = this.level.getHUDInfo();
    this.game.hud.draw({
      levelIndex: this.game.levelIndex + 1,
      score: this.game.score,
      lives: this.game.lives,
      tilesLeft: info.tilesLeft,
      totalTiles: info.totalTiles,
    });

    this.game.hud.drawProgress(info.tilesLeft, info.totalTiles);
  }

  keyPressed(key) {
    if (!this.level) return;

    switch (key) {
      case 'ArrowUp':
      case 'w':
      case 'W':
        this.level.movePlayer(0, -1);
        break;

      case 'ArrowDown':
      case 's':
      case 'S':
        this.level.movePlayer(0, 1);
        break;

      case 'ArrowLeft':
      case 'a':
      case 'A':
        this.level.movePlayer(-1, 0);
        break;

      case 'ArrowRight':
      case 'd':
      case 'D':
        this.level.movePlayer(1, 0);
        break;

      case 'p':
      case 'P':
        this.game.pauseGame();
        break;

      case 'r':
      case 'R':
        this.game.loseLife();
        break;

      case 'm':
      case 'M':
        this.game.goToMenu();
        break;

      case 'o':
      case 'O':
        AudioManager.toggle();
        break;
    }
  }

  mousePressed() {}
}

// ─────────────────────────────────────────────────────────────────────────────

class Game {
  constructor() {
    this.sceneManager = new SceneManager();
    this.rankingManager = new RankingManager();

    this.score = 0;
    this.lives = 3;
    this.levelIndex = 0;
    this.levelScore = 0;
    this.hud = null;
    this._p = null;

    this.sceneGame = null;
  }

  /**
   * Inicializa tudo. Chamado uma vez após p5 disponível.
   * @param {p5} p
   */
  init(p) {
    this._p = p;
    this.hud = new HUD(p);

    this.sceneGame = new SceneGame(this);
    this.sceneManager.register('menu', new SceneMenu(this));
    this.sceneManager.register('instructions', new SceneInstructions(this));
    this.sceneManager.register('about', new SceneAbout(this));
    this.sceneManager.register('ranking', new SceneRanking(this));
    this.sceneManager.register('pause', new ScenePause(this));
    this.sceneManager.register('gameover', new SceneGameOver(this));
    this.sceneManager.register('victory', new SceneVictory(this));
    this.sceneManager.register('game', this.sceneGame);

    this.sceneManager.replace('menu');
  }

  /**
   * Inicia um novo jogo desde a fase 1.
   */
  startGame() {
    this.score = 0;
    this.lives = 3;
    this.levelIndex = 0;
    this._loadLevel();
    this.sceneManager.replace('game');
  }

  /**
   * Carrega a fase atual.
   */
  _loadLevel() {
    const data = LEVELS[this.levelIndex];
    this.levelScore = 0;

    this.sceneGame.level = new Level(data, {
      onTileDestroyed: (pts) => {
        this.score += pts;
        this.levelScore += pts;
      },
      onVictory: () => this._handleVictory(),
      onDeath: (reason) => this._handleDeath(reason),
    });
  }

  /**
   * Avança para a próxima fase.
   */
  nextLevel() {
    this.levelIndex++;

    if (this.levelIndex >= LEVELS.length) {
      this.rankingManager.add(this.score);
      this.sceneManager.replace('victory', {
        isFinal: true,
        levelScore: this.levelScore,
      });
    } else {
      this._loadLevel();
      this.sceneManager.replace('game');
    }
  }

  /**
   * Perde uma vida manualmente (tecla R).
   */
  loseLife() {
    this._handleDeath('manual');
  }

  /**
   * Reinicia a fase atual.
   */
  restartLevel() {
    this.score = Math.max(0, this.score - 100);
    this._loadLevel();
    this.sceneManager.replace('game');
  }

  /**
   * Pausa o jogo.
   */
  pauseGame() {
    this.sceneManager.replace('pause');
  }

  /**
   * Retoma o jogo.
   */
  resumeGame() {
    this.sceneManager.replace('game');
  }

  /**
   * Vai ao menu principal.
   */
  goToMenu() {
    this.sceneManager.replace('menu');
  }

  /**
   * Callback de vitória de fase.
   */
  _handleVictory() {
    const isFinal = this.levelIndex >= LEVELS.length - 1;

    if (isFinal) {
      this.rankingManager.add(this.score);
      this.sceneManager.replace('victory', {
        isFinal: true,
        levelScore: this.levelScore,
      });
    } else {
      this.sceneManager.replace('victory', {
        isFinal: false,
        levelScore: this.levelScore,
      });
    }
  }

  /**
   * Callback de morte.
   */
  _handleDeath(reason) {
    this.lives--;

    if (this.lives <= 0) {
      this.rankingManager.add(this.score);
      this.sceneManager.replace('gameover', { reason });
    } else {
      this.restartLevel();
    }
  }

  // ── Loop principal ─────────────────────────────────────────────────────────

  update(dt) {
    const scene = this.sceneManager.current;

    if (scene === this.sceneGame) {
      this.sceneGame.update(dt, this._p);
    } else {
      this.sceneManager.update(dt);
    }
  }

  draw(p) {
    const scene = this.sceneManager.current;

    if (scene === this.sceneGame) {
      this.sceneGame.draw(p);
    } else {
      this.sceneManager.draw(p);
    }
  }

  keyPressed(key) {
    const scene = this.sceneManager.current;

    if (scene === this.sceneGame) {
      this.sceneGame.keyPressed(key);
    } else {
      this.sceneManager.keyPressed(key);
    }
  }

  mousePressed(mx, my, p) {
    const scene = this.sceneManager.current;

    if (scene === this.sceneGame) {
      this.sceneGame.mousePressed(mx, my);
    } else {
      this.sceneManager.mousePressed(mx, my, p);
    }
  }
}