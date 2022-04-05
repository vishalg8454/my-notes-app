import "./landing-page.css";
import "../../style.css";
import note_svg from "../../assets/note_svg.svg";
import {Link} from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="container">
      <div className="landing-page-container">
        <div className="landing-page-content-container">
          <div className="landing-logo-container">
            <span className="landing-logo primary">Note</span>
            <span className="landing-logo secondary">Stalk</span>
          </div>
          <p className="xx-large bold">Meet your modern</p>
          <p className="primary xx-large">Note Taking App</p>
          <p className="large landing-description">
            Mange your daily tasks and workflow in a modern way and boost your
            efficiency without any efforts.
          </p>
          <button className="landing-cta">Join Now</button>
          <button className="btn btn-link landing-signup">
            Already have an account?
          </button>
        </div>
        <div className="landing-page-img-container">
          <img className="landing-page-img" src={note_svg} />
        </div>
      </div>
    </div>
  );
};
export { LandingPage };
