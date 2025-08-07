import { Card, CardContent } from "@/components/ui/card";
import productsImage from "@/assets/coffee-products.jpg";

export const Products = () => {
  const products = [
    {
      name: "Espresso Tradicional",
      description: "Café forte e encorpado, extraído na pressão perfeita",
      price: "R$ 8,00"
    },
    {
      name: "Cappuccino Artesanal",
      description: "Cremoso e suave, com espuma de leite vaporizado",
      price: "R$ 12,00"
    },
    {
      name: "Café Coado Premium",
      description: "Método tradicional brasileiro com grãos especiais",
      price: "R$ 10,00"
    },
    {
      name: "Cold Brew Especial",
      description: "Extração a frio por 12 horas, refrescante e doce",
      price: "R$ 14,00"
    },
    {
      name: "Latte com Arte",
      description: "Café com leite vaporizado e desenhos artísticos",
      price: "R$ 15,00"
    },
    {
      name: "Mocha Deluxe",
      description: "Café, chocolate belga e chantilly artesanal",
      price: "R$ 16,00"
    }
  ];

  return (
    <section className="py-20 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-coffee-dark mb-4 animate-fade-in font-playfair">
            Nossos Cafés Especiais
          </h2>
          <p className="text-lg text-coffee-medium max-w-2xl mx-auto animate-fade-in [animation-delay:0.1s] font-inter">
            Cada receita é cuidadosamente desenvolvida para proporcionar uma experiência 
            sensorial única e inesquecível.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div 
            className="h-96 bg-cover bg-center rounded-lg shadow-coffee animate-fade-in [animation-delay:0.2s]"
            style={{ backgroundImage: `url(${productsImage})` }}
          />
          <div className="space-y-6 animate-fade-in [animation-delay:0.3s]">
            {products.slice(0, 3).map((product, index) => (
              <Card key={index} className="bg-gradient-card border-coffee-light/20 shadow-warm hover:shadow-coffee transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-coffee-dark text-lg">{product.name}</h3>
                    <span className="font-bold text-coffee-gold text-lg">{product.price}</span>
                  </div>
                  <p className="text-coffee-medium">{product.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 animate-fade-in [animation-delay:0.4s]">
          {products.slice(3).map((product, index) => (
            <Card key={index} className="bg-gradient-card border-coffee-light/20 shadow-warm hover:shadow-coffee transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-coffee-dark">{product.name}</h3>
                  <span className="font-bold text-coffee-gold">{product.price}</span>
                </div>
                <p className="text-coffee-medium text-sm">{product.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};