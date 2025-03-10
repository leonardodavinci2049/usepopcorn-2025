import { MovieType } from "../types/MovieType";

type MovieProps = {
  movie: MovieType;
  onSelectMovie: (imdbID: string) => void;
};

const Movie = ({ movie, onSelectMovie }: MovieProps) => {
  return (
    <li 
    className="relative grid grid-cols-[4rem_1fr] grid-rows-[auto_auto] gap-x-6 text-base items-center py-4 px-8 border-b border-[var(--color-background-100)] cursor-pointer transition-all duration-300 hover:bg-[var(--color-background-100)]"
    onClick={() => onSelectMovie(movie.imdbID)}
  
  >
     <img className="w-full row-span-2" src={movie.Poster} alt={` ${movie.Title} poster}`} />
      <h3 className="text-2xl font-bold">{movie.Title}</h3>
      <div className="flex items-center gap-3">
        <p className="flex items-center gap-2">
          <span>ℹ️</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
};

export default Movie;
