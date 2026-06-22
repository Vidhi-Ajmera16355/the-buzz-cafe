import { useState } from "react";
import axios from "axios";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/inquiries", formData);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-background py-24 flex items-center justify-center">
      <div className="container mx-auto px-6 max-w-md">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
        {status === "success" ? (
          <div className="bg-green-100 text-green-700 p-6 rounded-2xl text-center">
            Message sent successfully! We will get back to you shortly.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-card p-8 rounded-3xl shadow-xl border border-border flex flex-col gap-4">
            <input required type="text" placeholder="Name" className="w-full bg-background border border-border rounded-lg px-4 py-3" onChange={e => setFormData({...formData, name: e.target.value})} />
            <input required type="email" placeholder="Email" className="w-full bg-background border border-border rounded-lg px-4 py-3" onChange={e => setFormData({...formData, email: e.target.value})} />
            <input required type="text" placeholder="Subject" className="w-full bg-background border border-border rounded-lg px-4 py-3" onChange={e => setFormData({...formData, subject: e.target.value})} />
            <textarea required placeholder="Message" className="w-full bg-background border border-border rounded-lg px-4 py-3 min-h-[120px]" onChange={e => setFormData({...formData, message: e.target.value})} />
            <button type="submit" className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl mt-4">Send Message</button>
          </form>
        )}
      </div>
    </div>
  );
}
