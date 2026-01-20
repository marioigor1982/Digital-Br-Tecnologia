
import React from 'react';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import Portfolio from './components/Portfolio.tsx';
import Pricing from './components/Pricing.tsx';
import About from './components/About.tsx';
import Footer from './components/Footer.tsx';
import ChatBox from './components/ChatBox.tsx';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-background selection:bg-secondary/30">
      <Header />
      <main className="flex-grow">
        <section id="inicio">
          <Hero />
        </section>
        <section id="trabalhos">
          <Portfolio />
        </section>
        <section id="precos">
          <Pricing />
        </section>
        <section id="quem-somos">
          <About />
        </section>
      </main>
      <Footer />
      <ChatBox />
    </div>
  );
};

export default App;
