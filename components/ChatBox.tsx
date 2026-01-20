
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface Message {
  role: 'user' | 'ai';
  text: string;
}

const ChatBox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: 'Olá! Eu sou a Devlyn, sua assistente virtual da Digital BR. Como posso ajudar a impulsionar seu negócio hoje?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const DEVLYN_AVATAR = "https://i.postimg.cc/Ss2pKkrG/IA-Devlyn.png";
  const LOGO_ICON = "https://i.postimg.cc/gjMb3xX1/Digital-BR-Tecnologia.png";

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
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...messages.map(m => ({ 
          role: m.role === 'ai' ? 'model' : 'user', 
          parts: [{ text: m.text }] 
        })), { role: 'user', parts: [{ text: userMsg }] }],
        config: {
          systemInstruction: "Você é Devlyn, a assistente de IA da Digital BR Tecnologia. Sua função é ser cordial, profissional e técnica. Você deve fazer uma triagem: entender o que o cliente precisa (Site, Landing Page, IA) e, após algumas interações, sugerir que ele fale com um consultor humano via WhatsApp. Não dê preços exatos, apenas faixas de valores baseadas nos planos do site (Básico 450, Plus 650, Diamante 850). Lembre-se que você representa a elite da tecnologia BR.",
        }
      });

      const aiText = response.text || "Desculpe, tive um pequeno problema técnico. Poderia repetir?";
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (error) {
      console.error("Erro na Devlyn:", error);
      setMessages(prev => [...prev, { role: 'ai', text: "No momento estou ocupada processando dados, mas você pode falar diretamente com nossos especialistas clicando no botão abaixo!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  const openWhatsApp = () => {
    const summary = messages.map(m => `${m.role === 'user' ? 'Cliente' : 'Devlyn'}: ${m.text}`).join('\n');
    const encodedMsg = encodeURIComponent(`Olá, vim do chat com a Devlyn. Resumo da conversa:\n\n${summary}`);
    window.open(`https://wa.me/5511940050060?text=${encodedMsg}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      {/* Botão de Chat (Avatar Devlyn) */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center justify-center"
        >
          <div className="absolute -inset-2 bg-gradient-to-r from-primary via-secondary to-accentGreen2 rounded-full animate-spin-slow opacity-75 blur-md group-hover:opacity-100 transition-opacity"></div>
          <div className="relative bg-white p-1 rounded-full shadow-2xl transition-all hover:scale-110 flex items-center justify-center overflow-hidden border-4 border-white w-20 h-20">
            <img 
              src={DEVLYN_AVATAR} 
              alt="Devlyn AI" 
              className="w-full h-full object-cover scale-110 translate-y-1"
            />
          </div>
          <div className="absolute -top-2 -right-2 bg-accentGreen2 w-6 h-6 rounded-full border-4 border-white animate-pulse"></div>
        </button>
      )}

      {/* Janela de Chat */}
      {isOpen && (
        <div className="bg-white w-[90vw] md:w-[420px] h-[600px] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden border border-gray-100 animate-in slide-in-from-bottom-10 fade-in duration-500">
          {/* Header Estilo Digital BR */}
          <div className="bg-primary p-5 flex items-center justify-between text-white relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-secondary bg-white shadow-lg">
                <img src={DEVLYN_AVATAR} alt="Devlyn AI" className="w-full h-full object-cover scale-125 translate-y-2" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-xl leading-tight">Devlyn</h3>
                  <div className="w-2 h-2 bg-accentGreen2 rounded-full animate-pulse"></div>
                </div>
                <p className="text-secondary text-xs font-bold tracking-widest uppercase">Inteligência Artificial</p>
                <p className="text-white/60 text-[10px] mt-1">Digital BR Tecnologia</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="hover:bg-white/10 p-2 rounded-full transition-colors relative z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          {/* Área de Mensagens */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-6 bg-[#F9FBFF]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                {m.role === 'ai' && (
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-primary/20 mr-2 mt-auto flex-shrink-0">
                    <img src={DEVLYN_AVATAR} alt="Dev" className="w-full h-full object-cover scale-150 translate-y-1" />
                  </div>
                )}
                <div className={`max-w-[80%] p-4 rounded-3xl text-sm shadow-sm leading-relaxed ${
                  m.role === 'user' 
                  ? 'bg-gradient-to-br from-primary to-secondary text-white rounded-br-none' 
                  : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none font-medium'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-3xl border border-gray-100 rounded-bl-none flex gap-1.5 shadow-sm">
                  <span className="w-2 h-2 bg-secondary/40 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-secondary/60 rounded-full animate-bounce delay-150"></span>
                  <span className="w-2 h-2 bg-secondary/80 rounded-full animate-bounce delay-300"></span>
                </div>
              </div>
            )}
          </div>

          {/* Área de Input e WhatsApp */}
          <div className="p-6 bg-white border-t border-gray-100 space-y-4">
            <div className="flex gap-3 items-center">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Como posso ajudar seu negócio?"
                className="flex-grow px-5 py-3 bg-gray-50 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary text-sm transition-all"
              />
              <button 
                onClick={handleSendMessage}
                disabled={isLoading}
                className="bg-primary text-white p-3 rounded-2xl hover:bg-secondary transition-all shadow-md disabled:opacity-50 active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </div>
            
            <button 
              onClick={openWhatsApp}
              className="w-full group relative flex items-center justify-center gap-3 bg-gradient-to-r from-accentGreen1 to-accentGreen2 text-white py-4 rounded-2xl text-sm font-bold transition-all shadow-lg hover:shadow-accentGreen1/30 active:scale-[0.98] overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              FALAR COM ESPECIALISTA NO WHATSAPP
            </button>
          </div>
        </div>
      )}
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default ChatBox;
