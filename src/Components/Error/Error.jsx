// File path__
import "./Error.css";
import errorVideo from "../../assets/error.mp4";
import errorImage from "../../assets/error_bg.jpg";
import GhostButton from "../GhostButton/GhostButton";
import errorVideo_2o from "../../assets/error_2.0.mp4";

// Package(React router)__
import { useNavigate } from "react-router";

// From react__
import { useEffect, useState } from "react";

const Error = () => {
  const navigate = useNavigate();
  const [isVideoEnded, setIsVideoEnded] = useState(false);
  const [isDear, setIsDear] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const hasMounted = localStorage.getItem("mount");
    if (hasMounted === "1") {
      setIsMounted(true);
      console.log("Already mounted before");
    }
  }, []);

  const handleVideoEnd = () => {
    setIsVideoEnded(true);
    console.log(isVideoEnded);
  };

  const handleButton = () => {
    setIsDear(true);
    localStorage.setItem("mount", "1");
    setIsVideoEnded(false);
  };

  const handleBackButton = () => {
    navigate("/");
  };

  return (
    <>
      <section id="error_section">
        <div className="main_error_container">
          <div className="error_inner_container">
            {!isMounted && (
              <div className="error_video_container">
                {!isVideoEnded && (
                  <video
                    muted={isDear ? false : true}
                    autoPlay
                    onEnded={handleVideoEnd}
                    src={!isDear ? errorVideo : errorVideo_2o}
                    className={isVideoEnded ? "video_end_style" : ""}
                  ></video>
                )}
                {isVideoEnded && (
                  <div
                    data-aos="fade-up"
                    data-aos-easing="linear"
                    data-aos-duration="1200"
                    className="error_message"
                  >
                    {!isDear && (
                      <h2 className="bloody_text">404 - Page Not Found</h2>
                    )}
                    {!isDear && (
                      <p>
                        Oops! The page you’re looking for doesn’t exist. <br />
                        It might have been moved or deleted.
                      </p>
                    )}
                    {isDear ? (
                      <button
                        onClick={handleBackButton}
                        className="error_home_button"
                      >
                        Go home
                      </button>
                    ) : (
                      <div onClick={handleButton}>
                        <GhostButton></GhostButton>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {!isMounted && (
              <>
                {!isDear && (
                  <div className="error_image_container">
                    <div
                      data-aos="fade-zoom-in"
                      data-aos-easing="linear"
                      data-aos-duration="2000"
                      className="error_image_one"
                    >
                      <img src={errorImage} alt="Image" />
                    </div>
                    <div
                      data-aos="fade-zoom-in"
                      data-aos-easing="linear"
                      data-aos-duration="2000"
                      className="error_image_two"
                    >
                      <img src={errorImage} alt="Image" />
                    </div>
                  </div>
                )}
              </>
            )}

            {isMounted && (
              <div
                data-aos="fade-up"
                data-aos-easing="linear"
                data-aos-duration="1200"
                className="error_message"
              >
                <h2 className="bloody_text">404 - Page Not Found</h2>

                <p>
                  Oops! The page you’re looking for doesn’t exist. <br />
                  It might have been moved or deleted.
                </p>

                <button
                  onClick={handleBackButton}
                  className="error_home_button"
                >
                  Go Home🍼
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Error;
