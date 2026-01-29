
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
      
      // Construindo o histórico para a API de Chat
      // Nota: Gemini prefere que o histórico comece com 'user' ou alterne corretamente.
      // Como nossa primeira mensagem é da IA, vamos tratá-la como saudação inicial e 
      // focar o contexto no histórico de conversas reais.
      const history = messages
        .filter((_, idx) => idx > 0) // Ignora a primeira mensagem estática de boas-vindas para o histórico de chat
        .map(m => ({
          role: m.role === 'ai' ? 'model' : 'user',
          parts: [{ text: m.text }]
        }));

      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: `Você é Devlyn, a inteligência artificial proprietária da Digital BR Tecnologia. 
          Sua personalidade é extremamente sofisticada, prestativa, tecnológica e comercialmente astuta.
          
          OBJETIVOS:
          1. Encantar o cliente com conhecimento técnico sobre presença digital.
          2. Explicar nossos planos de forma clara:
             - Básico (R$ 450): Foco em profissionais liberais, Landing Page responsiva, domínio incluso.
             - PLUS (R$ 650): O MAIS POPULAR. Ideal para expansão, com galeria de fotos, vídeos e links integrados.
             - DIAMANTE (R$ 850): ELITE. Automação total, Chat de IA (como você!), e-mails corporativos e suporte prioritário.
          3. SEMPRE buscar converter a conversa em um contato humano via WhatsApp (11 94005-0060).
          
          REGRAS DE CONDUTA:
          - Use um tom profissional mas acolhedor.
          - Não invente preços ou serviços que não estão listados.
          - Se o cliente perguntar algo muito complexo, sugira falar com nossos especialistas.
          - Mencione que a Digital BR democratiza a tecnologia para o pequeno comércio.`,
        }
      });

      // Se houver histórico, poderíamos enviá-lo aqui, mas para simplicidade e 
      // inteligência mantendo o contexto via sendMessage, vamos processar a última mensagem.
      // Nota: Para manter o contexto total em cada chamada sem gerenciar estado de 'chat' persistente:
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
          systemInstruction: `Você é Devlyn da Digital BR Tecnologia. Sofisticada e focada em conversão. Planos: Básico 450, PLUS 650, DIAMANTE 850. Contato: (11) 94005-0060.`,
          temperature: 0.7,
          topP: 0.95,
        }
      });

      const aiText = response.text || "Estou processando sua solicitação com cuidado. Poderia me dar mais detalhes?";
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (error: any) {
      console.error("Erro na Devlyn:", error);
      
      // Tratamento de erro mais "inteligente" e menos robótico
      let errorResponse = "Tive uma oscilação momentânea na minha rede neural, mas estou aqui! Que tal continuarmos essa conversa de forma mais personalizada com nossos consultores no WhatsApp?";
      
      if (error?.message?.includes('429')) {
        errorResponse = "Nossa demanda está altíssima devido ao sucesso de nossos planos! Para não te deixar esperando, que tal clicar no botão do WhatsApp abaixo? Te atenderemos instantaneamente por lá.";
      }
      
      setMessages(prev => [...prev, { role: 'ai', text: errorResponse }]);
    } finally {
      setIsLoading(false);
    }
  };

  const openWhatsApp = () => {
    const summary = messages.map(m => `${m.role === 'user' ? 'Cliente' : 'Devlyn'}: ${m.text}`).join('\n');
    const encodedMsg = encodeURIComponent(`Olá, vim do chat com a Devlyn. Gostaria de saber mais sobre as soluções da Digital BR.\n\nResumo do chat:\n${summary.substring(0, 500)}...`);
    window.open(`https://wa.me/5511940050060?text=${encodedMsg}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      {/* Botão Flutuante (Avatar) */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
        >
          <div className="absolute -inset-2 bg-gradient-to-r from-primary via-secondary to-accentGreen2 rounded-full animate-spin-slow opacity-75 blur-md group-hover:opacity-100 transition-opacity"></div>
          <div className="relative bg-white rounded-full shadow-2xl flex items-center justify-center overflow-hidden border-4 border-white w-16 h-16 md:w-20 md:h-20">
            <img src={DEVLYN_AVATAR} alt="Devlyn AI" className="w-full h-full object-cover scale-125 translate-y-1" />
          </div>
          <div className="absolute top-0 right-0 bg-accentGreen2 w-5 h-5 rounded-full border-2 border-white animate-pulse"></div>
        </button>
      )}

      {/* Janela de Chat */}
      {isOpen && (
        <div className="bg-white w-[90vw] md:w-[400px] h-[600px] rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden border border-gray-100 animate-in slide-in-from-bottom-10 fade-in duration-500">
          {/* Header Institucional */}
          <div className="bg-primary p-5 flex items-center justify-between text-white relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-secondary bg-white shadow-lg flex-shrink-0 flex items-center justify-center">
                <img src={DEVLYN_AVATAR} alt="Devlyn AI" className="w-full h-full object-cover scale-150 translate-y-1" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-lg leading-tight">Devlyn</h3>
                  <div className="w-2 h-2 bg-accentGreen2 rounded-full animate-pulse"></div>
                </div>
                <span className="text-secondary text-[9px] font-bold tracking-widest uppercase">Inteligência Artificial</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition-colors relative z-10">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          {/* Área de Conversa */}
          <div ref={scrollRef} className="flex-grow overflow-y-auto p-5 space-y-6 bg-[#F9FBFF]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                {m.role === 'ai' && (
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-primary/10 mr-2 mt-auto flex-shrink-0 bg-white">
                    <img src={DEVLYN_AVATAR} alt="Dev" className="w-full h-full object-cover scale-[1.8] translate-y-1" />
                  </div>
                )}
                
                {m.role === 'ai' ? (
                  <div className="max-w-[85%] p-4 rounded-2xl text-[13px] shadow-md leading-relaxed bg-gradient-to-br from-[#074073]/95 via-[#069DBF]/90 to-[#56A632]/85 backdrop-blur-sm text-white rounded-bl-none font-medium border border-white/10 whitespace-pre-wrap">
                    {m.text}
                  </div>
                ) : (
                  <div className="max-w-[85%] p-[1.5px] rounded-2xl bg-gradient-to-r from-[#074073] via-[#069DBF] to-[#56A632] shadow-sm rounded-br-none">
                    <div className="bg-gradient-to-br from-[#F2F2F2] to-white text-primary p-4 rounded-[calc(1rem-1.5px)] rounded-br-none text-[13px] leading-relaxed font-bold border border-white/40">
                      {m.text}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-primary/5 p-4 rounded-2xl flex gap-1.5 animate-pulse">
                  <div className="w-1.5 h-1.5 bg-primary/30 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce delay-150"></div>
                  <div className="w-1.5 h-1.5 bg-primary/70 rounded-full animate-bounce delay-300"></div>
                </div>
              </div>
            )}
          </div>

          {/* Inputs */}
          <div className="p-5 bg-white border-t border-gray-100 space-y-4">
            <div className="flex gap-2 items-center">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Qual sua dúvida sobre tecnologia?"
                className="flex-grow px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-secondary text-sm transition-all"
              />
              <button 
                onClick={handleSendMessage} 
                disabled={isLoading} 
                className="bg-primary text-white p-3 rounded-xl hover:bg-secondary transition-all shadow-md active:scale-95 disabled:opacity-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
              </button>
            </div>
            
            <button 
              onClick={openWhatsApp} 
              className="w-full group relative flex items-center justify-center gap-2 bg-[#56A632] text-white py-4 rounded-xl text-xs font-bold transition-all shadow-lg hover:bg-[#7FBF1F] active:scale-[0.98] overflow-hidden"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              FALAR COM ESPECIALISTA NO WHATSAPP
            </button>
          </div>
        </div>
      )}
      <style>{`
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
      `}</style>
    </div>
  );
};

export default ChatBox;
