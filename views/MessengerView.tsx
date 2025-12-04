
import React, { useState, useEffect, useRef } from 'react';
import { Paperclip, Send, CheckCheck, Search, ArrowLeft } from 'lucide-react';
import { Message } from '../types';
import { GoogleGenAI } from "@google/genai";

interface ChatSession {
  id: string;
  userId: string;
  name: string;
  role: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  status?: 'online' | 'offline' | 'busy';
}

const initialChats: ChatSession[] = [
  { id: 'chat_andrey', userId: 'andrey', name: 'Andrey Shtanov', role: 'CCO', avatar: 'https://i.pravatar.cc/150?u=andrey', lastMessage: "Let's review the client acquisition strategy.", timestamp: '11:12', unread: 2, status: 'online' },
  { id: 'chat_igor', userId: 'igor', name: 'Igor Malysh', role: 'Chief DevEx', avatar: 'https://i.pravatar.cc/150?u=igor', lastMessage: "The platform stability index is up by 5%!", timestamp: '10:45', unread: 5, status: 'online' },
  { id: 'chat_oleg', userId: 'oleg', name: 'Oleg Sidorenkov', role: 'CTO', avatar: 'https://i.pravatar.cc/150?u=oleg', lastMessage: "Approved the new architectural decision record.", timestamp: 'Yesterday', unread: 1, status: 'busy' },
  { id: 'chat_artem', userId: 'artem', name: 'Artem Zhulin', role: 'Head of WB', avatar: 'https://i.pravatar.cc/150?u=artem', lastMessage: "Budget forecast for Q4 is ready for review.", timestamp: 'Mon', unread: 0, status: 'offline' },
];

const initialMessagesAndrey: Message[] = [
  { id: '1', senderId: 'andrey', text: "Ekaterina, have you seen the latest NPS numbers?", timestamp: '11:02', isMe: false },
  { id: '2', senderId: 'me', text: "Yes, they look promising! Good work.", timestamp: '11:08', isMe: true },
  { id: '3', senderId: 'andrey', text: "I think we can push harder on the enterprise segment.", timestamp: '11:10', isMe: false },
  { id: '4', senderId: 'me', text: "Agreed. Let's discuss this in the Monday sync.", timestamp: '11:12', isMe: true },
];

interface MessengerViewProps {
  targetUserId?: string | null;
  onClearTarget?: () => void;
}

