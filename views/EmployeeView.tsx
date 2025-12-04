
import React, { useState } from 'react';
import { 
  MoreHorizontal, 
  ArrowUpRight, 
  Github, 
  Code, 
  Plus, 
  X, 
  Upload, 
  CheckSquare, 
  Square,
  ChevronDown,
  ChevronUp,
  Database,
  Lightbulb,
  TrendingUp,
  Target,
  BrainCircuit,
  Info,
  Battery,
  Zap,
  Users,
  Award,
  BookOpen
} from 'lucide-react';

// --- Types for Advanced Metrics ---
interface MetricBreakdown {
  label: string;
  value: number; // 0.0 to 1.0 normalized
  weight: number;
  description: string;
}

interface PerformanceMetric {
  code: string; // E1, E2, etc.
  title: string;
  score: number; // 1-10
  formula: string;
  components: MetricBreakdown[];
}

interface EmployeeDetails {
  metrics: {
    delivery: PerformanceMetric;
    hardSkills: PerformanceMetric;
    softSkills: PerformanceMetric;
    sustainability: PerformanceMetric;
  };
  sources: string[];
  summary: string;
  recommendations: string[];
}

interface Employee {
  id: number;
  name: string;
  role: string;
  dept: string;
  grade: string;
  score: number;
  potential: string;
  status: string;
  avatar: string;
  details: EmployeeDetails;
}

