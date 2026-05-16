import { z } from "zod";
import { userRoles } from "../types/roles.js";

export const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(userRoles).optional()
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});
