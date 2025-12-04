
import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Lock, 
  ShieldCheck, 
  BrainCircuit, 
  CheckCircle2, 
  AlertTriangle,
  Lightbulb,
  Clock,
  ArrowRight,
  TrendingUp,
  RotateCcw,
  Sparkles,
  Users,
  EyeOff
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- Types ---
interface FeedbackResult {
  summary: string;
  coachHints: { title: string; action: string; time: string; howToCheck: string }[];
  managerTips: string[];
  confidence: number;
  urgentIssue: boolean;
  isSimulated: boolean;
}

const Feedback360View: React.FC = () => {
  const [step, setStep] = useState<'input' | 'processing' | 'results'>('input');
  const [inputs, setInputs] = useState({ q1: '', q2: '', q3: '' });
  const [isDemoMode, setIsDemoMode] = useState(true);
  const [loadingStep, setLoadingStep] = useState(0); // 0: Start, 1: Anonymize, 2: Cluster, 3: Generate
  const [result, setResult] = useState<FeedbackResult | null>(null);

  // --- MOCK DATA FOR DEMO ---
  const simulatedPeers = `
    Peer 1: "Ekaterina is great at vision, but sometimes moves too fast for the team to catch up."
    Peer 2: "Amazing leadership during the Q3 crisis. Would love more 1:1 time."
    Peer 3: "Technically brilliant, but needs to delegate more operational tasks."
    Peer 4: "Always inspiring. However, the roadmap changes frequently."
    Peer 5: "Great speaker, but sometimes emails are too brief and unclear."
    Peer 6: "A true visionary. I want to learn strategic planning from her."
  `;

  // --- GEMINI INTEGRATION ---
  const handleAnalyze = async () => {
    setStep('processing');
    setLoadingStep(0);

    // Simulate pipeline steps
    const timer1 = setTimeout(() => setLoadingStep(1), 800);  // Anonymizing
    const timer2 = setTimeout(() => setLoadingStep(2), 1600); // Clustering
    const timer3 = setTimeout(() => setLoadingStep(3), 2400); // Generating

    try {
      // Prepare the prompt
      const userContext = `
        User Self-Reflection:
        1. What went well: ${inputs.q1}
        2. Improvements: ${inputs.q2}
        3. Help needed: ${inputs.q3}
      `;
      
      const fullContext = isDemoMode 
        ? `${userContext}\n\nSimulated Colleague Feedback (Anonymized):\n${simulatedPeers}`
        : userContext;

      const systemInstruction = `
        You are an elite executive coach. Analyze the 360 feedback.
        Input contains Self-Reflection and optionally Peer Feedback.
        
        Return a JSON object with this exact structure:
        {
          "summary": "Short summary (max 90 words) of the feedback profile.",
          "coachHints": [
            { "title": "Hint Title", "action": "Specific Action", "time": "Time Est.", "howToCheck": "Success Measure" },
            { "title": "Hint Title", "action": "Specific Action", "time": "Time Est.", "howToCheck": "Success Measure" },
            { "title": "Hint Title", "action": "Specific Action", "time": "Time Est.", "howToCheck": "Success Measure" }
          ],
          "managerTips": ["Tip 1", "Tip 2"],
          "confidence": 0.9,
          "urgentIssue": boolean
        }
        
        If "Simulated Colleague Feedback" is present, explicitly mention "Based on peer feedback..." in the summary.
        If only Self-Reflection is present, focus on self-awareness.
      `;

      let finalResult: FeedbackResult;

      if (process.env.API_KEY) {
        // ACTUAL AI CALL
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: fullContext,
          config: {
            systemInstruction: systemInstruction,
            responseMimeType: "application/json"
          }
        });
        
        const text = response.text;
        if (!text) throw new Error("No response from AI");
        const parsed = JSON.parse(text);
        
        finalResult = {
          ...parsed,
          isSimulated: isDemoMode
        };

      } else {
        // FALLBACK IF NO API KEY (Simulated Response)
        await new Promise(r => setTimeout(r, 3000)); // Wait for timers
        finalResult = {
          summary: isDemoMode 
             ? "Demo-Svod (Generated): The feedback highlights strong visionary leadership and crisis management. However, there is a recurring theme of 'velocity mismatch'—the team struggles to keep up with rapid strategic pivots. Peers request more delegation of operations and clearer written communication."
             : "Based on self-reflection, you have a clear grasp of your wins. To grow, focus on verifying your assumptions with actual peer feedback in the next full cycle.",
          coachHints: [
            { title: "Stabilize the Roadmap", action: "Freeze scope for 2 weeks after major pivots.", time: "Ongoing", howToCheck: "Team Pulse Survey > 4.0" },
            { title: "Delegate Ops", action: "Assign 'Auth Service' ownership completely to Igor.", time: "1 week", howToCheck: "Zero operational tickets in your queue" },
            { title: "Communication Clarity", action: "Use the 'What-Why-Next' template for all team emails.", time: "Daily", howToCheck: "Fewer follow-up questions" }
          ],
          managerTips: [
            "Encourage Ekaterina to take a 'listening tour' to understand team capacity.",
            "Celebrate her crisis management, but set KPIs for stability."
          ],
          confidence: isDemoMode ? 0.92 : 0.65,
          urgentIssue: isDemoMode ? false : false,
          isSimulated: isDemoMode
        };
      }

      // Ensure we wait for the animation
      setTimeout(() => {
        setResult(finalResult);
        setStep('results');
      }, 3000);

    } catch (e) {
      console.error(e);
      // Fallback in case of error
      setStep('input');
      alert("Simulation failed. Please try again.");
    }
    
    // Cleanup timers
    return () => { clearTimeout(timer1); clearTimeout(timer2); clearTimeout(timer3); };
  };

  const handleReset = () => {
    setInputs({ q1: '', q2: '', q3: '' });
    setStep('input');
    setResult(null);
  };

  // --- RENDERERS ---

  if (step === 'processing') {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-[#F3F6FD] dark:bg-slate-900 p-8">
        <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-slate-700 text-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E30611] to-transparent animate-[shimmer_2s_infinite]"></div>
           
           <div className="w-24 h-24 mx-auto mb-8 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center relative">
              <BrainCircuit className={`text-slate-300 dark:text-slate-600 transition-colors duration-500 ${loadingStep >= 3 ? 'text-[#E30611]' : ''}`} size={48} />
              
              {/* Orbital Spinners */}
              <div className="absolute inset-0 border-4 border-slate-100 dark:border-slate-800 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-t-[#E30611] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
           </div>

           <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Processing Feedback</h2>
           
           <div className="space-y-4 text-left max-w-xs mx-auto">
              <div className={`flex items-center gap-3 transition-opacity duration-500 ${loadingStep >= 1 ? 'opacity-100' : 'opacity-30'}`}>
                 <ShieldCheck size={20} className="text-green-500" />
                 <span className="font-medium text-slate-700 dark:text-gray-300">Anonymizing Data Layers...</span>
              </div>
              <div className={`flex items-center gap-3 transition-opacity duration-500 ${loadingStep >= 2 ? 'opacity-100' : 'opacity-30'}`}>
                 <Users size={20} className="text-blue-500" />
                 <span className="font-medium text-slate-700 dark:text-gray-300">Clustering Peer Sentiments...</span>
              </div>
              <div className={`flex items-center gap-3 transition-opacity duration-500 ${loadingStep >= 3 ? 'opacity-100' : 'opacity-30'}`}>
                 <Sparkles size={20} className="text-purple-500" />
                 <span className="font-medium text-slate-700 dark:text-gray-300">Generating Executive Insights...</span>
              </div>
           </div>
        </div>
      </div>
    );
  }

  if (step === 'results' && result) {
    return (
      <div className="h-full overflow-y-auto p-8 custom-scrollbar bg-[#F3F6FD] dark:bg-slate-900">
         <div className="flex justify-between items-center mb-8">
            <div>
               <h1 className="text-2xl font-bold text-slate-800 dark:text-white flex items-center gap-2">
                 <Zap className="text-[#E30611] fill-current" /> 360 Analysis Complete
               </h1>
               <div className="flex items-center gap-2 mt-1">
                 <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1">
                   <Lock size={10} /> PRIVATE
                 </span>
                 {result.isSimulated && (
                    <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-0.5 rounded text-[10px] font-bold">
                       DEMO MODE
                    </span>
                 )}
               </div>
            </div>
            <button onClick={handleReset} className="flex items-center gap-2 text-gray-400 hover:text-[#E30611] text-sm font-bold">
               <RotateCcw size={16} /> New Session
            </button>
         </div>

         {/* Summary Card */}
         <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm mb-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
               <BrainCircuit size={100} />
            </div>
            <div className="flex items-start justify-between mb-4 relative z-10">
               <h3 className="text-lg font-bold text-slate-800 dark:text-white">Executive Summary</h3>
               <div className="flex items-center gap-2">
                 <span className="text-xs font-bold text-gray-400 uppercase">AI Confidence</span>
                 <div className="w-24 h-2 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-[#E30611]" style={{ width: `${result.confidence * 100}%` }}></div>
                 </div>
                 <span className="text-xs font-bold text-slate-800 dark:text-white">{(result.confidence * 100).toFixed(0)}%</span>
               </div>
            </div>
            <p className="text-slate-600 dark:text-gray-300 leading-relaxed text-sm md:text-base max-w-4xl relative z-10">
               {result.summary}
            </p>
         </div>

         {/* Coach Hints Grid */}
         <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Lightbulb size={16} /> AI Coach Hints
         </h3>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {result.coachHints.map((hint, i) => (
               <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm hover:border-red-200 dark:hover:border-red-900/50 transition-colors flex flex-col">
                  {result.isSimulated && <span className="text-[10px] text-gray-300 self-end mb-1">DEMO</span>}
                  <h4 className="text-lg font-bold text-slate-800 dark:text-white mb-2">{hint.title}</h4>
                  <div className="bg-red-50 dark:bg-red-900/10 p-3 rounded-lg border border-red-100 dark:border-red-900/20 mb-4 flex-1">
                     <div className="text-xs text-[#E30611] font-bold uppercase mb-1">Action</div>
                     <p className="text-sm text-slate-700 dark:text-gray-200">{hint.action}</p>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400 border-t border-gray-50 dark:border-slate-700 pt-3">
                     <span className="flex items-center gap-1"><Clock size={12}/> {hint.time}</span>
                     <span className="flex items-center gap-1"><TrendingUp size={12}/> {hint.howToCheck}</span>
                  </div>
               </div>
            ))}
         </div>

         {/* Manager Tips & Footer */}
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 bg-slate-50 dark:bg-slate-800/50 border border-dashed border-gray-300 dark:border-slate-600 rounded-2xl p-6">
               <h3 className="text-sm font-bold text-slate-700 dark:text-gray-300 uppercase tracking-wider mb-3">For Your Manager (Automated)</h3>
               <ul className="space-y-2">
                 {result.managerTips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                       <ArrowRight size={16} className="shrink-0 mt-0.5 text-gray-400" />
                       {tip}
                    </li>
                 ))}
               </ul>
            </div>
            <div className="flex flex-col gap-3">
               {result.confidence < 0.7 && (
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/50 rounded-xl flex items-center gap-3">
                     <AlertTriangle className="text-yellow-600" size={20} />
                     <div className="text-xs text-yellow-800 dark:text-yellow-200">
                        <b>Low Confidence:</b> Not enough data points.
                     </div>
                  </div>
               )}
               <button className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:opacity-90 transition-opacity">
                  Add to Development Plan
               </button>
               <button className="w-full py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-600 text-slate-700 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                  Request Human Review
               </button>
            </div>
         </div>
      </div>
    );
  }

  // INPUT STEP
  return (
    <div className="h-full overflow-y-auto p-8 custom-scrollbar bg-[#F3F6FD] dark:bg-slate-900 flex items-center justify-center">
       <div className="max-w-2xl w-full">
          <div className="mb-8 text-center">
             <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Quick 360° Session</h1>
             <p className="text-gray-500 dark:text-gray-400">Anonymized, AI-enhanced feedback loop. Takes ~1 minute.</p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-slate-700">
             
             {/* Privacy Banner */}
             <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50 rounded-xl p-4 mb-8 flex items-start gap-3">
                <EyeOff className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" size={20} />
                <div className="text-sm text-blue-800 dark:text-blue-200">
                   <b>Privacy-by-Design:</b> Your inputs are anonymized before processing. 
                   Results are aggregated. No individual raw data is stored.
                </div>
             </div>

             <div className="space-y-6">
                <div>
                   <label className="block text-sm font-bold text-slate-700 dark:text-gray-200 mb-2">1. What went well recently?</label>
                   <textarea 
                     className="w-full p-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:border-[#E30611] focus:ring-1 focus:ring-[#E30611] transition-all"
                     rows={2}
                     placeholder="e.g. Launched Project X ahead of schedule..."
                     value={inputs.q1}
                     onChange={(e) => setInputs({...inputs, q1: e.target.value})}
                   />
                </div>
                <div>
                   <label className="block text-sm font-bold text-slate-700 dark:text-gray-200 mb-2">2. Where do you see opportunities for improvement?</label>
                   <textarea 
                     className="w-full p-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:border-[#E30611] focus:ring-1 focus:ring-[#E30611] transition-all"
                     rows={2}
                     placeholder="e.g. Need to improve delegation..."
                     value={inputs.q2}
                     onChange={(e) => setInputs({...inputs, q2: e.target.value})}
                   />
                </div>
                <div>
                   <label className="block text-sm font-bold text-slate-700 dark:text-gray-200 mb-2">3. How can colleagues help you?</label>
                   <textarea 
                     className="w-full p-4 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900 text-slate-800 dark:text-white focus:outline-none focus:border-[#E30611] focus:ring-1 focus:ring-[#E30611] transition-all"
                     rows={2}
                     placeholder="e.g. Provide earlier feedback on designs..."
                     value={inputs.q3}
                     onChange={(e) => setInputs({...inputs, q3: e.target.value})}
                   />
                </div>
             </div>

             <div className="mt-8 flex flex-col md:flex-row items-center gap-4">
                <div className="flex-1 w-full">
                   <label className="flex items-center gap-3 p-3 border border-gray-200 dark:border-slate-700 rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors">
                      <div className={`w-10 h-6 rounded-full relative transition-colors ${isDemoMode ? 'bg-[#E30611]' : 'bg-gray-300'}`}>
                         <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${isDemoMode ? 'left-5' : 'left-1'}`}></div>
                      </div>
                      <input type="checkbox" checked={isDemoMode} onChange={() => setIsDemoMode(!isDemoMode)} className="hidden" />
                      <div>
                         <div className="text-sm font-bold text-slate-800 dark:text-white">DEMO: Include Simulated Peers</div>
                         <div className="text-xs text-gray-500">Adds 6 anonymous AI-generated reviews</div>
                      </div>
                   </label>
                </div>
                <button 
                  onClick={handleAnalyze}
                  className="w-full md:w-auto px-8 py-4 bg-[#E30611] text-white font-bold rounded-xl shadow-lg hover:bg-red-700 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                   <Sparkles size={20} /> Generate Analysis
                </button>
             </div>
          </div>
       </div>
    </div>
  );
};

export default Feedback360View;
