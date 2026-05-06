const Input = {
  left: false,
  right: false,
};

function initInput() {
  document.addEventListener('keydown', handleKeyDown);
  document.addEventListener('keyup', handleKeyUp);
}

function handleKeyDown(e) {
  if (e.key.toLowerCase() === 'p' && GameState.running) {
    GameState.paused = !GameState.paused;
  }
  if (e.key === 'ArrowLeft'  || e.key.toLowerCase() === 'a') Input.left  = true;
  if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') Input.right = true;
}

function handleKeyUp(e) {
  if (e.key === 'ArrowLeft'  || e.key.toLowerCase() === 'a') Input.left  = false;
  if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') Input.right = false;
}