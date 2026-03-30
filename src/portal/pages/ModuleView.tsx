import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/shared/hooks/useAuth";
import type { Module, Material, Submission } from "@/shared/types/database";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, FileText, Video, BookOpen, FileSpreadsheet, Upload, Check, Clock } from "lucide-react";

const materialIcons: Record<string, typeof Video> = {
  video: Video, slides: BookOpen, handout: FileText, worksheet_template: FileSpreadsheet,
};

function getYouTubeEmbedUrl(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? `https://www.youtube-nocookie.com/embed/${match[1]}` : null;
}

export default function ModuleView() {
  const { moduleId } = useParams<{ moduleId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [module_, setModule] = useState<Module | null>(null);

  useEffect(() => { document.title = "Module | Student Portal"; }, []);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!moduleId || !user) return;

    const fetchData = async () => {
      try {
        const [{ data: mod, error: modErr }, { data: mats, error: matErr }, { data: subs, error: subErr }] = await Promise.all([
          supabase.from("modules").select("*").eq("id", moduleId).single(),
          supabase.from("materials").select("*").eq("module_id", moduleId).order("sort_order"),
          supabase.from("submissions").select("*").eq("module_id", moduleId).eq("user_id", user.id).limit(1),
        ]);

        if (modErr) console.error("Module fetch error:", modErr);
        if (matErr) console.error("Materials fetch error:", matErr);
        if (subErr) console.error("Submissions fetch error:", subErr);

        setModule(mod);
        setMaterials(mats ?? []);
        setSubmission(subs?.[0] ?? null);
      } catch (err) {
        console.error("ModuleView error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [moduleId, user]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user || !moduleId) return;

    setUploading(true);
    setUploadError("");

    try {
      const ext = file.name.split(".").pop();
      const path = `submissions/${user.id}/${moduleId}.${ext}`;

      const { error: storageErr } = await supabase.storage.from("worksheets").upload(path, file, { upsert: true });
      if (storageErr) {
        setUploadError("Upload failed: " + storageErr.message);
        setUploading(false);
        return;
      }

      const { data: urlData } = supabase.storage.from("worksheets").getPublicUrl(path);

      if (submission) {
        const { error: updateErr } = await supabase.from("submissions").update({
          file_url: urlData.publicUrl,
          status: "pending",
        }).eq("id", submission.id);
        if (updateErr) { setUploadError("Failed to update submission."); setUploading(false); return; }
      } else {
        const { error: insertErr } = await supabase.from("submissions").insert({
          user_id: user.id,
          module_id: moduleId,
          file_url: urlData.publicUrl,
          status: "pending",
        });
        if (insertErr) { setUploadError("Failed to save submission."); setUploading(false); return; }
      }

      // Refresh submission
      const { data: subs } = await supabase.from("submissions").select("*").eq("module_id", moduleId).eq("user_id", user.id).limit(1);
      setSubmission(subs?.[0] ?? null);
    } catch (err) {
      setUploadError("Something went wrong during upload.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <p className="text-muted-foreground py-8">Loading...</p>;
  if (!module_) return <p className="text-muted-foreground py-8">Module not found.</p>;

  const videoMaterial = materials.find((m) => m.type === "video");
  const otherMaterials = materials.filter((m) => m.type !== "video");
  const embedUrl = videoMaterial ? getYouTubeEmbedUrl(videoMaterial.url) : null;

  return (
    <div>
      <button onClick={() => navigate("/modules")} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" />Back to Modules
      </button>

      <div className="mb-8">
        <span className="text-xs text-primary font-medium uppercase tracking-wider">Day {module_.day_number}</span>
        <h1 className="font-heading text-2xl font-semibold mt-1">{module_.title}</h1>
        {module_.description && <p className="text-muted-foreground text-sm mt-2">{module_.description}</p>}
      </div>

      {embedUrl && (
        <div className="mb-8">
          <div className="aspect-video rounded-xl overflow-hidden border border-border/50 bg-black">
            <iframe src={embedUrl} title={videoMaterial?.title} className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </div>
        </div>
      )}

      {otherMaterials.length > 0 && (
        <div className="mb-8">
          <h2 className="font-medium text-sm mb-3">Materials</h2>
          <div className="space-y-2">
            {otherMaterials.map((mat) => {
              const Icon = materialIcons[mat.type] || FileText;
              return (
                <a key={mat.id} href={mat.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 rounded-lg border border-border/50 bg-card/30 hover:bg-card/60 transition-colors">
                  <Icon className="w-4 h-4 text-primary" /><span className="text-sm flex-1">{mat.title}</span><Download className="w-4 h-4 text-muted-foreground" />
                </a>
              );
            })}
          </div>
        </div>
      )}

      <div className="p-5 rounded-xl border border-border/50 bg-card/30">
        <h2 className="font-medium text-sm mb-3">Worksheet Submission</h2>
        {uploadError && <p className="text-sm text-destructive mb-3">{uploadError}</p>}
        {submission ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${submission.status === "pending" ? "bg-amber-500/10 text-amber-500" : "bg-emerald-500/10 text-emerald-500"}`}>
                {submission.status === "pending" ? <Clock className="w-3 h-3" /> : <Check className="w-3 h-3" />}
                {submission.status === "pending" ? "Awaiting Review" : "Reviewed"}
              </span>
              <span className="text-xs text-muted-foreground">
                Submitted {new Date(submission.submitted_at).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
            {submission.feedback && (
              <div className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                <p className="text-xs font-medium text-primary mb-1">Mentor Feedback</p>
                <p className="text-sm">{submission.feedback}</p>
              </div>
            )}
            <label className="inline-flex items-center gap-2 text-sm text-primary cursor-pointer hover:underline">
              <Upload className="w-4 h-4" />Re-upload worksheet
              <input type="file" accept=".docx,.pdf,.doc" className="hidden" onChange={handleFileUpload} disabled={uploading} />
            </label>
          </div>
        ) : (
          <div>
            <p className="text-sm text-muted-foreground mb-3">Upload your completed worksheet for mentor review.</p>
            <label>
              <Button variant="default" size="sm" className="cursor-pointer" disabled={uploading} asChild>
                <span><Upload className="w-4 h-4 mr-2" />{uploading ? "Uploading..." : "Upload Worksheet"}</span>
              </Button>
              <input type="file" accept=".docx,.pdf,.doc" className="hidden" onChange={handleFileUpload} disabled={uploading} />
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
