import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import logo from "./assets/cat-icon.png";

interface NavBarProps {
  isLoggedIn: boolean;
  logoutHandler: () => void;
}
export default function NavBar({ isLoggedIn, logoutHandler }: NavBarProps) {
  //may need this later for proper logout
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutHandler();
    navigate("/");
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
          <Link to="/PetExplorationPage" className="nav-link">
            Explore
          </Link>
        </li>
      </ul>
    </nav>
  );
}
