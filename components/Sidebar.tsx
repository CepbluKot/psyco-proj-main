
import React from 'react';
import { ViewState } from '../types';
import { 
  LayoutDashboard, 
  PieChart, 
  Users, 
  Briefcase, 
  BookOpen, 
  UserCircle, 
  MessageSquare, 
  CreditCard,
  Building2,
  PenTool,
  Trello
} from 'lucide-react';

interface SidebarProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange }) => {
  
  const getButtonClass = (view: ViewState) => {
    return currentView === view 
      ? 'text-red-600 font-medium bg-red-50 dark:bg-red-900/20 dark:text-red-400' 
      : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white';
  };

  const getIconClass = (view: ViewState) => {
    return currentView === view ? 'text-red-600 dark:text-red-400' : 'text-gray-400 dark:text-gray-500';
  };

  return (
    <aside className="w-64 bg-white dark:bg-slate-800 border-r border-gray-100 dark:border-slate-700 flex flex-col h-full shrink-0 font-sans transition-colors">
      {/* MTS Logo Area */}
      <div className="px-6 py-6 mb-2 shrink-0">
        <div className="flex gap-4 items-center">
          {/* MWS Logo Block */}
          <div className="grid grid-cols-2 gap-x-1 gap-y-0 w-12 h-12 shrink-0">
             <div className="text-[#E30611] font-bold text-2xl leading-none flex items-center justify-center">M</div>
             <div className="text-[#E30611] font-bold text-2xl leading-none flex items-center justify-center">W</div>
             <div></div> {/* Empty bottom left */}
             <div className="text-[#E30611] font-bold text-2xl leading-none flex items-center justify-center">S</div>
          </div>
          
          <div className="flex flex-col h-10 justify-center">
            <span className="font-bold text-slate-900 dark:text-white text-sm leading-tight tracking-wide">MTS</span>
            <span className="text-[10px] text-gray-500 dark:text-white font-bold uppercase tracking-wider">Web Services</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-6 custom-scrollbar">
        
        {/* Main Links */}
        <ul className="space-y-1">
          <li>
            <button 
              onClick={() => onViewChange('overview')}
              className={`w-full flex items-center gap-3 px-2 py-2 rounded-md text-sm transition-colors ${getButtonClass('overview')}`}
            >
              <div className={`w-2 h-2 rounded-full ${currentView === 'overview' ? 'bg-red-600' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
              Overview
            </button>
          </li>
          <li>
            <button 
              onClick={() => onViewChange('projects')}
              className={`w-full flex items-center gap-3 px-2 py-2 rounded-md text-sm transition-colors ${getButtonClass('projects')}`}
            >
              <div className={`w-2 h-2 rounded-full ${currentView === 'projects' ? 'bg-red-600' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
              Projects
            </button>
          </li>
        </ul>

        {/* Dashboards Section */}
        <div>
          <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 mb-3 px-2 uppercase tracking-wider">Dashboards</h3>
          <ul className="space-y-1">
            <li>
              <button 
                onClick={() => onViewChange('dashboard-product')}
                className={`w-full flex items-center gap-3 px-2 py-2 rounded-md text-sm transition-colors ${getButtonClass('dashboard-product')}`}
              >
                <PieChart size={18} className={getIconClass('dashboard-product')} />
                Product
              </button>
            </li>
            <li>
              <button 
                onClick={() => onViewChange('dashboard-team')}
                className={`w-full flex items-center gap-3 px-2 py-2 rounded-md text-sm transition-colors ${getButtonClass('dashboard-team')}`}
              >
                <Users size={18} className={getIconClass('dashboard-team')} />
                Team
              </button>
            </li>
             <li>
              <button 
                onClick={() => onViewChange('dashboard-employee')}
                className={`w-full flex items-center gap-3 px-2 py-2 rounded-md text-sm transition-colors ${getButtonClass('dashboard-employee')}`}
              >
                <Briefcase size={18} className={getIconClass('dashboard-employee')} />
                Employee
              </button>
            </li>
            <li>
              <button 
                 onClick={() => onViewChange('courses')}
                 className={`w-full flex items-center gap-3 px-2 py-2 rounded-md text-sm transition-colors ${getButtonClass('courses')}`}
              >
                <BookOpen size={18} className={getIconClass('courses')} />
                Online Courses
              </button>
            </li>
          </ul>
        </div>

        {/* Pages Section */}
        <div>
          <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 mb-3 px-2 uppercase tracking-wider">Pages</h3>
          <ul className="space-y-1">
             <li>
              <button 
                onClick={() => onViewChange('jira')}
                className={`w-full flex items-center gap-3 px-2 py-2 rounded-md text-sm transition-colors ${getButtonClass('jira')}`}
              >
                <Trello size={18} className={getIconClass('jira')} />
                Jira Board
              </button>
            </li>
            <li>
              <button 
                onClick={() => onViewChange('profile-overview')}
                className={`w-full flex items-center gap-3 px-2 py-2 rounded-md text-sm transition-colors ${
                  currentView.startsWith('profile') 
                    ? 'text-red-600 font-medium bg-red-50 dark:bg-red-900/20 dark:text-red-400' 
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800'
                }`}
              >
                <UserCircle size={18} className={currentView.startsWith('profile') ? 'text-red-600 dark:text-red-400' : 'text-gray-400 dark:text-gray-500'} />
                User Profile
              </button>
               {/* Indented Submenu */}
               <div className="pl-9 space-y-1 mt-1 border-l-2 border-gray-100 dark:border-slate-700 ml-4">
                 <button onClick={() => onViewChange('profile-overview')} className={`block w-full text-left text-sm pl-2 py-1 ${currentView === 'profile-overview' ? 'text-red-600 dark:text-red-400 font-medium' : 'text-gray-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'}`}>Overview</button>
                 <button onClick={() => onViewChange('profile-tamagotchi')} className={`block w-full text-left text-sm pl-2 py-1 ${currentView === 'profile-tamagotchi' ? 'text-red-600 dark:text-red-400 font-medium' : 'text-gray-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'}`}>Tamagotchi</button>
                 <button onClick={() => onViewChange('profile-campaigns')} className={`block w-full text-left text-sm pl-2 py-1 ${currentView === 'profile-campaigns' ? 'text-red-600 dark:text-red-400 font-medium' : 'text-gray-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'}`}>Campaigns</button>
                 <button onClick={() => onViewChange('profile-documents')} className={`block w-full text-left text-sm pl-2 py-1 ${currentView === 'profile-documents' ? 'text-red-600 dark:text-red-400 font-medium' : 'text-gray-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'}`}>Documents</button>
                 <button onClick={() => onViewChange('profile-followers')} className={`block w-full text-left text-sm pl-2 py-1 ${currentView === 'profile-followers' ? 'text-red-600 dark:text-red-400 font-medium' : 'text-gray-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'}`}>Followers</button>
               </div>
            </li>
             <li className="mt-2">
              <button 
                onClick={() => onViewChange('account')}
                className={`w-full flex items-center gap-3 px-2 py-2 rounded-md text-sm transition-colors ${getButtonClass('account')}`}
              >
                <CreditCard size={18} className={getIconClass('account')} />
                Account
              </button>
            </li>
            <li>
              <button 
                onClick={() => onViewChange('corporate')}
                className={`w-full flex items-center gap-3 px-2 py-2 rounded-md text-sm transition-colors ${getButtonClass('corporate')}`}
              >
                <Building2 size={18} className={getIconClass('corporate')} />
                Corporate
              </button>
            </li>
            <li>
              <button 
                onClick={() => onViewChange('blog')}
                className={`w-full flex items-center gap-3 px-2 py-2 rounded-md text-sm transition-colors ${getButtonClass('blog')}`}
              >
                <PenTool size={18} className={getIconClass('blog')} />
                Blog
              </button>
            </li>
            <li>
              <button 
                onClick={() => onViewChange('messenger')}
                className={`w-full flex items-center gap-3 px-2 py-2 rounded-md text-sm transition-colors ${getButtonClass('messenger')}`}
              >
                <MessageSquare size={18} className={getIconClass('messenger')} />
                Social
              </button>
            </li>
          </ul>
        </div>
      </div>
      
       {/* Current User at Bottom */}
       <div className="p-4 border-t border-gray-100 dark:border-slate-700 flex items-center gap-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors shrink-0" onClick={() => onViewChange('profile-overview')}>
        <img 
          src="https://i.pravatar.cc/150?u=ekaterina" 
          alt="Profile" 
          className="w-8 h-8 rounded-full object-cover border border-gray-100 dark:border-slate-600"
        />
        <div className="flex flex-col">
          <span className="font-semibold text-xs text-black dark:text-white">Ekaterina T.</span>
          <span className="text-[10px] text-gray-400 dark:text-gray-500">CEO</span>
        </div>
       </div>
    </aside>
  );
};

export default Sidebar;
