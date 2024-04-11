import { useLoaderData } from "react-router-dom";

import Genre from "../../components/Genre";
import CastSection from "./CastSection";
import RecommendationsSection from "./RecommendationsSection";
import VideosSection from "./VideosSection";
import ReviewsSection from "./ReviewsSection";

import placeholderImg from "../../assets/poster_placeholder.png";

const MoviePage = () => {
  const {
    backdropUrl,
    posterUrl,
    title,
    tagline,
    releaseDate,
    duration,
    rating,
    overview,
    genres,
    directors,
    writers,
    cast,
    videos,
    reviews,
    recommendations,
  } = useLoaderData();

  return (
    <main className="text-sm sm:text-base">
      <div className="relative py-8 sm:py-12 mb-8">
        <div
          className="top-0 left-0 absolute h-full w-full -z-10 opacity-40 dark:opacity-10"
          style={{
            backgroundImage: `url(${backdropUrl})`,
            backgroundSize: "cover",
          }}
        ></div>
        <div className="bottom-0 left-0 absolute h-1/2 w-full dark:gradient-dark -z-10"></div>

        <div className="content-container">
          {/* Movie Details */}
          <section className="flex flex-col sm:flex-row gap-12">
            <div className="sm:max-w-[320px]">
              <img
                src={posterUrl ? posterUrl : placeholderImg}
                alt="movie poster"
                className="w-full "
              />
            </div>
            <div className="">
              <div className="mb-4">
                <h1 className="text-3xl sm:text-5xl capitalize mb-2">
                  {title}
                </h1>
                <p className=" dark:text-neutral text-base sm:text-lg italic">
                  {tagline}
                </p>
              </div>

              <div className="flex gap-2 flex-wrap mb-8">
                {genres.map((genre) => (
                  <Genre name={genre.name} key={genre.id} />
                ))}
              </div>

              <div className="mb-8">
                <h2 className="text-xl sm:text-2xl mb-2">Overview</h2>
                <p className="leading-relaxed max-w-prose">{overview}</p>
              </div>

              <div className="flex gap-6 mb-4">
                <p className="flex flex-wrap">
                  <span className="font-bold mr-2 whitespace-nowrap">
                    Release Date:
                  </span>
                  <span className=" dark:text-neutral whitespace-nowrap">
                    {releaseDate}
                  </span>
                </p>
                <p className="flex flex-wrap">
                  <span className="font-bold mr-2">Duration: </span>
                  <span className=" dark:text-neutral whitespace-nowrap">
                    {duration} min
                  </span>
                </p>
                <p className="flex flex-wrap">
                  <span className="font-bold mr-2">Rating: </span>
                  <span className=" dark:text-neutral whitespace-nowrap">
                    {rating}
                  </span>
                </p>
              </div>

              <p className="mb-4">
                <span className="font-bold mr-2">Director:</span>
                <span className=" dark:text-neutral">
                  {directors.join(", ")}
                </span>
              </p>

              {writers.length > 0 && (
                <p>
                  <span className="font-bold mr-2">Writer:</span>
                  <span className=" dark:text-neutral">
                    {writers.join(", ")}
                  </span>
                </p>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Cast */}
      <CastSection cast={cast} />

      {/* Videos */}
      <VideosSection videos={videos} />

      {/* Recommendations */}
      <RecommendationsSection recommendations={recommendations} />

      {/* Reviews */}
      <ReviewsSection reviews={reviews} />
    </main>
  );
};

export default MoviePage;
