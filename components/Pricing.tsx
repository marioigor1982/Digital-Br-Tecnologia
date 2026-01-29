
import React, { useState } from 'react';

interface PricingPlan {
  name: string;
  price: string;
  maintenance: string;
  features: string[];
  description: string;
  imageUrl: string;
  isPopular?: boolean;
  isPremium?: boolean;
}

const plans: PricingPlan[] = [
  {
    name: 'Básico',
    price: 'R$ 450,00',
    maintenance: 'R$ 29,90/mês',
    description: 'Ideal para profissionais liberais e novos negócios que precisam de uma presença digital profissional sem altos investimentos iniciais.',
    imageUrl: 'https://i.postimg.cc/d0nt8sTN/PROGRAMA_BÁSICO.png',
    features: [
      'Landing Page: Uma página única focada em conversão.',
      'Domínio Incluso: Facilidade total sem burocracia.',
      'Design Responsivo: Perfeito em qualquer celular.',
      'SEO Básico: Indexação inicial garantida no Google.'
    ]
  },
  {
    name: 'PLUS',
    price: 'R$ 650,00',
    maintenance: 'R$ 49,90/mês',
    description: 'Perfeito para empresas que já possuem um fluxo de clientes e precisam demonstrar autoridade e variedade.',
    imageUrl: 'https://i.postimg.cc/Dz5yqvbC/PROGRAMA_PLUS.png',
    isPopular: true,
    features: [
      'Site com Links: Navegação completa e estruturada.',
      'Galeria & Vídeos: Prova social e impacto visual.',
      'Integração Social: Conecta diretamente ao Instagram/WhatsApp.',
      'Design Moderno: Estética refinada para sua marca.'
    ]
  },
  {
    name: 'DIAMANTE',
    price: 'R$ 850,00',
    maintenance: 'R$ 69,90/mês',
    description: 'Solução definitiva para empresas que buscam escala, automação e uma imagem corporativa impecável.',
    imageUrl: 'https://i.postimg.cc/6Qz5dWG1/PROGRAMA_DIAMANTE.png',
    isPremium: true,
    features: [
      'Tudo do PLUS e mais.',
      'Chat de IA: Assistente 24h que atende seus clientes.',
      'E-mails Corporativos: Muito mais credibilidade (contato@suaempresa).',
      'Suporte Prioritário: Você na frente da fila em qualquer solicitação.'
    ]
  },
];

const Pricing: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(null);

  const openWhatsApp = (plan: PricingPlan) => {
    const message = encodeURIComponent(`Olá! Gostaria de contratar o plano ${plan.name} da Digital BR Tecnologia.`);
    window.open(`https://wa.me/5511940050060?text=${message}`, '_blank');
  };

  return (
    <section className="py-16 md:py-24 bg-[#F8FAFC]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">Escolha seu Plano</h2>
          <div className="w-24 h-1.5 bg-secondary mx-auto mb-8 rounded-full"></div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Soluções que cabem no seu bolso e elevam o nível do seu negócio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {plans.map((plan) => {
            let cardClasses = "";
            let textPrimaryClasses = "";
            let textSecondaryClasses = "";
            let buttonClasses = "";
            let iconClasses = "";

            if (plan.isPremium) {
              cardClasses = "bg-gradient-to-br from-primary via-secondary to-accentGreen1 text-[#F2F2F2] scale-105 z-10 shadow-2xl border-none";
              textPrimaryClasses = "text-white";
              textSecondaryClasses = "text-white/80";
              buttonClasses = "bg-[#F2F2F2] text-primary hover:bg-white";
              iconClasses = "text-white";
            } else if (plan.isPopular) {
              cardClasses = "bg-primary text-white scale-105 z-10 shadow-2xl border-4 border-secondary";
              textPrimaryClasses = "text-secondary";
              textSecondaryClasses = "text-gray-200";
              buttonClasses = "bg-secondary text-white hover:bg-white hover:text-primary";
              iconClasses = "text-secondary";
            } else {
              cardClasses = "bg-gradient-to-br from-[#069DBF]/15 to-[#F2F2F2] text-primary border border-secondary/10 shadow-sm";
              textPrimaryClasses = "text-primary";
              textSecondaryClasses = "text-gray-600";
              buttonClasses = "bg-primary text-white hover:bg-secondary";
              iconClasses = "text-accentGreen1";
            }

            return (
              <div 
                key={plan.name}
                className={`relative flex flex-col p-10 rounded-[2.5rem] transition-all hover:shadow-2xl duration-500 ${cardClasses}`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-accentGreen1 text-white text-xs font-black px-6 py-2 rounded-full uppercase tracking-widest shadow-lg">
                    Mais Popular
                  </div>
                )}
                
                {plan.isPremium && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-white text-primary text-xs font-black px-6 py-2 rounded-full uppercase tracking-widest shadow-lg border-2 border-primary">
                    Elite Digital
                  </div>
                )}
                
                <h3 className={`text-2xl font-black mb-4 uppercase tracking-tight ${textPrimaryClasses}`}>
                  {plan.name}
                </h3>
                
                <div className="mb-8">
                  <span className="text-4xl font-black">{plan.price}</span>
                  <p className={`text-sm mt-2 font-bold opacity-80 ${textSecondaryClasses}`}>
                    Manutenção: {plan.maintenance}
                  </p>
                </div>

                <ul className="space-y-5 mb-10 flex-grow">
                  {plan.features.slice(0, 4).map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <svg className={`flex-shrink-0 w-6 h-6 ${iconClasses}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-base font-semibold leading-snug">{feature.split(':')[0]}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => setSelectedPlan(plan)}
                  className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-lg active:scale-95 ${buttonClasses}`}
                >
                  Contratar Agora
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {selectedPlan && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-6">
          <div 
            className="absolute inset-0 bg-primary/40 backdrop-blur-md"
            onClick={() => setSelectedPlan(null)}
          ></div>
          
          <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[3rem] shadow-2xl flex flex-col md:flex-row overflow-hidden animate-in zoom-in-95 duration-500">
            <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-8">
              <img 
                src={selectedPlan.imageUrl} 
                alt={`Detalhes ${selectedPlan.name}`} 
                className="w-full h-auto object-contain rounded-2xl shadow-lg"
              />
            </div>

            <div className="md:w-1/2 p-8 md:p-12 flex flex-col">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-primary text-4xl font-black uppercase tracking-tighter">{selectedPlan.name}</h3>
                <button onClick={() => setSelectedPlan(null)} className="p-2 hover:bg-gray-100 rounded-full text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>

              <p className="text-gray-600 text-lg mb-8 italic">"{selectedPlan.description}"</p>

              <div className="space-y-6 mb-10">
                {selectedPlan.features.map((feature, idx) => {
                  const [title, desc] = feature.split(':');
                  return (
                    <div key={idx} className="flex gap-4">
                      <div className="mt-1 bg-accentGreen1/10 p-1.5 rounded-lg flex-shrink-0 text-accentGreen1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      </div>
                      <div>
                        <strong className="text-primary block font-bold">{title}</strong>
                        <span className="text-gray-500 text-sm">{desc}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <button 
                onClick={() => openWhatsApp(selectedPlan)}
                className="w-full bg-accentGreen1 hover:bg-accentGreen2 text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all"
              >
                Finalizar no WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Pricing;
