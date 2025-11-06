const songs = [
  {
    id: 1,
    name: "Shape of You",
    artist: "Ed Sheeran",
    image: "images/shapeOfYou.jpg",
    genre: "Emotional",
    source: "music/shapeOfYou.mp3",
  },
  {
    id: 2,
    name: "Blinding Lights",
    artist: "The Weeknd",
    image: "images/blindingLights.png",
    genre: "Disco",
    source: "music/blindingLights.mp3",
  },
  {
    id: 3,
    name: "Levitating",
    artist: "Dua Lipa",
    image: "images/levitating.jpg",
    genre: "Pop",
    source: "music/levitating.mp3",
  },
];

const themeCheckbox = document.getElementById("theme-checkbox");
const themeText = document.querySelector(".theme-text");

// Toggle function
function toggleTheme() {
  // 1. Toggle the 'dark-theme' class on the body
  document.body.classList.toggle("dark-theme");

  // 2. Change the text content
  if (themeText.textContent.includes("Dark")) {
    themeText.innerHTML = `🌜 Light Mode`;
  } else {
    themeText.innerHTML = `🌞 Dark Mode`;
  }
}

// Toggle event listener: Listen for changes on the checkbox input
themeCheckbox.addEventListener("change", toggleTheme);
let songNumber = 0;
//function to display songs
function displaySongs(song) {
  const songContainer = document.querySelector(".song-container");
  songContainer.innerHTML = ""; // clear before displaying
  const currentSong = document.createElement("div");
  currentSong.classList.add("card-div");

  const thumbnail = document.createElement("div");
  thumbnail.classList.add("thumbnail");
  thumbnail.style.backgroundImage = `url(${song.image})`;

  const songInfo = document.createElement("div");
  songInfo.classList.add("song-info");
  songInfo.innerHTML = `
    <h3>${song.name}</h3>
    <p>${song.artist}</p>`;

  const audioControls = document.createElement("div");
  audioControls.classList.add("audio-controls");
  audioControls.innerHTML = `
    <audio controls>
      <source src="${song.source}" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>`;

  const buttons = document.createElement("div");
  buttons.classList.add("navigation-buttons");
  const prev = document.createElement("button");
  prev.textContent = "Previous";
  const next = document.createElement("button");
  next.textContent = "Next";
  buttons.appendChild(prev);
  buttons.appendChild(next);
  if (songNumber === 0) {
    prev.style.display = "none";
  }
  if (songNumber === songs.length - 1) {
    next.style.display = "none";
  }
  prev.addEventListener("click", playPreviousSong);
  next.addEventListener("click", playNextSong);

  currentSong.append(thumbnail, songInfo, audioControls, buttons);
  songContainer.appendChild(currentSong);
}

function playNextSong() {
  songNumber = songNumber + 1;
  displaySongs(songs[songNumber]);
}

function playPreviousSong() {
  songNumber = songNumber - 1;
  displaySongs(songs[songNumber]);
}

// initial display
displaySongs(songs[songNumber]);
