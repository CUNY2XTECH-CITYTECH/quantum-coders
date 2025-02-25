import { config } from "dotenv";
import {drizzle} from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import {Pool} from 'pg';
export * from './schema';

const pool = new Pool({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT!),
    ssl: false
});

config({ path: ".env"});

export const db = drizzle(pool, {
    schema: schema
});