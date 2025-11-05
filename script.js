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

const theme = document.querySelector(".theme-toggle");

const toggle = document.createElement("toggle");

function toggleTheme() {
  document.body.classList.toggle("dark-theme");
}

theme.addEventListener("click", toggleTheme);
