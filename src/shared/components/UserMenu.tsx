import { useState } from "react";
import { useAuth } from "@/shared/hooks/useAuth";
import { useTheme } from "next-themes";
import { LogOut, Moon, Sun, ChevronUp } from "lucide-react";

interface UserMenuProps {
  collapsed?: boolean;
}

export default function UserMenu({ collapsed = false }: UserMenuProps) {
  const { profile, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const displayName = profile?.full_name || "User";
  const initials = displayName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  const isDark = theme === "dark";

  return (
    <div className="border-t border-border/50">
      {/* Expanded menu items — slides up inline */}
      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? "200px" : "0px", opacity: open ? 1 : 0 }}
      >
        <div className={`${collapsed ? "px-2 py-2 space-y-1" : "px-3 pt-3 space-y-1"}`}>
          {/* Theme toggle */}
          <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={`flex items-center w-full rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors ${
              collapsed ? "justify-center w-10 h-10 mx-auto" : "gap-3 px-3 py-2"
            }`}
            title={collapsed ? (isDark ? "Light Mode" : "Dark Mode") : undefined}
          >
            {isDark ? <Sun className="w-4 h-4 shrink-0" /> : <Moon className="w-4 h-4 shrink-0" />}
            {!collapsed && <span>{isDark ? "Light Mode" : "Dark Mode"}</span>}
          </button>

          {/* Sign out */}
          <button
            onClick={signOut}
            className={`flex items-center w-full rounded-lg text-sm text-destructive/80 hover:text-destructive hover:bg-destructive/5 transition-colors ${
              collapsed ? "justify-center w-10 h-10 mx-auto" : "gap-3 px-3 py-2"
            }`}
            title={collapsed ? "Sign Out" : undefined}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      </div>

      {/* User trigger */}
      <div className={collapsed ? "p-2" : "p-3"}>
        <button
          onClick={() => setOpen(!open)}
          className={`flex items-center gap-3 w-full rounded-lg transition-colors hover:bg-muted/50 ${
            collapsed ? "justify-center p-2" : "px-3 py-2.5"
          }`}
          title={collapsed ? displayName : undefined}
        >
          <div className="w-7 h-7 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center justify-center shrink-0">
            {initials}
          </div>
          {!collapsed && (
            <>
              <div className="flex-1 text-left min-w-0">
                <p className="text-sm text-foreground truncate">{displayName}</p>
                <p className="text-[10px] text-muted-foreground">{profile?.role === "admin" ? "Administrator" : "Student"}</p>
              </div>
              <ChevronUp className={`w-3.5 h-3.5 text-muted-foreground shrink-0 transition-transform duration-300 ${open ? "" : "rotate-180"}`} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
