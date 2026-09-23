import { useState } from "react";
import { FaApple, FaSpotify } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";

import "../../styles/auth.css";

function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const updateField = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const register = async (event) => {
    event.preventDefault();
    setMessage("");

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          fullname: {
            firstName: formData.firstName,
            lastName: formData.lastName,
          },
          role: formData.role,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(
          result.message || result.errors?.[0]?.msg || "Registration failed.",
        );
        return;
      }

      navigate("/login");
    } catch {
      setMessage("Cannot connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  const googleRegister = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <main className="auth-screen register-screen">
      <section className="auth-content" aria-labelledby="register-title">
        <FaSpotify className="spotify-mark" aria-label="Spotify" />

        <h1 className="auth-heading" id="register-title">
          Sign up to
          <br />
          start listening
        </h1>

        <form className="auth-form standard-form" onSubmit={register}>
          <div className="name-row">
            <div className="field">
              <label htmlFor="first-name">First name</label>
              <input
                id="first-name"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={updateField}
                placeholder="First name"
                autoComplete="given-name"
                required
              />
            </div>

            <div className="field">
              <label htmlFor="last-name">Last name</label>
              <input
                id="last-name"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={updateField}
                placeholder="Last name"
                autoComplete="family-name"
                required
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="register-email">Email address</label>
            <input
              id="register-email"
              name="email"
              type="email"
              value={formData.email}
              onChange={updateField}
              placeholder="name@domain.com"
              autoComplete="email"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="register-password">Password</label>
            <input
              id="register-password"
              name="password"
              type="password"
              value={formData.password}
              onChange={updateField}
              placeholder="Create a password"
              autoComplete="new-password"
              minLength="6"
              required
            />
          </div>

          <div className="field">
            <label htmlFor="confirm-password">Confirm password</label>
            <input
              id="confirm-password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={updateField}
              placeholder="Confirm your password"
              autoComplete="new-password"
              minLength="6"
              required
            />
          </div>

          <fieldset className="role-selection">
            <legend>Choose your role</legend>

            <div className="role-options">
              <label className="role-option">
                <input
                  type="radio"
                  name="role"
                  value="user"
                  checked={formData.role === "user"}
                  onChange={updateField}
                />
                <span className="role-radio" aria-hidden="true" />
                <span>User</span>
              </label>

              <label className="role-option">
                <input
                  type="radio"
                  name="role"
                  value="artist"
                  checked={formData.role === "artist"}
                  onChange={updateField}
                />
                <span className="role-radio" aria-hidden="true" />
                <span>Artist</span>
              </label>
            </div>
          </fieldset>

          {message && (
            <p className="form-message" role="alert">
              {message}
            </p>
          )}

          <button className="primary-button" type="submit" disabled={loading}>
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <p className="auth-divider">or</p>

        <div className="provider-buttons" aria-label="Social sign-up options">
          <button
            className="provider-button"
            type="button"
            onClick={googleRegister}
          >
            <FcGoogle className="provider-icon google" aria-hidden="true" />
            <span>Sign up with Google</span>
          </button>

          <button className="provider-button" type="button">
            <FaApple className="provider-icon" aria-hidden="true" />
            <span>Sign up with Apple</span>
          </button>
        </div>

        <footer className="auth-footer">
          <span>Already have an account?</span>
          <Link to="/login">Log in</Link>
        </footer>
      </section>
    </main>
  );
}

export default Register;
