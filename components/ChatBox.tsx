
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";

// Inicialização segura da API
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

  const DEVLYN_AVATAR = "https://i.postimg.cc/hQ9T26WW/IA-Devlyn-BKG-Transparent-Face.png";

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
        contents: [
          ...messages.map(m => ({ 
            role: m.role === 'ai' ? 'model' : 'user', 
            parts: [{ text: m.text }] 
          })), 
          { role: 'user', parts: [{ text: userMsg }] }
        ],
        config: {
          systemInstruction: "Você é Devlyn, a assistente de IA da Digital BR Tecnologia. Sua função é ser cordial, profissional e técnica. Seu estilo de fala é sofisticado. Você deve fazer uma triagem: entender o que o cliente precisa e sugerir falar com um consultor humano no WhatsApp para fechamento. Planos: Básico 450, Plus 650, Diamante 850.",
        }
      });

      const aiText = response.text || "Desculpe, tive um pequeno problema técnico. Poderia repetir?";
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (error) {
      console.error("Erro na Devlyn:", error);
      setMessages(prev => [...prev, { role: 'ai', text: "No momento estou ocupada, mas você pode falar com nossos especialistas no WhatsApp clicando no botão abaixo!" }]);
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
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center justify-center"
        >
          <div className="absolute -inset-2 bg-gradient-to-r from-primary via-secondary to-accentGreen2 rounded-full animate-spin-slow opacity-75 blur-md group-hover:opacity-100 transition-opacity"></div>
          <div className="relative bg-white rounded-full shadow-2xl transition-all hover:scale-110 flex items-center justify-center overflow-hidden border-4 border-white w-16 h-16 md:w-20 md:h-20">
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-gray-200"></div>
            <img src={DEVLYN_AVATAR} alt="Devlyn AI" className="relative w-full h-full object-cover scale-125 translate-y-1" />
          </div>
          <div className="absolute top-0 right-0 bg-accentGreen2 w-5 h-5 rounded-full border-2 border-white animate-pulse"></div>
        </button>
      )}

      {isOpen && (
        <div className="bg-white w-[90vw] md:w-[400px] h-[580px] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden border border-gray-100 animate-in slide-in-from-bottom-10 fade-in duration-500">
          {/* Header Corrigido - Sem espaço em branco */}
          <div className="bg-primary px-6 py-4 flex items-center justify-between text-white relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-secondary/30 rounded-full -mr-8 -mt-8 blur-2xl"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-secondary bg-white shadow-md flex-shrink-0">
                <img src={DEVLYN_AVATAR} alt="Devlyn" className="w-full h-full object-cover scale-150 translate-y-1" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-lg leading-tight">Devlyn</span>
                  <div className="w-2 h-2 bg-accentGreen2 rounded-full"></div>
                </div>
                <span className="text-secondary text-[9px] font-bold tracking-widest uppercase">Inteligência Artificial</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors relative z-10">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          <div ref={scrollRef} className="flex-grow overflow-y-auto p-5 space-y-5 bg-[#F8FAFC]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                {m.role === 'ai' && (
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-primary/10 mr-2 mt-auto flex-shrink-0 bg-white">
                    <img src={DEVLYN_AVATAR} alt="Dev" className="w-full h-full object-cover scale-[1.8] translate-y-1" />
                  </div>
                )}
                
                {m.role === 'ai' ? (
                  /* Mensagem IA: Gradiente Footer (Azul/Verde) + Transparência + Texto Branco */
                  <div className="max-w-[82%] p-3.5 rounded-2xl text-[13px] shadow-sm leading-relaxed bg-gradient-to-br from-[#074073]/95 via-[#069DBF]/90 to-[#56A632]/85 backdrop-blur-sm text-white rounded-bl-none font-medium border border-white/10">
                    {m.text}
                  </div>
                ) : (
                  /* Mensagem Usuário: Fundo Gelo/Branco + Texto Azul Escuro + Borda Degradê */
                  <div className="max-w-[82%] p-[1.5px] rounded-2xl bg-gradient-to-r from-[#074073] to-[#56A632] shadow-sm rounded-br-none">
                    <div className="bg-gradient-to-br from-[#E8F0F7] to-white text-[#074073] p-3.5 rounded-[calc(1rem-1.5px)] rounded-br-none text-[13px] leading-relaxed font-bold">
                      {m.text}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-primary/10 p-3 rounded-2xl border border-primary/5 rounded-bl-none flex gap-1 animate-pulse">
                  <span className="w-1.5 h-1.5 bg-primary/40 rounded-full"></span>
                  <span className="w-1.5 h-1.5 bg-primary/60 rounded-full"></span>
                  <span className="w-1.5 h-1.5 bg-primary/80 rounded-full"></span>
                </div>
              </div>
            )}
          </div>

          <div className="p-5 bg-white border-t border-gray-100 space-y-3">
            <div className="flex gap-2 items-center">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Como posso ajudar seu negócio?"
                className="flex-grow px-4 py-2.5 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary text-sm transition-all"
              />
              <button onClick={handleSendMessage} disabled={isLoading} className="bg-primary text-white p-2.5 rounded-xl hover:bg-secondary transition-all shadow-md active:scale-95 disabled:opacity-50">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </div>
            
            <button onClick={openWhatsApp} className="w-full group relative flex items-center justify-center gap-2 bg-[#56A632] text-white py-3.5 rounded-xl text-xs font-bold transition-all shadow-lg hover:bg-[#7FBF1F] active:scale-[0.98] overflow-hidden">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              FALAR COM ESPECIALISTA NO WHATSAPP
            </button>
          </div>
        </div>
      )}
      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
      `}</style>
    </div>
  );
};

export default ChatBox;
