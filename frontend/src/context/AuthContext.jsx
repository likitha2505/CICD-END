import React, { createContext, useState, useEffect } from "react";
import * as jwtDecodeLib from "jwt-decode";
const jwtDecode = jwtDecodeLib && jwtDecodeLib.default ? jwtDecodeLib.default : jwtDecodeLib;

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const email = decoded.sub || decoded.username || decoded.email || null;
        const roles = Array.isArray(decoded.roles)
          ? decoded.roles
          : decoded.roles
            ? [decoded.roles]
            : [];
        setUser({ email, roles, raw: decoded });
      } catch (e) {
        localStorage.removeItem("token");
      }
    }
  }, []);

  const saveToken = (token) => {
    if (!token) return;
    localStorage.setItem("token", token);
    try {
      const decoded = jwtDecode(token);
      const email = decoded.sub || decoded.username || decoded.email || null;
      const roles = Array.isArray(decoded.roles)
        ? decoded.roles
        : decoded.roles
          ? [decoded.roles]
          : [];
      setUser({ email, roles, raw: decoded });
    } catch (e) {
      setUser(null);
    }
  };

  const logout = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(`${import.meta.env.VITE_API_BASE_URL || "http://localhost:8081"}/api/auth/logout`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      }).catch(() => {});
    }
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, saveToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
