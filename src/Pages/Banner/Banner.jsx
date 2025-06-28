import Circle from "../../Components/ComOfBanner/Circle/Circle";
import CircularText from "../../Components/ComOfBanner/CircularText/CircularText";
import SquaresBG from "../../Components/ComOfBanner/SquaresBG/SquaresBG";
import "./Banner.css";

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
              MERN STAKE WEB_ <br /> DEVELOPER
            </div>

            <div
              data-aos="fade-up"
              data-aos-easing="linear"
              data-aos-duration="1500"
              className="absolute_content_two"
            >
              <p aria-label="CodePen">
                <span data-text="S">S</span>
                <span data-text="O">O</span>
                <span data-text="B">B</span>
                <span data-text="U">U</span>
                <span data-text="R">R</span>
                <span></span>
                <span data-text="H">H</span>
                <span data-text="O">O</span>
                <span data-text="S">S</span>
                <span data-text="S">S</span>
                <span data-text="E">E</span>
                <span data-text="N">N</span>
              </p>
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
