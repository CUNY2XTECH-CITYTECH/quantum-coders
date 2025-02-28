import { pgTable, unique, serial, text } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const users = pgTable("users", {
	id: serial().primaryKey().notNull(),
	email: text().notNull(),
	password: text().notNull(),
}, (table) => [
	unique("users_email_key").on(table.email),
]);
