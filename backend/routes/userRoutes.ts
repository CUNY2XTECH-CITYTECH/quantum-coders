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
import express, { Request, Response } from "express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import UserMetadata from "supertokens-node/recipe/usermetadata";
import { SessionContainer } from "supertokens-node/recipe/session";

const router = express.Router();

router.get("/userinfo", verifySession(), async (req: Request, res: Response) => {
    try {
        // Use type assertion to explicitly tell TypeScript that req.session exists
        const session = (req as Request & { session: SessionContainer }).session;
        const userId = session.getUserId();
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

export default router;

