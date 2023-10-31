const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const dotenv = require("dotenv")

dotenv.config();

const {BEARER_TOKEN, PORT, IMAGE_BASE_URL} = process.env;

const app = express();

function getImageUrl(img_path, size = "original") {
  return img_path === null ? null : IMAGE_BASE_URL + size + "/" + img_path;
}

function filterCrew(crew, ...jobs) {
  return crew
    .filter((member) => jobs.includes(member.job))
    .map((member) => member.name);
}

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/search/:query", async function (req, res) {
  const query = req.params.query;
  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: BEARER_TOKEN
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      console.log(response);
      throw new error("cannot fetch data");
    }
    const data = await response.json();

    const filteredData = data.results.map((item) => {
      // if(item.)
      const posterUrl = getImageUrl(item.poster_path);
      return {
        id: item.id,
        releaseDate: item.release_date,
        posterUrl: posterUrl,
        title: item.title,
      };
    });

    res.json(filteredData);
  } catch (error) {
    console.error("error: " + error);
  }
});

app.get("/movie/:id", async function (req, res) {
  const id = req.params.id;
  const url = `https://api.themoviedb.org/3/movie/${id}?append_to_response=videos%2Creviews%2Crecommendations%2Ccredits&language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        BEARER_TOKEN,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new error("failed to fetch data");
    }
    const data = await response.json();

    const backdropUrl = getImageUrl(data.backdrop_path);
    const posterUrl = getImageUrl(data.poster_path);

    const cast = data.credits.cast
      .filter((actor) => actor.character !== "")
      .map((actor) => {
        const profilePicUrl = getImageUrl(actor.profile_path);
        return {
          id: actor.id,
          name: actor.name,
          character: actor.character,
          profilePicUrl: profilePicUrl,
        };
      });

    const recommendations = data.recommendations.results.map((movie) => {
      const posterUrl = getImageUrl(movie.poster_path);
      return {
        id: movie.id,
        releaseDate: movie.release_date,
        posterUrl: posterUrl,
        title: movie.title,
      };
    });

    const rating = data.vote_average.toFixed(1);

    const directors = filterCrew(data.credits.crew, "Director");
    const writers = filterCrew(
      data.credits.crew,
      "Writer",
      "Story",
      "Screenplay"
    );

    const videos = data.videos.results
      .filter((item) => item.official === true)
      .map((item) => {
        return {
          id: item.id,
          videoId: item.key,
          videoName: item.name,
        };
      });

    const allReviews = data.reviews.results;
    const topReviews = allReviews.len > 5 ? allReviews.slice(5) : allReviews;
    const reviews = topReviews.map((item) => {
      const date = new Date(item.updated_at);
      const avatar_path = item.author_details.avatar_path;

      let avatarUrl;
      if (avatar_path === null) avatarUrl = null;
      else if (avatar_path.startsWith("/https:")) avatarUrl = avatar_path.slice(1);
      else avatarUrl = getImageUrl(avatar_path, "w45");

      return {
        id: item.id,
        avatarUrl: avatarUrl,
        author: item.author,
        rating: item.author_details.rating,
        date: date.toLocaleDateString("en-GB"),
        review: item.content,
      };
    });

    const filteredData = {
      id: data.id,
      title: data.title,
      tagline: data.tagline,
      releaseDate: data.release_date,
      genres: data.genres,
      rating: rating,
      duration: data.runtime,
      overview: data.overview,
      backdropUrl: backdropUrl,
      posterUrl: posterUrl,
      cast: cast,
      directors: directors,
      writers: writers,
      videos: videos,
      recommendations: recommendations,
      reviews: reviews,
    };

    return res.json(filteredData);
  } catch (error) {
    console.error("error: " + error);
  }
});

app.listen(PORT, function () {
  console.log("server started on port " + PORT);
});
