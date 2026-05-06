// ─── Inisialisasi awal ───────────────────────────────────────────────────────

function init() {
  GameState.reset();
  GameState.player = createPlayer(parseFloat(UI.sensSlider.value));
  GameState.stars  = createStars();
  UI.loadHighScore();
}

// ─── Spawn ───────────────────────────────────────────────────────────────────

function trySpawnObstacle() {
  const score = Math.floor(GameState.score / CONFIG.SCORE_DIVISOR);
  const maxObstacles = score < 100 ? 6
                     : score < 300 ? 9
                     : score < 500 ? 12
                     : 14;

  if (GameState.obstacles.length >= maxObstacles) return;

  if (Math.random() < GameState.currentSpawnRate) {
    GameState.obstacles.push(createObstacle());
  }
}

function trySpawnPowerUp() {
  const currentPoints = Math.floor(GameState.score / CONFIG.SCORE_DIVISOR);
  const enoughGap = currentPoints > GameState.lastPowerUpScore + CONFIG.POWERUP_INTERVAL;
  if (enoughGap && Math.random() < CONFIG.POWERUP_SPAWN_CHANCE) {
    GameState.powerUps.push(createPowerUp());
    GameState.lastPowerUpScore = currentPoints;
  }
}

// ─── Update per frame ────────────────────────────────────────────────────────

function handleInput() {
  const { player } = GameState;
  if (Input.left)  player.x -= player.speed;
  if (Input.right) player.x += player.speed;
  player.x = Math.max(0, Math.min(CONFIG.CANVAS_WIDTH - player.size, player.x));
}

function updateScore() {
  GameState.score++;
  UI.updateScore(Math.floor(GameState.score / CONFIG.SCORE_DIVISOR));

  if (GameState.score % CONFIG.SPEED_UP_INTERVAL === 0) {
    GameState.baseSpeed += CONFIG.SPEED_INCREMENT;
    if (!GameState.slowMoActive) {
      GameState.currentSpeed = GameState.baseSpeed;
      GameState.currentSpawnRate = Math.min(
        CONFIG.OBSTACLE_SPAWN_RATE + (GameState.baseSpeed - CONFIG.BASE_SPEED) * 0.03,
        0.12
      );
    }
  }
}

function updateStars() {
  GameState.stars.forEach(star => {
    star.y += star.speed;
    if (star.y > CONFIG.CANVAS_HEIGHT) star.y = -5;
  });
}

function updatePowerUps() {
  GameState.floatTime += 0.02;
  GameState.powerUps = GameState.powerUps.filter(p => {
    p.y += GameState.currentSpeed * CONFIG.POWERUP_SPEED_MULTIPLIER;
    const floatX = Math.sin(GameState.floatTime + p.offset) * CONFIG.POWERUP_FLOAT_AMPLITUDE;
    const hitPlayer = isColliding(
      GameState.player,
      { x: p.x + floatX, y: p.y, size: p.size }
    );
    if (hitPlayer) {
      activateAbility(p.type);
      return false;
    }
    return p.y <= CONFIG.CANVAS_HEIGHT;
  });
}

function updateObstacles() {
  GameState.obstacles = GameState.obstacles.filter(o => {
    o.y += GameState.currentSpeed;
    if (isColliding(GameState.player, o)) {
      if (GameState.player.hasShield) {
        GameState.player.hasShield = false;
        GameState.player.color = GameState.player.baseColor;
        return false;
      }
      handleGameOver();
      return false;
    }
    return o.y <= CONFIG.CANVAS_HEIGHT;
  });
}

// Cek tabrakan dua kotak (AABB)
function isColliding(a, b) {
  return (
    a.x < b.x + b.size &&
    a.x + a.size > b.x &&
    a.y < b.y + b.size &&
    a.y + a.size > b.y
  );
}

// ─── Game Over ───────────────────────────────────────────────────────────────

function handleGameOver() {
  GameState.active = false;
  UI.showGameOver(Math.floor(GameState.score / CONFIG.SCORE_DIVISOR));
}

// ─── Game Loop ───────────────────────────────────────────────────────────────

function update() {
  if (!GameState.active || GameState.paused) return;
  handleInput();
  updateScore();
  updateStars();
  trySpawnObstacle();
  trySpawnPowerUp();
  updatePowerUps();
  updateObstacles();
}

function gameLoop() {
  if (!GameState.running) return;
  update();
  render();
  if (GameState.active) requestAnimationFrame(gameLoop);
}

// ─── Entry Points ─────────────────────────────────────────────────────────────

function startGame() {
  GameState.running = true;
  init();
  document.querySelectorAll('.overlay').forEach(el => {
    el.style.display = 'none';
  });
  requestAnimationFrame(gameLoop);
}

// ─── Binding tombol UI ────────────────────────────────────────────────────────

document.getElementById('btn-start').addEventListener('click', startGame);
document.getElementById('btn-how-to-play').addEventListener('click', () => UI.showScreen('infoScreen'));
document.getElementById('btn-settings').addEventListener('click', () => UI.showScreen('settingsScreen'));
document.getElementById('btn-back-info').addEventListener('click', () => UI.showScreen('mainMenu'));
document.getElementById('btn-reset-record').addEventListener('click', () => UI.resetRecord());
document.getElementById('btn-save-back').addEventListener('click', () => UI.showScreen('mainMenu'));
document.getElementById('btn-try-again').addEventListener('click', startGame);
document.getElementById('btn-main-menu').addEventListener('click', () => UI.showScreen('mainMenu'));

// ─── Init saat halaman dimuat ─────────────────────────────────────────────────

UI.loadHighScore();
UI.initSensSlider();
initInput();
