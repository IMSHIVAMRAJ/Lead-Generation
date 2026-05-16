import { Router } from "express";
import { login, register } from "../controllers/authController.js";
import { validate } from "../middleware/validate.js";
import { loginSchema, registerSchema } from "../schemas/authSchemas.js";

export const authRoutes = Router();

authRoutes.post("/register", validate(registerSchema, "body"), register);
authRoutes.post("/login", validate(loginSchema, "body"), login);
