
import React, { useState, useEffect } from 'react';
import { 
  Gamepad2, Save, Smile, Battery, Coffee, FileText, Download, 
  Users, Zap, ExternalLink, Calendar, Search, ArrowRight, X,
  CheckCircle2, Clock, MapPin, Tag, MessageSquare, Heart, Shield,
  Bell, Lock, LogOut, File, FileSpreadsheet, FileBarChart, Image,
  Briefcase, Shuffle, BrainCircuit, Sparkles, Trophy, Target, ArrowUpRight,
  ShoppingBag, Gift, Star, Award, Laptop, Plane, Monitor
} from 'lucide-react';

// --- SHARED MODAL COMPONENT ---
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-slate-700 shrink-0">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-[#E30611] transition-colors">
            <X size={24} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto custom-scrollbar text-slate-600 dark:text-gray-300">
          {children}
        </div>
        <div className="p-6 border-t border-gray-100 dark:border-slate-700 shrink-0 bg-gray-50 dark:bg-slate-900/50 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 dark:bg-slate-700 text-slate-700 dark:text-white rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// --- KUDOS VIEW ---
export const KudosView: React.FC = () => {
  const [kudosItems, setKudosItems] = useState([
    { id: 1, from: 'Igor Malysh', avatar: 'https://i.pravatar.cc/150?u=igor', type: 'Speed', message: 'Thanks for the quick fix on the auth service!', sticker: '🚀', date: '2 hours ago', color: 'bg-blue-50 dark:bg-blue-900/20' },
    { id: 2, from: 'Oleg Sidorenkov', avatar: 'https://i.pravatar.cc/150?u=oleg', type: 'Leadership', message: 'Great job leading the quarterly planning session.', sticker: '👑', date: 'Yesterday', color: 'bg-yellow-50 dark:bg-yellow-900/20' },
    { id: 3, from: 'Maria Ivanova', avatar: 'https://i.pravatar.cc/150?u=maria', type: 'Teamwork', message: 'You really helped us out with the onboarding docs.', sticker: '🤝', date: 'Oct 20', color: 'bg-green-50 dark:bg-green-900/20' },
    { id: 4, from: 'Artem Zhulin', avatar: 'https://i.pravatar.cc/150?u=artem', type: 'Idea', message: 'The new roadmap visualization is genius.', sticker: '💡', date: 'Oct 15', color: 'bg-purple-50 dark:bg-purple-900/20' },
    { id: 5, from: 'Andrey Shtanov', avatar: 'https://i.pravatar.cc/150?u=andrey', type: 'Support', message: 'Thanks for covering for me during my PTO.', sticker: '❤️', date: 'Oct 10', color: 'bg-pink-50 dark:bg-pink-900/20' },
  ]);

  return (
    <div className="h-full overflow-y-auto p-8 custom-scrollbar bg-[#F3F6FD] dark:bg-slate-900">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Heart size={28} className="text-[#E30611] fill-current" /> Kudos Wall
          </h1>
          <p className="text-gray-500 dark:text-gray-400">Appreciation and gratitude from your colleagues.</p>
        </div>
        <div className="bg-white dark:bg-slate-800 px-4 py-2 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
           <span className="text-xs text-gray-500 uppercase font-bold">Total Kudos</span>
           <div className="text-2xl font-bold text-slate-800 dark:text-white">{kudosItems.length}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {kudosItems.map((kudos) => (
          <div key={kudos.id} className={`${kudos.color} p-6 rounded-2xl border border-white/50 dark:border-white/5 shadow-sm hover:shadow-md transition-transform hover:-translate-y-1 relative group`}>
             <div className="absolute top-4 right-4 text-4xl transform group-hover:scale-110 transition-transform cursor-default select-none">
               {kudos.sticker}
             </div>
             
             <div className="flex items-center gap-3 mb-4">
               <img src={kudos.avatar} alt={kudos.from} className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800" />
               <div>
                 <div className="text-sm font-bold text-slate-800 dark:text-white">{kudos.from}</div>
                 <div className="text-xs text-slate-500 dark:text-gray-400">{kudos.date}</div>
               </div>
             </div>
             
             <div className="mb-2">
               <span className="inline-block px-2 py-0.5 bg-white/60 dark:bg-black/20 rounded text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-gray-300">
                 {kudos.type}
               </span>
             </div>
             
             <p className="text-slate-700 dark:text-gray-200 text-sm font-medium leading-relaxed italic">
               "{kudos.message}"
             </p>
          </div>
        ))}

        {/* Placeholder for visual balance */}
        <div className="border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-2xl p-6 flex flex-col items-center justify-center text-center text-gray-400 min-h-[200px]">
           <Heart size={32} className="mb-2 opacity-50" />
           <p className="text-sm font-medium">Keep doing great work to earn more Kudos!</p>
        </div>
      </div>
    </div>
  );
};

