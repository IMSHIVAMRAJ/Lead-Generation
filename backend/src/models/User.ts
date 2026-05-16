import mongoose, { Schema } from "mongoose";
import type { UserRole } from "../types/roles.js";

export interface UserDocument {
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, required: true, enum: ["admin", "sales"], default: "sales" }
  },
  { timestamps: true }
);

export const User = mongoose.model<UserDocument>("User", userSchema);
