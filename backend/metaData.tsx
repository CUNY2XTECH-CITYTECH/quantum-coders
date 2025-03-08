/*import express from "express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import UserMetadata from "supertokens-node/recipe/usermetadata";

let app = express();
app.use(express.json());

app.post("/updateinfo", verifySession(), async (req, res) => {
    const session = req.session;
    const userId = session.getUserId();

    // Update user metadata (e.g., setting a username)
    await UserMetadata.updateUserMetadata(userId, {
        username: req.body.username,
        preferences: req.body.preferences, // Optional metadata
    });

    res.json({ message: "User metadata updated successfully!" });
});

app.get("/userinfo", verifySession(), async (req, res) => {
    const session = req.session;
    const userId = session.getUserId();

    const { metadata } = await UserMetadata.getUserMetadata(userId);

    res.json({
        userId,
        username: metadata.username || "Unknown User",
        preferences: metadata.preferences || {},
    });
});

*/