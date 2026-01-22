
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import Portfolio from './components/Portfolio.tsx';
import Pricing from './components/Pricing.tsx';
import About from './components/About.tsx';
import Footer from './components/Footer.tsx';
import ChatBox from './components/ChatBox.tsx';

// Componente para rolar ao topo em trocas de rota
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Página Inicial que compõe todas as seções (Experiência One-Page)
const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
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

// Wrapper para as páginas individuais para garantir que o conteúdo não fique sob o header fixo
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="pt-20">
    {children}
  </div>
);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col font-sans bg-background selection:bg-secondary/30">
        <Header />
        <main className="flex-grow">
          <Routes>
            {/* Home exibe TUDO */}
            <Route path="/" element={<HomePage />} />
            
            {/* Rotas individuais exibem apenas a seção com espaçamento correto */}
            <Route path="/trabalhos" element={<PageWrapper><Portfolio /></PageWrapper>} />
            <Route path="/precos" element={<PageWrapper><Pricing /></PageWrapper>} />
            <Route path="/quem-somos" element={<PageWrapper><About /></PageWrapper>} />
            
            {/* Fallback */}
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
        <ChatBox />
      </div>
    </BrowserRouter>
  );
};

export default App;
