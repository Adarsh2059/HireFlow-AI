import { Navigate } from "react-router-dom";

import Loader from "../common/Loader";

import { useAuth } from "../../context/AuthContext";

function ProtectedRoute({ children, allowedRoles }) {
  const { token, user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (user && allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === "recruiter" || user.role === "admin") {
      return <Navigate to="/recruiter/dashboard" replace />;
    }
    return <Navigate to="/candidate/dashboard" replace />;
  }

  return children;
}

export default ProtectedRoute;
