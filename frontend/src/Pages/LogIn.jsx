import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventdDefault();

    if (!email || !password) {
      setMessage("Faltan campos obligatorios.");
      return;
    }
    try {
      const response = await fetch(
        "https://backend-exercises-production.up.railway.app/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "esta mal xd");
      localStorage.setItem("accessToken", data.accessToken);
      setMessage("Login exitoso, redirigiendo a la pagina...");
      setTimeout(() => {
        window.location.href = "/visitante";
      }, 1500);
    } catch (error) {
      setMessage(`${error.message}`);
    }
  };

  return (
    <div className="loginContainer">
      <div className="loginCard">
        <h2>"Log In</h2>
        <p className="subtitle">
          Connect players. Create matches. <br />
          Keep the game alive.
        </p>
        <form onSubmit={handleSubmit}>
          <label>Email*</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label>Password*</label>
          <input
            type="password"
            placeholder="*******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">"Log In"</button>
        </form>
      </div>
    </div>
  );
}
