import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./App"; // Using context from App.tsx
import "./NavBar.css";
import logo from "./assets/logo.png";

export default function NavBar() {
  //may need this later for proper logout logic
  //^^ using now to navigate after logout
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  if (!auth) throw new Error("navbar cant reach auth");

  const { isLoggedIn, logout } = auth;
  //use the app's definition of logging out for correct logout functionality
  //also take back to the login page
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav>
      <Link to="/" className="nav-logo-link">
        <img src={logo} alt="Logo" className="nav-logo-img" />
      </Link>
      <ul className="nav-links">
        <li>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="nav-link">
              Log Out
            </button>
          ) : (
            <Link to="/login" className="nav-link">
              Log In
            </Link>
          )}
        </li>
        <li>
          <Link to="/petexplore" className="nav-link">
            Explore
          </Link>
        </li>
        <li>
          <Link to="/petmap" className="nav-link">
            Pet Map
          </Link>
        </li>
      </ul>
    </nav>
  );
}
