import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import axios from "axios";
import "./App.css";

const MovieCard = ({ movie }) => (
  <div className="card">
    <h3>{movie.name}</h3>
    <p>Rating: {movie.rating}</p>
    <p>Released Date: {movie.releasedDate}</p>
  </div>
);

const MovieList = ({ movies }) => (
  <div className="movie-list">
    {movies.map((movie) => (
      <Link to={`/movies/${movie.id}`} key={movie.id}>
        <MovieCard movie={movie} />
      </Link>
    ))}
  </div>
);

const MovieDetails = ({ movie }) => (
  <div className="movie-details">
    <h2>{movie.name}</h2>
    <p>Rating: {movie.rating}</p>
    <p>Released Date: {movie.releasedDate}</p>
  </div>
);

const App = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/movies")
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Router>
      <div className="App">
        <h1>Movie App</h1>
        <React.Fragment>
          <Routes>
            <Route
              exact
              path="/"
              element={<MovieList movies={movies} />}
              // render={() => <MovieList movies={movies} />} // Remove the extra curly braces around `movies`
            />
            <Route
              path="/movies/:id"
              element={<MovieDetails movies={movies} />}
              // render={({ match }) => {
              //   const movieId = parseInt(match.params.id);
              //   const movie = movies.find((movie) => movie.id === movieId);
              //   return <MovieDetails movie={movie} />;
              // }}
            />
          </Routes>
        </React.Fragment>
      </div>
    </Router>
  );
};
export default App;
