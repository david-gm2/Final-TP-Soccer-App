import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../styles/SignUp.css";
import { useAuth } from "../hooks/useAuth";

const API_URL = "https://backend-exercises-production.up.railway.app";

export function SignUp() {
  const navigate = useNavigate();
  const API_URL = "https://backend-exercises-production.up.railway.app";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    console.log(
      "Request body:",
      JSON.stringify({ user_name: name, email, password })
    );

    if (!name || !email || !password) {
      setMessage("Please complete the required fields.");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_name: name, email, password }),
      });

      if (!response.ok) {
        throw new Error(data.message || "Error en registro");
      }

      await response.json();

      const loginResponse = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(data.message || "Error en registro");
      }

      const { accessToken } = await loginResponse.json();

      login(accessToken);

      setMessage(
        "Usuario creado exitosamente. Redirigiendo a la pagina principal..."
      );

      navigate("/");
    } catch (error) {
      setMessage(`${error.message}`);
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
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Registrando..." : "Sign Up"}
          </button>
          <p>{message}</p>
        </form>
        <div className="linksSignUp">
          <p>
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
