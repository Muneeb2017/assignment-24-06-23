const express = require("express");
const cors = require("cors");

const movies = require("./src/movie.json");

const app = express();
const port = 4000;
app.use(cors());

app.get("/api/movies", (req, res) => {
  res.json(movies);
});

app.get("/api/movies/:id", (req, res) => {
  const movieId = parseInt(req.params.id);
  const movie = movies.find((movie) => movie.id === movieId);
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ error: "Movie not found" });
  }
});
app.post("/api/movies", (req, res) => {
  // Validation logic for the payload
  if (!req.body.name || !req.body.rating || !req.body.releasedDate) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Logic to handle the POST request and save the movie data
  const movie = {
    id: movies.length + 1,
    name: req.body.name,
    rating: req.body.rating,
    releasedDate: req.body.releasedDate,
  };

  // Save the movie data to a data source

  res.status(201).json(movie);
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
