import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../context/AuthContext.js";

const ACCESS_TOKEN_KEY = "accessToken";

function decodeJWT(token) {
  if (typeof token !== "string") return null;
  const parts = token.split(".");
  if (parts.length < 2) return null;
  try {
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.warn("AuthProvider: unable to decode token", error);
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const syncUserFromToken = useCallback(() => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!token) {
      setUser(null);
      return;
    }
    const payload = decodeJWT(token);
    if (payload) {
      const nextUser = {
        id: payload.sub ?? payload.id ?? null,
        email: payload.email ?? payload.user_email ?? null,
        name: payload.name ?? payload.user_name ?? null,
        role: payload.role ?? payload.user_role ?? "viewer",
        avatar: payload.avatar ?? null,
      };
      setUser(nextUser);
    } else {
      setUser(null);
    }
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    setUser(null);
  }, []);

  useEffect(() => {
    syncUserFromToken();
    const handler = () => syncUserFromToken();
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [syncUserFromToken]);

  const value = useMemo(
    () => ({ user, setUser, syncUserFromToken, signOut }),
    [user, syncUserFromToken, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
