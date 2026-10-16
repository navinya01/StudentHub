import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Registration successful! Please login.");
        navigate("/login");
      } else {
        setError(data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Register error:", error);
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


        <div className="auth-hero">

          <div className="auth-eyebrow">
            START YOUR JOURNEY
          </div>

          <h1>
            Build better
            <br />
            <span>study habits.</span>
          </h1>

          <p>
            Create your StudentHub account and keep
            your academic life organized, productive
            and on track.
          </p>


          <div className="auth-features">

            <div className="auth-feature-card">

              <div className="feature-icon purple">
                ✓
              </div>

              <div>
                <strong>
                  Track Your Habits
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
                  Manage Results
                </strong>

                <small>
                  Keep your academic performance organized
                </small>
              </div>

            </div>


            <div className="auth-feature-card">

              <div className="feature-icon green">
                📚
              </div>

              <div>
                <strong>
                  Study Smarter
                </strong>

                <small>
                  Access useful learning resources
                </small>
              </div>

            </div>

          </div>


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
              <strong>24/7</strong>
              <span>Access</span>
            </div>

          </div>

        </div>


        <div className="auth-left-footer">
          © 2026 StudentHub • Your journey starts here.
        </div>

      </div>


      {/* ================= RIGHT SIDE ================= */}

      <div className="auth-right">

        <div className="login-decoration decoration-one">
          ✦
        </div>

        <div className="login-decoration decoration-two">
          +
        </div>


        <div className="auth-card">

          <div className="auth-card-header">

            <div className="auth-mobile-logo">
              S
            </div>

            <span className="auth-small-label">
              CREATE ACCOUNT
            </span>

            <h1>
              Join StudentHub
            </h1>

            <p>
              Create your account to get started
            </p>

          </div>


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


          <form onSubmit={handleRegister}>

            {/* NAME */}

            <div className="auth-field">

              <label>
                Full Name
              </label>

              <div className="auth-input">

                <span>
                  👤
                </span>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                />

              </div>

            </div>


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

              <label>
                Password
              </label>

              <div className="auth-input">

                <span>
                  🔒
                </span>

                <input
                  type="password"
                  placeholder="Minimum 6 characters"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                />

              </div>

            </div>


            {/* CONFIRM PASSWORD */}

            <div className="auth-field">

              <label>
                Confirm Password
              </label>

              <div className="auth-input">

                <span>
                  🔐
                </span>

                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                />

              </div>

            </div>


            {/* REGISTER BUTTON */}

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >

              <span>
                {loading
                  ? "Creating Account..."
                  : "Create Account"}
              </span>

              {!loading && (
                <span className="button-arrow">
                  →
                </span>
              )}

            </button>

          </form>


          <div className="auth-divider">
            <span>OR</span>
          </div>


          <div className="auth-register-box">

            <span>
              Already have an account?
            </span>

            <Link to="/login">
              Sign in to StudentHub →
            </Link>

          </div>


          <div className="login-security">

            <span>
              🔐
            </span>

            <p>
              Your password is securely encrypted.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Register;