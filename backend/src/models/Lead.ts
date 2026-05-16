import mongoose, { Schema } from "mongoose";
import type { LeadSource, LeadStatus } from "../types/leads.js";

export interface LeadDocument {
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  createdAt: Date;
  updatedAt: Date;
}

const leadSchema = new Schema<LeadDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    status: { type: String, required: true, enum: ["New", "Contacted", "Qualified", "Lost"] },
    source: { type: String, required: true, enum: ["Website", "Instagram", "Referral"] }
  },
  { timestamps: true }
);

export const Lead = mongoose.model<LeadDocument>("Lead", leadSchema);
