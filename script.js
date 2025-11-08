// ====== Persistence Keys ======
const LS_KEYS = {
  PLAYLISTS: "mp_playlists_v1",
  CURRENT_PL_NAME: "mp_current_playlist_v1",
  SONG_INDEX: "mp_song_index_v1",
  RECENTS: "mp_recent_songs_v1",
};

// ====== Data ======
let playlists = {}; // name -> Song[]
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
  {
    id: 9,
    name: "God's Plan",
    artist: "Drake",
    image: "images/godsplan.jpeg",
    genre: "Hiphop",
    source: "music/Drake - God s Plan.mp3",
  },
];

// ====== Theme ======
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
themeBtn?.addEventListener("click", toggleTheme);

// ====== State ======
let songNumber = 0;
let currentPlaylistName = null;
let recentSongs = []; // array of song ids (MRU, unique, max 10)

// ====== Utils: Persistence ======
function savePlaylists() {
  localStorage.setItem(LS_KEYS.PLAYLISTS, JSON.stringify(playlists));
}
function saveCurrent() {
  localStorage.setItem(LS_KEYS.CURRENT_PL_NAME, currentPlaylistName || "");
  localStorage.setItem(LS_KEYS.SONG_INDEX, String(songNumber));
}
function saveRecents() {
  localStorage.setItem(LS_KEYS.RECENTS, JSON.stringify(recentSongs));
}
function loadState() {
  try {
    const plJSON = localStorage.getItem(LS_KEYS.PLAYLISTS);
    if (plJSON) playlists = JSON.parse(plJSON) || {};
  } catch (_) {}
  const storedName = localStorage.getItem(LS_KEYS.CURRENT_PL_NAME);
  currentPlaylistName = storedName || null;

  const idx = parseInt(localStorage.getItem(LS_KEYS.SONG_INDEX), 10);
  if (!Number.isNaN(idx) && songs[idx]) songNumber = idx;

  try {
    const r = localStorage.getItem(LS_KEYS.RECENTS);
    if (r) recentSongs = JSON.parse(r) || [];
  } catch (_) {}
}

// ====== DOM Shortcuts ======
const playlistContainer = document.querySelector(".all-playlists ul");
const currentPlaylistContainer = document.querySelector(".current-playlist ul");
const currentPlaylistHeader = document.querySelector(".current-playlist h2");
const recentList = document.querySelector(".recently-played ul");
const recentHeader = document.querySelector(".recently-played h2");
const songListUL = document.querySelector(".song-list ul");

// ====== Ripple Helpers ======
function attachButtonRipples() {
  document.querySelectorAll("button, .btn-gradient").forEach((btn) => {
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
  });
}
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

// ====== Current Song Card ======
function renderCurrentSong(song) {
  const songContainer = document.querySelector(".song-container");
  if (!songContainer) return;
  songContainer.innerHTML = "";

  const currentSong = document.createElement("div");
  currentSong.classList.add("card-div", "song-card", "fade-in");

  const thumbnail = document.createElement("div");
  thumbnail.classList.add("thumbnail");
  thumbnail.style.backgroundImage = `url(${song.image})`;

  const songInfo = document.createElement("div");
  songInfo.classList.add("song-info");
  songInfo.innerHTML = `<h3>${song.name}</h3><p>${song.artist}</p>`;

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
  next.innerHTML = 'Next <i class="fas fa-step-forward"></i>';
  next.classList.add("btn-gradient");

  const addToPlaylistBtn = document.createElement("button");
  addToPlaylistBtn.innerHTML =
    '<i class="fas fa-plus-circle"></i> Add to Playlist';
  addToPlaylistBtn.classList.add("btn-gradient");

  buttons.append(prev, next, addToPlaylistBtn);
  currentSong.append(thumbnail, songInfo, audioControls, buttons);
  songContainer.appendChild(currentSong);

  prev.style.display = songNumber === 0 ? "none" : "";
  next.style.display = songNumber === songs.length - 1 ? "none" : "";

  prev.addEventListener("click", playPreviousSong);
  next.addEventListener("click", playNextSong);
  addToPlaylistBtn.addEventListener("click", addToPlaylist);

  [prev, next, addToPlaylistBtn].forEach(attachRippleToButton);

  const audioEl = currentSong.querySelector("audio");
  if (audioEl) {
    audioEl.addEventListener("play", () => {
      thumbnail.classList.add("playing");
      pushRecent(songs[songNumber].id);
    });
    audioEl.addEventListener("pause", () =>
      thumbnail.classList.remove("playing")
    );
    audioEl.addEventListener("ended", () =>
      thumbnail.classList.remove("playing")
    );
  }

  saveCurrent();
}

// ====== Core: Song Nav ======
function playNextSong() {
  if (songNumber < songs.length - 1) {
    songNumber++;
    renderCurrentSong(songs[songNumber]);
    highlightActiveSongInList();
    saveCurrent();
  }
}
function playPreviousSong() {
  if (songNumber > 0) {
    songNumber--;
    renderCurrentSong(songs[songNumber]);
    highlightActiveSongInList();
    saveCurrent();
  }
}

