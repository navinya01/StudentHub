import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem(
          "studentUser",
          JSON.stringify(data.user)
        );

        navigate("/");
      } else {
        setError(
          data.message || "Invalid email or password."
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(
        "Server error. Please make sure backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      {/* ================= LEFT SIDE ================= */}

      <div className="auth-left">

        {/* BRAND */}

        <div className="auth-brand">

          <div className="auth-logo">
            S
          </div>

          <div>
            <h2>StudentHub</h2>
            <span>
              Productivity Platform
            </span>
          </div>

        </div>


        {/* HERO */}

        <div className="auth-hero">

          <div className="auth-eyebrow">
            WELCOME BACK
          </div>

          <h1>
            Your study life.
            <br />
            <span>Organized.</span>
          </h1>

          <p>
            One powerful platform to manage your
            habits, academic performance and study
            resources — all in one place.
          </p>


          {/* FEATURES */}

          <div className="auth-features">

            <div className="auth-feature-card">

              <div className="feature-icon purple">
                ✓
              </div>

              <div>
                <strong>
                  Habit Tracking
                </strong>

                <small>
                  Build productive daily routines
                </small>
              </div>

            </div>


            <div className="auth-feature-card">

              <div className="feature-icon blue">
                ◈
              </div>

              <div>
                <strong>
                  Academic Results
                </strong>

                <small>
                  Monitor your performance easily
                </small>
              </div>

            </div>


            <div className="auth-feature-card">

              <div className="feature-icon green">
                📚
              </div>

              <div>
                <strong>
                  Study Resources
                </strong>

                <small>
                  Learn smarter with useful resources
                </small>
              </div>

            </div>

          </div>


          {/* STATS */}

          <div className="auth-stats">

            <div>
              <strong>10K+</strong>
              <span>Students</span>
            </div>

            <div className="stat-line"></div>

            <div>
              <strong>50+</strong>
              <span>Resources</span>
            </div>

            <div className="stat-line"></div>

            <div>
              <strong>95%</strong>
              <span>Productivity</span>
            </div>

          </div>

        </div>


        {/* FOOTER */}

        <div className="auth-left-footer">
          © 2026 StudentHub • Study smarter, achieve more.
        </div>

      </div>


      {/* ================= RIGHT SIDE ================= */}

      <div className="auth-right">

        {/* Decorative floating elements */}

        <div className="login-decoration decoration-one">
          ✦
        </div>

        <div className="login-decoration decoration-two">
          +
        </div>


        <div className="auth-card">

          {/* CARD HEADER */}

          <div className="auth-card-header">

            <div className="auth-mobile-logo">
              S
            </div>

            <span className="auth-small-label">
              STUDENT ACCOUNT
            </span>

            <h1>
              Welcome Back 👋
            </h1>

            <p>
              Sign in to continue to your dashboard
            </p>

          </div>


          {/* ERROR */}

          {error && (
            <div className="auth-error">

              <div className="error-icon">
                !
              </div>

              <p>
                {error}
              </p>

            </div>
          )}


          {/* FORM */}

          <form onSubmit={handleLogin}>

            {/* EMAIL */}

            <div className="auth-field">

              <label>
                Email Address
              </label>

              <div className="auth-input">

                <span>
                  ✉
                </span>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div className="auth-field">

              <div className="password-label-row">

                <label>
                  Password
                </label>

                <span>
                  Secure Login
                </span>

              </div>

              <div className="auth-input">

                <span>
                  🔒
                </span>

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />

              </div>

            </div>


            {/* LOGIN BUTTON */}

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >

              <span>
                {loading
                  ? "Signing in..."
                  : "Sign In"}
              </span>

              {!loading && (
                <span className="button-arrow">
                  →
                </span>
              )}

            </button>

          </form>


          {/* DIVIDER */}

          <div className="auth-divider">
            <span>OR</span>
          </div>


          {/* REGISTER */}

          <div className="auth-register-box">

            <span>
              New to StudentHub?
            </span>

            <Link to="/register">
              Create your account →
            </Link>

          </div>


          {/* SECURITY */}

          <div className="login-security">

            <span>
              🔐
            </span>

            <p>
              Your account information is securely
              protected.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;