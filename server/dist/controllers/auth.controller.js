"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.signUp = void 0;
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
        const token = (0, token_1.generateAccessToken)(user);
        res.status(200).json({
            message: "Login successful",
            token,
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
    // Since JWT is stateless, logout can be handled on the client side by deleting the token.
    res.status(200).json({ message: "Logout successful" });
};
exports.logout = logout;
