import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/SignUp.css";

// * preventivo

export default function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setMessage("Faltan campos obligatorios.");
      return;
    }
    try {
      const response = await fetch(
        "https://backend-exercises-production.up.railway.app/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
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

      sessionStorage.setItem("accessToken", data.accessToken);
      setMessage("Login exitoso, redirigiendo a la pagina...");

      setTimeout(() => {
        navigate("/homepage");
      }, 1500);
    } catch (error) {
      setMessage(`${error.message}`);
    }
  };
  // * preventivo hasta aca

  return (
    <div className="signupContainer">
      <div className="signupCard">
        <h2>Sign Up</h2>
        <p className="subtitle">
          Connect players. Create matches. <br />
          Keep the game alive.
        </p>
        <form onSubmit={handleSubmit}>
          <label>Name*</label>
          <input type="text" onChange={(e) => setName(e.target.value)} />
          <label>Email*</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <label>Password*</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
          <p>{message}</p>
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
