// components/WelcomeMessage.js
import React from "react";
import backgroundImage from '../assets/background.jpg';

const Welcome = () => {
  return (
    <div className="d-flex justify-content-center align-items-center p-4">
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          minHeight: "60vh", // Relative height: 60% of viewport height
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: "12px",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "30px",
        }}
      >
        <div style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", padding: "30px", borderRadius: "12px", width: "100%" }}>
          <h1 className="mb-4 text-center">Welcome to News App</h1>
          <p className="lead text-center">
            Please login to explore the latest news, trending topics, and your personalized feed.
          </p>
          <p className="lead text-center">
            Don't have an account? Click login to get started!
          </p>
          <p className="small text-center text-light">
            By logging in or registering, you agree to our{" "}
            <a href="#" className="text-info">Terms of Service</a> and{" "}
            <a href="#" className="text-info">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
