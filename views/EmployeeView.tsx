
import React, { useState } from 'react';
import { MoreHorizontal, ArrowUpRight, Github, Code, Plus, X, Upload, CheckSquare, Square } from 'lucide-react';

const initialEmployees = [
  { id: 1, name: 'Ekaterina Tyukavkina', role: 'CEO', dept: 'Executive', grade: 'E10', score: 9.9, potential: 'High', status: 'Top Performer', avatar: 'https://i.pravatar.cc/150?u=ekaterina' },
  { id: 2, name: 'Oleg Sidorenkov', role: 'CTO', dept: 'Engineering', grade: 'E9', score: 9.8, potential: 'High', status: 'Top Performer', avatar: 'https://i.pravatar.cc/150?u=oleg' },
  { id: 3, name: 'Igor Malysh', role: 'Chief DevEx', dept: 'Platform', grade: 'E8', score: 9.5, potential: 'High', status: 'Rising Star', avatar: 'https://i.pravatar.cc/150?u=igor' },
  { id: 4, name: 'Andrey Shtanov', role: 'CCO', dept: 'Business', grade: 'E9', score: 9.2, potential: 'High', status: 'Stable', avatar: 'https://i.pravatar.cc/150?u=andrey' },
  { id: 5, name: 'Artem Zhulin', role: 'Head of WB', dept: 'Product', grade: 'E8', score: 8.8, potential: 'Medium', status: 'Rising Star', avatar: 'https://i.pravatar.cc/150?u=artem' },
];

