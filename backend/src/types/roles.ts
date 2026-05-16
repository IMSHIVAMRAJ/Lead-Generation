export const userRoles = ["admin", "sales"] as const;
export type UserRole = (typeof userRoles)[number];
