
import React from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const heroImage = "https://i.postimg.cc/d0nt8sTN/PROGRAMA_BÁSICO.png";

  return (
    <section className="relative min-h-[90vh] md:min-h-screen w-full flex items-center bg-white overflow-hidden pt-20">
      {/* Elementos Decorativos de Fundo */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#069DBF]/5 skew-x-12 translate-x-20 z-0"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          
          {/* Coluna de Texto (Esquerda) */}
          <div className="lg:w-1/2 text-left order-2 lg:order-1">
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary text-white text-xs font-black uppercase tracking-[0.3em] mb-6 animate-in slide-in-from-left-4 duration-700">
              Solução de Entrada
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-primary mb-6 leading-none animate-in fade-in slide-in-from-left-8 duration-700 tracking-tighter uppercase">
              Básico
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-xl animate-in fade-in slide-in-from-left-12 duration-1000 leading-relaxed font-medium">
              Ideal para profissionais liberais e novos negócios que precisam de uma presença digital profissional sem altos investimentos iniciais.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-left-16 duration-1000">
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

            <div className="mt-12 flex items-center gap-6 animate-in fade-in duration-1000 delay-500">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden shadow-sm">
                    <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" />
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 font-bold">
                <span className="text-accentGreen1">+500</span> empresas já iniciaram conosco
              </p>
            </div>
          </div>

          {/* Coluna da Imagem (Direita) */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end order-1 lg:order-2 animate-in fade-in zoom-in-95 duration-1000">
            <div className="relative group">
              {/* Brilho decorativo atrás da imagem */}
              <div className="absolute inset-0 bg-secondary/20 blur-[80px] rounded-full group-hover:bg-accentGreen1/20 transition-colors duration-700"></div>
              <img 
                src={heroImage} 
                alt="Plano Básico Digital BR" 
                className="relative z-10 w-full max-w-[500px] h-auto object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.15)] transform hover:translate-y-[-10px] transition-transform duration-500"
              />
              
              {/* Badge Flutuante */}
              <div className="absolute -bottom-6 -right-6 md:right-0 bg-white p-6 rounded-[2rem] shadow-2xl z-20 border border-gray-100 animate-bounce-slow">
                <div className="flex items-center gap-4">
                  <div className="bg-accentGreen1/10 p-3 rounded-2xl">
                    <svg className="w-8 h-8 text-accentGreen1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  </div>
                  <div>
                    <span className="block text-[10px] font-black uppercase text-gray-400 tracking-widest">Início Rápido</span>
                    <span className="block text-primary font-black text-xl leading-none">72 Horas</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
