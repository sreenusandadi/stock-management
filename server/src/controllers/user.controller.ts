import { Request, Response } from "express";
import User from "../models/user.model";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      count: users.length,
      data: users,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
};
