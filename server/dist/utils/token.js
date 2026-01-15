"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateAccessToken = (user) => {
    const token = jsonwebtoken_1.default.sign({ userId: user._id, role: user.role, name: user.name }, process.env.JWT_SECRET);
};
exports.generateAccessToken = generateAccessToken;
