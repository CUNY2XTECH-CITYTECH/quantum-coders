import dotenv from "dotenv";
dotenv.config();

import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("❌ DATABASE_URL is not set. Check your .env file.");
  process.exit(1);
}

const pool = new Pool({ connectionString: databaseUrl });

pool.on("connect", () => {
  console.log("✅ PostgreSQL Connected Successfully");
});

pool.on("error", (err) => {
  console.error("❌ PostgreSQL Connection Error:", err);
});

export const db = drizzle(pool);
