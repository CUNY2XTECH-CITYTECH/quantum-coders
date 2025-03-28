
/*import express from "express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { handleUpdateUserProfile } from "../controllers/userController";
import { SessionRequest } from "supertokens-node/framework/express";

const router = express.Router();

router.put("/profile", verifySession(), (req: SessionRequest, res) => {
  handleUpdateUserProfile(req, res);
});

export default router;*/

import express from "express";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { handleUpdateUserProfile } from "../controllers/userController";
import { SessionRequest } from "supertokens-node/framework/express";

const router = express.Router();

router.put("/profile", verifySession(), (req: SessionRequest, res) => {
  handleUpdateUserProfile(req, res);
});

export default router;
