import { Response } from "express";
import { getUserById, updateUser } from "../models/User";
import { SessionRequest } from "supertokens-node/framework/express"; // Import the correct type for session

export const handleGetUserProfile = async (req: SessionRequest, res: Response) => {
  try {
    const userId = req.session!.getUserId();
    const user = await getUserById(parseInt(userId, 10)); // Ensure userId is parsed to an integer

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json({ email: user.email, name: user.name, username: user.username });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const handleUpdateUserProfile = async (req: SessionRequest, res: Response) => {
  try {
    const userId = req.session!.getUserId();
    const { name, username } = req.body;

    if (!name && !username) {
      return res.status(400).json({ error: "At least one field is required to update" });
    }

    const updatedUser = await updateUser(parseInt(userId, 10), name, username); // Ensure userId is parsed to an integer

    return res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
};