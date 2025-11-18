import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../context/AuthContext";

const TOKEN_KEY = "accessToken";

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const initialState = localStorage.getItem(TOKEN_KEY);

  const [user, setUser] = useState(initialState);

  const login = (token) => {
    sessionStorage.setItem(TOKEN_KEY, token);
    const data = jwtDecode(token);
    setUser(data);
    navigate("/");
  };

  const logout = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    setUser(null);
    navigate("/login", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
