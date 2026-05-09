import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/shared/hooks/useAuth";
import RequireAuth from "@/shared/components/RequireAuth";
import LoginPage from "@/shared/components/LoginPage";
import AdminLayout from "./layouts/AdminLayout";
import Dashboard from "./pages/Dashboard";
import Waitlist from "./pages/Waitlist";
import Cohorts from "./pages/Cohorts";
import Enrollments from "./pages/Enrollments";
import Students from "./pages/Students";

export default function AdminApp() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage portalName="Admin Portal" />} />
        <Route path="/" element={<RequireAuth requiredRole="admin"><AdminLayout /></RequireAuth>}>
          <Route index element={<Dashboard />} />
          <Route path="waitlist" element={<Waitlist />} />
          <Route path="cohorts" element={<Cohorts />} />
          <Route path="enrollments" element={<Enrollments />} />
          <Route path="students" element={<Students />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
