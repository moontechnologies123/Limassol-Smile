import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Sparkles, Smile, User, RotateCcw, Info, Calendar } from 'lucide-react';
import { ChatMessage } from '../types';

interface AiAssistantProps {
  onBookClick: (treatmentName?: string) => void;
}

export default function AiAssistant({ onBookClick }: AiAssistantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "init",
      role: 'model',
      text: "Hello! I am your virtual dental assistant at Limassol Smile Studio. Dr. Elena Georgiou and our clinical team are ready to welcome you. How can I help you today? You can ask me about dental implants, veneers, teeth whitening prices, our location on Gladstonos, or how to request a consultation slot!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    "What are the prices for treatments?",
    "Where is the clinic located?",
    "Tell me about Dr. Elena Georgiou",
    "What is included in a GHS checkup?",
    "Do you offer emergency dental care?"
  ];

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Build conversation payload for full-stack Gemini api
      // Map ChatMessage structure to server-side roles
      const apiMessages = [...messages, userMsg].map(m => ({
        role: m.role,
        content: m.text
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (response.ok) {
        const data = await response.json();
        const modelMsg: ChatMessage = {
          id: `msg-${Date.now()}-model`,
          role: 'model',
          text: data.text,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, modelMsg]);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed server handshake.");
      }
    } catch (err: any) {
      // Graceful error fallback directly inside clinical client interface
      const errorMsg: ChatMessage = {
        id: `msg-${Date.now()}-error`,
        role: 'model',
        text: "I apologize, our clinical AI server is undergoing standard synchronization. If you would like to book a slot directly, please use the Booking form or dial our reception at +357 25 345678. We speak Greek, English, and Russian!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "init",
        role: 'model',
        text: "Conversation reset. I am ready to answer any questions about Limassol Smile Studio, porcelain veneers, Swiss implants, pain-free cleaning protocols, or operating times. What's on your mind?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="bg-white/40 backdrop-blur-xl rounded-[2rem] border border-white/50 shadow-xl overflow-hidden flex flex-col h-[600px] text-left">
      
      {/* Chat header */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-800 text-white p-4 flex items-center justify-between shrink-0">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 border border-blue-500 flex items-center justify-center shadow-sm">
            <Sparkles className="w-5 h-5 text-blue-200 animate-pulse" />
          </div>
          <div>
            <h4 className="font-display font-bold text-sm">Dental AI Assistant</h4>
            <span className="text-[10px] text-blue-200 font-medium block -mt-0.5">
              Limassol Smile Studio Support • Online
            </span>
          </div>
        </div>

        <button
          onClick={handleResetChat}
          className="p-1.5 hover:bg-white/10 rounded-lg text-blue-200 hover:text-white transition-colors cursor-pointer"
          title="Reset Conversation"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages stream box */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-white/10">
        
        {/* Helper disclaimer */}
        <div className="bg-blue-50/50 backdrop-blur-sm border border-blue-100/50 rounded-xl p-3 flex items-start space-x-2 text-[11px] text-blue-800">
          <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <p className="font-light leading-relaxed">
            I can outline prices and guidelines for Dr. Elena Georgiou's treatments. While highly accurate, I do not provide direct final medical diagnoses.
          </p>
        </div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'model' && (
              <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-bold text-[10px] border border-blue-200/50">
                LS
              </div>
            )}

            <div className="space-y-1 max-w-[80%] text-left">
              <div
                className={`rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-blue-600 text-white font-medium rounded-tr-none shadow-sm'
                    : 'bg-white/75 backdrop-blur-sm text-slate-800 border border-white/40 rounded-tl-none shadow-sm font-light'
                }`}
              >
                {/* Parse line breaks into paragraphs nicely */}
                {msg.text.split('\n').map((para, i) => (
                  <p key={i} className={i > 0 ? 'mt-2' : ''}>
                    {para}
                  </p>
                ))}
              </div>
              <span className="text-[9px] text-slate-400 font-mono block px-1">
                {msg.timestamp}
              </span>
            </div>

            {msg.role === 'user' && (
              <div className="w-7 h-7 rounded-lg bg-blue-500 text-white flex items-center justify-center shrink-0">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}

        {/* Loading Bubble */}
        {isLoading && (
          <div className="flex items-start gap-2.5 justify-start">
            <div className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-blue-600 animate-spin" />
            </div>
            <div className="bg-white/75 backdrop-blur-sm rounded-2xl rounded-tl-none border border-white/40 px-4 py-3 shadow-sm max-w-[80%]">
              <div className="flex space-x-1 py-1">
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Template buttons panel */}
      {messages.length === 1 && (
        <div className="p-3 border-t border-white/40 bg-white/30 backdrop-blur-md space-y-1.5 shrink-0 text-left">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-1">
            Common Inquiries
          </span>
          <div className="flex flex-wrap gap-1.5">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q)}
                className="px-2.5 py-1.5 bg-white/40 backdrop-blur-sm hover:bg-blue-50 text-slate-700 hover:text-blue-800 rounded-xl border border-white/50 hover:border-blue-200/50 text-[11px] font-medium transition-all cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input container */}
      <div className="p-4 border-t border-white/40 bg-white/30 backdrop-blur-md flex items-center space-x-2.5 shrink-0">
        <input
          type="text"
          placeholder="Ask about dental treatments, veneers, pricing, etc..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(input)}
          className="flex-1 px-4 py-3 rounded-xl border border-white/40 bg-white/40 backdrop-blur-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-50 outline-none text-xs text-slate-800 transition-all placeholder-slate-400"
        />

        <button
          onClick={() => handleSendMessage(input)}
          disabled={!input.trim()}
          className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md transition-all cursor-pointer disabled:bg-neutral-100 disabled:text-neutral-400"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
