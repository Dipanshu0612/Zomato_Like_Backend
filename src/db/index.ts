import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import "dotenv/config"

import * as schema from "./schema";

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function checkConnection() {
  try {
    await client.connect();
    console.log("✅ Database connected successfully");
    return true;
  } catch (error) {
    console.error("❌ Error connecting to the database:", error);
    return false;
  }
}

checkConnection();

export const db = drizzle(client, { schema: schema });
