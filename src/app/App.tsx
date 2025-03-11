import { useState } from "react";
import Box from "../components/Box";
import Main from "../components/Main";


import MovieList from "../components/MovieList";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import NumResults from "../components/NumResults";
import useMovies from "../hooks/useMovies";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import MovieDetails from "../components/MovieDetails";
import { MovieType } from "../types/MovieType";
import WatchedSummary from "../components/WatchedSummary";
import WatchedMovieList from "../components/WatchedMoviesList";

function App() {
  const [query, setQuery] = useState("inception");
  const [selectedId, setSelectedId] = useState<string | null>(null);


  const { movies, isLoading, error } = useMovies(query);
  const [watched, setWatched] = useLocalStorageState([], "watched");

  console.log(`====== AAAAAA ======isLoading ===== ${isLoading}`);



  function handleSelectMovie(movie: MovieType): void {
    setSelectedId((selectedId) => (movie.imdbID === selectedId ? null : movie.imdbID));
  }

  function handleCloseMovie(id: string): void {
    setSelectedId((selectedID) => (id === selectedID ? null : null)); 
      
  }
  function handleAddWatched(movie: MovieType) {
    setWatched((watched: MovieType[]) => [...watched, movie]);
  }

  function handleDeleteWatched(id: string) {
    setWatched((watched: MovieType[]) => watched.filter((movie) => movie.imdbID !== id));
  }

// console.log(`isLoading: ${isLoading}`);

  return (
    <div>
       <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>

      
      <Main>
      <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            ></MovieDetails>
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMovieList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </div>
  );
}

export default App;
