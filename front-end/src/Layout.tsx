import NavBar from "./NavBar.tsx";
import { Outlet } from "react-router-dom";
//no logner need props as we are not drilling state management
export default function Layout() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}