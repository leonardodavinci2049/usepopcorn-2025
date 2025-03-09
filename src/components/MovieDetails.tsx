import React from "react";

interface Movie {
  id: number;
  title: string;
}

interface MovieDetailsProps {
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({
  movies,
  onSelectMovie,
}) => {
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id} onClick={() => onSelectMovie(movie)}>
          {movie.title}
        </li>
      ))}
    </ul>
  );
};

export default MovieDetails;
