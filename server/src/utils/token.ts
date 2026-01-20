import jwt from "jsonwebtoken";
import { Schema } from "mongoose";

export interface AccessTokenPayload {
  userId: Schema.Types.ObjectId | string;
  email?: string;
  role: string;
  name?: string;
}

export const generateAccessToken = (user: AccessTokenPayload): string => {
  // Short-lived access token
  return jwt.sign(user, process.env.JWT_SECRET!, { expiresIn: "10s" });
};

export const generateRefreshToken = (user: AccessTokenPayload): string => {
  // Long-lived refresh token
  return jwt.sign(user, process.env.JWT_REFRESH_SECRET!, { expiresIn: "1h" });
};

export const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as AccessTokenPayload;
  } catch (error) {
    return null;
  }
};

export const decodeAccessToken = (token: string) => {
  try {
    return jwt.decode(token);
  } catch (error) {
    return null;
  }
};

export const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET!,
    ) as AccessTokenPayload;
  } catch (error) {
    return null;
  }
};
