import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Cohort, Module, Material, MaterialType } from "@/shared/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X, ChevronRight, Video, FileText, BookOpen, FileSpreadsheet } from "lucide-react";

const materialIcons: Record<MaterialType, typeof Video> = {
  video: Video,
  slides: BookOpen,
  handout: FileText,
  worksheet_template: FileSpreadsheet,
};

export default function AdminModules() {
  const [cohorts, setCohorts] = useState<Cohort[]>([]);
  const [selectedCohort, setSelectedCohort] = useState("");
  const [modules, setModules] = useState<Module[]>([]);
  const [materials, setMaterials] = useState<Record<string, Material[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedModule, setExpandedModule] = useState<string | null>(null);
  const [showModuleForm, setShowModuleForm] = useState(false);
  const [showMaterialForm, setShowMaterialForm] = useState<string | null>(null);

  const [moduleForm, setModuleForm] = useState({
    day_number: 1, title: "", description: "", unlock_date: "", is_rest_day: false,
  });
  const [materialForm, setMaterialForm] = useState({
    type: "video" as MaterialType, title: "", url: "", sort_order: 0,
  });

  useEffect(() => {
    supabase.from("cohorts").select("*").order("start_date", { ascending: false }).then(({ data, error: err }) => {
      if (err) { setError("Failed to load cohorts."); console.error(err); }
      setCohorts(data ?? []);
      if (data?.[0]) setSelectedCohort(data[0].id);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!selectedCohort) return;
    supabase.from("modules").select("*").eq("cohort_id", selectedCohort).order("day_number").then(({ data, error: err }) => {
      if (err) { console.error("Modules fetch error:", err); }
      setModules(data ?? []);
    });
  }, [selectedCohort]);

  const fetchMaterials = async (moduleId: string) => {
    const { data, error: err } = await supabase.from("materials").select("*").eq("module_id", moduleId).order("sort_order");
    if (err) console.error("Materials fetch error:", err);
    setMaterials((prev) => ({ ...prev, [moduleId]: data ?? [] }));
  };

  const toggleModule = (id: string) => {
    if (expandedModule === id) {
      setExpandedModule(null);
    } else {
      setExpandedModule(id);
      if (!materials[id]) fetchMaterials(id);
    }
  };

  const handleAddModule = async () => {
    setError("");
    const { error: insertErr } = await supabase.from("modules").insert({ ...moduleForm, cohort_id: selectedCohort });
    if (insertErr) {
      setError("Failed to add module: " + insertErr.message);
      return;
    }
    setShowModuleForm(false);
    setModuleForm({ day_number: modules.length + 2, title: "", description: "", unlock_date: "", is_rest_day: false });
    const { data } = await supabase.from("modules").select("*").eq("cohort_id", selectedCohort).order("day_number");
    setModules(data ?? []);
  };

  const handleAddMaterial = async (moduleId: string) => {
    setError("");
    const { error: insertErr } = await supabase.from("materials").insert({ ...materialForm, module_id: moduleId });
    if (insertErr) {
      setError("Failed to add material: " + insertErr.message);
      return;
    }
    setShowMaterialForm(null);
    setMaterialForm({ type: "video", title: "", url: "", sort_order: 0 });
    fetchMaterials(moduleId);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-semibold">Modules</h1>
        <div className="flex items-center gap-3">
          <select value={selectedCohort} onChange={(e) => setSelectedCohort(e.target.value)} className="h-9 rounded-md border border-input bg-background px-3 text-sm">
            {cohorts.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
          </select>
          <Button size="sm" onClick={() => setShowModuleForm(true)} disabled={!selectedCohort}>
            <Plus className="w-4 h-4 mr-2" />Add Day
          </Button>
        </div>
      </div>

      {error && <p className="text-sm text-destructive mb-4">{error}</p>}

      {showModuleForm && (
        <div className="mb-6 p-5 rounded-xl border border-border/50 bg-card/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Add Module</h2>
            <Button variant="ghost" size="icon" onClick={() => setShowModuleForm(false)}><X className="w-4 h-4" /></Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2"><Label>Day Number</Label><Input type="number" value={moduleForm.day_number} onChange={(e) => setModuleForm({ ...moduleForm, day_number: parseInt(e.target.value) || 1 })} /></div>
            <div className="space-y-2"><Label>Unlock Date</Label><Input type="date" value={moduleForm.unlock_date} onChange={(e) => setModuleForm({ ...moduleForm, unlock_date: e.target.value })} /></div>
            <div className="col-span-2 space-y-2"><Label>Title</Label><Input value={moduleForm.title} onChange={(e) => setModuleForm({ ...moduleForm, title: e.target.value })} placeholder="e.g. Introduction to Market Structure" /></div>
            <div className="col-span-2 space-y-2"><Label>Description</Label><Textarea value={moduleForm.description} onChange={(e) => setModuleForm({ ...moduleForm, description: e.target.value })} rows={2} /></div>
            <label className="flex items-center gap-2"><input type="checkbox" checked={moduleForm.is_rest_day} onChange={(e) => setModuleForm({ ...moduleForm, is_rest_day: e.target.checked })} className="w-4 h-4 rounded" /><span className="text-sm">Rest Day</span></label>
          </div>
          <div className="flex justify-end mt-4"><Button onClick={handleAddModule}>Add Module</Button></div>
        </div>
      )}

      <div className="space-y-2">
        {loading ? (
          <p className="text-muted-foreground text-center py-8">Loading...</p>
        ) : modules.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">{selectedCohort ? "No modules yet." : "Select a cohort first."}</p>
        ) : (
          modules.map((mod) => (
            <div key={mod.id} className="border border-border/50 rounded-xl overflow-hidden">
              <button className="w-full flex items-center justify-between p-4 hover:bg-muted/20 transition-colors text-left" onClick={() => toggleModule(mod.id)}>
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">{mod.day_number}</span>
                  <div>
                    <p className="font-medium">{mod.title}</p>
                    <p className="text-xs text-muted-foreground">Unlocks {new Date(mod.unlock_date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}{mod.is_rest_day && " · Rest Day"}</p>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${expandedModule === mod.id ? "rotate-90" : ""}`} />
              </button>
              {expandedModule === mod.id && (
                <div className="border-t border-border/30 p-4 bg-muted/10">
                  {mod.description && <p className="text-sm text-muted-foreground mb-4">{mod.description}</p>}
                  <div className="space-y-2 mb-4">
                    {(materials[mod.id] ?? []).map((mat) => {
                      const Icon = materialIcons[mat.type] || FileText;
                      return (
                        <div key={mat.id} className="flex items-center gap-3 p-2 rounded-lg bg-background/50">
                          <Icon className="w-4 h-4 text-primary" /><span className="text-sm flex-1">{mat.title}</span>
                          <span className="text-xs text-muted-foreground px-2 py-0.5 rounded bg-muted">{mat.type}</span>
                        </div>
                      );
                    })}
                  </div>
                  {showMaterialForm === mod.id ? (
                    <div className="p-4 rounded-lg border border-border/30 bg-background/50">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1"><Label className="text-xs">Type</Label>
                          <select value={materialForm.type} onChange={(e) => setMaterialForm({ ...materialForm, type: e.target.value as MaterialType })} className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm">
                            <option value="video">Video (YouTube)</option><option value="slides">Slides</option><option value="handout">Handout</option><option value="worksheet_template">Worksheet Template</option>
                          </select>
                        </div>
                        <div className="space-y-1"><Label className="text-xs">Sort Order</Label><Input type="number" value={materialForm.sort_order} onChange={(e) => setMaterialForm({ ...materialForm, sort_order: parseInt(e.target.value) || 0 })} /></div>
                        <div className="col-span-2 space-y-1"><Label className="text-xs">Title</Label><Input value={materialForm.title} onChange={(e) => setMaterialForm({ ...materialForm, title: e.target.value })} placeholder="e.g. Lecture Video" /></div>
                        <div className="col-span-2 space-y-1"><Label className="text-xs">URL</Label><Input value={materialForm.url} onChange={(e) => setMaterialForm({ ...materialForm, url: e.target.value })} placeholder="YouTube URL or file URL" /></div>
                      </div>
                      <div className="flex justify-end gap-2 mt-3">
                        <Button variant="ghost" size="sm" onClick={() => setShowMaterialForm(null)}>Cancel</Button>
                        <Button size="sm" onClick={() => handleAddMaterial(mod.id)}>Add</Button>
                      </div>
                    </div>
                  ) : (
                    <Button variant="ghost" size="sm" className="text-primary" onClick={() => setShowMaterialForm(mod.id)}>
                      <Plus className="w-3 h-3 mr-1" />Add Material
                    </Button>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
