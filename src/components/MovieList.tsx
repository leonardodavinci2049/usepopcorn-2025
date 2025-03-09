import { MovieType } from "../data/movies";

interface MovieDetailsProps {
  movies: MovieType[];
  onSelectMovie: (movie: Movie) => void;
}
const MovieList: React.FC<MovieDetailsProps> = ({ movies, onSelectMovie }) => {
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.imdbID} onClick={() => onSelectMovie(movie)}>
          {movie.Title}
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
