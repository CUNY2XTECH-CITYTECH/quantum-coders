import express from "express";
import cors from "cors";
import { db } from "./drizzle/db"; // Import Drizzle ORM database setup
import "./config/supertokensConfig"; // Ensure SuperTokens is initialized

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend is running!");
});

app.listen(3001, () => {
    console.log("✅ Backend running on http://localhost:3001");
});
//make type file