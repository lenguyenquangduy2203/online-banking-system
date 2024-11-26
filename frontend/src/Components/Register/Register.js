import React from "react";
import "./Register.css";

const Register = () => {
  return (
    <div className="auth-wrapper">
      <div className="auth-form">
        <h2>Register</h2>
        <form>
          <div className="input-group">
            <i className="fas fa-user"></i>
            <input type="text" id="username" placeholder="Enter your username" />
          </div>
          <div className="input-group">
            <i className="fas fa-envelope"></i>
            <input type="email" id="email" placeholder="Enter your email" />
          </div>
          <div className="input-group">
            <i className="fas fa-lock"></i>
            <input type="password" id="password" placeholder="Enter your password" />
          </div>
          <button type="submit">Register</button>
        </form>
        <div className="redirect">
          Already have an account? <a href="/signin">Sign In</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