// --- MOCK DATA ---
const initialEmployees: Employee[] = [
  { 
    id: 1, 
    name: 'Ekaterina Tyukavkina', 
    role: 'CEO', 
    dept: 'Executive', 
    grade: 'E10', 
    score: 9.9, 
    potential: 'High', 
    status: 'Top Performer', 
    avatar: 'https://i.pravatar.cc/150?u=ekaterina',
    details: {
      metrics: { 
        delivery: {
          code: 'E1',
          title: 'Contribution & Impact',
          score: 9.9,
          formula: '1 + 9 * clamp(0.4·TASK + 0.25·INCIDENT + 0.2·RELEASE + 0.15·CROSS_TEAM)',
          components: [
            { label: 'Task Completion (Weighted)', value: 0.98, weight: 0.4, description: 'High-priority strategic goals achieved.' },
            { label: 'Incident Contribution', value: 0.85, weight: 0.25, description: 'Critical incident resolution leadership.' },
            { label: 'Release Contribution', value: 1.0, weight: 0.2, description: 'Successfully launched MWS AI Platform.' },
            { label: 'Cross-Team Help', value: 0.95, weight: 0.15, description: 'Active Prideboard participation.' }
          ]
        },
        hardSkills: {
          code: 'E2',
          title: 'Skills & Growth',
          score: 9.5,
          formula: '1 + 9 * clamp(0.35·COMP_LEVEL + 0.25·COMP_GROWTH + 0.25·LEARNING + 0.15·BUDDY)',
          components: [
            { label: 'Competence Level', value: 0.99, weight: 0.35, description: 'E10 Executive Competency Matrix' },
            { label: 'Growth Score', value: 0.80, weight: 0.25, description: 'New market expansion skills.' },
            { label: 'Learning Activity', value: 0.90, weight: 0.25, description: 'Completed MBA Executive module.' },
            { label: 'Buddy Program', value: 1.0, weight: 0.15, description: 'Mentoring 3 Department Heads.' }
          ]
        },
        softSkills: {
          code: 'E3',
          title: 'Collaboration & Culture',
          score: 9.8,
          formula: '1 + 9 * clamp(0.4·FEEDBACK + 0.25·KUDOS + 0.2·COMMUNITY + 0.15·MENTORING)',
          components: [
            { label: '360 Feedback', value: 0.98, weight: 0.4, description: 'Exceptionally positive peer reviews.' },
            { label: 'Kudos Received', value: 0.95, weight: 0.25, description: 'Top receiver in "Visionary" category.' },
            { label: 'Community Events', value: 0.90, weight: 0.2, description: 'Speaker at Town Hall.' },
            { label: 'Mentoring Activity', value: 1.0, weight: 0.15, description: 'Coaching C-level peers.' }
          ]
        },
        sustainability: {
          code: 'E4',
          title: 'Sustainability & Well-being',
          score: 7.5,
          formula: '1 + 9 * clamp(0.3·MEETING + 0.3·(1−OVERTIME) + 0.2·VACATION + 0.2·SELF_STATE)',
          components: [
            { label: 'Meeting Load', value: 0.40, weight: 0.3, description: 'High meeting density (Risk).' },
            { label: 'Overtime Indicator', value: 0.60, weight: 0.3, description: 'Frequent late hours.' },
            { label: 'Vacation Freshness', value: 0.90, weight: 0.2, description: 'Returned from leave 1 month ago.' },
            { label: 'Pulse Self-State', value: 0.85, weight: 0.2, description: 'Self-reported high energy.' }
          ]
        }
      },
      sources: ['Board Review', 'Financial Reports', '360 Feedback'],
      summary: 'Exceptional strategic vision and execution. consistently exceeding OKR targets for the entire ecosystem.',
      recommendations: [
        'Focus on expanding international partnerships',
        'Mentor L-1 executives on crisis management'
      ]
    }
  },
  { 
    id: 2, 
    name: 'Oleg Sidorenkov', 
    role: 'CTO', 
    dept: 'Engineering', 
    grade: 'E9', 
    score: 9.8, 
    potential: 'High', 
    status: 'Top Performer', 
    avatar: 'https://i.pravatar.cc/150?u=oleg',
    details: {
      metrics: { 
        delivery: {
          code: 'E1',
          title: 'Contribution & Impact',
          score: 9.8,
          formula: '1 + 9 * clamp(...)',
          components: [
            { label: 'Task Completion', value: 0.95, weight: 0.4, description: 'High velocity on architecture tasks.' },
            { label: 'Incident Contribution', value: 1.0, weight: 0.25, description: 'Solved 2 P0 incidents.' },
            { label: 'Release Contribution', value: 0.9, weight: 0.2, description: 'Core platform migration.' },
            { label: 'Cross-Team Help', value: 0.8, weight: 0.15, description: 'Consulted Security team.' }
          ]
        },
        hardSkills: {
          code: 'E2',
          title: 'Skills & Growth',
          score: 9.9,
          formula: '1 + 9 * clamp(...)',
          components: [
            { label: 'Competence Level', value: 1.0, weight: 0.35, description: 'Technical Mastery.' },
            { label: 'Growth Score', value: 0.9, weight: 0.25, description: 'Learned Rust for new microkernel.' },
            { label: 'Learning Activity', value: 0.85, weight: 0.25, description: 'Internal tech talks.' },
            { label: 'Buddy Program', value: 0.7, weight: 0.15, description: 'Occasional shadowing.' }
          ]
        },
        softSkills: {
          code: 'E3',
          title: 'Collaboration & Culture',
          score: 8.5,
          formula: '1 + 9 * clamp(...)',
          components: [
            { label: '360 Feedback', value: 0.8, weight: 0.4, description: 'Direct communicator, sometimes blunt.' },
            { label: 'Kudos Received', value: 0.9, weight: 0.25, description: 'Technical excellence awards.' },
            { label: 'Community Events', value: 0.7, weight: 0.2, description: 'Attends but rarely presents.' },
            { label: 'Mentoring Activity', value: 0.9, weight: 0.15, description: 'Mentoring Principal Engineers.' }
          ]
        },
        sustainability: {
          code: 'E4',
          title: 'Sustainability & Well-being',
          score: 6.2,
          formula: '1 + 9 * clamp(...)',
          components: [
            { label: 'Meeting Load', value: 0.3, weight: 0.3, description: 'Overloaded with syncs.' },
            { label: 'Overtime Indicator', value: 0.4, weight: 0.3, description: 'Weekend commits detected.' },
            { label: 'Vacation Freshness', value: 0.2, weight: 0.2, description: 'No vacation > 6 months.' },
            { label: 'Pulse Self-State', value: 0.8, weight: 0.2, description: 'Driven but tired.' }
          ]
        }
      },
      sources: ['GitHub', 'Jira Velocity', 'Tech Radar'],
      summary: 'Technically flawless, driving the architecture forward. Could delegate more operational meetings.',
      recommendations: [
        'Delegate architecture review for non-critical services',
        'Increase visibility in external tech conferences'
      ]
    }
  },
  { 
    id: 3, 
    name: 'Igor Malysh', 
    role: 'Chief DevEx', 
    dept: 'Platform', 
    grade: 'E8', 
    score: 9.5, 
    potential: 'High', 
    status: 'Rising Star', 
    avatar: 'https://i.pravatar.cc/150?u=igor',
    details: {
      metrics: { 
        delivery: {
          code: 'E1',
          title: 'Contribution & Impact',
          score: 9.5,
          formula: '1 + 9 * clamp(...)',
          components: [
            { label: 'Task Completion', value: 0.95, weight: 0.4, description: 'DevEx roadmap on track.' },
            { label: 'Incident Contribution', value: 0.8, weight: 0.25, description: 'Stable platform metrics.' },
            { label: 'Release Contribution', value: 0.9, weight: 0.2, description: 'Released CLI v2.' },
            { label: 'Cross-Team Help', value: 1.0, weight: 0.15, description: 'Top Prideboard contributor.' }
          ]
        },
        hardSkills: {
          code: 'E2',
          title: 'Skills & Growth',
          score: 9.2,
          formula: '1 + 9 * clamp(...)',
          components: [
            { label: 'Competence Level', value: 0.9, weight: 0.35, description: 'Strong DevOps skill set.' },
            { label: 'Growth Score', value: 0.95, weight: 0.25, description: 'Rapidly adopting AI tools.' },
            { label: 'Learning Activity', value: 0.9, weight: 0.25, description: 'Certifications.' },
            { label: 'Buddy Program', value: 0.85, weight: 0.15, description: 'Onboarding lead.' }
          ]
        },
        softSkills: {
          code: 'E3',
          title: 'Collaboration & Culture',
          score: 9.0,
          formula: '1 + 9 * clamp(...)',
          components: [
            { label: '360 Feedback', value: 0.9, weight: 0.4, description: 'Highly appreciated by devs.' },
            { label: 'Kudos Received', value: 0.95, weight: 0.25, description: '"Developer Happiness" champion.' },
            { label: 'Community Events', value: 0.8, weight: 0.2, description: 'Hackathon organizer.' },
            { label: 'Mentoring Activity', value: 0.8, weight: 0.15, description: 'Mentoring Junior DevOps.' }
          ]
        },
        sustainability: {
          code: 'E4',
          title: 'Sustainability & Well-being',
          score: 8.8,
          formula: '1 + 9 * clamp(...)',
          components: [
            { label: 'Meeting Load', value: 0.8, weight: 0.3, description: 'Balanced calendar.' },
            { label: 'Overtime Indicator', value: 0.9, weight: 0.3, description: 'Healthy work-life balance.' },
            { label: 'Vacation Freshness', value: 0.8, weight: 0.2, description: 'Recent mini-break.' },
            { label: 'Pulse Self-State', value: 0.9, weight: 0.2, description: 'Highly motivated.' }
          ]
        }
      },
      sources: ['Platform Usage Metrics', 'Team eNPS', 'Gitlab'],
      summary: 'Significantly improved developer satisfaction metrics. CI/CD pipeline efficiency up by 40%.',
      recommendations: [
        'Scale the internal developer advocacy program',
        'Document the new platform standards for onboarding'
      ]
    }
  },
  { 
    id: 5, 
    name: 'Artem Zhulin', 
    role: 'Head of WB', 
    dept: 'Product', 
    grade: 'E8', 
    score: 8.8, 
    potential: 'Medium', 
    status: 'Rising Star', 
    avatar: 'https://i.pravatar.cc/150?u=artem',
    details: {
      metrics: { 
        delivery: {
          code: 'E1',
          title: 'Contribution & Impact',
          score: 8.2,
          formula: '1 + 9 * clamp(...)',
          components: [
            { label: 'Task Completion', value: 0.7, weight: 0.4, description: 'Missed Q3 deadlines.' },
            { label: 'Incident Contribution', value: 0.9, weight: 0.25, description: 'Good crisis handling.' },
            { label: 'Release Contribution', value: 0.8, weight: 0.2, description: 'WB feature launch.' },
            { label: 'Cross-Team Help', value: 0.7, weight: 0.15, description: 'Focused on own silo.' }
          ]
        },
        hardSkills: {
          code: 'E2',
          title: 'Skills & Growth',
          score: 8.0,
          formula: '1 + 9 * clamp(...)',
          components: [
            { label: 'Competence Level', value: 0.85, weight: 0.35, description: 'Good product sense.' },
            { label: 'Growth Score', value: 0.7, weight: 0.25, description: 'Needs analytics upskilling.' },
            { label: 'Learning Activity', value: 0.6, weight: 0.25, description: 'Skipped last workshop.' },
            { label: 'Buddy Program', value: 0.8, weight: 0.15, description: 'Good peer support.' }
          ]
        },
        softSkills: {
          code: 'E3',
          title: 'Collaboration & Culture',
          score: 8.5,
          formula: '1 + 9 * clamp(...)',
          components: [
            { label: '360 Feedback', value: 0.85, weight: 0.4, description: 'Collaborative but disorganized.' },
            { label: 'Kudos Received', value: 0.8, weight: 0.25, description: 'Team player.' },
            { label: 'Community Events', value: 0.9, weight: 0.2, description: 'Active networker.' },
            { label: 'Mentoring Activity', value: 0.7, weight: 0.15, description: 'Ad-hoc mentoring.' }
          ]
        },
        sustainability: {
          code: 'E4',
          title: 'Sustainability & Well-being',
          score: 5.5,
          formula: '1 + 9 * clamp(...)',
          components: [
            { label: 'Meeting Load', value: 0.2, weight: 0.3, description: 'Meeting overload.' },
            { label: 'Overtime Indicator', value: 0.5, weight: 0.3, description: 'Late nights common.' },
            { label: 'Vacation Freshness', value: 0.4, weight: 0.2, description: 'Needs a break.' },
            { label: 'Pulse Self-State', value: 0.6, weight: 0.2, description: 'Stress levels rising.' }
          ]
        }
      },
      sources: ['Product Analytics', 'Jira', 'Stakeholder Feedback'],
      summary: 'Great product sense, but delivery consistency has fluctuated due to scope creep.',
      recommendations: [
        'Improve estimation accuracy for Q4 roadmap',
        'Take "Advanced Product Analytics" course',
        'Focus on reducing technical debt in the backlog'
      ]
    }
  },
];

