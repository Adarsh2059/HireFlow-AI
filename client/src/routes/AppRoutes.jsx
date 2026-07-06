import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import CandidateDashboard from "../pages/dashboard/CandidateDashboard";
import PublicRoute from "../components/auth/PublicRoute";
import Resume from "../pages/resume/Resume";

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <CandidateDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      <Route
        path="/resume"
        element={
          <ProtectedRoute>
            <Resume />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<h1>404 Page Not Found</h1>} />
    </Routes>
  );
}

export default AppRoutes;
