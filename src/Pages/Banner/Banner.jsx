import Circle from "../../Components/ComOfBanner/Circle/Circle";
import SquaresBG from "../../Components/ComOfBanner/SquaresBG/SquaresBG";
import "./Banner.css";

const Banner = () => {
  return (
    <>
      <section id="banner_section">
        <div className="main_banner_container">
          <SquaresBG></SquaresBG>

          <div className="banner_absolute_parent_content">
            <div className="absolute_content_one">
              MERN STAKE WEB_ <br /> DEVELOPER
            </div>

            <div className="absolute_content_two">
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
                circleSize={0.5}
                circleEdge={1}
              ></Circle>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
