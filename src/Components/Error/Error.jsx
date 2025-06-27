import "./Error.css";
import errorVideo from "../../assets/error.mp4";

const Error = () => {
  return (
    <>
      <section id="error_section">
        <div className="main_error_container">

          <div className="error_inner_container">
            
            <div className="error_video_container">
              <video autoPlay={true} src={errorVideo}></video>
            </div>

          </div>

        </div>
      </section>
    </>
  );
};

export default Error;
