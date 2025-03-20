import { useState } from 'react'
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Layout from './Layout.tsx'

const routes = [{
    path: '/',
    element: <Layout />,
    children: [{
      path: '/',
      element: <HomePage />
    }, {
      path: '/login/',
      element: <LoginPage />
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
