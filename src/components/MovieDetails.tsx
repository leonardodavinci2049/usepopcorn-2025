import { useEffect, useRef, useState } from "react";
import { MovieType } from "../types/MovieType";
import Loader from "./Loader";
import StarRating from "../componentsUI/StarRating";
import { useKey } from "../hooks/useKey";
import { getMoviedetails } from "../api/apiMoviedetails";

const MovieStart: MovieType = {
  imdbID: "",
  Title: "",
  Year: "",
  Poster: "",
  Runtime: "0",
  imdbRating: "0",
  userRating: 0,
  // adicione outras propriedades obrigatórias de MovieType
};

interface MovieDetailsProps {
  selectedId: string | null;
  onCloseMovie: (id: string) => void;
  onAddWatched: (movie: MovieType) => void;
  watched: MovieType[];
}

const MovieDetails = ({
  selectedId,
  onCloseMovie,
  onAddWatched,
  watched,
}: MovieDetailsProps) => {
  const [movie, setMovie] = useState<MovieType>(MovieStart);
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const countRef = useRef(0);

  useEffect(() => {
    if (userRating) countRef.current++;
  }, [userRating]);

  // console.log("aqui 1");
  // console.log(userRating);
  const isWatched = selectedId
    ? watched.map((movie) => movie.imdbID).includes(selectedId)
    : false;

  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  function handleAdd() {
    const newWatchedMovie: MovieType = {
      imdbID: selectedId ?? "",
      Title: movie.Title,
      Year: movie.Year,
      Poster: movie.Poster,
      imdbRating: movie.imdbRating,
      Runtime: (movie.Runtime ?? "0").split(" ").at(0),
      userRating: userRating,
      countRatingDecisions: countRef.current,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie("0");
  }

  useKey({ key: "Escape", onCloseMovie });

  useEffect(
    // code to run when the effect is triggered
    function () {
      async function fetchData() {
        try {
          setIsLoading(true);

          if (!selectedId) {
            throw new Error("Invalid movie ID");
          }
          const data = await getMoviedetails(selectedId);
          //  console.log("aqui" + data);
          if (!data) {
            throw new Error("Movies not found");
          }

          setMovie(data);
          setIsLoading(false);
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          } else {
            throw new Error("An unknown error occurred");
          }
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
    document.title = `${movie.Title || "usePopcorn"} - IMDb`;
    return () => {
      document.title = "usePopcorn";
    };
  }, [movie]);

  return (
    <div className="leading-relaxed text-sm">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header className="flex">
            <button className="btn-back" onClick={() => onCloseMovie("0")}>
              &larr;
            </button>
            <img
              className="w-1/3"
              src={movie.Poster}
              alt={`Poster of ${movie.Title} movie`}
            />
            <div className="w-full py-6 px-8 bg-[var(--color-background-100)] flex flex-col gap-5">
              <h2 className="text-2xl mb-1 leading-tight font-bold">{movie.Title}</h2>
              <p className="flex items-center gap-2">
                {movie.Released} &bull; {movie.Runtime}
              </p>
              <p className="flex items-center gap-2">{movie.Genre}</p>
              <p className="flex items-center gap-2">
                <span>⭐️</span>
                {movie.imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section className="p-16 flex flex-col">
          <div className="bg-[var(--color-background-100)] rounded-lg py-8 px-6 mb-2 font-semibold flex flex-col gap-6">
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
            <div className="flex flex-col justify-center gap-4  text-[1.3rem]">

            <p>
              <em>{movie.Plot}</em>
            </p>
            <p><span className="font-bold">Starring :</span>{movie.Actors}</p>
            <p><span className="font-bold">Directed by:</span> {movie.Director}</p>
            </div>
          </section>
        </>
      )}
    </div>
  );
};
export default MovieDetails;
