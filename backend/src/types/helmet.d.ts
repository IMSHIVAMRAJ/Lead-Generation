declare module "helmet" {
  import type { RequestHandler } from "express";
  const helmet: () => RequestHandler;
  export default helmet;
}
