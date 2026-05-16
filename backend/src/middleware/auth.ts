import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import type { UserRole } from "../types/roles.js";

interface JwtPayload {
  sub: string;
  role: UserRole;
}

export const requireAuth: RequestHandler = (req, _res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next({ statusCode: 401, message: "Missing auth token" });
  }

  const token = authHeader.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, env.jwtSecret) as JwtPayload;
    req.user = { id: payload.sub, role: payload.role };
    next();
  } catch {
    next({ statusCode: 401, message: "Invalid auth token" });
  }
};

export const requireRole = (...roles: UserRole[]): RequestHandler => {
  return (req, _res, next) => {
    if (!req.user) {
      return next({ statusCode: 401, message: "Unauthorized" });
    }
    if (!roles.includes(req.user.role)) {
      return next({ statusCode: 403, message: "Forbidden" });
    }
    next();
  };
};
