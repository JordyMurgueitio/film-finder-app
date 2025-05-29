const tmdbKey = '7b93558b5c9ad1cacc5793ddef3050ca';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');


const getGenres = async () => {
    const genreRequestEndpoint = '/genre/movie/list';
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;
    try {
        const response = await fetch(urlToFetch);
        if(response.ok) {
        const jsonResponse = await response.json();
        const genres = jsonResponse.genres;
        console.log(genres);
        return genres;
        }
    } catch (error) {
        console.log(error);
    };
};

const getMovies = async (page = 1) => {
    const selectedGenre = getSelectedGenre();
    const discoverMovieEndpoint = `/discover/movie`;
    const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}&page=${page}`;
    const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            const movies = jsonResponse.results;
            const totalPages = jsonResponse.total_pages;
            return {movies, totalPages};
        };
    } catch (error) {
        console.log(error);
    };
};

const getMovieInfo = async movie => {
    const movieId = movie.id;
    const movieEndpoint = `/movie/${movieId}`;
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
        const movieInfo = await response.json();
        return movieInfo;
        }
    } catch (error) {
        console.log(error);
    };
};

const getMovieCast = async movie => {
    const movieId = movie.id;
    const movieCastEndpoint = `/movie/${movieId}/credits`;
    const requestParams = `?api_key=${tmdbKey}`;
    const urlToFetch = `${tmdbBaseUrl}${movieCastEndpoint}${requestParams}`;
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const movieCast = await response.json();
            return movieCast;
        }
    } catch (error) {
        console.log(error);
    };
};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
    const movieInfo = document.getElementById('movieInfo');
    if (movieInfo.childNodes.length > 0) {
        clearCurrentMovie();
    };
    // Step 1: Get total number of pages
    const { totalPages } = await getMovies(1);
    const maxPages = Math.min(totalPages, 500); 
    // Step 2: Pick a random page number
    const randomPage = Math.floor(Math.random() * maxPages) + 1;
    // Step 3: Get movies from that page
    const { movies } = await getMovies(randomPage);
    // Step 4: Pick a random movie from the list
    const randomMovie = getRandomMovie(movies);
    const info = await getMovieInfo(randomMovie);
    displayMovie(info);
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;