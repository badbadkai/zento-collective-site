import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { Cohort } from "@/shared/types/database";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Pencil, X } from "lucide-react";

export default function AdminCohorts() {
  const [cohorts, setCohorts] = useState<Cohort[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Cohort | null>(null);
  const [form, setForm] = useState({
    name: "",
    start_date: "",
    end_date: "",
    max_seats: 15,
    status: "upcoming" as Cohort["status"],
  });

  const fetchCohorts = async () => {
    const { data, error: fetchError } = await supabase
      .from("cohorts")
      .select("*")
      .order("start_date", { ascending: false });

    if (fetchError) {
      setError("Failed to load cohorts.");
      console.error("Cohorts fetch error:", fetchError);
    }
    setCohorts(data ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchCohorts(); }, []);

  const resetForm = () => {
    setForm({ name: "", start_date: "", end_date: "", max_seats: 15, status: "upcoming" });
    setEditing(null);
    setShowForm(false);
    setError("");
  };

  const handleSave = async () => {
    setError("");
    if (editing) {
      const { error: updateError } = await supabase.from("cohorts").update(form).eq("id", editing.id);
      if (updateError) {
        setError("Failed to update cohort: " + updateError.message);
        return;
      }
    } else {
      const { error: insertError } = await supabase.from("cohorts").insert(form);
      if (insertError) {
        setError("Failed to create cohort: " + insertError.message);
        return;
      }
    }
    resetForm();
    fetchCohorts();
  };

  const startEdit = (cohort: Cohort) => {
    setForm({
      name: cohort.name,
      start_date: cohort.start_date,
      end_date: cohort.end_date,
      max_seats: cohort.max_seats,
      status: cohort.status,
    });
    setEditing(cohort);
    setShowForm(true);
  };

  const statusColor = (s: string) => {
    switch (s) {
      case "active": return "bg-emerald-500/10 text-emerald-500";
      case "upcoming": return "bg-amber-500/10 text-amber-500";
      case "completed": return "bg-muted text-muted-foreground";
      default: return "";
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-semibold">Cohorts</h1>
        <Button variant="default" size="sm" onClick={() => { resetForm(); setShowForm(true); }}>
          <Plus className="w-4 h-4 mr-2" />
          New Cohort
        </Button>
      </div>

      {error && <p className="text-sm text-destructive mb-4">{error}</p>}

      {showForm && (
        <div className="mb-6 p-6 rounded-xl border border-border/50 bg-card/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">{editing ? "Edit Cohort" : "New Cohort"}</h2>
            <Button variant="ghost" size="icon" onClick={resetForm}><X className="w-4 h-4" /></Button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-2">
              <Label>Cohort Name</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Cohort 1 — March 2026" />
            </div>
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input type="date" value={form.start_date} onChange={(e) => setForm({ ...form, start_date: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>End Date</Label>
              <Input type="date" value={form.end_date} onChange={(e) => setForm({ ...form, end_date: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Max Seats</Label>
              <Input type="number" value={form.max_seats} onChange={(e) => setForm({ ...form, max_seats: parseInt(e.target.value) || 15 })} />
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Cohort["status"] })} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="upcoming">Upcoming</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="ghost" onClick={resetForm}>Cancel</Button>
            <Button onClick={handleSave}>{editing ? "Update" : "Create"}</Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {loading ? (
          <p className="text-muted-foreground py-8 text-center">Loading...</p>
        ) : cohorts.length === 0 ? (
          <p className="text-muted-foreground py-8 text-center">No cohorts yet</p>
        ) : (
          cohorts.map((cohort) => (
            <div key={cohort.id} className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-card/30 hover:bg-card/50 transition-colors">
              <div>
                <h3 className="font-medium">{cohort.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(cohort.start_date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                  {" — "}
                  {new Date(cohort.end_date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  {" · "}{cohort.max_seats} seats
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor(cohort.status)}`}>{cohort.status}</span>
                <Button variant="ghost" size="icon" onClick={() => startEdit(cohort)}><Pencil className="w-4 h-4" /></Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
