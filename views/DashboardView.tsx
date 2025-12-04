
import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell, CartesianGrid, Legend, ComposedChart, Line, LineChart,
  PieChart, Pie
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Bug, 
  Beaker, 
  Users, 
  CheckSquare, 
  AlertOctagon,
  Activity,
  Layers,
  MoreHorizontal,
  Sparkles,
  BrainCircuit,
  ArrowRight,
  Zap,
  AlertTriangle
} from 'lucide-react';
import { MetricCardProps } from '../types';

// --- MOCK DATA ---

// 1. PRODUCT OUTCOMES DATA (New)
const outcomeData = [
  { month: 'Feb', current: 1500000, previous: 1200000 },
  { month: 'Mar', current: 1400000, previous: 1300000 },
  { month: 'Apr', current: 2200000, previous: 1600000 },
  { month: 'May', current: 3100000, previous: 2100000 },
  { month: 'Jun', current: 3800000, previous: 3200000 },
  { month: 'Jul', current: 4500000, previous: 3500000 },
];

const locationData = [
  { name: 'Russia', value: 38.6, color: '#E30611' },
  { name: 'Belarus', value: 22.5, color: '#1e293b' },
  { name: 'Kyrgyzstan', value: 30.8, color: '#94a3b8' },
  { name: 'Other', value: 8.1, color: '#e2e8f0' },
];

const marketingData = [
  { month: 'Jan', value: 35, color: '#E30611' },
  { month: 'Feb', value: 45, color: '#1e293b' },
  { month: 'Mar', value: 55, color: '#94a3b8' },
  { month: 'Apr', value: 70, color: '#E30611' },
  { month: 'May', value: 50, color: '#E30611' },
  { month: 'Jun', value: 65, color: '#1e293b' },
  { month: 'Jul', value: 45, color: '#94a3b8' },
  { month: 'Aug', value: 70, color: '#E30611' },
  { month: 'Sep', value: 60, color: '#E30611' },
  { month: 'Oct', value: 80, color: '#1e293b' },
  { month: 'Nov', value: 65, color: '#94a3b8' },
  { month: 'Dec', value: 75, color: '#E30611' },
];

// 2. OPERATIONAL DATA (Existing)
const trafficData = [
  { name: 'Mon', visits: 4000, interactions: 2400 },
  { name: 'Tue', visits: 3000, interactions: 1398 },
  { name: 'Wed', visits: 2000, interactions: 9800 },
  { name: 'Thu', visits: 2780, interactions: 3908 },
  { name: 'Fri', visits: 1890, interactions: 4800 },
  { name: 'Sat', visits: 2390, interactions: 3800 },
  { name: 'Sun', visits: 3490, interactions: 4300 },
];

const incidentData = [
  { severity: 'Low', count: 45, color: '#94a3b8' },
  { severity: 'Medium', count: 23, color: '#fbbf24' },
  { severity: 'High', count: 8, color: '#f97316' },
  { severity: 'Critical', count: 2, color: '#E30611' },
];

const staffingData = [
  { role: 'Backend', actual: 12, required: 15, gap: -3 },
  { role: 'Frontend', actual: 8, required: 10, gap: -2 },
  { role: 'QA', actual: 3, required: 6, gap: -3 },
  { role: 'Design', actual: 4, required: 4, gap: 0 },
  { role: 'Product', actual: 3, required: 5, gap: -2 },
  { role: 'DevOps', actual: 4, required: 4, gap: 0 },
];

const projectTasks = [
  { id: 1, task: 'Auth Service Migration v2', assignee: 'Backend Team', status: 'In Progress', start: 5, duration: 45 },
  { id: 2, task: 'Dashboard UI Redesign', assignee: 'Frontend Team', status: 'Done', start: 0, duration: 25 },
  { id: 3, task: 'E2E Testing Suite Setup', assignee: 'QA Team', status: 'Delayed', start: 55, duration: 20 },
  { id: 4, task: 'User Feedback Loop Integration', assignee: 'Product', status: 'Planning', start: 70, duration: 25 },
  { id: 5, task: 'Infrastructure Scaling', assignee: 'DevOps', status: 'In Progress', start: 30, duration: 40 },
];

// 3. AI RECOMMENDATIONS DATA
const aiRecommendations = [
  {
    id: 1,
    type: 'risk',
    title: 'Deployment Bottleneck Predicted',
    description: 'Based on current velocity and QA staffing gaps (-3 FTE), the "Auth Service Migration" is projected to slip by 2 weeks.',
    action: 'Reallocate 2 QA Engineers from Maintenance',
    confidence: 89,
    impact: 'High'
  },
  {
    id: 2,
    type: 'opportunity',
    title: 'High NPS in Premium Segment',
    description: 'User sentiment analysis shows strong demand for "Advanced Analytics". Prioritizing this feature could boost ARR by 12% in Q1.',
    action: 'Fast-track Feature MWS-1050',
    confidence: 94,
    impact: 'Medium'
  },
  {
    id: 3,
    type: 'efficiency',
    title: 'Code Review Latency High',
    description: 'Average PR merge time has increased to 28h in the Frontend Team. This is slowing down the "Dashboard UI" sprint.',
    action: 'Implement "Review Hour" or Pair Programming',
    confidence: 76,
    impact: 'Medium'
  }
];

