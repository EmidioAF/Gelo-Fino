/**
 * level.js — classe Level
 *
 * Gerencia o tabuleiro, o jogador, detecta vitória/derrota,
 * controla timer e câmera.
 */
class Level {
  /**
   * @param {object} data    — dados do nível (de data-levels.js)
   * @param {object} callbacks
   *   .onTileDestroyed(pts)
   *   .onVictory()
   *   .onDeath(reason)
   */
  constructor(data, callbacks) {
    this.name      = data.name;
    this.tileSize  = data.tileSize;
    this.callbacks = callbacks;

    this.timeElapsed = 0;
    this.ended       = false;

    // câmera (offset de desenho para centralizar)
    this.camX = 0;
    this.camY = 0;

    // constrói grade de tiles
    this.tiles = [];
    this.totalTiles = 0;
    this.tilesLeft  = 0;

    const grid = data.grid;
    this.rows  = grid.length;
    this.cols  = grid[0].length;

    for (let r = 0; r < this.rows; r++) {
      this.tiles[r] = [];
      for (let c = 0; c < this.cols; c++) {
        const t = new Tile(grid[r][c], c, r, this.tileSize);
        this.tiles[r][c] = t;
        if (grid[r][c] !== 0) {
          this.totalTiles++;
          this.tilesLeft++;
        }
      }
    }

    // jogador
    this.player = new Player(data.startCol, data.startRow, this.tileSize);

    // pisa o tile inicial
    this._stepTile(data.startCol, data.startRow);
  }

  // ── Getters ────────────────────────────────────────────────────────────────

  getHUDInfo() {
    return {
      tilesLeft:  this.tilesLeft,
      totalTiles: this.totalTiles,
    };
  }

  // ── Movimento ──────────────────────────────────────────────────────────────

  movePlayer(dc, dr) {
    if (this.ended || this.player.moving) return;

    const newCol = this.player.col + dc;
    const newRow = this.player.row + dr;

    // fora dos limites
    if (newCol < 0 || newCol >= this.cols || newRow < 0 || newRow >= this.rows) return;

    const target = this.tiles[newRow][newCol];
    if (!target.isWalkable) return;

    this.player.moveTo(newCol, newRow);
    this._stepTile(newCol, newRow);
  }

  _stepTile(col, row) {
    const tile = this.tiles[row][col];
    const { destroyed, points } = tile.step();

    if (destroyed) {
      this.tilesLeft--;
      this.callbacks.onTileDestroyed(points);

      if (this.tilesLeft <= 0) {
        this._endVictory();
      }
    }
  }

  _endVictory() {
    if (this.ended) return;
    this.ended = true;
    AudioManager.playVictory();
    setTimeout(() => this.callbacks.onVictory(), 900);
  }

  _endDeath(reason) {
    if (this.ended) return;
    this.ended = true;
    AudioManager.playDeath();
    setTimeout(() => this.callbacks.onDeath(reason), 800);
  }

  // ── Atualização ────────────────────────────────────────────────────────────

  update(dt, canvasW, canvasH) {
    if (this.ended) { this.player.update(dt); return; }

    this.player.update(dt);

    // atualiza tiles
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        this.tiles[r][c].update(dt);
      }
    }

    // câmera: centraliza o tabuleiro
    const boardW = this.cols * this.tileSize;
    const boardH = this.rows * this.tileSize;
    this.camX = Math.floor((canvasW - boardW) / 2);
    this.camY = Math.floor((canvasH - boardH) / 2);
  }

  // ── Desenho ────────────────────────────────────────────────────────────────

  draw(p) {
    p.push();
    p.translate(this.camX, this.camY);

    // tiles
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        this.tiles[r][c].draw(p);
      }
    }

    // jogador
    this.player.draw(p);

    p.pop();
  }
}