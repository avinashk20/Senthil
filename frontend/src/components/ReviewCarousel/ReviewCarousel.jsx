import PropTypes from "prop-types";
import { useState } from "react";

import ReviewCard from "./ReviewCard";
import styles from "./ReviewCarousel.module.css";

const MAX_VISIBILITY = 3;

const ReviewCarousel = ({ reviews }) => {
  const [active, setActive] = useState(0);
  const count = reviews.length;

  return (
    <div className={styles.wrapper}>
      <div className={styles.carousel}>
        {active > 0 && (
          <button
            className={`${styles.nav} ${styles.left} text-gray-900 dark:text-white`}
            onClick={() => setActive((i) => i - 1)}
          >
            &lsaquo;
          </button>
        )}

        {reviews.map((item, i) => (
          <div
            key={item.id}
            className={styles["card-container"]}
            style={{
              "--active": i === active ? 1 : 0,
              "--offset": (active - i) / 3,
              "--direction": Math.sign(active - i),
              "--abs-offset": Math.abs(active - i) / 3,
              "--pointer-events": active === i ? "auto" : "none",
              "--opacity": Math.abs(active - i) >= MAX_VISIBILITY ? "0" : "1",
              "--display":
                Math.abs(active - i) > MAX_VISIBILITY ? "none" : "block",
            }}
          >
            <ReviewCard
              author={item.author}
              avatarUrl={item.avatarUrl}
              date={item.date}
              review={item.review}
            />
          </div>
        ))}

        {active < count - 1 && (
          <button
            className={`${styles.nav} ${styles.right} text-gray-900 dark:text-white`}
            onClick={() => setActive((i) => i + 1)}
          >
            &rsaquo;
          </button>
        )}
      </div>
    </div>
  );
};

ReviewCarousel.propTypes = {
  reviews: PropTypes.array,
};

export default ReviewCarousel;
