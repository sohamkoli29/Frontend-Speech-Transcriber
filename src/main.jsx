// src/main.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";    
import { AuthProvider } from "./contexts/AuthContext";
import Layout from "./components/Layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Home from "./pages/Home/Home";
import History from "./pages/History/History";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="history" element={
            <ProtectedRoute>
              <History />
            </ProtectedRoute>
          } />
        </Route>
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);