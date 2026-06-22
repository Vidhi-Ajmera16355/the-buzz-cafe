import { motion } from "framer-motion";
import cafe5 from "../images/cafe5.webp";
import buzzcafe6 from "../images/buzzcafe6.webp";
import image7 from "../images/image7.png";

export default function Events() {
  const events = [
    { 
      title: "Latte Art Masterclass", 
      date: "Oct 25, 2026", 
      time: "18:00", 
      desc: "Learn the secrets of perfect milk texturing and pouring.",
      image: cafe5
    },
    { 
      title: "Jazz Night", 
      date: "Nov 02, 2026", 
      time: "20:00", 
      desc: "Live smooth jazz accompanied by our signature evening mocktails.",
      image: buzzcafe6
    },
    { 
      title: "Ethiopian Bean Tasting", 
      date: "Nov 15, 2026", 
      time: "10:00", 
      desc: "An exclusive cupping session exploring single-origin Ethiopian roasts.",
      image: image7
    }
  ];

  return (
    <div className="min-h-screen bg-background py-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Upcoming Events</h1>
          <p className="text-muted-foreground">Join the community.</p>
        </div>

        <div className="flex flex-col gap-8">
          {events.map((ev, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-card p-8 rounded-3xl border border-border shadow-lg flex flex-col md:flex-row gap-8 items-center"
            >
              <div className="w-full md:w-48 aspect-square bg-muted rounded-2xl flex-shrink-0 overflow-hidden relative shadow-md">
                <img src={ev.image} alt={ev.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">{ev.title}</h3>
                <p className="text-secondary font-bold mb-4">{ev.date} • {ev.time}</p>
                <p className="text-muted-foreground mb-6">{ev.desc}</p>
                <button className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-bold hover:bg-primary/90">
                  RSVP Now
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
