import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/shared/hooks/useAuth";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Check, Loader2, User, Shield, Mail, Globe, Sun, Moon,
  Bell, AlertTriangle, LogOut, Monitor,
} from "lucide-react";
import type { NotificationPreferences } from "@/shared/types/database";

const TIMEZONES = [
  "Europe/London", "Europe/Paris", "Europe/Berlin", "Europe/Amsterdam",
  "America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles",
  "Asia/Tokyo", "Asia/Singapore", "Asia/Dubai", "Asia/Kolkata",
  "Australia/Sydney", "Pacific/Auckland",
];

const TRADING_STYLES = [
  "Scalping", "Day Trading", "Swing Trading", "Position Trading", "Not sure yet",
];

interface AccountSettingsProps {
  portalTitle: string;
}

export default function AccountSettings({ portalTitle }: AccountSettingsProps) {
  const { user, profile, signOut } = useAuth();
  const { theme, setTheme } = useTheme();

  // Profile fields
  const [fullName, setFullName] = useState("");
  const [discord, setDiscord] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [timezone, setTimezone] = useState("Europe/London");
  const [tradingStyle, setTradingStyle] = useState("");

  // Notification prefs
  const [notifPrefs, setNotifPrefs] = useState<NotificationPreferences>({
    feedback_received: true,
    module_unlocked: true,
    announcements: true,
  });

  // Email change
  const [newEmail, setNewEmail] = useState("");
  const [emailSaving, setEmailSaving] = useState(false);
  const [emailMsg, setEmailMsg] = useState("");

  // State
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);

  // Danger zone
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteText, setDeleteText] = useState("");
  const [deleting, setDeleting] = useState(false);

  // Sign out all
  const [signingOutAll, setSigningOutAll] = useState(false);
  const [signedOutAll, setSignedOutAll] = useState(false);

  useEffect(() => { document.title = `Settings | ${portalTitle}`; }, [portalTitle]);
  useEffect(() => { setTimeout(() => setVisible(true), 50); }, []);

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name ?? "");
      setDiscord(profile.discord ?? "");
      setPhone(profile.phone ?? "");
      setBio(profile.bio ?? "");
      setTimezone(profile.timezone ?? "Europe/London");
      setTradingStyle(profile.trading_style ?? "");
      if (profile.notification_preferences) {
        setNotifPrefs(profile.notification_preferences);
      }
    }
  }, [profile]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    setError("");

    const { error: updateErr } = await supabase.from("profiles").update({
      full_name: fullName,
      discord,
      phone: phone || null,
      bio: bio || null,
      timezone,
      trading_style: tradingStyle || null,
      notification_preferences: notifPrefs,
      updated_at: new Date().toISOString(),
    }).eq("id", user.id);

    if (updateErr) {
      setError("Failed to save: " + updateErr.message);
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
    setSaving(false);
  };

  const handleEmailChange = async () => {
    if (!newEmail.trim()) return;
    setEmailSaving(true);
    setEmailMsg("");

    const { error } = await supabase.auth.updateUser({ email: newEmail });
    if (error) {
      setEmailMsg("Failed: " + error.message);
    } else {
      setEmailMsg("Confirmation sent to both your old and new email. Check your inbox.");
      setNewEmail("");
    }
    setEmailSaving(false);
  };

  const handleSignOutAll = async () => {
    setSigningOutAll(true);
    await supabase.auth.signOut({ scope: "global" });
    setSignedOutAll(true);
    setTimeout(() => {
      window.location.href = "/login";
    }, 1500);
  };

  const handleDeleteAccount = async () => {
    if (deleteText !== "DELETE" || !user) return;
    setDeleting(true);

    // Delete profile first (cascades), then sign out
    await supabase.from("profiles").delete().eq("id", user.id);
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  const toggleNotif = (key: keyof NotificationPreferences) => {
    setNotifPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const isDark = theme === "dark";

  const SectionHeader = ({ icon: Icon, color, title, desc }: { icon: typeof User; color: string; title: string; desc: string }) => (
    <div className="flex items-center gap-3 mb-6">
      <div className={`w-9 h-9 rounded-lg ${color} flex items-center justify-center`}>
        <Icon className="w-4 h-4" />
      </div>
      <div>
        <h2 className="font-medium">{title}</h2>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
    </div>
  );

  return (
    <div
      className="max-w-2xl mx-auto transition-all duration-700 ease-out pb-12"
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
    >
      <h1 className="font-heading text-2xl font-semibold mb-8">Account Settings</h1>

      {/* ---- PROFILE ---- */}
      <section className="rounded-xl border border-border/50 bg-card/30 p-6 mb-5">
        <SectionHeader icon={User} color="bg-primary/10 text-primary" title="Profile" desc="Your personal details" />
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Your full name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="discord">Discord Username</Label>
            <Input id="discord" value={discord} onChange={(e) => setDiscord(e.target.value)} placeholder="Your username" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+44 7..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tradingStyle">Trading Style</Label>
            <select id="tradingStyle" value={tradingStyle} onChange={(e) => setTradingStyle(e.target.value)} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="">Select...</option>
              {TRADING_STYLES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="col-span-2 space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="A short description about yourself..." rows={3} />
          </div>
        </div>
      </section>

      {/* ---- ACCOUNT ---- */}
      <section className="rounded-xl border border-border/50 bg-card/30 p-6 mb-5">
        <SectionHeader icon={Mail} color="bg-blue-500/10 text-blue-500" title="Account" desc="Your login details" />
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Current Email</Label>
            <Input value={user?.email ?? ""} disabled className="opacity-60" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newEmail">Change Email</Label>
            <div className="flex gap-2">
              <Input id="newEmail" type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} placeholder="new@email.com" className="flex-1" />
              <Button variant="default" size="sm" onClick={handleEmailChange} disabled={emailSaving || !newEmail.trim()}>
                {emailSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Update"}
              </Button>
            </div>
            {emailMsg && <p className={`text-xs ${emailMsg.startsWith("Failed") ? "text-destructive" : "text-emerald-500"}`}>{emailMsg}</p>}
            <p className="text-xs text-muted-foreground">A confirmation will be sent to both your old and new email address.</p>
          </div>
        </div>
      </section>

      {/* ---- SECURITY ---- */}
      <section className="rounded-xl border border-border/50 bg-card/30 p-6 mb-5">
        <SectionHeader icon={Shield} color="bg-emerald-500/10 text-emerald-500" title="Security" desc="Manage access to your account" />
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Authentication</p>
              <p className="text-xs text-muted-foreground">Email OTP (one-time code)</p>
            </div>
            <span className="px-2 py-0.5 rounded-full text-xs bg-emerald-500/10 text-emerald-500">Active</span>
          </div>

          <div className="border-t border-border/50 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Sign Out All Devices</p>
                <p className="text-xs text-muted-foreground">End all active sessions including this one</p>
              </div>
              <Button variant="ghost" size="sm" onClick={handleSignOutAll} disabled={signingOutAll}>
                {signingOutAll ? (
                  signedOutAll ? <><Check className="w-4 h-4 mr-1" />Done</> : <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <><LogOut className="w-4 h-4 mr-1" />Sign Out All</>
                )}
              </Button>
            </div>
          </div>

          <div className="border-t border-border/50 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Role</p>
                <p className="text-xs text-muted-foreground">
                  {profile?.role === "admin" ? "Full access to admin features" : "Access to enrolled content"}
                </p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary uppercase tracking-wider">
                {profile?.role ?? "—"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ---- NOTIFICATIONS ---- */}
      <section className="rounded-xl border border-border/50 bg-card/30 p-6 mb-5">
        <SectionHeader icon={Bell} color="bg-amber-500/10 text-amber-500" title="Notifications" desc="Control what emails you receive" />
        <div className="space-y-4">
          {([
            { key: "feedback_received" as const, label: "Feedback Received", desc: "When a mentor reviews your worksheet" },
            { key: "module_unlocked" as const, label: "Module Unlocked", desc: "When a new day's content becomes available" },
            { key: "announcements" as const, label: "Announcements", desc: "Programme updates and important notices" },
          ]).map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">{label}</p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
              <button
                onClick={() => toggleNotif(key)}
                className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${notifPrefs[key] ? "bg-primary" : "bg-muted"}`}
              >
                <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${notifPrefs[key] ? "translate-x-5.5 left-0.5" : "left-0.5"}`}
                  style={{ transform: notifPrefs[key] ? "translateX(22px)" : "translateX(2px)" }}
                />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ---- PREFERENCES ---- */}
      <section className="rounded-xl border border-border/50 bg-card/30 p-6 mb-5">
        <SectionHeader icon={Monitor} color="bg-purple-500/10 text-purple-500" title="Preferences" desc="Customise your experience" />
        <div className="space-y-5">
          {/* Theme */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Appearance</p>
              <p className="text-xs text-muted-foreground">Switch between light and dark mode</p>
            </div>
            <button onClick={() => setTheme(isDark ? "light" : "dark")} className="flex items-center bg-muted/50 rounded-full p-1 gap-1">
              <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${!isDark ? "bg-background shadow-sm" : ""}`}>
                <Sun className={`w-4 h-4 transition-colors ${!isDark ? "text-amber-500" : "text-muted-foreground"}`} />
              </div>
              <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${isDark ? "bg-background shadow-sm" : ""}`}>
                <Moon className={`w-4 h-4 transition-colors ${isDark ? "text-blue-400" : "text-muted-foreground"}`} />
              </div>
            </button>
          </div>

          {/* Timezone */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Timezone</p>
              <p className="text-xs text-muted-foreground">Used for module unlock times</p>
            </div>
            <select value={timezone} onChange={(e) => setTimezone(e.target.value)} className="h-9 rounded-md border border-input bg-background px-3 text-sm max-w-[200px]">
              {TIMEZONES.map((tz) => <option key={tz} value={tz}>{tz.replace(/_/g, " ")}</option>)}
            </select>
          </div>
        </div>
      </section>

      {/* ---- SAVE ---- */}
      {error && <p className="text-sm text-destructive mb-4">{error}</p>}
      <Button onClick={handleSave} disabled={saving} size="lg" className="w-full mb-8">
        {saving ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Saving...</> : saved ? <><Check className="w-4 h-4 mr-2" />Saved</> : "Save Changes"}
      </Button>

      {/* ---- DANGER ZONE ---- */}
      <section className="rounded-xl border border-destructive/30 bg-destructive/5 p-6">
        <SectionHeader icon={AlertTriangle} color="bg-destructive/10 text-destructive" title="Danger Zone" desc="Irreversible actions" />
        {!showDeleteConfirm ? (
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Delete Account</p>
              <p className="text-xs text-muted-foreground">Permanently remove your account and all data</p>
            </div>
            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => setShowDeleteConfirm(true)}>
              Delete Account
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-destructive">This action is permanent. All your data, submissions, and progress will be deleted.</p>
            <div className="space-y-2">
              <Label className="text-xs">Type <strong>DELETE</strong> to confirm</Label>
              <Input value={deleteText} onChange={(e) => setDeleteText(e.target.value)} placeholder="DELETE" className="border-destructive/30" />
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => { setShowDeleteConfirm(false); setDeleteText(""); }}>Cancel</Button>
              <Button variant="destructive" size="sm" onClick={handleDeleteAccount} disabled={deleteText !== "DELETE" || deleting}>
                {deleting ? <Loader2 className="w-4 h-4 animate-spin mr-1" /> : null}
                Permanently Delete
              </Button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
