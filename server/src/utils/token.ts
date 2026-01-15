import jwt from "jsonwebtoken";

export const generateAccessToken = (user: any) => {
  const token = jwt.sign(
    { userId: user._id, role: user.role, name: user.name },
    process.env.JWT_SECRET!
  );
};
