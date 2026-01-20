
import React, { useState } from 'react';

interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
}

const portfolioData: PortfolioItem[] = [
  { id: 0, title: 'Vitrine VIP Digital', category: 'Destaque', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800' },
  { id: 1, title: 'Barbearia Old School', category: 'Barbearias', image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800' },
  { id: 2, title: 'E-commerce Fashion', category: 'Comércio Local', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800' },
  { id: 3, title: 'Finanças Pro', category: 'Serviços', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800' },
  { id: 4, title: 'Corte & Estilo', category: 'Barbearias', image: 'https://images.unsplash.com/photo-1621605815841-aa897af680cb?auto=format&fit=crop&q=80&w=800' },
  { id: 5, title: 'Gastronomia Local', category: 'Comércio Local', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800' },
];

const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const categories = ['Todos', 'Destaque', 'Barbearias', 'Comércio Local', 'Serviços'];

  const filteredItems = activeCategory === 'Todos' 
    ? portfolioData 
    : portfolioData.filter(item => item.category === activeCategory);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Excelência em cada pixel.</h2>
            <p className="text-gray-600 text-lg">Projetos desenvolvidos com tecnologia de ponta e foco total na experiência do usuário final.</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${
                  activeCategory === cat 
                  ? 'bg-primary text-white shadow-lg' 
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredItems.map((item) => (
            <div 
              key={item.id} 
              className="group bg-background rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100"
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <span className="text-white font-bold bg-secondary/80 px-4 py-1 rounded-full text-xs">Ver Projeto</span>
                </div>
              </div>
              <div className="p-8">
                <span className="text-accentGreen1 font-bold text-xs uppercase tracking-widest mb-2 block">{item.category}</span>
                <h3 className="text-primary text-2xl font-bold">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
