const UI = {
  score:      document.getElementById('scoreVal'),
  highScore:  document.getElementById('highScoreVal'),
  abilityMsg: document.getElementById('abilityMsg'),
  sensSlider: document.getElementById('sensSlider'),
  sensDisplay:document.getElementById('sensValDisplay'),

  // Tampilkan screen berdasarkan id overlay
  showScreen(id) {
    document.querySelectorAll('.overlay').forEach(el => {
      el.style.display = 'none';
    });
    document.getElementById(id).style.display = 'flex';
  },

  // Update tampilan skor
  updateScore(value) {
    this.score.innerText = value;
  },

  // Update tampilan high score
  updateHighScore(value) {
    this.highScore.innerText = value;
  },

  // Tampilkan pesan ability sementara
  showAbilityMessage(type) {
    const colorMap = {
      BLAST:    '#9900ff',
      SHIELD:   '#ffffff',
      'SLOW-MO':'#ffff00',
      SHRINK:   '#00ff55',
    };
    this.abilityMsg.innerText = `${type} ACTIVATED!`;
    this.abilityMsg.style.color = colorMap[type] ?? 'white';
    this.abilityMsg.style.display = 'block';
    setTimeout(() => { this.abilityMsg.style.display = 'none'; }, 1500);
  },

  // Tampilkan modal game over dengan skor akhir
  showGameOver(finalScore) {
    const high = localStorage.getItem('highScore') || 0;
    document.getElementById('finalScore').innerText = finalScore;
    const isNewRecord = finalScore > high;
    document.getElementById('newRecordMsg').style.display =
      isNewRecord ? 'block' : 'none';

    if (isNewRecord) {
      localStorage.setItem('highScore', finalScore);
      this.updateHighScore(finalScore);
    }
    this.showScreen('gameOverModal');
  },

  // Reset high score dari settings
  resetRecord() {
    if (confirm('Reset High Score?')) {
      localStorage.removeItem('highScore');
      this.updateHighScore(0);
    }
  },

  // Load high score dari localStorage saat pertama kali
  loadHighScore() {
    this.updateHighScore(localStorage.getItem('highScore') || 0);
  },

  // Sinkronisasi tampilan slider sensitivity
  initSensSlider() {
    this.sensSlider.addEventListener('input', () => {
      this.sensDisplay.innerText = this.sensSlider.value;
    });
  },
};