interface MetricCardExtendedProps extends MetricCardProps {
  subValue?: string;
  icon?: React.ReactNode;
}

// Helper Component for Cards
const MetricCard: React.FC<MetricCardExtendedProps> = ({ title, value, subValue, change, isPositive, color, icon }) => (
  <div className={`p-5 rounded-2xl ${color || 'bg-white dark:bg-slate-800'} border border-gray-100 dark:border-slate-700 flex flex-col justify-between h-36 shadow-sm transition-all hover:shadow-md`}>
    <div className="flex justify-between items-start">
      <div className="flex items-center gap-3">
        {icon && <div className="p-2 rounded-lg bg-white/50 dark:bg-slate-700/50 text-slate-700 dark:text-gray-200">{icon}</div>}
        <span className="text-sm font-bold text-slate-600 dark:text-gray-300">{title}</span>
      </div>
    </div>
    <div>
      <div className="flex items-baseline gap-2">
         <span className="text-3xl font-bold text-slate-900 dark:text-white">{value}</span>
         {subValue && <span className="text-sm text-gray-400 font-medium">{subValue}</span>}
      </div>
      <div className="flex items-center gap-2 mt-2">
        <div className={`flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${isPositive ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {change}
        </div>
      </div>
    </div>
  </div>
);

interface OutcomeCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  bgClass?: string;
}

// Specialized Card for the "Product Outcomes" section
const OutcomeCard: React.FC<OutcomeCardProps> = ({ title, value, change, isPositive, bgClass }) => (
  <div className={`p-6 rounded-2xl ${bgClass || 'bg-white dark:bg-slate-800'} border border-gray-100 dark:border-slate-700 shadow-sm flex flex-col justify-center h-32`}>
    <h3 className="text-sm font-bold text-slate-600 dark:text-gray-400 mb-2">{title}</h3>
    <div className="flex items-end justify-between">
       <span className="text-3xl font-bold text-slate-900 dark:text-white">{value}</span>
       <span className={`text-xs font-bold flex items-center gap-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
         {change}
         {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
       </span>
    </div>
  </div>
);

const DashboardView: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto p-8 custom-scrollbar bg-[#F3F6FD] dark:bg-slate-900">
      
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Product Overview</h1>
          <p className="text-gray-500 dark:text-gray-400">Strategic outcomes, marketing performance, and operational metrics.</p>
        </div>
        <div className="flex items-center gap-2 bg-white dark:bg-slate-800 rounded-lg p-1 border border-gray-200 dark:border-slate-700">
          <button className="px-3 py-1.5 text-xs font-bold bg-[#E30611] text-white rounded">Q4 2025</button>
          <button className="px-3 py-1.5 text-xs font-bold text-gray-500 hover:text-slate-800 dark:hover:text-white">Q1 2026</button>
        </div>
      </div>

      {/* --- SECTION 1: PRODUCT OUTCOMES & VALUE (New) --- */}
      <div className="mb-8">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Product Outcomes & Value</h2>
        
        {/* KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <OutcomeCard title="Product Score" value="0.89" change="+11.01%" isPositive={true} bgClass="bg-red-50 dark:bg-red-900/10" />
          <OutcomeCard title="MAU" value="3K" change="-0.03%" isPositive={false} />
          <OutcomeCard title="NPS" value="60" change="+15.03%" isPositive={true} />
          <OutcomeCard title="OKR" value="84 %" change="+6.08%" isPositive={true} />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
           
           {/* Total Users Chart */}
           <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm relative">
              <div className="flex justify-between items-start mb-6">
                 <div>
                   <h3 className="text-lg font-bold text-slate-800 dark:text-white">Total Users</h3>
                 </div>
                 <div className="flex items-center gap-4 text-xs font-medium">
                    <span className="flex items-center gap-1 text-gray-400"><span className="w-2 h-2 rounded-full bg-[#E30611]"></span> Current Week</span>
                    <span className="flex items-center gap-1 text-gray-400"><span className="w-2 h-2 rounded-full bg-gray-300"></span> Previous Week</span>
                 </div>
              </div>
              
              {/* Central Badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-800 text-white px-3 py-1 rounded text-sm font-bold shadow-lg z-10 hidden sm:block">
                3,256,598
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={outcomeData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', color: '#fff', borderRadius: '8px' }} />
                    <Line type="monotone" dataKey="current" stroke="#E30611" strokeWidth={3} dot={false} />
                    <Line type="monotone" dataKey="previous" stroke="#cbd5e1" strokeWidth={3} strokeDasharray="5 5" dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
           </div>

           {/* Traffic by Location Donut */}
           <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm flex flex-col">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Traffic by Location</h3>
              <div className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-8">
                 <div className="w-48 h-48 relative">
                   <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                       <Pie
                         data={locationData}
                         innerRadius={60}
                         outerRadius={80}
                         paddingAngle={0}
                         dataKey="value"
                         startAngle={90}
                         endAngle={-270}
                       >
                         {locationData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                         ))}
                       </Pie>
                     </PieChart>
                   </ResponsiveContainer>
                   {/* Center Text */}
                   <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="w-32 h-32 rounded-full border-[12px] border-slate-50 dark:border-slate-900 opacity-10"></div>
                   </div>
                 </div>

                 {/* Custom Legend */}
                 <div className="space-y-3">
                    {locationData.map((item, i) => (
                      <div key={i} className="flex items-center justify-between w-32">
                         <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">{item.name}</span>
                         </div>
                         <span className="text-sm font-bold text-slate-800 dark:text-white">{item.value}%</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        {/* Marketing & SEO Bar Chart */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm mb-6">
           <div className="flex justify-between items-center mb-6">
             <h3 className="text-lg font-bold text-slate-800 dark:text-white">Marketing & SEO</h3>
             <button className="text-gray-400 hover:text-slate-800"><MoreHorizontal size={20}/></button>
           </div>
           <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={marketingData} barSize={8}>
                    <Tooltip 
                       cursor={{fill: 'transparent'}}
                       contentStyle={{ backgroundColor: '#1e293b', border: 'none', color: '#fff', borderRadius: '8px', fontSize: '12px' }}
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {marketingData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10 }} />
                 </BarChart>
              </ResponsiveContainer>
           </div>
        </div>
      </div>

      {/* --- SECTION 1.5: AI STRATEGIC INSIGHTS (NEW) --- */}
      <div className="mb-8">
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <BrainCircuit size={14} className="text-[#E30611]" /> 
          AI Strategic Insights
        </h2>
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-32 bg-[#E30611] opacity-5 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
            {aiRecommendations.map((rec) => (
              <div key={rec.id} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-colors flex flex-col">
                <div className="flex justify-between items-start mb-3">
                  <div className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1
                    ${rec.type === 'risk' ? 'bg-red-500/20 text-red-300' : 
                      rec.type === 'opportunity' ? 'bg-green-500/20 text-green-300' : 'bg-blue-500/20 text-blue-300'}`}>
                    {rec.type === 'risk' && <AlertTriangle size={12} />}
                    {rec.type === 'opportunity' && <TrendingUp size={12} />}
                    {rec.type === 'efficiency' && <Zap size={12} />}
                    {rec.type}
                  </div>
                  <div className="flex items-center gap-1 text-xs font-mono text-gray-400">
                    <Sparkles size={10} className="text-yellow-400" />
                    {rec.confidence}% Conf.
                  </div>
                </div>
                
                <h3 className="font-bold text-lg mb-2 leading-tight">{rec.title}</h3>
                <p className="text-sm text-gray-300 mb-4 flex-1">{rec.description}</p>
                
                <div className="mt-auto">
                  <div className="text-xs text-gray-400 uppercase font-bold mb-1">Recommended Action:</div>
                  <button className="w-full text-left bg-white/5 hover:bg-white/10 p-3 rounded-lg flex items-center justify-between group transition-all">
                    <span className="text-sm font-bold text-white group-hover:text-[#E30611] transition-colors">{rec.action}</span>
                    <ArrowRight size={16} className="text-gray-500 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- SECTION 2: OPERATIONAL METRICS (Existing) --- */}
      <div>
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Operational Metrics</h2>
        
        {/* KPI Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard 
            title="Bugs" 
            value="142" 
            subValue="/ 28 Active"
            change="-12%" 
            isPositive={true} 
            icon={<Bug size={18} />}
          />
          <MetricCard 
            title="A/B Tests" 
            value="12" 
            subValue="Running"
            change="+4" 
            isPositive={true} 
            icon={<Beaker size={18} />}
          />
          <MetricCard 
            title="Tasks" 
            value="450" 
            subValue="/ 320 Done"
            change="+8%" 
            isPositive={true} 
            icon={<CheckSquare size={18} />}
          />
          <MetricCard 
            title="Headcount" 
            value="124" 
            subValue="across 8 Teams"
            change="+2" 
            isPositive={true} 
            icon={<Users size={18} />}
          />
        </div>

        {/* Platform Engagement & Incidents */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm">
             <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <Activity size={18} className="text-[#E30611]" />
                Platform Engagement
              </h3>
              <select className="bg-gray-50 dark:bg-slate-700 border-none text-xs rounded-md px-2 py-1 outline-none text-slate-700 dark:text-gray-200 font-bold">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trafficData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#E30611" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#E30611" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorInteractions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', color: '#fff', borderRadius: '8px' }} />
                  <CartesianGrid vertical={false} stroke="#e2e8f0" strokeDasharray="3 3" opacity={0.3} />
                  <Area type="monotone" dataKey="visits" stroke="#E30611" fillOpacity={1} fill="url(#colorVisits)" strokeWidth={2} />
                  <Area type="monotone" dataKey="interactions" stroke="#82ca9d" fillOpacity={1} fill="url(#colorInteractions)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                  <AlertOctagon size={18} className="text-[#E30611]" />
                  Incidents
                </h3>
                <p className="text-xs text-gray-400">By severity level</p>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={incidentData} layout="vertical" margin={{ left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" opacity={0.3} />
                  <XAxis type="number" hide />
                  <YAxis dataKey="severity" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11, fontWeight: 600 }} width={60} />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', color: '#fff', borderRadius: '8px' }} 
                  />
                  <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={20} label={{ position: 'right', fill: '#64748b', fontSize: 12 }}>
                    {incidentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Staffing + Gantt */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm">
            <div className="flex justify-between items-center mb-6">
               <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                  <Users size={18} className="text-slate-600 dark:text-gray-300" />
                  Staffing
                </h3>
                <p className="text-xs text-gray-400">Gap Analysis</p>
              </div>
              <div className="flex gap-4 text-xs">
                <div className="flex items-center gap-1">
                   <div className="w-2 h-2 bg-[#E30611] rounded-full"></div>
                   <span className="text-gray-500">Act.</span>
                </div>
                <div className="flex items-center gap-1">
                   <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                   <span className="text-gray-500">Req.</span>
                </div>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={staffingData} margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.3} />
                  <XAxis dataKey="role" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                  <YAxis hide />
                  <Tooltip 
                     contentStyle={{ backgroundColor: '#1e293b', border: 'none', color: '#fff', borderRadius: '8px' }}
                  />
                  <Bar dataKey="required" barSize={24} fill="#e2e8f0" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="actual" barSize={12} fill="#E30611" radius={[4, 4, 0, 0]} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
                  <Layers size={18} className="text-slate-600 dark:text-gray-300" />
                  Current Project Roadmap
                </h3>
                <p className="text-xs text-gray-400">Live task tracking for Q4</p>
              </div>
              <button className="text-xs font-bold text-[#E30611] hover:underline">View Full Plan</button>
            </div>
            
            <div className="relative">
              <div className="grid grid-cols-12 gap-0 mb-4 text-[10px] font-bold text-gray-400 uppercase border-b border-gray-100 dark:border-slate-700 pb-2">
                <div className="col-span-4 pl-2">Task</div>
                <div className="col-span-8 flex justify-between px-2">
                  <span>Week 1</span>
                  <span>Week 2</span>
                  <span>Week 3</span>
                  <span>Week 4</span>
                </div>
              </div>

              <div className="space-y-3">
                 {projectTasks.map((t) => (
                   <div key={t.id} className="grid grid-cols-12 gap-0 items-center relative py-1 hover:bg-gray-50 dark:hover:bg-slate-700/30 rounded-lg transition-colors group">
                      <div className="col-span-4 pl-2 pr-2">
                        <div className="font-bold text-xs text-slate-800 dark:text-white truncate" title={t.task}>{t.task}</div>
                        <div className="text-[10px] text-gray-400">{t.assignee}</div>
                      </div>
                      
                      <div className="col-span-8 relative h-6 bg-gray-50 dark:bg-slate-900 rounded-md overflow-hidden flex items-center">
                        <div className="absolute inset-0 grid grid-cols-4 divide-x divide-gray-200 dark:divide-slate-700/50">
                          <div></div><div></div><div></div><div></div>
                        </div>
                        
                        <div 
                          className={`absolute h-3 rounded-full shadow-sm transition-all group-hover:h-4
                            ${t.status === 'Done' ? 'bg-green-500' : 
                              t.status === 'Delayed' ? 'bg-red-500' : 
                              t.status === 'Planning' ? 'bg-gray-300 dark:bg-gray-600' : 'bg-[#E30611]'}`}
                          style={{ 
                            left: `${t.start}%`, 
                            width: `${t.duration}%` 
                          }}
                        ></div>
                      </div>
                   </div>
                 ))}
              </div>
              
              <div className="absolute top-8 bottom-0 w-px bg-[#E30611] left-[45%] border-l border-dashed border-[#E30611] z-10 opacity-30 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
