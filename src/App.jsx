import React, { useState, useEffect } from 'react';
import Blog from "./Components/Blog";
import Connect from "./Components/Connect";
import Hero from "./Components/Hero";
import Navbar from "./Components/Navbar";
import Shop from "./Components/Shop";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Signup from './Components/Signup';
import Login from './Components/Login';
import WriteBlog from './Components/WriteBlog';
import Cart from './Components/Cart';
import Orders from './Components/Orders';
import Chatbit from './Components/Chatbit';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      console.log(token)
      if (!token) {
        throw new Error('No token found');
      }

      const response = await fetch('http://localhost:5000/api/v1/users/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
      });

      if (response.ok) {
        localStorage.removeItem('auth-token');
        setIsAuthenticated(false);
        console.log('logged out');
      } else {
        const errorText = await response.text();
        throw new Error(`Logout failed: ${response.status} ${response.statusText} - ${errorText}`);
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
          <Hero />
        </>
      )
    },
    {
      path: "/shop",
      element: (
        <>
          <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
          <Shop />
        </>
      )
    },
    {
      path: "/blog",
      element: (
        <>
          <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
          <Blog />
        </>
      )
    },
    {
      path: "/connect",
      element: (
        <>
          <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
          <Connect />
        </>
      )
    },
    {
      path: "/signin",
      element: (
        <>
          <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
          <Signup />
        </>
      )
    },
    {
      path: "/login",
      element: (
        <>
          <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
          <Login />
        </>
      )
    },
    {
      path: "/writeblog",
      element: (
        <>
          <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
          <WriteBlog/>
        </>
      )
    },
    {
      path: "/cart",
      element: (
        <>
          <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
          <Cart/>
        </>
      )
    },
    {
      path: "/orders",
      element: (
        <>
          <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
          <Orders/>
        </>
      )
    },
    {
      path: "/chatbot",
      element: (
        <>
          <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
          <Chatbit/>
        </>
      )
    },


  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
