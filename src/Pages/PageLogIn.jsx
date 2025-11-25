import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";

import "../styles/LogIn.css";

const API_URL = "https://backend-exercises-production.up.railway.app";

export function LogIn() {
  const navigate = useNavigate();
  const { syncUserFromToken } = useAuth() ?? {};
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!email || !password) {
      setMessage("Please complete the required fields.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("The server returned invalid JSON.");
      }

      if (!response.ok) throw new Error(data.message || "Error logging in");

      sessionStorage.setItem("accessToken", data.accessToken);
      syncUserFromToken?.();
      setMessage("Login successful. Redirecting to the dashboard...");
      navigate("/");
    } catch (error) {
      setMessage(error.message || "Unable to log in.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginCard">
        <h2>Log In</h2>
        <p className="subtitle">
          Connect players. Create matches. <br />
          Keep the game alive.
        </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email*</label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          <label htmlFor="password">Password*</label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary"
          >
            {isLoading ? "Loading..." : "Log In"}
          </button>
          <p role="alert">{message}</p>
        </form>
        <div className="linksLogIn">
          <a href="#forgot-password">Forgot your password?</a>
          <p>
            Don't have an account? <Link to="/sign-up">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
