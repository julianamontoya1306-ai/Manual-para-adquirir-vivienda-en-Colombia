import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Message } from '../types';
import { PDF_CONTENT } from '../constants';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';

export const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'model',
      text: 'Hola, soy tu experto virtual en vivienda. Basado en la guía legal y financiera, ¿qué duda tienes sobre tu perfil, contrato o capacidad de endeudamiento?',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !process.env.API_KEY) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
            {
                role: 'user',
                parts: [{ text: input }]
            }
        ],
        config: {
          systemInstruction: `Eres un asesor financiero experto en créditos de vivienda en Colombia. 
          Responde EXCLUSIVAMENTE basándote en el siguiente contexto extraído de una guía PDF. 
          Sé amable, profesional y motivador. Si la respuesta no está en el texto, indícalo.
          
          CONTEXTO PDF:
          ${PDF_CONTENT}`,
        }
      });

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: response.text || 'Lo siento, no pude generar una respuesta en este momento.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error("Error calling Gemini:", error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: 'Hubo un error conectando con el asesor. Por favor verifica tu conexión o intenta más tarde.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!process.env.API_KEY) {
    return (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded shadow-sm">
            <div className="flex">
                <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="ml-3">
                    <p className="text-sm text-amber-700">
                        Para usar el asistente AI, necesitas configurar tu API Key en el entorno.
                    </p>
                </div>
            </div>
        </div>
    )
  }

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
      <div className="bg-brand-800 p-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <h3 className="font-semibold">Asesor Virtual Vivienda</h3>
        </div>
        <span className="text-xs bg-brand-700 px-2 py-1 rounded-full border border-brand-600">Gemini 2.5 Flash</span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} gap-2`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                msg.role === 'user' ? 'bg-brand-600' : 'bg-emerald-600'
              }`}>
                {msg.role === 'user' ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
              </div>
              <div
                className={`p-3 rounded-lg text-sm shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-brand-600 text-white rounded-tr-none'
                    : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
           <div className="flex justify-start">
             <div className="flex max-w-[80%] flex-row gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200 rounded-tl-none flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-brand-600" />
                    <span className="text-sm text-slate-500">Analizando tu perfil...</span>
                </div>
             </div>
           </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-white border-t border-slate-200">
        <div className="flex items-center gap-2 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Ej: ¿Qué pasa si mi contrato es por obra o labor?"
            className="flex-1 p-3 pr-10 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none text-sm transition-all"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 p-1.5 bg-brand-600 text-white rounded-md hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-center text-slate-400 mt-2">
          La IA puede cometer errores. Verifica siempre con la fuente original.
        </p>
      </div>
    </div>
  );
};