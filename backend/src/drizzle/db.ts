import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config();

const connection = postgres(process.env.DATABASE_URL!); 
export const db = drizzle(connection);
