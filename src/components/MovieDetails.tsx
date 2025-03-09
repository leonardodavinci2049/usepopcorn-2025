import  { useEffect, useRef, useState } from "react";
import { MovieType } from "../types/MovieType";
import Loader from "./Loader";
import StarRating from "../componentsUI/StarRating";

const MovieStart: MovieType = {
  imdbid: "",
  title: "",
  year: "",
  poster: "",
  runtime: 0,
  imdbrating: 0,
  userrating: 0,
  // adicione outras propriedades obrigatórias de MovieType
}

interface MovieDetailsProps {
  selectedId: string | null;
  onCloseMovie: (id: number) => void;
  onAddWatched: (movie: MovieType) => void;
  watched: MovieType[];
}

const MovieDetails = ({ selectedId, onCloseMovie, onAddWatched, watched }: MovieDetailsProps) => {

  const [movie, setMovie] = useState<MovieType>(MovieStart);
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const countRef = useRef(0);


  useEffect(() => {
    if (userRating) countRef.current++;
  }, [userRating]);

  // console.log("aqui 1");
  // console.log(userRating);
  const isWatched = selectedId ? watched.map((movie) => movie.imdbid).includes(selectedId) : false;

  const watchedUserRating = watched.find(
    (movie) => movie.imdbid === selectedId
  )?.userrating;

  function handleAdd() {
    
      const newWatchedMovie: MovieType = {
        imdbid: selectedId ?? "",
        title: movie.title,
        year: movie.year,
        poster: movie.poster,
        imdbrating: Number(movie.imdbrating),
        runtime: Number(movie.runtime.split(" ").at(0)),
        userrating: userRating,
        countRatingDecisions: countRef.current,
      };
      
      onAddWatched(newWatchedMovie);
      onCloseMovie();
  
  }

  useKey("Escape", onCloseMovie);

  useEffect(
    // code to run when the effect is triggered
    function () {
      async function fetchData() {
        try {
          setIsLoading(true);

          const data = await getMoviedetails(selectedId);
          //  console.log("aqui" + data);
          if (!data) {
            throw new Error("Movies not found");
          }

          setMovie(data);
          setIsLoading(false);
        } catch (error) {
        } finally {
          setIsLoading(false);
        }
      }

      fetchData();
    },
    [selectedId]
  );

  // console.log("aqui 2");
  // console.log(movie.Title);
  useEffect(() => {
    document.title = `${movie.title || "usePopcorn"} - IMDb`;
    return () => {
      document.title = "usePopcorn";
    };
  }, [movie]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={movie.Poster} alt={`Poster of ${movie.Title} movie`} />
            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} &bull; {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>
                <span>⭐️</span>
                {movie.imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />

                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated with movie {watchedUserRating}
                  <span>⭐️</span>
                </p>
              )}
            </div>
            <p>
              <em>{movie.plot}</em>
            </p>
            <p>Starring {movie.Actors}</p>
            <p>Directed by {movie.Director}</p>
          </section>
        </>
      )}
    </div>
  );
};
export default MovieDetails;
