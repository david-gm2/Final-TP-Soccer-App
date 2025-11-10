import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMesagge] = useState("");


const handleSubmit = aysnc (e) => {
    e.preventdefault();

if (!email || !password) {
    setMesagge("Faltan campos obligatorios.");
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
    if(!response.ok) throw new Error(data.mesagge || "esta mal xd");
    localStorage.setItem("accesToken", data.accesToken)
    setMesagge("Login exitoso, redirigiendo a la pagina...")
    setTimeout(()=> {
        window.location.href = "/visitante"
      }, 1500)
} catch (error){
    setMesagge(`${error.mesagge}`)
}
}
return (
    <div className="loginContainer">
        <div className="loginCard">
            <h2>"Log In</h2>
            <p className="subtitle">
                Connect players. Create matches. <br />
                    Keep the game alive.</p>
        </div>
    </div>
)
}