import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { apiClient } from "../api/client";
import { Button } from "../components/common/Button";
import { Loader } from "../components/common/Loader";
import { LeadForm, LeadFormValues } from "../components/leads/LeadForm";
import { useAuth } from "../context/AuthContext";
import type { Lead } from "../types/leads";

export const LeadDetail = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLead = async () => {
      if (!token || !id) return;
      const response = await apiClient.get<{ data: Lead }>(`/api/leads/${id}`, token);
      setLead(response.data);
      setLoading(false);
    };
    fetchLead();
  }, [id, token]);

  const handleUpdate = async (values: LeadFormValues) => {
    if (!token || !id) return;
    await apiClient.patch(`/api/leads/${id}`, values, token);
    navigate("/");
  };

  if (loading) {
    return <Loader label="Loading lead" />;
  }

  if (!lead) {
    return <p className="text-sm text-ink-600 dark:text-ink-300">Lead not found.</p>;
  }

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
      <div className="card p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-ink-500 dark:text-ink-300">Lead profile</p>
            <h2 className="mt-2 text-2xl font-bold text-ink-900 dark:text-ink-100">{lead.name}</h2>
            <p className="text-sm text-ink-500 dark:text-ink-300">{lead.email}</p>
          </div>
          <Button variant="ghost" onClick={() => navigate("/")}
            >Back</Button>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-widest text-ink-500 dark:text-ink-300">Status</p>
            <p className="text-lg font-semibold text-ink-900 dark:text-ink-100">{lead.status}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-ink-500 dark:text-ink-300">Source</p>
            <p className="text-lg font-semibold text-ink-900 dark:text-ink-100">{lead.source}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-ink-500 dark:text-ink-300">Created</p>
            <p className="text-sm text-ink-600 dark:text-ink-300">{new Date(lead.createdAt).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-ink-500 dark:text-ink-300">Updated</p>
            <p className="text-sm text-ink-600 dark:text-ink-300">{new Date(lead.updatedAt).toLocaleString()}</p>
          </div>
        </div>
      </div>
      <LeadForm initial={lead} onSubmit={handleUpdate} />
    </div>
  );
};
