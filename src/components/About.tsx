export const About = () => {
  return (
    <section className="py-20 px-6 bg-coffee-cream">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h2 className="text-4xl font-bold text-coffee-dark mb-6 font-playfair">
              Nossa Paixão pelo Café
            </h2>
            <p className="text-lg text-coffee-medium mb-6 leading-relaxed font-inter">
              Há mais de 15 anos, dedicamos nossa vida a torrar os melhores grãos e criar 
              experiências únicas para nossos clientes. Cada xícara é preparada com carinho 
              e técnica apurada.
            </p>
            <p className="text-lg text-coffee-medium leading-relaxed font-inter">
              Nossos grãos são selecionados diretamente dos produtores, garantindo 
              qualidade excepcional e práticas sustentáveis que respeitam o meio ambiente 
              e valorizam o trabalho dos cafeicultores.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 animate-fade-in [animation-delay:0.2s]">
            <div className="bg-white rounded-lg p-6 shadow-warm text-center">
              <div className="text-3xl font-bold text-coffee-dark mb-2">15+</div>
              <div className="text-coffee-medium">Anos de Experiência</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-warm text-center">
              <div className="text-3xl font-bold text-coffee-dark mb-2">1000+</div>
              <div className="text-coffee-medium">Clientes Satisfeitos</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-warm text-center">
              <div className="text-3xl font-bold text-coffee-dark mb-2">20+</div>
              <div className="text-coffee-medium">Variedades de Café</div>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-warm text-center">
              <div className="text-3xl font-bold text-coffee-dark mb-2">100%</div>
              <div className="text-coffee-medium">Grãos Selecionados</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};