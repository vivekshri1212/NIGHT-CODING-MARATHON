import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import DashboardPreset from "./pages/DashboardPreset";
import InterviewPrep from "./pages/InterviewPrep";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPreset />
          </ProtectedRoute>
        }
      />
      <Route
        path="/interview/:id"
        element={
          <ProtectedRoute>
            <InterviewPrep />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
