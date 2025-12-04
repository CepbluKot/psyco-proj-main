
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import RightPanel from './components/RightPanel';
import DashboardView from './views/DashboardView';
import MessengerView from './views/MessengerView';
import TeamView from './views/TeamView';
import EmployeeView from './views/EmployeeView';
import ProjectsView from './views/ProjectsView';
import LearningView from './views/LearningView';
import ProfileView from './views/ProfileView';
import { 
  TamagotchiView, 
  AccountView, 
  CampaignsView, 
  DocumentsView, 
  FollowersView,
  CorporateView,
  BlogView,
  OverviewView
} from './views/GeneralPages';
import { ViewState } from './types';
import { Search, Sun, Moon, Bell, Layout, X, ChevronRight, Phone, Mic, MicOff, Video, PhoneOff } from 'lucide-react';

// --- CALL OVERLAY COMPONENT ---
interface CallOverlayProps {
  contact: any;
  status: 'ringing' | 'connected';
  duration: number;
  onEnd: () => void;
}

const CallOverlay: React.FC<CallOverlayProps> = ({ contact, status, duration, onEnd }) => {
  const [isMuted, setIsMuted] = useState(false);

  const formatDuration = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/90 backdrop-blur-md flex flex-col items-center justify-between py-12 animate-in fade-in duration-300">
      <div className="flex flex-col items-center gap-4 mt-10">
        <div className="relative">
          <img src={contact.avatar} alt={contact.name} className="w-32 h-32 rounded-full object-cover border-4 border-white/10 shadow-2xl" />
          {status === 'ringing' && (
            <div className="absolute inset-0 rounded-full border-4 border-[#E30611] animate-ping opacity-75"></div>
          )}
        </div>
        <h2 className="text-3xl font-bold text-white">{contact.name}</h2>
        <p className="text-gray-400 text-lg">
          {status === 'ringing' ? 'Calling...' : formatDuration(duration)}
        </p>
      </div>

      <div className="flex items-center gap-8 mb-10">
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className={`p-4 rounded-full transition-all ${isMuted ? 'bg-white text-slate-900' : 'bg-white/10 text-white hover:bg-white/20'}`}
        >
          {isMuted ? <MicOff size={32} /> : <Mic size={32} />}
        </button>
        <button className="p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all">
          <Video size={32} />
        </button>
        <button 
          onClick={onEnd}
          className="p-4 rounded-full bg-red-600 text-white hover:bg-red-700 transition-all transform hover:scale-110 shadow-lg"
        >
          <PhoneOff size={32} />
        </button>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard-product');
  
  // Responsive States
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(window.innerWidth >= 1280);

  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) {
        return saved === 'dark';
      }
      // Default to light mode (false) if no preference is saved, ignoring system preference
      return false;
    }
    return false;
  });

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  
  // Notifications State
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New comment on Project X', time: '2 hours ago', read: false },
    { id: 2, text: 'Server load warning (98%)', time: '4 hours ago', read: false },
    { id: 3, text: 'Jared invited you to "Standup"', time: '5 hours ago', read: false },
  ]);

  // Deep Linking
  const [targetChatUser, setTargetChatUser] = useState<string | null>(null);

  // Call State
  const [callStatus, setCallStatus] = useState<'idle' | 'ringing' | 'connected'>('idle');
  const [activeCallContact, setActiveCallContact] = useState<any>(null);
  const [callDuration, setCallDuration] = useState(0);

  // Handle Resize for Responsive Layout
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setIsRightPanelOpen(true);
      } else {
        setIsRightPanelOpen(false);
      }
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Dark Mode Effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Call Logic
  useEffect(() => {
    let interval: any;
    if (callStatus === 'ringing') {
      const timeout = setTimeout(() => {
        setCallStatus('connected');
      }, 2000);
      return () => clearTimeout(timeout);
    }
    if (callStatus === 'connected') {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [callStatus]);

  const startCall = (contact: any) => {
    setActiveCallContact(contact);
    setCallStatus('ringing');
    setCallDuration(0);
  };

  const endCall = () => {
    setCallStatus('idle');
    setActiveCallContact(null);
    setCallDuration(0);
  };

  const handleNavigate = (view: ViewState, params?: any) => {
    setCurrentView(view);
    if (view === 'messenger' && params?.userId) {
      setTargetChatUser(params.userId);
    }
    setShowSearchResults(false);
    setSearchQuery('');
    
    // On mobile, close sidebar after navigation
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const getBreadcrumbs = () => {
    if (currentView === 'messenger') return ['Social', 'Chats'];
    if (currentView.startsWith('dashboard')) return ['Dashboards', currentView.replace('dashboard-', '').replace(/^\w/, c => c.toUpperCase())];
    if (currentView.startsWith('profile')) return ['User Profile', currentView.replace('profile-', '').replace(/^\w/, c => c.toUpperCase())];
    if (currentView === 'overview') return ['Favorites', 'Overview'];
    if (currentView === 'projects') return ['Favorites', 'Projects'];
    if (currentView === 'courses') return ['Dashboards', 'Online Courses'];
    if (currentView === 'account') return ['Pages', 'Account'];
    if (currentView === 'corporate') return ['Pages', 'Corporate'];
    if (currentView === 'blog') return ['Pages', 'Blog'];
    return ['App', 'Home'];
  };

  const [section, page] = getBreadcrumbs();

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard-product': return <DashboardView />;
      case 'dashboard-team': return <TeamView />;
      case 'dashboard-employee': return <EmployeeView />;
      case 'messenger': return <MessengerView targetUserId={targetChatUser} onClearTarget={() => setTargetChatUser(null)} />;
      case 'projects': return <ProjectsView />;
      case 'courses': return <LearningView />;
      case 'profile-overview': return <ProfileView />;
      case 'profile-tamagotchi': return <TamagotchiView />;
      case 'profile-campaigns': return <CampaignsView />;
      case 'profile-documents': return <DocumentsView />;
      case 'profile-followers': return <FollowersView onMessage={(id) => handleNavigate('messenger', { userId: id })} />;
      case 'account': return <AccountView />;
      case 'corporate': return <CorporateView />;
      case 'blog': return <BlogView />;
      case 'overview': return <OverviewView />;
      default: return <DashboardView />;
    }
  };

  // Search Logic
  const allViews: {id: ViewState, label: string, section: string}[] = [
    { id: 'overview', label: 'Overview', section: 'Favorites' },
    { id: 'projects', label: 'Projects', section: 'Favorites' },
    { id: 'dashboard-product', label: 'Product Dashboard', section: 'Dashboards' },
    { id: 'dashboard-team', label: 'Team Dashboard', section: 'Dashboards' },
    { id: 'dashboard-employee', label: 'Employee Dashboard', section: 'Dashboards' },
    { id: 'courses', label: 'Online Courses', section: 'Dashboards' },
    { id: 'profile-overview', label: 'User Profile', section: 'Pages' },
    { id: 'corporate', label: 'Corporate News', section: 'Pages' },
    { id: 'blog', label: 'Engineering Blog', section: 'Pages' },
    { id: 'messenger', label: 'Social / Messenger', section: 'Pages' },
  ];

  const filteredViews = searchQuery 
    ? allViews.filter(v => v.label.toLowerCase().includes(searchQuery.toLowerCase()) || v.section.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  return (
    <div className="flex h-screen w-full bg-[#F3F6FD] dark:bg-slate-900 transition-colors duration-300 relative overflow-hidden">
      
      {/* --- CALL OVERLAY --- */}
      {callStatus !== 'idle' && activeCallContact && (
        <CallOverlay 
          contact={activeCallContact} 
          status={callStatus} 
          duration={callDuration} 
          onEnd={endCall} 
        />
      )}

      {/* --- MOBILE SIDEBAR BACKDROP --- */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* --- LEFT SIDEBAR --- */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-30 overflow-hidden
        ${isSidebarOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full lg:w-0 lg:translate-x-0'} 
        transition-all duration-300 ease-in-out bg-white dark:bg-slate-800 shrink-0 h-full shadow-xl lg:shadow-none
      `}>
         <Sidebar currentView={currentView} onViewChange={handleNavigate} />
      </div>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col h-full min-w-0 relative transition-all duration-300">
        
        {/* Top Header */}
        <header className="h-16 flex items-center justify-between px-4 sm:px-6 bg-white dark:bg-slate-800 border-b border-gray-100 dark:border-slate-700 shrink-0 transition-colors relative z-10">
          <div className="flex items-center gap-3 sm:gap-4 text-sm text-gray-500 dark:text-gray-400">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded text-gray-400 dark:text-gray-500 hover:text-[#E30611] transition-colors"
            >
              <Layout size={20} />
            </button>
            <div className="flex items-center gap-2 whitespace-nowrap overflow-hidden text-ellipsis">
              <span className="text-gray-400 dark:text-gray-500 font-medium hidden sm:inline">
                {section}
              </span>
              <span className="text-gray-300 dark:text-gray-600 hidden sm:inline">/</span>
              <span className="font-bold text-slate-800 dark:text-gray-100 truncate">
                {page}
              </span>
              {currentView === 'messenger' && (
                <span className="w-2 h-2 rounded-full bg-green-500 ml-1 shrink-0"></span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Global Search (Hidden on small mobile) */}
            <div className="relative hidden md:block group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={16} />
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchResults(!!e.target.value);
                }}
                onFocus={() => { if(searchQuery) setShowSearchResults(true); }}
                onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
                className="pl-9 pr-12 py-1.5 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-md text-sm focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 w-48 lg:w-64 transition-all text-slate-800 dark:text-gray-200"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-slate-700 rounded px-1 hidden lg:block">⌘K</span>

              {/* Search Results Dropdown */}
              {showSearchResults && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-lg shadow-xl overflow-hidden z-50">
                  {filteredViews.length > 0 ? (
                    <ul className="py-2">
                      {filteredViews.map(view => (
                        <li key={view.id}>
                          <button 
                            className="w-full text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-slate-700 flex items-center justify-between group/item"
                            onClick={() => handleNavigate(view.id)}
                          >
                            <div>
                              <div className="text-sm font-bold text-slate-800 dark:text-white">{view.label}</div>
                              <div className="text-xs text-gray-400">{view.section}</div>
                            </div>
                            <ChevronRight size={14} className="text-gray-300 opacity-0 group-hover:item:opacity-100 transition-opacity" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                     <div className="p-4 text-center text-sm text-gray-400">No results found.</div>
                  )}
                </div>
              )}
            </div>
            
            {/* Theme Toggle */}
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full text-gray-500 hover:text-slate-800 dark:text-gray-400 dark:hover:text-yellow-400 transition-colors hover:bg-gray-100 dark:hover:bg-slate-700"
              title="Toggle Theme"
            >
              {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            
            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`p-2 rounded-full transition-colors relative ${showNotifications ? 'bg-red-50 text-[#E30611]' : 'text-gray-500 hover:text-slate-800 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-700'}`}
              >
                {unreadCount > 0 && (
                   <div className="w-2 h-2 bg-[#E30611] rounded-full absolute top-2 right-2 border border-white dark:border-slate-800"></div>
                )}
                <Bell size={18} />
              </button>
              
              {showNotifications && (
                 <div className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center">
                      <h3 className="font-bold text-slate-800 dark:text-white text-sm">Notifications</h3>
                      <button onClick={markAllRead} className="text-xs text-[#E30611] font-medium hover:underline">Mark all read</button>
                    </div>
                    <div className="max-h-64 overflow-y-auto custom-scrollbar">
                      {notifications.length > 0 ? notifications.map(n => (
                        <div key={n.id} className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-700 border-b border-gray-50 dark:border-slate-700/50 cursor-pointer ${n.read ? 'opacity-60' : ''}`}>
                           <div className="flex items-start gap-2">
                             {!n.read && <div className="w-1.5 h-1.5 rounded-full bg-[#E30611] mt-1.5 shrink-0"></div>}
                             <div>
                               <p className="text-sm text-slate-700 dark:text-gray-300 mb-1">{n.text}</p>
                               <span className="text-xs text-gray-400">{n.time}</span>
                             </div>
                           </div>
                        </div>
                      )) : (
                        <div className="p-4 text-center text-gray-400 text-sm">No notifications</div>
                      )}
                    </div>
                 </div>
              )}
            </div>

             <button 
               onClick={() => setIsRightPanelOpen(!isRightPanelOpen)}
               className={`text-gray-500 hover:text-slate-800 dark:text-gray-400 dark:hover:text-white transition-colors p-2 rounded hover:bg-gray-100 dark:hover:bg-slate-700 ${!isRightPanelOpen && window.innerWidth >= 1280 ? 'bg-gray-100 dark:bg-slate-700 text-[#E30611]' : ''}`}
             >
              <Layout size={20} className="rotate-90" />
            </button>
          </div>
        </header>

        {/* Dynamic View Content */}
        <main className="flex-1 overflow-hidden relative bg-[#F3F6FD] dark:bg-slate-900 transition-colors z-0">
          {renderContent()}
        </main>
      </div>

      {/* --- MOBILE RIGHT PANEL BACKDROP --- */}
      {isRightPanelOpen && window.innerWidth < 1280 && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 xl:hidden"
          onClick={() => setIsRightPanelOpen(false)}
        />
      )}

      {/* --- RIGHT SIDEBAR --- */}
      <div className={`
        fixed xl:static inset-y-0 right-0 z-30
        ${isRightPanelOpen ? 'w-80 translate-x-0' : 'w-80 translate-x-full xl:w-0 xl:translate-x-0'} 
        transition-all duration-300 ease-in-out border-l border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800 shrink-0 shadow-xl xl:shadow-none h-full
      `}>
         <RightPanel 
           onContactClick={(id) => handleNavigate('messenger', { userId: id })} 
           onCall={(contact) => { 
             startCall(contact); 
           }}
         />
      </div>
    </div>
  );
};

export default App;
