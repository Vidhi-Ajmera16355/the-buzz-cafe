import { motion } from "framer-motion";
import theBuzzCafe1 from "../images/theBuzzCafe1.webp";

export default function About() {
  return (
    <div className="min-h-screen bg-background py-24">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Our Story</h1>
          <div className="aspect-video bg-muted rounded-3xl mb-12 overflow-hidden relative shadow-2xl">
             <img src={theBuzzCafe1} alt="Cafe Interior" className="w-full h-full object-cover" />
          </div>
          <p className="text-xl text-muted-foreground leading-relaxed text-left mb-8">
            Founded in 2026, TheBuzzCafe was born out of a profound passion for coffee craftsmanship. We travel the globe to source the rarest, most exceptional beans, bringing them back to our roastery to unlock their fullest potential.
          </p>
          <p className="text-xl text-muted-foreground leading-relaxed text-left">
            But we are more than just coffee. We are an atmosphere. A sanctuary for creatives, professionals, and dreamers to converge over a shared love for the extraordinary.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
