function createPlayer(speedOverride) {
  return {
    x: CONFIG.PLAYER_START_X,
    y: CONFIG.PLAYER_START_Y,
    size: CONFIG.PLAYER_SIZE,
    baseSize: CONFIG.PLAYER_SIZE,
    color: CONFIG.PLAYER_COLOR,
    baseColor: CONFIG.PLAYER_COLOR,
    speed: speedOverride ?? CONFIG.PLAYER_DEFAULT_SPEED,
    hasShield: false,
  };
}

function createObstacle() {
  const laneWidth = 45;
  const laneCount = Math.floor(CONFIG.CANVAS_WIDTH / laneWidth);
  const lane = Math.floor(Math.random() * laneCount);
  const xOffset = Math.random() * (laneWidth - CONFIG.OBSTACLE_MIN_SIZE);

  const score = Math.floor(GameState.score / CONFIG.SCORE_DIVISOR);
  const maxSize = score > 300
    ? CONFIG.OBSTACLE_MAX_SIZE * 0.6
    : CONFIG.OBSTACLE_MAX_SIZE;

  return {
    x: lane * laneWidth + xOffset,
    y: -45,
    size: Math.random() * maxSize + CONFIG.OBSTACLE_MIN_SIZE,
    color: CONFIG.OBSTACLE_COLORS[
      Math.floor(Math.random() * CONFIG.OBSTACLE_COLORS.length)
    ],
  };
}

function createPowerUp() {
  const type = CONFIG.POWERUP_TYPES[
    Math.floor(Math.random() * CONFIG.POWERUP_TYPES.length)
  ];
  return {
    x: Math.random() * (CONFIG.CANVAS_WIDTH - 40) + 20,
    y: -40,
    size: CONFIG.POWERUP_SIZE,
    type: type.name,
    color: type.color,
    offset: Math.random() * 100,
  };
}

function createStar() {
  return {
    x: Math.random() * CONFIG.CANVAS_WIDTH,
    y: Math.random() * CONFIG.CANVAS_HEIGHT,
    size: Math.random() * CONFIG.STAR_MAX_SIZE,
    speed: Math.random() * CONFIG.STAR_MAX_SPEED + CONFIG.STAR_MIN_SPEED,
  };
}

function createStars() {
  return Array.from({ length: CONFIG.STAR_COUNT }, createStar);
}
