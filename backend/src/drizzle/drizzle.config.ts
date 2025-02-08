import dotenv from "dotenv";
dotenv.config({
  path: ".env",
});

import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined in the environment variables.");
}

export default defineConfig({
  schema: "./src/drizzle/schema.ts",
  out: "./migrations", 
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL as string, // ✅ Explicitly cast it to string
  },
});
