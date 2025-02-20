import { GET_MOVIES_DETAILS, GET_TRENDING_MOVIES } from "../constants/constants";
import { fetchData } from "./apiService";

const movies = [
];

export const fetchTrendingMovies = async () => {
    // await new Promise ((resolve) => setTimeout(resolve,1000))

    const response = await fetchData(GET_TRENDING_MOVIES);
    return [...response.results, ...movies];
};

export const  fetchMovieDetails = async (movieId) => {
    const response = await fetchData(GET_MOVIES_DETAILS + movieId + '?language=en-US')
    return response
}

export const addMovie = async (movie) => {

    const newMovie = {
        id: movies.length+1,
        title: movie.title,
        overview: movie.overview,
        budget:movie.budget,
        genres: movie.genres
    }

    movies.push(newMovie);

    return newMovie;
}