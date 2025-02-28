"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pg_1 = require("pg");
const node_postgres_1 = require("drizzle-orm/node-postgres");
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
    console.error("❌ DATABASE_URL is not set. Check your .env file.");
    process.exit(1);
}
const pool = new pg_1.Pool({ connectionString: databaseUrl });
pool.on("connect", () => {
    console.log("✅ PostgreSQL Connected Successfully");
});
pool.on("error", (err) => {
    console.error("❌ PostgreSQL Connection Error:", err);
});
exports.db = (0, node_postgres_1.drizzle)(pool);
