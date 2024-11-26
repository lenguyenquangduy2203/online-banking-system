import React from "react";
import "./SignIn.css";

const SignIn = () => {
  return (
    <div className="login-page">
      {/* Left Side - Welcome Section */}
      <div className="welcome-section">
        <div className="welcome-content">
          <h1>Hello, welcome!</h1>
          <p>
            Sign in to your account to access all the features and benefits of our platform.
          </p>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="auth-wrapper">
        <div className="auth-form">
          <h2>Sign In</h2>
          <form>
            <div className="input-group">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
              />
            </div>
            <div className="input-group">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
              />
            </div>
            <button type="submit">Sign In</button>
          </form>
          <div className="redirect">
            Don't have an account? <a href="/signup">Register</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
