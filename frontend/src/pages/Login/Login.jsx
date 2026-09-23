import { useState } from "react";
import { FaApple, FaFacebook, FaSpotify } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";

import "../../styles/auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (event) => {
    event.preventDefault();
    setMessage("");

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.message || "Login failed.");
        return;
      }

      navigate("/home");
    } catch {
      setMessage("Cannot connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <main className="auth-screen login-screen">
      <section className="auth-content" aria-labelledby="login-title">
        <FaSpotify className="spotify-mark" aria-label="Spotify" />

        <h1 className="auth-heading" id="login-title">
          Welcome back
        </h1>

        <form className="auth-form standard-form" onSubmit={login}>
          <div className="field">
            <label htmlFor="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@domain.com"
              autoComplete="email"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              autoComplete="current-password"
              required
            />
          </div>

          {message && (
            <p className="form-message" role="alert">
              {message}
            </p>
          )}

          <button className="primary-button" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Log in"}
          </button>
        </form>

        <p className="auth-divider">or</p>

        <div className="provider-buttons" aria-label="Social sign-in options">
          <button
            className="provider-button"
            type="button"
            onClick={googleLogin}
          >
            <FcGoogle className="provider-icon google" aria-hidden="true" />
            <span>Continue with Google</span>
          </button>

          <button className="provider-button" type="button">
            <FaFacebook
              className="provider-icon facebook"
              aria-hidden="true"
            />
            <span>Continue with Facebook</span>
          </button>

          <button className="provider-button" type="button">
            <FaApple className="provider-icon" aria-hidden="true" />
            <span>Continue with Apple</span>
          </button>
        </div>

        <footer className="auth-footer">
          <span>Don't have an account?</span>
          <Link to="/register">Sign up</Link>
        </footer>
      </section>
    </main>
  );
}

export default Login;
