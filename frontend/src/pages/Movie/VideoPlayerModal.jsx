import PropTypes from "prop-types";
import { useState } from "react";


const VideoPlayerModal = ({}) => {

  function openModal() {
    setIsOpen(true);
  }

  function closeModel() {
    setIsOpen(false);
  }
  
  const modalStyles = {
    overlay: {
      backgroundColor: "rgba(14, 20, 27, 0.9)",
    },
  };

  return (
   
  );
};

VideoPlayerModal.propTypes = {};

export default VideoPlayerModal;
