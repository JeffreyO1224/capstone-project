import yippeeCat from "../../assets/yippee.gif";
import { Link } from "react-router-dom";
import "./LoginPage.css";

export default function LoginPage({ setIsLoggedIn }) {
  return (
    <div className="login-container">
      <div className="login-image-container">
        <img src={yippeeCat} alt="Yipee Cat" className="login-image" />
      </div>

      <div className="login-form-wrapper">
        <form className="login-form">
          <h1 className="login-header">Login</h1>

          <div className="login-form-group">
            <label htmlFor="email" className="login-form__label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="login-form__input"
              placeholder="Enter email"
            />

            <label htmlFor="password" className="login-form__label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="login-form__input"
              placeholder="Password"
            />
            <button type="submit" className="login-button">
              Log In
            </button>
          </div>
          <p className="login-redirect-text">
            Don't have an account? <Link to="/signup">Sign up here</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