// --- SHOP VIEW ---
export const ShopView: React.FC = () => {
  const [balance, setBalance] = useState(1250);
  const [activeCategory, setActiveCategory] = useState<'all' | 'merch' | 'digital'>('all');

  const products = [
    { id: 1, name: 'MWS Hoodie', category: 'merch', price: 500, image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=300', icon: <ShoppingBag/> },
    { id: 2, name: 'Remote Work Day', category: 'digital', price: 200, image: 'https://images.unsplash.com/photo-1593642632823-8f78536788c6?auto=format&fit=crop&q=80&w=300', icon: <Laptop/> },
    { id: 3, name: 'MWS Coffee Mug', category: 'merch', price: 150, image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&q=80&w=300', icon: <Coffee/> },
    { id: 4, name: 'Extra Vacation Day', category: 'digital', price: 1000, image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=300', icon: <Plane/> },
    { id: 5, name: 'Conference Ticket', category: 'digital', price: 800, image: 'https://images.unsplash.com/photo-1544531696-2822a09966ce?auto=format&fit=crop&q=80&w=300', icon: <Users/> },
    { id: 6, name: 'Pro Monitor Stand', category: 'merch', price: 350, image: 'https://images.unsplash.com/photo-1616628188859-7a11abb6fcc9?auto=format&fit=crop&q=80&w=300', icon: <Monitor/> },
  ];

  const handleBuy = (price: number, name: string) => {
    if (balance >= price) {
      setBalance(prev => prev - price);
      alert(`Successfully purchased ${name}!`);
    } else {
      alert("Not enough M-Coins!");
    }
  };

  const filteredProducts = activeCategory === 'all' ? products : products.filter(p => p.category === activeCategory);

  return (
    <div className="h-full overflow-y-auto p-8 custom-scrollbar bg-[#F3F6FD] dark:bg-slate-900">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
           <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
             <ShoppingBag size={28} className="text-[#E30611]" /> Reward Shop
           </h1>
           <p className="text-gray-500 dark:text-gray-400">Exchange your hard-earned M-Coins for perks.</p>
        </div>
        
        <div className="flex items-center gap-4">
           {/* Balance Card */}
           <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white px-6 py-3 rounded-2xl shadow-lg flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-yellow-400 text-yellow-900 flex items-center justify-center font-bold text-xl border-2 border-white/20">M</div>
              <div>
                <div className="text-[10px] text-gray-400 uppercase font-bold">Your Balance</div>
                <div className="text-2xl font-bold leading-none">{balance}</div>
              </div>
           </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {['all', 'merch', 'digital'].map(cat => (
          <button 
            key={cat}
            onClick={() => setActiveCategory(cat as any)}
            className={`px-4 py-2 rounded-full text-sm font-bold capitalize transition-colors
              ${activeCategory === cat 
                ? 'bg-[#E30611] text-white' 
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col group">
            <div className="h-48 overflow-hidden relative">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur p-2 rounded-lg text-slate-800 dark:text-white">
                 {product.icon}
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">{product.name}</h3>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">{product.category}</span>
              
              <div className="mt-auto flex items-center justify-between">
                <div className="flex items-center gap-1 text-slate-800 dark:text-white">
                   <span className="text-yellow-500 font-bold text-xl">M</span>
                   <span className="text-xl font-bold">{product.price}</span>
                </div>
                <button 
                  onClick={() => handleBuy(product.price, product.name)}
                  disabled={balance < product.price}
                  className={`px-4 py-2 rounded-lg font-bold text-sm transition-colors
                    ${balance >= product.price 
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-[#E30611] dark:hover:bg-gray-200' 
                      : 'bg-gray-100 dark:bg-slate-700 text-gray-400 cursor-not-allowed'}`}
                >
                  {balance >= product.price ? 'Purchase' : 'Need Coins'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- OVERVIEW VIEW ---
export const OverviewView: React.FC = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Review annual budget with Artem', done: false },
    { id: 2, text: 'Approve new hiring plan', done: true },
    { id: 3, text: 'Check Igor\'s DevEx report', done: false },
    { id: 4, text: 'Prepare slides for All-Hands', done: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  return (
    <div className="h-full overflow-y-auto p-8 custom-scrollbar bg-[#F3F6FD] dark:bg-slate-900">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-1">Good Morning, Ekaterina</h1>
        <p className="text-gray-500 dark:text-gray-400">Let's build the future of cloud today.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col: Tasks */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm">
             <div className="flex justify-between items-center mb-6">
               <h3 className="text-lg font-bold text-slate-800 dark:text-white">Today's Priorities</h3>
               <span className="text-xs font-medium text-gray-400">{tasks.filter(t => t.done).length}/{tasks.length} Completed</span>
             </div>
             <div className="space-y-3">
               {tasks.map(task => (
                 <div key={task.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors group cursor-pointer" onClick={() => toggleTask(task.id)}>
                   <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                     ${task.done ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 dark:border-slate-600'}`}>
                     {task.done && <CheckCircle2 size={14} />}
                   </div>
                   <span className={`text-sm font-medium transition-all ${task.done ? 'text-gray-400 line-through' : 'text-slate-700 dark:text-gray-200'}`}>
                     {task.text}
                   </span>
                 </div>
               ))}
             </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-red-600 rounded-2xl p-6 text-white relative overflow-hidden">
               <div className="relative z-10">
                 <div className="text-4xl font-bold mb-1">84%</div>
                 <div className="text-sm text-red-100 font-medium">OKR Progress</div>
               </div>
               <Zap className="absolute -right-2 -bottom-2 text-red-500 opacity-50" size={80} />
            </div>
            <div className="bg-slate-900 dark:bg-slate-800 rounded-2xl p-6 text-white relative overflow-hidden">
               <div className="relative z-10">
                 <div className="text-4xl font-bold mb-1">12</div>
                 <div className="text-sm text-gray-400 font-medium">Strategic Initiatives</div>
               </div>
               <FileText className="absolute -right-2 -bottom-2 text-gray-700 opacity-50" size={80} />
            </div>
          </div>
        </div>

        {/* Right Col: Schedule */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm h-fit">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Schedule</h3>
          <div className="space-y-6 relative">
            <div className="absolute left-2.5 top-2 bottom-2 w-px bg-gray-100 dark:bg-slate-700"></div>
            {[
              { time: '09:00', title: 'Executive Sync', type: 'Team', active: false },
              { time: '11:30', title: 'Product Review with Andrey', type: 'Internal', active: true },
              { time: '14:00', title: 'Architecture Review with Oleg', type: 'Tech', active: false },
              { time: '16:00', title: 'Strategy Planning', type: 'Strategy', active: false },
            ].map((event, i) => (
              <div key={i} className="flex gap-4 relative">
                <div className={`w-5 h-5 rounded-full border-4 border-white dark:border-slate-800 shrink-0 z-10 
                  ${event.active ? 'bg-[#E30611]' : 'bg-gray-200 dark:bg-slate-600'}`}></div>
                <div>
                  <span className="text-xs font-bold text-gray-400 block mb-0.5">{event.time}</span>
                  <div className="text-sm font-bold text-slate-800 dark:text-gray-200">{event.title}</div>
                  <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-slate-700 rounded text-gray-500 dark:text-gray-400 mt-1 inline-block">
                    {event.type}
                  </span>
                  {event.active && (
                    <button className="block mt-2 text-xs font-bold text-[#E30611] hover:underline" onClick={() => alert("Launching Zoom...")}>
                      Join Meeting
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- CORPORATE VIEW ---
export const CorporateView: React.FC = () => {
  const [selectedNews, setSelectedNews] = useState<any>(null);

  const newsItems = [
    {
      id: 1,
      title: "MTS Web Services expands cloud infrastructure in Far East",
      date: "Oct 24, 2025",
      category: "Infrastructure",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600",
      content: "MTS Web Services announces the opening of a new data center in Vladivostok, improving latency for customers in the region by 40%. This strategic move allows local enterprises to leverage high-performance computing without data transfer delays."
    },
    {
      id: 2,
      title: "New AI Platform launched for Enterprise customers",
      date: "Oct 10, 2025",
      category: "Product Launch",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600",
      content: "The new MWS AI Studio allows enterprise clients to fine-tune LLMs on their private data securely. Features include automated RAG pipelines, dedicated GPU clusters, and enterprise-grade compliance controls."
    },
    {
      id: 3,
      title: "Artem Zhulin discusses product strategy at TechConf",
      date: "Oct 05, 2025",
      category: "PR",
      image: "https://images.unsplash.com/photo-1544531696-2822a09966ce?auto=format&fit=crop&q=80&w=600",
      content: "Head of WB Artem Zhulin presented the roadmap for 2026, highlighting integration with ecosystem services. Key takeaways include a unified billing system and cross-product identity management."
    },
    {
      id: 4,
      title: "MWS achieves ISO 27001 certification for all regions",
      date: "Sep 28, 2025",
      category: "Compliance",
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=600",
      content: "We are proud to announce that our information security management systems have met the rigorous standards of ISO 27001 across all availability zones. This certification reinforces our commitment to data protection for our financial and government clients."
    },
    {
      id: 5,
      title: "Strategic Partnership with FinTech Giant 'AlphaBank'",
      date: "Sep 15, 2025",
      category: "Partnership",
      image: "https://images.unsplash.com/photo-1560472355-536de3962603?auto=format&fit=crop&q=80&w=600",
      content: "MTS Web Services has signed a strategic memorandum with AlphaBank to develop a sovereign financial cloud. The project aims to migrate 80% of the bank's non-critical workloads to MWS by Q3 2026."
    },
    {
      id: 6,
      title: "Green Cloud: Reducing Carbon Footprint by 25%",
      date: "Sep 01, 2025",
      category: "Sustainability",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=600",
      content: "Our new cooling systems and renewable energy contracts have successfully reduced the carbon footprint of our Moscow region data centers by 25%. We aim for carbon neutrality by 2030."
    },
    {
      id: 7,
      title: "MWS Academy: Free Cloud Training for University Students",
      date: "Aug 20, 2025",
      category: "Education",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600",
      content: "We are launching a comprehensive internship and training program for IT students. Top graduates will be offered Junior positions within our Platform Engineering and DevOps teams."
    },
    {
      id: 8,
      title: "Quarterly Hackathon Winners Announced",
      date: "Aug 10, 2025",
      category: "Culture",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600",
      content: "Team 'Serverless Surfers' took first place in our internal Q3 Hackathon with their innovative approach to edge computing optimization. They will present their solution at the upcoming All-Hands meeting."
    }
  ];

  return (
    <div className="h-full overflow-y-auto p-8 custom-scrollbar bg-[#F3F6FD] dark:bg-slate-900">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Corporate News</h1>
        <p className="text-gray-500 dark:text-gray-400">Latest updates from the MTS ecosystem.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsItems.map((item) => (
          <div key={item.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col cursor-pointer" onClick={() => setSelectedNews(item)}>
            <div className="h-48 overflow-hidden relative">
               <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform hover:scale-105 duration-500" />
               <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-xs font-bold text-slate-800 dark:text-white rounded-lg">
                 {item.category}
               </span>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <span className="text-xs text-gray-400 mb-2">{item.date}</span>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-3 leading-tight">{item.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-3 mb-4 flex-1">
                {item.content}
              </p>
              <button 
                className="flex items-center gap-2 text-[#E30611] font-bold text-sm hover:gap-3 transition-all"
              >
                Read Full Story <ArrowRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={!!selectedNews} onClose={() => setSelectedNews(null)} title={selectedNews?.category || 'News'}>
        <img src={selectedNews?.image} alt={selectedNews?.title} className="w-full h-64 object-cover rounded-xl mb-6" />
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{selectedNews?.title}</h2>
        <p className="text-sm text-gray-400 mb-6">{selectedNews?.date}</p>
        <p className="leading-relaxed whitespace-pre-wrap">{selectedNews?.content}</p>
      </Modal>
    </div>
  );
};

// --- BLOG VIEW ---
export const BlogView: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [isWriting, setIsWriting] = useState(false);

  const posts = [
    {
      id: 1,
      title: "Building Resilient Cloud Architecture",
      author: "Oleg Sidorenkov",
      role: "CTO",
      avatar: "https://i.pravatar.cc/150?u=oleg",
      tags: ["Cloud", "Architecture", "Resilience"],
      readTime: "6 min read",
      preview: "In distributed systems, failure is inevitable. Here is how we design for resilience at MWS..."
    },
    {
      id: 2,
      title: "Improving Developer Experience",
      author: "Igor Malysh",
      role: "Chief DevEx",
      avatar: "https://i.pravatar.cc/150?u=igor",
      tags: ["DevEx", "Productivity", "Culture"],
      readTime: "5 min read",
      preview: "Developer happiness correlates directly with code quality. We introduced new tools to reduce friction..."
    },
    {
      id: 3,
      title: "Product Strategy for Q4",
      author: "Artem Zhulin",
      role: "Head of WB",
      avatar: "https://i.pravatar.cc/150?u=artem",
      tags: ["Product", "Strategy", "Growth"],
      readTime: "4 min read",
      preview: "Our focus for the next quarter is on seamless integration and user onboarding..."
    }
  ];

  return (
    <div className="h-full overflow-y-auto p-8 custom-scrollbar bg-[#F3F6FD] dark:bg-slate-900">
      <div className="flex justify-between items-end mb-8">
        <div>
           <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Engineering Blog</h1>
           <p className="text-gray-500 dark:text-gray-400">Technical deep dives and lessons learned.</p>
        </div>
        <button 
          onClick={() => setIsWriting(true)}
          className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-bold text-sm hover:bg-slate-700 dark:hover:bg-gray-200 transition-colors"
        >
          Write Article
        </button>
      </div>

      <div className="space-y-6 max-w-4xl mx-auto">
        {posts.map((post) => (
          <div key={post.id} className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm hover:border-red-200 dark:hover:border-red-900 transition-all cursor-pointer group" onClick={() => setSelectedPost(post)}>
             <div className="flex items-center gap-2 mb-4">
               {post.tags.map(tag => (
                 <span key={tag} className="text-xs font-bold text-[#E30611] bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded">#{tag}</span>
               ))}
               <span className="text-xs text-gray-400 ml-auto flex items-center gap-1"><Clock size={12}/> {post.readTime}</span>
             </div>
             
             <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-3 group-hover:text-[#E30611] transition-colors">{post.title}</h2>
             <p className="text-slate-600 dark:text-gray-400 leading-relaxed mb-6">{post.preview}</p>
             
             <div className="flex items-center justify-between border-t border-gray-50 dark:border-slate-700 pt-6">
                <div className="flex items-center gap-3">
                  <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <div className="text-sm font-bold text-slate-900 dark:text-white">{post.author}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{post.role}</div>
                  </div>
                </div>
                <button className="text-sm font-bold text-slate-400 group-hover:text-[#E30611] transition-colors flex items-center gap-1">
                  Read Article <ArrowRight size={16} />
                </button>
             </div>
          </div>
        ))}
      </div>

      <Modal isOpen={!!selectedPost} onClose={() => setSelectedPost(null)} title="Article">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">{selectedPost?.title}</h1>
        <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-100 dark:border-slate-700">
           <img src={selectedPost?.avatar} className="w-12 h-12 rounded-full" alt="author" />
           <div>
             <div className="font-bold text-slate-900 dark:text-white">{selectedPost?.author}</div>
             <div className="text-sm text-gray-500">Posted on Oct 25, 2025</div>
           </div>
        </div>
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg leading-relaxed mb-4">{selectedPost?.preview}</p>
          <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <h3 className="text-xl font-bold mb-2">The Challenge</h3>
          <p className="mb-4">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <div className="p-4 bg-gray-50 dark:bg-slate-900 rounded-lg border-l-4 border-[#E30611] italic mb-6">
            "Innovation distinguishes between a leader and a follower."
          </div>
          <p>Final thoughts on why this approach worked for MTS Web Services...</p>
        </div>
      </Modal>

      {/* Write Article Modal */}
      <Modal isOpen={isWriting} onClose={() => setIsWriting(false)} title="New Article">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-gray-200 mb-1">Title</label>
            <input type="text" className="w-full px-4 py-2 border border-gray-200 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-900 focus:outline-none focus:border-[#E30611] dark:text-white" />
          </div>
          <div>
             <label className="block text-sm font-bold text-slate-700 dark:text-gray-200 mb-1">Content</label>
             <textarea className="w-full h-48 px-4 py-2 border border-gray-200 dark:border-slate-700 rounded-lg bg-gray-50 dark:bg-slate-900 focus:outline-none focus:border-[#E30611] dark:text-white"></textarea>
          </div>
          <button type="button" onClick={() => { setIsWriting(false); alert('Article submitted for review!'); }} className="w-full py-2 bg-[#E30611] text-white font-bold rounded-lg hover:bg-red-700">Publish</button>
        </form>
      </Modal>
    </div>
  );
};

// --- CAMPAIGNS VIEW (Updated) ---
export const CampaignsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'prideboard' | 'hackathons' | 'roulette'>('prideboard');
  const [rouletteState, setRouletteState] = useState<'intro' | 'scanning' | 'results'>('intro');

  // MOCK DATA: Prideboard
  const prideboardTasks = [
    { id: 1, title: 'Fix CSS in Legacy Dashboard', team: 'Platform Core', time: '1 Day', tags: ['CSS', 'React'], requester: 'Igor Malysh', requesterAvatar: 'https://i.pravatar.cc/150?u=igor' },
    { id: 2, title: 'API Documentation Review', team: 'DevRel', time: '4 Hours', tags: ['Tech Writing', 'English'], requester: 'Maria I.', requesterAvatar: 'https://i.pravatar.cc/150?u=maria' },
    { id: 3, title: 'Load Testing Script for Auth', team: 'Security', time: '2 Days', tags: ['Python', 'k6'], requester: 'Oleg S.', requesterAvatar: 'https://i.pravatar.cc/150?u=oleg' },
    { id: 4, title: 'User Interview Notes Analysis', team: 'Product WB', time: '1 Day', tags: ['Product', 'Analysis'], requester: 'Artem Z.', requesterAvatar: 'https://i.pravatar.cc/150?u=artem' },
  ];

  // MOCK DATA: Hackathons
  const hackathons = [
    { id: 1, title: "MWS AI Winter Hack", date: "Dec 15-17", participants: 120, prize: "1,000,000 ₽", status: "Registration Open", image: "https://images.unsplash.com/photo-1639322537228-ad7117a39490?auto=format&fit=crop&q=80&w=400" },
    { id: 2, title: "Green Cloud Initiative", date: "Nov 05-07", participants: 85, prize: "Eco Trip", status: "Upcoming", image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=400" },
  ];

  const pastHackathons = [
    { title: "Serverless Summer '25", winner: "Team Lambda", scoreBoost: "+150 Team Score" },
    { title: "Security CTF", winner: "WhiteHats", scoreBoost: "+200 Employee Score" },
  ];

  // MOCK DATA: Shadow Roulette Matches
  const shadowMatches = [
    { 
      id: 1, 
      team: 'Mobile App Core', 
      matchReason: '95% Skill Match (React Native)', 
      dei: 'Diverse Team',
      task: 'Review navigation gesture handling logic', 
      slots: 'Tue, Thu', 
      avatar: 'https://i.pravatar.cc/150?u=dmitry' 
    },
    { 
      id: 2, 
      team: 'Billing Squad', 
      matchReason: 'Fresh Perspective Needed', 
      dei: 'Inclusive Leadership',
      task: 'Audit invoice generation template flow', 
      slots: 'Wed', 
      avatar: 'https://i.pravatar.cc/150?u=maria' 
    }
  ];

  const startRoulette = () => {
    setRouletteState('scanning');
    setTimeout(() => {
      setRouletteState('results');
    }, 2500);
  };

  return (
    <div className="h-full overflow-y-auto p-8 custom-scrollbar bg-[#F3F6FD] dark:bg-slate-900">
      
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
        <div>
           <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Campaigns & Initiatives</h1>
           <p className="text-gray-500 dark:text-gray-400">Engage, contribute, and grow across the ecosystem.</p>
        </div>
        <div className="flex bg-white dark:bg-slate-800 rounded-xl p-1.5 border border-gray-100 dark:border-slate-700 shadow-sm">
          {[
            { id: 'prideboard', label: 'Prideboard', icon: <Briefcase size={16}/> },
            { id: 'hackathons', label: 'Hackathons', icon: <Trophy size={16}/> },
            { id: 'roulette', label: 'Shadow Roulette', icon: <Shuffle size={16}/> }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-all
                ${activeTab === tab.id 
                  ? 'bg-[#E30611] text-white shadow-md' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-700'}`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* --- TAB 1: PRIDEBOARD --- */}
      {activeTab === 'prideboard' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl mb-8 flex items-start gap-4 border border-blue-100 dark:border-blue-900/50">
            <div className="p-3 bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300 rounded-xl">
               <Briefcase size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">Internal Gig Board</h3>
              <p className="text-sm text-slate-600 dark:text-gray-300">
                Pick up short-term tasks (1-2 days) from other teams. Helping others counts towards your <span className="font-bold">Cross-Team Contribution</span> metric.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
             {prideboardTasks.map(task => (
               <div key={task.id} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                       <img src={task.requesterAvatar} alt={task.requester} className="w-8 h-8 rounded-full border border-white dark:border-slate-600" />
                       <div className="text-xs">
                         <div className="font-bold text-slate-800 dark:text-white">{task.requester}</div>
                         <div className="text-gray-400">{task.team}</div>
                       </div>
                    </div>
                    <span className="px-2 py-1 bg-gray-100 dark:bg-slate-700 text-xs font-bold text-slate-600 dark:text-gray-300 rounded flex items-center gap-1">
                       <Clock size={12} /> {task.time}
                    </span>
                  </div>
                  
                  <h4 className="font-bold text-slate-800 dark:text-white mb-2 flex-1">{task.title}</h4>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {task.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold px-2 py-1 rounded bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button className="w-full py-2 border border-[#E30611] text-[#E30611] font-bold rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors text-sm">
                    Apply for Gig
                  </button>
               </div>
             ))}
             
             {/* Add New Card */}
             <div className="border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-2xl flex flex-col items-center justify-center p-6 text-gray-400 hover:text-slate-600 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-slate-600 transition-colors cursor-pointer min-h-[200px]">
                <div className="w-12 h-12 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-2">
                  <Briefcase size={24} />
                </div>
                <span className="font-bold text-sm">Post a Request</span>
             </div>
          </div>
        </div>
      )}

      {/* --- TAB 2: HACKATHONS --- */}
      {activeTab === 'hackathons' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Upcoming Events */}
              <div className="lg:col-span-2 space-y-6">
                 <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                   <Calendar size={20} /> Upcoming Events
                 </h3>
                 {hackathons.map(hack => (
                   <div key={hack.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden shadow-sm flex flex-col md:flex-row">
                      <div className="w-full md:w-48 h-48 md:h-auto shrink-0 relative">
                        <img src={hack.image} alt={hack.title} className="w-full h-full object-cover" />
                        <div className="absolute top-2 left-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-slate-800 dark:text-white">
                          {hack.status}
                        </div>
                      </div>
                      <div className="p-6 flex-1 flex flex-col justify-center">
                        <div className="flex justify-between items-start mb-2">
                           <h4 className="text-xl font-bold text-slate-800 dark:text-white">{hack.title}</h4>
                           <span className="text-sm font-bold text-[#E30611]">{hack.prize} Pool</span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex items-center gap-4">
                           <span className="flex items-center gap-1"><Clock size={14}/> {hack.date}</span>
                           <span className="flex items-center gap-1"><Users size={14}/> {hack.participants} Joined</span>
                        </p>
                        
                        <div className="flex gap-3">
                           <button className="px-6 py-2 bg-[#E30611] text-white font-bold rounded-lg hover:bg-red-700 transition-colors">
                             Register Team
                           </button>
                           <button className="px-6 py-2 border border-gray-200 dark:border-slate-600 text-slate-700 dark:text-gray-300 font-bold rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                             Details
                           </button>
                        </div>
                      </div>
                   </div>
                 ))}
              </div>

              {/* Past Results Sidebar */}
              <div className="space-y-6">
                 <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                   <Trophy size={20} className="text-yellow-500" /> Hall of Fame
                 </h3>
                 <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm">
                    <div className="space-y-6">
                       {pastHackathons.map((ph, i) => (
                         <div key={i} className="flex items-center justify-between pb-4 border-b border-gray-50 dark:border-slate-700 last:border-0 last:pb-0">
                            <div>
                               <div className="text-xs text-gray-400 mb-1">{ph.title}</div>
                               <div className="font-bold text-slate-800 dark:text-white flex items-center gap-2">
                                 <Trophy size={14} className="text-yellow-500" /> {ph.winner}
                               </div>
                            </div>
                            <span className="px-2 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-xs font-bold rounded">
                              {ph.scoreBoost}
                            </span>
                         </div>
                       ))}
                    </div>
                    <button className="w-full mt-6 py-2 text-sm font-bold text-slate-500 dark:text-gray-400 hover:text-[#E30611] border border-dashed border-gray-200 dark:border-slate-700 rounded-lg">
                      View All History
                    </button>
                 </div>
                 
                 <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl text-white">
                    <h4 className="font-bold mb-2">Why Participate?</h4>
                    <ul className="text-sm text-gray-300 space-y-2 list-disc pl-4">
                      <li>Boost Team & Employee Score</li>
                      <li>Cross-functional networking</li>
                      <li>Direct impact on roadmap</li>
                    </ul>
                 </div>
              </div>

           </div>
        </div>
      )}

      {/* --- TAB 3: SHADOW ROULETTE (AI) --- */}
      {activeTab === 'roulette' && (
        <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300 h-full flex flex-col">
          
          {/* INTRO STATE */}
          {rouletteState === 'intro' && (
             <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                <div className="w-24 h-24 bg-gradient-to-br from-[#E30611] to-purple-600 rounded-full flex items-center justify-center mb-8 shadow-xl shadow-red-500/20">
                   <BrainCircuit size={48} className="text-white" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">Shadow Roulette</h2>
                <p className="text-lg text-slate-600 dark:text-gray-300 max-w-lg mb-8 leading-relaxed">
                  Ready to explore? FlowAI analyzes your <b>Timeline</b>, <b>Skills</b>, and <b>DEI Profile</b> to match you with a team for a 1-day shadow visit.
                </p>
                
                <div className="flex flex-col gap-4 w-full max-w-sm">
                   <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700">
                      <span className="font-bold text-slate-800 dark:text-white">Ready for Shadow</span>
                      <div className="w-12 h-6 bg-green-500 rounded-full relative cursor-pointer">
                         <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                      </div>
                   </div>
                   <button 
                     onClick={startRoulette}
                     className="w-full py-4 bg-[#E30611] text-white font-bold text-lg rounded-xl shadow-lg hover:bg-red-700 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                   >
                     <Sparkles size={20} /> Find My Match
                   </button>
                </div>
                
                <p className="mt-8 text-xs text-gray-400">
                  Shadow Roulette = managed internal mobility & knowledge exchange embedded in your metrics.
                </p>
             </div>
          )}

          {/* SCANNING STATE */}
          {rouletteState === 'scanning' && (
             <div className="flex-1 flex flex-col items-center justify-center">
                <div className="relative mb-8">
                   <div className="w-32 h-32 rounded-full border-4 border-gray-100 dark:border-slate-700"></div>
                   <div className="absolute inset-0 rounded-full border-4 border-t-[#E30611] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                   <BrainCircuit size={48} className="absolute inset-0 m-auto text-slate-300 dark:text-slate-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">FlowAI is analyzing...</h3>
                <div className="flex flex-col gap-2 text-sm text-gray-500">
                   <div className="flex items-center gap-2 animate-pulse"><CheckCircle2 size={14} className="text-[#E30611]"/> Checking Timeline availability...</div>
                   <div className="flex items-center gap-2 animate-pulse delay-75"><CheckCircle2 size={14} className="text-[#E30611]"/> Mapping Skill Gaps...</div>
                   <div className="flex items-center gap-2 animate-pulse delay-150"><CheckCircle2 size={14} className="text-[#E30611]"/> Reviewing DEI & Connections...</div>
                </div>
             </div>
          )}

          {/* RESULTS STATE */}
          {rouletteState === 'results' && (
             <div className="py-6">
                <div className="flex items-center justify-between mb-6">
                   <h2 className="text-xl font-bold text-slate-800 dark:text-white">We found 2 perfect matches!</h2>
                   <button onClick={() => setRouletteState('intro')} className="text-sm font-bold text-gray-400 hover:text-slate-800">Reset</button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {shadowMatches.map(match => (
                     <div key={match.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
                        {/* Match Header */}
                        <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 text-white relative">
                           <div className="flex items-center gap-4 mb-4">
                              <img src={match.avatar} className="w-12 h-12 rounded-full border-2 border-white/20" alt="lead" />
                              <div>
                                 <h3 className="font-bold text-lg">{match.team}</h3>
                                 <div className="text-xs text-slate-300">{match.dei}</div>
                              </div>
                           </div>
                           <div className="absolute top-6 right-6 px-3 py-1 bg-[#E30611] rounded-full text-xs font-bold shadow-lg">
                              {match.matchReason}
                           </div>
                        </div>
                        
                        {/* Match Body */}
                        <div className="p-6 flex-1 flex flex-col">
                           <div className="mb-4">
                              <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Mini-Task</h4>
                              <p className="text-sm font-medium text-slate-800 dark:text-white bg-gray-50 dark:bg-slate-900/50 p-3 rounded-lg border border-gray-100 dark:border-slate-700">
                                 {match.task}
                              </p>
                           </div>
                           
                           <div className="mb-6">
                              <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Available Slots</h4>
                              <div className="flex gap-2">
                                 {match.slots.split(', ').map(slot => (
                                    <span key={slot} className="px-3 py-1 rounded bg-gray-100 dark:bg-slate-700 text-sm font-bold text-slate-600 dark:text-gray-300">
                                       {slot}
                                    </span>
                                 ))}
                              </div>
                           </div>

                           <button className="w-full mt-auto py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
                              Book Shadow Visit <ArrowUpRight size={16} />
                           </button>
                        </div>
                     </div>
                   ))}
                </div>

                <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl flex items-start gap-3 text-sm text-blue-800 dark:text-blue-300">
                   <Target size={20} className="shrink-0 mt-0.5" />
                   <p>
                      <b>Pro Tip:</b> After your visit, log your findings and ideas in the <b>Timeline</b> to boost your Collaboration Score. 
                      Feedback automatically flows into the host team's backlog.
                   </p>
                </div>
             </div>
          )}
        </div>
      )}

    </div>
  );
};

// --- TAMAGOTCHI VIEW ---
export const TamagotchiView: React.FC = () => {
  const [stats, setStats] = useState({ hunger: 80, happiness: 60, energy: 40 });
  const [message, setMessage] = useState("I'm ready to work!");

  const interact = (type: 'feed' | 'play' | 'sleep') => {
    if (type === 'feed') {
      setStats(prev => ({ ...prev, hunger: Math.min(100, prev.hunger + 20) }));
      setMessage("Yummy! Let's code.");
    } else if (type === 'play') {
      setStats(prev => ({ ...prev, happiness: Math.min(100, prev.happiness + 15), energy: Math.max(0, prev.energy - 10) }));
      setMessage("That was fun! But I'm tired.");
    } else if (type === 'sleep') {
      setStats(prev => ({ ...prev, energy: Math.min(100, prev.energy + 30) }));
      setMessage("Zzz... recharging.");
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 bg-[#F3F6FD] dark:bg-slate-900">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-slate-700 text-center relative overflow-hidden">
        
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-purple-500"></div>
        
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">My DevPet</h2>
        <p className="text-gray-500 text-sm mb-8">{message}</p>

        <div className="w-48 h-48 mx-auto bg-gray-100 dark:bg-slate-900 rounded-full flex items-center justify-center mb-8 relative">
           {/* Simple CSS Pet */}
           <div className="relative animate-bounce">
              <Gamepad2 size={80} className="text-[#E30611]" />
              <div className="absolute -top-1 -right-1">
                 {stats.happiness > 80 ? <Heart size={24} className="text-pink-500 fill-current animate-pulse" /> : null}
              </div>
           </div>
        </div>

        <div className="space-y-4 mb-8">
           <div>
             <div className="flex justify-between text-xs font-bold text-gray-400 mb-1">
               <span>Hunger</span>
               <span>{stats.hunger}%</span>
             </div>
             <div className="h-2 w-full bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
               <div className="h-full bg-green-500 transition-all duration-500" style={{ width: `${stats.hunger}%` }}></div>
             </div>
           </div>
           <div>
             <div className="flex justify-between text-xs font-bold text-gray-400 mb-1">
               <span>Happiness</span>
               <span>{stats.happiness}%</span>
             </div>
             <div className="h-2 w-full bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
               <div className="h-full bg-pink-500 transition-all duration-500" style={{ width: `${stats.happiness}%` }}></div>
             </div>
           </div>
           <div>
             <div className="flex justify-between text-xs font-bold text-gray-400 mb-1">
               <span>Energy</span>
               <span>{stats.energy}%</span>
             </div>
             <div className="h-2 w-full bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
               <div className="h-full bg-blue-500 transition-all duration-500" style={{ width: `${stats.energy}%` }}></div>
             </div>
           </div>
        </div>

        <div className="flex justify-center gap-4">
           <button onClick={() => interact('feed')} className="p-3 bg-green-50 text-green-600 rounded-xl hover:bg-green-100 transition-colors">
             <Coffee size={24} />
           </button>
           <button onClick={() => interact('play')} className="p-3 bg-pink-50 text-pink-600 rounded-xl hover:bg-pink-100 transition-colors">
             <Smile size={24} />
           </button>
           <button onClick={() => interact('sleep')} className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors">
             <Battery size={24} />
           </button>
        </div>
      </div>
    </div>
  );
};

// --- ACCOUNT VIEW ---
export const AccountView: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto p-8 custom-scrollbar bg-[#F3F6FD] dark:bg-slate-900">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Account Settings</h1>
      
      <div className="max-w-3xl space-y-6">
        {/* Profile Section */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm">
           <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Profile Information</h3>
           <div className="flex items-start gap-6">
              <img src="https://i.pravatar.cc/150?u=ekaterina" className="w-20 h-20 rounded-full border-4 border-gray-100 dark:border-slate-700" alt="Profile" />
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                   <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Full Name</label>
                   <input type="text" value="Ekaterina Tyukavkina" className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-white" readOnly />
                 </div>
                 <div>
                   <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Email</label>
                   <input type="email" value="e.tyukavkina@mts.ru" className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-white" readOnly />
                 </div>
                 <div>
                   <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Role</label>
                   <input type="text" value="CEO" className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-white" readOnly />
                 </div>
                 <div>
                   <label className="block text-xs font-bold text-gray-400 uppercase mb-1">Department</label>
                   <input type="text" value="Executive" className="w-full px-3 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-white" readOnly />
                 </div>
              </div>
           </div>
        </div>

        {/* Security Section */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm">
           <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Security</h3>
           <div className="space-y-4">
             <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-900 rounded-xl">
               <div className="flex items-center gap-3">
                 <Lock size={20} className="text-gray-400" />
                 <div>
                   <div className="font-bold text-sm text-slate-800 dark:text-white">Password</div>
                   <div className="text-xs text-gray-500">Last changed 3 months ago</div>
                 </div>
               </div>
               <button className="text-xs font-bold text-[#E30611] hover:underline">Update</button>
             </div>
             <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-900 rounded-xl">
               <div className="flex items-center gap-3">
                 <Shield size={20} className="text-gray-400" />
                 <div>
                   <div className="font-bold text-sm text-slate-800 dark:text-white">Two-Factor Authentication</div>
                   <div className="text-xs text-green-500 font-bold">Enabled</div>
                 </div>
               </div>
               <button className="text-xs font-bold text-gray-500 hover:text-slate-800 dark:hover:text-white">Configure</button>
             </div>
           </div>
        </div>
        
        <div className="pt-4 border-t border-gray-200 dark:border-slate-700 flex justify-end">
           <button className="flex items-center gap-2 text-red-600 font-bold text-sm px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
             <LogOut size={16} /> Sign Out
           </button>
        </div>
      </div>
    </div>
  );
};

// --- DOCUMENTS VIEW ---
export const DocumentsView: React.FC = () => {
  const docs = [
    { name: 'Employee Handbook 2025.pdf', type: 'PDF', date: 'Oct 01', size: '2.4 MB', icon: <File size={24} className="text-red-500"/> },
    { name: 'Q3 Financial Report.xlsx', type: 'Excel', date: 'Sep 28', size: '1.1 MB', icon: <FileSpreadsheet size={24} className="text-green-500"/> },
    { name: 'Brand Assets Pack.zip', type: 'Archive', date: 'Sep 15', size: '45 MB', icon: <Image size={24} className="text-blue-500"/> },
    { name: 'Project Alpha Spec.docx', type: 'Word', date: 'Aug 30', size: '800 KB', icon: <FileText size={24} className="text-blue-400"/> },
    { name: 'Security Policy v2.pdf', type: 'PDF', date: 'Aug 10', size: '3.2 MB', icon: <File size={24} className="text-red-500"/> },
    { name: 'Marketing Strategy 2026.pptx', type: 'PowerPoint', date: 'Jul 20', size: '12 MB', icon: <FileBarChart size={24} className="text-orange-500"/> },
  ];

  return (
    <div className="h-full overflow-y-auto p-8 custom-scrollbar bg-[#F3F6FD] dark:bg-slate-900">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Documents</h1>
          <p className="text-gray-500 dark:text-gray-400">Company policies, templates, and reports.</p>
        </div>
        <button className="px-4 py-2 bg-[#E30611] text-white rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-red-700 transition-colors">
          <Download size={16} /> Upload New
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {docs.map((doc, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all cursor-pointer group">
             <div className="flex justify-between items-start mb-4">
               <div className="p-3 bg-gray-50 dark:bg-slate-900 rounded-xl group-hover:scale-110 transition-transform">
                 {doc.icon}
               </div>
               <button className="text-gray-300 hover:text-slate-600 dark:hover:text-white"><Download size={16}/></button>
             </div>
             <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-1 truncate">{doc.name}</h3>
             <div className="flex items-center gap-3 text-xs text-gray-400">
               <span>{doc.date}</span>
               <span>•</span>
               <span>{doc.size}</span>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- FOLLOWERS VIEW ---
export const FollowersView: React.FC<{ onMessage: (id: string) => void }> = ({ onMessage }) => {
  const followers = [
    { id: 'oleg', name: 'Oleg Sidorenkov', role: 'CTO', avatar: 'https://i.pravatar.cc/150?u=oleg' },
    { id: 'igor', name: 'Igor Malysh', role: 'Chief DevEx', avatar: 'https://i.pravatar.cc/150?u=igor' },
    { id: 'andrey', name: 'Andrey Shtanov', role: 'CCO', avatar: 'https://i.pravatar.cc/150?u=andrey' },
    { id: 'artem', name: 'Artem Zhulin', role: 'Head of WB', avatar: 'https://i.pravatar.cc/150?u=artem' },
    { id: 'maria', name: 'Maria Ivanova', role: 'HR Director', avatar: 'https://i.pravatar.cc/150?u=maria' },
    { id: 'dmitry', name: 'Dmitry Petrov', role: 'Lead Designer', avatar: 'https://i.pravatar.cc/150?u=dmitry' },
  ];

  return (
    <div className="h-full overflow-y-auto p-8 custom-scrollbar bg-[#F3F6FD] dark:bg-slate-900">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Followers</h1>
        <p className="text-gray-500 dark:text-gray-400">Colleagues following your updates.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {followers.map((user) => (
          <div key={user.id} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm flex items-center gap-4">
             <img src={user.avatar} className="w-16 h-16 rounded-full border-4 border-gray-50 dark:border-slate-900" alt={user.name} />
             <div className="flex-1">
               <h3 className="font-bold text-slate-800 dark:text-white">{user.name}</h3>
               <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">{user.role}</p>
               <button 
                 onClick={() => onMessage(user.id)}
                 className="text-xs font-bold text-[#E30611] border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-900/10 px-3 py-1.5 rounded-full hover:bg-[#E30611] hover:text-white transition-colors"
               >
                 Message
               </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};
