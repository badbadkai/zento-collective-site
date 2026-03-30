import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/shared/hooks/useAuth";
import RequireAuth from "@/shared/components/RequireAuth";
import AuthCallback from "@/shared/components/AuthCallback";
import LoginPage from "@/shared/components/LoginPage";
import PortalLayout from "./layouts/PortalLayout";
import Dashboard from "./pages/Dashboard";
import Modules from "./pages/Modules";
import ModuleView from "./pages/ModuleView";
import Submissions from "./pages/Submissions";
import Profile from "./pages/Profile";

export default function PortalApp() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginPage portalName="Student Portal" />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route
          element={
            <RequireAuth>
              <PortalLayout />
            </RequireAuth>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="/modules" element={<Modules />} />
          <Route path="/modules/:moduleId" element={<ModuleView />} />
          <Route path="/submissions" element={<Submissions />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
