import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { env } from "../config/env.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body as {
    name: string;
    email: string;
    password: string;
    role?: "admin" | "sales";
  };

  const existing = await User.findOne({ email });
  if (existing) {
    return next({ statusCode: 409, message: "Email already in use" });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, passwordHash, role: role ?? "sales" });

  const token = jwt.sign({ role: user.role }, env.jwtSecret, {
    subject: user._id.toString(),
    expiresIn: env.jwtExpiresIn
  });

  res.status(201).json({
    token,
    user: { id: user._id.toString(), name: user.name, email: user.email, role: user.role }
  });
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body as { email: string; password: string };
  const user = await User.findOne({ email });
  if (!user) {
    return next({ statusCode: 401, message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    return next({ statusCode: 401, message: "Invalid credentials" });
  }

  const token = jwt.sign({ role: user.role }, env.jwtSecret, {
    subject: user._id.toString(),
    expiresIn: env.jwtExpiresIn
  });

  res.json({
    token,
    user: { id: user._id.toString(), name: user.name, email: user.email, role: user.role }
  });
});
