import React, { useEffect, useState } from "react";
import "./App.css";
import "./styles.css";
import Header from "./components/Header";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Footer from "./components/Footer";
import MovieGrid from "./components/MovieGrid";
import WatchList from "./components/WatchList";
import { fetchPopularMovies, searchMovies } from "./api/tmdb";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [movieMap, setMovieMap] = useState({});
  const [watchList, setWatchList] = useState([]);

  const cacheMovies = (list) => {
    setMovieMap((prevState) => {
      const nextState = { ...prevState };
      list.forEach((movie) => {
        nextState[movie.id] = movie;
      });
      return nextState;
    });
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await fetchPopularMovies();
        setMovies(data);
        cacheMovies(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovies();
  }, []);

  const handleSearch = async (query) => {
    try {
      const data = query.trim()
        ? await searchMovies(query)
        : await fetchPopularMovies();
      setMovies(data);
      cacheMovies(data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleWatchList = (movieId) => {
    setWatchList((prevState) =>
      prevState.includes(movieId)
        ? prevState.filter((id) => id !== movieId)
        : [...prevState, movieId]
    );
  };

  return (
    <div className="App">
      <div className="container">
        <Header />
        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/watchlist">Watchlist</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route
              path="/"
              element={
                <MovieGrid
                  movies={movies}
                  onSearch={handleSearch}
                  toggleWatchList={toggleWatchList}
                  watchList={watchList}
                />
              }
            />
            <Route
              path="/watchlist"
              element={
                <WatchList
                  movies={Object.values(movieMap)}
                  toggleWatchList={toggleWatchList}
                  watchList={watchList}
                />
              }
            />
          </Routes>
        </Router>
      </div>

      <Footer />
    </div>
  );
};

export default App;
