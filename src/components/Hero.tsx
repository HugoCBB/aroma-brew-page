import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-coffee.jpg";

export const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-hero" />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl px-6">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in font-playfair">
          Café Aromático
        </h1>
        <p className="text-xl md:text-2xl text-coffee-cream mb-8 animate-fade-in [animation-delay:0.2s] font-inter">
          O melhor café artesanal da cidade. Cada xícara é uma experiência única de sabor e aroma.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in [animation-delay:0.4s]">
          <Button variant="hero" size="lg" className="text-lg px-8 py-4">
            Ver Cardápio
          </Button>
          <Button variant="heroOutline" size="lg" className="text-lg px-8 py-4">
            Nossa História
          </Button>
        </div>
      </div>
      
      {/* Floating Coffee Bean Animation */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-float">
        <div className="w-6 h-6 bg-coffee-gold rounded-full opacity-80" />
      </div>
    </section>
  );
};