
import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const backgroundImage = "https://i.postimg.cc/rpXfmqnN/Propaganda-2.png";

  return (
    <div className="relative min-h-[90vh] md:min-h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-white pt-20">
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0 animate-in fade-in zoom-in-105 duration-1000"
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          backgroundAttachment: 'scroll'
        }}
      ></div>

      {/* Camada de Gradiente */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10"></div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-6 text-left">
        <div className="max-w-4xl">
          <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/90 text-white border border-white/20 text-xs font-bold uppercase tracking-widest mb-6 animate-in slide-in-from-top-4 duration-700 shadow-lg backdrop-blur-sm">
            Digital BR Tecnologia
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-700 font-sans tracking-tight drop-shadow-2xl">
            Sua presença digital <br />
            <span className="text-secondary italic">sob medida.</span>
          </h1>
          <p className="text-lg md:text-2xl text-white mb-12 max-w-2xl animate-in fade-in slide-in-from-bottom-12 duration-1000 font-medium leading-relaxed drop-shadow-md">
            Transformamos o potencial da sua marca em uma vitrine digital sofisticada, moderna e focada em resultados reais.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 animate-in fade-in slide-in-from-bottom-16 duration-1000">
            <Link 
              to="/trabalhos" 
              className="bg-white text-primary hover:bg-secondary hover:text-white px-10 py-4 rounded-2xl font-bold transition-all hover:scale-105 shadow-xl active:scale-95 text-center"
            >
              Ver Portfólio
            </Link>
            <Link 
              to="/precos" 
              className="bg-accentGreen1 hover:bg-accentGreen2 text-white px-10 py-4 rounded-2xl font-bold transition-all hover:scale-105 shadow-xl active:scale-95 text-center"
            >
              Nossos Planos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
