
import React from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip
} from 'recharts';
import { 
  Users, 
  AlertTriangle, 
  Activity, 
  ThumbsUp, 
  Server, 
  ShieldAlert, 
  GitCommit, 
  Clock, 
  Zap,
  Cpu
} from 'lucide-react';

const skillData = [
  { subject: 'Hard Skills', A: 140, B: 110, fullMark: 150 },
  { subject: 'Soft Skills', A: 60, B: 130, fullMark: 150 },
  { subject: 'Delivery', A: 130, B: 130, fullMark: 150 },
  { subject: 'Code Quality', A: 145, B: 100, fullMark: 150 },
  { subject: 'Innovation', A: 150, B: 90, fullMark: 150 },
  { subject: 'Teamwork', A: 50, B: 85, fullMark: 150 },
];

const resourceData = [
  { name: 'Dev', current: 12, target: 14 },
  { name: 'QA', current: 4, target: 5 },
  { name: 'Design', current: 3, target: 3 },
  { name: 'Product', current: 2, target: 2 },
];

// --- NEW DATA: Team Services ---
const teamServices = [
  { 
    id: 1, 
    name: 'Unified Auth Service', 
    description: 'Centralized OAuth2 provider for ecosystem.',
    owner: 'Oleg Sidorenkov', 
    ownerAvatar: 'https://i.pravatar.cc/150?u=oleg',
    busFactor: { risk: 'High', person: 'Oleg Sidorenkov', score: 1 },
    stats: { uptime: '99.99%', coverage: '88%', lastDeploy: '2h ago' },
    tech: 'Go / GRPC',
    status: 'Healthy'
  },
  { 
    id: 2, 
    name: 'Billing Core', 
    description: 'Subscription management and recurring payments.',
    owner: 'Andrey Shtanov', 
    ownerAvatar: 'https://i.pravatar.cc/150?u=andrey',
    busFactor: { risk: 'Medium', person: 'Team Alpha', score: 3 },
    stats: { uptime: '99.95%', coverage: '92%', lastDeploy: '1d ago' },
    tech: 'Java / Spring',
    status: 'Warning'
  },
  { 
    id: 3, 
    name: 'Video Transcoder', 
    description: 'High-performance video processing pipeline.',
    owner: 'Igor Malysh', 
    ownerAvatar: 'https://i.pravatar.cc/150?u=igor',
    busFactor: { risk: 'Low', person: 'Distributed', score: 5 },
    stats: { uptime: '99.90%', coverage: '75%', lastDeploy: '5h ago' },
    tech: 'C++ / CUDA',
    status: 'Healthy'
  },
  { 
    id: 4, 
    name: 'Frontend Design System', 
    description: 'Shared UI component library (MTS UI).',
    owner: 'Dmitry Petrov', 
    ownerAvatar: 'https://i.pravatar.cc/150?u=dmitry',
    busFactor: { risk: 'High', person: 'Dmitry Petrov', score: 1 },
    stats: { uptime: 'N/A', coverage: '98%', lastDeploy: '30m ago' },
    tech: 'React / TS',
    status: 'Healthy'
  }
];

