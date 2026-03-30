import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/shared/hooks/useAuth";
import type { Enrollment, Module, Cohort } from "@/shared/types/database";
import { BookOpen, Lock, ArrowRight } from "lucide-react";

export default function PortalDashboard() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { document.title = "Dashboard — Student Portal"; }, []);
  const [enrollment, setEnrollment] = useState<(Enrollment & { cohorts: Cohort }) | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [completedCount, setCompletedCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const { data: enrollments, error: enrollErr } = await supabase
          .from("enrollments")
          .select("*, cohorts(*)")
          .eq("user_id", user.id)
          .eq("payment_status", "paid")
          .limit(1);

        if (enrollErr) {
          console.error("Enrollment fetch error:", enrollErr);
          setError("Failed to load enrollment.");
          setLoading(false);
          return;
        }

        const enroll = enrollments?.[0] as (Enrollment & { cohorts: Cohort }) | undefined;
        setEnrollment(enroll ?? null);

        if (enroll) {
          const [{ data: mods, error: modErr }, { count, error: countErr }] = await Promise.all([
            supabase.from("modules").select("*").eq("cohort_id", enroll.cohort_id).order("day_number"),
            supabase.from("submissions").select("id", { count: "exact", head: true }).eq("user_id", user.id),
          ]);

          if (modErr) console.error("Modules fetch error:", modErr);
          if (countErr) console.error("Submissions count error:", countErr);

          setModules(mods ?? []);
          setCompletedCount(count ?? 0);
        }
      } catch (err) {
        console.error("Dashboard error:", err);
        setError("Failed to load dashboard.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) return <p className="text-muted-foreground py-8">Loading...</p>;
  if (error) return <p className="text-destructive py-8">{error}</p>;

  if (!enrollment) {
    return (
      <div className="text-center py-16">
        <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h1 className="font-heading text-2xl font-semibold mb-2">No Active Enrollment</h1>
        <p className="text-muted-foreground mb-6">You don't have an active programme enrollment yet.</p>
      </div>
    );
  }

  const today = new Date().toISOString().split("T")[0];
  const unlockedModules = modules.filter((m) => m.unlock_date <= today && !m.is_rest_day);
  const nextModule = modules.find((m) => m.unlock_date > today && !m.is_rest_day);
  const totalDays = modules.filter((m) => !m.is_rest_day).length;
  const progress = totalDays > 0 ? Math.round((completedCount / totalDays) * 100) : 0;

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold mb-1">
        Welcome back{profile?.full_name ? `, ${profile.full_name.split(" ")[0]}` : ""}
      </h1>
      <p className="text-muted-foreground text-sm mb-8">{enrollment.cohorts?.name}</p>

      <div className="p-6 rounded-xl border border-border/50 bg-card/30 mb-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium">Programme Progress</span>
          <span className="text-sm text-muted-foreground">{progress}%</span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex justify-between mt-2 text-xs text-muted-foreground">
          <span>{completedCount} worksheets submitted</span>
          <span>{unlockedModules.length} of {totalDays} days unlocked</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {unlockedModules.length > 0 && (
          <button onClick={() => navigate(`/modules/${unlockedModules[unlockedModules.length - 1].id}`)} className="p-5 rounded-xl border border-primary/20 bg-primary/5 text-left hover:bg-primary/10 transition-colors group">
            <BookOpen className="w-5 h-5 text-primary mb-3" />
            <p className="font-medium text-sm mb-1">Continue Learning</p>
            <p className="text-xs text-muted-foreground">Day {unlockedModules[unlockedModules.length - 1].day_number}: {unlockedModules[unlockedModules.length - 1].title}</p>
            <ArrowRight className="w-4 h-4 text-primary mt-2 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
        {nextModule && (
          <div className="p-5 rounded-xl border border-border/50 bg-card/30">
            <Lock className="w-5 h-5 text-muted-foreground mb-3" />
            <p className="font-medium text-sm mb-1">Next Unlock</p>
            <p className="text-xs text-muted-foreground">Day {nextModule.day_number}: {nextModule.title}</p>
            <p className="text-xs text-primary mt-2">{new Date(nextModule.unlock_date).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })}</p>
          </div>
        )}
      </div>
    </div>
  );
}
