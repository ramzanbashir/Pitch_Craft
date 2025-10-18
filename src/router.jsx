import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import CreatePitch from "./pages/CreatePitch/CreatePitch";
import PitchResult from "./pages/CreatePitch/PitchResult";
import ExportPage from "./pages/ExportPage";
import Home from "./pages/Home";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreatePitch />} />
        <Route path="/result" element={<PitchResult />} />
        <Route path="/export" element={<ExportPage />} />
        <Route path="/export" element={<ExportPage />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
