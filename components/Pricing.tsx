
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
    customDomainPrice: '750',
    customDomainMaint: '50',
  },
];

const Pricing: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Escolha seu Plano</h2>
          <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Soluções que cabem no seu bolso e elevam o nível do seu negócio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`relative flex flex-col p-8 rounded-3xl transition-all hover:shadow-2xl ${
                plan.isPopular 
                ? 'bg-primary text-white scale-105 z-10 shadow-xl border-4 border-secondary' 
                : 'bg-background text-primary border border-gray-200'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-accentGreen1 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                  Mais Popular
                </div>
              )}
              
              <h3 className={`text-2xl font-bold mb-4 ${plan.isPopular ? 'text-secondary' : 'text-primary'}`}>
                {plan.name}
              </h3>
              
              <div className="mb-6">
                <span className="text-4xl font-bold">{plan.price}</span>
                <p className={`text-sm mt-1 opacity-80 ${plan.isPopular ? 'text-gray-200' : 'text-gray-600'}`}>
                  Manutenção: {plan.maintenance}
                </p>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg className={`flex-shrink-0 w-5 h-5 ${plan.isPopular ? 'text-secondary' : 'text-accentGreen1'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm font-medium">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className={`mt-auto pt-6 border-t ${plan.isPopular ? 'border-white/20' : 'border-gray-200'}`}>
                <p className="text-xs font-bold mb-2">
                  Destaque: Opção R$ {plan.customDomainPrice} + R$ {plan.customDomainMaint}/mês para domínio próprio.
                </p>
                <button className={`w-full py-3 rounded-xl font-bold transition-all ${
                  plan.isPopular 
                  ? 'bg-secondary hover:bg-white hover:text-primary text-white' 
                  : 'bg-primary hover:bg-secondary text-white'
                }`}>
                  Contratar Agora
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
