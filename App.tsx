
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Portfolio from './components/Portfolio';
import Pricing from './components/Pricing';
import About from './components/About';
import Footer from './components/Footer';
import FloatingButton from './components/FloatingButton';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
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
      <FloatingButton />
    </div>
  );
};

export default App;
