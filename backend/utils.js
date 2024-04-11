IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

function createImageUrl(img_path, size = "original") {
  return img_path === null ? null : IMAGE_BASE_URL + size + "/" + img_path;
}

function filterCast(cast) {
  return cast
    .filter((actor) => actor.character !== "")
    .map((actor) => {
      const profilePicUrl = createImageUrl(actor.profile_path);
      return {
        id: actor.id,
        name: actor.name,
        character: actor.character,
        profilePicUrl: profilePicUrl,
      };
    });
}

function filterRecommendations(recommendations) {
  return recommendations.results.map((movie) => {
    const posterUrl = createImageUrl(movie.poster_path);
    return {
      id: movie.id,
      releaseDate: movie.release_date,
      posterUrl: posterUrl,
      title: movie.title,
    };
  });
}

function filterVideos(videos) {
  return videos.results
    .filter((item) => item.official === true)
    .map((item) => {
      return {
        id: item.id,
        videoId: item.key,
        videoName: item.name,
      };
    });
}

function filterTopReviews(reviews, count = 5) {
  const topReviews =
    reviews.results.len > count
      ? reviews.results.slice(count)
      : reviews.results;
  return topReviews.map((item) => {
    const date = new Date(item.updated_at);
    const avatar_path = item.author_details.avatar_path;

    let avatarUrl;
    if (avatar_path === null) avatarUrl = null;
    else if (avatar_path.startsWith("/https:"))
      avatarUrl = avatar_path.slice(1);
    else avatarUrl = createImageUrl(avatar_path, "w45");

    return {
      id: item.id,
      avatarUrl: avatarUrl,
      author: item.author,
      rating: item.author_details.rating,
      date: date.toLocaleDateString("en-GB"),
      review: item.content,
    };
  });
}

function filterCrew(crew, ...jobs) {
  return crew
    .filter((member) => jobs.includes(member.job))
    .map((member) => member.name);
}

function filterResponseMovieData(data) {
  const backdropUrl = createImageUrl(data.backdrop_path);
  const posterUrl = createImageUrl(data.poster_path);

  const cast = filterCast(data.credits.cast);

  const recommendations = filterRecommendations(data.recommendations);

  const rating = data.vote_average.toFixed(1);

  const directors = filterCrew(data.credits.crew, "Director");
  const writers = filterCrew(
    data.credits.crew,
    "Writer",
    "Story",
    "Screenplay"
  );

  const videos = filterVideos(data.videos);

  const reviews = filterTopReviews(data.reviews);

  return {
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
}

module.exports = { createImageUrl, filterResponseMovieData };
