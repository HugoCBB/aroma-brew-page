import { Button } from "@/components/ui/button";

export const Contact = () => {
  return (
    <section className="py-20 px-6 bg-gradient-coffee text-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl font-bold mb-6 font-playfair">
              Visite Nossa Cafeteria
            </h2>
            <p className="text-lg text-coffee-cream mb-8 font-inter">
              Estamos ansiosos para recebê-lo em nosso espaço aconchegante. 
              Venha experimentar nossos cafés especiais e sentir o aroma que 
              conquista corações.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-coffee-gold rounded-full flex-shrink-0" />
                <span>Rua das Flores, 123 - Centro</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-coffee-gold rounded-full flex-shrink-0" />
                <span>Segunda a Domingo: 7h às 22h</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-coffee-gold rounded-full flex-shrink-0" />
                <span>(11) 9999-9999</span>
              </div>
            </div>
            
            <Button variant="gold" size="lg">
              Como Chegar
            </Button>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 animate-fade-in [animation-delay:0.2s]">
            <h3 className="text-2xl font-bold mb-6 font-playfair">Entre em Contato</h3>
            <form className="space-y-4">
              <input 
                type="text" 
                placeholder="Seu nome" 
                className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-coffee-gold"
              />
              <input 
                type="email" 
                placeholder="Seu e-mail" 
                className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-coffee-gold"
              />
              <textarea 
                placeholder="Sua mensagem" 
                rows={4}
                className="w-full p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-coffee-gold"
              />
              <Button type="submit" variant="gold" className="w-full">
                Enviar Mensagem
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};