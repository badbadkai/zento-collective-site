import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/shared/hooks/useAuth";
import { Users, ClipboardList, FileCheck, GraduationCap } from "lucide-react";

interface Stats {
  waitlistCount: number;
  studentCount: number;
  pendingSubmissions: number;
  activeCohorts: number;
}

export default function AdminDashboard() {
  const { profile } = useAuth();
  const [stats, setStats] = useState<Stats>({
    waitlistCount: 0,
    studentCount: 0,
    pendingSubmissions: 0,
    activeCohorts: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => { document.title = "Dashboard | Admin Portal"; }, []);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

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

  const firstName = profile?.full_name?.split(" ")[0] || "there";

  const cards = [
    { label: "Waitlist Entries", value: stats.waitlistCount, icon: ClipboardList, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "Active Students", value: stats.studentCount, icon: Users, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Pending Reviews", value: stats.pendingSubmissions, icon: FileCheck, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Active Cohorts", value: stats.activeCohorts, icon: GraduationCap, color: "text-purple-500", bg: "bg-purple-500/10" },
  ];

  return (
    <div
      className="max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[calc(100vh-6rem)] transition-all duration-700 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)",
      }}
    >
      {/* Welcome */}
      <div className="text-center mb-12">
        <h1 className="font-heading text-3xl md:text-4xl font-semibold mb-2">
          Welcome to your Dashboard, {firstName}.
        </h1>
        <p className="text-muted-foreground">
          Here's an overview of your programme.
        </p>
      </div>

      {error && <p className="text-sm text-destructive mb-4 text-center">{error}</p>}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <div
            key={card.label}
            className="p-5 rounded-xl border border-border/50 bg-card/50 text-center transition-all duration-500 ease-out"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(20px)",
              transitionDelay: `${150 + i * 80}ms`,
            }}
          >
            <div className={`w-10 h-10 rounded-lg ${card.bg} flex items-center justify-center mx-auto mb-3`}>
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
