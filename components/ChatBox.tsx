
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";

interface Message {
  role: 'user' | 'ai';
  text: string;
}

const ChatBox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: 'Olá! Eu sou a Devlyn, sua assistente virtual da Digital BR Tecnologia. Como posso ajudar a transformar sua presença digital hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const DEVLYN_AVATAR = "https://i.postimg.cc/hQ9T26WW/IA-Devlyn-BKG-Transparent-Face.png";
  
  // Imagens dos Planos solicitadas
  const PLAN_IMAGES = {
    basico: "https://i.postimg.cc/d0nt8sTN/PROGRAMA_BÁSICO.png",
    plus: "https://i.postimg.cc/Dz5yqvbC/PROGRAMA_PLUS.png",
    diamante: "https://i.postimg.cc/6Qz5dWG1/PROGRAMA_DIAMANTE.png"
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen, isLoading]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          ...messages.map(m => ({
            role: m.role === 'ai' ? 'model' : 'user',
            parts: [{ text: m.text }]
          })),
          { role: 'user', parts: [{ text: userMsg }] }
        ],
        config: {
          systemInstruction: `Você é Devlyn, a inteligência artificial da Digital BR Tecnologia.
          Sua missão é explicar nossos sites e converter interessados para o WhatsApp (11 94005-0060).
          
          REGRAS CRÍTICAS DE IMAGENS:
          Ao sugerir ou explicar um plano, você DEVE incluir o código da imagem no final da sua fala para que eu possa renderizar o banner:
          - Para o Plano Básico: [IMAGE:BASICO]
          - Para o Plano Plus: [IMAGE:PLUS]
          - Para o Plano Diamante: [IMAGE:DIAMANTE]
          
          VALORES DOS PLANOS:
          - Básico: R$ 450,00.
          - PLUS (Mais Vendido): R$ 650,00.
          - DIAMANTE (Elite): R$ 850,00.
          
          Mantenha sempre um tom prestativo, moderno e focado em fechar negócio. Mencione o WhatsApp sempre que sentir que o cliente está interessado.`,
          temperature: 0.75,
        }
      });

      const aiText = response.text || "Estou aqui para tirar suas dúvidas sobre nossos planos digitais. Qual deles mais te interessa?";
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (error: any) {
      console.error("Erro na Devlyn:", error);
      const errorMsg = "Tive um pequeno atraso na minha conexão, mas estou pronta para te ajudar! Caso prefira um atendimento humano imediato, clique no botão do WhatsApp logo abaixo. (11 94005-0060)";
      setMessages(prev => [...prev, { role: 'ai', text: errorMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Função para renderizar o texto com suporte a imagens especiais
  const renderMessageContent = (text: string) => {
    const parts = text.split(/(\[IMAGE:(?:BASICO|PLUS|DIAMANTE)\])/g);
    
    return parts.map((part, index) => {
      if (part === '[IMAGE:BASICO]') {
        return <img key={index} src={PLAN_IMAGES.basico} alt="Plano Básico" className="rounded-xl mt-3 shadow-lg border border-white/20 hover:scale-105 transition-transform cursor-pointer" onClick={() => window.open(PLAN_IMAGES.basico, '_blank')} />;
      }
      if (part === '[IMAGE:PLUS]') {
        return <img key={index} src={PLAN_IMAGES.plus} alt="Plano Plus" className="rounded-xl mt-3 shadow-lg border border-white/20 hover:scale-105 transition-transform cursor-pointer" onClick={() => window.open(PLAN_IMAGES.plus, '_blank')} />;
      }
      if (part === '[IMAGE:DIAMANTE]') {
        return <img key={index} src={PLAN_IMAGES.diamante} alt="Plano Diamante" className="rounded-xl mt-3 shadow-lg border border-white/20 hover:scale-105 transition-transform cursor-pointer" onClick={() => window.open(PLAN_IMAGES.diamante, '_blank')} />;
      }
      return <span key={index}>{part}</span>;
    });
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent(`Olá, Devlyn! Estou vindo do site e quero saber mais sobre os planos da Digital BR.`);
    window.open(`https://wa.me/5511940050060?text=${message}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
        >
          <div className="absolute -inset-2 bg-gradient-to-r from-primary via-secondary to-accentGreen2 rounded-full animate-spin-slow opacity-75 blur-md"></div>
          <div className="relative bg-white rounded-full shadow-2xl overflow-hidden border-4 border-white w-16 h-16 md:w-20 md:h-20">
            <img src={DEVLYN_AVATAR} alt="Devlyn AI" className="w-full h-full object-cover scale-125 translate-y-1" />
          </div>
          <div className="absolute top-0 right-0 bg-accentGreen2 w-5 h-5 rounded-full border-2 border-white animate-pulse"></div>
        </button>
      )}

      {isOpen && (
        <div className="bg-white w-[90vw] md:w-[400px] h-[600px] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden border border-gray-100 animate-in slide-in-from-bottom-10 duration-500">
          <div className="bg-primary p-5 flex items-center justify-between text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-secondary bg-white">
                <img src={DEVLYN_AVATAR} alt="Devlyn AI" className="w-full h-full object-cover scale-150 translate-y-1" />
              </div>
              <div className="flex flex-col">
                <h3 className="font-bold text-lg leading-tight">Devlyn AI</h3>
                <span className="text-secondary text-[9px] font-bold tracking-widest uppercase">Digital BR Tecnologia</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors relative z-10">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <div ref={scrollRef} className="flex-grow overflow-y-auto p-5 space-y-6 bg-[#F9FBFF] scroll-smooth">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-[13px] shadow-sm leading-relaxed ${
                  m.role === 'ai' 
                  ? 'bg-gradient-to-br from-primary via-primary/90 to-secondary text-white rounded-bl-none' 
                  : 'bg-white text-primary border border-gray-100 rounded-br-none font-semibold'
                }`}>
                  {renderMessageContent(m.text)}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-4 rounded-2xl rounded-bl-none flex gap-1">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-5 bg-white border-t border-gray-50 space-y-3">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Como posso ajudar você hoje?"
                className="flex-grow px-4 py-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-secondary text-sm"
              />
              <button 
                onClick={handleSendMessage} 
                disabled={isLoading}
                className="bg-primary text-white p-3 rounded-xl hover:bg-secondary transition-all disabled:opacity-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </div>
            <button 
              onClick={openWhatsApp}
              className="w-full bg-[#56A632] hover:bg-[#7FBF1F] text-white py-3 rounded-xl text-[11px] font-black tracking-widest uppercase transition-all shadow-lg flex items-center justify-center gap-2"
            >
              Falar agora no WhatsApp
            </button>
          </div>
        </div>
      )}
      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 15s linear infinite; }
      `}</style>
    </div>
  );
};

export default ChatBox;
