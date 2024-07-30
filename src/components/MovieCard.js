import React from "react";
import "../styles.css";

function MovieCard({ movie, isWatchlisted, toggleWatchList }) {
  const handleError = (e) => {
    e.target.src = "images/default.jpg";
  };

  const getRatingClass = (rating) => {
    if (rating >= 8) {
      return "rating-good";
    }

    if (rating >= 5 && rating < 8) {
      return "rating-ok";
    }

    if (rating <= 5) {
      return "rating-bad";
    }
  };

  return (
    <div className="movie-card" key={movie.id}>
      <img src={`images/${movie.image}`} alt="" onError={handleError} />
      <div className="movie-card-info">
        <h3 className="movie-card-title">{movie.title}</h3>

        <div>
          <span className="movie-card-genre">{movie.genre}</span>
          <span className={`movie-card-rating ${getRatingClass(movie.rating)}`}>
            {movie.rating}
          </span>
        </div>

        <label className="switch">
          <input
            type="checkbox"
            checked={isWatchlisted}
            onChange={() => toggleWatchList(movie.id)}
          />
          <span className="slider">
            <span className="slider-label">
              {isWatchlisted ? "In watchlist" : "Add to watchlist"}
            </span>
          </span>
        </label>
      </div>
    </div>
  );
}

export default MovieCard;
