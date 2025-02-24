import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import "dotenv/config";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

async function main() {
  console.log("Starting Migration...");
  await migrate(db, { migrationsFolder: "./src/drizzle/migrations" });
  console.log("Migration Ended...");
  process.exit(0);
}

main().catch((err) => {
  console.log(err);
  process.exit(0);
});
