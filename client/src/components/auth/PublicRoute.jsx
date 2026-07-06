import { Navigate } from "react-router-dom";

import Loader from "../common/Loader";

import { useAuth } from "../../context/AuthContext";

function PublicRoute({ children }) {
  const { token, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (token) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default PublicRoute;