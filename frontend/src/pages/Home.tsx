import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Coffee, Star } from "lucide-react";

import theBuzzCafe2 from "../images/theBuzzCafe2.webp";
import theBuzzCafe3 from "../images/theBuzzCafe3.webp";
import theBuzzCafe4 from "../images/theBuzzCafe4.webp";

const signatureCreations = [
  {
    name: "Truffle Honey Latte",
    price: 350,
    desc: "Our signature espresso blended with steamed milk, infused with black truffle honey and dusted with 24k gold leaf.",
    image: theBuzzCafe2
  },
  {
    name: "Wagyu Beef Sando",
    price: 850,
    desc: "Premium A5 Wagyu beef katsu, house-made tonkatsu sauce, served on thick-cut shokupan bread.",
    image: theBuzzCafe3
  },
  {
    name: "Kyoto Cold Brew",
    price: 280,
    desc: "Single-origin Ethiopian beans slowly steeped for 18 hours, served over artisanal ice blocks.",
    image: theBuzzCafe4
  }
];

export default function Home() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-primary/95 z-0" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-30 z-0" />
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-secondary font-bold tracking-[0.3em] uppercase mb-6 block text-sm">
              Welcome to the Extraordinary
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-primary-foreground mb-8 leading-tight">
              Crafting Coffee, <br /> Curating Moments.
            </h1>
            <p className="text-primary-foreground/80 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Experience the pinnacle of artisanal coffee in an atmosphere designed for those who appreciate the finer things in life.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/reservations" className="bg-secondary text-secondary-foreground px-8 py-4 rounded-full font-bold text-lg hover:bg-secondary/90 transition-colors w-full sm:w-auto">
                Reserve a Table
              </Link>
              <Link to="/menu" className="bg-transparent border border-primary-foreground/30 text-primary-foreground px-8 py-4 rounded-full font-bold text-lg hover:bg-primary-foreground/10 transition-colors flex items-center justify-center gap-2 w-full sm:w-auto">
                Explore Menu <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Menu Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Signature Creations</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Discover our master roaster's finest selections, crafted with precision and passion.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {signatureCreations.map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-background rounded-3xl p-6 border border-border shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-video bg-muted rounded-2xl mb-6 overflow-hidden relative shadow-md">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-foreground">{item.name}</h3>
                    <span className="text-secondary font-bold">₹{item.price}</span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
