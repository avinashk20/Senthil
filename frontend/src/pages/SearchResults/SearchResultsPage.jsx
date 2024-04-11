import { useState, useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { trackWindowScroll } from "react-lazy-load-image-component";
import MovieCard from "../../components/MovieCard";
// import PulsingDots from "../../components/UI/PulsingDots";
import LoadingDots from "../../components/UI/LoadingDots";

import { useLoaderData, useParams } from "react-router-dom";
import useFetch from "../../hooks/use-fetch";

const SearchResultsPage = trackWindowScroll(({ scrollPosition }) => {
  const { query } = useParams();

  const resultsData = useLoaderData();

  const [searchResults, setSearchResults] = useState(resultsData);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const { isLoading, sendRequest } = useFetch();

  const lastEleRef = useRef();
  const observer = useRef();

  const fetchMoreResults = useCallback(() => {
    setCurrentPage((currentPage) => currentPage + 1);

    const searchParams = new URLSearchParams({
      query: query,
      page: currentPage + 1,
    });

    const requestConfig = {
      url: `http://localhost:8000/search?` + searchParams,
      options: { method: "GET" },
    };

    sendRequest(requestConfig, (resultsData) => {
      if (resultsData.length === 0) {
        setHasMore(false);
        return;
      }
      setSearchResults((currSearchResults) => [
        ...currSearchResults,
        ...resultsData,
      ]);
    });
  }, [currentPage, query, sendRequest]);

  useEffect(() => {
    if (isLoading || !hasMore) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchMoreResults();
        }
      },
      {
        rootMargin: "200px",
      }
    );

    if (lastEleRef.current) observer.current.observe(lastEleRef.current);

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [hasMore, isLoading, currentPage, sendRequest, query, fetchMoreResults]);

  const content =
    searchResults.length === 0 ? (
      <p>No results found!!</p>
    ) : (
      <>
        <h2 className=" text-neutral text-3xl mb-8">
          Search results for
          <span> &quot;{query}&quot;</span>
        </h2>
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4">
          {searchResults.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              posterUrl={movie.posterUrl}
              title={movie.title}
              releaseDate={movie.releaseDate}
              scrollPosition={scrollPosition}
            />
          ))}
        </div>
      </>
    );

  return (
    <main>
      <div className="content-container">
        {/* <LoadingDots /> */}
        <div className="py-12">
          {content}
          <div ref={lastEleRef}></div>
          {isLoading && <LoadingDots />}
        </div>
      </div>
    </main>
  );
});

SearchResultsPage.propTypes = {
  scrollPosition: PropTypes.string,
};

export default SearchResultsPage;
