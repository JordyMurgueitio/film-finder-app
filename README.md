# 🎬 Movie Finder App

![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white&style=for-the-badge)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white&style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black&style=for-the-badge)

A simple and fun web app that allows users to discover and like random movies by genre using The Movie DB API.

## 🚀 Live Demo

Check out the live version of the app:

[![🌐 Try the App](https://img.shields.io/badge/🌐%20Try%20the%20App-blue?style=for-the-badge)](https://jordymurgueitio.github.io/film-finder-app/)

## 📸 Screenshots

<div style="display: flex; flex-wrap: wrap; gap: 30px; justify-content: space-evenly;">
  <img src="./assets/home.png" alt="Home view" style="width: 45%;">
  <img src="./assets/liked.png" alt="Liked movies section" style="width: 45%;">
</div>

## ✨ Features

- 🎲 Get a random movie by genre
- 👍 Like and save your favorite movies (stored in `localStorage`)
- 🗂️ Show/hide your list of liked movies
- ❌ Remove movies from your liked list
- 🔄 Get a new random movie with like/dislike buttons
- 📱 Responsive design

## 🛠️ Built With

- HTML
- CSS
- JavaScript (ES6)
- [The Movie DB API](https://www.themoviedb.org/documentation/api)

## 📦 How to Run It Locally

1. Clone this repo:

   ```bash
   git clone https://github.com/jordymurgueitio/film-finder-app.git
   cd film-finder-app

   ```

2. Open index.html in your browser (or use Live Server)
3. ⚠️ Make sure to insert your own TMDB API key in the JS file:

```javascript
const tmdbKey = "YOUR_API_KEY_HERE";
```
