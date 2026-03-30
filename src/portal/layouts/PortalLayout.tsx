import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useTheme } from "next-themes";
import {
  LayoutDashboard,
  BookOpen,
  Upload,
  User,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import logoLight from "@/assets/logo-dark.png";
import logoDark from "@/assets/logo-light.png";
import UserMenu from "@/shared/components/UserMenu";

const navItems = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/modules", icon: BookOpen, label: "Modules" },
  { to: "/submissions", icon: Upload, label: "My Submissions" },
  { to: "/profile", icon: User, label: "Profile" },
];

export default function PortalLayout() {
  const { theme } = useTheme();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar wrapper */}
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
                Student Portal
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

          {/* User menu */}
          <UserMenu collapsed={collapsed} settingsPath="/profile" />
        </aside>

        {/* Collapse toggle */}
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