const TeamView: React.FC = () => {
  const teamMembers = [
    { name: 'Igor Malysh', avatar: 'https://i.pravatar.cc/150?u=igor', mood: 'Motivated' },
    { name: 'Oleg Sidorenkov', avatar: 'https://i.pravatar.cc/150?u=oleg', mood: 'Focused' },
    { name: 'Andrey Shtanov', avatar: 'https://i.pravatar.cc/150?u=andrey', mood: 'Caffeinated' },
    { name: 'Ekaterina Tyukavkina', avatar: 'https://i.pravatar.cc/150?u=ekaterina', mood: 'Happy' }
  ];

  return (
    <div className="h-full overflow-y-auto p-8 custom-scrollbar">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Team Assessment</h1>
        <p className="text-gray-500 dark:text-gray-400">Evaluation of MTS Web Services team structure, health, and performance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm flex items-center gap-4 transition-colors">
           <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-[#E30611]">
             <Users size={24} />
           </div>
           <div>
             <div className="text-2xl font-bold text-slate-800 dark:text-white">2 Pizza</div>
             <div className="text-sm text-gray-500 dark:text-gray-400">Team Structure Approach</div>
           </div>
        </div>
         <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm flex items-center gap-4 transition-colors">
           <div className="w-12 h-12 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600 dark:text-green-400">
             <Activity size={24} />
           </div>
           <div>
             <div className="text-2xl font-bold text-slate-800 dark:text-white">99.9%</div>
             <div className="text-sm text-gray-500 dark:text-gray-400">Team Health</div>
           </div>
        </div>
         <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm flex items-center gap-4 transition-colors">
           <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center text-slate-600 dark:text-gray-300">
             <AlertTriangle size={24} />
           </div>
           <div>
             <div className="text-2xl font-bold text-slate-800 dark:text-white">2</div>
             <div className="text-sm text-gray-500 dark:text-gray-400">Bus Factor Alerts</div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Competence Matrix */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm transition-colors">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Team Competence Matrix</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} />
                <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                <Radar name="Current" dataKey="A" stroke="#E30611" strokeWidth={2} fill="#E30611" fillOpacity={0.3} />
                <Radar name="Target" dataKey="B" stroke="#1f2937" strokeWidth={2} fill="#1f2937" fillOpacity={0.1} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', color: '#fff' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 text-sm mt-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-[#E30611] rounded-full opacity-50"></span>
              <span className="text-slate-600 dark:text-gray-400 font-medium">Current Level</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-slate-800 dark:bg-slate-500 rounded-full opacity-50"></span>
              <span className="text-slate-600 dark:text-gray-400 font-medium">Target Profile</span>
            </div>
          </div>
        </div>

        {/* Resource Model */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm transition-colors">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Resource Gap Analysis</h3>
           <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={resourceData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={60} tick={{fill: '#64748b', fontWeight: 500}} axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#1e293b', border: 'none', color: '#fff' }} />
                <Bar dataKey="current" name="Current Staff" fill="#E30611" radius={[0, 4, 4, 0]} barSize={20} />
                <Bar dataKey="target" name="Target Staff" fill="#e5e7eb" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
           </div>
        </div>
      </div>

      {/* --- NEW SECTION: TEAM SERVICES --- */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
           <Server size={20} className="text-[#E30611]" />
           Services & Ownership
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
           {teamServices.map(service => (
             <div key={service.id} className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-start mb-3">
                   <div className="flex items-center gap-2">
                     <div className={`w-2 h-2 rounded-full ${service.status === 'Healthy' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                     <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{service.tech}</span>
                   </div>
                   {service.busFactor.risk === 'High' && (
                     <div className="flex items-center gap-1 px-2 py-1 bg-red-50 dark:bg-red-900/20 text-[#E30611] text-[10px] font-bold rounded">
                       <ShieldAlert size={12} /> Bus Factor: 1
                     </div>
                   )}
                </div>

                <h4 className="text-md font-bold text-slate-800 dark:text-white mb-1">{service.name}</h4>
                <p className="text-xs text-slate-500 dark:text-gray-400 mb-4 line-clamp-2 min-h-[2.5em]">
                  {service.description}
                </p>

                {/* Tech Owner */}
                <div className="mb-4 flex items-center gap-3 p-2 bg-gray-50 dark:bg-slate-900/50 rounded-lg">
                   <img src={service.ownerAvatar} alt={service.owner} className="w-8 h-8 rounded-full border border-gray-200 dark:border-slate-700" />
                   <div>
                     <div className="text-[10px] text-gray-400 uppercase font-bold">Tech Owner</div>
                     <div className="text-xs font-bold text-slate-700 dark:text-gray-200">{service.owner}</div>
                   </div>
                </div>
                
                {/* Bus Factor Detail */}
                {service.busFactor.risk === 'High' && (
                   <div className="mb-4 p-2 border border-red-100 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10 rounded-lg text-xs text-red-600 dark:text-red-300">
                     <span className="font-bold">Risk:</span> Knowledge siloed with {service.busFactor.person}.
                   </div>
                )}

                {/* Stats Grid */}
                <div className="mt-auto grid grid-cols-3 gap-2 border-t border-gray-100 dark:border-slate-700 pt-3">
                   <div className="text-center">
                     <div className="flex justify-center mb-1 text-gray-400"><Zap size={14}/></div>
                     <div className="text-xs font-bold text-slate-800 dark:text-white">{service.stats.uptime}</div>
                   </div>
                   <div className="text-center">
                     <div className="flex justify-center mb-1 text-gray-400"><Cpu size={14}/></div>
                     <div className="text-xs font-bold text-slate-800 dark:text-white">{service.stats.coverage}</div>
                   </div>
                   <div className="text-center">
                     <div className="flex justify-center mb-1 text-gray-400"><GitCommit size={14}/></div>
                     <div className="text-xs font-bold text-slate-800 dark:text-white">{service.stats.lastDeploy}</div>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>

       <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm transition-colors">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Team Members Mood</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {teamMembers.map((member, i) => (
              <div key={i} className="flex items-center gap-3 p-3 border border-gray-100 dark:border-slate-700 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full object-cover border border-gray-100 dark:border-slate-600" />
                <div>
                  <div className="text-sm font-bold text-slate-800 dark:text-white">{member.name}</div>
                  <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 font-medium">
                    <ThumbsUp size={12} />
                    <span>{member.mood}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
       </div>
    </div>
  );
};

export default TeamView;
