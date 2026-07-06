import { Navigate } from "react-router-dom";

import Loader from "../common/Loader";

import { useAuth } from "../../context/AuthContext";

function ProtectedRoute({ children }) {
  const { token, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
