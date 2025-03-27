import { useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ErrorPage from './pages/ErrorPage.tsx';
import Layout from './Layout.tsx'
import PetExplorationPage from './pages/PetExplorationPage.tsx';

const routes = [{
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [{
      path: '/',
      element: <HomePage />
    }, {
      path: '/login/',
      element: <LoginPage />
    },{
      path:'/PetExplorationPage/',
      element: <PetExplorationPage/>
    }]
}]

const router = createBrowserRouter(routes);
function App() {
  const [count, setCount] = useState(0)

  return (
    <RouterProvider router={router} />
  )
}

export default App
