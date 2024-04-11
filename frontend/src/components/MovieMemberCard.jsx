import PropTypes from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";

import "react-lazy-load-image-component/src/effects/opacity.css";
import placeholderImg from "../assets/person_placeholder.jpg";

const MovieMemberCard = ({
  profilePicUrl,
  name,
  character,
  scrollPosition,
}) => {
  return (
    <figure className="w-28 sm:w-32">
      <div className="w-full aspect-[0.667] overflow-hidden">
        <LazyLoadImage
          effect="opacity"
          alt={name}
          src={profilePicUrl ? profilePicUrl : placeholderImg}
          scrollPosition={scrollPosition}
        />
      </div>
      <figcaption className="mt-2">
        <p className="text-ellipsis overflow-hidden whitespace-nowrap">
          {name}
        </p>
        <p
          data-tool-tip={character}
          className="tool-tip text-neutral text-sm overflow-hidden text-ellipsis whitespace-nowrap"
        >
          {character}
        </p>
      </figcaption>
    </figure>
  );
};

MovieMemberCard.propTypes = {
  profilePicUrl: PropTypes.string,
  name: PropTypes.string,
  character: PropTypes.string,
  scrollPosition: PropTypes.string,
};

export default MovieMemberCard;

