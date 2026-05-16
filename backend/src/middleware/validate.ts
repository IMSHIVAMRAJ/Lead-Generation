import type { RequestHandler } from "express";
import type { ZodSchema } from "zod";

type Target = "body" | "query" | "params";

export const validate = (schema: ZodSchema, target: Target): RequestHandler => {
  return (req, _res, next) => {
    const data = req[target];
    const result = schema.safeParse(data);
    if (!result.success) {
      return next(result.error);
    }
    req[target] = result.data;
    next();
  };
};
