import { useState } from "react";
import Box from "../components/Box";
import Main from "../components/Main";
import NavBar from "../components/NavBar";
import {
  MovieType,
  tempMovieData,
  tempWatchedData,
  WatchedMovieType,
} from "../data/movies";
import MovieList from "../components/MovieList";

function App() {
  const [movies, setMovies] = useState<MovieType[]>(tempMovieData);
  const [watched, setWatched] = useState<WatchedMovieType[]>(tempWatchedData);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  function handleSelectMovie(id: string): void {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }
  return (
    <div>
      <NavBar />
      <Main>
        <Box>
          <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
        </Box>
        <Box>
          <h1>Watched</h1>
        </Box>
      </Main>
    </div>
  );
}

export default App;
