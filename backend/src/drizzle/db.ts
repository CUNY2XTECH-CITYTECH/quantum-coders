import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import dotenv from "dotenv";

dotenv.config();

const connection = postgres(process.env.DATABASE_URL!); 
export const db = drizzle(connection);
//endpoin profile 
import 'dotenv/config';
//import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';

// PostgreSQL Client
const client = new Client({
  connectionString: process.env.DATABASE_URL!,
});

client.connect()
  .then(() => console.log('✅ Connected to PostgreSQL'))
  .catch((err) => console.error('❌ DB Connection Error:', err));

export const db = drizzle(client);
