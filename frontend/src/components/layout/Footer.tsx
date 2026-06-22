export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-2xl font-bold tracking-widest uppercase mb-4">TheBuzzCafe</h2>
        <p className="opacity-80 max-w-md mx-auto mb-8">
          Experience premium artisanal coffee and luxury dining in the heart of the city.
        </p>
        <div className="text-sm opacity-60">
          &copy; {new Date().getFullYear()} TheBuzzCafe. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
