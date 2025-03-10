import { MovieType } from "../types/MovieType";
import Movie from "./Movie";

interface MovieDetailsProps {
  movies: MovieType[];
  onSelectMovie: (movie: MovieType) => void;
}
const MovieList: React.FC<MovieDetailsProps> = ({ movies, onSelectMovie }) => {
  return (
    <ul className="list-none py-2 overflow-auto">
      {movies?.map((movie) => (

       <Movie
       key={movie.imdbID}
       movie={movie}
       onSelectMovie={() => onSelectMovie(movie)}
     />
      ))}
    </ul>
  );
};

export default MovieList;
