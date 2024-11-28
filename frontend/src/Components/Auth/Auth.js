import React, { useState } from 'react';
import './Auth.css';

const Auth = () => {
    const [isSignIn, setIsSignIn] = useState(true);

    const toggleForm = () => {
        setIsSignIn(!isSignIn);
    };

    return (
        <div className={`auth-container ${isSignIn ? "" : "register"}`}>
            {/* Welcome Section */}
            <div className="welcome-section">
                {isSignIn ? (
                    <div className="welcome-content">
                        <h1>Hello, welcome!</h1>
                        <p>Sign in to your account to access all the features and benefits of our platform.</p>
                        <button onClick={toggleForm}>Register</button>
                    </div>
                ) : (
                    <div className="welcome-content">
                        <h1>Welcome Back!</h1>
                        <p>To keep connected, please sign in to your account</p>
                        <button onClick={toggleForm}>Sign In</button>
                    </div>
                )}
            </div>

            {/* Form Section */}
            <div className="form-section">
                {isSignIn ? (
                    <div className="auth-form">
                        <h2>Sign In</h2>
                        <form>
                            <div className="input-group">
                                <i className="fas fa-envelope"></i>
                                <input type="email" placeholder="Enter your email" />
                            </div>
                            <div className="input-group">
                                <i className="fas fa-lock"></i>
                                <input type="password" placeholder="Enter your password" />
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
                        <form>
                            <div className="input-group">
                                <i className="fas fa-user"></i>
                                <input type="text" placeholder="Enter your username" />
                            </div>
                            <div className="input-group">
                                <i className="fas fa-envelope"></i>
                                <input type="email" placeholder="Enter your email" />
                            </div>
                            <div className="input-group">
                                <i className="fas fa-lock"></i>
                                <input type="password" placeholder="Enter your password" />
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
