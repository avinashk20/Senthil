import PropTypes from "prop-types";
import Section from "../../components/Section";
import Carousel from "../../components/Carousel";
import MovieMemberCard from "../../components/MovieMemberCard";
import { trackWindowScroll } from "react-lazy-load-image-component";

const CastSection = trackWindowScroll(({ cast, scrollPosition }) => {
  return (
    <div className="content-container">
      <Section title={"Cast"}>
        <Carousel>
          {cast.map((member) => (
            <MovieMemberCard
              key={member.id}
              id={member.id}
              profilePicUrl={member.profilePicUrl}
              name={member.name}
              character={member.character}
              scrollPosition={scrollPosition}
            />
          ))}
        </Carousel>
      </Section>
    </div>
  );
});

CastSection.propTypes = {
  cast: PropTypes.array,
  scrollPosition: PropTypes.string,
};

export default CastSection;
