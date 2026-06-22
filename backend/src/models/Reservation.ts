import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    guests: { type: Number, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    specialRequest: { type: String },
    status: {
      type: String,
      enum: ["Pending", "Contacted", "Confirmed", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Reservation = mongoose.model("Reservation", reservationSchema);
export default Reservation;
