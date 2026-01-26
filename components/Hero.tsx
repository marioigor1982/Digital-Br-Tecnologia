
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface HeroSlide {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  accent: string;
  badgeText: string;
}

const slides: HeroSlide[] = [
  {
    id: 'welcome',
    title: 'Digital BR',
    tagline: 'Inovação e Tecnologia',
    description: 'Transformamos o potencial da sua marca em uma vitrine digital sofisticada, moderna e focada em resultados reais.',
    image: 'https://i.postimg.cc/rp0m1XMK/DIGITAL-TRANSPARENT.png',
    accent: 'bg-primary',
    badgeText: 'Líder Digital'
  },
  {
    id: 'basico',
    title: 'Básico',
    tagline: 'Solução de Entrada',
    description: 'Ideal para profissionais liberais e novos negócios que precisam de uma presença digital profissional sem altos investimentos iniciais.',
    image: 'https://i.postimg.cc/d0nt8sTN/PROGRAMA_BÁSICO.png',
    accent: 'bg-secondary',
    badgeText: '72 Horas'
  },
  {
    id: 'plus',
    title: 'Plus',
    tagline: 'Expansão e Engajamento',
    description: 'Perfeito para empresas que já possuem um fluxo de clientes e precisam demonstrar autoridade e variedade de produtos/serviços.',
    image: 'https://i.postimg.cc/Dz5yqvbC/PROGRAMA_PLUS.png',
    accent: 'bg-primary',
    badgeText: 'Destaque'
  },
  {
    id: 'diamante',
    title: 'Diamante',
    tagline: 'Elite e Automação',
    description: 'A solução definitiva para empresas que buscam escala, automação de atendimento e uma imagem corporativa impecável.',
    image: 'https://i.postimg.cc/6Qz5dWG1/PROGRAMA_DIAMANTE.png',
    accent: 'bg-accentGreen1',
    badgeText: 'IA Ativa'
  }
];

const Hero: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[95vh] md:min-h-screen w-full flex items-center bg-white overflow-hidden pt-20">
      {/* Elementos Decorativos de Fundo que reagem ao slide */}
      <div className={`absolute top-0 right-0 w-1/2 h-full transition-colors duration-1000 skew-x-12 translate-x-20 z-0 ${current === 3 ? 'bg-accentGreen1/5' : 'bg-[#069DBF]/5'}`}></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 min-h-[650px]">
          
          {/* Coluna de Texto (Esquerda) com Transição de Opacidade */}
          <div className="lg:w-1/2 text-left order-2 lg:order-1 relative h-[450px] flex items-center">
            {slides.map((slide, index) => (
              <div 
                key={slide.id}
                className={`absolute inset-0 flex flex-col justify-center transition-all duration-1000 transform ${
                  index === current 
                  ? 'opacity-100 translate-x-0 pointer-events-auto' 
                  : 'opacity-0 -translate-x-12 pointer-events-none'
                }`}
              >
                <span className={`inline-block w-fit px-4 py-1.5 rounded-full text-white text-xs font-black uppercase tracking-[0.3em] mb-6 shadow-sm ${slide.accent}`}>
                  {slide.tagline}
                </span>
                <h1 className="text-5xl md:text-8xl font-black text-primary mb-6 leading-none tracking-tighter uppercase">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-2xl text-gray-600 mb-10 max-w-xl leading-relaxed font-medium">
                  {slide.description}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    to="/precos" 
                    className="bg-primary text-white hover:bg-secondary px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-105 shadow-2xl active:scale-95 text-center flex items-center justify-center"
                  >
                    Garantir meu Plano
                  </Link>
                  <Link 
                    to="/trabalhos" 
                    className="bg-gray-100 text-primary hover:bg-gray-200 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all text-center"
                  >
                    Ver Portfólio
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Coluna da Imagem (Direita) com Cross-Fade e Tamanho Grande */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end order-1 lg:order-2 relative h-[450px] md:h-[650px] w-full">
            <div className="relative w-full max-w-[650px] h-full">
              {slides.map((slide, index) => (
                <div 
                  key={slide.id}
                  className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 transform ${
                    index === current 
                    ? 'opacity-100 scale-100 rotate-0 translate-y-0' 
                    : 'opacity-0 scale-95 rotate-2 translate-y-12'
                  }`}
                >
                  {/* Brilho decorativo individual */}
                  <div className={`absolute inset-0 blur-[100px] rounded-full transition-colors duration-1000 ${index === 3 ? 'bg-accentGreen1/25' : 'bg-secondary/25'}`}></div>
                  
                  <img 
                    src={slide.image} 
                    alt={`Plano ${slide.title}`} 
                    className={`relative z-10 w-full h-full object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.15)] ${index === 0 ? 'scale-110' : 'scale-100'}`}
                  />
                  
                  {/* Badge Flutuante específico de cada slide */}
                  <div className="absolute -bottom-6 -right-6 md:right-0 bg-white p-6 rounded-[2rem] shadow-2xl z-20 border border-gray-100 animate-bounce-slow">
                    <div className="flex items-center gap-4">
                      <div className={`${slide.accent.replace('bg-', 'bg-')}/10 p-3 rounded-2xl`}>
                        <svg className={`w-8 h-8 ${slide.accent.replace('bg-', 'text-')}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                      </div>
                      <div>
                        <span className="block text-[10px] font-black uppercase text-gray-400 tracking-widest">Destaque</span>
                        <span className="block text-primary font-black text-xl leading-none">{slide.badgeText}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Indicadores de Carrossel (Dots) */}
        <div className="flex justify-start gap-3 mt-12">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-2 transition-all duration-500 rounded-full ${
                idx === current ? 'w-12 bg-primary' : 'w-3 bg-gray-200 hover:bg-gray-300'
              }`}
              aria-label={`Ir para slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
      
      <style>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
      `}</style>
    </section>
  );
};

export default Hero;
