

### Repository Description

> **Music-Player** – A lightweight, browser-based music player built with HTML, CSS and JavaScript. Play tracks, see album art, switch songs — no framework, just vanilla JS.

PROJECT DEMO VIDEO LINK - https://shorturl.at/KqZGw

### README.md

````markdown
# Music-Player 🎵

A simple, responsive music player web app built with plain HTML, CSS and JavaScript.
Designed to be easy to understand, extend and adapt. Ideal for learning how media playback works on the web.

---

## Features

- Play, pause and switch between songs
- Display song info: title, artist, and cover image
- Highlight the currently playing track in the list
- Responsive UI that works on desktop and mobile
- Clean, minimal code — no heavy frameworks

---

## Getting Started

### Prerequisites

All you need is a browser. No server setup required for basic use.

### Installation

1. Clone the repo
   ```bash
   git clone https://github.com/sushanthacharya2003/Music-Player.git
   ```
````

2. Open `index.html` in your browser
3. To add your own songs:

   - Put audio files in the `music/` folder
   - Update the `songs` array in `script.js` with the new details (name, artist, image path, source path)

4. Play around with styling via `style.css` to match your taste

---

## Project Structure

```text
Music-Player/
│
├── images/         # cover art and other visuals
├── music/          # audio files
├── index.html      # entry point
├── style.css       # component and layout styles
└── script.js       # logic for loading & controlling playback
```

---

## How It Works (Short Explanation)

1. The `songs` array (in `script.js`) contains metadata for each track (title, artist, cover image, file path).
2. When you click a track in the list, the `songNumber` pointer is set and `renderCurrentSong()` is called to:

   - Update the UI card with the selected song’s metadata
   - Set the `audio.src` to the selected file
   - Invoke `audio.play()` to start playback

3. Playback controls (play, pause, next, previous) manipulate the same `songNumber` and reuse `renderCurrentSong()` so logic stays in one place.

---

## Why I Built It

- To deepen my understanding of HTML5 audio APIs
- To create a minimal but full-fledged project I can show in my portfolio
- To build something **from scratch**, without relying on libraries, so I control the logic end-to-end

---

## Future Improvements

- Add playlist shuffle and repeat modes
- Show time elapsed / remaining during playback
- Add volume and playback speed controls
- Couple with a backend (Node.js / MongoDB) for storing user playlists
- Convert into a mobile-friendly progressive-web-app (PWA)

---

## License

This project is open-source. Feel free to use, adapt or expand it.
(Consider adding a `LICENSE` file if you want to specify a formal license.)

---

## Contact

Built by **SUSH (Sushanth Acharya)**
GitHub: [@sushanthacharya2003](https://github.com/sushanthacharya2003)
Feel free to drop me a message if you have feedback or suggestions.


