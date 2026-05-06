const CONFIG = {
  // Canvas
  CANVAS_WIDTH: 400,
  CANVAS_HEIGHT: 550,

  // Player
  PLAYER_START_X: 190,
  PLAYER_START_Y: 500,
  PLAYER_SIZE: 20,
  PLAYER_COLOR: '#00d2ff',
  PLAYER_DEFAULT_SPEED: 6,

  // Speed & Difficulty
  BASE_SPEED: 3.5,
  SPEED_UP_INTERVAL: 600,   // setiap sekian frame, kecepatan naik
  SPEED_INCREMENT: 0.35,
  SLOWMO_SPEED: 1.8,
  SLOWMO_DURATION: 5000,    // ms
  SHRINK_DURATION: 7000,    // ms
  SHRINK_SIZE: 10,

  // Obstacle
  OBSTACLE_SPAWN_RATE: 0.04,
  OBSTACLE_MIN_SIZE: 20,
  OBSTACLE_MAX_SIZE: 25,    // ditambahkan ke min, jadi 20–45
  OBSTACLE_COLORS: ['#ff0055', '#00ff55', '#ff9900', '#9900ff', '#ffff00', '#ff3333'],

  // Power-Up
  POWERUP_INTERVAL: 60,     // selisih poin minimum antar spawn power-up
  POWERUP_SPAWN_CHANCE: 0.02,
  POWERUP_SIZE: 28,
  POWERUP_SPEED_MULTIPLIER: 0.7,
  POWERUP_FLOAT_AMPLITUDE: 15,
  POWERUP_TYPES: [
    { name: 'SHIELD',  color: '#ffffff' },
    { name: 'SLOW-MO', color: '#ffff00' },
    { name: 'SHRINK',  color: '#00ff55' },
    { name: 'BLAST',   color: '#9900ff' },
  ],

  // Stars (background)
  STAR_COUNT: 70,
  STAR_MAX_SIZE: 1.5,
  STAR_MIN_SPEED: 0.1,
  STAR_MAX_SPEED: 0.4,

  // Score
  SCORE_DIVISOR: 10,        // score mentah dibagi ini untuk ditampilkan
};