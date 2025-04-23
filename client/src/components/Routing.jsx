import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import { useAuth } from "./AuthContext";


import Navbar from "./Navbar";
import Welcome from "./Welcome";

import Login from "../pages/Login";
import Register from "../pages/Register";

import Profile from "../pages/Profile";
import AllNews from "../pages/AllNews";
import ReadMore from "../pages/ReadMore";


const Routing = ()=> {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>; // You can replace this with a loading spinner
  }

  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        {!user ? (
          <>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        ) : (
          <>
            <Route path="/" element={<AllNews />} />
            <Route path="/readmore/:slug" element={<ReadMore />} />
            <Route path="/profile" element={<Profile />} />
          </>
        )}
        {/* <Route path="*" element={<div>Page Not Found</div>} /> */}
      </Routes>
    </Router>

    </>
  )
}

export default Routing;
