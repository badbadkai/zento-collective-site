import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "@/shared/hooks/useAuth";
import { useTheme } from "next-themes";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  FileCheck,
  UserPlus,
  UsersRound,
  Settings,
  LogOut,
  Moon,
  Sun,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logoLight from "@/assets/logo-dark.png";
import logoDark from "@/assets/logo-light.png";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/waitlist", icon: Users, label: "Waitlist" },
  { to: "/cohorts", icon: GraduationCap, label: "Cohorts" },
  { to: "/modules", icon: BookOpen, label: "Modules" },
  { to: "/submissions", icon: FileCheck, label: "Submissions" },
  { to: "/enrollments", icon: UserPlus, label: "Enrollments" },
  { to: "/students", icon: UsersRound, label: "Students" },
  { to: "/settings", icon: Settings, label: "Settings" },
];

export default function AdminLayout() {
  const { profile, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar wrapper — group for hover detection on the collapse toggle */}
      <div className="relative group/sidebar shrink-0">
        <aside
          className={`h-screen sticky top-0 border-r border-border/50 bg-card/30 flex flex-col overflow-hidden ${
            collapsed ? "w-16" : "w-64"
          }`}
          style={{ transition: "width 400ms cubic-bezier(0.4, 0, 0.2, 1)" }}
        >
          {/* Header */}
          <div className={`border-b border-border/50 ${collapsed ? "px-3 py-4" : "px-5 py-4"}`}>
            <div className="flex items-center gap-3">
              <div className="relative h-7 w-7 shrink-0">
                <img
                  src={logoLight}
                  alt=""
                  className={`h-7 w-auto transition-opacity duration-500 ${theme === "dark" ? "opacity-100" : "opacity-0"}`}
                />
                <img
                  src={logoDark}
                  alt=""
                  className={`absolute inset-0 h-7 w-auto transition-opacity duration-500 ${theme === "dark" ? "opacity-0" : "opacity-100"}`}
                />
              </div>
              <span className={`text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground whitespace-nowrap transition-opacity duration-300 ${collapsed ? "opacity-0" : "opacity-100"}`}>
                Admin Portal
              </span>
              <span className={`text-[10px] text-muted-foreground/50 ml-auto whitespace-nowrap transition-opacity duration-300 ${collapsed ? "opacity-0" : "opacity-100"}`}>
                v0.1
              </span>
            </div>
          </div>

          {/* Nav */}
          <nav className={`flex-1 space-y-1 ${collapsed ? "p-2" : "p-3"}`}>
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                title={collapsed ? item.label : undefined}
                className={({ isActive }) =>
                  `flex items-center rounded-lg font-medium transition-colors ${
                    collapsed
                      ? `justify-center w-10 h-10 mx-auto text-sm ${isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`
                      : `gap-3 px-3 py-2.5 text-sm ${isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"}`
                  }`
                }
              >
                <item.icon className="w-4 h-4 shrink-0" />
                <span className={`whitespace-nowrap transition-opacity duration-300 ${collapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}`}>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Footer */}
          <div className={`border-t border-border/50 ${collapsed ? "p-2 space-y-1" : "p-4 space-y-2"}`}>
            {collapsed ? (
              <>
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="flex items-center justify-center w-10 h-10 mx-auto rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                  title="Toggle theme"
                >
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </button>
                <button
                  onClick={signOut}
                  className="flex items-center justify-center w-10 h-10 mx-auto rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground truncate">
                    {profile?.full_name || "Admin"}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  >
                    <Sun className="h-3.5 w-3.5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-3.5 w-3.5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-muted-foreground"
                  onClick={signOut}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign out
                </Button>
              </>
            )}
          </div>
        </aside>

        {/* Collapse toggle — appears on hover near the sidebar border */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute top-1/2 -translate-y-1/2 -right-3 z-20 w-6 h-6 rounded-full bg-card border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted shadow-sm opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-200"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronsRight className="w-3 h-3" /> : <ChevronsLeft className="w-3 h-3" />}
        </button>
      </div>

      {/* Main content */}
      <main className="flex-1 overflow-auto flex flex-col">
        <div className="flex-1 flex items-start justify-center p-6 md:p-8">
          <div className="w-full max-w-5xl">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
