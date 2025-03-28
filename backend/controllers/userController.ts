
/*import { Response } from "express";
import { SessionRequest } from "supertokens-node/framework/express";
import { updateUserProfile } from "../models/User";

export const handleUpdateUserProfile = async (req: SessionRequest, res: Response) => {
  try {
    const userId = req.session!.getUserId();
    const { fullName, username, description, imageUrl } = req.body;

    if (!fullName && !username && !description && !imageUrl) {
      return res.status(400).json({ error: "No fields provided to update." });
    }
    
    await updateUserProfile(userId, fullName, username, description, imageUrl);

    // ✅ Update profile via Drizzle
    const updated = await updateUserProfile(
      userId,
      fullName,
      username,
      description,
      imageUrl // 👈 profile image URL from upload
    );

    return res.json({
      message: "Profile updated successfully",
      profile: updated[0], // return updated profile data
    });
  } catch (error) {
    console.error("🚨 Error updating profile:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
};*/

// controllers/userController.ts
import { Response } from "express";
import { SessionRequest } from "supertokens-node/framework/express";
import { updateUserProfile } from "../models/User";

export const handleUpdateUserProfile = async (req: SessionRequest, res: Response) => {
  try {
    const userId = req.session!.getUserId();
    const {
      fullName,
      username,
      description,
      imageUrl,
    }: {
      fullName?: string;
      username?: string;
      description?: string;
      imageUrl?: string;
    } = req.body;

    // If no fields are provided, reject
    if (!fullName && !username && !description && !imageUrl) {
      return res.status(400).json({ error: "No fields provided for update." });
    }

    const updated = await updateUserProfile(
      userId,
      fullName,
      username,
      description,
      imageUrl
    );

    return res.json({
      message: "Profile updated successfully",
      profile: updated[0],
    });
  } catch (error) {
    console.error("🚨 Error updating profile:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
};

