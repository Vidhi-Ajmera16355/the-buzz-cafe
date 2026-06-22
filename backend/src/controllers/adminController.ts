import { Request, Response } from "express";
import Admin from "../models/Admin";
import jwt from "jsonwebtoken";

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "secret", { expiresIn: "30d" });
};

export const authAdmin = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const admin: any = await Admin.findOne({ email });

    if (admin && (await admin.matchPassword(password))) {
      res.json({
        _id: admin._id,
        email: admin.email,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
