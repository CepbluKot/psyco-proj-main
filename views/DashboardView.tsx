import React from 'react';
import { 
  AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, 
  BarChart, Bar
} from 'recharts';
import { TrendingUp, TrendingDown, ChevronDown } from 'lucide-react';
import { MetricCardProps } from '../types';

// Mock Data
const trafficData = [
  { name: 'Jan', current: 20, previous: 22 },
  { name: 'Feb', current: 18, previous: 15 },
  { name: 'Mar', current: 17, previous: 18 },
  { name: 'Apr', current: 25, previous: 20 },
  { name: 'May', current: 35, previous: 28 },
  { name: 'Jun', current: 42, previous: 38 },
  { name: 'Jul', current: 50, previous: 40 },
];

const locationData = [
  { name: 'Russia', value: 38.6, color: '#E30611' }, // MTS Red
  { name: 'Belarus', value: 22.5, color: '#1f2937' }, // Dark Slate
  { name: 'Kyrgyzstan', value: 30.8, color: '#9ca3af' }, // Gray
  { name: 'Other', value: 8.1, color: '#e5e7eb' }, // Light Gray
];

const marketingData = [
  { name: 'Jan', value: 24 },
  { name: 'Feb', value: 27 },
  { name: 'Mar', value: 25 },
  { name: 'Apr', value: 29 },
  { name: 'May', value: 23 },
  { name: 'Jun', value: 27 },
  { name: 'Jul', value: 24 },
  { name: 'Aug', value: 27 },
  { name: 'Sep', value: 25 },
  { name: 'Oct', value: 29 },
  { name: 'Nov', value: 23 },
  { name: 'Dec', value: 27 },
];

// Helper Component for Cards
const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, isPositive, color }) => (
  <div className={`p-5 rounded-xl ${color || 'bg-gray-50 dark:bg-slate-800'} flex flex-col justify-between h-32 transition-colors`}>
    <div className="flex justify-between items-start">
      <span className="text-sm font-bold text-slate-800 dark:text-gray-200">{title}</span>
    </div>
    <div className="flex items-end justify-between">
      <span className="text-3xl font-bold text-slate-900 dark:text-white">{value}</span>
      <div className="flex items-center gap-1 text-xs font-medium">
        <span className={isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}>{change}</span>
        {isPositive ? <TrendingUp size={14} className="text-green-600 dark:text-green-400" /> : <TrendingDown size={14} className="text-red-600 dark:text-red-400" />}
      </div>
    </div>
  </div>
);

const DashboardView: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto p-8 custom-scrollbar">
      
      {/* Time Filter */}
      <div className="flex items-center gap-2 mb-6">
        <span className="font-bold text-slate-800 dark:text-white">Today</span>
        <ChevronDown size={16} className="text-gray-400" />
      </div>

      {/* Section: Product Outcomes & Value */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-sm font-bold text-slate-700 dark:text-gray-300 uppercase tracking-wide">Product Outcomes & Value</h2>
          <ChevronDown size={14} className="text-gray-400" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard 
            title="Product Score" 
            value="0.89" 
            change="+11.01%" 
            isPositive={true} 
            color="bg-red-50 dark:bg-red-900/20"
          />
          <MetricCard 
            title="MAU" 
            value="3K" 
            change="-0.03%" 
            isPositive={false} 
            color="bg-white border border-gray-100 dark:bg-slate-800 dark:border-slate-700"
          />
          <MetricCard 
            title="NPS" 
            value="60" 
            change="+15.03%" 
            isPositive={true} 
            color="bg-gray-100 dark:bg-slate-700"
          />
          <MetricCard 
            title="OKR" 
            value="84 %" 
            change="+6.08%" 
            isPositive={true} 
            color="bg-slate-50 dark:bg-slate-800"
          />
        </div>
      </div>

      {/* Section: Delivery & Reliability + Traffic */}
      <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Delivery Chart */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm transition-colors">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold text-slate-800 dark:text-white">Total Users</h3>
            <div className="flex gap-4 text-xs">
              <span className="text-gray-400">Total Projects</span>
              <span className="text-gray-400">Operating Status</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#E30611]"></span>
                <span className="dark:text-gray-400">Current Week</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                <span className="text-gray-400">Previous Week</span>
              </div>
            </div>
          </div>
          <div className="h-64 relative">
             {/* Simple badge overlay simulation for the chart */}
             <div className="absolute top-1/3 left-1/3 bg-slate-900 dark:bg-white dark:text-slate-900 text-white text-xs px-2 py-1 rounded">3,256,598</div>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData}>
                <defs>
                  <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E30611" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#E30611" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', color: '#fff' }} />
                <Area type="monotone" dataKey="current" stroke="#E30611" strokeWidth={2} fillOpacity={1} fill="url(#colorCurrent)" />
                <Area type="monotone" dataKey="previous" stroke="#d1d5db" strokeWidth={2} strokeDasharray="5 5" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Traffic Donut */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm transition-colors">
          <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-6">Traffic by Location</h3>
          <div className="flex flex-col sm:flex-row items-center justify-around h-64">
            <div className="w-40 h-40 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={locationData}
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={0}
                    dataKey="value"
                    stroke="none"
                  >
                    {locationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {locationData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between w-48 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                    <span className="text-slate-600 dark:text-gray-300">{item.name}</span>
                  </div>
                  <span className="font-bold text-slate-800 dark:text-white">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Marketing & SEO */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm mb-6 transition-colors">
        <h3 className="text-sm font-bold text-slate-800 dark:text-white mb-6">Marketing & SEO</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={marketingData} barSize={12}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9ca3af'}} />
              <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#1e293b', border: 'none', color: '#fff' }} />
              {/* Using Cell to alternate colors to MTS Brand */}
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {marketingData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={[0, 3, 4, 7, 8, 11].includes(index) ? '#E30611' : [1, 5, 9, 12].includes(index) ? '#1f2937' : '#9ca3af'} 
                    fillOpacity={1}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default DashboardView;