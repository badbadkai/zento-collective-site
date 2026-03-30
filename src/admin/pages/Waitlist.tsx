import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { WaitlistEntry } from "@/shared/types/database";
import { Search, ChevronDown, ChevronUp, User, Mail, MessageCircle, Clock, BarChart3, Target, HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";

type SortField = "created_at" | "full_name" | "email" | "trading_experience";
type SortDir = "asc" | "desc";

export default function AdminWaitlist() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("created_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [selected, setSelected] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => { document.title = "Waitlist | Admin Portal"; }, []);

  useEffect(() => {
    setTimeout(() => setVisible(true), 50);
  }, []);

  const fetchEntries = async () => {
    const { data, error: fetchError } = await supabase
      .from("bootcamp_waitlist")
      .select("*")
      .order(sortField, { ascending: sortDir === "asc" });

    if (fetchError) {
      setError("Failed to load waitlist entries: " + fetchError.message);
      console.error("Waitlist fetch error:", fetchError);
    }

    setEntries(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchEntries();
  }, [sortField, sortDir]);

  // Real-time subscription for new waitlist entries
  useEffect(() => {
    const channel = supabase
      .channel("waitlist-changes")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "bootcamp_waitlist" }, (payload) => {
        setEntries((prev) => [payload.new as WaitlistEntry, ...prev]);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  const filtered = entries.filter((e) => {
    const q = search.toLowerCase();
    return (
      e.full_name.toLowerCase().includes(q) ||
      e.email.toLowerCase().includes(q) ||
      e.discord.toLowerCase().includes(q) ||
      (e.biggest_challenge?.toLowerCase().includes(q))
    );
  });

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDir === "asc" ? (
      <ChevronUp className="w-3 h-3 inline ml-1" />
    ) : (
      <ChevronDown className="w-3 h-3 inline ml-1" />
    );
  };

  const formatExp = (v: string | null) => {
    if (!v) return "Not specified";
    return v.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  const formatPropFirm = (v: string | null) => {
    if (!v) return "Not specified";
    switch (v) {
      case "no": return "No";
      case "yes-passed": return "Yes — Passed";
      case "yes-failed": return "Yes — Failed";
      default: return v.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    }
  };

  const selectedEntry = entries.find((e) => e.id === selected);

  return (
    <div
      className="transition-all duration-700 ease-out"
      style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)" }}
    >
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-semibold">
          Waitlist
          <span className="text-muted-foreground text-base font-normal ml-2">({filtered.length})</span>
        </h1>
      </div>

      {error && <p className="text-sm text-destructive mb-4">{error}</p>}

      {/* Search */}
      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search name, email, discord..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="flex gap-5">
        {/* Table */}
        <div className="flex-1 border border-border/50 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/50 bg-muted/30">
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground cursor-pointer hover:text-foreground" onClick={() => toggleSort("full_name")}>
                    Name <SortIcon field="full_name" />
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground cursor-pointer hover:text-foreground" onClick={() => toggleSort("email")}>
                    Email <SortIcon field="email" />
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground">Discord</th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground cursor-pointer hover:text-foreground" onClick={() => toggleSort("trading_experience")}>
                    Experience <SortIcon field="trading_experience" />
                  </th>
                  <th className="text-left px-4 py-3 font-medium text-muted-foreground cursor-pointer hover:text-foreground" onClick={() => toggleSort("created_at")}>
                    Applied <SortIcon field="created_at" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">Loading...</td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">No entries found</td></tr>
                ) : (
                  filtered.map((entry) => (
                    <tr
                      key={entry.id}
                      className={`border-b border-border/30 cursor-pointer transition-colors ${selected === entry.id ? "bg-primary/5" : "hover:bg-muted/20"}`}
                      onClick={() => setSelected(selected === entry.id ? null : entry.id)}
                    >
                      <td className="px-4 py-3 font-medium">{entry.full_name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{entry.email}</td>
                      <td className="px-4 py-3 text-muted-foreground">{entry.discord}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary">
                          {formatExp(entry.trading_experience)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">
                        {new Date(entry.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail panel */}
        {selectedEntry && (
          <div
            className="w-80 shrink-0 border border-border/50 rounded-xl p-5 bg-card/30 self-start sticky top-8 transition-all duration-300"
            style={{ opacity: 1 }}
          >
            <h2 className="font-heading text-lg font-semibold mb-4">{selectedEntry.full_name}</h2>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Email</p>
                  <p className="text-sm">{selectedEntry.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageCircle className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Discord</p>
                  <p className="text-sm">{selectedEntry.discord}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <BarChart3 className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Trading Experience</p>
                  <p className="text-sm">{formatExp(selectedEntry.trading_experience)}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Target className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Prop Firm History</p>
                  <p className="text-sm">{formatPropFirm(selectedEntry.prop_firm_history)}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <HelpCircle className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Biggest Challenge</p>
                  <p className="text-sm leading-relaxed">{selectedEntry.biggest_challenge}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Applied</p>
                  <p className="text-sm">
                    {new Date(selectedEntry.created_at).toLocaleString("en-GB", {
                      day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
