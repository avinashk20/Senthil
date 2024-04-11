const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const dotenv = require("dotenv");

const { createImageUrl, filterResponseMovieData } = require("./utils");

dotenv.config();

const { BEARER_TOKEN, PORT } = process.env;

const app = express();

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/search", async function (req, res) {
  let { query, page } = req.query;

  if (!query) {
    return res.json({ message: "query cannot be empty" });
  }

  if (!page) page = 1;

  const searchParams = new URLSearchParams({
    query: query,
    include_adult: false,
    language: "en-US",
    page: page,
  });
  const url = `https://api.themoviedb.org/3/search/movie?` + searchParams;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      console.log(response);
      throw new error("Could not fetch data");
    }
    const data = await response.json();
    // console.log(data);
    const filteredData = data.results.map((item) => {
      const posterUrl = createImageUrl(item.poster_path);
      return {
        id: item.id,
        releaseDate: item.release_date,
        posterUrl: posterUrl,
        title: item.title,
      };
    });

    return res.json(filteredData);
  } catch (err) {
    console.error("error: " + err);
  }
});

app.get("/movie/:id", async function (req, res) {
  const id = req.params.id;
  const url = `https://api.themoviedb.org/3/movie/${id}?append_to_response=videos%2Creviews%2Crecommendations%2Ccredits&language=en-US`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${BEARER_TOKEN}`,
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new error("failed to fetch data");
    }
    const data = await response.json();

    const filteredData = filterResponseMovieData(data);

    return res.json(filteredData);
  } catch (error) {
    console.error("error: " + error);
  }
});

app.listen(PORT, function () {
  console.log("server started on port " + PORT);
});
