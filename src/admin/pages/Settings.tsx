import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/shared/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Loader2, Shield, User, Mail } from "lucide-react";

export default function AdminSettings() {
  const { user, profile } = useAuth();
  const [fullName, setFullName] = useState(profile?.full_name ?? "");
  const [discord, setDiscord] = useState(profile?.discord ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => { document.title = "Settings — Admin Portal"; }, []);
  useEffect(() => { setTimeout(() => setVisible(true), 50); }, []);

  // Sync state if profile loads after mount
  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name ?? "");
      setDiscord(profile.discord ?? "");
    }
  }, [profile]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    setError("");

    const { error: updateErr } = await supabase.from("profiles").update({
      full_name: fullName,
      discord,
    }).eq("id", user.id);

    if (updateErr) {
      setError("Failed to save: " + updateErr.message);
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
    setSaving(false);
  };

  return (
    <div
      className="max-w-2xl mx-auto transition-all duration-700 ease-out"
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
    >
      <h1 className="font-heading text-2xl font-semibold mb-8">Account Settings</h1>

      {/* Profile section */}
      <div className="rounded-xl border border-border/50 bg-card/30 p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h2 className="font-medium">Profile</h2>
            <p className="text-xs text-muted-foreground">Your personal details</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Your full name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="discord">Discord Username</Label>
            <Input
              id="discord"
              value={discord}
              onChange={(e) => setDiscord(e.target.value)}
              placeholder="Your username"
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button onClick={handleSave} disabled={saving}>
            {saving ? (
              <><Loader2 className="w-4 h-4 animate-spin mr-2" />Saving...</>
            ) : saved ? (
              <><Check className="w-4 h-4 mr-2" />Saved</>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </div>

      {/* Account info (read-only) */}
      <div className="rounded-xl border border-border/50 bg-card/30 p-6 mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Mail className="w-4 h-4 text-blue-500" />
          </div>
          <div>
            <h2 className="font-medium">Account</h2>
            <p className="text-xs text-muted-foreground">Your login credentials</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={user?.email ?? ""} disabled className="opacity-60" />
            <p className="text-xs text-muted-foreground">This is the email linked to your account and cannot be changed here.</p>
          </div>
        </div>
      </div>

      {/* Role info */}
      <div className="rounded-xl border border-border/50 bg-card/30 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center">
            <Shield className="w-4 h-4 text-emerald-500" />
          </div>
          <div>
            <h2 className="font-medium">Role &amp; Permissions</h2>
            <p className="text-xs text-muted-foreground">Your access level</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500 uppercase tracking-wider">
            {profile?.role ?? "—"}
          </span>
          <span className="text-sm text-muted-foreground">
            Full access to all admin features
          </span>
        </div>
      </div>
    </div>
  );
}
