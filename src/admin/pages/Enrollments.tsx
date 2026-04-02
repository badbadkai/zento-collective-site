import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, X, Trash2, Pencil, Mail, UserCheck } from "lucide-react";
import type { Enrollment, Profile, Cohort, PaymentStatus } from "@/shared/types/database";

type EnrollmentFilter = "all" | "paid" | "pending" | "refunded";

interface EnrollmentWithDetails extends Enrollment {
  profiles?: Pick<Profile, "full_name" | "discord"> | null;
  cohorts?: Pick<Cohort, "name"> | null;
}

export default function Enrollments() {
  const [enrollments, setEnrollments] = useState<EnrollmentWithDetails[]>([]);
  const [cohorts, setCohorts] = useState<Cohort[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState<EnrollmentFilter>("all");
  const [showForm, setShowForm] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [editingStatusId, setEditingStatusId] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const [form, setForm] = useState({
    email: "",
    cohort_id: "",
    payment_status: "paid" as PaymentStatus,
  });

  useEffect(() => { document.title = "Enrollments | Admin Portal"; }, []);
  useEffect(() => { setTimeout(() => setVisible(true), 50); }, []);

  const fetchEnrollments = async () => {
    setError("");
    let query = supabase
      .from("enrollments")
      .select("*, profiles(full_name, discord), cohorts(name)")
      .order("enrolled_at", { ascending: false });

    if (filter !== "all") query = query.eq("payment_status", filter);

    const { data, error: fetchErr } = await query;
    if (fetchErr) { setError("Failed to load enrollments."); console.error(fetchErr); }
    setEnrollments((data as EnrollmentWithDetails[]) ?? []);
    setLoading(false);
  };

  const fetchCohorts = async () => {
    const { data } = await supabase.from("cohorts").select("*").order("start_date", { ascending: false });
    setCohorts(data ?? []);
  };

  useEffect(() => { fetchEnrollments(); }, [filter]);
  useEffect(() => { fetchCohorts(); }, []);

  const resetForm = () => {
    setForm({ email: "", cohort_id: "", payment_status: "paid" });
    setShowForm(false);
    setError("");
  };

  const handleCreate = async () => {
    setError("");
    const email = form.email.toLowerCase().trim();

    if (!email || !form.cohort_id) {
      setError("Please enter a student email and select a cohort.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // user_id gets linked on first login
    const { error: insertErr } = await supabase.from("enrollments").insert({
      email,
      user_id: null,
      cohort_id: form.cohort_id,
      payment_status: form.payment_status,
    });

    if (insertErr) {
      if (insertErr.message.includes("duplicate") || insertErr.message.includes("unique")) {
        setError("This email is already enrolled in that cohort.");
      } else {
        setError("Failed to create enrollment: " + insertErr.message);
      }
      return;
    }

    resetForm();
    fetchEnrollments();
  };

  const handleUpdatePaymentStatus = async (id: string, status: PaymentStatus) => {
    const { error: updateErr } = await supabase.from("enrollments").update({ payment_status: status }).eq("id", id);
    if (updateErr) { setError("Failed to update: " + updateErr.message); return; }
    setEditingStatusId(null);
    fetchEnrollments();
  };

  const handleDelete = async (id: string) => {
    const { error: deleteErr } = await supabase.from("enrollments").delete().eq("id", id);
    if (deleteErr) { setError("Failed to delete: " + deleteErr.message); }
    setConfirmDeleteId(null);
    fetchEnrollments();
  };

  const statusColor = (s: PaymentStatus) => {
    switch (s) {
      case "paid": return "bg-emerald-500/10 text-emerald-500";
      case "pending": return "bg-amber-500/10 text-amber-500";
      case "refunded": return "bg-red-500/10 text-red-500";
      default: return "";
    }
  };

  return (
    <div
      className="transition-all duration-700 ease-out"
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
    >
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-semibold">Enrollments</h1>
        <div className="flex items-center gap-3">
          <div className="flex gap-1 p-1 rounded-lg bg-muted/50">
            {(["all", "paid", "pending", "refunded"] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${filter === f ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
          <Button variant="default" size="sm" onClick={() => { resetForm(); setShowForm(true); }}>
            <Plus className="w-4 h-4 mr-2" />Enrol Student
          </Button>
        </div>
      </div>

      {error && <p className="text-sm text-destructive mb-4">{error}</p>}

      {showForm && (
        <div className="mb-6 p-6 rounded-xl border border-border/50 bg-card/50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Enrol a Student</h2>
            <Button variant="ghost" size="icon" onClick={resetForm}><X className="w-4 h-4" /></Button>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Enter the student's email. They will be able to log in to the student portal once enrolled.
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Student Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="student@email.com"
                  className="pl-10"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Cohort</Label>
              <select value={form.cohort_id} onChange={(e) => setForm({ ...form, cohort_id: e.target.value })} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="">Select a cohort...</option>
                {cohorts.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <Label>Payment Status</Label>
              <select value={form.payment_status} onChange={(e) => setForm({ ...form, payment_status: e.target.value as PaymentStatus })} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="ghost" onClick={resetForm}>Cancel</Button>
            <Button onClick={handleCreate}>Enrol</Button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {loading ? (
          <p className="text-muted-foreground py-8 text-center">Loading...</p>
        ) : enrollments.length === 0 ? (
          <p className="text-muted-foreground py-8 text-center">No enrollments found</p>
        ) : (
          enrollments.map((enrollment) => (
            <div key={enrollment.id} className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-card/30 hover:bg-card/50 transition-colors">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  {enrollment.user_id ? (
                    <>
                      <UserCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="font-medium">{enrollment.profiles?.full_name || enrollment.email}</span>
                      {enrollment.profiles?.full_name && enrollment.email && (
                        <span className="text-xs text-muted-foreground">{enrollment.email}</span>
                      )}
                    </>
                  ) : (
                    <>
                      <Mail className="w-3.5 h-3.5 text-amber-500" />
                      <span className="font-medium">{enrollment.email}</span>
                      <span className="text-xs text-muted-foreground bg-amber-500/10 text-amber-500 px-1.5 py-0.5 rounded">Pending Login</span>
                    </>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{enrollment.cohorts?.name ?? "Unknown Cohort"}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Enrolled {new Date(enrollment.enrolled_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {editingStatusId === enrollment.id ? (
                  <select value={enrollment.payment_status} onChange={(e) => handleUpdatePaymentStatus(enrollment.id, e.target.value as PaymentStatus)} onBlur={() => setEditingStatusId(null)} autoFocus className="h-8 rounded-md border border-input bg-background px-2 text-xs">
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="refunded">Refunded</option>
                  </select>
                ) : (
                  <button onClick={() => setEditingStatusId(enrollment.id)} className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer hover:opacity-80 ${statusColor(enrollment.payment_status)}`}>
                    {enrollment.payment_status}<Pencil className="w-2.5 h-2.5 ml-0.5" />
                  </button>
                )}
                {confirmDeleteId === enrollment.id ? (
                  <div className="flex items-center gap-1">
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(enrollment.id)}>Confirm</Button>
                    <Button variant="ghost" size="sm" onClick={() => setConfirmDeleteId(null)}>Cancel</Button>
                  </div>
                ) : (
                  <Button variant="ghost" size="icon" onClick={() => setConfirmDeleteId(enrollment.id)}>
                    <Trash2 className="w-4 h-4 text-muted-foreground" />
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
