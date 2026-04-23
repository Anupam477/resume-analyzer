import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import AnalysisPage from "./pages/AnalysisPage";
import JobsPage from "./pages/JobsPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import AdminPage from "./pages/AdminPage";
import AmbientBackground from "./components/AmbientBackground";

function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLandingPage = location.pathname === "/";

  // Force redirect to front page on any full page refresh
  useEffect(() => {
    navigate("/");
  }, []);

  return (
    <>
      <AmbientBackground />
      {!isLandingPage && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/analysis" element={<AnalysisPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;