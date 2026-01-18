
import React from 'react';

const Hero: React.FC = () => {
  const backgroundImage = "https://i.postimg.cc/rpXfmqnN/Propaganda-2.png";

  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-black">
      {/* Background Image */}
      <div 
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0 animate-in fade-in zoom-in-105 duration-1000"
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          backgroundAttachment: 'fixed'
        }}
      ></div>

      {/* Dark Overlay for better text readability */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/70 via-black/40 to-black/70 z-10"></div>

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight animate-in fade-in slide-in-from-bottom-8 duration-700 font-sans tracking-tight">
          Sua presença digital <span className="text-secondary">personalizada.</span> <br />
          <span className="text-accentGreen2">Do tamanho do seu negócio.</span>
        </h1>
        <p className="text-lg md:text-2xl text-gray-100 mb-10 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 font-light drop-shadow-lg">
          Transformamos o potencial da sua empresa em uma vitrine digital sofisticada, moderna e pronta para atrair novos clientes.
        </p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center animate-in fade-in slide-in-from-bottom-16 duration-1000">
          <a 
            href="#trabalhos" 
            className="bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-full font-bold transition-all hover:scale-105 shadow-2xl active:scale-95"
          >
            Ver Trabalhos
          </a>
          <a 
            href="#precos" 
            className="bg-accentGreen1 hover:bg-accentGreen2 text-white px-10 py-4 rounded-full font-bold transition-all hover:scale-105 shadow-2xl active:scale-95"
          >
            Conhecer Planos
          </a>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <a href="#trabalhos" className="text-white hover:text-secondary transition-colors" aria-label="Role para baixo">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default Hero;
