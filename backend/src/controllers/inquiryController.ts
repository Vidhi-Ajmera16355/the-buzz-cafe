import { Request, Response } from "express";
import Inquiry from "../models/Inquiry";
import nodemailer from "nodemailer";

const sendNotificationEmail = async (subject: string, text: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: '"TheBuzzCafe Website" <no-reply@thebuzzcafe.com>',
      to: process.env.ADMIN_EMAIL,
      subject,
      text,
    });
  } catch (error) {
    console.error("Email send failed:", error);
  }
};

export const createInquiry = async (req: Request, res: Response) => {
  try {
    const inquiry = await Inquiry.create(req.body);
    
    sendNotificationEmail(
      `New Inquiry: ${req.body.subject}`,
      `From: ${req.body.name} (${req.body.email})\nPhone: ${req.body.phone}\nMessage: ${req.body.message}`
    );

    res.status(201).json(inquiry);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getInquiries = async (req: Request, res: Response) => {
  try {
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateInquiryStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const inquiry = await Inquiry.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!inquiry) return res.status(404).json({ message: "Inquiry not found" });
    res.json(inquiry);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
