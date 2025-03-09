import React from "react";

interface Movie {
  imdbID: string;
  poster: string;
  Title: string;
  imdbRating: number;
  userRating: number;
  runtime: string;
}

const WatchedMovie: React.FC<{ movie: Movie; onDeleteWatched: (id: string) => void }> = ({ movie, onDeleteWatched }) => {
  return (
    <li key={movie.imdbID}>
      <img src={movie.poster} alt={` ${movie.Title} poster}`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime}</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          ❌
        </button>
      </div>
    </li>
  );
};

export default WatchedMovie;
