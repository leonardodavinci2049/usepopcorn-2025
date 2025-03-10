import { MovieType } from "../types/MovieType";

const KEY = import.meta.env.VITE_API_KEY; // Para Vite


export const getMoviedetails = async (id: string) => {
  const url = `https://www.omdbapi.com/?apikey=${KEY}&i=${id}`;

  const resp = await fetch(url);
  const data = await resp.json();

  const movie: MovieType = {
    imdbID: data.imdbID,
    Title: data.Title,
    Year: data.Year,
    Poster: data.Poster,
    Runtime: data.Runtime,
    imdbRating: data.imdbRating,
    Plot: data.Plot,
    Released: data.Released,
    Actors: data.Actors,
    Director: data.Director,
    Genre: data.Genre,
  };

  //  console.log(gifs);
  return movie;
};
