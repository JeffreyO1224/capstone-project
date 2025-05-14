import yippeeCat from "../../assets/yippee.gif";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import axios from "axios";
import { useState, useContext } from "react";
import { AuthContext } from "../../App";

export default function LoginPage() {
  //these will be the state variables that will change with our form
  //neeed to save them so that we can then use them in our call to the backend route
  //define for login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //used so that we can make the user go back to the homepage
  const navigate = useNavigate();
  //use authContext so that we don't have to worry about state changes
  //prev, we encountered errors where the state would lag behind
  const auth = useContext(AuthContext);
  if (!auth) throw new Error("loginpage cannot access auth");
  //get the login func in auth
  const { login } = auth;

  //our handler that we will pass to the form so that on submit we can login properly
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/users/login", {
        email,
        password,
      });
      const { user, token } = response.data;
      //use the login function from the app
      login(user, token);
      //move to the homepage
      navigate("/");
    } catch (error: any) {
      console.error(
        "Login failed:",
        error.response?.data?.error || error.message
      );
      alert(error.response?.data?.error || "An error occurred during login.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-image-container">
        <img src={yippeeCat} alt="Yipee Cat" className="login-image" />
      </div>

      <div className="login-form-wrapper">
        <form className="login-form" onSubmit={handleLogin}>
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password" className="login-form__label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="login-form__input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
