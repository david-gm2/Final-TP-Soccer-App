import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({ children }) {
  const token = sessionStorage.getItem("accessToken");

  if (!token) {
    return <Navigate to={"/log-in"} replace />;
  }
  return children;
}
