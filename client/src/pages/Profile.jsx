import React, { useState, useEffect } from "react";
import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";

import { db } from "../components/firebase"; // Import Firestore
import { doc, getDoc } from "firebase/firestore"; // Firestore methods

const Profile = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null); // Store user data
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid); // Reference to the user's Firestore document
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserData(userDoc.data()); // Set user data if document exists
        } else {
          console.log("No user data found!");
        }
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchUserData();
  }, [user]);

  const handleLogout = async () => {
    await signOut();
    navigate("/"); // Redirect after logout
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user || !userData) {
    return (
      <div className="container">
        <p>User not found. Please log in again.</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-sm mx-auto" style={{ maxWidth: "500px" }}>
        <div className="card-body">
          <h3 className="card-title text-center mb-4">User Profile</h3>
          
          {/* <p><strong>User ID:</strong> {user.uid}</p> */}
          <p><strong>First Name:</strong> {userData.firstName}</p> {/* Display first name */}
          <p><strong>Last Name:</strong> {userData.lastName}</p> {/* Display last name */}
          <p><strong>Email:</strong> {user.email}</p>
          {/* Add more user info here if needed */}
          <div className="d-grid mt-4">
            <button onClick={handleLogout} className="btn btn-danger">
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
