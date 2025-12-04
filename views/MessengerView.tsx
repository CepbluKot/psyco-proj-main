
import React, { useState, useEffect, useRef } from 'react';
import { 
  Paperclip, 
  Send, 
  CheckCheck, 
  Search, 
  ArrowLeft, 
  Hash, 
  MessageSquare, 
  Plus, 
  MoreHorizontal,
  ChevronRight,
  AlertCircle,
  ArrowRight as ArrowIcon,
  CheckCircle2,
  Clock,
  User
} from 'lucide-react';
import { Message } from '../types';
import { GoogleGenAI } from "@google/genai";

// --- TYPES ---
interface ChatSession {
  id: string;
  type: 'dm' | 'channel';
  userId?: string; // For DMs
  name: string;
  role?: string;
  avatar?: string; // For DMs
  lastMessage?: string;
  timestamp?: string;
  unread: number;
  status?: 'online' | 'offline' | 'busy';
}

interface Thread {
  id: string;
  channelId: string;
  title: string;
  authorName: string;
  authorAvatar: string;
  replies: number;
  lastActivity: string;
  tags?: string[];
}

interface JiraTicket {
  key: string;
  title: string;
  status: 'To Do' | 'In Progress' | 'Done';
  priority: 'High' | 'Medium' | 'Low';
  assignee: string;
}

// --- MOCK DATA ---

// Jira Database Mock
const jiraDatabase: Record<string, JiraTicket> = {
  'MWS-1024': { key: 'MWS-1024', title: 'Implement Dark Mode for Dashboard', status: 'Done', priority: 'Medium', assignee: 'Igor Malysh' },
  'MWS-1045': { key: 'MWS-1045', title: 'Fix Login Latency on Mobile', status: 'Done', priority: 'High', assignee: 'Andrey Shtanov' },
  'MWS-1100': { key: 'MWS-1100', title: 'New Corporate News Feed Layout', status: 'In Progress', priority: 'Low', assignee: 'Ekaterina T.' },
  'MWS-1102': { key: 'MWS-1102', title: 'Integrate Tamagotchi Metrics API', status: 'To Do', priority: 'Medium', assignee: 'Oleg S.' },
  'MWS-1099': { key: 'MWS-1099', title: 'Optimize Video Streaming Codec', status: 'In Progress', priority: 'High', assignee: 'Artem Zhulin' },
};

const initialChannels: ChatSession[] = [
  { id: 'chan_general', type: 'channel', name: 'general', unread: 0 },
  { id: 'chan_engineering', type: 'channel', name: 'engineering', unread: 3 },
  { id: 'chan_releases', type: 'channel', name: 'releases', unread: 0 },
  { id: 'chan_random', type: 'channel', name: 'random', unread: 0 },
];

const initialDMs: ChatSession[] = [
  { id: 'chat_andrey', type: 'dm', userId: 'andrey', name: 'Andrey Shtanov', role: 'CCO', avatar: 'https://i.pravatar.cc/150?u=andrey', lastMessage: "Let's review the client acquisition strategy.", timestamp: '11:12', unread: 2, status: 'online' },
  { id: 'chat_igor', type: 'dm', userId: 'igor', name: 'Igor Malysh', role: 'Chief DevEx', avatar: 'https://i.pravatar.cc/150?u=igor', lastMessage: "The platform stability index is up by 5%!", timestamp: '10:45', unread: 5, status: 'online' },
  { id: 'chat_oleg', type: 'dm', userId: 'oleg', name: 'Oleg Sidorenkov', role: 'CTO', avatar: 'https://i.pravatar.cc/150?u=oleg', lastMessage: "Approved the new architectural decision record.", timestamp: 'Yesterday', unread: 1, status: 'busy' },
  { id: 'chat_artem', type: 'dm', userId: 'artem', name: 'Artem Zhulin', role: 'Head of WB', avatar: 'https://i.pravatar.cc/150?u=artem', lastMessage: "Budget forecast for Q4 is ready for review.", timestamp: 'Mon', unread: 0, status: 'offline' },
];

