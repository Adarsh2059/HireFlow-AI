import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loader from "../common/Loader";

function RoleRedirect() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === "recruiter") {
    return <Navigate to="/recruiter/dashboard" replace />;
  }

  return <Navigate to="/candidate/dashboard" replace />;
}

export default RoleRedirect;