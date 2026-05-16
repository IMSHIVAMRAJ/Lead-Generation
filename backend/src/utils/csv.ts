import type { LeadDocument } from "../models/Lead.js";

const escapeCell = (value: string) => {
  if (value.includes("\"") || value.includes(",") || value.includes("\n")) {
    return `"${value.replace(/\"/g, '""')}"`;
  }
  return value;
};

export const leadsToCsv = (leads: LeadDocument[]) => {
  const header = ["Name", "Email", "Status", "Source", "Created At"];
  const rows = leads.map((lead) => [
    escapeCell(lead.name),
    escapeCell(lead.email),
    escapeCell(lead.status),
    escapeCell(lead.source),
    lead.createdAt.toISOString()
  ]);

  return [header, ...rows].map((row) => row.join(",")).join("\n");
};
