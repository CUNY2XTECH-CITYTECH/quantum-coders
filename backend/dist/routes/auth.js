"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const emailpassword_1 = __importDefault(require("supertokens-node/recipe/emailpassword"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const index_1 = require("../db/index");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const router = express_1.default.Router();
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        console.log("📌 Signup Request Received:", req.body);
        const email = (_a = req.body.formFields.find((field) => field.id === "email")) === null || _a === void 0 ? void 0 : _a.value;
        const password = (_b = req.body.formFields.find((field) => field.id === "password")) === null || _b === void 0 ? void 0 : _b.value;
        if (!email || !password) {
            console.log("❌ Missing Email or Password");
            res.status(400).json({ error: "Email and password are required" });
            return;
        }
        console.log("🔄 Checking if user exists in database...");
        const existingUser = yield index_1.db.select().from(schema_1.users).where((0, drizzle_orm_1.eq)(schema_1.users.email, email));
        if (existingUser.length > 0) {
            console.log("❌ User already exists:", email);
            res.status(400).json({ error: "User already exists in database" });
            return;
        }
        // ✅ Hash Password
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        console.log("🔐 Hashed Password Generated");
        // ✅ SuperTokens Signup
        const signUpResponse = yield emailpassword_1.default.signUp("public", email, password);
        console.log("✅ SuperTokens Response:", signUpResponse);
        if (signUpResponse.status !== "OK") {
            console.log("❌ SuperTokens Signup Failed:", signUpResponse);
            res.status(400).json({ error: "Email already exists in SuperTokens" });
            return;
        }
        // ✅ Insert into PostgreSQL
        const insertedUser = yield index_1.db.insert(schema_1.users).values({
            email,
            password: hashedPassword,
        }).returning();
        console.log("✅ User Inserted into PostgreSQL:", insertedUser);
        res.status(201).json({
            userId: signUpResponse.user.id,
            email: email,
        });
    }
    catch (error) {
        console.error("❌ Signup Error:", error);
        res.status(500).json({
            error: "Signup failed",
            details: error.message,
        });
    }
}));
exports.default = router;
