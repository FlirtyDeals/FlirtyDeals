const audio = document.getElementById('audio');
const playButton = document.getElementById('playButton');
const currentTimeDisplay = document.getElementById('currentTime');
const durationDisplay = document.getElementById('duration');
const volumeSlider = document.getElementById('volumeSlider');
const musicPlayer = document.querySelector('.music-player');
const easterEggButton = document.getElementById('easterEggButton');

// Set initial volume to 5%
audio.volume = 0.05; // Set audio volume to 5%
volumeSlider.value = 0.05; // Set the slider value to match

// Event listener for the Easter Egg button
easterEggButton.addEventListener('click', toggleMusicPlayerVisibility);

playButton.addEventListener('click', togglePlay);
volumeSlider.addEventListener('input', updateVolume);
audio.addEventListener('loadedmetadata', updateDuration);
audio.addEventListener('timeupdate', updateCurrentTime);

function toggleMusicPlayerVisibility() {
    if (musicPlayer.style.display === 'none') {
        musicPlayer.style.display = 'flex'; // Show the music player

    } else {
        musicPlayer.style.display = 'none'; // Hide the music player
        easterEggButton.textContent = ''; // Reset button text
    }
}

function togglePlay() {
    if (audio.paused) {
        audio.play();
        playButton.textContent = 'Pause';
    } else {
        audio.pause();
        playButton.textContent = 'Play';
    }
}

function updateVolume() {
    audio.volume = volumeSlider.value;
}

function updateDuration() {
    durationDisplay.textContent = formatTime(audio.duration);
}

function updateCurrentTime() {
    currentTimeDisplay.textContent = formatTime(audio.currentTime);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}
