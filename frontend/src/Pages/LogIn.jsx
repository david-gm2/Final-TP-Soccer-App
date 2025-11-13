import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../styles/LogIn.css";

const API_URL = 'https://backend-exercises-production.up.railway.app';

export function LogIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
 

    if (!email || !password) {
      setMessage("Faltan campos obligatorios.");
      return;
    }
    try {
      const response = await fetch(
        `${API_URL}/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );


      const text = await response.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("El servidor no devolvió JSON válido");
      }

      if (!response.ok) throw new Error(data.message || "Error en el login");

      localStorage.setItem("accessToken", data.accessToken);
      setMessage("Login exitoso, redirigiendo a la pagina...");

      setTimeout(() => {
        navigate("/homepage");
      }, 1500);
    } catch (error) {
      setMessage(`${error.message}`);
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
          <label html="email">Email*</label>
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
          <button type="submit">Log In</button>
          <p>{message}</p>
        </form>
        <div className="linksLogIn">
          <a href="#">Forgot you password?</a>
          <p>
            Don't have an account? <Link to="/sign-up">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
