
import React, { useState } from 'react';
import { 
  AlertCircle,
  ArrowRight,
  MoreHorizontal,
  Plus,
  X,
  Calendar,
  User,
  CheckCircle2,
  Smile,
  Meh,
  Frown,
  Star,
  Activity
} from 'lucide-react';

// --- Types ---
type JiraStatus = 'To Do' | 'In Progress' | 'Review' | 'Done';

interface JiraTicket {
  id: string;
  key: string;
  title: string;
  description: string;
  status: JiraStatus;
  priority: 'High' | 'Medium' | 'Low';
  assignee: string;
  avatar: string;
  dueDate: string;
  storyPoints?: number;
  selfAssessment?: {
    rating: number; // 1-5
    mood: 'happy' | 'neutral' | 'sad';
    comment: string;
  };
}

// --- Mock Data ---
const initialTickets: JiraTicket[] = [
  { 
    id: '1', 
    key: 'MWS-1024', 
    title: 'Implement Dark Mode for Dashboard', 
    description: 'Update all Tailwind classes to support dark mode selector. Ensure text contrast meets accessibility standards.',
    status: 'Done', 
    priority: 'Medium', 
    assignee: 'Igor Malysh', 
    avatar: 'https://i.pravatar.cc/150?u=igor',
    dueDate: 'Oct 20',
    storyPoints: 5,
    selfAssessment: { rating: 5, mood: 'happy', comment: 'Smooth implementation, reused existing tokens.' }
  },
  { 
    id: '2', 
    key: 'MWS-1045', 
    title: 'Fix Login Latency on Mobile', 
    description: 'Investigate slow response times on 3G networks during authentication handshake.',
    status: 'Done', 
    priority: 'High', 
    assignee: 'Andrey Shtanov', 
    avatar: 'https://i.pravatar.cc/150?u=andrey',
    dueDate: 'Oct 22',
    storyPoints: 8
  },
  { 
    id: '3', 
    key: 'MWS-1100', 
    title: 'New "Corporate" News Feed Layout', 
    description: 'Redesign the corporate news widget to support carousel images.',
    status: 'In Progress', 
    priority: 'Low', 
    assignee: 'Ekaterina T.', 
    avatar: 'https://i.pravatar.cc/150?u=ekaterina',
    dueDate: 'Oct 28',
    storyPoints: 3
  },
  { 
    id: '4', 
    key: 'MWS-1102', 
    title: 'Integrate Tamagotchi Metrics API', 
    description: 'Connect the gamification frontend to the new backend endpoints for team health.',
    status: 'To Do', 
    priority: 'Medium', 
    assignee: 'Oleg S.', 
    avatar: 'https://i.pravatar.cc/150?u=oleg',
    dueDate: 'Nov 01',
    storyPoints: 5
  },
  { 
    id: '5', 
    key: 'MWS-1099', 
    title: 'Optimize Video Streaming Codec', 
    description: 'Research WebRTC optimizations for low-bandwidth environments.',
    status: 'Review', 
    priority: 'High', 
    assignee: 'Artem Zhulin', 
    avatar: 'https://i.pravatar.cc/150?u=artem',
    dueDate: 'Oct 26',
    storyPoints: 13
  },
  { 
    id: '6', 
    key: 'MWS-1105', 
    title: 'Update Dependabot Config', 
    description: 'Security patches for npm packages.',
    status: 'To Do', 
    priority: 'Low', 
    assignee: 'Igor Malysh', 
    avatar: 'https://i.pravatar.cc/150?u=igor',
    dueDate: 'Nov 05',
    storyPoints: 1
  }
];

