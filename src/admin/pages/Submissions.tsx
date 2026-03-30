import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/shared/hooks/useAuth";
import type { Submission, Profile, Module } from "@/shared/types/database";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ExternalLink, Check, Clock, MessageSquare } from "lucide-react";

type SubmissionFilter = "all" | "pending" | "reviewed";

interface SubmissionWithDetails extends Submission {
  profiles?: Pick<Profile, "full_name" | "discord"> | null;
  modules?: Pick<Module, "day_number" | "title"> | null;
}

export default function AdminSubmissions() {
  const { user } = useAuth();
  useEffect(() => { document.title = "Submissions | Admin Portal"; }, []);

  const [submissions, setSubmissions] = useState<SubmissionWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<SubmissionFilter>("pending");
  const [feedbackFor, setFeedbackFor] = useState<string | null>(null);
  const [feedbackText, setFeedbackText] = useState("");

  const fetchSubmissions = async () => {
    let query = supabase
      .from("submissions")
      .select("*, profiles(full_name, discord), modules(day_number, title)")
      .order("submitted_at", { ascending: false });

    if (filter !== "all") {
      query = query.eq("status", filter);
    }

    const { data, error: fetchErr } = await query;
    if (fetchErr) {
      setError("Failed to load submissions.");
      console.error("Submissions fetch error:", fetchErr);
    }
    setSubmissions((data as SubmissionWithDetails[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchSubmissions(); }, [filter]);

  const submitFeedback = async (submissionId: string) => {
    setError("");
    const { error: updateErr } = await supabase.from("submissions").update({
      feedback: feedbackText,
      status: "reviewed",
      reviewed_by: user?.id,
      reviewed_at: new Date().toISOString(),
    }).eq("id", submissionId);

    if (updateErr) {
      setError("Failed to save feedback: " + updateErr.message);
      return;
    }

    setFeedbackFor(null);
    setFeedbackText("");
    fetchSubmissions();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-semibold">Submissions</h1>
        <div className="flex gap-1 p-1 rounded-lg bg-muted/50">
          {(["pending", "reviewed", "all"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${filter === f ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="text-sm text-destructive mb-4">{error}</p>}

      <div className="space-y-3">
        {loading ? (
          <p className="text-muted-foreground text-center py-8">Loading...</p>
        ) : submissions.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No submissions found</p>
        ) : (
          submissions.map((sub) => (
            <div key={sub.id} className="p-4 rounded-xl border border-border/50 bg-card/30">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{sub.profiles?.full_name ?? "Unknown Student"}</span>
                    {sub.profiles?.discord && <span className="text-xs text-muted-foreground">@{sub.profiles.discord}</span>}
                  </div>
                  <p className="text-sm text-muted-foreground">Day {sub.modules?.day_number}: {sub.modules?.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Submitted {new Date(sub.submitted_at).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${sub.status === "pending" ? "bg-amber-500/10 text-amber-500" : "bg-emerald-500/10 text-emerald-500"}`}>
                    {sub.status === "pending" ? <Clock className="w-3 h-3" /> : <Check className="w-3 h-3" />}
                    {sub.status}
                  </span>
                  <a href={sub.file_url} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg hover:bg-muted/50 transition-colors">
                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                  </a>
                </div>
              </div>
              {sub.feedback && (
                <div className="mt-3 p-3 rounded-lg bg-primary/5 border border-primary/10">
                  <p className="text-xs font-medium text-primary mb-1">Feedback</p>
                  <p className="text-sm">{sub.feedback}</p>
                </div>
              )}
              {feedbackFor === sub.id ? (
                <div className="mt-3 space-y-2">
                  <Textarea value={feedbackText} onChange={(e) => setFeedbackText(e.target.value)} placeholder="Write your feedback..." rows={3} />
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setFeedbackFor(null)}>Cancel</Button>
                    <Button size="sm" onClick={() => submitFeedback(sub.id)}>Submit Feedback</Button>
                  </div>
                </div>
              ) : (
                <Button variant="ghost" size="sm" className="mt-2 text-primary" onClick={() => { setFeedbackFor(sub.id); setFeedbackText(sub.feedback || ""); }}>
                  <MessageSquare className="w-3 h-3 mr-1" />{sub.feedback ? "Edit Feedback" : "Add Feedback"}
                </Button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
