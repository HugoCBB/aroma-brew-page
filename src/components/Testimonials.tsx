import { Card, CardContent } from "@/components/ui/card";

export const Testimonials = () => {
  const testimonials = [
    {
      name: "Maria Silva",
      text: "O melhor café que já tomei! O ambiente é aconchegante e o atendimento é excepcional. Virei cliente fiel!",
      rating: 5
    },
    {
      name: "João Santos",
      text: "A qualidade dos grãos é impressionante. Você realmente sente a diferença no sabor. Recomendo muito!",
      rating: 5
    },
    {
      name: "Ana Costa",
      text: "Lugar perfeito para relaxar e trabalhar. Wi-fi excelente, café delicioso e ambiente muito acolhedor.",
      rating: 5
    }
  ];

  return (
    <section className="py-20 px-6 bg-coffee-light/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-coffee-dark mb-4 animate-fade-in font-playfair">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="text-lg text-coffee-medium animate-fade-in [animation-delay:0.1s] font-inter">
            Depoimentos reais de quem já experimentou nossa paixão pelo café
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className={`bg-white shadow-warm hover:shadow-coffee transition-all duration-300 animate-fade-in`} style={{ animationDelay: `${0.2 + index * 0.1}s` }}>
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-coffee-gold fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-coffee-medium mb-4 italic">"{testimonial.text}"</p>
                <p className="font-semibold text-coffee-dark">- {testimonial.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};