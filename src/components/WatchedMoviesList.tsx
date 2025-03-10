import React from "react";
import WatchedMovie from "./WatchedMovie";

interface WatchedMovie {
  imdbID: string;
  Poster: string;
  Title: string;
  imdbRating: number;
  userRating: number;
  Runtime: string;
}

interface WatchedMovieListProps {
  watched: WatchedMovie[];
  onDeleteWatched: (id: string) => void;
}

const WatchedMovieList: React.FC<WatchedMovieListProps> = ({watched, onDeleteWatched}) => {
  return (
    <ul className="list-none py-2 overflow-auto">
      {watched?.map((movie) => (
       <WatchedMovie key={movie.imdbID} movie={movie} onDeleteWatched={onDeleteWatched} />
      ))}
    </ul>
  );
};

export default WatchedMovieList;
