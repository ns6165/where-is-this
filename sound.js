if (!window.top.bgmAudio) {
  window.top.bgmAudio = new Audio('./sound/music/bgm1.mp3');
  window.top.bgmAudio.loop = true;
  window.top.bgmAudio.volume = 0.5;
}

const clickSound = new Audio('./sound/click.wav');


window.addEventListener('pageshow', () => {
  if (sessionStorage.getItem('resetBgm') === 'true') {
    window.top.bgmAudio.currentTime = 0;
    sessionStorage.removeItem('resetBgm'); 
  } else {
    const savedTime = sessionStorage.getItem('bgmTime');
    if (savedTime) window.top.bgmAudio.currentTime = parseFloat(savedTime);
  }
  window.top.bgmAudio.play().catch(() => {});
});

window.addEventListener('beforeunload', () => {
  sessionStorage.setItem('bgmTime', window.top.bgmAudio.currentTime);
});

document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', () => {
    window.top.bgmAudio.play().catch(() => {});
  }, { once: true });

  document.addEventListener('click', (e) => {
    const target = e.target.closest('button, .back-btn, .nav-btn, .clickable-region');
    if (target) {
      clickSound.currentTime = 0;
      clickSound.play().catch(() => {});
      
    }
  }, { capture: true });
});
