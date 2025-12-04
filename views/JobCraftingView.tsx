
import React, { useState } from 'react';
import { 
  Hammer, 
  Sparkles, 
  RotateCcw, 
  CheckCircle2, 
  Target, 
  AlertTriangle, 
  Clock, 
  ArrowRight, 
  Download,
  BrainCircuit,
  Lock,
  Briefcase,
  Zap,
  EyeOff,
  User
} from 'lucide-react';
import { GoogleGenAI, Type, Schema } from "@google/genai";

// --- Types ---
interface CraftingProposal {
  title: string;
  description: string;
  rationale: string;
  impact: string;
  timeEst: string;
  risks: string[];
  confidence: number;
  type: 'Project' | 'Mentorship' | 'Role Expansion';
}

const JobCraftingView: React.FC = () => {
  const [step, setStep] = useState<'input' | 'processing' | 'results'>('input');
  const [loadingStep, setLoadingStep] = useState(0);

  // Form State
  const [interests, setInterests] = useState('');
  const [horizon, setHorizon] = useState('1 month');
  const [risk, setRisk] = useState<'Conservative' | 'Likely' | 'Ambitious'>('Likely');
  const [preferences, setPreferences] = useState<string[]>([]);
  const [isDemo, setIsDemo] = useState(true);
  const [hasConsent, setHasConsent] = useState(false);

  // Results
  const [proposals, setProposals] = useState<CraftingProposal[]>([]);

  // Toggle helper
  const togglePreference = (pref: string) => {
    setPreferences(prev => 
      prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]
    );
  };

  const handleDemoToggle = () => {
    const newState = !isDemo;
    setIsDemo(newState);
    if (newState) {
      setInterests('System Design, Leadership, Product Strategy');
      setHorizon('3 months');
      setRisk('Likely');
      setPreferences(['New Roles', 'Experiments']);
    } else {
      setInterests('');
      setPreferences([]);
    }
  };

  const generateProposals = async () => {
    if (!hasConsent) {
      alert("Please provide consent to generate proposals.");
      return;
    }

    setStep('processing');
    setLoadingStep(0);
    
    // Animation Sequence
    const t1 = setTimeout(() => setLoadingStep(1), 1000);
    const t2 = setTimeout(() => setLoadingStep(2), 2000);
    const t3 = setTimeout(() => setLoadingStep(3), 3000);

    try {
      if (process.env.API_KEY && !isDemo) {
        // REAL AI GENERATION
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        const schema: Schema = {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING, description: "Title of the job crafting proposal" },
              description: { type: Type.STRING, description: "Detailed description of the task or role change" },
              rationale: { type: Type.STRING, description: "Why this fits the user's profile and interests" },
              impact: { type: Type.STRING, description: "Expected business or team impact" },
              timeEst: { type: Type.STRING, description: "Time estimation (e.g. '2 hours/week')" },
              risks: { 
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Potential risks of this change"
              },
              confidence: { type: Type.NUMBER, description: "Confidence score between 0 and 1" },
              type: { 
                type: Type.STRING, 
                enum: ['Project', 'Mentorship', 'Role Expansion'],
                description: "Category of the proposal"
              }
            },
            required: ['title', 'description', 'rationale', 'impact', 'timeEst', 'risks', 'confidence', 'type']
          }
        };

        const systemInstruction = `
          You are an expert Organizational Psychologist and Agile Coach.
          Generate exactly 3 job crafting proposals based on the user's input profile.
          
          Proposal 1: Conservative (Low Risk, High Confidence). Small tweaks.
          Proposal 2: Balanced (Medium Risk). Standard crafting like Mentorship or Process improvements.
          Proposal 3: Ambitious (High Risk). Significant Role Expansion or innovative Projects.

          Ensure the 'type' field accurately reflects the nature of the proposal (e.g., use 'Role Expansion' for adding new responsibilities).
          Use modal language (e.g., "may improve", "potential impact") to ensure psychological safety.
        `;

        const prompt = `
          Employee Context: Mid-Level Developer. 
          Current Baseline: High feature velocity, reliable delivery, but low visibility in architecture.
          
          User Inputs:
          - Interests / Growth Areas: ${interests || 'General Professional Growth'}
          - Activity Preferences: ${preferences.length > 0 ? preferences.join(', ') : 'Open to all'}
          - Risk Tolerance: ${risk}
          - Time Horizon: ${horizon}
          
          Based on these inputs, generate 3 distinct Job Crafting proposals. 
          If the user is interested in 'Leadership' or 'System Design', suggest a 'Role Expansion' or 'Project' that builds these skills.
        `;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            systemInstruction: systemInstruction,
            responseMimeType: "application/json",
            responseSchema: schema,
          }
        });

        const text = response.text;
        if (text) {
          setProposals(JSON.parse(text));
        } else {
          throw new Error("No response from AI");
        }
      } else {
        // MOCK / DEMO DATA
        await new Promise(r => setTimeout(r, 3500));
        setProposals([
          {
            title: "Performance Guardian for Auth Service",
            type: "Role Expansion",
            description: "Take ownership of the 'Auth Service' latency metrics. Dedicate 4 hours/week to optimization tasks.",
            rationale: "Aligns with your interest in System Design and leverages your recent bug fixes in this module.",
            impact: "Potential reduction of P99 latency by 15%.",
            timeEst: "4 hours / week",
            risks: ["May reduce velocity on feature tickets slightly."],
            confidence: 0.92
          },
          {
            title: "Shadow Product Manager for Q4 Planning",
            type: "Mentorship",
            description: "Join weekly product roadmap sessions for the 'Billing' squad as a technical advisor.",
            rationale: "Supports your 'Product Strategy' interest. Provides context on business decisions.",
            impact: "Improved technical feasibility of Q4 roadmap items.",
            timeEst: "2 hours / week",
            risks: ["Meeting overload risk if not time-boxed."],
            confidence: 0.75
          },
          {
            title: "Lead 'Micro-Frontend' Proof of Concept",
            type: "Project",
            description: "Allocated 10% innovation time to prototype a migration to Module Federation.",
            rationale: "High-risk, high-reward experiment fitting your 'Ambitious' risk profile.",
            impact: "Could reduce build times by 40% if successful.",
            timeEst: "10% time (Fridays)",
            risks: ["Technically complex; PoC might fail."],
            confidence: 0.55
          }
        ]);
      }
      
      setStep('results');

    } catch (e) {
      console.error(e);
      setStep('input');
      alert("Generation failed. Please try again.");
    }

    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  };

  const renderInput = () => (
    <div className="h-full flex items-center justify-center p-8 bg-[#F3F6FD] dark:bg-slate-900">
      <div className="max-w-3xl w-full bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-700 p-8">
        
        <div className="text-center mb-8">
           <h1 className="text-3xl font-bold text-slate-800 dark:text-white flex items-center justify-center gap-3 mb-2">
             <Hammer className="text-[#E30611]" size={32} /> Job Crafting Engine
           </h1>
           <p className="text-gray-500 dark:text-gray-400">
             Redesign your work life. Generate personalized proposals to align daily tasks with your long-term growth.
           </p>
        </div>

        <div className="space-y-6">
           {/* Section 1: Interests & Context */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                 <label className="block text-sm font-bold text-slate-700 dark:text-gray-200 mb-2">Interests & Growth Areas</label>
                 <input 
                   type="text" 
                   value={interests} 
                   onChange={(e) => setInterests(e.target.value)}
                   placeholder="e.g. System Design, Public Speaking..."
                   className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:border-[#E30611]"
                 />
              </div>
              
              <div>
                 <label className="block text-sm font-bold text-slate-700 dark:text-gray-200 mb-2">Time Horizon</label>
                 <select 
                   value={horizon}
                   onChange={(e) => setHorizon(e.target.value)}
                   className="w-full p-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:border-[#E30611]"
                 >
                   <option>1 month</option>
                   <option>3 months</option>
                   <option>6 months</option>
                 </select>
              </div>
           </div>

           {/* Section 2: Preferences & Risk */}
           <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-gray-200 mb-2">Crafting Preferences</label>
              <div className="flex flex-wrap gap-3">
                 {['New Roles', 'Experiments (10% Time)', 'Mentorship', 'Process Improvement'].map(pref => (
                   <button 
                     key={pref}
                     onClick={() => togglePreference(pref)}
                     className={`px-4 py-2 rounded-lg text-sm font-bold border transition-colors
                       ${preferences.includes(pref) 
                         ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900/50 text-[#E30611]' 
                         : 'bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-700 text-gray-500 hover:border-gray-300'}`}
                   >
                     {pref}
                   </button>
                 ))}
              </div>
           </div>

           <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-gray-200 mb-2">Risk Tolerance</label>
              <div className="grid grid-cols-3 gap-4">
                 {(['Conservative', 'Likely', 'Ambitious'] as const).map(r => (
                   <button 
                     key={r}
                     onClick={() => setRisk(r)}
                     className={`py-3 rounded-xl border font-bold text-sm transition-all
                       ${risk === r 
                         ? 'bg-slate-800 dark:bg-white text-white dark:text-slate-900 border-slate-800 dark:border-white' 
                         : 'bg-white dark:bg-slate-800 text-gray-500 border-gray-200 dark:border-slate-700 hover:bg-gray-50'}`}
                   >
                     {r}
                   </button>
                 ))}
              </div>
           </div>

           {/* Data & Consent */}
           <div className="p-4 bg-gray-50 dark:bg-slate-900/50 rounded-xl border border-gray-100 dark:border-slate-700">
              <div className="flex items-center justify-between mb-4">
                 <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800 dark:text-white text-sm">Jira Integration</span>
                    {isDemo && <span className="text-[10px] bg-red-100 text-[#E30611] px-2 py-0.5 rounded font-bold">DEMO MODE</span>}
                 </div>
                 <label className="flex items-center gap-2 cursor-pointer">
                    <span className="text-xs font-bold text-gray-400">Use Demo Data</span>
                    <div className={`w-10 h-6 rounded-full relative transition-colors ${isDemo ? 'bg-[#E30611]' : 'bg-gray-300 dark:bg-slate-600'}`}>
                       <input type="checkbox" className="hidden" checked={isDemo} onChange={handleDemoToggle} />
                       <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${isDemo ? 'left-5' : 'left-1'}`}></div>
                    </div>
                 </label>
              </div>
              <p className="text-xs text-gray-500 mb-4">
                 {isDemo 
                   ? "Simulating: 28 Active Tasks, High Feature Velocity, Low Architecture Exposure." 
                   : "Analyzing your current Jira backlog, velocity, and task complexity."}
              </p>
              
              <label className="flex items-start gap-3 cursor-pointer group">
                 <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 mt-0.5 transition-colors
                   ${hasConsent ? 'bg-green-500 border-green-500 text-white' : 'bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600 group-hover:border-green-400'}`}>
                   {hasConsent && <CheckCircle2 size={14} />}
                 </div>
                 <input type="checkbox" className="hidden" checked={hasConsent} onChange={() => setHasConsent(!hasConsent)} />
                 <span className="text-xs text-gray-500 dark:text-gray-400">
                   I consent to using my profile skills, Jira history, and corporate needs data to generate these proposals. 
                   Data is processed in-session only.
                 </span>
              </label>
           </div>
        </div>

        <button 
           onClick={generateProposals}
           disabled={!hasConsent}
           className={`w-full mt-8 py-4 font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all
             ${hasConsent 
               ? 'bg-[#E30611] text-white hover:bg-red-700 hover:scale-[1.01]' 
               : 'bg-gray-200 dark:bg-slate-700 text-gray-400 cursor-not-allowed'}`}
        >
           <Sparkles size={20} /> Generate Proposals
        </button>

      </div>
    </div>
  );

  const renderProcessing = () => (
    <div className="h-full flex flex-col items-center justify-center bg-[#F3F6FD] dark:bg-slate-900 p-8">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-slate-700 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E30611] to-transparent animate-[shimmer_2s_infinite]"></div>
        
        <div className="w-24 h-24 mx-auto mb-8 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center relative">
          <BrainCircuit className={`text-slate-300 dark:text-slate-600 transition-colors duration-500 ${loadingStep >= 3 ? 'text-[#E30611]' : ''}`} size={48} />
          
          <div className="absolute inset-0 border-4 border-slate-100 dark:border-slate-800 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-[#E30611] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Designing Opportunities</h2>
        
        <div className="space-y-4 text-left max-w-xs mx-auto">
          <div className={`flex items-center gap-3 transition-opacity duration-500 ${loadingStep >= 1 ? 'opacity-100' : 'opacity-30'}`}>
              <Briefcase size={20} className="text-blue-500" />
              <span className="font-medium text-slate-700 dark:text-gray-300">Analyzing Backlog & Workload...</span>
          </div>
          <div className={`flex items-center gap-3 transition-opacity duration-500 ${loadingStep >= 2 ? 'opacity-100' : 'opacity-30'}`}>
              <Target size={20} className="text-purple-500" />
              <span className="font-medium text-slate-700 dark:text-gray-300">Matching Corporate Needs...</span>
          </div>
          <div className={`flex items-center gap-3 transition-opacity duration-500 ${loadingStep >= 3 ? 'opacity-100' : 'opacity-30'}`}>
              <Sparkles size={20} className="text-[#E30611]" />
              <span className="font-medium text-slate-700 dark:text-gray-300">Crafting personalized roles...</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderResults = () => (
    <div className="h-full overflow-y-auto p-8 custom-scrollbar bg-[#F3F6FD] dark:bg-slate-900">
      <div className="flex justify-between items-center mb-8">
         <div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
               <Hammer className="text-[#E30611]" /> Your Crafting Proposals
            </h1>
            <p className="text-gray-500 dark:text-gray-400">Review these options. Accepting will notify your manager for final sign-off.</p>
         </div>
         <button onClick={() => setStep('input')} className="flex items-center gap-2 text-gray-400 hover:text-[#E30611] text-sm font-bold">
            <RotateCcw size={16} /> New Session
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
         {proposals.map((proposal, idx) => (
           <div key={idx} className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all flex flex-col overflow-hidden group">
              
              {/* Header */}
              <div className={`p-6 border-b border-gray-100 dark:border-slate-700 relative
                 ${idx === 0 ? 'bg-blue-50 dark:bg-blue-900/10' : idx === 1 ? 'bg-purple-50 dark:bg-purple-900/10' : 'bg-orange-50 dark:bg-orange-900/10'}`}>
                 <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-white/50 dark:bg-black/20 text-slate-600 dark:text-gray-300 mb-2 inline-block">
                    {proposal.type}
                 </span>
                 <h3 className="text-xl font-bold text-slate-800 dark:text-white leading-tight">{proposal.title}</h3>
                 
                 {proposal.confidence < 0.6 && (
                   <div className="absolute top-4 right-4 bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1 shadow-sm">
                      <AlertTriangle size={10} /> Review Req.
                   </div>
                 )}
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col">
                 <div className="mb-4">
                    <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">What</h4>
                    <p className="text-sm text-slate-700 dark:text-gray-300 leading-relaxed">
                       {proposal.description}
                    </p>
                 </div>

                 <div className="mb-4">
                    <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Why (Rationale)</h4>
                    <p className="text-sm text-slate-600 dark:text-gray-400 italic">
                       "{proposal.rationale}"
                    </p>
                 </div>

                 <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-green-50 dark:bg-green-900/10 p-3 rounded-lg border border-green-100 dark:border-green-900/20">
                       <div className="text-[10px] font-bold text-green-700 dark:text-green-400 uppercase">Impact</div>
                       <div className="text-xs font-medium text-slate-800 dark:text-white">{proposal.impact}</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-slate-700/30 p-3 rounded-lg border border-gray-100 dark:border-slate-700">
                       <div className="text-[10px] font-bold text-gray-500 uppercase">Time Est.</div>
                       <div className="text-xs font-medium text-slate-800 dark:text-white flex items-center gap-1">
                          <Clock size={10} /> {proposal.timeEst}
                       </div>
                    </div>
                 </div>

                 <div className="mb-6">
                    <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Risks</h4>
                    <ul className="space-y-1">
                       {proposal.risks.map((risk, i) => (
                          <li key={i} className="text-xs text-red-500 flex items-start gap-1">
                             <span className="mt-0.5">•</span> {risk}
                          </li>
                       ))}
                    </ul>
                 </div>

                 <div className="mt-auto flex flex-col gap-2 pt-4 border-t border-gray-100 dark:border-slate-700">
                    <button 
                       onClick={() => alert(`Proposal Accepted. Notification sent to manager for ${proposal.title}`)}
                       className="w-full py-2 bg-[#E30611] text-white font-bold rounded-lg hover:bg-red-700 text-sm flex items-center justify-center gap-2"
                    >
                       Accept & Request Sign-off <ArrowRight size={14} />
                    </button>
                    <div className="flex gap-2">
                       <button className="flex-1 py-2 border border-gray-200 dark:border-slate-600 text-slate-600 dark:text-gray-300 font-bold rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 text-sm">
                          Discuss with Manager
                       </button>
                       <button className="px-3 border border-gray-200 dark:border-slate-600 text-slate-600 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700">
                          <Download size={16} />
                       </button>
                    </div>
                 </div>
              </div>
           </div>
         ))}
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-xl flex items-start gap-3 border border-blue-100 dark:border-blue-900/30">
         <EyeOff className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" size={20} />
         <div>
            <h4 className="text-sm font-bold text-blue-800 dark:text-blue-200">Privacy & Data Handling</h4>
            <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
               This session's data is stored in temporary memory only. 
               Accepting a proposal creates a formal request record visible to you and your direct manager.
            </p>
         </div>
      </div>
    </div>
  );

  if (step === 'processing') return renderProcessing();
  if (step === 'results') return renderResults();
  return renderInput();
};

export default JobCraftingView;
