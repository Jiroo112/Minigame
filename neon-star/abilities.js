const ABILITY_HANDLERS = {
  SHIELD() {
    GameState.player.hasShield = true;
    GameState.player.color = '#ffffff';
  },

  'SLOW-MO'() {
    if (GameState.slowMoActive) return;

    GameState.slowMoActive = true;
    GameState.currentSpeed = CONFIG.SLOWMO_SPEED;
    GameState.currentSpawnRate = CONFIG.OBSTACLE_SPAWN_RATE * 0.4;

    setTimeout(() => {
      if (!GameState.active) return;
      GameState.slowMoActive = false;
      GameState.currentSpeed = GameState.baseSpeed;
      GameState.currentSpawnRate = Math.min(
        CONFIG.OBSTACLE_SPAWN_RATE + (GameState.baseSpeed - CONFIG.BASE_SPEED) * 0.03,
        0.12
      );
    }, CONFIG.SLOWMO_DURATION);
  },

  SHRINK() {
    GameState.player.size = CONFIG.SHRINK_SIZE;
    setTimeout(() => {
      if (!GameState.active) return;
      GameState.player.size = GameState.player.baseSize;
    }, CONFIG.SHRINK_DURATION);
  },

  BLAST() {
    GameState.obstacles = [];
  },
};

function activateAbility(type) {
  const handler = ABILITY_HANDLERS[type];
  if (handler) handler();
  UI.showAbilityMessage(type);
}
