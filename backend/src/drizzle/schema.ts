import { pgTable, uuid, text, timestamp, boolean, pgEnum } from "drizzle-orm/pg-core";

// Define Enum for User Roles
export const userRoleEnum = pgEnum("user_role", ["user", "admin", "moderator"]);

// Users Table
export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    username: text("username").unique().notNull(),
    email: text("email").unique().notNull(),
    password_hash: text("password_hash").notNull(),  // Changed to snake_case for consistency
    first_name: text("first_name"),
    last_name: text("last_name"),
    role: userRoleEnum("role").default("user").notNull(),  // Using Enum instead of raw text
    is_active: boolean("is_active").default(true),
    created_at: timestamp("created_at").defaultNow(),
});
