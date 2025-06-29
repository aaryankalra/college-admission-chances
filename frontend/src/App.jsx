import { Route, Routes } from "react-router";
import "./App.css";
import ThemeButton from "./components/ThemeButton";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./utils/auth/ProtectedRoute";

function App() {
  return (
    <>
      <div>
        <ThemeButton />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
