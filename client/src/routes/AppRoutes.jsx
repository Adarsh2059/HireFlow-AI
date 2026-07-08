import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import CandidateDashboard from "../pages/dashboard/CandidateDashboard";
import PublicRoute from "../components/auth/PublicRoute";
import Resume from "../pages/resume/Resume";
import Jobs from "../pages/jobs/Jobs";
import JobDetails from "../pages/jobs/JobDetails";
import MyApplications from "../pages/applications/MyApplications";
import ATSReport from "../pages/ats/ATSReport";

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

      <Route
        path="/jobs"
        element={
          <ProtectedRoute>
            <Jobs />
          </ProtectedRoute>
        }
      />

      <Route
        path="/jobs/:id"
        element={
          <ProtectedRoute>
            <JobDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/applications"
        element={
          <ProtectedRoute>
            <MyApplications />
          </ProtectedRoute>
        }
      />

      <Route
        path="/ats/:jobId"
        element={
          <ProtectedRoute>
            <ATSReport />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<h1>404 Page Not Found</h1>} />
    </Routes>
  );
}

export default AppRoutes;
