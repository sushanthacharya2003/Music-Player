// Store all playlists
const playlists = {};

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

// Theme toggle (button with id 'themeToggle' in the HTML)
const themeBtn = document.getElementById("themeToggle");
function toggleTheme() {
  document.body.classList.toggle("dark-theme");
  if (!themeBtn) return;
  if (themeBtn.textContent.includes("Dark")) {
    themeBtn.textContent = "🌜 Light Mode";
  } else {
    themeBtn.textContent = "🌞 Dark Mode";
  }
}
if (themeBtn) themeBtn.addEventListener("click", toggleTheme);
let songNumber = 0;
//function to display songs
function displaySongs(song) {
  const songContainer = document.querySelector(".song-card");
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
  const addToPlaylistBtn = document.createElement("button");
  addToPlaylistBtn.textContent = "Add to Playlist";
  next.textContent = "Next";
  buttons.appendChild(prev);
  buttons.appendChild(next);
  buttons.appendChild(addToPlaylistBtn);
  if (songNumber === 0) {
    prev.style.display = "none";
  }
  if (songNumber === songs.length - 1) {
    next.style.display = "none";
  }
  prev.addEventListener("click", playPreviousSong);
  next.addEventListener("click", playNextSong);
  addToPlaylistBtn.addEventListener("click", addToPlaylist);
  currentSong.append(thumbnail, songInfo, audioControls, buttons);
  songContainer.appendChild(currentSong);

  // attach audio play/pause listeners to toggle thumbnail animation
  const audioEl = currentSong.querySelector("audio");
  if (audioEl) {
    audioEl.addEventListener("play", () => thumbnail.classList.add("playing"));
    audioEl.addEventListener("pause", () =>
      thumbnail.classList.remove("playing")
    );
    audioEl.addEventListener("ended", () =>
      thumbnail.classList.remove("playing")
    );
  }
}

//Creating ADD TO PLAYLIST FUNCTION
function addToPlaylist() {
  const currentPlaylistName = document.querySelector(
    ".current-playlist h2"
  ).textContent;
  if (currentPlaylistName === "Current Playlist") {
    alert("Please select a playlist first!");
    return;
  }

  // Get the current song
  const currentSong = songs[songNumber];
  const playlistName = currentPlaylistName.replace("Current Playlist: ", "");

  // Check if song already exists in the playlist
  if (playlists[playlistName].some((song) => song.id === currentSong.id)) {
    alert("Song already in playlist");
    return;
  }

  // Add song to the playlist array
  playlists[playlistName].push(currentSong);

  // Update the display
  renderPlaylistSongs(playlistName);
}

//creating display all playlist function
const playlistContainer = document.querySelector(".all-playlists ul");

function createNewPlaylist() {
  const inputEl = document.querySelector(".playlist-form input");
  const playlistName = inputEl.value;

  if (playlistName.trim() === "") {
    alert("Please enter a valid playlist name.");
    return;
  }

  if (playlists[playlistName]) {
    alert("Playlist already exists!");
    return;
  }

  // Create new playlist array
  playlists[playlistName] = [];

  // Create NEW li + button for each playlist
  const playlistItem = document.createElement("li");
  const playlistButton = document.createElement("button");

  playlistButton.textContent = playlistName;
  playlistButton.setAttribute("data-playlist", playlistName);
  playlistItem.appendChild(playlistButton);
  playlistContainer.appendChild(playlistItem);

  inputEl.value = "";

  // Add click event to show this playlist
  playlistButton.addEventListener("click", () =>
    showCurrentPlaylist(playlistName)
  );
}

const createPlaylistBtn = document.querySelector(".createPlaylistBtn");
if (createPlaylistBtn)
  createPlaylistBtn.addEventListener("click", createNewPlaylist);

const currentPlaylistContainer = document.querySelector(
  ".playlist-lists .current-playlist ul"
);

// Function to render songs in a playlist
function renderPlaylistSongs(playlistName) {
  currentPlaylistContainer.innerHTML = ""; // Clear existing items
  document.querySelector(
    ".current-playlist h2"
  ).textContent = `Current Playlist: ${playlistName}`;

  playlists[playlistName].forEach((song) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = `${song.name} - ${song.artist}`;

    // Add click event to play the song
    button.addEventListener("click", () => {
      songNumber = songs.findIndex((s) => s.id === song.id);
      displaySongs(song);
    });

    li.appendChild(button);
    currentPlaylistContainer.appendChild(li);
  });
}

function showCurrentPlaylist(playlistName) {
  // Set current playlist name
  document.querySelector(
    ".current-playlist h2"
  ).textContent = `Current Playlist: ${playlistName}`;

  // Render the songs
  renderPlaylistSongs(playlistName);
}

const genreFilter = document.querySelector(
  ".all-song-div > .filter > .genre-filter"
);
const Pop = document.createElement("option");
Pop.value = "Pop";
Pop.textContent = "Pop";
genreFilter.appendChild(Pop);
const Rock = document.createElement("option");
Rock.value = "Rock";
Rock.textContent = "Rock";
genreFilter.appendChild(Rock);
const Disco = document.createElement("option");
Disco.value = "Disco";
Disco.textContent = "Disco";
genreFilter.appendChild(Disco);
const Hiphop = document.createElement("option");
Hiphop.value = "Hiphop";
Hiphop.textContent = "Hiphop";
genreFilter.appendChild(Hiphop);

//creating NEXT AND PREVIOUS FUNCTION

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

// Ripple effect for buttons — create a span at click position and remove after animation
function attachButtonRipples() {
  document.querySelectorAll("button, .btn-gradient").forEach((btn) => {
    btn.addEventListener("click", function (e) {
      // don't create ripple for programmatic clicks
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.2;
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      const ripple = document.createElement("span");
      ripple.className = "ripple";
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = x + "px";
      ripple.style.top = y + "px";
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 650);
    });
  });
}

// ensure ripples are attached after initial DOM render
attachButtonRipples();
