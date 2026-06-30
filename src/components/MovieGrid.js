import React, { useState } from "react";
import "../styles.css";
import MovieCard from "./MovieCard";

function MovieGrid({ movies, watchList, toggleWatchList, onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const [genre, setGenre] = useState("All genre");
  const [rating, setRating] = useState("All");

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(searchTerm);
    }
  };
  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };
  const handleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const matchGenre = (movie, genre) => {
    return (
      genre === "All Genres" ||
      movie.genre.toLowerCase() === genre.toLowerCase()
    );
  };

  const matchRating = (movie, rating) => {
    switch (rating) {
      case "All":
        return true;

      case "Good":
        return movie.rating >= 8;

      case "Ok":
        return movie.rating >= 5 && movie.rating < 8;

      case "Bad":
        return movie.rating < 5;

      default:
        return false;
    }
  };

  const filterMovies = movies.filter(
    (movie) => matchGenre(movie, genre) && matchRating(movie, rating)
  );

  return (
    <div>
      <input
        type="text"
        className="search-input"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={handleSearchTerm}
        onKeyDown={handleSearchKeyDown}
      />

      <div className="filter-bar">
        <div className="filter-slot">
          <label>Genre</label>
          <select
            className="filter-dropdown"
            value={genre}
            onChange={handleGenreChange}
          >
            <option>All Genres</option>
            <option>Action</option>
            <option>Drama</option>
            <option>Fantasy</option>
            <option>Horror</option>
          </select>
        </div>

        <div className="filter-slot">
          <label>Rating</label>
          <select
            className="filter-dropdown"
            value={rating}
            onChange={handleRatingChange}
          >
            <option>All</option>
            <option>Good</option>
            <option>Ok</option>
            <option>Bad</option>
          </select>
        </div>
      </div>
      <div className="movies-grid">
        {filterMovies.map((movie) => (
          <MovieCard
            movie={movie}
            key={movie.id}
            isWatchlisted={watchList.includes(movie.id)}
            toggleWatchList={toggleWatchList}
          />
        ))}
      </div>
    </div>
  );
}

export default MovieGrid;
