import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-primary tracking-wider uppercase">
          TheBuzzCafe
        </Link>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link to="/" className="hover:text-secondary transition-colors">Home</Link>
          <Link to="/menu" className="hover:text-secondary transition-colors">Menu</Link>
          <Link to="/about" className="hover:text-secondary transition-colors">About</Link>
          <Link to="/gallery" className="hover:text-secondary transition-colors">Gallery</Link>
          <Link to="/events" className="hover:text-secondary transition-colors">Events</Link>
          <Link to="/contact" className="hover:text-secondary transition-colors">Contact</Link>
        </div>
        <div>
          <Link to="/reservations" className="bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm font-bold hover:bg-primary/90 transition-colors">
            Book Table
          </Link>
        </div>
      </div>
    </nav>
  );
}