// ====== Recently Played ======
function pushRecent(songId) {
  recentSongs = [songId, ...recentSongs.filter((id) => id !== songId)];
  if (recentSongs.length > 10) recentSongs.length = 10;
  saveRecents();
  renderRecents();
}
function renderRecents() {
  if (!recentList) return;
  recentList.innerHTML = "";
  const items = recentSongs
    .map((id) => songs.find((s) => s.id === id))
    .filter(Boolean);
  if (items.length === 0) {
    recentList.innerHTML = "<li><em>No recent plays yet.</em></li>";
    return;
  }
  items.forEach((song) => {
    const li = document.createElement("li");
    li.className = "song-row fade-in";
    const btn = document.createElement("button");
    btn.textContent = `${song.name} — ${song.artist}`;
    btn.className = "btn btn-sm btn-light";
    btn.addEventListener("click", () => {
      songNumber = songs.findIndex((s) => s.id === song.id);
      renderCurrentSong(song);
      highlightActiveSongInList();
      pushRecent(song.id);
    });
    li.appendChild(btn);
    recentList.appendChild(li);
  });
}

// ====== Playlists: CRUD & Render ======
function createNewPlaylist() {
  const inputEl = document.querySelector(".playlist-form input");
  const playlistName = (inputEl?.value || "").trim();
  if (!playlistName) {
    alert("Please enter a valid playlist name.");
    return;
  }
  if (playlists[playlistName]) {
    alert("Playlist already exists!");
    return;
  }
  playlists[playlistName] = [];
  savePlaylists();
  renderAllPlaylists();
  inputEl.value = "";
}

function deletePlaylist(name) {
  if (!playlists[name]) return;
  const ok = confirm(`Delete playlist "${name}"? This cannot be undone.`);
  if (!ok) return;
  delete playlists[name];
  if (currentPlaylistName === name) {
    currentPlaylistName = null;
    currentPlaylistHeader.textContent = "Current Playlist";
    currentPlaylistContainer.innerHTML = "";
  }
  savePlaylists();
  saveCurrent();
  renderAllPlaylists();
}

function renderAllPlaylists(list = null, header = "All Playlists") {
  document.querySelector(".all-playlists h2").textContent = header;
  playlistContainer.innerHTML = "";

  const names = list || Object.keys(playlists);
  if (names.length === 0) {
    const empty = document.createElement("li");
    empty.innerHTML = "<em>No playlists yet.</em>";
    playlistContainer.appendChild(empty);
    return;
  }

  names.forEach((name) => {
    const li = document.createElement("li");
    li.className = "playlist-item fade-in";

    const btn = document.createElement("button");
    btn.textContent = name;
    btn.addEventListener("click", () => showCurrentPlaylist(name));

    const actions = document.createElement("div");
    actions.className = "playlist-actions";

    const del = document.createElement("button");
    del.className = "icon-btn";
    del.title = "Delete playlist";
    del.innerHTML = '<i class="fa-solid fa-trash"></i>';
    del.addEventListener("click", (e) => {
      e.stopPropagation();
      deletePlaylist(name);
    });

    actions.appendChild(del);
    li.append(btn, actions);
    playlistContainer.appendChild(li);
  });
}

function showCurrentPlaylist(playlistName) {
  currentPlaylistName = playlistName;
  saveCurrent();
  renderPlaylistSong(playlistName);
}

function renderPlaylistSong(playlistName) {
  currentPlaylistContainer.innerHTML = "";
  currentPlaylistHeader.textContent = `Current Playlist: ${playlistName}`;

  const list = playlists[playlistName] || [];
  if (list.length === 0) {
    const li = document.createElement("li");
    li.innerHTML = "<em>No songs in this playlist.</em>";
    currentPlaylistContainer.appendChild(li);
    return;
  }

  list.forEach((song) => {
    const li = document.createElement("li");
    li.className = "song-row fade-in";

    const btn = document.createElement("button");
    btn.textContent = `${song.name} - ${song.artist}`;
    btn.addEventListener("click", () => {
      songNumber = songs.findIndex((s) => s.id === song.id);
      renderCurrentSong(song);
      pushRecent(song.id);
    });

    const remove = document.createElement("button");
    remove.className = "icon-btn remove";
    remove.title = "Remove from playlist";
    remove.innerHTML = "&#10005;"; // ×
    remove.addEventListener("click", (e) => {
      e.stopPropagation();
      removeSongFromPlaylist(playlistName, song.id);
    });

    li.append(btn, remove);
    currentPlaylistContainer.appendChild(li);
  });
}

function removeSongFromPlaylist(playlistName, songId) {
  if (!playlists[playlistName]) return;
  playlists[playlistName] = playlists[playlistName].filter(
    (s) => s.id !== songId
  );
  savePlaylists();
  renderPlaylistSong(playlistName);
}

