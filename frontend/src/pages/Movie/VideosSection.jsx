import PropTypes from "prop-types";
import { useState } from "react";
import { trackWindowScroll } from "react-lazy-load-image-component";
import Modal from "react-modal";

import Carousel from "../../components/Carousel";
import Section from "../../components/Section";
import VideoCard from "../../components/VideoCard";

Modal.setAppElement(document.getElementById("root"));

const VideosSection = trackWindowScroll(({ videos, scrollPosition }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [playerVideoId, setPlayerVideoId] = useState();

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(14, 20, 27, 0.9)",
    },
  };

  function closeModal() {
    setModalIsOpen(false);
  }

  function openModal() {
    setModalIsOpen(true);
  }

  return (
    <div className="content-container">
      <Section title={"Videos"}>
        <Carousel>
          {videos.map((item) => (
            <VideoCard
              key={item.id}
              videoName={item.videoName}
              videoId={item.videoId}
              scrollPosition={scrollPosition}
              playVideo={() => {
                setPlayerVideoId(item.videoId);
                openModal();
              }}
            />
          ))}
        </Carousel>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Youtube Video Player"
          className="absolute w-[min(90%,720px)] aspect-video top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 "
        >
          <iframe
            style={{ width: "100%", height: "100%" }}
            src={`https://www.youtube.com/embed/${playerVideoId}`}
          ></iframe>
          <button onClick={closeModal} className="absolute -top-8 right-0">
            Close
          </button>
        </Modal>
      </Section>
    </div>
  );
});

VideosSection.propTypes = {
  videos: PropTypes.array,
  scrollPosition: PropTypes.string,
};

export default VideosSection;
