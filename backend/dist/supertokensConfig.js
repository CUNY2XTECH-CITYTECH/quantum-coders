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
exports.errorHandler = exports.middleware = void 0;
const supertokens_node_1 = __importDefault(require("supertokens-node"));
const express_1 = require("supertokens-node/framework/express");
Object.defineProperty(exports, "middleware", { enumerable: true, get: function () { return express_1.middleware; } });
Object.defineProperty(exports, "errorHandler", { enumerable: true, get: function () { return express_1.errorHandler; } });
const session_1 = __importDefault(require("supertokens-node/recipe/session"));
const emailpassword_1 = __importDefault(require("supertokens-node/recipe/emailpassword"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
supertokens_node_1.default.init({
    framework: "express",
    supertokens: {
        connectionURI: process.env.SUPERTOKENS_CONNECTION_URI || "http://localhost:3567",
        apiKey: process.env.SUPERTOKENS_API_KEY,
    },
    appInfo: {
        appName: "Quantum Coders",
        apiDomain: "http://localhost:4000",
        websiteDomain: "http://localhost:5173",
        apiBasePath: "/auth",
        websiteBasePath: "/auth",
    },
    recipeList: [
        emailpassword_1.default.init({
            override: {
                functions: (originalImplementation) => {
                    return Object.assign(Object.assign({}, originalImplementation), { signUp: function (input) {
                            return __awaiter(this, void 0, void 0, function* () {
                                console.log("🔄 SuperTokens Signup Attempt:", input);
                                return yield originalImplementation.signUp(input);
                            });
                        } });
                },
            },
        }),
        session_1.default.init(),
    ],
});
