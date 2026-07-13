import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Jobs from "../pages/Jobs";
import Resume from "../pages/Resume";
import Ranking from "../pages/Ranking";
import Reports from "../pages/Reports";
import Profile from "../pages/Profile";
import ResumeUpload from "../pages/ResumeUpload/ResumeUpload";
import Settings from "../Settings/Settings";
import CandidateDetails from "../pages/CandidateDetails";
import { register } from "../services/authService";
import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* All Logged-in Users */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
  path="/candidate/:id"
  element={<CandidateDetails />}
/>

        {/* Admin + HR */}
        <Route
          path="/jobs"
          element={
            <ProtectedRoute roles={["admin", "hr"]}>
              <Jobs />
            </ProtectedRoute>
          }
        />

        <Route
          path="/resume"
          element={
            <ProtectedRoute roles={["admin", "hr"]}>
              <Resume />
            </ProtectedRoute>
          }
        />

        <Route
          path="/upload"
          element={
            <ProtectedRoute roles={["admin", "hr"]}>
              <ResumeUpload />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute roles={["admin", "hr"]}>
              <Reports />
            </ProtectedRoute>
          }
        />

        {/* Admin + HR + Recruiter */}
        <Route
          path="/ranking"
          element={
            <ProtectedRoute roles={["admin", "hr", "recruiter"]}>
              <Ranking />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;