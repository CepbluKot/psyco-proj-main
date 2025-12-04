import React from 'react';
import { Clock, CheckCircle2, AlertCircle } from 'lucide-react';

const projects = [
  { id: 1, name: 'MTS Fintech App', status: 'In Progress', health: 'Good', completion: 65, team: 'Alpha', deadline: 'Dec 2025' },
  { id: 2, name: 'Streaming Platform Redesign', status: 'Review', health: 'At Risk', completion: 90, team: 'Media', deadline: 'Oct 2025' },
  { id: 3, name: 'Cloud Infrastructure Migration', status: 'Planning', health: 'Good', completion: 15, team: 'DevOps', deadline: 'Jan 2026' },
  { id: 4, name: 'AI Recommendation Engine', status: 'In Progress', health: 'Good', completion: 45, team: 'Data Science', deadline: 'Nov 2025' },
];

const ProjectsView: React.FC = () => {
  return (
    <div className="h-full overflow-y-auto p-8 custom-scrollbar">
       <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Active Projects</h1>
          <p className="text-gray-500 dark:text-gray-400">Track progress, deadlines, and delivery health across the ecosystem.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div 
            key={project.id} 
            onClick={() => alert(`Opening details for ${project.name}`)}
            className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all cursor-pointer group active:scale-[0.99]"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold mb-2
                  ${project.status === 'In Progress' ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300' : 
                    project.status === 'Review' ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300' : 
                    'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300'}`}>
                  {project.status}
                </span>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white group-hover:text-[#E30611] transition-colors">{project.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Team: {project.team}</p>
              </div>
              <div className={`p-2 rounded-full ${project.health === 'Good' ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'}`}>
                {project.health === 'Good' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-500 dark:text-gray-400">Progress</span>
                <span className="font-bold text-slate-800 dark:text-white">{project.completion}%</span>
              </div>
              <div className="w-full h-2 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${project.health === 'At Risk' ? 'bg-red-400' : 'bg-[#E30611]'}`} 
                  style={{ width: `${project.completion}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-50 dark:border-slate-700 pt-4">
              <Clock size={16} />
              <span>Due {project.deadline}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsView;