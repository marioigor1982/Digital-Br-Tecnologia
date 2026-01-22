
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import Portfolio from './components/Portfolio.tsx';
import Pricing from './components/Pricing.tsx';
import About from './components/About.tsx';
import Footer from './components/Footer.tsx';
import ChatBox from './components/ChatBox.tsx';

// Componente para gerenciar o Scroll baseado na URL limpa
const ScrollManager = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Mapeamento de rotas para IDs de seção
    const sectionMapping: { [key: string]: string } = {
      '/': 'home-top',
      '/trabalhos': 'portfolio-section',
      '/precos': 'pricing-section',
      '/quem-somos': 'about-section',
    };

    const targetId = sectionMapping[pathname];
    
    if (targetId === 'home-top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        // Compensação do header fixo (aprox 80px)
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  }, [pathname]);

  return null;
};

// Página Inteiriça Completa
const FullLandingPage: React.FC = () => {
  return (
    <>
      <div id="home-top">
        <Hero />
      </div>
      <div id="portfolio-section">
        <Portfolio />
      </div>
      <div id="pricing-section">
        <Pricing />
      </div>
      <div id="about-section">
        <About />
      </div>
    </>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollManager />
      <div className="min-h-screen flex flex-col font-sans bg-background selection:bg-secondary/30">
        <Header />
        <main className="flex-grow">
          <Routes>
            {/* Todas as rotas agora renderizam a página completa */}
            <Route path="/" element={<FullLandingPage />} />
            <Route path="/trabalhos" element={<FullLandingPage />} />
            <Route path="/precos" element={<FullLandingPage />} />
            <Route path="/quem-somos" element={<FullLandingPage />} />
            {/* Fallback */}
            <Route path="*" element={<FullLandingPage />} />
          </Routes>
        </main>
        <Footer />
        <ChatBox />
      </div>
    </BrowserRouter>
  );
};

export default App;
