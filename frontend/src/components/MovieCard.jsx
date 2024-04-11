import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { memo } from "react";

import "react-lazy-load-image-component/src/effects/opacity.css";
import placeholderImg from "../assets/poster_placeholder.png";

const MovieCard = ({
  id,
  posterUrl,
  title,
  // releaseDate,
  scrollPosition,
  fixedWidth,
}) => {
  return (
    <Link to={`/movie/${id}`}>
      <figure
        className={
          "overflow-hidden movie-card__grid-container group/poster text-sm sm:text-base " +
          (fixedWidth && " w-40 sm:w-48 lg:w-56")
        }
      >
        <LazyLoadImage
          alt={`${title} movie poster`}
          effect="opacity"
          src={posterUrl ? posterUrl : placeholderImg}
          scrollPosition={scrollPosition}
          wrapperClassName="movie-card__grid-item w-full aspect-[0.667] overflow-hidden"
          className="h-full object-cover lg:hover:scale-105 lg:duration-300"
        />

        <figcaption className="overflow-hidden movie-card__grid-item movie-card__content-gradient self-end p-3 lg:translate-y-full lg:group-hover/poster:translate-y-0 duration-300 ">
          <p
            title={title}
            className="mb-2 capitalize  overflow-hidden text-ellipsis"
          >
            {title}
          </p>

          {/* <div className="flex justify-between">
            <p>{releaseDate.slice(0, 4)}</p>
            <p>9/10 ⭐</p>
          </div> */}
        </figcaption>
      </figure>
    </Link>
  );
};

MovieCard.propTypes = {
  id: PropTypes.number,
  posterUrl: PropTypes.string,
  title: PropTypes.string,
  releaseDate: PropTypes.string,
  fixedWidth: PropTypes.bool,
  scrollPosition: PropTypes.object,
};

export default memo(MovieCard);
