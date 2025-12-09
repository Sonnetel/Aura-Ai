// 🎨 AURA UI COMPONENTS - Beautiful Mobile-First Interface

// ============================================
// 1. src/components/aura/AuraChat.tsx
// ============================================
'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff } from 'lucide-react';
import { useAura } from '@/hooks/useAura';
import { AuraMessage } from '@/types/aura';

interface AuraChatProps {
  className?: string;
}

export function AuraChat({ className }: AuraChatProps) {
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, isThinking, sendMessage } = useAura();

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;
    
    await sendMessage(inputValue);
    setInputValue('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // Voice recognition implementation would go here
  };

  return (
    <div className={`flex flex-col h-full bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <div>
            <h1 className="text-white font-semibold text-lg">Aura</h1>
            <p className="text-purple-200 text-sm">Your AI Life OS</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-green-300 text-sm">Online</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        
        {isThinking && (
          <div className="flex items-center space-x-2 text-purple-200">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span className="text-sm italic">Aura is thinking...</span>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-black/20 backdrop-blur-lg border-t border-white/10">
        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything or say hello..."
              className="w-full p-3 pr-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white placeholder-white/60 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              rows={1}
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
          </div>
          
          <button
            onClick={toggleVoiceInput}
            className={`p-3 rounded-full transition-all duration-200 ${
              isListening 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-white/10 hover:bg-white/20 border border-white/20'
            }`}
          >
            {isListening ? (
              <MicOff className="w-5 h-5 text-white" />
            ) : (
              <Mic className="w-5 h-5 text-white" />
            )}
          </button>
          
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-full transition-all duration-200 transform hover:scale-105"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Message Bubble Component
function MessageBubble({ message }: { message: AuraMessage }) {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[85%] ${isUser ? 'order-2' : 'order-1'}`}>
        {/* Message bubble */}
        <div
          className={`p-3 rounded-2xl ${
            isUser
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-br-md'
              : 'bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-bl-md'
          }`}
        >
          <p className="text-sm leading-relaxed">{message.content}</p>
          
          {/* Emotion indicator for Aura messages */}
          {!isUser && message.emotion && (
            <div className="mt-2 flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-xs text-purple-200 capitalize">
                  {message.emotion.primary} ({Math.round(message.emotion.confidence * 100)}%)
                </span>
              </div>
            </div>
          )}
        </div>
        
        {/* Timestamp */}
        <p className={`text-xs text-white/50 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {message.timestamp.toLocaleTimeString([], { 
            hour: '2-digit', 
            minute: '2-digit' 
          })}
        </p>
      </div>
    </div>
  );
}

// ============================================
// 2. src/components/aura/ProactivePanel.tsx
// ============================================
'use client';

import { useState, useEffect } from 'react';
import { X, Lightbulb, Clock, Zap, AlertCircle } from 'lucide-react';
import { ProactiveSuggestion } from '@/types/aura';

interface ProactivePanelProps {
  suggestions: ProactiveSuggestion[];
  onDismiss?: (id: string) => void;
}

export function ProactivePanel({ suggestions, onDismiss }: ProactivePanelProps) {
  const [visibleSuggestions, setVisibleSuggestions] = useState<ProactiveSuggestion[]>([]);

  useEffect(() => {
    setVisibleSuggestions(suggestions);
  }, [suggestions]);

  const handleDismiss = (id: string) => {
    setVisibleSuggestions(prev => prev.filter(s => s.id !== id));
    onDismiss?.(id);
  };

  if (visibleSuggestions.length === 0) return null;

  return (
    <div className="space-y-2 p-4">
      {visibleSuggestions.map((suggestion) => (
        <ProactiveSuggestionCard
          key={suggestion.id}
          suggestion={suggestion}
          onDismiss={() => handleDismiss(suggestion.id)}
        />
      ))}
    </div>
  );
}

function ProactiveSuggestionCard({ 
  suggestion, 
  onDismiss 
}: { 
  suggestion: ProactiveSuggestion;
  onDismiss: () => void;
}) {
  const getIcon = () => {
    switch (suggestion.type) {
      case 'reminder':
        return <Clock className="w-4 h-4" />;
      case 'suggestion':
        return <Lightbulb className="w-4 h-4" />;
      case 'insight':
        return <Zap className="w-4 h-4" />;
      case 'action':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Lightbulb className="w-4 h-4" />;
    }
  };

  const getPriorityColor = () => {
    switch (suggestion.priority) {
      case 'high':
        return 'border-red-400 bg-red-500/20';
      case 'medium':
        return 'border-yellow-400 bg-yellow-500/20';
      case 'low':
        return 'border-blue-400 bg-blue-500/20';
      default:
        return 'border-purple-400 bg-purple-500/20';
    }
  };

  return (
    <div 
      className={`relative p-3 rounded-xl backdrop-blur-sm border ${getPriorityColor()} animate-in slide-in-from-right duration-300`}
    >
      <button
        onClick={onDismiss}
        className="absolute top-2 right-2 p-1 hover:bg-white/10 rounded-full transition-colors"
      >
        <X className="w-3 h-3 text-white/70" />
      </button>
      
      <div className="flex items-start space-x-3 pr-6">
        <div className="flex-shrink-0 p-2 bg-white/10 rounded-lg">
          {getIcon()}
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-medium text-sm leading-tight">
            {suggestion.title}
          </h4>
          <p className="text-white/80 text-xs mt-1 leading-relaxed">
            {suggestion.description}
          </p>
          
          {suggestion.action && (
            <button
              onClick={suggestion.action}
              className="mt-2 px-3 py-1 bg-white/20 hover:bg-white/30 rounded-lg text-xs text-white transition-colors"
            >
              Take Action
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================
// 3. src/app/page.tsx (Main App Component)
// ============================================
'use client';

import { AuraChat } from '@/components/aura/AuraChat';
import { ProactivePanel } from '@/components/aura/ProactivePanel';
import { useAura } from '@/hooks/useAura';

export default function Home() {
  const { proactiveSuggestions } = useAura();

  return (
    <main className="h-screen flex flex-col bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Proactive Suggestions Panel */}
      {proactiveSuggestions.length > 0 && (
        <div className="border-b border-white/10">
          <ProactivePanel suggestions={proactiveSuggestions} />
        </div>
      )}
      
      {/* Main Chat Interface */}
      <div className="flex-1 min-h-0">
        <AuraChat />
      </div>
      
      {/* Status Bar */}
      <div className="p-2 bg-black/20 backdrop-blur-lg border-t border-white/10 text-center">
        <p className="text-xs text-white/60">
          🔒 Privacy-first • 🧠 Emotionally intelligent • 🚀 Proactive AI
        </p>
      </div>
    </main>
  );
}

// ============================================
// 4. tailwind.config.js (Add this configuration)
// ============================================
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'bounce': 'bounce 1s infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'in': 'in 0.2s ease-out',
        'slide-in-from-right': 'slide-in-from-right 0.3s ease-out',
      },
      keyframes: {
        'in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in-from-right': {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        }
      }
    },
  },
  plugins: [],
}

// ============================================
// 5. src/app/globals.css (Styles)
// ============================================
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Custom scrollbar for webkit browsers */
::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* Mobile optimizations */
@media (max-width: 768px) {
  input, textarea {
    font-size: 16px; /* Prevents zoom on iOS */
  }
  
  .mobile-vh {
    height: 100dvh; /* Dynamic viewport height for mobile */
  }
}