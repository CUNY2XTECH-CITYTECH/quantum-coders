import express, { Request, Response, NextFunction } from "express";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import bcrypt from "bcryptjs";
import { db } from "../db/index";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

const router = express.Router();

// ✅ Middleware for Handling Async Errors
const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) =>
  (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next);
  };

/**
 * ✅ SIGNUP ROUTE
 */
router.post(
  "/signup",
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    console.log("📌 [Signup] Request Received:", req.body);

    // ✅ Extract email & password
    const email = req.body.formFields.find((field: { id: string; value: string }) => field.id === "email")?.value;
    const password = req.body.formFields.find((field: { id: string; value: string }) => field.id === "password")?.value;

    if (!email || !password) {
      console.warn("⚠️ [Signup] Missing Email or Password");
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    // ✅ Check if user exists in PostgreSQL
    console.log("🔄 [Signup] Checking if user exists in database...");
    const existingUser = await db.select().from(users).where(eq(users.email, email));

    if (existingUser.length > 0) {
      console.warn("❌ [Signup] User already exists:", email);
      res.status(400).json({ error: "User already exists in database" });
      return;
    }

    // ✅ Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🔐 [Signup] Hashed Password Generated");

    // ✅ SuperTokens Signup
    console.log("🔄 [Signup] Registering user in SuperTokens...");
    const signUpResponse = await EmailPassword.signUp("public", email, password);

    if (signUpResponse.status !== "OK") {
      console.error("❌ [Signup] SuperTokens Signup Failed:", signUpResponse);
      res.status(400).json({ error: "SuperTokens registration failed" });
      return;
    }

    // ✅ Insert into PostgreSQL
    console.log("📌 [Signup] Inserting user into PostgreSQL...");
    const insertedUser = await db
      .insert(users)
      .values({ email, password: hashedPassword })
      .returning();

    console.log("✅ [Signup] User Inserted:", insertedUser);

    res.status(201).json({
      userId: signUpResponse.user.id,
      email,
    });
  })
);

/**
 * ✅ LOGIN ROUTE
 */
router.post(
  "/login",
  asyncHandler(async (req: Request, res: Response): Promise<void> => {
    console.log("📌 [Login] Request Received:", req.body);

    // ✅ Extract email & password
    const email = req.body.formFields.find((field: { id: string; value: string }) => field.id === "email")?.value;
    const password = req.body.formFields.find((field: { id: string; value: string }) => field.id === "password")?.value;

    if (!email || !password) {
      console.warn("⚠️ [Login] Missing Email or Password");
      res.status(400).json({ error: "Email and password are required" });
      return;
    }

    // ✅ Check if user exists in PostgreSQL
    console.log("🔄 [Login] Checking if user exists...");
    const existingUser = await db.select().from(users).where(eq(users.email, email));

    if (existingUser.length === 0) {
      console.warn("❌ [Login] User not found:", email);
      res.status(400).json({ error: "Invalid credentials" });
      return;
    }

    // ✅ Compare Password
    const isMatch = await bcrypt.compare(password, existingUser[0].password);
    if (!isMatch) {
      console.warn("❌ [Login] Incorrect Password");
      res.status(400).json({ error: "Invalid credentials" });
      return;
    }

    console.log("✅ [Login] User Authenticated:", email);
    res.status(200).json({
      message: "Login successful",
      userId: existingUser[0].id,
      email: existingUser[0].email,
    });
  })
);

/**
 * ✅ GET USERS ROUTE (For Debugging)
 */
router.get(
  "/users",
  asyncHandler(async (_req: Request, res: Response): Promise<void> => {
    console.log("📌 [Users] Fetching all users...");

    const allUsers = await db.select().from(users);
    console.log("✅ [Users] Retrieved Users:", allUsers);

    res.status(200).json(allUsers);
  })
);

/**
 * ✅ GLOBAL ERROR HANDLER
 */
router.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  console.error("❌ [Error] Unexpected Error:", err);
  res.status(500).json({ error: "Internal server error", details: err.message });
});

export default router;
