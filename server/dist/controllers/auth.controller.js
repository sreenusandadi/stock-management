"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.logout = exports.login = exports.signUp = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("../models/user.model"));
const token_1 = require("../utils/token");
const signUp = async (req, res) => {
    console.log("SignUp request body:", req);
    const { name, email, password, role } = req.body;
    const existingUser = await user_model_1.default.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
    }
    const salt = await bcryptjs_1.default.genSalt(10);
    const hashedPassword = await bcryptjs_1.default.hash(password, salt);
    try {
        const newUser = new user_model_1.default({
            name,
            email,
            password: hashedPassword,
            role,
        });
        await newUser.save();
        res
            .status(201)
            .json({ message: "User registered successfully", userId: newUser._id });
    }
    catch (error) {
        console.error("Error signing up:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.signUp = signUp;
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await user_model_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const accessToken = (0, token_1.generateAccessToken)({
            userId: user._id.toString(),
            role: user.role,
            name: user.name,
        });
        const refreshToken = (0, token_1.generateRefreshToken)({
            userId: user._id.toString(),
            role: user.role,
            name: user.name,
        });
        // Set refresh token in httpOnly cookie
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        res.status(200).json({
            message: "Login successful",
            token: accessToken,
            user: { name: user.name, email: user.email, role: user.role },
        });
    }
    catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.login = login;
const logout = async (req, res) => {
    // Clear refresh token cookie
    res.clearCookie("refreshToken", { httpOnly: true, sameSite: "lax" });
    res.status(200).json({ message: "Logout successful" });
};
exports.logout = logout;
const refreshToken = async (req, res) => {
    console.log("Refresh token request received");
    try {
        // Read refresh token from cookie
        const refreshToken = req.cookies?.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ message: "Refresh token missing" });
        }
        const decoded = (0, token_1.verifyRefreshToken)(refreshToken);
        if (!decoded) {
            // Refresh token invalid or expired
            res.clearCookie("refreshToken", { httpOnly: true, sameSite: "lax" });
            return res
                .status(403)
                .json({ message: "Refresh token invalid or expired" });
        }
        const newAccessToken = (0, token_1.generateAccessToken)({
            userId: decoded.userId,
            role: decoded.role,
            name: decoded.name,
        });
        return res.status(200).json({ token: newAccessToken });
    }
    catch (error) {
        console.error("Error refreshing token:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.refreshToken = refreshToken;
