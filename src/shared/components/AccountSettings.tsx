import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/shared/hooks/useAuth";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Check, Loader2, User, Shield, Mail, Globe, Sun, Moon } from "lucide-react";

const TIMEZONES = [
  "Europe/London",
  "Europe/Paris",
  "Europe/Berlin",
  "America/New_York",
  "America/Chicago",
  "America/Denver",
  "America/Los_Angeles",
  "Asia/Tokyo",
  "Asia/Singapore",
  "Asia/Dubai",
  "Australia/Sydney",
  "Pacific/Auckland",
];

const TRADING_STYLES = [
  "Scalping",
  "Day Trading",
  "Swing Trading",
  "Position Trading",
  "Not sure yet",
];

interface AccountSettingsProps {
  portalTitle: string;
}

export default function AccountSettings({ portalTitle }: AccountSettingsProps) {
  const { user, profile } = useAuth();
  const { theme, setTheme } = useTheme();

  const [fullName, setFullName] = useState("");
  const [discord, setDiscord] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [timezone, setTimezone] = useState("Europe/London");
  const [tradingStyle, setTradingStyle] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [visible, setVisible] = useState(false);

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

  const isDark = theme === "dark";

  return (
    <div
      className="max-w-2xl mx-auto transition-all duration-700 ease-out"
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
    >
      <h1 className="font-heading text-2xl font-semibold mb-8">Account Settings</h1>

      {/* Profile */}
      <section className="rounded-xl border border-border/50 bg-card/30 p-6 mb-5">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h2 className="font-medium">Profile</h2>
            <p className="text-xs text-muted-foreground">Your personal details</p>
          </div>
        </div>

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
            <Label htmlFor="phone">Phone (optional)</Label>
            <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+44 7..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tradingStyle">Trading Style</Label>
            <select
              id="tradingStyle"
              value={tradingStyle}
              onChange={(e) => setTradingStyle(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              <option value="">Select...</option>
              {TRADING_STYLES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="col-span-2 space-y-2">
            <Label htmlFor="bio">Bio (optional)</Label>
            <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} placeholder="A short description about yourself..." rows={3} />
          </div>
        </div>
      </section>

      {/* Account */}
      <section className="rounded-xl border border-border/50 bg-card/30 p-6 mb-5">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Mail className="w-4 h-4 text-blue-500" />
          </div>
          <div>
            <h2 className="font-medium">Account</h2>
            <p className="text-xs text-muted-foreground">Your login credentials</p>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Email</Label>
          <Input value={user?.email ?? ""} disabled className="opacity-60" />
          <p className="text-xs text-muted-foreground">Linked to your account. Cannot be changed here.</p>
        </div>
      </section>

      {/* Preferences */}
      <section className="rounded-xl border border-border/50 bg-card/30 p-6 mb-5">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-lg bg-purple-500/10 flex items-center justify-center">
            <Globe className="w-4 h-4 text-purple-500" />
          </div>
          <div>
            <h2 className="font-medium">Preferences</h2>
            <p className="text-xs text-muted-foreground">Customise your experience</p>
          </div>
        </div>

        <div className="space-y-5">
          {/* Theme switch */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Appearance</p>
              <p className="text-xs text-muted-foreground">Switch between light and dark mode</p>
            </div>
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className="flex items-center bg-muted/50 rounded-full p-1 gap-1"
            >
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
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="h-9 rounded-md border border-input bg-background px-3 text-sm max-w-[200px]"
            >
              {TIMEZONES.map((tz) => <option key={tz} value={tz}>{tz.replace("_", " ")}</option>)}
            </select>
          </div>
        </div>
      </section>

      {/* Role */}
      <section className="rounded-xl border border-border/50 bg-card/30 p-6 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center">
            <Shield className="w-4 h-4 text-emerald-500" />
          </div>
          <div>
            <h2 className="font-medium">Role</h2>
            <p className="text-xs text-muted-foreground">Your access level</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500 uppercase tracking-wider">
            {profile?.role ?? "—"}
          </span>
          <span className="text-sm text-muted-foreground">
            {profile?.role === "admin" ? "Full access to all admin features" : "Access to enrolled programme content"}
          </span>
        </div>
      </section>

      {/* Save */}
      {error && <p className="text-sm text-destructive mb-4">{error}</p>}

      <Button onClick={handleSave} disabled={saving} size="lg" className="w-full">
        {saving ? (
          <><Loader2 className="w-4 h-4 animate-spin mr-2" />Saving...</>
        ) : saved ? (
          <><Check className="w-4 h-4 mr-2" />Saved</>
        ) : (
          "Save Changes"
        )}
      </Button>
    </div>
  );
}
