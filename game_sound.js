const bgmList = [
  'sound/music/game_bgm1.mp3',
  'sound/music/game_bgm2.mp3',
  'sound/music/game_bgm3.mp3'
];

window.gameSounds = {
  bgm: new Audio(bgmList[Math.floor(Math.random() * bgmList.length)]),
  correct: new Audio('sound/correct.wav'),
  wrong: new Audio('sound/wrong.wav'),
  click: new Audio('sound/click.wav'),
  gameOver: new Audio('sound/game_over.wav')
};

window.gameSounds.bgm.loop = true;
window.gameSounds.bgm.volume = 0.4;

window.playGameBgm = function() {
  if (window.top.bgmAudio) window.top.bgmAudio.pause();
  
  window.gameSounds.bgm.play().catch(e => console.log("BGM 재생 대기 중:", e));
};

window.playGameSound = function(type) {
  if (window.gameSounds[type]) {
    window.gameSounds[type].currentTime = 0;
    window.gameSounds[type].play().catch(() => {});
  }
};

document.addEventListener('click', () => {
  if (window.gameSounds.bgm && window.gameSounds.bgm.paused) {
    window.gameSounds.bgm.play().catch(() => {});
  }
  window.playGameSound('click');
}, { capture: true });

window.stopGameBgm = function() {
  if (window.gameSounds && window.gameSounds.bgm) {
    window.gameSounds.bgm.pause();
    window.gameSounds.bgm = null; 
  }
};