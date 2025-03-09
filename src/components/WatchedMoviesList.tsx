import React from "react";
import WatchedMovie from "./WatchedMovie";

interface WatchedMovie {
  imdbID: string;
  poster: string;
  Title: string;
  imdbRating: number;
  userRating: number;
  runtime: string;
}

interface WatchedMovieListProps {
  watched: WatchedMovie[];
  onDeleteWatched: (id: string) => void;
}

const WatchedMovieList: React.FC<WatchedMovieListProps> = ({watched, onDeleteWatched}) => {
  return (
    <ul className="list">
      {watched?.map((movie) => (
       <WatchedMovie key={movie.imdbID} movie={movie} onDeleteWatched={onDeleteWatched} />
      ))}
    </ul>
  );
};

export default WatchedMovieList;
