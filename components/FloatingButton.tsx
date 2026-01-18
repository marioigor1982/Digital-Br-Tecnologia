
import React from 'react';

const FloatingButton: React.FC = () => {
  return (
    <a 
      href="https://t.me/digitalbrtecnologia" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-40 bg-[#0088cc] text-white p-4 rounded-full shadow-2xl hover:scale-110 hover:-rotate-12 transition-all duration-300 group"
      aria-label="Contact on Telegram"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="32" 
        height="32" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="m22 2-7 20-4-9-9-4Z"></path>
        <path d="M22 2 11 13"></path>
      </svg>
      <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-white text-[#0088cc] px-4 py-2 rounded-lg font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Fale Conosco no Telegram
      </span>
    </a>
  );
};

export default FloatingButton;
