import {pgTable, uuid, varchar} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    userID: uuid().primaryKey().defaultRandom(),
    name: varchar({length: 200}).notNull(),
    email: varchar({length: 300}).unique().notNull()
});

export type Users = typeof users.$inferSelect
export type NewUsers = typeof users.$inferInsert

