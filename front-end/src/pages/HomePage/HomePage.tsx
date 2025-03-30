import "./HomePage.css";
import logo from "../../assets/logo.png";
import catImg from "../../assets/cat-icon.png";
import { Link } from "react-router-dom";
export default function HomePage() {
  return (
    <div className="homepage-container">
      <div className="homepage-main">
        <div className="hero-section">
          <div className="text-content">
            <div className="hero-heading">Welcome to FindMyFur!</div>
            <div className="hero-subheading">
              Where we put you closer to finding pookie.
            </div>
            <div className="auth-prompt">
              Want to give a helping paw?{" "}
              <span className="auth-links">
                <Link to="/signup" className="auth-link">
                  Sign Up
                </Link>{" "}
                or{" "}
                <Link to="/login" className="auth-link">
                  Login
                </Link>
              </span>
            </div>
          </div>
          <div className="image-container">
            <img src={logo} alt="logo image" className="main-image" />
          </div>
        </div>
      </div>

      <div className="flame-section">
        <div className="flame-img-container">
          <img src={catImg} alt="flame" />
        </div>
        <div className="flame-text">
          <h2>Flame's Story</h2>
          <p>
            Our commitment to helping pets stems from our beloved Flame's story.
            Flame was a beloved mischeous cat who was lost on Thanksgiving Day.
            When one of our founders mourned his loss, the idea for creating a
            dedicated, responsive, and efficient tracking system for lost pets
            was born. While Flame was just hiding in a closet like any other
            cat, not many pet owners are as lucky and have to suffer the loss of
            losing their pet. That's why we want to help you Find Your Fur.
          </p>
        </div>
      </div>

      <div className="services-section">
        <div className="section-title">Our Services</div>
        <div className="services-container">
          <div className="service-card">
            <img
              src= {catImg}
              alt="Service 1"
              className="service-icon"
            />
            <h3>Lost Pet Reporting</h3>
            <p>
              Immediately report missing pets with detailed descriptions and
              last known locations.
            </p>
          </div>
          <div className="service-card">
            <img
              src= {catImg}
              alt="Service 2"
              className="service-icon"
            />
            <h3>Community Alerts on an Interactive Map</h3>
            <p>
              Receive real-time reporting from your neighborhood on lost pets
              found within your area, plotted on an interactive map for
              convenience.
            </p>
          </div>
          <div className="service-card">
            <img
              src= {catImg}
              alt="Service 3"
              className="service-icon"
            />
            <h3>Found Pet Support</h3>
            <p>
              Dedicated pages for lost pets so they get the most visibility.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
