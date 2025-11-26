import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../context/AuthContext";
import { ACCESS_TOKEN_KEY } from "../constants/auth.js";

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const initialState = sessionStorage.getItem(ACCESS_TOKEN_KEY);

  const [accessToken, setAccessToken] = useState(initialState);

  const login = (token) => {
    sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
    setAccessToken(token);
    navigate("/");
  };

  const logout = () => {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    setAccessToken(null);
    navigate("/login", { replace: true });
  };

  const user = useMemo(() => {
    try {
      return accessToken ? jwtDecode(accessToken) : null;
    } catch (e) {
      console.error(e);
    }
  }, [accessToken]);

  const isAdmin = useMemo(() => {
    return user?.roles.some((role) => role.roleName === "admin");
  }, [user]);

  return (
    <AuthContext.Provider value={{ accessToken, user, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
