import { Request, Response } from "express";
import Reservation from "../models/Reservation";
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

export const createReservation = async (req: Request, res: Response) => {
  try {
    const reservation = await Reservation.create(req.body);
    
    // Fire and forget email
    sendNotificationEmail(
      "New Reservation Request",
      `New reservation from ${req.body.name} for ${req.body.guests} guests on ${req.body.date} at ${req.body.time}. Contact: ${req.body.phone}`
    );

    res.status(201).json(reservation);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getReservations = async (req: Request, res: Response) => {
  try {
    const reservations = await Reservation.find({}).sort({ createdAt: -1 });
    res.json(reservations);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateReservationStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const reservation = await Reservation.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!reservation) return res.status(404).json({ message: "Reservation not found" });
    res.json(reservation);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
