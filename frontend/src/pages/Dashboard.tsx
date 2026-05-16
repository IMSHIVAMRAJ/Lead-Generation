import { useEffect, useMemo, useState } from "react";
import { apiClient } from "../api/client";
import { Button } from "../components/common/Button";
import { EmptyState } from "../components/common/EmptyState";
import { ErrorState } from "../components/common/ErrorState";
import { Loader } from "../components/common/Loader";
import { LeadFilters, LeadFiltersState } from "../components/leads/LeadFilters";
import { LeadForm, LeadFormValues } from "../components/leads/LeadForm";
import { LeadTable } from "../components/leads/LeadTable";
import { Pagination } from "../components/leads/Pagination";
import { useAuth } from "../context/AuthContext";
import { useDebounce } from "../hooks/useDebounce";
import type { Lead, LeadListResponse } from "../types/leads";

const buildQuery = (filters: LeadFiltersState, page: number) => {
  const params = new URLSearchParams();
  if (filters.status) params.set("status", filters.status);
  if (filters.source) params.set("source", filters.source);
  if (filters.search) params.set("search", filters.search);
  if (filters.sort) params.set("sort", filters.sort);
  params.set("page", page.toString());
  return params.toString();
};

export const Dashboard = () => {
  const { token, user } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [meta, setMeta] = useState({ page: 1, totalPages: 1, total: 0, limit: 10 });
  const [filters, setFilters] = useState<LeadFiltersState>({
    status: "",
    source: "",
    search: "",
    sort: "latest"
  });
  const [editing, setEditing] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debouncedSearch = useDebounce(filters.search, 400);

  const queryFilters = useMemo(() => ({ ...filters, search: debouncedSearch }), [filters, debouncedSearch]);
  const stats = useMemo(() => {
    const total = leads.length;
    const qualified = leads.filter((lead) => lead.status === "Qualified").length;
    const contacted = leads.filter((lead) => lead.status === "Contacted").length;
    return { total, qualified, contacted };
  }, [leads]);

  const fetchLeads = async (page = 1) => {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const query = buildQuery(queryFilters, page);
      const response = await apiClient.get<LeadListResponse>(`/api/leads?${query}`, token);
      setLeads(response.data);
      setMeta(response.meta);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads(1);
  }, [queryFilters, token]);

  const handleCreateOrUpdate = async (values: LeadFormValues) => {
    if (!token) return;
    if (editing) {
      await apiClient.patch(`/api/leads/${editing._id}`, values, token);
      setEditing(null);
    } else {
      await apiClient.post("/api/leads", values, token);
    }
    await fetchLeads(meta.page);
  };

  const handleDelete = async (id: string) => {
    if (!token) return;
    await apiClient.delete(`/api/leads/${id}`, token);
    await fetchLeads(meta.page);
  };

  const handleExport = async () => {
    if (!token) return;
    const query = buildQuery(queryFilters, meta.page);
    const apiBase = import.meta.env.VITE_API_URL || "http://localhost:4000";
    const response = await fetch(`${apiBase}/api/leads/export?${query}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "leads.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-8 flex flex-col gap-8">
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="panel p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-ink-900 dark:text-ink-100">Lead pulse</h3>
              <p className="text-sm text-ink-500 dark:text-ink-300">Track, filter, and act without the noise.</p>
            </div>
            {user?.role === "admin" && (
              <Button variant="ghost" onClick={handleExport}>
                Export CSV
              </Button>
            )}
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/70 bg-white/70 p-4 text-sm dark:border-ink-800/60 dark:bg-ink-900/60">
              <p className="text-xs uppercase tracking-widest text-ink-500 dark:text-ink-300">Visible</p>
              <p className="mt-2 text-2xl font-bold text-ink-900 dark:text-ink-100">{stats.total}</p>
            </div>
            <div className="rounded-2xl border border-white/70 bg-white/70 p-4 text-sm dark:border-ink-800/60 dark:bg-ink-900/60">
              <p className="text-xs uppercase tracking-widest text-ink-500 dark:text-ink-300">Qualified</p>
              <p className="mt-2 text-2xl font-bold text-ink-900 dark:text-ink-100">{stats.qualified}</p>
            </div>
            <div className="rounded-2xl border border-white/70 bg-white/70 p-4 text-sm dark:border-ink-800/60 dark:bg-ink-900/60">
              <p className="text-xs uppercase tracking-widest text-ink-500 dark:text-ink-300">Contacted</p>
              <p className="mt-2 text-2xl font-bold text-ink-900 dark:text-ink-100">{stats.contacted}</p>
            </div>
          </div>
          <div className="mt-4">
            <LeadFilters value={filters} onChange={setFilters} />
          </div>
        </div>
        <LeadForm initial={editing} onSubmit={handleCreateOrUpdate} onCancel={() => setEditing(null)} />
      </div>

      {error && <ErrorState message={error} />}
      {loading && <Loader label="Fetching leads" />}

      {!loading && !error && leads.length === 0 && (
        <EmptyState title="No leads yet" subtitle="Create your first lead to kick things off." />
      )}

      {!loading && !error && leads.length > 0 && (
        <>
          <LeadTable leads={leads} role={user?.role} onDelete={handleDelete} onEdit={setEditing} />
          <Pagination page={meta.page} totalPages={meta.totalPages} onPageChange={fetchLeads} />
        </>
      )}
    </div>
  );
};