const EmployeeView: React.FC = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [activeModal, setActiveModal] = useState<'add' | 'git' | 'training' | 'actions' | 'metric_detail' | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<any>(null);
  const [selectedMetric, setSelectedMetric] = useState<PerformanceMetric | null>(null);
  const [expandedEmployeeId, setExpandedEmployeeId] = useState<number | null>(null);
  
  // Training Selection State
  const [trainingSelection, setTrainingSelection] = useState<{ selectedEmpIds: number[], course: string | null }>({
    selectedEmpIds: [],
    course: null
  });

  const handleAddEmployee = (e: React.FormEvent) => {
    e.preventDefault();
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
    alert(`Assigned "${trainingSelection.course}" to ${trainingSelection.selectedEmpIds.length} employees.`);
    setActiveModal(null);
    setTrainingSelection({ selectedEmpIds: [], course: null });
  };

  const toggleExpand = (id: number) => {
    setExpandedEmployeeId(expandedEmployeeId === id ? null : id);
  };

  const openMetricDetail = (metric: PerformanceMetric) => {
    setSelectedMetric(metric);
    setActiveModal('metric_detail');
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
                <React.Fragment key={emp.id}>
                  <tr 
                    onClick={() => toggleExpand(emp.id)}
                    className={`cursor-pointer transition-colors group relative ${expandedEmployeeId === emp.id ? 'bg-gray-50 dark:bg-slate-700/50' : 'hover:bg-red-50/20 dark:hover:bg-red-900/10'}`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                           <img src={emp.avatar} alt={emp.name} className="w-10 h-10 rounded-full object-cover border border-gray-100 dark:border-slate-600" />
                           {expandedEmployeeId === emp.id ? (
                             <ChevronUp size={14} className="absolute -bottom-1 -right-1 bg-white dark:bg-slate-800 rounded-full text-gray-500" />
                           ) : (
                             <ChevronDown size={14} className="absolute -bottom-1 -right-1 bg-white dark:bg-slate-800 rounded-full text-gray-500" />
                           )}
                        </div>
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
                        onClick={(e) => { e.stopPropagation(); setSelectedEmployee(emp); setActiveModal('actions'); }}
                        className="text-gray-400 hover:text-[#E30611] transition-colors"
                      >
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                  
                  {/* EXPANDED DETAILS SECTION */}
                  {expandedEmployeeId === emp.id && (
                    <tr className="bg-gray-50/50 dark:bg-slate-800/50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <td colSpan={6} className="p-0">
                        <div className="p-6 border-b border-gray-100 dark:border-slate-700 grid grid-cols-1 lg:grid-cols-3 gap-8">
                          
                          {/* COL 1: Interactive Metrics */}
                          <div className="space-y-6">
                             <div>
                               <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                 <Target size={14} /> Performance Metrics (Click for Details)
                               </h4>
                               <div className="space-y-4">
                                 {/* Delivery (E1) */}
                                 <div className="group/metric cursor-pointer" onClick={() => openMetricDetail(emp.details.metrics.delivery)}>
                                    <div className="flex justify-between text-xs mb-1 group-hover/metric:text-[#E30611] transition-colors">
                                       <span className="font-bold flex items-center gap-2">
                                          <Zap size={12} /> Delivery (E1)
                                       </span>
                                       <span className="font-bold">{emp.details.metrics.delivery.score}</span>
                                    </div>
                                    <div className="h-2 w-full bg-gray-200 dark:bg-slate-600 rounded-full overflow-hidden">
                                       <div className="h-full bg-[#E30611] rounded-full relative" style={{ width: `${emp.details.metrics.delivery.score * 10}%` }}></div>
                                    </div>
                                 </div>

                                 {/* Hard Skills (E2) */}
                                 <div className="group/metric cursor-pointer" onClick={() => openMetricDetail(emp.details.metrics.hardSkills)}>
                                    <div className="flex justify-between text-xs mb-1 group-hover/metric:text-blue-500 transition-colors">
                                       <span className="font-bold flex items-center gap-2">
                                          <BookOpen size={12} /> Hard Skills (E2)
                                       </span>
                                       <span className="font-bold">{emp.details.metrics.hardSkills.score}</span>
                                    </div>
                                    <div className="h-2 w-full bg-gray-200 dark:bg-slate-600 rounded-full overflow-hidden">
                                       <div className="h-full bg-blue-500 rounded-full" style={{ width: `${emp.details.metrics.hardSkills.score * 10}%` }}></div>
                                    </div>
                                 </div>

                                 {/* Soft Skills (E3) */}
                                 <div className="group/metric cursor-pointer" onClick={() => openMetricDetail(emp.details.metrics.softSkills)}>
                                    <div className="flex justify-between text-xs mb-1 group-hover/metric:text-green-500 transition-colors">
                                       <span className="font-bold flex items-center gap-2">
                                          <Users size={12} /> Soft Skills (E3)
                                       </span>
                                       <span className="font-bold">{emp.details.metrics.softSkills.score}</span>
                                    </div>
                                    <div className="h-2 w-full bg-gray-200 dark:bg-slate-600 rounded-full overflow-hidden">
                                       <div className="h-full bg-green-500 rounded-full" style={{ width: `${emp.details.metrics.softSkills.score * 10}%` }}></div>
                                    </div>
                                 </div>

                                 {/* Sustainability (E4) */}
                                 <div className="group/metric cursor-pointer" onClick={() => openMetricDetail(emp.details.metrics.sustainability)}>
                                    <div className="flex justify-between text-xs mb-1 group-hover/metric:text-orange-500 transition-colors">
                                       <span className="font-bold flex items-center gap-2">
                                          <Battery size={12} /> Well-being (E4)
                                       </span>
                                       <span className="font-bold">{emp.details.metrics.sustainability.score}</span>
                                    </div>
                                    <div className="h-2 w-full bg-gray-200 dark:bg-slate-600 rounded-full overflow-hidden">
                                       <div 
                                         className={`h-full rounded-full transition-all ${emp.details.metrics.sustainability.score < 6 ? 'bg-red-500' : 'bg-orange-500'}`} 
                                         style={{ width: `${emp.details.metrics.sustainability.score * 10}%` }}
                                       ></div>
                                    </div>
                                 </div>
                               </div>
                             </div>
                             
                             <div>
                               <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                 <Database size={14} /> Data Sources
                               </h4>
                               <div className="flex flex-wrap gap-2">
                                 {emp.details.sources.map(src => (
                                   <span key={src} className="px-2 py-1 bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-md text-[10px] font-bold text-slate-600 dark:text-gray-300">
                                     {src}
                                   </span>
                                 ))}
                               </div>
                             </div>
                          </div>

                          {/* COL 2: Summary */}
                          <div className="lg:col-span-2 flex flex-col justify-between">
                             <div className="mb-6">
                               <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                 <BrainCircuit size={14} /> AI Performance Summary
                               </h4>
                               <p className="text-sm leading-relaxed text-slate-700 dark:text-gray-300 bg-white dark:bg-slate-700/30 p-4 rounded-xl border border-gray-100 dark:border-slate-700">
                                 {emp.details.summary}
                               </p>
                             </div>

                             <div>
                               <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                 <Lightbulb size={14} /> Recommended Improvements
                               </h4>
                               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                 {emp.details.recommendations.map((rec, i) => (
                                   <div key={i} className="flex items-start gap-3 p-3 bg-red-50 dark:bg-red-900/10 rounded-lg border border-red-100 dark:border-red-900/30">
                                     <TrendingUp size={16} className="text-[#E30611] shrink-0 mt-0.5" />
                                     <span className="text-sm font-medium text-slate-800 dark:text-gray-200 leading-tight">{rec}</span>
                                   </div>
                                 ))}
                               </div>
                             </div>

                             <div className="mt-6 flex justify-end">
                               <button 
                                 onClick={() => { setTrainingSelection({ selectedEmpIds: [emp.id], course: null }); setActiveModal('training'); }}
                                 className="text-sm font-bold text-[#E30611] hover:underline flex items-center gap-2"
                               >
                                 Assign Development Plan <ArrowUpRight size={14} />
                               </button>
                             </div>
                          </div>

                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Click outside to close actions menu */}
      {activeModal === 'actions' && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setActiveModal(null)}></div>
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-700 shadow-xl rounded-xl z-50 overflow-hidden flex flex-col w-48">
             <button onClick={() => setActiveModal(null)} className="text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-700 text-sm text-slate-700 dark:text-gray-200">View Profile</button>
             <button onClick={() => { setActiveModal(null); alert('Review requested'); }} className="text-left px-4 py-3 hover:bg-gray-50 dark:hover:bg-slate-700 text-sm text-slate-700 dark:text-gray-200">Request Review</button>
             <div className="h-px bg-gray-100 dark:bg-slate-700"></div>
             <button onClick={() => setActiveModal(null)} className="text-left px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 text-sm text-[#E30611]">Archive</button>
          </div>
        </>
      )}

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

      {/* METRIC DETAIL MODAL (NEW) */}
      {activeModal === 'metric_detail' && selectedMetric && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setActiveModal(null)}>
           <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
             <div className="bg-slate-50 dark:bg-slate-900/50 p-6 border-b border-gray-100 dark:border-slate-700">
               <div className="flex justify-between items-start mb-2">
                 <div>
                   <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{selectedMetric.code} Metric</span>
                   <h3 className="text-2xl font-bold text-slate-800 dark:text-white">{selectedMetric.title}</h3>
                 </div>
                 <div className="flex items-center gap-2 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-gray-100 dark:border-slate-700 shadow-sm">
                    <span className="text-2xl font-bold text-[#E30611]">{selectedMetric.score}</span>
                    <span className="text-xs text-gray-400 font-medium">/ 10</span>
                 </div>
               </div>
               <div className="text-xs font-mono text-slate-500 dark:text-gray-400 bg-gray-100 dark:bg-slate-900 p-2 rounded border border-gray-200 dark:border-slate-700">
                 Formula: {selectedMetric.formula}
               </div>
             </div>
             
             <div className="p-6">
                <h4 className="text-sm font-bold text-slate-800 dark:text-white mb-4">Breakdown & Factors</h4>
                <div className="space-y-6">
                   {selectedMetric.components.map((comp, idx) => (
                     <div key={idx}>
                       <div className="flex justify-between items-end mb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-slate-700 dark:text-gray-200">{comp.label}</span>
                            <span className="text-[10px] bg-gray-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-gray-500">
                              Weight: {comp.weight}
                            </span>
                          </div>
                          <span className="text-sm font-bold text-slate-900 dark:text-white">{(comp.value * 100).toFixed(0)}%</span>
                       </div>
                       
                       <div className="h-2 w-full bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden mb-1">
                          <div 
                            className={`h-full rounded-full ${comp.value >= 0.8 ? 'bg-green-500' : comp.value >= 0.5 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                            style={{ width: `${comp.value * 100}%` }}
                          ></div>
                       </div>
                       <p className="text-xs text-gray-400">{comp.description}</p>
                     </div>
                   ))}
                </div>
             </div>
             
             <div className="p-4 border-t border-gray-100 dark:border-slate-700 flex justify-end">
               <button onClick={() => setActiveModal(null)} className="px-6 py-2 bg-gray-100 dark:bg-slate-700 text-slate-700 dark:text-white font-bold rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors">
                 Close Details
               </button>
             </div>
           </div>
        </div>
      )}

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
