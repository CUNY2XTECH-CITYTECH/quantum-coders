// models/User.ts
import { db } from "../src/drizzle/db";
import { user } from "../src/drizzle/schemaUser";
import { eq } from "drizzle-orm";

export const getUserById = async (id: number) => { 
  // Change id type to number
  const result = await db.select().from(user).where(eq(user.id, id));
  return result[0] || null;
};

export const updateUser = async (id: number, name?: string, username?: string) => { 
  // Change id type to number
  return db
    .update(user)
    .set({ name, username })
    .where(eq(user.id, id))
    .returning();
};
