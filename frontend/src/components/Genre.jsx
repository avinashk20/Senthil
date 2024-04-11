import PropTypes from "prop-types";

const Genre = (props) => {
  return (
    <div className="border px-2 border-gray-700 rounded-md dark:text-neutral text-center">
      <p className="capitalize">{props.name}</p>
    </div>
  );
};

Genre.propTypes = {
  name: PropTypes.string,
};

export default Genre;
