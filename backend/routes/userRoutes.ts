/*import express, { Request, Response } from "express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import UserMetadata from "supertokens-node/recipe/usermetadata";
import { SessionContainer } from "supertokens-node/recipe/session";

const router = express.Router();

// Custom type to extend Express request with session
interface AuthenticatedRequest extends Request {
    session: SessionContainer;
}

// Fetch user metadata

router.get("/userinfo", verifySession(), async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.session.getUserId();
        const { metadata } = await UserMetadata.getUserMetadata(userId);

        res.json({
            userId,
            username: metadata.username || "Guest",
        });
    } catch (error) {
        console.error("🚨 Error retrieving user metadata:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


export default router;*/
/*
import express from "express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import UserMetadata from "supertokens-node/recipe/usermetadata";

const router = express.Router();

// Get user metadata
router.get("/info", verifySession(), async (req, res) => {
  try {
    const userId = req.session!.getUserId();
    const { metadata } = await UserMetadata.getUserMetadata(userId);
    
    res.json({ preferences: metadata.preferences || {} });
  } catch (error) {
    console.error("Error fetching metadata:", error);
    res.status(500).json({ error: "Failed to retrieve metadata" });
  }
});

// Update user metadata
router.post("/update", verifySession(), async (req, res) => {
  try {
    const userId = req.session!.getUserId();
    const newPreferences = req.body.preferences;

    if (!newPreferences) {
      return res.status(400).json({ error: "Preferences are required" });
    }

    await UserMetadata.updateUserMetadata(userId, { preferences: newPreferences });

    res.json({ message: "User information updated successfully" });
  } catch (error) {
    console.error("Error updating metadata:", error);
    res.status(500).json({ error: "Failed to update metadata" });
  }
});

export default router;*/

// routes/userRoutes.ts
import express from "express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { handleGetUserProfile, handleUpdateUserProfile } from "../controllers/userController";
import { SessionRequest } from "supertokens-node/framework/express"; // Import the correct type for session

const router = express.Router();

router.get("/profile", verifySession(), (req: SessionRequest, res) => {
    handleGetUserProfile(req, res);
});

router.put("/profile", verifySession(), (req: SessionRequest, res) => {
    handleUpdateUserProfile(req, res);
});

export default router;

