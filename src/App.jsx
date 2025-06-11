import { BrowserRouter, Routes, Route,Link } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from './pages/Dashboard'
import Register from "./pages/Register";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoutes from "./components/ProtectedRoutes";
import ProtectedLayout from "./components/ProtectedLayout";
import JobSearch from "./pages/JobSearch";
import JobPosting from "./pages/JobPosting";
import ProfilePage from "./pages/ProfilePage";
import RenderResume from "./components/RenderResume";
import ResumeForm from "./components/ResumeForm";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
            <Route
            element={
              <ProtectedRoutes>
                <ProtectedLayout />
              </ProtectedRoutes>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/job-search" element={<JobSearch />} />
            <Route path="/job-posting" element={<JobPosting />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/resume" element={<RenderResume />} />
            <Route path="/resume-form" element={<ResumeForm />} />
          </Route>
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;