// Add current song to selected playlist
function addToPlaylist() {
  const headerText = currentPlaylistHeader.textContent || "Current Playlist";
  if (headerText === "Current Playlist") {
    alert("Please select a playlist first!");
    return;
  }
  const playlistName = headerText.replace("Current Playlist: ", "");
  const currentSong = songs[songNumber];

  if (!playlists[playlistName]) playlists[playlistName] = [];
  if (playlists[playlistName].some((s) => s.id === currentSong.id)) {
    alert("Song already in playlist");
    return;
  }
  playlists[playlistName].push(currentSong);
  savePlaylists();
  renderPlaylistSong(playlistName);
}

// ====== Song List (left) ======
function renderSongList(list = null, label = "All Songs") {
  const header = document.querySelector(".song-list h2");
  if (header) header.textContent = label;

  songListUL.innerHTML = "";
  const data = list || songs;

  data.forEach((song) => {
    const li = document.createElement("li");
    li.classList.add("fade-in");

    const img = document.createElement("img");
    img.src = song.image;
    img.alt = song.name;

    const meta = document.createElement("div");
    meta.classList.add("meta");
    meta.innerHTML = `<strong>${song.name}</strong><small>${song.artist}</small>`;

    li.append(img, meta);

    li.addEventListener("click", () => {
      songNumber = songs.findIndex((s) => s.id === song.id);
      renderCurrentSong(song);
      highlightActiveSongInList();
      pushRecent(song.id);
      saveCurrent();
    });

    songListUL.appendChild(li);
  });

  highlightActiveSongInList();
}

function highlightActiveSongInList() {
  const items = document.querySelectorAll(".song-list li");
  items.forEach((node) => node.classList.remove("active"));
  const activeId = songs[songNumber]?.id;
  if (!activeId) return;
  // mark by comparing name+artist text (simple & robust)
  [...items].forEach((li) => {
    const strong = li.querySelector("strong");
    const small = li.querySelector("small");
    if (!strong || !small) return;
    if (
      strong.textContent === songs[songNumber].name &&
      small.textContent === songs[songNumber].artist
    ) {
      li.classList.add("active");
    }
  });
}

// ====== Genre Filter Setup ======
(function setupGenreFilter() {
  const gf = document.querySelector(".all-song-div .filter select");
  if (!gf) return;

  const genres = Array.from(new Set(songs.map((s) => s.genre)));
  gf.innerHTML = "";
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
  gf.addEventListener("change", () => {
    const selected = gf.value;
    if (selected === "All") renderSongList(null, "All Songs");
    else
      renderSongList(
        songs.filter((s) => s.genre === selected),
        selected
      );
  });
})();

// ====== Search: Songs ======
const searchInput = document.querySelector(".song-search");
const searchBtn = document.querySelector(".search-btn");
function performSearch() {
  const q = (searchInput?.value || "").toLowerCase();
  const filtered = songs.filter(
    (s) =>
      s.name.toLowerCase().includes(q) || s.artist.toLowerCase().includes(q)
  );
  if (filtered.length === 0)
    renderSongList([], `No results for "${searchInput.value}"`);
  else renderSongList(filtered, `Search results for "${searchInput.value}"`);
}
searchBtn?.addEventListener("click", performSearch);
searchInput?.addEventListener("keypress", (e) => {
  if (e.key === "Enter") performSearch();
});

// ====== Search: Playlists (refined) ======
const playlistSearchInput = document.querySelector(
  ".playlist-form input:nth-child(3)"
);
const playlistSearchBtn = document.querySelector(
  ".playlist-form button:nth-child(4)"
);

function renderPlaylistList(list, headerText) {
  renderAllPlaylists(list, headerText);
}

function performPlaylistSearch() {
  const q = (playlistSearchInput?.value || "").toLowerCase();
  const names = Object.keys(playlists);
  const filtered = names.filter((n) => n.toLowerCase().includes(q));

  if (filtered.length === 0) {
    renderPlaylistList([], `No results for "${playlistSearchInput.value}"`);
  } else {
    renderPlaylistList(
      filtered,
      `Search results for "${playlistSearchInput.value}"`
    );
  }
}
playlistSearchBtn?.addEventListener("click", performPlaylistSearch);
playlistSearchInput?.addEventListener("keypress", (e) => {
  if (e.key === "Enter") performPlaylistSearch();
});

// ====== Boot ======
function boot() {
  loadState();

  // First render lists
  renderSongList();
  renderAllPlaylists();

  // Restore current playlist view if any
  if (currentPlaylistName && playlists[currentPlaylistName]) {
    renderPlaylistSong(currentPlaylistName);
  } else {
    currentPlaylistHeader.textContent = "Current Playlist";
    currentPlaylistContainer.innerHTML = "";
  }

  // Render song card
  if (!songs[songNumber]) songNumber = 0;
  renderCurrentSong(songs[songNumber]);

  // Render recents from storage
  renderRecents();

  // Attach create button
  document
    .querySelector(".createPlaylistBtn")
    ?.addEventListener("click", createNewPlaylist);

  // Initial ripples
  attachButtonRipples();
}
boot();