const EmployeeView: React.FC = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [activeModal, setActiveModal] = useState<'add' | 'git' | 'training' | 'actions' | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  
  // Training Selection State
  const [trainingSelection, setTrainingSelection] = useState<{ selectedEmpIds: number[], course: string | null }>({
    selectedEmpIds: [],
    course: null
  });

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const newEmp = {
      id: employees.length + 1,
      name: formData.get('name') as string,
      role: formData.get('role') as string,
      dept: formData.get('dept') as string,
      grade: 'E4',
      score: 7.0,
      potential: 'New',
      status: 'New Hire',
      avatar: `https://i.pravatar.cc/150?u=${(formData.get('name') as string).replace(/\s/g, '')}`
    };
    
    setEmployees([...employees, newEmp]);
    setActiveModal(null);
  };

  const toggleEmployeeSelection = (id: number) => {
    setTrainingSelection(prev => {
      const isSelected = prev.selectedEmpIds.includes(id);
      return {
        ...prev,
        selectedEmpIds: isSelected 
          ? prev.selectedEmpIds.filter(eid => eid !== id)
          : [...prev.selectedEmpIds, id]
      };
    });
  };

  const handleAssignTraining = () => {
    if (trainingSelection.selectedEmpIds.length === 0 || !trainingSelection.course) {
      alert("Please select at least one employee and one course.");
      return;
    }
    alert(`Assigned "${trainingSelection.course}" to ${trainingSelection.selectedEmpIds.length} employees.`);
    setActiveModal(null);
    setTrainingSelection({ selectedEmpIds: [], course: null });
  };

  return (
    <div className="h-full overflow-y-auto p-8 custom-scrollbar relative">
       <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Employee Assessment</h1>
          <p className="text-gray-500 dark:text-gray-400">Individual performance, 360 feedback, and development plans.</p>
        </div>
        <button 
          onClick={() => setActiveModal('add')}
          className="flex items-center gap-2 px-4 py-2 bg-[#E30611] text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors shadow-sm"
        >
          <Plus size={16} />
          Add Employee
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm overflow-hidden transition-colors">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-slate-900 border-b border-gray-100 dark:border-slate-700 text-xs uppercase text-gray-500 font-bold tracking-wider">
                <th className="px-6 py-4">Employee</th>
                <th className="px-6 py-4">Role & Dept</th>
                <th className="px-6 py-4">Perf. Score (1-10)</th>
                <th className="px-6 py-4">Potential</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-slate-700">
              {employees.map((emp) => (
                <tr key={emp.id} className="hover:bg-red-50/20 dark:hover:bg-red-900/10 transition-colors group relative">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={emp.avatar} alt={emp.name} className="w-10 h-10 rounded-full object-cover border border-gray-100 dark:border-slate-600" />
                      <div>
                        <div className="font-bold text-slate-800 dark:text-white">{emp.name}</div>
                        <div className="text-xs text-gray-400">MTS Web Services</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-slate-700 dark:text-gray-200">{emp.role}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] text-gray-400 uppercase tracking-wide">{emp.dept}</span>
                      <span className="inline-block px-1.5 py-0.5 rounded bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 text-[10px] font-bold">
                        {emp.grade}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                       <div className="w-12 h-1.5 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                         <div className="h-full bg-[#E30611] rounded-full" style={{ width: `${emp.score * 10}%` }}></div>
                       </div>
                       <span className="text-sm font-bold text-slate-700 dark:text-gray-200">{emp.score}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm ${emp.potential === 'High' ? 'text-green-600 dark:text-green-400 font-bold' : 'text-yellow-600 dark:text-yellow-400 font-medium'}`}>
                      {emp.potential}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold
                      ${emp.status === 'Top Performer' ? 'bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300' : 
                        emp.status === 'Rising Star' ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300' : 
                        emp.status === 'Needs Support' ? 'bg-orange-50 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300' : 
                        emp.status === 'New Hire' ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300'
                      }`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 relative">
                    <button 
                      onClick={() => { setSelectedEmployee(emp); setActiveModal('actions'); }}
                      className="text-gray-400 hover:text-[#E30611] transition-colors"
                    >
                      <MoreHorizontal size={18} />
                    </button>
                    {/* Actions Context Menu */}
                    {activeModal === 'actions' && selectedEmployee?.id === emp.id && (
                       <div className="absolute top-10 right-10 w-48 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-700 shadow-xl rounded-xl z-10 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-100">
                          <button onClick={() => setActiveModal(null)} className="text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-slate-700 text-sm text-slate-700 dark:text-gray-200">View Profile</button>
                          <button onClick={() => { setActiveModal(null); alert('Review requested'); }} className="text-left px-4 py-2 hover:bg-gray-50 dark:hover:bg-slate-700 text-sm text-slate-700 dark:text-gray-200">Request Review</button>
                          <div className="h-px bg-gray-100 dark:bg-slate-700 my-1"></div>
                          <button onClick={() => setActiveModal(null)} className="text-left px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 text-sm text-[#E30611]">Archive</button>
                       </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Click outside to close actions menu */}
      {activeModal === 'actions' && <div className="fixed inset-0 z-0" onClick={() => setActiveModal(null)}></div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-gradient-to-br from-[#E30611] to-[#990000] rounded-2xl p-6 text-white shadow-lg relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-32 bg-white opacity-5 rounded-full -mr-10 -mt-10 pointer-events-none"></div>
           <div className="flex items-start justify-between mb-4 relative z-10">
             <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
               <Github size={24} />
             </div>
             <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded">DevOps Metrics</span>
           </div>
           <h3 className="text-xl font-bold mb-1 relative z-10">Top Contributor</h3>
           <p className="text-red-100 text-sm mb-4 relative z-10">Igor Malysh has the highest PR velocity this month.</p>
           <button 
             onClick={() => setActiveModal('git')}
             className="relative z-10 w-full py-2 bg-white text-[#E30611] font-bold rounded-lg text-sm hover:bg-red-50 transition-colors"
           >
             View Git Report
           </button>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm hover:border-red-200 dark:hover:border-red-900 transition-colors">
           <div className="flex items-start justify-between mb-4">
             <div className="p-2 bg-gray-100 dark:bg-slate-700 text-slate-700 dark:text-white rounded-lg">
               <Code size={24} />
             </div>
             <span className="text-xs font-bold bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">Learning</span>
           </div>
           <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-1">Skill Gap Analysis</h3>
           <p className="text-slate-500 dark:text-gray-400 text-sm mb-4">Artem needs upskilling in Product Analytics.</p>
           <button 
             onClick={() => { setActiveModal('training'); setTrainingSelection({ selectedEmpIds: [], course: null }); }}
             className="flex items-center gap-2 text-sm text-[#E30611] font-bold hover:underline"
           >
             Assign Training <ArrowUpRight size={14} />
           </button>
        </div>
      </div>

      {/* --- MODALS --- */}

      {/* Add Employee Modal */}
      {activeModal === 'add' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
           <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md p-6">
             <div className="flex justify-between items-center mb-4">
               <h3 className="text-xl font-bold text-slate-800 dark:text-white">Add New Employee</h3>
               <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-[#E30611]"><X size={20}/></button>
             </div>
             <form onSubmit={handleAddEmployee} className="space-y-4">
               <div>
                 <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Full Name</label>
                 <input name="name" required type="text" className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-white focus:outline-none focus:border-[#E30611]" />
               </div>
               <div>
                 <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Role</label>
                 <input name="role" required type="text" className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-white focus:outline-none focus:border-[#E30611]" />
               </div>
               <div>
                 <label className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1">Department</label>
                 <select name="dept" className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-lg text-sm text-slate-800 dark:text-white focus:outline-none focus:border-[#E30611]">
                   <option>Engineering</option>
                   <option>Design</option>
                   <option>Product</option>
                   <option>Platform</option>
                 </select>
               </div>
               <button type="submit" className="w-full py-2 bg-[#E30611] text-white font-bold rounded-lg hover:bg-red-700 transition-colors">Create Profile</button>
             </form>
           </div>
        </div>
      )}

      {/* Git Report Modal */}
      {activeModal === 'git' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
           <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-2xl p-6">
             <div className="flex justify-between items-center mb-6">
               <h3 className="text-xl font-bold text-slate-800 dark:text-white">Git Performance Report</h3>
               <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-[#E30611]"><X size={20}/></button>
             </div>
             <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-slate-900 p-4 rounded-xl text-center">
                   <div className="text-2xl font-bold text-slate-800 dark:text-white">666</div>
                   <div className="text-xs text-gray-500 uppercase">Commits</div>
                </div>
                <div className="bg-gray-50 dark:bg-slate-900 p-4 rounded-xl text-center">
                   <div className="text-2xl font-bold text-slate-800 dark:text-white">2h</div>
                   <div className="text-xs text-gray-500 uppercase">Avg Review Time</div>
                </div>
                <div className="bg-gray-50 dark:bg-slate-900 p-4 rounded-xl text-center">
                   <div className="text-2xl font-bold text-[#E30611]">99.9%</div>
                   <div className="text-xs text-gray-500 uppercase">Success Rate</div>
                </div>
             </div>
             <div className="bg-slate-900 rounded-xl p-4 text-xs font-mono text-green-400 h-48 overflow-y-auto">
               &gt; Generating report for last 30 days...<br/>
               &gt; Analyzing PR velocity... DONE<br/>
               &gt; Calculating Code Churn... DONE<br/>
               &gt; Report ready.<br/>
               <span className="text-white">
               User: Igor Malysh<br/>
               Top Repo: mts-platform-core<br/>
               Most changed file: pipeline_config.yaml
               </span>
             </div>
             <div className="flex justify-end gap-3 mt-6">
               <button onClick={() => setActiveModal(null)} className="px-4 py-2 text-slate-600 dark:text-gray-300 font-bold hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg">Close</button>
               <button className="px-4 py-2 bg-[#E30611] text-white font-bold rounded-lg hover:bg-red-700 flex items-center gap-2"><Upload size={16}/> Export PDF</button>
             </div>
           </div>
        </div>
      )}

       {/* Training Modal */}
      {activeModal === 'training' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
           <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-2xl p-6 flex flex-col max-h-[90vh]">
             <div className="flex justify-between items-center mb-4 shrink-0">
               <h3 className="text-xl font-bold text-slate-800 dark:text-white">Assign Training</h3>
               <button onClick={() => setActiveModal(null)} className="text-gray-400 hover:text-[#E30611]"><X size={20}/></button>
             </div>
             
             <div className="flex-1 overflow-y-auto custom-scrollbar">
                {/* Employee Selection */}
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-slate-700 dark:text-gray-300 mb-3 uppercase tracking-wider">1. Select Employees</h4>
                  <div className="space-y-2">
                    {employees.map(emp => {
                      const isSelected = trainingSelection.selectedEmpIds.includes(emp.id);
                      return (
                        <div 
                          key={emp.id} 
                          onClick={() => toggleEmployeeSelection(emp.id)}
                          className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${isSelected 
                            ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/50' 
                            : 'bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800'}`}
                        >
                          <div className={`text-[#E30611] ${isSelected ? 'opacity-100' : 'opacity-40'}`}>
                            {isSelected ? <CheckSquare size={20} /> : <Square size={20} />}
                          </div>
                          <img src={emp.avatar} alt={emp.name} className="w-8 h-8 rounded-full object-cover" />
                          <div>
                            <div className="text-sm font-bold text-slate-800 dark:text-white">{emp.name}</div>
                            <div className="text-xs text-gray-500">{emp.role}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Course Selection */}
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-slate-700 dark:text-gray-300 mb-3 uppercase tracking-wider">2. Select Course</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {['Golang Microservices', 'React Advanced Patterns', 'Kubernetes Security', 'System Design'].map(course => (
                      <label 
                        key={course} 
                        className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-colors
                          ${trainingSelection.course === course 
                            ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/50' 
                            : 'bg-white dark:bg-slate-900 border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800'}`}
                      >
                        <input 
                          type="radio" 
                          name="course" 
                          value={course}
                          checked={trainingSelection.course === course}
                          onChange={() => setTrainingSelection(prev => ({ ...prev, course }))}
                          className="text-[#E30611] focus:ring-[#E30611]" 
                        />
                        <span className="text-slate-800 dark:text-white font-medium text-sm">{course}</span>
                      </label>
                    ))}
                  </div>
                </div>
             </div>

             <div className="pt-4 border-t border-gray-100 dark:border-slate-700 shrink-0 flex justify-end gap-3">
               <button onClick={() => setActiveModal(null)} className="px-4 py-2 text-slate-600 dark:text-gray-400 font-bold hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg">Cancel</button>
               <button 
                 onClick={handleAssignTraining}
                 disabled={trainingSelection.selectedEmpIds.length === 0 || !trainingSelection.course}
                 className={`px-6 py-2 bg-[#E30611] text-white font-bold rounded-lg transition-colors ${trainingSelection.selectedEmpIds.length === 0 || !trainingSelection.course ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'}`}
               >
                 Confirm Assignment ({trainingSelection.selectedEmpIds.length})
               </button>
             </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeView;
