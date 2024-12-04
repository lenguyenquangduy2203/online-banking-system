import React, { useState } from "react";
import "./Auth.css";
import { signIn, signUp } from "../../services/apiServices";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
    setError("");
    setEmail(""); // Reset email
    setPassword(""); // Reset password
    setUsername(""); // Reset username
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await signUp(username, email, password)
      console.log(response);
      alert("Registration successful! Please sign in.");
      setIsSignIn(true);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Error during sign up. Please try again.");
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await signIn(email, password);
      console.log(response);
      localStorage.setItem("user_token", response.data.data.token);
      alert("Login successful!");
      navigate("/");
      setError("");
    } catch (err) {
      console.error("Sign In Error: ", err);
      setError(err.response?.data?.message || "Invalid email or password.");
    }
  };

  return (
    <div className={`auth-container ${isSignIn ? "" : "register"}`}>
      {/* Welcome Section */}
      <div className="welcome-section">
        {isSignIn ? (
          <div className="welcome-content">
            <h1>Hello, Welcome!</h1>
            <p>Sign in to your account to access all the features and benefits of our platform.</p>
            <button onClick={toggleForm}>Register</button>
          </div>
        ) : (
          <div className="welcome-content">
            <h1>Welcome Back!</h1>
            <p>To keep connected, please sign in to your account.</p>
            <button onClick={toggleForm}>Sign In</button>
          </div>
        )}
      </div>

      {/* Form Section */}
      <div className="form-section">
        {isSignIn ? (
          <div className="auth-form">
            <h2>Sign In</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSignIn}>
              <div className="input-group">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Sign In</button>
            </form>
            <p>
              Don't have an account?{" "}
              <span onClick={toggleForm} className="redirect-link">
                Register
              </span>
            </p>
          </div>
        ) : (
          <div className="auth-form">
            <h2>Register</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSignUp}>
              <div className="input-group">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Register</button>
            </form>
            <p>
              Already have an account?{" "}
              <span onClick={toggleForm} className="redirect-link">
                Sign In
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auth;
