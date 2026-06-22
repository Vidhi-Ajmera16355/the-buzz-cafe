import { motion } from "framer-motion";
import theBuzzCafe1 from "../images/theBuzzCafe1.webp";
import theBuzzCafe2 from "../images/theBuzzCafe2.webp";
import theBuzzCafe3 from "../images/theBuzzCafe3.webp";
import theBuzzCafe4 from "../images/theBuzzCafe4.webp";
import cafe5 from "../images/cafe5.webp";
import buzzcafe6 from "../images/buzzcafe6.webp";
import image from "../images/image.png";
import image7 from "../images/image7.png";

const galleryImages = [
  { src: theBuzzCafe1, alt: "Cozy Cafe Area" },
  { src: theBuzzCafe2, alt: "Barista Espresso Cup" },
  { src: theBuzzCafe3, alt: "Fresh Pastries and Coffee" },
  { src: theBuzzCafe4, alt: "Kyoto Cold Brew Glass" },
  { src: cafe5, alt: "Aesthetic Coffee Drip" },
  { src: buzzcafe6, alt: "Pouring Hot Latte Art" },
  { src: image, alt: "Cafe Ambient Seating" },
  { src: image7, alt: "Special Menu Serving" }
];

export default function Gallery() {
  return (
    <div className="min-h-screen bg-background py-24">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Gallery</h1>
          <p className="text-muted-foreground">The aesthetic of TheBuzzCafe.</p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {galleryImages.map((img, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="break-inside-avoid rounded-2xl overflow-hidden bg-muted relative shadow-lg group cursor-pointer"
            >
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-white font-semibold text-lg">{img.alt}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
