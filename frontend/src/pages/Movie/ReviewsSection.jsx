import PropTypes from "prop-types";
import Section from "../../components/Section";
import ReviewCarousel from "../../components/ReviewCarousel/ReviewCarousel";

const ReviewsSection = ({ reviews }) => {
  return (
    <div className="content-container">
      <Section title={"Reviews"}>
          <ReviewCarousel reviews={reviews} />
      </Section>
    </div>
  );
};



ReviewsSection.propTypes = {
  reviews: PropTypes.array,
};

export default ReviewsSection;
