
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

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col font-sans bg-background selection:bg-secondary/30">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/trabalhos" element={<Portfolio />} />
            <Route path="/precos" element={<Pricing />} />
            <Route path="/quem-somos" element={<About />} />
            {/* Fallback para home em caso de rota inexistente */}
            <Route path="*" element={<Hero />} />
          </Routes>
        </main>
        <Footer />
        <ChatBox />
      </div>
    </BrowserRouter>
  );
};

export default App;
