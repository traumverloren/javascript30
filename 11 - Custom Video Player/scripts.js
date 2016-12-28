// Get our Elements
const player = document.querySelector('.player');
const video = player.querySelector('video');
const playButton = player.querySelector('.toggle');
const fullScreenButton = player.querySelector('.fullScreen');
const volume = player.querySelector('input[name="volume"]');
const playbackRate = player.querySelector('input[name="playbackRate"]');
const skip = player.querySelectorAll('button[data-skip]');
const progressBar = player.querySelector('.progress__filled');
const progress = player.querySelector('.progress');

// Build out functions
function togglePlay() {
  video.paused ? video.play() : video.pause();
}

function togglePlayIcon() {
  if (video.paused) {
    playButton.textContent = '►';
  } else {
    playButton.textContent = '❚ ❚';
  }
}

function updateVolume() {
  video.volume = this.value;
}

function updatePlaybackRate() {
  video.playbackRate = this.value;
}

function updatePlayback() {
  video.currentTime += parseInt(this.dataset.skip, 10);
}

function updateProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  video.currentTime = (e.offsetX / progress.offsetWidth) * video.duration;
}

function toggleFullScreen() {
  if (!document.mozFullScreen && !document.webkitFullScreen) {
    if (video.mozRequestFullScreen) {
      video.mozRequestFullScreen();
    } else {
      video.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else {
      document.webkitCancelFullScreen();
    }
  }
}

// hook it all up
video.addEventListener('click', togglePlay);
playButton.addEventListener('click', togglePlay);
video.addEventListener('play', togglePlayIcon);
video.addEventListener('pause', togglePlayIcon);
volume.addEventListener('input', updateVolume);
volume.addEventListener('mouseover', updateVolume);
playbackRate.addEventListener('input', updatePlaybackRate);
playbackRate.addEventListener('mouseover', updatePlaybackRate);
skip.forEach(input => input.addEventListener('click', updatePlayback));
video.addEventListener('timeupdate', updateProgress);
fullScreenButton.addEventListener('click', toggleFullScreen);

// update progress bar when move it
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
