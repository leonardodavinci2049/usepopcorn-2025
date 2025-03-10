const average = (arr: number[]) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

interface Movie {
  imdbRating: number;
  userRating: number;
  Runtime: number;
}

const WatchedSummary = ({ watched }: { watched: Movie[] }) => {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.Runtime));

  return (
    <div className="py-[2.2rem] px-8 rounded-lg bg-[var(--color-background-100)] shadow-xl">
      <h2 className="uppercase text-base mb-1.5">Movies you watched</h2>
      <div className="flex items-center gap-6 text-base font-semibold">
        <p className="flex items-center gap-2">
          <span>#</span> <span>{watched.length} movies</span>
        </p>
        <p className="flex items-center gap-2">
          <span>⭐</span> <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p className="flex items-center gap-2">
          <span>🌟</span> <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p className="flex items-center gap-2">
          <span>⏳</span> <span>{avgRuntime.toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
};

export default WatchedSummary;
