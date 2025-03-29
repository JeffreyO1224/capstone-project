import NavBar from "./NavBar.tsx";
import { Outlet } from "react-router-dom";

//define our props in typescript
interface LayoutProps {
  isLoggedIn: boolean;
  logoutHandler: () => void;
}

export default function Layout({ isLoggedIn, logoutHandler }: LayoutProps) {
  return (
    <div>
      <NavBar isLoggedIn={isLoggedIn} logoutHandler={logoutHandler} />
      <Outlet />
    </div>
  );
}
