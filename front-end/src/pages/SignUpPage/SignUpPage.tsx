import "./SignUpPage.css";
import sugarglider from "../../assets/sugarglider.png";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function SignUpPage () {
  // these variable states will track the user's input values in the register form 
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // allow us to navigate the user back to home page
  const navigate = useNavigate();

  // handler after user submits the register form 
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/users/register", {
      user_name: userName,
      first_name: firstName,
      last_name: lastName,
      email,
      password,
    });
    // after submit move to home page
    navigate("/");
  }

  catch (error: any) {
    console.error(
      "Failed to register", 
      error.response?.data?.error || error.message);
    alert(error.response?.data?.error || "Error registaring");
  }
};

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
        <form className="signup-form" onSubmit={handleRegister}>
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
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
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
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
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
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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