const initialThreads: Thread[] = [
  { id: 'th_1', channelId: 'chan_engineering', title: 'API Gateway Latency Spike', authorName: 'Oleg Sidorenkov', authorAvatar: 'https://i.pravatar.cc/150?u=oleg', replies: 14, lastActivity: '10 min ago', tags: ['Incident', 'P1'] },
  { id: 'th_2', channelId: 'chan_engineering', title: 'Migration to Kubernetes v1.28', authorName: 'Igor Malysh', authorAvatar: 'https://i.pravatar.cc/150?u=igor', replies: 45, lastActivity: '2 hours ago', tags: ['DevOps'] },
  { id: 'th_3', channelId: 'chan_engineering', title: 'Front-end Architecture Review', authorName: 'Ekaterina T.', authorAvatar: 'https://i.pravatar.cc/150?u=ekaterina', replies: 8, lastActivity: 'Yesterday', tags: ['RFC'] },
  { id: 'th_4', channelId: 'chan_general', title: 'Q4 All-Hands Meeting', authorName: 'Andrey Shtanov', authorAvatar: 'https://i.pravatar.cc/150?u=andrey', replies: 120, lastActivity: '1 hour ago' },
];

const mockThreadMessages: Record<string, Message[]> = {
  'th_1': [
    { id: 'm1', senderId: 'oleg', text: 'Team, we are seeing a 200ms increase in latency on the main gateway. Investigation started.', timestamp: '09:00', isMe: false },
    { id: 'm2', senderId: 'me', text: 'I see it too on the dashboard. Is it related to the deployment of MWS-1099?', timestamp: '09:05', isMe: true },
    { id: 'm3', senderId: 'oleg', text: 'Checking logs now. MWS-1099 might be the culprit.', timestamp: '09:07', isMe: false },
    { id: 'm4', senderId: 'igor', text: 'Rolled back MWS-1099. Latency stabilizing.', timestamp: '09:15', isMe: false },
  ]
};

// --- COMPONENT ---

interface MessengerViewProps {
  targetUserId?: string | null;
  onClearTarget?: () => void;
}

