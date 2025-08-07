export const Footer = () => {
  return (
    <footer className="bg-coffee-dark text-coffee-cream py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4 text-coffee-gold">Café Aromático</h3>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-8 text-sm">
            <span>© 2024 Café Aromático. Todos os direitos reservados.</span>
            <span>•</span>
            <span>Rua das Flores, 123 - Centro</span>
            <span>•</span>
            <span>(11) 9999-9999</span>
          </div>
          <div className="mt-4 text-xs text-coffee-light">
            Feito com ❤️ e muito café
          </div>
        </div>
      </div>
    </footer>
  );
};