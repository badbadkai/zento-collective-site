import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/shared/hooks/useAuth";
import RequireAuth from "@/shared/components/RequireAuth";
import AuthCallback from "@/shared/components/AuthCallback";
import LoginPage from "@/shared/components/LoginPage";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Waitlist from "./pages/Waitlist";
import Cohorts from "./pages/Cohorts";
import Modules from "./pages/Modules";
import Submissions from "./pages/Submissions";

export default function AdminApp() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage portalName="Admin Portal" />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route
          element={
            <RequireAuth requiredRole="admin">
              <AdminLayout />
            </RequireAuth>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="/waitlist" element={<Waitlist />} />
          <Route path="/cohorts" element={<Cohorts />} />
          <Route path="/modules" element={<Modules />} />
          <Route path="/submissions" element={<Submissions />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
