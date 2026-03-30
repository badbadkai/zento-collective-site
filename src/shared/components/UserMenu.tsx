import { useNavigate } from "react-router-dom";
import { useAuth } from "@/shared/hooks/useAuth";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Settings, LogOut, Moon, Sun, ChevronUp } from "lucide-react";

interface UserMenuProps {
  collapsed?: boolean;
  settingsPath?: string;
}

export default function UserMenu({ collapsed = false, settingsPath = "/settings" }: UserMenuProps) {
  const { profile, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const displayName = profile?.full_name || "User";
  const initials = displayName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
  const isDark = theme === "dark";

  return (
    <div className={`border-t border-border/50 ${collapsed ? "p-2" : "p-3"}`}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
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
                <span className="text-sm text-foreground truncate flex-1 text-left">{displayName}</span>
                <ChevronUp className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              </>
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="top"
          align={collapsed ? "center" : "start"}
          sideOffset={8}
          className="w-56 bg-card/95 backdrop-blur-xl border-border/50 user-menu-dropdown"
        >
          {/* User info */}
          <div className="px-3 py-2 border-b border-border/50">
            <p className="text-sm font-medium">{displayName}</p>
            <p className="text-xs text-muted-foreground truncate">{profile?.role === "admin" ? "Administrator" : "Student"}</p>
          </div>

          {/* Theme switch */}
          <div className="px-3 py-2">
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="flex items-center justify-between w-full group"
            >
              <span className="text-sm text-muted-foreground">Theme</span>
              <div className="flex items-center gap-1.5 bg-muted/50 rounded-full p-0.5">
                <div className={`flex items-center justify-center w-6 h-6 rounded-full transition-all duration-300 ${!isDark ? "bg-background shadow-sm" : ""}`}>
                  <Sun className={`w-3 h-3 transition-colors ${!isDark ? "text-amber-500" : "text-muted-foreground"}`} />
                </div>
                <div className={`flex items-center justify-center w-6 h-6 rounded-full transition-all duration-300 ${isDark ? "bg-background shadow-sm" : ""}`}>
                  <Moon className={`w-3 h-3 transition-colors ${isDark ? "text-blue-400" : "text-muted-foreground"}`} />
                </div>
              </div>
            </button>
          </div>

          <div className="border-t border-border/50" />

          <DropdownMenuItem
            onClick={() => navigate(settingsPath)}
            className="cursor-pointer gap-2"
          >
            <Settings className="w-4 h-4" />
            Account Settings
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={signOut}
            className="cursor-pointer gap-2 text-destructive focus:text-destructive"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
