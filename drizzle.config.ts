import * as dotenv from "dotenv";
dotenv.config();

import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  dialect: "postgresql",
  out: "./src/drizzle/migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
});
