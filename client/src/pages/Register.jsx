import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

import { db } from "../components/firebase";  // Import Firestore
import { setDoc, doc } from "firebase/firestore"; // Firestore methods

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      navigate("/profile");
      // Store additional user information in Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName: fname,
        lastName: lname,
        email: email,
      });
      
      
    } catch (error) {
      console.error("Registration error:", error.message);
      setError(error.message);
    }
  };

  if (user) {
    navigate("/profile");
    return null;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <button
                className="btn btn-link text-decoration-none mb-3"
                onClick={() => navigate("/")}
              >
                ← Back
              </button>
              <h3 className="card-title text-center mb-4">Register</h3>
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit}>

              <div className="mb-3">
                  <label className="form-label">First name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fname"
                    value={fname}
                    onChange={(e) => setFname(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Last name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lname"
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">Register</button>
                </div>
              </form>
              <p className="mt-3 text-center">
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;