const TILE_SIZE = 64;
const ROWS = 8;
const COLS = 8;

let gameState = "start";
let score = 0;
let level = 1;

let player;
let grid = [];
let fishCount = 0;

function setup() {
  const canvas = createCanvas(COLS * TILE_SIZE, ROWS * TILE_SIZE + 80);
  canvas.parent("game-container");
  textFont("Arial");
  initLevel();
}

function initLevel() {
  grid = [];
  fishCount = 0;

  for (let row = 0; row < ROWS; row++) {
    let line = [];
    for (let col = 0; col < COLS; col++) {
      line.push({
        type: "ice",
        broken: false,
        fish: false,
        exit: false
      });
    }
    grid.push(line);
  }

  player = {
    row: 0,
    col: 0
  };

  grid[ROWS - 1][COLS - 1].exit = true;

  placeFish(6 + level);
}

function placeFish(amount) {
  let placed = 0;

  while (placed < amount) {
    let row = floor(random(ROWS));
    let col = floor(random(COLS));

    const tile = grid[row][col];

    const invalidTile =
      (row === 0 && col === 0) ||
      (row === ROWS - 1 && col === COLS - 1) ||
      tile.fish;

    if (!invalidTile) {
      tile.fish = true;
      placed++;
      fishCount++;
    }
  }
}

function draw() {
  background(15, 23, 42);

  if (gameState === "start") {
    drawStartScreen();
  } else if (gameState === "playing") {
    drawGame();
  } else if (gameState === "gameover") {
    drawGame();
    drawOverlay("GAME OVER", "Pressione R para reiniciar");
  } else if (gameState === "win") {
    drawGame();
    drawOverlay("VOCÊ VENCEU!", "Pressione N para próxima fase");
  }
}

function drawStartScreen() {
  fill(255);
  textAlign(CENTER, CENTER);

  textSize(38);
  text("Gelo Fino", width / 2, 100);

  textSize(20);
  text("Inspirado em Thin Ice / Club Penguin", width / 2, 150);

  textSize(18);
  text("Setas ou WASD para mover", width / 2, 230);
  text("Colete os peixes e chegue na saída", width / 2, 260);
  text("O bloco afunda quando você sai dele", width / 2, 290);

  textSize(22);
  fill(56, 189, 248);
  text("Pressione ENTER para começar", width / 2, 380);
}

function drawGame() {
  drawHUD();
  drawGrid();
  drawPlayer();
}

function drawHUD() {
  fill(30, 41, 59);
  rect(0, 0, width, 80);

  fill(255);
  textAlign(LEFT, CENTER);
  textSize(22);
  text(`Score: ${score}`, 20, 40);
  text(`Fase: ${level}`, 180, 40);
  text(`Peixes: ${fishCount}`, 300, 40);
}

function drawGrid() {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const x = col * TILE_SIZE;
      const y = row * TILE_SIZE + 80;
      const tile = grid[row][col];

      if (tile.broken) {
        fill(37, 99, 235);
      } else {
        fill(186, 230, 253);
      }

      stroke(255);
      rect(x, y, TILE_SIZE, TILE_SIZE, 8);

      if (tile.exit && !tile.broken) {
        fill(34, 197, 94);
        rect(x + 16, y + 16, 32, 32, 6);
      }

      if (tile.fish && !tile.broken) {
        fill(249, 115, 22);
        ellipse(x + 32, y + 32, 24, 24);
        triangle(x + 42, y + 32, x + 52, y + 26, x + 52, y + 38);
      }
    }
  }
}

function drawPlayer() {
  const x = player.col * TILE_SIZE + TILE_SIZE / 2;
  const y = player.row * TILE_SIZE + 80 + TILE_SIZE / 2;

  fill(20);
  ellipse(x, y, 34, 34);

  fill(255, 200, 0);
  ellipse(x, y - 6, 24, 24);

  fill(255, 140, 0);
  triangle(x - 5, y + 3, x + 5, y + 3, x, y + 11);
}

function drawOverlay(title, subtitle) {
  fill(0, 0, 0, 170);
  rect(0, 0, width, height);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(38);
  text(title, width / 2, height / 2 - 20);

  textSize(20);
  text(subtitle, width / 2, height / 2 + 30);
}

function keyPressed() {
  if (gameState === "start" && keyCode === ENTER) {
    gameState = "playing";
    return;
  }

  if (gameState === "gameover" && (key === "r" || key === "R")) {
    score = 0;
    level = 1;
    initLevel();
    gameState = "playing";
    return;
  }

  if (gameState === "win" && (key === "n" || key === "N")) {
    level++;
    initLevel();
    gameState = "playing";
    return;
  }

  if (gameState !== "playing") return;

  if (keyCode === LEFT_ARROW || key === "a" || key === "A") {
    movePlayer(0, -1);
  } else if (keyCode === RIGHT_ARROW || key === "d" || key === "D") {
    movePlayer(0, 1);
  } else if (keyCode === UP_ARROW || key === "w" || key === "W") {
    movePlayer(-1, 0);
  } else if (keyCode === DOWN_ARROW || key === "s" || key === "S") {
    movePlayer(1, 0);
  }
}

function movePlayer(dRow, dCol) {
  const newRow = player.row + dRow;
  const newCol = player.col + dCol;

  if (newRow < 0 || newRow >= ROWS || newCol < 0 || newCol >= COLS) {
    return;
  }

  const currentTile = grid[player.row][player.col];
  const nextTile = grid[newRow][newCol];

  if (nextTile.broken) {
    return;
  }

  currentTile.broken = true;

  player.row = newRow;
  player.col = newCol;

  if (nextTile.fish) {
    nextTile.fish = false;
    fishCount--;
    score += 10;
  }

  if (nextTile.broken) {
    gameState = "gameover";
    return;
  }

  if (nextTile.exit) {
    score += 50;
    gameState = "win";
    return;
  }

  if (isPlayerTrapped()) {
    gameState = "gameover";
  }
}

function isPlayerTrapped() {
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1]
  ];

  for (let dir of directions) {
    const newRow = player.row + dir[0];
    const newCol = player.col + dir[1];

    if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS) {
      if (!grid[newRow][newCol].broken) {
        return false;
      }
    }
  }

  return true;
}