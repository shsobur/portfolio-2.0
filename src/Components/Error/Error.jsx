// File path__
import "./Error.css";
import errorVideo from "../../assets/error.mp4";

// From react__
import { useState } from "react";
import GhostButton from "../GhostButton/GhostButton";
import { useNavigate } from "react-router";

const Error = () => {
  const navigate = useNavigate();
  const [isVideoEnded, setIsVideoEnded] = useState(false);

  const handleVideoEnd = () => {
    setIsVideoEnded(true);
  };

  const handleButton = () => {
    navigate("/");
  };

  return (
    <>
      <section id="error_section">
        <div className="main_error_container">
          <div className="error_inner_container">
            <div className="error_video_container">
              {!isVideoEnded && (
                <video
                  muted
                  autoPlay
                  onEnded={handleVideoEnd}
                  src={errorVideo}
                  className={isVideoEnded ? "video_end_style" : ""}
                ></video>
              )}
              {isVideoEnded && (
                <div className="error_message">
                  <h2 className="bloody_text">404 - Page Not Found</h2>
                  <p>
                    Oops! The page you’re looking for doesn’t exist. <br />
                    It might have been moved or deleted.
                  </p>
                  <div onClick={handleButton}>
                    <GhostButton></GhostButton>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Error;
