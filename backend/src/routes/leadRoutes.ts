import { Router } from "express";
import {
  createLead,
  deleteLead,
  exportLeads,
  getLead,
  listLeads,
  updateLead
} from "../controllers/leadController.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { validate } from "../middleware/validate.js";
import { leadCreateSchema, leadQuerySchema, leadUpdateSchema } from "../schemas/leadSchemas.js";

export const leadRoutes = Router();

leadRoutes.use(requireAuth);

leadRoutes.get("/", validate(leadQuerySchema, "query"), listLeads);
leadRoutes.get("/export", validate(leadQuerySchema, "query"), requireRole("admin"), exportLeads);
leadRoutes.get("/:id", getLead);
leadRoutes.post("/", validate(leadCreateSchema, "body"), createLead);
leadRoutes.patch("/:id", validate(leadUpdateSchema, "body"), updateLead);
leadRoutes.delete("/:id", requireRole("admin"), deleteLead);
