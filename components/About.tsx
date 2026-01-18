
import React from 'react';

const About: React.FC = () => {
  const videoUrl = "https://ik.imagekit.io/marioigor82/Propaganda%20_%20Feito%20com%20o%20Clipchamp.mp4?updatedAt=1768765425788";

  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Conteúdo de Texto */}
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">Quem Somos</h2>
            <div className="w-20 h-1 bg-secondary mb-8"></div>
            <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
              <p>
                A <strong>Digital BR Tecnologia</strong> nasceu com o propósito claro de democratizar o acesso à tecnologia para o pequeno comércio e prestadores de serviços. 
              </p>
              <p>
                Entendemos que o mundo digital pode parecer complexo, mas sua presença nele não precisa ser. Nossa missão é oferecer sites sofisticados, rápidos e que realmente convertem visitantes em clientes, sem as complicações e custos abusivos das grandes agências.
              </p>
              <p>
                Com foco em resultados e design de alta qualidade, cuidamos de toda a infraestrutura para que você possa focar no que faz de melhor: gerir o seu negócio. Seja uma barbearia, um restaurante local ou serviços autônomos, nós criamos sua vitrine digital com excelência brasileira.
              </p>
            </div>
            
            <div className="mt-10 flex gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">100%</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Foco em Você</div>
              </div>
              <div className="text-center border-l border-gray-300 pl-6">
                <div className="text-3xl font-bold text-primary">+100</div>
                <div className="text-xs text-gray-500 uppercase tracking-widest font-bold">Projetos</div>
              </div>
            </div>
          </div>

          {/* Player de Vídeo Nativo em formato 16:9 */}
          <div className="lg:w-1/2 w-full flex justify-center">
            <div className="relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border-[8px] md:border-[12px] border-white group bg-black">
              <video 
                className="w-full h-auto aspect-video object-cover"
                controls
                preload="metadata"
                poster="https://i.postimg.cc/rpXfmqnN/Propaganda-2.png"
              >
                <source src={videoUrl} type="video/mp4" />
                Seu navegador não suporta a tag de vídeo.
              </video>
              {/* Overlay sutil apenas para estética do card */}
              <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/10 rounded-[1.5rem]"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
