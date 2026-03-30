import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Profile } from "@/shared/types/database";
import { Search, Shield, GraduationCap } from "lucide-react";
import { Input } from "@/components/ui/input";

interface StudentWithEnrollment extends Profile {
  enrollments?: { cohort_id: string; payment_status: string; cohorts: { name: string } | null }[];
}

export default function AdminStudents() {
  const [users, setUsers] = useState<StudentWithEnrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => { document.title = "Students | Admin Portal"; }, []);
  useEffect(() => { setTimeout(() => setVisible(true), 50); }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error: fetchErr } = await supabase
        .from("profiles")
        .select("*, enrollments(cohort_id, payment_status, cohorts(name))")
        .order("created_at", { ascending: false });

      if (fetchErr) {
        setError("Failed to load users: " + fetchErr.message);
        console.error("Users fetch error:", fetchErr);
      }

      setUsers((data as StudentWithEnrollment[]) ?? []);
      setLoading(false);
    };

    fetchUsers();
  }, []);

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      (u.full_name?.toLowerCase().includes(q)) ||
      (u.discord?.toLowerCase().includes(q)) ||
      u.role.toLowerCase().includes(q)
    );
  });

  const roleBadge = (role: string) => {
    if (role === "admin") {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-amber-500/10 text-amber-500">
          <Shield className="w-3 h-3" />Admin
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500">
        <GraduationCap className="w-3 h-3" />Student
      </span>
    );
  };

  return (
    <div
      className="transition-all duration-700 ease-out"
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
    >
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-semibold">
          Users
          <span className="text-muted-foreground text-base font-normal ml-2">({filtered.length})</span>
        </h1>
      </div>

      {error && <p className="text-sm text-destructive mb-4">{error}</p>}

      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, discord, or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="border border-border/50 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50 bg-muted/30">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Name</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Discord</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Role</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Enrolled In</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Joined</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">Loading...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No users found</td></tr>
              ) : (
                filtered.map((user) => {
                  const paidEnrollments = (user.enrollments ?? []).filter((e) => e.payment_status === "paid");
                  return (
                    <tr key={user.id} className="border-b border-border/30 hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 font-medium">{user.full_name || "—"}</td>
                      <td className="px-4 py-3 text-muted-foreground">{user.discord || "—"}</td>
                      <td className="px-4 py-3">{roleBadge(user.role)}</td>
                      <td className="px-4 py-3">
                        {paidEnrollments.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {paidEnrollments.map((e, i) => (
                              <span key={i} className="px-2 py-0.5 rounded-full text-xs bg-emerald-500/10 text-emerald-500">
                                {e.cohorts?.name || "Unknown"}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">Not enrolled</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">
                        {new Date(user.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
