const TMDB_BASE_URL =
  process.env.REACT_APP_TMDB_BASE_URL || "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL =
  process.env.REACT_APP_TMDB_IMAGE_BASE_URL ||
  "https://image.tmdb.org/t/p/w500";
const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const tmdbFetch = async (path, params = {}) => {
  if (!TMDB_API_KEY) {
    throw new Error(
      "Missing REACT_APP_TMDB_API_KEY. Add it to your .env file."
    );
  }

  const url = new URL(`${TMDB_BASE_URL}${path}`);
  url.searchParams.set("api_key", TMDB_API_KEY);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.set(key, value)
  );

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`);
  }
  return response.json();
};

let genreMapPromise = null;

const getGenreMap = () => {
  if (!genreMapPromise) {
    genreMapPromise = tmdbFetch("/genre/movie/list").then(({ genres }) =>
      genres.reduce((map, genre) => {
        map[genre.id] = genre.name;
        return map;
      }, {})
    );
  }
  return genreMapPromise;
};

const toMovie = (result, genreMap) => ({
  id: result.id,
  title: result.title,
  image: result.poster_path
    ? `${TMDB_IMAGE_BASE_URL}${result.poster_path}`
    : "images/default.jpg",
  genre: (genreMap[result.genre_ids[0]] || "unknown").toLowerCase(),
  rating: result.vote_average,
});

export const fetchPopularMovies = async (page = 1) => {
  const [genreMap, { results }] = await Promise.all([
    getGenreMap(),
    tmdbFetch("/movie/popular", { page }),
  ]);

  return results.map((result) => toMovie(result, genreMap));
};

export const searchMovies = async (query, page = 1) => {
  const trimmedQuery = query.trim();
  if (!trimmedQuery) {
    return fetchPopularMovies(page);
  }

  const [genreMap, { results }] = await Promise.all([
    getGenreMap(),
    tmdbFetch("/search/movie", { query: trimmedQuery, page }),
  ]);

  return results.map((result) => toMovie(result, genreMap));
};
