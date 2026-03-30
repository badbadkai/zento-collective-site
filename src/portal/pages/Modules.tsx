import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/shared/hooks/useAuth";
import type { Module } from "@/shared/types/database";
import { Lock, Check, Coffee } from "lucide-react";

export default function PortalModules() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submittedModules, setSubmittedModules] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        const { data: enrollments, error: enrollErr } = await supabase
          .from("enrollments")
          .select("cohort_id")
          .eq("user_id", user.id)
          .eq("payment_status", "paid")
          .limit(1);

        if (enrollErr) { console.error(enrollErr); setError("Failed to load modules."); setLoading(false); return; }

        const cohortId = enrollments?.[0]?.cohort_id;
        if (!cohortId) { setLoading(false); return; }

        const [{ data: mods, error: modErr }, { data: subs, error: subErr }] = await Promise.all([
          supabase.from("modules").select("*").eq("cohort_id", cohortId).order("day_number"),
          supabase.from("submissions").select("module_id").eq("user_id", user.id),
        ]);

        if (modErr) console.error("Modules error:", modErr);
        if (subErr) console.error("Submissions error:", subErr);

        setModules(mods ?? []);
        setSubmittedModules(new Set((subs ?? []).map((s) => s.module_id)));
      } catch (err) {
        console.error(err);
        setError("Failed to load modules.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const today = new Date().toISOString().split("T")[0];

  if (loading) return <p className="text-muted-foreground py-8">Loading...</p>;
  if (error) return <p className="text-destructive py-8">{error}</p>;

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold mb-6">Modules</h1>
      <div className="space-y-2">
        {modules.map((mod) => {
          const isUnlocked = mod.unlock_date <= today;
          const isSubmitted = submittedModules.has(mod.id);
          return (
            <button
              key={mod.id}
              disabled={!isUnlocked}
              onClick={() => isUnlocked && navigate(`/modules/${mod.id}`)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${isUnlocked ? "border-border/50 bg-card/30 hover:bg-card/60 hover:border-primary/30 cursor-pointer" : "border-border/30 bg-muted/10 opacity-60 cursor-not-allowed"}`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 ${mod.is_rest_day ? "bg-muted text-muted-foreground" : isSubmitted ? "bg-emerald-500/10 text-emerald-500" : isUnlocked ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                {mod.is_rest_day ? <Coffee className="w-4 h-4" /> : isSubmitted ? <Check className="w-4 h-4" /> : isUnlocked ? mod.day_number : <Lock className="w-4 h-4" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Day {mod.day_number}</span>
                  {mod.is_rest_day && <span className="text-xs bg-muted px-1.5 py-0.5 rounded">Rest Day</span>}
                </div>
                <p className={`font-medium text-sm truncate ${!isUnlocked ? "text-muted-foreground" : ""}`}>{mod.title}</p>
              </div>
              {!isUnlocked && (
                <span className="text-xs text-muted-foreground shrink-0">
                  {new Date(mod.unlock_date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
