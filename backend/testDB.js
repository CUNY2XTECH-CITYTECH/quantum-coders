import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import dotenv from "dotenv";
import { users } from "./src/drizzle/schema.ts";
dotenv.config();

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error("❌ Missing DATABASE_URL in environment variables!");
}

const sql = postgres(connectionString);
const db = drizzle(sql);

async function testDB() {
    try {
        const result = await db.select().from(users);
        console.log("✅ Database connection successful! Users:", result);
    } catch (error) {
        console.error("❌ Database Error:", error);
    } finally {
        await sql.end();
    }
}

testDB();
