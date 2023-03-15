import logo from './logo.svg';
import './App.css';
import Auth from './pages/auth/Auth';
import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route, Link, Navigate } from 'react-router-dom';
import HomePage from './pages/home/HomePage';

export default function App() {

  const [role = localStorage.getItem("role"), setRole] = useState();
  
  useEffect(() => {
    console.log("current role - " + role);
    localStorage.setItem("role", role);
  });

  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        role != "null" ? <Navigate to="/home"/> : <Navigate to="/auth" />
      )
    },

    {
      path: "/auth",
      element: (
        role != "null" ? <Navigate to="/home"/> : <Auth onLogin={(role) => setRole(role)}/>
      )
    },

    {
      path: "/home",
      element: (
        role != "null" ? <HomePage onLogOut={() => setRole(null)}/> : <Navigate to="/auth"/>
      )
    }
  ]
  );
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}