const MessengerView: React.FC<MessengerViewProps> = ({ targetUserId, onClearTarget }) => {
  // Navigation State
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  
  // Data State
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // --- JIRA VISUALIZER HELPER ---
  const renderMessageText = (text: string) => {
    // Regex to find MWS-XXXX
    const jiraRegex = /(MWS-\d+)/g;
    const parts = text.split(jiraRegex);

    return (
      <div className="space-y-2">
        <p>{parts.map((part, i) => {
          if (jiraRegex.test(part)) {
             return <span key={i} className="font-bold text-[#E30611] cursor-pointer hover:underline">{part}</span>;
          }
          return part;
        })}</p>
        
        {/* Render Cards for found tickets */}
        {text.match(jiraRegex)?.map(ticketKey => {
          const ticket = jiraDatabase[ticketKey];
          if (!ticket) return null;
          
          return (
            <div key={ticketKey} className="flex items-start gap-3 p-3 bg-white dark:bg-slate-900 border-l-4 border-[#E30611] rounded shadow-sm mt-2 max-w-sm">
               <div className="flex-1">
                 <div className="flex items-center gap-2 mb-1">
                   <span className="text-xs font-bold text-[#E30611]">{ticket.key}</span>
                   <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                     ticket.status === 'Done' ? 'bg-green-100 text-green-700' : 
                     ticket.status === 'In Progress' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                   }`}>{ticket.status}</span>
                 </div>
                 <div className="text-sm font-bold text-slate-800 dark:text-gray-200 mb-2 leading-tight">{ticket.title}</div>
                 <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                       {ticket.priority === 'High' ? <AlertCircle size={12} className="text-red-500"/> : <ArrowIcon size={12} className="text-blue-500 rotate-90"/>}
                       {ticket.priority} Priority
                    </span>
                    <span className="flex items-center gap-1">
                       <User size={12}/> {ticket.assignee}
                    </span>
                 </div>
               </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Deep linking logic
  useEffect(() => {
    if (targetUserId) {
      const chat = initialDMs.find(c => c.userId === targetUserId);
      if (chat) {
        setActiveSessionId(chat.id);
        setActiveThreadId(null); // Reset thread when switching DM
      }
      if (onClearTarget) onClearTarget();
    }
  }, [targetUserId]);

  // Load Messages Logic
  useEffect(() => {
    if (!activeSessionId) return;

    const session = [...initialDMs, ...initialChannels].find(s => s.id === activeSessionId);
    
    if (session?.type === 'dm') {
      // DM Logic (Mocked hardcoded for demo)
      if (session.userId === 'andrey') {
        setMessages([
          { id: '1', senderId: 'andrey', text: "Ekaterina, have you seen the latest NPS numbers?", timestamp: '11:02', isMe: false },
          { id: '2', senderId: 'me', text: "Yes, they look promising! Good work.", timestamp: '11:08', isMe: true },
        ]);
      } else {
         setMessages([{ id: '100', senderId: session.userId || 'user', text: session.lastMessage || 'Hello', timestamp: '09:00', isMe: false }]);
      }
    } else if (session?.type === 'channel') {
      // Channel Logic
      // If we entered a channel, we don't load messages immediately, we wait for a Thread selection.
      if (activeThreadId) {
        setMessages(mockThreadMessages[activeThreadId] || [
          { id: 'init', senderId: 'system', text: 'Start of thread history...', timestamp: '00:00', isMe: false }
        ]);
      }
    }
  }, [activeSessionId, activeThreadId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, activeSessionId, activeThreadId]);

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
      const activeSession = [...initialDMs, ...initialChannels].find(c => c.id === activeSessionId);
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: currentInput,
        config: {
          systemInstruction: `You are a colleague at MTS Web Services. 
          You are chatting with Ekaterina Tyukavkina (CEO). 
          Keep your responses professional but concise.
          If the user mentions a JIRA ticket like MWS-xxxx, acknowledge it.`,
        }
      });

      const text = response.text;

      const reply: Message = {
        id: (Date.now() + 1).toString(),
        senderId: activeSession?.userId || 'unknown',
        text: text || "Received.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: false,
      };

      setMessages((prev) => [...prev, reply]);
    } catch (error) {
       console.error(error);
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

  // --- RENDER HELPERS ---

  const activeSession = [...initialDMs, ...initialChannels].find(c => c.id === activeSessionId);
  const activeThread = initialThreads.find(t => t.id === activeThreadId);

  // 1. SIDEBAR (Session List)
  const renderSidebar = () => (
    <div className={`w-80 bg-white dark:bg-slate-900 border-r border-gray-100 dark:border-slate-700 flex flex-col h-full shrink-0 ${activeSessionId ? 'hidden lg:flex' : 'flex w-full'}`}>
      <div className="p-6 border-b border-gray-100 dark:border-slate-700">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Social</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder="Search..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:border-[#E30611] dark:text-gray-200"
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-6">
        
        {/* CHANNELS */}
        <div>
          <div className="flex items-center justify-between px-2 mb-2">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Channels</h3>
            <button className="text-gray-400 hover:text-[#E30611]"><Plus size={14} /></button>
          </div>
          <div className="space-y-1">
            {initialChannels.map(channel => (
              <button 
                key={channel.id}
                onClick={() => { setActiveSessionId(channel.id); setActiveThreadId(null); }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors group
                  ${activeSessionId === channel.id 
                    ? 'bg-red-50 dark:bg-red-900/20 text-[#E30611] font-bold' 
                    : 'text-slate-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800'}`}
              >
                <div className="flex items-center gap-2">
                  <Hash size={16} className={activeSessionId === channel.id ? 'text-[#E30611]' : 'text-gray-400'} />
                  {channel.name}
                </div>
                {channel.unread > 0 && (
                   <span className="bg-[#E30611] text-white text-[10px] font-bold px-1.5 rounded-full">{channel.unread}</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* DIRECT MESSAGES */}
        <div>
           <div className="flex items-center justify-between px-2 mb-2">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Direct Messages</h3>
            <button className="text-gray-400 hover:text-[#E30611]"><Plus size={14} /></button>
          </div>
          <div className="space-y-1">
             {initialDMs.filter(dm => dm.name.toLowerCase().includes(searchQuery.toLowerCase())).map(dm => (
               <button
                  key={dm.id}
                  onClick={() => { setActiveSessionId(dm.id); setActiveThreadId(null); }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                    ${activeSessionId === dm.id 
                      ? 'bg-red-50 dark:bg-red-900/20' 
                      : 'hover:bg-gray-50 dark:hover:bg-slate-800'}`}
               >
                 <div className="relative">
                   <img src={dm.avatar} alt={dm.name} className="w-8 h-8 rounded-full object-cover" />
                   {dm.status === 'online' && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-slate-800"></div>}
                 </div>
                 <div className="flex-1 text-left overflow-hidden">
                    <div className={`text-sm truncate ${activeSessionId === dm.id ? 'font-bold text-slate-900 dark:text-white' : 'text-slate-700 dark:text-gray-200'}`}>{dm.name}</div>
                    <div className="text-xs text-gray-400 truncate">{dm.lastMessage}</div>
                 </div>
                 {dm.unread > 0 && <div className="w-2 h-2 bg-[#E30611] rounded-full shrink-0"></div>}
               </button>
             ))}
          </div>
        </div>

      </div>
    </div>
  );

  // 2. THREAD LIST (For Channels)
  const renderThreadList = () => {
    if (!activeSession || activeSession.type !== 'channel') return null;
    
    // If a thread is selected, we might want to hide this on mobile, but for now lets assume wide screen or simple switching
    if (activeThreadId) return null; // We switch to Chat View if thread is active

    const threads = initialThreads.filter(t => t.channelId === activeSessionId);

    return (
      <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 h-full">
         <div className="h-16 px-6 flex items-center justify-between border-b border-gray-100 dark:border-slate-700">
            <div className="flex items-center gap-2">
               <button className="lg:hidden mr-2 text-gray-500" onClick={() => setActiveSessionId(null)}><ArrowLeft size={20}/></button>
               <Hash size={20} className="text-gray-400" />
               <h2 className="text-lg font-bold text-slate-800 dark:text-white">{activeSession.name}</h2>
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-[#E30611] text-white text-sm font-bold rounded-lg hover:bg-red-700 transition-colors">
              <Plus size={16} /> New Thread
            </button>
         </div>
         
         <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
            <h3 className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-wider">Active Threads</h3>
            <div className="space-y-4">
              {threads.map(thread => (
                <div 
                  key={thread.id} 
                  onClick={() => setActiveThreadId(thread.id)}
                  className="bg-gray-50 dark:bg-slate-800 p-5 rounded-xl border border-gray-100 dark:border-slate-700 hover:border-red-200 dark:hover:border-red-900/50 cursor-pointer transition-all group"
                >
                  <div className="flex justify-between items-start mb-2">
                     <h4 className="font-bold text-slate-800 dark:text-white text-lg group-hover:text-[#E30611] transition-colors">{thread.title}</h4>
                     <span className="text-xs text-gray-400 whitespace-nowrap">{thread.lastActivity}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                     {thread.tags?.map(tag => (
                       <span key={tag} className="px-2 py-0.5 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded text-xs font-bold text-slate-600 dark:text-gray-300">
                         {tag}
                       </span>
                     ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-slate-700/50">
                    <div className="flex items-center gap-2">
                      <img src={thread.authorAvatar} alt={thread.authorName} className="w-6 h-6 rounded-full" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">Started by <span className="font-medium text-slate-800 dark:text-gray-200">{thread.authorName}</span></span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500 hover:text-[#E30611]">
                       <MessageSquare size={16} />
                       <span className="text-sm font-bold">{thread.replies} replies</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
         </div>
      </div>
    );
  };

  // 3. CHAT VIEW (DM or Thread)
  const renderChat = () => {
    // Only render if we have an active DM OR an active Thread in a Channel
    const isDM = activeSession?.type === 'dm';
    const isThread = activeSession?.type === 'channel' && activeThreadId;

    if (!isDM && !isThread) return null;

    const headerTitle = isDM ? activeSession?.name : activeThread?.title;
    const headerSub = isDM ? activeSession?.role : `Thread in #${activeSession?.name}`;
    const avatar = isDM ? activeSession?.avatar : null;

    return (
      <div className="flex-1 flex flex-col bg-white dark:bg-slate-900 h-full relative z-0">
        {/* Chat Header */}
        <div className="h-16 px-6 flex items-center gap-4 border-b border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800 shrink-0 z-10">
          <button 
            onClick={() => {
              if (isDM) setActiveSessionId(null);
              if (isThread) setActiveThreadId(null);
            }}
            className="p-2 -ml-2 text-gray-400 hover:text-slate-800 dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-slate-700"
          >
            <ArrowLeft size={20} />
          </button>
          
          {avatar ? (
            <img src={avatar} alt="avatar" className="w-10 h-10 rounded-full object-cover" />
          ) : (
            <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-gray-500">
               <Hash size={20} />
            </div>
          )}
          
          <div>
            <h2 className="text-sm font-bold text-slate-800 dark:text-white line-clamp-1">{headerTitle}</h2>
            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              {isThread && <ChevronRight size={12}/>}
              {headerSub}
            </span>
          </div>
          
          <div className="ml-auto flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:text-[#E30611]"><Search size={20} /></button>
            <button className="p-2 text-gray-400 hover:text-[#E30611]"><MoreHorizontal size={20} /></button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-[#F7F9FC] dark:bg-slate-900">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex flex-col ${msg.isMe ? 'items-end' : 'items-start'} gap-1`}>
                <div className="flex items-end gap-2 max-w-[85%]">
                  {!msg.isMe && (
                     <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-slate-700 shrink-0 overflow-hidden">
                        {/* Mock avatar for non-me senders if not present in message object, simplified logic */}
                        <img src={`https://i.pravatar.cc/150?u=${msg.senderId}`} className="w-full h-full object-cover" alt="" />
                     </div>
                  )}
                  <div 
                    className={`px-5 py-3 rounded-2xl shadow-sm text-sm leading-relaxed w-full
                      ${msg.isMe 
                        ? 'bg-[#FEF2F2] dark:bg-red-900/20 border border-red-100 dark:border-red-900/50 text-slate-900 dark:text-red-100 rounded-tr-none' 
                        : 'bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-slate-700 dark:text-gray-200 rounded-tl-none'
                      }`}
                  >
                    {!msg.isMe && msg.senderId !== 'system' && (
                       <div className="text-[10px] font-bold text-gray-400 mb-1">{msg.senderId}</div>
                    )}
                    {renderMessageText(msg.text)}
                  </div>
                </div>
                <div className="flex items-center gap-1 px-10">
                  <span className="text-[10px] text-gray-400">{msg.timestamp}</span>
                  {msg.isMe && (
                     <CheckCheck size={12} className="text-[#E30611]" />
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex flex-col items-start gap-1 ml-8">
                  <div className="bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                    </div>
                  </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white dark:bg-slate-800 border-t border-gray-100 dark:border-slate-700 w-full z-10">
          <div className="flex items-center gap-4 max-w-4xl mx-auto">
            <button className="text-gray-400 hover:text-[#E30611] transition-colors">
              <Paperclip size={20} />
            </button>
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Message ${isThread ? 'thread' : activeSession?.name}...`} 
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

  // --- MAIN LAYOUT RENDER ---
  return (
    <div className="flex h-full w-full bg-[#F3F6FD] dark:bg-slate-900">
      {renderSidebar()}
      {activeSession?.type === 'channel' && !activeThreadId && renderThreadList()}
      {(activeSession?.type === 'dm' || activeThreadId) && renderChat()}
      
      {/* Empty State */}
      {!activeSessionId && (
        <div className="hidden lg:flex flex-1 items-center justify-center flex-col text-gray-400">
           <div className="w-20 h-20 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4 text-gray-300 dark:text-slate-600">
             <MessageSquare size={40} />
           </div>
           <p>Select a channel or conversation to start chatting</p>
        </div>
      )}
    </div>
  );
};

export default MessengerView;
