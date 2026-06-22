import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function Reservation() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: 2,
    date: "",
    time: "",
    specialRequest: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await axios.post("http://localhost:5000/api/reservations", formData);
      setStatus("success");
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-background">
        <div className="text-center bg-card p-12 rounded-3xl border border-border shadow-2xl max-w-md">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            ✓
          </div>
          <h2 className="text-2xl font-bold mb-4">Request Received</h2>
          <p className="text-muted-foreground mb-8">Your reservation request has been sent to our team. We will review it and confirm with you shortly via email.</p>
          <button onClick={() => setStatus("idle")} className="bg-primary text-primary-foreground px-6 py-3 rounded-full font-bold">
            Make Another Booking
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-24 bg-background min-h-screen">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4">Book Your Table</h1>
          <p className="text-muted-foreground">Reserve your experience at TheBuzzCafe. All requests are subject to confirmation.</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="bg-card p-8 rounded-3xl border border-border shadow-xl flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Full Name</label>
              <input required type="text" className="w-full bg-background border border-border rounded-lg px-4 py-3" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Email</label>
              <input required type="email" className="w-full bg-background border border-border rounded-lg px-4 py-3" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Phone</label>
              <input required type="tel" className="w-full bg-background border border-border rounded-lg px-4 py-3" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Date</label>
              <input required type="date" className="w-full bg-background border border-border rounded-lg px-4 py-3" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Time</label>
              <input required type="time" className="w-full bg-background border border-border rounded-lg px-4 py-3" value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Number of Guests</label>
            <input required type="number" min="1" max="20" className="w-full bg-background border border-border rounded-lg px-4 py-3" value={formData.guests} onChange={e => setFormData({...formData, guests: parseInt(e.target.value)})} />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold">Special Requests (Optional)</label>
            <textarea className="w-full bg-background border border-border rounded-lg px-4 py-3 min-h-[100px]" value={formData.specialRequest} onChange={e => setFormData({...formData, specialRequest: e.target.value})}></textarea>
          </div>

          <button disabled={status === "loading"} type="submit" className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl hover:bg-primary/90 mt-4 disabled:opacity-50">
            {status === "loading" ? "Submitting..." : "Request Reservation"}
          </button>
        </form>
      </div>
    </div>
  );
}
