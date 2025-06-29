// File path__
import "./Banner.css";
import Circle from "../../Components/ComOfBanner/Circle/Circle";
import SquaresBG from "../../Components/ComOfBanner/SquaresBG/SquaresBG";
import CircularText from "../../Components/ComOfBanner/CircularText/CircularText";

const Banner = () => {
  return (
    <>
      <section id="banner_section">
        <div className="main_banner_container">
          <SquaresBG></SquaresBG>

          <div className="banner_absolute_parent_content">
            <div
              data-aos="fade-down"
              data-aos-easing="linear"
              data-aos-duration="1500"
              className="absolute_content_one"
            >
              <h1>
                MERN STAKE WEB_ <br /> DEVELOPER
              </h1>
            </div>

            <div className="absolute_content_two">
              <h1>SOBUR HOSSEN</h1>
            </div>

            <div className="absolute_content_three">
              <Circle
                variation={0}
                pixelRatioProp={window.devicePixelRatio || 1}
                shapeSize={1}
                roundness={1}
                borderSize={0.025}
                circleSize={0.15}
                circleEdge={0.8}
              ></Circle>
            </div>

            <div
              data-aos="fade-left"
              data-aos-easing="linear"
              data-aos-duration="1500"
              className="absolute_content_four"
            >
              <CircularText
                text="*NO VIBES HEAR*JUST REAL CODE"
                onHover="pause"
                spinDuration={20}
                className="custom-class"
              ></CircularText>
            </div>

            <div
              data-aos="fade-right"
              data-aos-easing="linear"
              data-aos-duration="1500"
              className="absolute_content_five"
            >
              <ul>
                <li>HOME</li>
                <li>PROJECT</li>
                <li>ABOUT</li>
                <li>CONTACT</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
