import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../styles/SignUp.css";

const API_URL = "https://backend-exercises-production.up.railway.app";

export function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!name || !email || !password) {
      setMessage("Please complete the required fields.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_name: name, email, password }),
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("The server returned invalid JSON.");
      }

      if (!response.ok) {
        throw new Error(data.message || "Error registering the user.");
      }

      sessionStorage.setItem("accessToken", data.accessToken);
      setMessage("User created successfully. Redirecting to the dashboard...");

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      setMessage(error.message || "Unable to sign up.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signupContainer">
      <div className="signupCard">
        <h2>Sign Up</h2>
        <p className="subtitle">
          Connect players. Create matches. <br />
          Keep the game alive.
        </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name*</label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
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
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? "Creating..." : "Sign Up"}
          </button>
          <p role="alert">{message}</p>
        </form>
        <div className="linksSignUp">
          <p>
            Already have an account? <Link to="/log-in">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
