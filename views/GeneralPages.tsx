
import React, { useState } from 'react';
import { 
  Gamepad2, Save, Smile, Battery, Coffee, FileText, Download, 
  Users, Zap, ExternalLink, Calendar, Search, ArrowRight, X,
  CheckCircle2, Clock, MapPin, Tag, MessageSquare
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
      content: "MTS Web Services announces the opening of a new data center in Vladivostok, improving latency for customers in the region by 40%..."
    },
    {
      id: 2,
      title: "New AI Platform launched for Enterprise customers",
      date: "Oct 10, 2025",
      category: "Product Launch",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=600",
      content: "The new MWS AI Studio allows enterprise clients to fine-tune LLMs on their private data securely..."
    },
    {
      id: 3,
      title: "Artem Zhulin discusses product strategy at TechConf",
      date: "Oct 05, 2025",
      category: "PR",
      image: "https://images.unsplash.com/photo-1544531696-2822a09966ce?auto=format&fit=crop&q=80&w=600",
      content: "Head of WB Artem Zhulin presented the roadmap for 2026, highlighting integration with ecosystem services..."
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
          <div key={item.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
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
                onClick={() => setSelectedNews(item)}
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
        <p className="leading-relaxed whitespace-pre-wrap">{selectedNews?.content} {selectedNews?.content} {selectedNews?.content}</p>
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

export const CampaignsView: React.FC = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [selectedCampaign, setSelectedCampaign] = useState<any>(null);

  const campaigns = [
    { title: "Code Quality Sprint", type: "Engineering", date: "Dec 10-15", participants: 42, progress: 65, status: "Active", desc: "Focus on reducing technical debt and improving test coverage." },
    { title: "Cloud Migration", type: "Initiative", date: "Q4 2025", participants: 150, progress: 30, status: "Active", desc: "Moving legacy systems to the new MWS cloud infrastructure." },
    { title: "Security Awareness", type: "Training", date: "Nov 2024", participants: 300, progress: 100, status: "Completed", desc: "Annual security training for all employees." },
  ];

  return (
    <div className="h-full overflow-y-auto p-8 custom-scrollbar bg-[#F3F6FD] dark:bg-slate-900">
      <div className="flex justify-between items-center mb-8">
        <div>
           <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Campaigns</h1>
           <p className="text-gray-500 dark:text-gray-400">Internal initiatives and hackathons.</p>
        </div>
        <div className="flex bg-white dark:bg-slate-800 rounded-lg p-1 border border-gray-100 dark:border-slate-700">
          <button onClick={() => setActiveTab('active')} className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === 'active' ? 'bg-[#E30611] text-white' : 'text-gray-500 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white'}`}>Active</button>
          <button onClick={() => setActiveTab('past')} className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${activeTab === 'past' ? 'bg-[#E30611] text-white' : 'text-gray-500 dark:text-gray-400 hover:text-slate-800 dark:hover:text-white'}`}>Past</button>
        </div>
      </div>

      <div className="grid gap-4">
        {campaigns.filter(c => activeTab === 'active' ? c.status !== 'Completed' : c.status === 'Completed').map((c, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl
                ${c.type === 'Hackathon' ? 'bg-purple-50 text-purple-600 dark:bg-purple-900/30 dark:text-purple-300' : 'bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300'}`}>
                {c.title.charAt(0)}
              </div>
              <div>
                <h3 className="font-bold text-slate-800 dark:text-white">{c.title}</h3>
                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-1">
                  <span className="px-2 py-0.5 bg-gray-100 dark:bg-slate-700 rounded text-slate-600 dark:text-gray-300 font-medium">{c.type}</span>
                  <span className="flex items-center gap-1"><Calendar size={12}/> {c.date}</span>
                  <span className="flex items-center gap-1"><Users size={12}/> {c.participants} joined</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="w-32 hidden md:block">
                <div className="flex justify-between text-xs mb-1">
                   <span className="font-medium text-slate-600 dark:text-gray-400">Progress</span>
                   <span className="font-bold text-slate-800 dark:text-white">{c.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 dark:bg-slate-700 rounded-full">
                  <div className="h-full bg-[#E30611] rounded-full" style={{ width: `${c.progress}%` }}></div>
                </div>
              </div>
              <button 
                onClick={() => setSelectedCampaign(c)}
                className="px-4 py-2 border border-gray-200 dark:border-slate-600 rounded-lg text-sm font-bold text-slate-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 hover:text-[#E30611] transition-colors"
              >
                Details
              </button>
            </div>
          </div>
        ))}
        
        {campaigns.filter(c => activeTab === 'active' ? c.status !== 'Completed' : c.status === 'Completed').length === 0 && (
           <div className="text-center py-12 text-gray-400">No campaigns found in this category.</div>
        )}
      </div>

      <Modal isOpen={!!selectedCampaign} onClose={() => setSelectedCampaign(null)} title={selectedCampaign?.title}>
         <div className="mb-4">
            <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-slate-700 text-slate-700 dark:text-gray-300 text-xs font-bold rounded mb-2">{selectedCampaign?.type}</span>
            <p className="text-slate-600 dark:text-gray-300">{selectedCampaign?.desc}</p>
         </div>
         <div className="grid grid-cols-2 gap-4 mb-4">
           <div className="bg-gray-50 dark:bg-slate-900 p-4 rounded-xl">
              <div className="text-2xl font-bold text-[#E30611]">{selectedCampaign?.participants}</div>
              <div className="text-xs text-gray-400 uppercase">Participants</div>
           </div>
           <div className="bg-gray-50 dark:bg-slate-900 p-4 rounded-xl">
              <div className="text-2xl font-bold text-slate-800 dark:text-white">{selectedCampaign?.progress}%</div>
              <div className="text-xs text-gray-400 uppercase">Completion</div>
           </div>
         </div>
         <button onClick={() => alert('Joined campaign!')} className="w-full py-2 bg-[#E30611] text-white font-bold rounded-lg hover:bg-red-700">Join Campaign</button>
      </Modal>
    </div>
  );
};

export const DocumentsView: React.FC = () => {
  const [search, setSearch] = useState('');

  const docs = [
    { name: "MWS_Platform_Architecture.pdf", size: "2.4 MB", type: "PDF", date: "Today" },
    { name: "Q4_Budget_Forecast.xlsx", size: "1.1 MB", type: "XLSX", date: "Yesterday" },
    { name: "DevEx_Strategy_2026.docx", size: "450 KB", type: "DOCX", date: "Dec 1" },
    { name: "Cloud_Network_Diagram.png", size: "8.9 MB", type: "PNG", date: "Nov 28" },
    { name: "Employee_Handbook.pdf", size: "3.2 MB", type: "PDF", date: "Nov 15" },
  ];

  const filteredDocs = docs.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="h-full overflow-y-auto p-8 custom-scrollbar bg-[#F3F6FD] dark:bg-slate-900">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Documents</h1>
          <p className="text-gray-500 dark:text-gray-400">Specs, Requirements, and Architectural Decision Records.</p>
        </div>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search docs..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm focus:outline-none focus:border-[#E30611] w-64 text-slate-800 dark:text-white" 
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50 dark:bg-slate-900 border-b border-gray-100 dark:border-slate-700 text-xs uppercase text-gray-500 font-bold">
               <th className="px-6 py-4">Name</th>
               <th className="px-6 py-4">Type</th>
               <th className="px-6 py-4">Size</th>
               <th className="px-6 py-4">Modified</th>
               <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
            {filteredDocs.map((doc, i) => (
              <tr key={i} className="hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors group">
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-red-50 dark:bg-red-900/20 text-[#E30611] flex items-center justify-center">
                    <FileText size={16} />
                  </div>
                  <span className="text-sm font-medium text-slate-700 dark:text-gray-200">{doc.name}</span>
                </td>
                <td className="px-6 py-4 text-xs font-bold text-gray-500">{doc.type}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{doc.size}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{doc.date}</td>
                <td className="px-6 py-4">
                  <button className="text-gray-400 hover:text-[#E30611] transition-colors" title="Download">
                    <Download size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredDocs.length === 0 && (
               <tr><td colSpan={5} className="px-6 py-8 text-center text-gray-400">No documents found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

interface FollowersProps {
  onMessage: (userId: string) => void;
}

export const FollowersView: React.FC<FollowersProps> = ({ onMessage }) => {
  const followers = [
    { id: 'andrey', name: "Andrey Shtanov", role: "CCO", avatar: "https://i.pravatar.cc/150?u=andrey" },
    { id: 'oleg', name: "Oleg Sidorenkov", role: "CTO", avatar: "https://i.pravatar.cc/150?u=oleg" },
    { id: 'igor', name: "Igor Malysh", role: "Chief DevEx", avatar: "https://i.pravatar.cc/150?u=igor" },
    { id: 'artem', name: "Artem Zhulin", role: "Head of WB", avatar: "https://i.pravatar.cc/150?u=artem" },
  ];

  return (
    <div className="h-full overflow-y-auto p-8 custom-scrollbar bg-[#F3F6FD] dark:bg-slate-900">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Followers</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">People following your technical contributions.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {followers.map((f, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={f.avatar} alt={f.name} className="w-10 h-10 rounded-full object-cover border border-gray-100 dark:border-slate-600" />
              <div>
                <div className="text-sm font-bold text-slate-800 dark:text-white">{f.name}</div>
                <div className="text-xs text-gray-400">{f.role}</div>
              </div>
            </div>
            <button 
              onClick={() => onMessage(f.id)}
              className="px-3 py-1 text-xs font-bold text-[#E30611] bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-[#E30611] hover:text-white transition-colors"
            >
              Message
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export const AccountView: React.FC = () => {
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Account settings saved successfully.");
  };

  return (
    <div className="h-full overflow-y-auto p-8 custom-scrollbar bg-[#F3F6FD] dark:bg-slate-900">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Account Settings</h1>
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm p-8 max-w-2xl">
        <form className="space-y-6" onSubmit={handleSave}>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">First Name</label>
              <input type="text" defaultValue="Ekaterina" className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-lg text-sm focus:outline-none focus:border-[#E30611] text-slate-800 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Last Name</label>
              <input type="text" defaultValue="Tyukavkina" className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-lg text-sm focus:outline-none focus:border-[#E30611] text-slate-800 dark:text-white" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Email</label>
            <input type="email" defaultValue="e.tyukavkina@mts.ru" className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-600 rounded-lg text-sm focus:outline-none focus:border-[#E30611] text-slate-800 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2">Role</label>
            <input type="text" defaultValue="CEO" disabled className="w-full px-4 py-2 bg-gray-100 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-lg text-sm text-gray-500 dark:text-gray-400" />
          </div>
          <div className="pt-4 flex justify-end">
            <button type="submit" className="flex items-center gap-2 bg-[#E30611] text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors">
              <Save size={16} />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const TamagotchiView: React.FC = () => {
  const [energy, setEnergy] = useState(85);
  const [happy, setHappy] = useState(true);

  const feed = () => {
    setEnergy(Math.min(100, energy + 10));
    setHappy(true);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 bg-[#F3F6FD] dark:bg-slate-900">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-lg max-w-md w-full text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-[#E30611]"></div>
        
        <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-1">Team Spirit</h2>
        <p className="text-xs text-gray-400 mb-8">Your digital team health companion</p>

        <div className="w-48 h-48 bg-red-50 dark:bg-red-900/10 rounded-full mx-auto mb-8 flex items-center justify-center relative group cursor-pointer transition-transform hover:scale-105">
          <div className="text-6xl animate-bounce">{happy ? '👾' : '😴'}</div>
          
          <div className="absolute -right-4 top-0 bg-white dark:bg-slate-700 p-2 rounded-lg shadow-sm text-xs font-bold text-green-600 dark:text-green-400 border border-green-100 dark:border-green-900/30 opacity-0 group-hover:opacity-100 transition-opacity">
             Merge PR!
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
           <div className="flex flex-col items-center gap-2">
             <div className="p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-xl">
               <Smile size={20} />
             </div>
             <span className="text-xs font-medium text-slate-600 dark:text-gray-400">{happy ? 'Happy' : 'Sleepy'}</span>
           </div>
           <div className="flex flex-col items-center gap-2">
             <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 rounded-xl">
               <Battery size={20} />
             </div>
             <span className="text-xs font-medium text-slate-600 dark:text-gray-400">{energy}% Energy</span>
           </div>
           <div className="flex flex-col items-center gap-2">
             <div className="p-3 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-xl">
               <Coffee size={20} />
             </div>
             <span className="text-xs font-medium text-slate-600 dark:text-gray-400">Caffeinated</span>
           </div>
        </div>

        <button 
          onClick={feed}
          className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-medium text-sm hover:bg-slate-700 dark:hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 active:scale-95 transform"
        >
          <Gamepad2 size={16} />
          Feed with Code
        </button>
      </div>
    </div>
  );
};
