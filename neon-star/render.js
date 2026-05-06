const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width  = CONFIG.CANVAS_WIDTH;
canvas.height = CONFIG.CANVAS_HEIGHT;

// ─── Render utama ─────────────────────────────────────────────────────────────

function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawStars();
  drawPowerUps();
  drawPlayer();
  drawObstacles();
  if (GameState.paused) drawPauseOverlay();
}

// ─── Stars ───────────────────────────────────────────────────────────────────

function drawStars() {
  ctx.fillStyle = '#ffffff';
  GameState.stars.forEach(star => {
    ctx.globalAlpha = 0.15 + star.size * 0.25;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.globalAlpha = 1;
}

// ─── Power-ups ────────────────────────────────────────────────────────────────

function drawPowerUps() {
  GameState.powerUps.forEach(p => {
    const floatX = Math.sin(GameState.floatTime + p.offset) * CONFIG.POWERUP_FLOAT_AMPLITUDE;
    const cx = p.x + floatX + p.size / 2;
    const cy = p.y + p.size / 2;
    const r  = p.size / 2;

    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = p.color + '33';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = p.color;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = 'rgba(255,255,255,0.75)';
    ctx.font = 'bold 7px "Share Tech Mono", monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(p.type.slice(0, 3), cx, cy);
    ctx.textBaseline = 'alphabetic';
    ctx.textAlign = 'start';
  });
}

// ─── Player ───────────────────────────────────────────────────────────────────

function drawPlayer() {
  const { x, y, size, color, hasShield } = GameState.player;
  const cx = x + size / 2;
  const cy = y + size / 2;

  if (hasShield) {
    ctx.beginPath();
    ctx.arc(cx, cy, size * 0.9 + 4, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  ctx.shadowBlur = 12;
  ctx.shadowColor = color;
  ctx.fillStyle = color;
  ctx.fillRect(x, y, size, size);
  ctx.shadowBlur = 0;
}

// ─── Obstacles ────────────────────────────────────────────────────────────────

function drawObstacles() {
  GameState.obstacles.forEach(o => {
    ctx.shadowBlur = 8;
    ctx.shadowColor = o.color;
    ctx.fillStyle = o.color;
    ctx.fillRect(o.x, o.y, o.size, o.size);
  });
  ctx.shadowBlur = 0;
}

// ─── Pause overlay ────────────────────────────────────────────────────────────

function drawPauseOverlay() {
  ctx.fillStyle = 'rgba(0,0,0,0.6)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'rgba(0,210,255,0.9)';
  ctx.font = '700 14px "Orbitron", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2);
  ctx.textAlign = 'start';
  ctx.textBaseline = 'alphabetic';
}
