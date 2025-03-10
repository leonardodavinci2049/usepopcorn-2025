import React from "react";

interface Movie {
  imdbID: string;
  Poster: string;
  Title: string;
  imdbRating: number;
  userRating: number;
  Runtime: string;
}

const WatchedMovie: React.FC<{ movie: Movie; onDeleteWatched: (id: string) => void }> = ({ movie, onDeleteWatched }) => {
  return (
    <li 
    className="relative grid grid-cols-[4rem_1fr] grid-rows-[auto_auto] gap-x-6 text-base items-center py-4 px-8 border-b border-[var(--color-background-100)] cursor-pointer transition-all duration-300 hover:bg-[var(--color-background-100)]"
    key={movie.imdbID}
  
  >
        <img className="w-full row-span-2"  src={movie.Poster} alt={` ${movie.Title} poster}`} />
        <h3 className="text-2xl font-bold">{movie.Title}</h3>
        <div className="flex items-center gap-3">
        <p className="flex items-center gap-2">
          <span>⭐</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.Runtime}</span>
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
