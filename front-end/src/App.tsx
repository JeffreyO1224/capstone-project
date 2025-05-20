import { useState, useEffect, createContext, useContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage.tsx";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.tsx";
import Layout from "./Layout.tsx";
import PetExplorationPage from "./pages/PetExplorationPage/PetExplorationPage.tsx";
import MapPage from "./pages/MapPage/MapPage.tsx";
import SignUpPage from "./pages/SignUpPage/SignUpPage.tsx";
import { User } from "./types/pets.ts";
import { jwtDecode } from "jwt-decode";
import PetIndvPage from "./pages/PetIndvPage/PetIndvPage.tsx";

interface TokenPayload {
  email: string;
  username: string;
  exp: number;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  token: string;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("cannot reach auth context");
  return context;
};

function App() {
  //isLoggedIn will handle really basic authentication,
  //var is also needed to update navbar dynamically based on
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState("");

  //our login function, that will take in data after our post route to our backend
  //userData and the token will be fed from our backend route call
  const login = (userData: User, newToken: string) => {
    setUser(userData);
    setToken(newToken);
    setIsLoggedIn(true);
    localStorage.setItem("token", newToken);
  };

  //updated logout function
  //this function will be used to remove our token from localstorage and state management
  const logout = () => {
    setUser(null);
    setToken("");
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };

  //need this useEffect to fetch a user from the token we saved in localstorage
  //this will allow refreshes to keep userState alive
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      try {
        //have to decode the token
        const decoded: TokenPayload = jwtDecode(savedToken);
        //ensure the token hasn't expired and if not, grab the user
        const now = Date.now() / 1000;
        if (decoded.exp < now) {
          console.log("Token expired");
          logout();
        } else {
          login(
            { email: decoded.email, userName: decoded.username },
            savedToken
          );
        }
      } catch (err) {
        console.error("Failed to decode token", err);
      }
    }
  }, []);
  //rearranged router to be in our component so that we can pass props as needed
  //previously, router was outside of app and as such our props wouldve been
  //out of scope
  //^^^^ THIS IS NO LONGER TRUE BECAUSE WE DONT NEED PROPS 
  //using authContext was our only fix for buggy state management
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/login/", element: <LoginPage /> },
        { path: "/petexplore/", element: <PetExplorationPage /> },
        { path: "/petmap/", element: <MapPage /> },
        { path: "/signup/", element: <SignUpPage /> },
        { path: "/petexplore/:petId", element:<PetIndvPage/> }
      ],
    },
  ]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, token, login, logout }}>
      <RouterProvider router={router} />
    </AuthContext.Provider>
  );
}

export default App;
