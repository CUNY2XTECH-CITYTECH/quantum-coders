/*import { db } from "../src/drizzle/db";
import { profile } from "../src/drizzle/schema"; // 👈 make sure this matches
import { eq } from "drizzle-orm";

// Fetch profile by user_id (not profile.id)
export const getUserProfileByUserId = async (userId: string) => {
  const result = await db
    .select()
    .from(profile)
    .where(eq(profile.user_id, userId)); // ✅ compare with user_id
  return result[0] || null;
};

// Update profile by user id
export const updateUserProfile = async (
  userId: string,
  full_name?: string,
  username?: string,
  description?: string,
  profile_image_url?: string
) => {
  return db
    .update(profile)
    .set({
      ...(full_name && { full_name }),
      ...(username && { username }),
      ...(description && { description }),
      ...(profile_image_url && { profile_image_url }),
    })
    .where(eq(profile.user_id, userId))
    .returning();
};
*/

// models/User.ts
import { db } from "../src/drizzle/db";
import { profile } from "../src/drizzle/schema";
import { eq } from "drizzle-orm";

export const updateUserProfile = async (
  userId: string,
  full_name?: string,
  username?: string,
  description?: string,
  profile_image_url?: string
) => {
  const updateData: Record<string, string> = {};
  if (full_name) updateData.full_name = full_name;
  if (username) updateData.username = username;
  if (description) updateData.description = description;
  if (profile_image_url) updateData.profile_image_url = profile_image_url;

  return db
    .update(profile)
    .set(updateData)
    .where(eq(profile.user_id, userId))
    .returning();
};
