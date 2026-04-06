import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AnalysisPage from "./pages/AnalysisPage";
import JobsPage from "./pages/JobsPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analysis" element={<AnalysisPage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;