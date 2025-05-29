// Populate dropdown menu with all the available genres
const populateGenreDropdown = (genres) => {
    const select = document.getElementById('genres')
    for (const genre of genres) {
        let option = document.createElement("option");
        option.value = genre.id;
        option.text = genre.name;
        select.appendChild(option);
    }
};

// Returns the current genre selection from the dropdown menu
const getSelectedGenre = () => {
    const selectedGenre = document.getElementById('genres').value;
    return selectedGenre;
};

// Displays the like and dislike buttons on the page
const showBtns = () => {
    const btnDiv = document.getElementById('likeOrDislikeBtns');
    btnDiv.removeAttribute('hidden');
};

// Clear the current movie from the screen
const clearCurrentMovie = () => {
    const moviePosterDiv = document.getElementById('moviePoster');
    const movieTextDiv = document.getElementById('movieText');
    moviePosterDiv.innerHTML = '';
    movieTextDiv.innerHTML = '';
}

// display the liked movies on the page
let likedVisible = false; // track toggle state
const showLikedBtn = document.getElementById('showLikedBtn');
const likedMoviesSection = document.getElementById('likedMoviesSection');
const likedMovies = JSON.parse(localStorage.getItem('likedMovies')) || [];
let currentMovie = null;

const renderLikedMovies = () => {   
    // clean the container
    const likedMoviesContainer = document.getElementById('likedMoviesContainer');
    likedMoviesContainer.innerHTML = '';
    // Loop through liked movies and create cards for each
    likedMovies.forEach(movie => {
        const likedMovieCard = createLikedMovieCard(movie);
        likedMoviesContainer.appendChild(likedMovieCard);
    });
    // Show the liked movies container
    document.getElementById('likedMoviesSection').removeAttribute('hidden');
};
showLikedBtn.onclick = () => {
    likedVisible = !likedVisible;
    if (likedVisible) {
        renderLikedMovies();
        likedMoviesSection.removeAttribute('hidden');
        showLikedBtn.textContent = "Hide Liked Movies";
    } else {
        likedMoviesSection.setAttribute('hidden', true);
        showLikedBtn.textContent = "Show Liked Movies";
    };
};

// After liking a movie, clears the current movie from the screen and gets another random movie
const likeMovie = () => {
    if (!likedMovies.some(movie => movie.id === currentMovie.id)) {
        likedMovies.push(currentMovie);     
        localStorage.setItem('likedMovies', JSON.stringify(likedMovies));
    }
    if (likedVisible) {
        renderLikedMovies();
    }
    clearCurrentMovie();                
    showRandomMovie();  
};

// After disliking a movie, clears the current movie from the screen and gets another random movie
const dislikeMovie = () => {
    clearCurrentMovie();
    showRandomMovie();
};

// Create HTML for movie poster
const createMoviePoster = (posterPath, useId = true) => {
    const moviePosterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`;
    const posterImg = document.createElement('img');
    posterImg.setAttribute('src', moviePosterUrl);
    if (useId) {
        posterImg.setAttribute('id', 'moviePoster');
    } else {
        posterImg.classList.add('liked-movie-poster'); // for styling
    }
    return posterImg;
};

// Create HTML for movie title
const createMovieTitle = (title, useId = true) => {
    const titleHeader = document.createElement('h1');
    if (useId) {
        titleHeader.setAttribute('id', 'movieTitle');
    } else {
        titleHeader.classList.add('liked-movie-title');
    }
    titleHeader.innerHTML = title;
    return titleHeader;
};

// Create HTML for movie overview
const createMovieOverview = (overview) => {
    const overviewParagraph = document.createElement('p');
    overviewParagraph.setAttribute('id', 'movieOverview');
    overviewParagraph.innerHTML = overview;
    return overviewParagraph;
};
// Create HTML for movie release date
const createMovieReleaseDate = (releaseDate) => {
    const dateParagraph = document.createElement('p');
    dateParagraph.setAttribute('id', 'movieReleaseDate');
    dateParagraph.innerHTML = releaseDate;
    return dateParagraph;
};
// Create HTML for movie cast
const createMovieCast = (cast) => {
    const castParagraph = document.createElement('p');
    castParagraph.setAttribute('id', 'movieCast');
    castParagraph.innerHTML = cast;
    return castParagraph;
};
// Create HTML for movie rating
const createMovieRating = (rating, useId = true) => {
    const ratingParagraph = document.createElement('p');
    if (useId) {
        ratingParagraph.setAttribute('id', 'movieRating');
    } else {
        ratingParagraph.classList.add('liked-movie-rating');
    }
    ratingParagraph.innerHTML = `<strong>Rating:</strong> ${rating} / 10`;
    return ratingParagraph;
};
// create HTML for liked movies cards
const createLikedMovieCard = (movie) => {
    const likedMovieCard = document.createElement('div');
    likedMovieCard.classList.add('liked-movie-card');
    const cardImg = createMoviePoster(movie.poster_path, false);
    const cardTitle = createMovieTitle(movie.title, false);
    const cardRating = createMovieRating(movie.vote_average, false);
    const removeBtn = document.createElement('button');
    removeBtn.textContent = "Remove";
    removeBtn.classList.add('remove-btn');
    removeBtn.onclick = () => {
        removeLikedMovie(movie.id);
        renderLikedMovies();
    };
    likedMovieCard.append(cardImg, cardTitle, cardRating, removeBtn);
    return likedMovieCard;
};
const removeLikedMovie = movieId => {
    const index = likedMovies.findIndex(movie => movie.id === movieId);
    if (index !== -1) {
        likedMovies.splice(index, 1);
        localStorage.setItem('likedMovies', JSON.stringify(likedMovies));
    }
}


// Returns a random movie from the first page of movies
const getRandomMovie = (movies) => {
    const randomIndex = Math.floor(Math.random() * movies.length);
    const randomMovie = movies[randomIndex];
    return randomMovie;
};


// Uses the DOM to create HTML to display the movie
const displayMovie = async (movieInfo) => {
    const moviePosterDiv = document.getElementById('moviePoster');
    const movieTextDiv = document.getElementById('movieText');
    const likeBtn = document.getElementById('likeBtn');
    const dislikeBtn = document.getElementById('dislikeBtn');
    // Create HTML content containing movie info
    const moviePoster = createMoviePoster(movieInfo.poster_path);
    const titleHeader = createMovieTitle(movieInfo.title);
    const overviewText = createMovieOverview(movieInfo.overview);
    const releaseDateText = createMovieReleaseDate(movieInfo.release_date);
    const movieCastData = await getMovieCast(movieInfo);
    const cast = movieCastData.cast.slice(0, 5).map(actor => actor.name).join(', ');
    const castText = createMovieCast(`<strong>Cast:</strong> ${cast}`);
    const movieRating = createMovieRating(movieInfo.vote_average);
    // Append title, poster, and overview to page
    moviePosterDiv.appendChild(moviePoster);
    movieTextDiv.appendChild(titleHeader);
    movieTextDiv.appendChild(overviewText);
    movieTextDiv.appendChild(releaseDateText);
    movieTextDiv.appendChild(castText);
    movieTextDiv.appendChild(movieRating);
    showBtns();
    likeBtn.onclick = likeMovie;
    dislikeBtn.onclick = dislikeMovie;
    currentMovie = movieInfo; 
};



