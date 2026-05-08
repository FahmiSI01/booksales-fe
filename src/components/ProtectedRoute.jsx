import { Navigate } from "react-router-dom";

export function RequireAuth({ children }) {
  const token = localStorage.getItem("accessToken");
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

export function RequireAdmin({ children }) {
  const token = localStorage.getItem("accessToken");
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

  if (!token) return <Navigate to="/login" replace />;
  if (userInfo.role !== "admin") return <Navigate to="/" replace />;

  return children;
}