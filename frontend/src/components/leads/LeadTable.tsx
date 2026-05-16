import { Link } from "react-router-dom";
import type { Lead } from "../../types/leads";
import type { UserRole } from "../../types/auth";
import { Button } from "../common/Button";

interface LeadTableProps {
  leads: Lead[];
  role: UserRole | undefined;
  onDelete: (id: string) => void;
  onEdit: (lead: Lead) => void;
}

export const LeadTable = ({ leads, role, onDelete, onEdit }: LeadTableProps) => {
  const statusStyles: Record<string, string> = {
    New: "bg-accent-300/40 text-ink-900 dark:bg-accent-500/30 dark:text-ink-100",
    Contacted: "bg-ink-50 text-ink-700 dark:bg-ink-800 dark:text-ink-200",
    Qualified: "bg-accent-500/20 text-ink-900 dark:bg-accent-500/25 dark:text-ink-100",
    Lost: "bg-sunset-300/40 text-ink-900 dark:bg-sunset-300/20 dark:text-ink-100"
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-white/60 bg-white/70 shadow-card dark:border-ink-800/60 dark:bg-ink-900/70">
      <table className="w-full text-left text-sm">
        <thead className="bg-white/80 text-xs uppercase tracking-wider text-ink-500 dark:bg-ink-900/80 dark:text-ink-300">
          <tr>
            <th className="px-4 py-3">Lead</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Source</th>
            <th className="px-4 py-3">Created</th>
            <th className="px-4 py-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id} className="border-t border-white/60 hover:bg-white/60 dark:border-ink-800/60 dark:hover:bg-ink-800/50">
              <td className="px-4 py-3">
                <p className="font-semibold text-ink-900 dark:text-ink-100">{lead.name}</p>
                <p className="text-xs text-ink-500 dark:text-ink-400">{lead.email}</p>
              </td>
              <td className="px-4 py-3">
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[lead.status]}`}>
                  {lead.status}
                </span>
              </td>
              <td className="px-4 py-3 text-ink-600 dark:text-ink-300">{lead.source}</td>
              <td className="px-4 py-3 text-ink-500 dark:text-ink-400">
                {new Date(lead.createdAt).toLocaleDateString()}
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-2">
                  <Link
                    className="rounded-xl border border-ink-200 px-3 py-2 text-xs font-semibold text-ink-700 dark:border-ink-700 dark:text-ink-100"
                    to={`/leads/${lead._id}`}
                  >
                    View
                  </Link>
                  <Button variant="ghost" onClick={() => onEdit(lead)}>
                    Edit
                  </Button>
                  {role === "admin" && (
                    <Button variant="danger" onClick={() => onDelete(lead._id)}>
                      Delete
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
