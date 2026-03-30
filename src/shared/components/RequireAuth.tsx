import { Navigate } from "react-router-dom";
import { useAuth } from "@/shared/hooks/useAuth";
import { Loader2, ShieldX } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { UserRole } from "@/shared/types/database";

interface RequireAuthProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

export default function RequireAuth({ children, requiredRole }: RequireAuthProps) {
  const { session, profile, loading, signOut, user } = useAuth();

  // Still loading auth state or profile — show spinner
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Not logged in
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // Session exists but profile hasn't loaded yet — keep showing spinner
  // This prevents the "Access Denied" flash while profile is being fetched
  if (requiredRole && profile === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Profile loaded but wrong role
  if (requiredRole && profile?.role !== requiredRole) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center max-w-md">
          <div className="w-14 h-14 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-5">
            <ShieldX className="w-7 h-7 text-destructive" />
          </div>
          <h1 className="font-heading text-2xl font-semibold mb-2">Access Denied</h1>
          <p className="text-muted-foreground mb-1">
            <strong>{user?.email}</strong> is not a registered admin.
          </p>
          <p className="text-muted-foreground text-sm mb-6">
            If you believe this is an error, contact the team.
          </p>
          <Button variant="ghost" onClick={signOut}>
            Sign out
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
