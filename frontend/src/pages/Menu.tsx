import { motion } from "framer-motion";

export default function Menu() {
  const categories = ["Coffee", "Tea", "Food", "Dessert"];
  const items = [
    { name: "Truffle Honey Latte", price: 350, category: "Coffee", desc: "Our signature blend with white truffle oil and wild honey." },
    { name: "Kyoto Cold Brew", price: 280, category: "Coffee", desc: "Slow-steeped for 18 hours using single-origin Japanese beans." },
    { name: "Matcha Einspänner", price: 320, category: "Tea", desc: "Ceremonial grade matcha topped with sweet cream." },
    { name: "Wagyu Beef Sando", price: 850, category: "Food", desc: "A5 Wagyu on Hokkaido milk bread with tonkatsu sauce." },
    { name: "Yuzu Tart", price: 400, category: "Dessert", desc: "Tangy yuzu curd in a buttery shortbread crust." },
  ];

  return (
    <div className="min-h-screen bg-background py-24">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Our Menu</h1>
          <p className="text-muted-foreground">Curated selections of the finest ingredients.</p>
        </div>

        <div className="flex gap-4 justify-center mb-12 flex-wrap">
          {categories.map((cat, i) => (
            <button key={i} className="px-6 py-2 rounded-full border border-border hover:bg-primary hover:text-primary-foreground transition-colors font-semibold">
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {items.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 bg-card rounded-2xl border border-border flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <span className="text-secondary font-bold">₹{item.price}</span>
                </div>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
