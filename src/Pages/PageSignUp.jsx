import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/SignUp.css";
import { useAuth } from "../hooks/useAuth";

export function SignUp() {
  const navigate = useNavigate();
  const API_URL = "https://backend-exercises-production.up.railway.app";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(
      "Request body:",
      JSON.stringify({ user_name: name, email, password })
    );

    if (!name || !email || !password) {
      setMessage("Faltan campos obligatorios.");
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
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="email">Email*</label>
          <input
            name="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <label htmlFor="password">Password*</label>
          <input
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
