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
import RecruiterDashboard from "../pages/recruiter/RecruiterDashboard";
import MyJobs from "../pages/recruiter/MyJobs";
import RoleRedirect from "../components/auth/RoleRedirect";
import EditJob from "../pages/recruiter/EditJob";
import CreateJob from "../pages/recruiter/CreateJob";
import JobApplicants from "../pages/recruiter/JobApplicants";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RoleRedirect />} />

      <Route
        path="/candidate/dashboard"
        element={
          <ProtectedRoute allowedRoles={["candidate"]}>
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

      <Route
        path="/recruiter/dashboard"
        element={
          <ProtectedRoute allowedRoles={["recruiter"]}>
            <RecruiterDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/recruiter/jobs"
        element={
          <ProtectedRoute>
            <MyJobs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/recruiter/jobs/edit/:id"
        element={
          <ProtectedRoute allowedRoles={["recruiter"]}>
            <EditJob />
          </ProtectedRoute>
        }
      />

      <Route
        path="/recruiter/jobs/:jobId/applicants"
        element={
          <ProtectedRoute allowedRoles={["recruiter", "admin"]}>
            <JobApplicants />
          </ProtectedRoute>
        }
      />

      <Route
        path="/recruiter/jobs/create"
        element={
          <ProtectedRoute allowedRoles={["recruiter", "admin"]}>
            <CreateJob />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<h1>404 Page Not Found</h1>} />
    </Routes>
  );
}

export default AppRoutes;
