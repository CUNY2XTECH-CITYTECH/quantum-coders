import express from "express";
import cors from "cors";
import { middleware, errorHandler } from "./supertokensConfig";
import authRoutes from "./routes/auth";
import dotenv from "dotenv";

dotenv.config();

const app = express();

console.log(`[${new Date().toISOString()}] 🚀 server.ts is running...`);

app.use(cors());
app.use(express.json());
app.use(middleware());

// ✅ Log All API Calls
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] 🔄 API Called: ${req.method} ${req.url}`);
  next();
});

// ✅ Register Routes
console.log(`[${new Date().toISOString()}] ✅ Registering auth routes...`);
app.use("/auth", authRoutes);
console.log(`[${new Date().toISOString()}] ✅ Auth routes registered!`);

app.use(errorHandler());

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`[${new Date().toISOString()}] ✅ Server running on port ${PORT}`);
});
