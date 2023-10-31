import { trackWindowScroll } from "react-lazy-load-image-component";
import Carousel from "../../components/Carousel";
import MovieCard from "../../components/MovieCard";
import Section from "../../components/Section";
import PropTypes from "prop-types";

const RecommendationsSection = trackWindowScroll(
  ({ recommendations, scrollPosition }) => {
    return (
      <div className="content-container">
        <Section title={"Recommendations"}>
          <Carousel>
            {recommendations.map((item) => (
              <MovieCard
                key={item.id}
                id={item.id}
                posterUrl={item.posterUrl}
                title={item.title}
                releaseDate={item.releaseDate}
                fixedWidth={true}
                scrollPosition={scrollPosition}
              />
            ))}
          </Carousel>
        </Section>
      </div>
    );
  }
);

RecommendationsSection.propTypes = {
  recommendations: PropTypes.array,
  scrollPosition: PropTypes.string,
};

export default RecommendationsSection;
