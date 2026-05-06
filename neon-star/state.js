const GameState = {
  score: 0,
  active: false,
  paused: false,
  running: false,
  floatTime: 0,
  lastPowerUpScore: 0,

  baseSpeed: CONFIG.BASE_SPEED,
  currentSpeed: CONFIG.BASE_SPEED,
  slowMoActive: false,
  currentSpawnRate: CONFIG.OBSTACLE_SPAWN_RATE,

  player: null,
  obstacles: [],
  powerUps: [],
  stars: [],

  reset() {
    this.score = 0;
    this.active = true;
    this.paused = false;
    this.floatTime = 0;
    this.lastPowerUpScore = 0;
    this.baseSpeed = CONFIG.BASE_SPEED;
    this.currentSpeed = CONFIG.BASE_SPEED;
    this.slowMoActive = false;
    this.currentSpawnRate = CONFIG.OBSTACLE_SPAWN_RATE;
    this.obstacles = [];
    this.powerUps = [];
    this.stars = [];
    this.player = null;
  },
};
