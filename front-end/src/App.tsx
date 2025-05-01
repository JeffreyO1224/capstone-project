import { useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage/HomePage.tsx';
import LoginPage from './pages/LoginPage/LoginPage.tsx';
import ErrorPage from './pages/ErrorPage/ErrorPage.tsx';
import Layout from './Layout.tsx'
import PetExplorationPage from './pages/PetExplorationPage/PetExplorationPage.tsx';
import MapPage from './pages/MapPage/MapPage.tsx';
import FormComponent from './pages/FormComponent/FormComponent.tsx';
import SignUpPage from './SignUpPage/SignUpPage.tsx';

function App() {
  //isLoggedIn will handle really basic authentication,
  //var is also needed to update navbar dynamically based on 
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //basic loguout handler, may be buggy with state management
  const logoutHandler = () => {
    setIsLoggedIn(false)
  }
  //rearranged router to be in our component so that we can pass props as needed
  //previously, router was outside of app and as such our props wouldve been
  //out of scope
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout 
      isLoggedIn={isLoggedIn} 
      logoutHandler={logoutHandler}
    />,
      errorElement: <ErrorPage />,
      children: [
        { path: '/', element: <HomePage /> },
        { 
          path: '/login/', 
          element: <LoginPage setIsLoggedIn={setIsLoggedIn} /> 
        },
        { path: '/PetExplorationPage/', element: <PetExplorationPage /> },
        {
          path: '/petmap/',
          element: <MapPage />
        },
        {
          path: '/imageupload/',
          element: <FormComponent/>
        },
        {
          path: '/signup/',
          element: <SignUpPage/>
        }
      ]
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App
