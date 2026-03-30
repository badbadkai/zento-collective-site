import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import type { WaitlistEntry } from "@/shared/types/database";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import React from "react";

type SortField = "created_at" | "full_name" | "email" | "trading_experience";
type SortDir = "asc" | "desc";

export default function AdminWaitlist() {
  const [entries, setEntries] = useState<WaitlistEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("created_at");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const fetchEntries = async () => {
      const { data, error: fetchError } = await supabase
        .from("bootcamp_waitlist")
        .select("*")
        .order(sortField, { ascending: sortDir === "asc" });

      if (fetchError) {
        setError("Failed to load waitlist entries.");
        console.error("Waitlist fetch error:", fetchError);
      }

      setEntries(data ?? []);
      setLoading(false);
    };

    fetchEntries();
  }, [sortField, sortDir]);

  const filtered = entries.filter((e) => {
    const q = search.toLowerCase();
    return (
      e.full_name.toLowerCase().includes(q) ||
      e.email.toLowerCase().includes(q) ||
      e.discord.toLowerCase().includes(q)
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
    if (!v) return "-";
    return v.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-heading text-2xl font-semibold">
          Waitlist
          <span className="text-muted-foreground text-base font-normal ml-2">
            ({filtered.length})
          </span>
        </h1>
      </div>

      {error && <p className="text-sm text-destructive mb-4">{error}</p>}

      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, email, or discord..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="border border-border/50 rounded-xl overflow-hidden">
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
                  Date <SortIcon field="created_at" />
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
                  <React.Fragment key={entry.id}>
                    <tr
                      className="border-b border-border/30 hover:bg-muted/20 cursor-pointer transition-colors"
                      onClick={() => setExpanded(expanded === entry.id ? null : entry.id)}
                    >
                      <td className="px-4 py-3 font-medium">{entry.full_name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{entry.email}</td>
                      <td className="px-4 py-3 text-muted-foreground">{entry.discord}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary">
                          {formatExp(entry.trading_experience)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {new Date(entry.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </td>
                    </tr>
                    {expanded === entry.id && (
                      <tr>
                        <td colSpan={5} className="px-4 py-4 bg-muted/10">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="font-medium text-xs text-muted-foreground uppercase tracking-wider mb-1">Prop Firm History</p>
                              <p>{formatExp(entry.prop_firm_history)}</p>
                            </div>
                            <div>
                              <p className="font-medium text-xs text-muted-foreground uppercase tracking-wider mb-1">Biggest Challenge</p>
                              <p>{entry.biggest_challenge}</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
