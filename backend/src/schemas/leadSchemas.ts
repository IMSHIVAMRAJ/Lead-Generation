import { z } from "zod";
import { leadSources, leadStatuses } from "../types/leads.js";

export const leadCreateSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  status: z.enum(leadStatuses),
  source: z.enum(leadSources)
});

export const leadUpdateSchema = leadCreateSchema.partial();

export const leadQuerySchema = z.object({
  status: z.enum(leadStatuses).optional(),
  source: z.enum(leadSources).optional(),
  search: z.string().min(1).optional(),
  sort: z.enum(["latest", "oldest"]).optional(),
  page: z.coerce.number().int().positive().optional()
});
