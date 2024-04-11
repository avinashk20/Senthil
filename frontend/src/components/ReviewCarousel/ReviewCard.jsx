import PropTypes from "prop-types";
import { useState } from "react";
import placeholderImg from "../../assets/person_placeholder.jpg";

const ReviewContent = ({ review }) => {
  const [isFullTextVisible, setIsFullTextVisible] = useState(false);
  const MAX_DISPLAY_CHARS = 1000;

  if (review.length <= MAX_DISPLAY_CHARS) {
    return (
      <p>
        <q>{review}</q>
      </p>
    );
  }

  const truncatedText = review.slice(0, MAX_DISPLAY_CHARS);
  const remainingText = review.slice(MAX_DISPLAY_CHARS);

  const toggleFullTextVisibility = () => {
    setIsFullTextVisible((currentState) => !currentState);
  };

  return (
    <>
      <p>
        <q>
          <span>{truncatedText}</span>
          {!isFullTextVisible && <span>...</span>}
          {isFullTextVisible && <span>{remainingText}</span>}
        </q>
      </p>
      <button
        onClick={toggleFullTextVisibility}
        className="block mt-4 text-accent"
      >
        {isFullTextVisible ? "Read less" : "Read more"}
      </button>
    </>
  );
};

const ReviewCard = ({ author, date, avatarUrl, review }) => {
  return (
    <article className="p-8 dark:bg-gray-900 bg-white border lg:h-[500px] lg:overflow-y-scroll no-scrollbar">
      <div className="flex gap-4 items-center mb-4">
        <img
          src={avatarUrl === null ? placeholderImg : avatarUrl}
          className="w-16 aspect-square object-cover rounded-full ring-2"
          alt={`${author} profile picture`}
        />
        <p className="text-xs sm:text-sm text-black dark:text-neutral">
          Written by {author} on {date}
        </p>
      </div>
      <div className="sm:text-base leading-relaxed">
        <ReviewContent review={review} />
      </div>
    </article>
  );
};

ReviewContent.propTypes = {
  review: PropTypes.string,
};

ReviewCard.propTypes = {
  author: PropTypes.string,
  date: PropTypes.string,
  avatarUrl: PropTypes.string,
  review: PropTypes.string,
};

export default ReviewCard;
