import React from "react";
import MovieCard from "./MovieCard";

function WatchList({ movies, watchList, toggleWatchList }) {
  return (
    <div>
      <h1>Your Watchlist</h1>
      <div className="watchlist">
        {watchList.map((id) => {
          const movie = movies.find((movie) => movie.id === id);
          return (
            <MovieCard
              key={movie.id}
              isWatchlisted={true}
              toggleWatchList={toggleWatchList}
              movie={movie}
            />
          );
        })}
      </div>
    </div>
  );
}

export default WatchList;
