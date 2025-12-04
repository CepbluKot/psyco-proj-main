
import React from 'react';
import { MapPin, Mail, Phone, Award, Shield } from 'lucide-react';

const ProfileView: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto custom-scrollbar">
      <div className="bg-gradient-to-r from-[#E30611] to-slate-900 h-48 relative">
        <div className="absolute -bottom-12 left-8 flex items-end">
          <img 
            src="https://i.pravatar.cc/150?u=ekaterina" 
            alt="Profile" 
            className="w-32 h-32 rounded-full border-4 border-white dark:border-slate-900 shadow-lg object-cover"
          />
          <div className="mb-2 ml-4">
             <h1 className="text-2xl font-bold text-white shadow-sm">Ekaterina Tyukavkina</h1>
             <p className="text-red-100 text-sm font-medium">CEO @ MTS Web Services</p>
          </div>
        </div>
      </div>

      <div className="pt-16 px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm transition-colors">
              <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wide mb-4">About</h3>
              <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-gray-400" />
                  <span>Moscow, Russia</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-gray-400" />
                  <span>e.tyukavkina@mts.ru</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-gray-400" />
                  <span>+7 (916) 555-01-23</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm transition-colors">
              <h3 className="text-sm font-bold text-slate-800 dark:text-white uppercase tracking-wide mb-4">Badges</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 rounded-full text-xs font-bold flex items-center gap-1">
                  <Award size={12} /> Leadership Award 2024
                </span>
                <span className="px-3 py-1 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-full text-xs font-bold flex items-center gap-1">
                  <Shield size={12} /> Top Strategist
                </span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm transition-colors">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Bio</h3>
              <p className="text-slate-600 dark:text-gray-300 leading-relaxed text-sm">
                Chief Executive Officer at MTS Web Services. Driving the vision to build the leading cloud ecosystem in Russia. 
                Focused on product innovation, team excellence, and delivering real value to enterprise customers. 
                Passionate about agile leadership and building scalable digital platforms.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-2xl text-center">
                 <div className="text-3xl font-bold text-[#E30611] mb-1">98%</div>
                 <div className="text-xs text-red-400 font-bold uppercase">Goal Completion</div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700 p-6 rounded-2xl text-center">
                 <div className="text-3xl font-bold text-slate-800 dark:text-white mb-1">4.9/5</div>
                 <div className="text-xs text-slate-500 dark:text-gray-400 font-bold uppercase">Leadership Rating</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProfileView;
