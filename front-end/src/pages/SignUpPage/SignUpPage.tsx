import "./SignUpPage.css";
import sugarglider from "../../assets/sugarglider.png";

export default function SignUpPage() {
  return (
    <div className="signup-container">
      <div className="signup-illustration">
        <img
          src={sugarglider}
          alt="Flying Squirrel"
          className="signup-illustration__image"
        />
      </div>

      <div className="signup-form-wrapper">
        <form className="signup-form">
          <h1 className="signup-form__title">Sign Up</h1>

          <div className="signup-form__group">
            <label htmlFor="username" className="signup-form__label">
              User Name
            </label>
            <input
              type="text"
              id="username"
              className="signup-form__input"
              placeholder="Enter a User Name"
            />
          </div>

          <div className="signup-form__row">
            <div className="signup-form__group">
              <label htmlFor="firstName" className="signup-form__label">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                className="signup-form__input"
                placeholder="First Name"
              />
            </div>

            <div className="signup-form__group">
              <label htmlFor="lastName" className="signup-form__label">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className="signup-form__input"
                placeholder="Last Name"
              />
            </div>
          </div>

          <div className="signup-form__group">
            <label htmlFor="email" className="signup-form__label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="signup-form__input"
              placeholder="Enter email"
            />
            <small className="signup-form__help">
              We'll never share your email with anyone else.
            </small>
          </div>

          <div className="signup-form__group">
            <label htmlFor="password" className="signup-form__label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="signup-form__input"
              placeholder="Password"
            />
          </div>

          <button type="submit" className="signup-form__button">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