const MessengerView: React.FC<MessengerViewProps> = ({ targetUserId, onClearTarget }) => {
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Deep linking logic
  useEffect(() => {
    if (targetUserId) {
      const chat = initialChats.find(c => c.userId === targetUserId);
      if (chat) {
        setActiveChatId(chat.id);
      } else {
        console.warn('Chat user not found:', targetUserId);
      }
      if (onClearTarget) onClearTarget();
    }
  }, [targetUserId]);

  useEffect(() => {
    if (!activeChatId) return;

    if (activeChatId === 'chat_andrey') {
      setMessages(initialMessagesAndrey);
    } else {
      // If no history, generate from last message to fix "empty chat" look
      const chat = initialChats.find(c => c.id === activeChatId);
      if (chat) {
        setMessages([
           { 
             id: '100', 
             senderId: chat.userId, 
             text: chat.lastMessage, 
             timestamp: chat.timestamp === 'Yesterday' || chat.timestamp.length > 5 ? '09:00' : chat.timestamp, 
             isMe: false 
           }
        ]);
      }
    }
  }, [activeChatId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, activeChatId]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      text: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const activeChat = initialChats.find(c => c.id === activeChatId);
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: currentInput,
        config: {
          systemInstruction: `You are ${activeChat?.name || 'a colleague'}, ${activeChat?.role || ''} at MTS Web Services. 
          You are chatting with Ekaterina Tyukavkina (CEO). 
          Keep your responses professional but concise, suitable for a corporate messenger. 
          Do not be overly formal if the role suggests otherwise, but maintain professional courtesy.`,
        }
      });

      const text = response.text;

      const reply: Message = {
        id: (Date.now() + 1).toString(),
        senderId: activeChat?.userId || 'unknown',
        text: text || "I received your message but couldn't think of a response.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: false,
      };

      setMessages((prev) => [...prev, reply]);
    } catch (error) {
      console.error("Error generating response:", error);
      const errorReply: Message = {
        id: (Date.now() + 1).toString(),
        senderId: 'system',
        text: "Sorry, I'm having trouble connecting to the AI assistant right now.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: false,
      };
      setMessages((prev) => [...prev, errorReply]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const filteredChats = initialChats.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- LIST VIEW ---
  if (!activeChatId) {
    return (
      <div className="h-full flex flex-col bg-white dark:bg-slate-900">
        <div className="p-6 border-b border-gray-100 dark:border-slate-700">
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Messages</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:border-[#E30611] dark:text-gray-200 transition-colors"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {filteredChats.map((chat) => (
            <div 
              key={chat.id}
              onClick={() => setActiveChatId(chat.id)}
              className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-slate-800 cursor-pointer border-b border-gray-50 dark:border-slate-800 transition-colors"
            >
              <div className="relative">
                <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full object-cover" />
                {chat.status === 'online' && <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-slate-900 absolute bottom-0 right-0"></div>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-sm font-bold text-slate-800 dark:text-white truncate">{chat.name}</h3>
                  <span className="text-xs text-gray-400">{chat.timestamp}</span>
                </div>
                <p className={`text-sm truncate ${chat.unread > 0 ? 'font-bold text-slate-900 dark:text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                  {chat.lastMessage}
                </p>
              </div>
              {chat.unread > 0 && (
                <div className="w-5 h-5 bg-[#E30611] rounded-full flex items-center justify-center text-[10px] text-white font-bold shrink-0">
                  {chat.unread}
                </div>
              )}
            </div>
          ))}
          {filteredChats.length === 0 && (
             <div className="text-center p-8 text-gray-400">No chats found.</div>
          )}
        </div>
      </div>
    );
  }

  // --- CHAT VIEW ---
  const activeChat = initialChats.find(c => c.id === activeChatId);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-900 relative">
      
      {/* Chat Header */}
      <div className="h-16 px-6 flex items-center gap-4 border-b border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800 shrink-0 z-10">
        <button 
          onClick={() => setActiveChatId(null)}
          className="p-2 -ml-2 text-gray-400 hover:text-slate-800 dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-slate-700"
        >
          <ArrowLeft size={20} />
        </button>
        <img src={activeChat?.avatar} alt={activeChat?.name} className="w-10 h-10 rounded-full object-cover" />
        <div>
          <h2 className="text-sm font-bold text-slate-800 dark:text-white">{activeChat?.name}</h2>
          <span className="text-xs text-gray-500 dark:text-gray-400">{activeChat?.role}</span>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-[#F7F9FC] dark:bg-slate-900">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'} gap-1`}>
              <div 
                className={`px-5 py-3 rounded-2xl max-w-lg shadow-sm text-sm leading-relaxed
                  ${msg.isMe 
                    ? 'bg-[#FEF2F2] dark:bg-red-900/20 border border-red-100 dark:border-red-900/50 text-slate-900 dark:text-red-100 rounded-tr-none' 
                    : 'bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-slate-700 dark:text-gray-200 rounded-tl-none'
                  }`}
              >
                {msg.text}
              </div>
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-gray-400">{msg.timestamp}</span>
                {msg.isMe && (
                   <CheckCheck size={12} className="text-[#E30611]" />
                )}
              </div>
            </div>
          ))}

          {isTyping && (
             <div className="flex flex-col items-start gap-1">
                <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                  </div>
                </div>
                <span className="text-[10px] text-gray-400 ml-2">{activeChat?.name.split(' ')[0]} is typing...</span>
             </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white dark:bg-slate-800 border-t border-gray-100 dark:border-slate-700 absolute bottom-0 w-full z-10">
        <div className="flex items-center gap-4 max-w-4xl mx-auto">
          <button className="text-gray-400 hover:text-[#E30611] transition-colors">
            <Paperclip size={20} />
          </button>
          <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Write a message..." 
            className="flex-1 bg-transparent text-sm text-slate-700 dark:text-gray-200 placeholder-gray-400 focus:outline-none"
          />
          <button 
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className={`transition-colors ${inputValue.trim() ? 'text-[#E30611]' : 'text-gray-300 dark:text-gray-600'}`}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessengerView;
