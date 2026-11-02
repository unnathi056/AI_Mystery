import dotenv from "dotenv";
import { fileURLToPath } from "node:url";

dotenv.config({ path: fileURLToPath(new URL("../.env", import.meta.url)) });

async function start() {
  // Load modules that read environment variables only after dotenv has run.
  const [{ createApp }, { connectDatabase }, { loadEnv }] = await Promise.all([
    import("./app.js"),
    import("./config/database.js"),
    import("./config/env.js"),
  ]);
  const env = loadEnv();
  try {
    await connectDatabase(env.MONGODB_URI);
  } catch {
    throw new Error("Could not connect to MongoDB. Check that MongoDB is running and MONGODB_URI is correct.");
  }
  const app = createApp(env.FRONTEND_URL);
  const server = app.listen(env.PORT, () => {
    console.log(`AI Mystery Room API listening on port ${env.PORT}`);
  });
  const shutdown = () => server.close(() => process.exit(0));
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
}

start().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : "Backend startup failed.");
  process.exitCode = 1;
});
