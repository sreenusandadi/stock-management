import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import User from "../models/user.model";
import {
  decodeAccessToken,
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/token";

export const signUp = async (req: Request, res: Response) => {
  console.log("SignUp request body:", req);
  const { name, email, password, role } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already in use" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User registered successfully", userId: newUser._id });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken({
      userId: user._id.toString(),
      role: user.role,
      name: user.name,
      email: user.email,
    });

    const refreshToken = generateRefreshToken({
      userId: user._id.toString(),
      role: user.role,
      name: user.name,
      email: user.email,
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
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = async (req: Request, res: Response) => {
  // Clear refresh token cookie
  res.clearCookie("refreshToken", { httpOnly: true, sameSite: "lax" });
  res.status(200).json({ message: "Logout successful" });
};

export const refreshToken = async (req: Request, res: Response) => {
  console.log("Refresh token request received");
  try {
    // Read refresh token from cookie
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token missing" });
    }

    const decoded = verifyRefreshToken(refreshToken) as any;
    console.log("Decoded: ", decoded);
    if (!decoded) {
      // Refresh token invalid or expired
      res.clearCookie("refreshToken", { httpOnly: true, sameSite: "lax" });
      return res
        .status(403)
        .json({ message: "Refresh token invalid or expired" });
    }

    const newAccessToken = generateAccessToken({
      userId: decoded.userId,
      role: decoded.role,
      name: decoded.name,
      email: decoded.email,
    });

    return res.status(200).json({
      token: newAccessToken,
      user: { name: decoded.name, email: decoded.email, role: decoded.role },
    });
  } catch (error) {
    console.error("Error refreshing token:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
