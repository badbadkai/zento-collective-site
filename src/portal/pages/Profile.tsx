import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/shared/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Loader2 } from "lucide-react";

export default function PortalProfile() {
  const { user, profile } = useAuth();

  useEffect(() => { document.title = "Profile — Student Portal"; }, []);
  const [fullName, setFullName] = useState(profile?.full_name ?? "");
  const [discord, setDiscord] = useState(profile?.discord ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);

    await supabase.from("profiles").update({
      full_name: fullName,
      discord,
    }).eq("id", user.id);

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <h1 className="font-heading text-2xl font-semibold mb-6">Profile</h1>

      <div className="max-w-md space-y-5">
        <div className="space-y-2">
          <Label>Email</Label>
          <Input value={user?.email ?? ""} disabled className="opacity-60" />
          <p className="text-xs text-muted-foreground">This is the email linked to your account</p>
        </div>

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
            placeholder="username#0000"
          />
        </div>

        <Button onClick={handleSave} disabled={saving}>
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : saved ? (
            <Check className="w-4 h-4 mr-2" />
          ) : null}
          {saved ? "Saved" : "Save Changes"}
        </Button>
      </div>
    </div>
  );
}