const JiraView: React.FC = () => {
  const [tickets, setTickets] = useState(initialTickets);
  const [selectedTicket, setSelectedTicket] = useState<JiraTicket | null>(null);

  // Self Assessment Form State (local to the modal)
  const [rating, setRating] = useState(0);
  const [mood, setMood] = useState<'happy' | 'neutral' | 'sad' | null>(null);
  const [comment, setComment] = useState('');

  const columns: { id: JiraStatus, label: string }[] = [
    { id: 'To Do', label: 'To Do' },
    { id: 'In Progress', label: 'In Progress' },
    { id: 'Review', label: 'Review' },
    { id: 'Done', label: 'Done' },
  ];

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'High': return <AlertCircle size={14} className="text-[#E30611]" />;
      case 'Medium': return <ArrowRight size={14} className="text-yellow-500 rotate-[-45deg]" />;
      case 'Low': return <ArrowRight size={14} className="text-blue-500 rotate-90" />;
      default: return null;
    }
  };

  const handleTicketClick = (ticket: JiraTicket) => {
    setSelectedTicket(ticket);
    // Reset form or load existing assessment
    if (ticket.selfAssessment) {
      setRating(ticket.selfAssessment.rating);
      setMood(ticket.selfAssessment.mood);
      setComment(ticket.selfAssessment.comment);
    } else {
      setRating(0);
      setMood(null);
      setComment('');
    }
  };

  const saveAssessment = () => {
    if (!selectedTicket || !mood) return;
    
    const updatedTickets = tickets.map(t => t.id === selectedTicket.id ? {
      ...t,
      selfAssessment: {
        rating,
        mood,
        comment
      }
    } : t);

    setTickets(updatedTickets);
    // Update local selected ticket so UI refreshes immediately if we keep modal open (though we close it usually)
    setSelectedTicket({
      ...selectedTicket,
      selfAssessment: { rating, mood, comment }
    });
    alert('Assessment saved!');
  };

  const moveTicket = (ticketId: string, newStatus: JiraStatus) => {
    setTickets(tickets.map(t => t.id === ticketId ? { ...t, status: newStatus } : t));
    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket({ ...selectedTicket, status: newStatus });
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#F3F6FD] dark:bg-slate-900 overflow-hidden">
      
      {/* Header */}
      <div className="flex-none p-8 pb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
              Jira Board
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">Active Sprint: MWS Core Q4</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex -space-x-2">
               {['igor', 'andrey', 'ekaterina', 'oleg'].map(u => (
                 <img key={u} src={`https://i.pravatar.cc/150?u=${u}`} className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-800" alt={u} />
               ))}
               <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-700 border-2 border-white dark:border-slate-800 flex items-center justify-center text-xs font-bold text-gray-500">
                 +2
               </div>
             </div>
             <button className="flex items-center gap-2 bg-[#E30611] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-700 transition-colors">
               <Plus size={16} /> Create Issue
             </button>
          </div>
        </div>
      </div>

      {/* Kanban Board Area */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden px-8 pb-8">
        <div className="flex gap-6 h-full min-w-[1000px]">
          {columns.map(col => (
            <div key={col.id} className="flex-1 flex flex-col min-w-[280px] h-full">
              <div className="flex items-center justify-between mb-4 px-1">
                <h3 className="font-bold text-slate-700 dark:text-gray-300 text-sm uppercase tracking-wide flex items-center gap-2">
                   {col.label}
                   <span className="bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full text-xs">
                     {tickets.filter(t => t.status === col.id).length}
                   </span>
                </h3>
                <MoreHorizontal size={16} className="text-gray-400 cursor-pointer hover:text-slate-800 dark:hover:text-white" />
              </div>

              <div className="flex-1 bg-gray-100/50 dark:bg-slate-800/50 rounded-2xl p-2 overflow-y-auto custom-scrollbar border border-transparent hover:border-gray-200 dark:hover:border-slate-700 transition-colors">
                {tickets.filter(t => t.status === col.id).map(ticket => (
                  <div 
                    key={ticket.id}
                    onClick={() => handleTicketClick(ticket)}
                    className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-md cursor-pointer mb-3 transition-all group relative"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-gray-400 group-hover:text-[#E30611] transition-colors">{ticket.key}</span>
                      <div className="flex items-center gap-1">
                         {ticket.selfAssessment && (
                           <div className="text-yellow-500"><Star size={12} fill="currentColor" /></div>
                         )}
                         <MoreHorizontal size={14} className="text-gray-300 opacity-0 group-hover:opacity-100" />
                      </div>
                    </div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-3 leading-snug">{ticket.title}</h4>
                    
                    <div className="flex items-center justify-between mt-auto">
                       <div className="flex items-center gap-2">
                          {getPriorityIcon(ticket.priority)}
                          {ticket.storyPoints && (
                            <span className="w-5 h-5 rounded-full bg-gray-100 dark:bg-slate-700 text-[10px] font-bold flex items-center justify-center text-gray-500">
                              {ticket.storyPoints}
                            </span>
                          )}
                       </div>
                       <div className="flex items-center gap-2">
                          <span className="text-[10px] text-gray-400 font-medium">{ticket.dueDate}</span>
                          <img src={ticket.avatar} alt="assignee" className="w-6 h-6 rounded-full border border-white dark:border-slate-600" />
                       </div>
                    </div>
                  </div>
                ))}
                <button className="w-full py-2 flex items-center justify-center gap-2 text-gray-400 hover:text-slate-600 dark:hover:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-slate-700/50 rounded-lg transition-colors text-sm font-medium border border-transparent hover:border-gray-200 dark:hover:border-slate-600 border-dashed mt-1">
                   <Plus size={16} /> Add Task
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Ticket Detail Modal --- */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedTicket(null)}>
           <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-3xl h-[80vh] flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
             
             {/* Modal Header */}
             <div className="p-6 border-b border-gray-100 dark:border-slate-700 flex justify-between items-start bg-white dark:bg-slate-800">
               <div className="flex items-center gap-3">
                 <span className="text-sm font-bold text-gray-500">{selectedTicket.key}</span>
                 <h2 className="text-xl font-bold text-slate-800 dark:text-white">{selectedTicket.title}</h2>
               </div>
               <div className="flex items-center gap-2">
                 <button onClick={() => setSelectedTicket(null)} className="p-2 text-gray-400 hover:text-slate-800 dark:hover:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700">
                   <X size={20} />
                 </button>
               </div>
             </div>

             <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col md:flex-row">
               
               {/* Main Content */}
               <div className="flex-1 p-8 border-r border-gray-100 dark:border-slate-700">
                  <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-2">Description</h3>
                  <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed mb-8">
                    {selectedTicket.description}
                  </p>

                  <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
                    <Activity size={16} /> Developer Self-Assessment
                  </h3>
                  
                  <div className="bg-gray-50 dark:bg-slate-900/50 rounded-xl p-6 border border-gray-100 dark:border-slate-700">
                    <div className="mb-4">
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2">How did you feel about this task?</label>
                      <div className="flex gap-4">
                        <button 
                          onClick={() => setMood('happy')} 
                          className={`p-3 rounded-xl border-2 transition-all ${mood === 'happy' ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-600' : 'border-gray-200 dark:border-slate-700 text-gray-400 hover:border-gray-300'}`}
                        >
                          <Smile size={24} />
                        </button>
                        <button 
                          onClick={() => setMood('neutral')} 
                          className={`p-3 rounded-xl border-2 transition-all ${mood === 'neutral' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600' : 'border-gray-200 dark:border-slate-700 text-gray-400 hover:border-gray-300'}`}
                        >
                          <Meh size={24} />
                        </button>
                        <button 
                          onClick={() => setMood('sad')} 
                          className={`p-3 rounded-xl border-2 transition-all ${mood === 'sad' ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-600' : 'border-gray-200 dark:border-slate-700 text-gray-400 hover:border-gray-300'}`}
                        >
                          <Frown size={24} />
                        </button>
                      </div>
                    </div>

                    <div className="mb-4">
                       <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Complexity Rating (1-5)</label>
                       <div className="flex gap-2">
                         {[1, 2, 3, 4, 5].map(star => (
                           <button 
                             key={star} 
                             onClick={() => setRating(star)}
                             className={`text-2xl transition-colors ${rating >= star ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                           >
                             ★
                           </button>
                         ))}
                       </div>
                    </div>

                    <div className="mb-4">
                       <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Reflection Comment</label>
                       <textarea 
                         className="w-full p-3 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:outline-none focus:border-[#E30611] text-slate-800 dark:text-white"
                         rows={3}
                         placeholder="What went well? What was difficult?"
                         value={comment}
                         onChange={(e) => setComment(e.target.value)}
                       ></textarea>
                    </div>

                    <button 
                      onClick={saveAssessment}
                      className="w-full py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-lg hover:opacity-90 transition-opacity"
                    >
                      Save Assessment
                    </button>
                  </div>
               </div>

               {/* Sidebar Meta */}
               <div className="w-full md:w-72 bg-gray-50 dark:bg-slate-900/30 p-8 space-y-6">
                 
                 <div>
                   <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Status</label>
                   <select 
                     value={selectedTicket.status} 
                     onChange={(e) => moveTicket(selectedTicket.id, e.target.value as JiraStatus)}
                     className="w-full p-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-800 dark:text-white focus:outline-none focus:border-[#E30611]"
                   >
                     {columns.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                   </select>
                 </div>

                 <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Assignee</label>
                    <div className="flex items-center gap-2 p-2 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700">
                      <img src={selectedTicket.avatar} className="w-6 h-6 rounded-full" alt="avatar" />
                      <span className="text-sm font-medium text-slate-800 dark:text-white">{selectedTicket.assignee}</span>
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Priority</label>
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-800 dark:text-white">
                        {getPriorityIcon(selectedTicket.priority)}
                        {selectedTicket.priority}
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Story Points</label>
                      <div className="flex items-center gap-2 text-sm font-medium text-slate-800 dark:text-white">
                        <span className="bg-gray-200 dark:bg-slate-700 px-2 py-0.5 rounded text-xs">{selectedTicket.storyPoints || '-'}</span>
                      </div>
                    </div>
                 </div>

                 <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Due Date</label>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-gray-400">
                      <Calendar size={14} />
                      {selectedTicket.dueDate}
                    </div>
                 </div>

                 <div className="pt-4 border-t border-gray-200 dark:border-slate-700">
                   <div className="text-xs text-gray-400 mb-2">Created Oct 10, 2025</div>
                   <div className="text-xs text-gray-400">Updated 2 hours ago</div>
                 </div>

               </div>
             </div>
           </div>
        </div>
      )}

    </div>
  );
};

export default JiraView;
