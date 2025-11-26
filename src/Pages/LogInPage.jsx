import { useState } from "react";
import { data, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

import "../styles/LogInPage.css";

const API_URL = "https://backend-exercises-production.up.railway.app";

export function LogInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Faltan campos obligatorios.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error(data.message || "Error en el login");

      const { accessToken } = await response.json();

      login(accessToken);

      setMessage("Login exitoso, redirigiendo a la pagina...");
    } catch (error) {
      setMessage(`${error.message}`);
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
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Cargando..." : "Log In"}
          </button>
          <p role="alert">{message}</p>
        </form>
        <div className="linksLogIn">
          <a href="#forgot-password">Forgot your password?</a>
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
