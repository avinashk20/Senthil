import PropTypes from "prop-types";
import { LazyLoadImage } from "react-lazy-load-image-component";

import "react-lazy-load-image-component/src/effects/opacity.css";

import playButton from "../assets/play_button.png";

const VideoCard = ({ videoId, videoName, scrollPosition, playVideo }) => {
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  return (
    <figure className="w-[200px] sm:w-[340px]">
      <div className="relative aspect-video overflow-hidden">
        <LazyLoadImage
          alt="youtube thumbnail"
          effect="opacity"
          src={thumbnailUrl}
          scrollPosition={scrollPosition}
          className="w-full aspect-video object-cover"
        />
        <button
          aria-label="video play button"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          onClick={playVideo}
        >
          <img src={playButton} alt="play icon" className="w-12 sm:w-24" />
        </button>
      </div>
      <figcaption className="mt-4">{videoName}</figcaption>
    </figure>
  );
};

VideoCard.propTypes = {
  videoId: PropTypes.string,
  videoName: PropTypes.string,
  scrollPosition: PropTypes.string,
  playVideo: PropTypes.func,
};

export default VideoCard;
