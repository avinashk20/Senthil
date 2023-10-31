import PropTypes from "prop-types";
import styles from "./Skeleton.module.css";

const Skeleton = ({ height = "auto", width, circle = false }) => {
  const style = {
    height: `${height}`,
    width: `${width}`,
    borderRadius: circle ? "50%" : "0",
  };
  return <div style={style} className={styles.skeleton}></div>;
};

Skeleton.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  circle: PropTypes.bool,
};

export default Skeleton;
