
import React, { useState, useEffect } from 'react';
import { 
  Compass, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Target, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  RotateCcw, 
  ArrowRight,
  User,
  BrainCircuit,
  Lock,
  Download
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- Types ---
interface SkillDelta {
  skill: string;
  current: number; // 0-10
  projected: number; // 0-10
  delta: number;
}

interface ActionStep {
  title: string;
  timeEst: string;
  owner: string; // e.g., 'Self', 'Mentor', 'Manager'
}

interface Scenario {
  type: 'Conservative' | 'Likely' | 'Ambitious';
  title: string;
  riskLevel: number; // 0-100
  actions: ActionStep[];
  skills: SkillDelta[];
  confidence: number;
  rationale: string;
  impact: string;
  risks: string[];
}

interface SimulationResult {
  scenarios: Scenario[];
}

// --- MOCK DATA ---
const DEMO_PROFILE = {
  role: 'Middle Frontend Developer',
  history: 'Active in product features (6 major/yr), few architectural tasks, completed React Advanced course.',
  skills: {
    'System Design': 4,
    'Leadership': 3,
    'Code Quality': 8,
    'Communication': 6
  }
};

const MOCK_SCENARIOS: Scenario[] = [
  {
    type: 'Conservative',
    title: 'Solid Senior Engineer',
    riskLevel: 20,
    confidence: 0.92,
    rationale: "Based on your high code quality output, this path focuses on deepening technical expertise without aggressive leadership scope expansion.",
    impact: "Steady contribution to team velocity.",
    risks: ["Limited visibility outside current team."],
    actions: [
      { title: "Lead 2 Epic Refactorings", timeEst: "3 months", owner: "Self" },
      { title: "Mentor 1 Junior Dev", timeEst: "Ongoing", owner: "Self" },
      { title: "Complete 'System Design' internal cert", timeEst: "1 month", owner: "LMS" },
      { title: "Write 2 Technical Articles", timeEst: "6 months", owner: "Self" }
    ],
    skills: [
      { skill: "System Design", current: 4, projected: 6, delta: 2 },
      { skill: "Code Quality", current: 8, projected: 9, delta: 1 }
    ]
  },
  {
    type: 'Likely',
    title: 'Tech Lead Track',
    riskLevel: 50,
    confidence: 0.78,
    rationale: "Your communication skills show promise. This path pushes for architectural ownership and team coordination.",
    impact: "High impact on cross-team alignment.",
    risks: ["Requires 20% time reduction in coding."],
    actions: [
      { title: "Owner of 'Auth Service' Migration", timeEst: "4 months", owner: "Manager" },
      { title: "Facilitate Weekly Architecture Review", timeEst: "Weekly", owner: "Self" },
      { title: "Shadow Oleg (CTO) for 1 day", timeEst: "1 day", owner: "HR" },
      { title: "Public Speaking Course", timeEst: "2 months", owner: "LMS" }
    ],
    skills: [
      { skill: "System Design", current: 4, projected: 7, delta: 3 },
      { skill: "Leadership", current: 3, projected: 6, delta: 3 }
    ]
  },
  {
    type: 'Ambitious',
    title: 'Principal Engineer Fast-Track',
    riskLevel: 85,
    confidence: 0.45,
    rationale: "Aggressive growth targeting ecosystem-wide impact. Requires high visibility and solving novel problems.",
    impact: "Transformational impact on platform scalability.",
    risks: ["High burnout risk", "Requires Executive Sponsorship"],
    actions: [
      { title: "Propose & Lead New Micro-Frontend Arch", timeEst: "6-9 months", owner: "Self" },
      { title: "Speak at HighLoad++ Conference", timeEst: "Q4", owner: "DevRel" },
      { title: "Lead Cross-Department Guild", timeEst: "Ongoing", owner: "Self" },
      { title: "Solve P0 Incident in unfamiliar domain", timeEst: "Ad-hoc", owner: "Self" }
    ],
    skills: [
      { skill: "System Design", current: 4, projected: 9, delta: 5 },
      { skill: "Leadership", current: 3, projected: 8, delta: 5 }
    ]
  }
];

const CareerSimulatorView: React.FC = () => {
  const [step, setStep] = useState<'input' | 'processing' | 'results'>('input');
  const [loadingStep, setLoadingStep] = useState(0);
  
  // Input State
  const [goal, setGoal] = useState('Senior Frontend Developer');
  const [horizon, setHorizon] = useState('6 months');
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [hasConsent, setHasConsent] = useState(false);

  // Result State
  const [result, setResult] = useState<SimulationResult | null>(null);

  const handleSimulate = async () => {
    if (!hasConsent) {
      alert("Please provide consent to process profile data.");
      return;
    }

    setStep('processing');
    setLoadingStep(0);

    // Animation Ticks
    const t1 = setTimeout(() => setLoadingStep(1), 800);
    const t2 = setTimeout(() => setLoadingStep(2), 1600);
    const t3 = setTimeout(() => setLoadingStep(3), 2400);

    try {
      if (process.env.API_KEY && !isDemoMode) {
        // REAL API CALL
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const systemInstruction = `
          Act as a Corporate Career Architect. 
          Generate 3 career path scenarios (Conservative, Likely, Ambitious) based on the user's goal.
          Output JSON only.
          Schema: { scenarios: [ { type, title, riskLevel (0-100), confidence (0-1), rationale, impact, risks:[], actions: [{title, timeEst, owner}], skills: [{skill, current, projected, delta}] } ] }
        `;
        
        const prompt = `
          Current Role: Middle Frontend Developer.
          Goal: ${goal}.
          Horizon: ${horizon}.
          Context: High performance in feature delivery, average in system design.
        `;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            systemInstruction: systemInstruction,
            responseMimeType: "application/json"
          }
        });

        const text = response.text;
        if (text) {
          setResult(JSON.parse(text));
        } else {
          throw new Error("Empty response");
        }
      } else {
        // DEMO MODE MOCK
        await new Promise(r => setTimeout(r, 3000));
        setResult({ scenarios: MOCK_SCENARIOS });
      }

      setTimeout(() => {
        setStep('results');
      }, 3000);

    } catch (e) {
      console.error(e);
      alert("Simulation failed. Falling back to demo data.");
      setResult({ scenarios: MOCK_SCENARIOS });
      setStep('results');
    }

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  };

  const renderProcessing = () => (
    <div className="h-full flex flex-col items-center justify-center bg-[#F3F6FD] dark:bg-slate-900 p-8">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-slate-700 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E30611] to-transparent animate-[shimmer_2s_infinite]"></div>
        
        <div className="w-24 h-24 mx-auto mb-8 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center relative">
          <Compass className={`text-slate-300 dark:text-slate-600 transition-colors duration-500 ${loadingStep >= 3 ? 'text-[#E30611]' : ''}`} size={48} />
          <div className="absolute inset-0 border-4 border-slate-100 dark:border-slate-800 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-[#E30611] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Building Trajectory</h2>
        
        <div className="space-y-4 text-left max-w-xs mx-auto">
          <div className={`flex items-center gap-3 transition-opacity duration-500 ${loadingStep >= 1 ? 'opacity-100' : 'opacity-30'}`}>
              <User size={20} className="text-blue-500" />
              <span className="font-medium text-slate-700 dark:text-gray-300">Analyzing Profile & History...</span>
          </div>
          <div className={`flex items-center gap-3 transition-opacity duration-500 ${loadingStep >= 2 ? 'opacity-100' : 'opacity-30'}`}>
              <BrainCircuit size={20} className="text-purple-500" />
              <span className="font-medium text-slate-700 dark:text-gray-300">Calculating Skill Deltas...</span>
          </div>
          <div className={`flex items-center gap-3 transition-opacity duration-500 ${loadingStep >= 3 ? 'opacity-100' : 'opacity-30'}`}>
              <Target size={20} className="text-[#E30611]" />
              <span className="font-medium text-slate-700 dark:text-gray-300">Projecting Scenarios...</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInput = () => (
    <div className="h-full overflow-y-auto p-8 custom-scrollbar bg-[#F3F6FD] dark:bg-slate-900 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2 flex items-center justify-center gap-3">
             <Compass className="text-[#E30611]" size={32} /> Career Simulator
          </h1>
          <p className="text-gray-500 dark:text-gray-400">Model your growth path for the next 6-12 months.</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-slate-700 relative">
           
           {isDemoMode && (
             <div className="absolute top-4 right-4 bg-red-100 dark:bg-red-900/30 text-[#E30611] px-3 py-1 rounded-full text-xs font-bold">
               DEMO MODE
             </div>
           )}

           <div className="space-y-6">
              
              {/* Goal Input */}
              <div>
                 <label className="block text-sm font-bold text-slate-700 dark:text-gray-200 mb-2">Target Goal</label>
                 {isDemoMode ? (
                   <div className="p-4 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-slate-500 dark:text-gray-400 italic flex justify-between items-center">
                      <span>Senior Frontend Developer</span>
                      <span className="text-xs not-italic font-bold bg-gray-200 dark:bg-slate-700 px-2 py-1 rounded">Auto-filled</span>
                   </div>
                 ) : (
                   <input 
                     type="text" 
                     className="w-full p-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:border-[#E30611]"
                     placeholder="e.g. Senior Backend Developer, Tech Lead"
                     value={goal}
                     onChange={(e) => setGoal(e.target.value)}
                   />
                 )}
              </div>

              {/* Horizon */}
              <div>
                 <label className="block text-sm font-bold text-slate-700 dark:text-gray-200 mb-2">Time Horizon</label>
                 <div className="grid grid-cols-3 gap-4">
                    {['6 months', '9 months', '12 months'].map(h => (
                      <button 
                        key={h}
                        onClick={() => setHorizon(h)}
                        className={`py-3 rounded-xl border font-bold text-sm transition-all
                          ${horizon === h 
                            ? 'bg-[#E30611] text-white border-[#E30611]' 
                            : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-gray-400 border-gray-200 dark:border-slate-700 hover:border-red-200'}`}
                      >
                        {h}
                      </button>
                    ))}
                 </div>
              </div>

              {/* Data Source Toggle */}
              <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30">
                 <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-slate-800 dark:text-white text-sm">Data Source</span>
                    <label className="flex items-center gap-2 cursor-pointer">
                       <span className={`text-xs font-bold ${isDemoMode ? 'text-[#E30611]' : 'text-gray-400'}`}>Demo Profile</span>
                       <div className={`w-10 h-6 rounded-full relative transition-colors ${isDemoMode ? 'bg-[#E30611]' : 'bg-gray-300 dark:bg-slate-600'}`}>
                          <input type="checkbox" className="hidden" checked={isDemoMode} onChange={() => setIsDemoMode(!isDemoMode)} />
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${isDemoMode ? 'left-5' : 'left-1'}`}></div>
                       </div>
                    </label>
                 </div>
                 <p className="text-xs text-slate-600 dark:text-gray-400">
                   {isDemoMode 
                     ? "Using synthetic data: Middle Frontend Developer (active history, 4/10 System Design)." 
                     : "Will pull real data from your User Profile, LMS history, and Jira tickets."}
                 </p>
              </div>

              {/* Consent */}
              <label className="flex items-start gap-3 cursor-pointer group">
                 <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-colors
                   ${hasConsent ? 'bg-green-500 border-green-500 text-white' : 'bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600 group-hover:border-green-400'}`}>
                   {hasConsent && <CheckCircle2 size={14} />}
                 </div>
                 <input type="checkbox" className="hidden" checked={hasConsent} onChange={() => setHasConsent(!hasConsent)} />
                 <span className="text-xs text-gray-500 dark:text-gray-400">
                   I agree to use my profile data and task history for this simulation. 
                   I understand these are probabilistic projections, not guarantees of promotion.
                 </span>
              </label>

           </div>

           <button 
             onClick={handleSimulate}
             disabled={!hasConsent}
             className={`w-full mt-8 py-4 font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all
               ${hasConsent 
                 ? 'bg-[#E30611] text-white hover:bg-red-700 hover:scale-[1.01]' 
                 : 'bg-gray-200 dark:bg-slate-700 text-gray-400 cursor-not-allowed'}`}
           >
              <Sparkles size={20} /> Simulate Trajectory
           </button>

        </div>
      </div>
    </div>
  );

  const renderResults = () => {
    if (!result) return null;

    return (
      <div className="h-full overflow-y-auto p-8 custom-scrollbar bg-[#F3F6FD] dark:bg-slate-900">
        <div className="flex justify-between items-center mb-8">
           <div>
              <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                 <Target className="text-[#E30611]" /> Simulation Results
              </h1>
              <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                 <span className="bg-gray-200 dark:bg-slate-700 px-2 py-0.5 rounded font-bold">{horizon}</span>
                 <span>Target: <b className="text-slate-800 dark:text-white">{goal}</b></span>
                 {isDemoMode && <span className="text-[#E30611] font-bold">DEMO DATA</span>}
              </div>
           </div>
           <button onClick={() => setStep('input')} className="flex items-center gap-2 text-gray-400 hover:text-[#E30611] text-sm font-bold">
              <RotateCcw size={16} /> New Simulation
           </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
           {result.scenarios.map((scenario, idx) => (
             <div key={idx} className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm flex flex-col overflow-hidden relative group hover:border-red-200 dark:hover:border-red-900/50 transition-colors">
                
                {/* Header */}
                <div className={`p-4 border-b border-gray-100 dark:border-slate-700 relative
                   ${scenario.type === 'Conservative' ? 'bg-blue-50 dark:bg-blue-900/10' : 
                     scenario.type === 'Likely' ? 'bg-green-50 dark:bg-green-900/10' : 'bg-purple-50 dark:bg-purple-900/10'}`}>
                   <div className="flex justify-between items-start mb-2">
                      <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded
                         ${scenario.type === 'Conservative' ? 'text-blue-700 bg-blue-100' : 
                           scenario.type === 'Likely' ? 'text-green-700 bg-green-100' : 'text-purple-700 bg-purple-100'}`}>
                        {scenario.type}
                      </span>
                      {scenario.confidence < 0.6 && (
                        <div className="flex items-center gap-1 text-yellow-600 bg-yellow-100 px-2 py-1 rounded text-[10px] font-bold" title="Low data confidence">
                           <AlertTriangle size={10} /> Review Req.
                        </div>
                      )}
                   </div>
                   <h3 className="font-bold text-lg text-slate-800 dark:text-white leading-tight">{scenario.title}</h3>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                   {/* Risk Slider */}
                   <div className="mb-6">
                      <div className="flex justify-between text-xs font-bold text-gray-400 mb-1">
                         <span>Risk</span>
                         <span>{scenario.riskLevel}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                         <div className={`h-full rounded-full ${scenario.riskLevel > 60 ? 'bg-red-500' : scenario.riskLevel > 30 ? 'bg-yellow-500' : 'bg-blue-500'}`} style={{ width: `${scenario.riskLevel}%` }}></div>
                      </div>
                   </div>

                   {/* Rationale */}
                   <div className="mb-6">
                      <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Why this path?</h4>
                      <p className="text-sm text-slate-600 dark:text-gray-300 leading-relaxed italic">
                        "{scenario.rationale}"
                      </p>
                   </div>

                   {/* Actions */}
                   <div className="mb-6">
                      <h4 className="text-xs font-bold text-gray-400 uppercase mb-3">Key Actions</h4>
                      <ul className="space-y-3">
                         {scenario.actions.slice(0, 4).map((action, i) => (
                           <li key={i} className="flex items-start gap-2 text-sm">
                              <div className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-[#E30611]"></div>
                              <div>
                                 <div className="font-medium text-slate-800 dark:text-white">{action.title}</div>
                                 <div className="text-xs text-gray-500 flex items-center gap-2">
                                    <span className="flex items-center gap-1"><Clock size={10}/> {action.timeEst}</span>
                                    <span>•</span>
                                    <span>Owner: {action.owner}</span>
                                 </div>
                              </div>
                           </li>
                         ))}
                      </ul>
                   </div>

                   {/* Skills Delta */}
                   <div className="mb-6 bg-gray-50 dark:bg-slate-900/50 rounded-xl p-3">
                      <table className="w-full text-sm">
                         <thead>
                            <tr className="text-left text-xs text-gray-400 uppercase">
                               <th className="pb-2 font-bold">Skill</th>
                               <th className="pb-2 font-bold text-right">Delta</th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                            {scenario.skills.map((s, i) => (
                              <tr key={i}>
                                 <td className="py-2 text-slate-700 dark:text-gray-300 font-medium">{s.skill}</td>
                                 <td className="py-2 text-right font-bold text-green-600">
                                    +{s.delta}
                                 </td>
                              </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                   
                   {/* Footer Actions */}
                   <div className="mt-auto pt-4 border-t border-gray-100 dark:border-slate-700 flex flex-col gap-2">
                      <button 
                        onClick={() => alert(`Accepted ${scenario.type} plan. Manager notified.`)}
                        className="w-full py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-lg hover:opacity-90 text-sm"
                      >
                         Accept Plan
                      </button>
                      <button className="w-full py-2 border border-gray-200 dark:border-slate-600 text-slate-600 dark:text-gray-300 font-bold rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 text-sm">
                         Request Review
                      </button>
                   </div>
                </div>
             </div>
           ))}
        </div>
        
        <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-100 dark:border-slate-700 flex items-center justify-between">
           <div className="flex items-center gap-3">
              <ShieldCheck className="text-gray-400" size={20} />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                 <b>Disclaimer:</b> These are probabilistic projections based on current data. 
                 They do not guarantee promotion or role change. Always validate with your manager.
              </p>
           </div>
           <button className="flex items-center gap-2 text-xs font-bold text-[#E30611] hover:underline">
              <Download size={14} /> Download Report
           </button>
        </div>
      </div>
    );
  };

  if (step === 'processing') return renderProcessing();
  if (step === 'results') return renderResults();
  return renderInput();
};

export default CareerSimulatorView;
