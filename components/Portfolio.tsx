
import React, { useState } from 'react';

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
}

const portfolioData: PortfolioItem[] = [
  { id: 0, title: 'Presença Digital VIP', category: 'Destaque', image: 'https://i.postimg.cc/rpXfmqnN/Propaganda-2.png' },
  { id: 1, title: 'Barbearia Clássica', category: 'Barbearias', image: 'https://picsum.photos/seed/barber/600/400' },
  { id: 2, title: 'Loja de Roupas', category: 'Comércio Local', image: 'https://picsum.photos/seed/shop/600/400' },
  { id: 3, title: 'Consultoria Financeira', category: 'Serviços', image: 'https://picsum.photos/seed/finance/600/400' },
  { id: 4, title: 'Barbearia Moderna', category: 'Barbearias', image: 'https://picsum.photos/seed/barber2/600/400' },
  { id: 5, title: 'Restaurante Local', category: 'Comércio Local', image: 'https://picsum.photos/seed/restaurant/600/400' },
  { id: 6, title: 'Advocacia Especializada', category: 'Serviços', image: 'https://picsum.photos/seed/law/600/400' },
];

const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const categories = ['Todos', 'Destaque', 'Barbearias', 'Comércio Local', 'Serviços'];

  const filteredItems = activeCategory === 'Todos' 
    ? portfolioData 
    : portfolioData.filter(item => item.category === activeCategory);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-sans">Nossos Trabalhos</h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-8"></div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  activeCategory === cat 
                  ? 'bg-primary text-white shadow-lg' 
                  : 'bg-white text-primary border border-primary/20 hover:border-primary hover:bg-primary/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="group relative overflow-hidden rounded-2xl shadow-lg bg-white transition-all hover:-translate-y-2 border border-gray-100"
            >
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-105" 
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-accentGreen2 font-bold text-sm mb-1 uppercase tracking-widest">{item.category}</span>
                <h3 className="text-white text-xl font-bold mb-2">{item.title}</h3>
                <div className="w-10 h-0.5 bg-secondary group-hover:w-full transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
