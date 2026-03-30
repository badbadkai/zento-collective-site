import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Users, ClipboardList, FileCheck, GraduationCap } from "lucide-react";

interface Stats {
  waitlistCount: number;
  studentCount: number;
  pendingSubmissions: number;
  activeCohorts: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    waitlistCount: 0,
    studentCount: 0,
    pendingSubmissions: 0,
    activeCohorts: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [waitlist, students, submissions, cohorts] = await Promise.all([
          supabase.from("bootcamp_waitlist").select("id", { count: "exact", head: true }),
          supabase.from("profiles").select("id", { count: "exact", head: true }).eq("role", "student"),
          supabase.from("submissions").select("id", { count: "exact", head: true }).eq("status", "pending"),
          supabase.from("cohorts").select("id", { count: "exact", head: true }).eq("status", "active"),
        ]);

        if (waitlist.error || students.error || submissions.error || cohorts.error) {
          console.error("Dashboard stats errors:", { waitlist: waitlist.error, students: students.error, submissions: submissions.error, cohorts: cohorts.error });
        }

        setStats({
          waitlistCount: waitlist.count ?? 0,
          studentCount: students.count ?? 0,
          pendingSubmissions: submissions.count ?? 0,
          activeCohorts: cohorts.count ?? 0,
        });
      } catch (err) {
        setError("Failed to load dashboard stats.");
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const cards = [
    { label: "Waitlist Entries", value: stats.waitlistCount, icon: ClipboardList, color: "text-amber-500" },
    { label: "Active Students", value: stats.studentCount, icon: Users, color: "text-emerald-500" },
    { label: "Pending Reviews", value: stats.pendingSubmissions, icon: FileCheck, color: "text-blue-500" },
    { label: "Active Cohorts", value: stats.activeCohorts, icon: GraduationCap, color: "text-purple-500" },
  ];

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold mb-6">Dashboard</h1>

      {error && <p className="text-sm text-destructive mb-4">{error}</p>}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <div key={card.label} className="p-5 rounded-xl border border-border/50 bg-card/50">
            <div className="flex items-center justify-between mb-3">
              <card.icon className={`w-5 h-5 ${card.color}`} />
            </div>
            <p className={`text-3xl font-semibold ${loading ? "animate-pulse" : ""}`}>
              {loading ? "-" : card.value}
            </p>
            <p className="text-xs text-muted-foreground mt-1">{card.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
