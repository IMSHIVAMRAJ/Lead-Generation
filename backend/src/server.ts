import { connectDatabase } from "./config/db.js";
import { env } from "./config/env.js";
import { buildApp } from "./app.js";

const startServer = async () => {
  await connectDatabase(env.mongoUri);

  const app = buildApp();
  app.listen(env.port, () => {
    console.log(`API running on http://localhost:${env.port}`);
  });
};

startServer().catch((error) => {
  console.error("Failed to start server", error);
  process.exit(1);
});
