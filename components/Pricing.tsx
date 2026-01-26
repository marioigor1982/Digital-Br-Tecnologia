
import React from 'react';

interface PricingPlan {
  name: string;
  price: string;
  maintenance: string;
  features: string[];
  highlight?: string;
  customDomainPrice: string;
  customDomainMaint: string;
  isPopular?: boolean;
  isPremium?: boolean;
}

const plans: PricingPlan[] = [
  {
    name: 'Básico',
    price: 'R$ 450,00',
    maintenance: 'R$ 29,90/mês',
    features: ['Landing Page', 'Domínio Incluso', 'Design Responsivo', 'SEO Básico'],
    customDomainPrice: '400',
    customDomainMaint: '20',
  },
  {
    name: 'PLUS',
    price: 'R$ 650,00',
    maintenance: 'R$ 49,90/mês',
    features: ['Site com Links', 'Galeria Completa', 'Vídeos Demonstrativos', 'Integração Social'],
    isPopular: true,
    customDomainPrice: '600',
    customDomainMaint: '40',
  },
  {
    name: 'DIAMANTE',
    price: 'R$ 850,00',
    maintenance: 'R$ 69,90/mês',
    features: ['Tudo do PLUS', 'Chat de Inteligência Artificial', 'Suporte Prioritário', 'E-mails Corporativos'],
    isPremium: true,
    customDomainPrice: '750',
    customDomainMaint: '50',
  },
];

const Pricing: React.FC = () => {
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
            // Lógica de cores baseada no tipo de plano
            let cardClasses = "";
            let textPrimaryClasses = "";
            let textSecondaryClasses = "";
            let buttonClasses = "";
            let iconClasses = "";

            if (plan.isPremium) {
              // Estilo DIAMANTE: Degradê Azul/Verde e Texto Gelo
              cardClasses = "bg-gradient-to-br from-primary via-secondary to-accentGreen1 text-[#F2F2F2] scale-105 z-10 shadow-2xl border-none";
              textPrimaryClasses = "text-white";
              textSecondaryClasses = "text-white/80";
              buttonClasses = "bg-[#F2F2F2] text-primary hover:bg-white";
              iconClasses = "text-white";
            } else if (plan.isPopular) {
              // Estilo PLUS: Azul Sólido
              cardClasses = "bg-primary text-white scale-105 z-10 shadow-2xl border-4 border-secondary";
              textPrimaryClasses = "text-secondary";
              textSecondaryClasses = "text-gray-200";
              buttonClasses = "bg-secondary text-white hover:bg-white hover:text-primary";
              iconClasses = "text-secondary";
            } else {
              // Estilo BÁSICO: Branco
              cardClasses = "bg-white text-primary border border-gray-100 shadow-sm";
              textPrimaryClasses = "text-primary";
              textSecondaryClasses = "text-gray-500";
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
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <svg className={`flex-shrink-0 w-6 h-6 ${iconClasses}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-base font-semibold leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className={`mt-auto pt-8 border-t ${plan.isPremium || plan.isPopular ? 'border-white/10' : 'border-gray-100'}`}>
                  <p className="text-[10px] font-bold mb-4 uppercase tracking-widest opacity-70">
                    Opcional Domínio Próprio: R$ {plan.customDomainPrice} + R$ {plan.customDomainMaint}/mês
                  </p>
                  <button className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-lg active:scale-95 ${buttonClasses}`}>
                    Contratar Agora
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
