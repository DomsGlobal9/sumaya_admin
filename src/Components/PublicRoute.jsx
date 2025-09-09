// src/routes/PublicRoute.jsx
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const token = localStorage.getItem("adminToken");
  return token ? <Navigate to="/admin" replace /> : children;
}
