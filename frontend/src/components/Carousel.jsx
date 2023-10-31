import PropTypes from "prop-types";
import { useEffect, useRef } from "react";

const Carousel = ({ children }) => {
  const carouselItemsContainerRef = useRef();
  const slideLeftButtonRef = useRef();
  const slideRightButtonRef = useRef();

  useEffect(() => {
    function handleOverflow() {
      const container = carouselItemsContainerRef.current;
      slideRightButtonRef.current.style.display =
        container.clientWidth < container.scrollWidth ? "block" : "none";
    }

    handleOverflow();

    window.addEventListener("resize", handleOverflow);

    return () => {
      window.removeEventListener("resize", handleOverflow);
    };
  }, []);

  function showButtonsHandler() {
    const { scrollLeft, scrollWidth, clientWidth } =
      carouselItemsContainerRef.current;

    const maxScrollLeft = scrollWidth - clientWidth;

    slideLeftButtonRef.current.style.display =
      scrollLeft === 0 ? "none" : "block";

    slideRightButtonRef.current.style.display =
      scrollLeft === maxScrollLeft ? "none" : "block";
  }

  function slide(dir) {
    const container = carouselItemsContainerRef.current;
    const scrollAmount =
      dir === "left" ? -container.clientWidth : +container.clientWidth;
    container.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  }

  return (
    <div className="relative group/carousel">
      <div
        onScroll={showButtonsHandler}
        ref={carouselItemsContainerRef}
        className="flex [&>*]:flex-shrink-0 gap-4 overflow-x-scroll no-scrollbar scroll-smooth"
      >
        {children}
      </div>

      <button
        id="handle-left"
        onClick={() => slide("left")}
        ref={slideLeftButtonRef}
        className="hidden scale-0 group-hover/carousel:scale-100 hover:scale-100 absolute top-0 left-0 h-full bg-gray-900/90 text-5xl font-bold p-2"
      >
        &lsaquo;
      </button>

      <button
        onClick={() => slide("right")}
        id="handle-right"
        ref={slideRightButtonRef}
        className="hidden scale-0 group-hover/carousel:scale-100 absolute top-0 right-0 h-full bg-gray-900/90 text-5xl font-bold p-2"
      >
        &rsaquo;
      </button>
    </div>
  );
};

Carousel.propTypes = {
  children: PropTypes.array,
};

export default Carousel;
