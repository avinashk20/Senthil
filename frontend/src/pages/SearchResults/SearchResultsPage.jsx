import { useState, useRef } from "react";
import PropTypes from "prop-types";
import { trackWindowScroll } from "react-lazy-load-image-component";
import MovieCard from "../../components/MovieCard";

import { useLoaderData, useParams } from "react-router-dom";
import { useEffect } from "react";

const SearchResultsPage = trackWindowScroll(({ scrollPosition }) => {
  const [moviesList, setMoviesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const cardContainerRef = useRef();

  const { query } = useParams();

  useEffect(() => {
    const requestConfig = {
      url: `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&page=${currentPageNumber}`,
      options: {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTNhYTEzZmQ3MmFlNzVmY2E3NGM4NmUxZmU0NWZmZCIsInN1YiI6IjY0NmM0OGJmZDE4NTcyMDE2MTkzMjBjMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.W9f3iJv1799wwesTm3tMDtzSMYBLmYUB2wmqjBRamlI",
        },
      },
    };

    async function sendRequest(requestConfig) {
      setIsLoading(true);
      try {
        const response = await fetch(requestConfig.url, requestConfig.options);
        if (!response.ok) {
          throw new Error("failed to fetch data");
        }
        const data = await response.json();
        if (currentPageNumber === 1) {
          setTotalPages(data.total_pages);
        }

        setMoviesList((currentMoviesList) => {
          let updatedMoviesList = [...currentMoviesList];
          return updatedMoviesList.concat(data.results);
        });
        
      } catch (error) {
        setHasError(error.message || "something went wrong!");
      }
      setIsLoading(false);
    }

    sendRequest(requestConfig);

    const observer = new IntersectionObserver((entries, observer) => {
      console.log(entries);
      if (entries[0].isIntersecting && currentPageNumber < totalPages) {
        setCurrentPageNumber((currentPageNumber) => currentPageNumber + 1);
        observer.unobserve(entries[0].target);
      }
    });

    if (cardContainerRef.current && cardContainerRef.current.lastElementChild) {
      console.log(totalPages, currentPageNumber);
      console.log(cardContainerRef.current.lastElementChild);
      observer.observe(cardContainerRef.current.lastElementChild);
    }

    return () => {
      observer.disconnect();
    };
  }, [currentPageNumber, query, totalPages]);

  const cards = moviesList.map((movie) => (
    <MovieCard
      key={movie.id}
      id={movie.id}
      posterUrl={movie.posterUrl}
      title={movie.title}
      releaseDate={movie.releaseDate}
      scrollPosition={scrollPosition}
    />
  ));

  let content;
  if (isLoading) content = <p>loading...</p>;
  else if (hasError) content = <h2>{hasError}</h2>;
  else
    content = (
      <>
        <h2 className=" text-neutral text-3xl mb-8">
          Search results for
          <span> &quot;{query}&quot;</span>
        </h2>
        <div
          ref={cardContainerRef}
          className="grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4"
        >
          {cards}
        </div>
      </>
    );

  return (
    <main>
      <div className="content-container">
        <div className="py-12">{content}</div>
      </div>
    </main>
  );
});

SearchResultsPage.propTypes = {
  scrollPosition: PropTypes.string,
};

export default SearchResultsPage;
