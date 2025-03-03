import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "sqlite",
    schema: "./src/lib/myschemas/schema.ts",
    out: "./drizzle",
    dbCredentials:{url:"src/lib/server/dbfile/chinook.db"}
  });