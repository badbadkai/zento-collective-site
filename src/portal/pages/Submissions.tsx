import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/shared/hooks/useAuth";
import type { Submission, Module } from "@/shared/types/database";
import { Check, Clock, ExternalLink } from "lucide-react";

interface SubWithModule extends Submission {
  modules?: Pick<Module, "day_number" | "title"> | null;
}

export default function PortalSubmissions() {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState<SubWithModule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => { document.title = "Submissions | Student Portal"; }, []);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const { data, error: fetchErr } = await supabase
        .from("submissions")
        .select("*, modules(day_number, title)")
        .eq("user_id", user.id)
        .order("submitted_at", { ascending: false });

      if (fetchErr) {
        console.error("Submissions fetch error:", fetchErr);
        setError("Failed to load submissions.");
      }
      setSubmissions((data as SubWithModule[]) ?? []);
      setLoading(false);
    };

    fetchData();
  }, [user]);

  if (loading) return <p className="text-muted-foreground py-8">Loading...</p>;
  if (error) return <p className="text-destructive py-8">{error}</p>;

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold mb-6">My Submissions</h1>
      {submissions.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">No submissions yet. Complete a worksheet and upload it from the module page.</p>
      ) : (
        <div className="space-y-3">
          {submissions.map((sub) => (
            <div key={sub.id} className="p-4 rounded-xl border border-border/50 bg-card/30">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-medium text-sm">Day {sub.modules?.day_number}: {sub.modules?.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Submitted {new Date(sub.submitted_at).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${sub.status === "pending" ? "bg-amber-500/10 text-amber-500" : "bg-emerald-500/10 text-emerald-500"}`}>
                    {sub.status === "pending" ? <Clock className="w-3 h-3" /> : <Check className="w-3 h-3" />}
                    {sub.status === "pending" ? "Pending" : "Reviewed"}
                  </span>
                  <a href={sub.file_url} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors">
                    <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
                  </a>
                </div>
              </div>
              {sub.feedback && (
                <div className="mt-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                  <p className="text-xs font-medium text-primary mb-1">Mentor Feedback</p>
                  <p className="text-sm">{sub.feedback}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
