// Store all playlists
const playlists = {};

const songs = [
  {
    id: 1,
    name: "Shape of You",
    artist: "Ed Sheeran",
    image: "images/shapeOfYou.jpg",
    genre: "Pop",
    source: "music/shapeOfYou.mp3",
  },
  {
    id: 2,
    name: "Blinding Lights",
    artist: "The Weeknd",
    image: "images/blindingLights.png",
    genre: "Pop",
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
  {
    id: 4,
    name: "Sweet Child O' Mine",
    artist: "Guns N' Roses",
    image: "images/sweetochildominemain.jpg",
    genre: "Rock",
    source:
      "music/Guns N  Roses - Sweet Child O  Mine (Official Music Video).mp3",
  },
  {
    id: 5,
    name: "Bohemian Rhapsody",
    artist: "Queen",
    image: "images/Bohemian-Rhapsody.jpg",
    genre: "Rock",
    source: "music/Queen – Bohemian Rhapsody (Official Video Remastered).mp3",
  },
  {
    id: 6,
    name: "Krishna Nee Begane",
    artist: "K S Chithra",
    image: "images/krishna.jpg",
    genre: "Devotional",
    source:
      "music/Krishna Nee Beghane _ K S Chithra _ Traditional _ M Jayachandran.mp3",
  },
  {
    id: 7,
    name: "Maha Ganapatim",
    artist: "Rajshri Soul",
    image: "images/ganapati.jpeg",
    genre: "Devotional",
    source:
      "music/Maha Ganapatim Manasa Smarami With Lyrics _ Popular Devotional Ganpati Songs _ Rajshri Soul.mp3",
  },
  {
    id: 8,
    name: "SICKO MODE",
    artist: "Travis Scott ft. Drake",
    image: "images/sickomode.jpg",
    genre: "Hiphop",
    source: "music/Travis Scott - SICKO MODE ft. Drake.mp3",
  },
];

// Theme toggle (button with id 'themeToggle' in the HTML)
const themeBtn = document.getElementById("themeToggle");
function toggleTheme() {
  document.body.classList.toggle("dark-theme");
  if (!themeBtn) return;
  if (themeBtn.textContent.includes("Dark")) {
    themeBtn.innerHTML = '<i class="fas fa-moon"></i> Light Mode';
  } else {
    themeBtn.innerHTML = '<i class="fas fa-sun"></i> Dark Mode';
  }
}
if (themeBtn) themeBtn.addEventListener("click", toggleTheme);
let songNumber = 0;
//function to display songs
function displaySongs(song) {
  // target the container that exists in the HTML
  const songContainer = document.querySelector(".song-container");
  if (!songContainer) return;
  songContainer.innerHTML = ""; // clear before displaying
  const currentSong = document.createElement("div");
  // ensure the element has both the visual card class and a stable container class
  currentSong.classList.add("card-div", "song-card");

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
  prev.innerHTML = '<i class="fas fa-step-backward"></i> Previous';
  prev.classList.add("btn-gradient");
  const next = document.createElement("button");
  const addToPlaylistBtn = document.createElement("button");
  addToPlaylistBtn.innerHTML =
    '<i class="fas fa-plus-circle"></i> Add to Playlist';
  addToPlaylistBtn.classList.add("btn-gradient");
  next.innerHTML = 'Next <i class="fas fa-step-forward"></i>';
  next.classList.add("btn-gradient");
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

  // attach ripple handlers only to these newly created buttons so they get the effect
  [prev, next, addToPlaylistBtn].forEach((b) => attachRippleToButton(b));

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

const genreFilter = document.querySelector(".all-song-div .filter select");

// Render the main left-side song list
function renderSongList(filtered = null, label = "All Songs") {
  const ul = document.querySelector(".song-list ul");
  if (!ul) return;
  ul.innerHTML = "";
  const list = filtered || songs;
  const header = document.querySelector(".song-list h2");
  if (header) header.textContent = label;
  list.forEach((song, idx) => {
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.src = song.image;
    img.alt = song.name;
    const meta = document.createElement("div");
    meta.classList.add("meta");
    meta.innerHTML = `<strong>${song.name}</strong><small>${song.artist}</small>`;
    li.appendChild(img);
    li.appendChild(meta);

    li.addEventListener("click", () => {
      songNumber = songs.findIndex((s) => s.id === song.id);
      // mark active
      document
        .querySelectorAll(".song-list li")
        .forEach((n) => n.classList.remove("active"));
      li.classList.add("active");
      displaySongs(song);
    });

    ul.appendChild(li);
  });
}

// Setup genre filter options dynamically from songs
if (document.querySelector(".all-song-div .filter select")) {
  const gf = document.querySelector(".all-song-div .filter select");
  const genres = Array.from(new Set(songs.map((s) => s.genre)));
  // add 'All' as default
  const allOpt = document.createElement("option");
  allOpt.value = "All";
  allOpt.textContent = "All";
  gf.appendChild(allOpt);
  genres.forEach((g) => {
    const opt = document.createElement("option");
    opt.value = g;
    opt.textContent = g;
    gf.appendChild(opt);
  });

  gf.addEventListener("change", function () {
    const selected = gf.value;
    if (selected === "All") renderSongList(null, "All Songs");
    else
      renderSongList(
        songs.filter((s) => s.genre === selected),
        selected
      );
  });
}
//creating NEXT AND PREVIOUS FUNCTION

function playNextSong() {
  songNumber = songNumber + 1;
  displaySongs(songs[songNumber]);
}
function playPreviousSong() {
  songNumber = songNumber - 1;
  displaySongs(songs[songNumber]);
}

// initial render of song list and display of the first song
renderSongList();
// mark first song active if present
const firstLi = document.querySelector(".song-list li");
if (firstLi) firstLi.classList.add("active");
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

// helper to attach ripple to a single button element (used for buttons created dynamically)
function attachRippleToButton(btn) {
  if (!btn) return;
  btn.addEventListener("click", function (e) {
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
}
