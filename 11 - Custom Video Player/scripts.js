// Get our Elements
const player = document.querySelector('.player');
const video = player.querySelector('video');
const playButton = player.querySelector('.toggle');
const volume = player.querySelector('input[name="volume"]');
const playbackRate = player.querySelector('input[name="playbackRate"]');
const skip = player.querySelectorAll('button[data-skip]');
const progressBar = player.querySelector('.progress__filled');

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
  const percent = (video.currentTime / video.duration * 100);
  progressBar.style.setProperty('flex-basis', `${percent}%`);
}

// hook it all up
playButton.addEventListener('click', togglePlay);
video.addEventListener('play', togglePlayIcon);
video.addEventListener('pause', togglePlayIcon);
volume.addEventListener('input', updateVolume);
playbackRate.addEventListener('input', updatePlaybackRate);
skip.forEach(input => input.addEventListener('click', updatePlayback));
video.addEventListener('timeupdate', updateProgress);
