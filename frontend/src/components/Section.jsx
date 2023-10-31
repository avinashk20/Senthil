import PropTypes from "prop-types";

const Section = ({ children, title }) => {
  return (
    <section className="mb-16">
      <h2 className="text-xl sm:text-2xl mb-3">{title}</h2>
      {children}
    </section>
  );
};

Section.propTypes = { children: PropTypes.any, title: PropTypes.string };

export default Section;
