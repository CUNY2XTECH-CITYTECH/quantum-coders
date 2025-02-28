"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const supertokensConfig_1 = require("./supertokensConfig");
const auth_1 = __importDefault(require("./routes/auth"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
console.log(`[${new Date().toISOString()}] 🚀 server.ts is running...`);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, supertokensConfig_1.middleware)());
// ✅ Log All API Calls
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] 🔄 API Called: ${req.method} ${req.url}`);
    next();
});
// ✅ Register Routes
console.log(`[${new Date().toISOString()}] ✅ Registering auth routes...`);
app.use("/auth", auth_1.default);
console.log(`[${new Date().toISOString()}] ✅ Auth routes registered!`);
app.use((0, supertokensConfig_1.errorHandler)());
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`[${new Date().toISOString()}] ✅ Server running on port ${PORT}`);
});
