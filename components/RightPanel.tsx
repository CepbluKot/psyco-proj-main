

import React, { useState } from 'react';
import { User, Activity, AlertCircle, Radio, MessageSquare, Phone, X, Compass, Hammer, GitPullRequest } from 'lucide-react';
import { ViewState } from '../types';

interface RightPanelProps {
  onContactClick: (userId: string) => void;
  onCall?: (contact: any) => void;
  onViewChange?: (view: ViewState) => void;
}

const RightPanel: React.FC<RightPanelProps> = ({ onContactClick, onCall, onViewChange }) => {
  const [selectedContact, setSelectedContact] = useState<any>(null);

  // Users: Ekaterina Tyukavkina (Me), Andrey Shtanov, Igor Malysh, Oleg Sidorenkov, Artem Zhulin
  const contacts = [
    { id: 'andrey', name: 'Andrey Shtanov', role: 'CCO', avatar: 'https://i.pravatar.cc/150?u=andrey', status: 'online' },
    { id: 'oleg', name: 'Oleg Sidorenkov', role: 'CTO', avatar: 'https://i.pravatar.cc/150?u=oleg', status: 'busy' },
    { id: 'igor', name: 'Igor Malysh', role: 'Chief DevEx', avatar: 'https://i.pravatar.cc/150?u=igor', status: 'online' },
    { id: 'artem', name: 'Artem Zhulin', role: 'Head of WB', avatar: 'https://i.pravatar.cc/150?u=artem', status: 'offline' },
  ];

  const handleContactClick = (contact: any) => {
    setSelectedContact(contact);
  };

  return (
    <aside className="w-full bg-white dark:bg-slate-800 flex flex-col h-full shrink-0 overflow-hidden relative">
      
      {/* Notifications */}
      <div className="p-6 pb-2 shrink-0">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-white mb-4">Notifications</h3>
        <div className="space-y-6">
          <div className="flex gap-3">
             <div className="w-8 h-8 rounded-full bg-red-50 dark:bg-red-900/30 flex items-center justify-center text-[#E30611] dark:text-red-300 shrink-0">
               <AlertCircle size={16} />
             </div>
             <div>
               <p className="text-sm text-slate-700 dark:text-gray-300 leading-tight">DevEx KPI check required (Igor)</p>
               <span className="text-xs text-gray-400">Just now</span>
             </div>
          </div>
          <div className="flex gap-3">
             <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-gray-500 dark:text-gray-300 shrink-0">
               <User size={16} />
             </div>
             <div>
               <p className="text-sm text-slate-700 dark:text-gray-300 leading-tight">Oleg updated the tech radar</p>
               <span className="text-xs text-gray-400">59 minutes ago</span>
             </div>
          </div>
        </div>
      </div>

      {/* Activities */}
      <div className="p-6 pb-2 shrink-0">
        <div className="flex justify-between items-center mb-4">
           <h3 className="text-sm font-semibold text-slate-800 dark:text-white">Activities</h3>
           <div className="flex gap-2">
             <button 
               onClick={() => onViewChange && onViewChange('profile-career')}
               className="p-1.5 bg-gray-100 dark:bg-slate-700 rounded-lg hover:text-[#E30611] transition-colors"
               title="Quick Career Simulator"
             >
               <Compass size={14} />
             </button>
             <button 
               onClick={() => onViewChange && onViewChange('profile-job-crafting')}
               className="p-1.5 bg-gray-100 dark:bg-slate-700 rounded-lg hover:text-[#E30611] transition-colors"
               title="Job Crafting"
             >
               <Hammer size={14} />
             </button>
             <button 
               onClick={() => onViewChange && onViewChange('pr-coach')}
               className="p-1.5 bg-gray-100 dark:bg-slate-700 rounded-lg hover:text-[#E30611] transition-colors"
               title="PR Review Assistant"
             >
               <GitPullRequest size={14} />
             </button>
           </div>
        </div>
         <div className="space-y-6 relative">
             <div className="absolute left-4 top-2 bottom-2 w-px bg-gray-100 dark:bg-slate-700"></div>
          
          <div className="flex gap-3 relative z-10">
             <img src="https://i.pravatar.cc/150?u=igor" className="w-8 h-8 rounded-full object-cover shrink-0" alt="Igor" />
             <div>
               <p className="text-sm text-slate-700 dark:text-gray-300 leading-tight">Deployed new CI/CD pipelines</p>
               <span className="text-xs text-gray-400">Just now</span>
             </div>
          </div>
          <div className="flex gap-3 relative z-10">
             <img src="https://i.pravatar.cc/150?u=artem" className="w-8 h-8 rounded-full object-cover shrink-0" alt="Artem" />
             <div>
               <p className="text-sm text-slate-700 dark:text-gray-300 leading-tight">Reviewed quarterly budget</p>
               <span className="text-xs text-gray-400">2 hours ago</span>
             </div>
          </div>
           <div className="flex gap-3 relative z-10">
             <img src="https://i.pravatar.cc/150?u=andrey" className="w-8 h-8 rounded-full object-cover shrink-0" alt="Andrey" />
             <div>
               <p className="text-sm text-slate-700 dark:text-gray-300 leading-tight">Commented on marketing strategy</p>
               <span className="text-xs text-gray-400">5 hours ago</span>
             </div>
          </div>
        </div>
      </div>

       {/* Contacts */}
      <div className="p-6 flex-1 overflow-y-auto custom-scrollbar">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-white mb-4">Contacts</h3>
        <div className="space-y-4">
          {contacts.map(contact => (
             <div 
                key={contact.id} 
                className="flex items-center gap-3 cursor-pointer p-2 -mx-2 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
                onClick={() => handleContactClick(contact)}
             >
                 <div className="relative">
                   <img src={contact.avatar} className="w-8 h-8 rounded-full object-cover" alt={contact.name} />
                   <div className={`w-2.5 h-2.5 rounded-full border-2 border-white dark:border-slate-800 absolute bottom-0 right-0 
                     ${contact.status === 'online' ? 'bg-green-500' : contact.status === 'busy' ? 'bg-red-500' : 'bg-gray-400'}`}></div>
                 </div>
                 <div className="flex flex-col">
                   <span className="text-sm text-slate-700 dark:text-gray-300 font-medium">{contact.name}</span>
                   <span className="text-[10px] text-gray-400">{contact.role}</span>
                 </div>
             </div>
          ))}
        </div>
      </div>

      {/* User Popover Modal */}
      {selectedContact && (
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-6" onClick={() => setSelectedContact(null)}>
           <div className="bg-white dark:bg-slate-900 w-full rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-slate-700 transform transition-all scale-100" onClick={(e) => e.stopPropagation()}>
             <div className="h-24 bg-gradient-to-r from-red-600 to-slate-900 relative">
                <button className="absolute top-2 right-2 text-white/80 hover:text-white" onClick={() => setSelectedContact(null)}>
                  <X size={20} />
                </button>
                <img src={selectedContact.avatar} className="w-20 h-20 rounded-full border-4 border-white dark:border-slate-900 absolute -bottom-10 left-6 object-cover" />
             </div>
             <div className="pt-12 px-6 pb-6">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white">{selectedContact.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">{selectedContact.role}</p>
                
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => { onContactClick(selectedContact.id); setSelectedContact(null); }}
                    className="flex items-center justify-center gap-2 py-2 bg-[#E30611] text-white rounded-lg text-sm font-bold hover:bg-red-700 transition-colors"
                  >
                    <MessageSquare size={16} /> Message
                  </button>
                  <button 
                    onClick={() => { if(onCall) onCall(selectedContact); setSelectedContact(null); }}
                    className="flex items-center justify-center gap-2 py-2 bg-gray-100 dark:bg-slate-800 text-slate-700 dark:text-gray-200 rounded-lg text-sm font-bold hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                  >
                    <Phone size={16} /> Call
                  </button>
                </div>
             </div>
           </div>
        </div>
      )}
    </aside>
  );
};

export default RightPanel;