
import React, { useState } from 'react';
import { 
  GitPullRequest, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  Code, 
  BookOpen, 
  ArrowRight, 
  RotateCcw,
  Shield,
  EyeOff,
  Users,
  Send,
  Loader2,
  FileCode,
  TrendingUp
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- Types ---
interface Improvement {
  suggestion: string;
  rationale: string;
  codeBefore: string;
  codeAfter: string;
}

interface LearningTask {
  title: string;
  description: string;
  link?: string;
}

interface SkillsAnalysis {
  demonstrated: string[];
  nextSteps: string;
}

interface AnalysisResult {
  positives: string[];
  improvements: Improvement[];
  learningTask: LearningTask;
  skillsAnalysis: SkillsAnalysis;
  confidence: number;
}

// --- Mock Data ---
const DEMO_DIFF = `
// useEffect in DashboardWidget.tsx
useEffect(() => {
  const fetchData = async () => {
    const data = await api.getWidgetData(widgetId);
    setData(data);
  };
  fetchData();
}, []); // eslint-disable-line react-hooks/exhaustive-deps
`;

const DEMO_RESULT: AnalysisResult = {
  positives: [
    "Good separation of concerns by extracting data fetching into a dedicated async function.",
    "Clean variable naming conventions used throughout the component."
  ],
  improvements: [
    {
      suggestion: "Fix missing dependency in useEffect",
      rationale: "The `widgetId` is used inside the effect but is missing from the dependency array. This can lead to stale data if the `widgetId` prop changes.",
      codeBefore: `useEffect(() => {
  // ...
}, []);`,
      codeAfter: `useEffect(() => {
  // ...
}, [widgetId]);`
    },
    {
      suggestion: "Handle loading and error states",
      rationale: "There is no error handling around the async call. If the API fails, the UI might crash or show an undefined state.",
      codeBefore: `const data = await api.getWidgetData(widgetId);
setData(data);`,
      codeAfter: `try {
  setLoading(true);
  const data = await api.getWidgetData(widgetId);
  setData(data);
} catch (e) {
  setError(e);
} finally {
  setLoading(false);
}`
    }
  ],
  learningTask: {
    title: "Mastering React Hooks Dependencies",
    description: "Read the 'A Complete Guide to useEffect' to understand why suppressing linter warnings is often a code smell.",
    link: "https://react.dev/reference/react/useEffect"
  },
  skillsAnalysis: {
    demonstrated: ["React Hooks Lifecycle", "Async Data Fetching", "Functional Component Patterns"],
    nextSteps: "You are mastering basic hooks. To level up, try creating a custom `useFetch` hook to abstract this logic, or explore state machines for handling complex loading/error states."
  },
  confidence: 0.88
};

const PRCoachView: React.FC = () => {
  const [step, setStep] = useState<'input' | 'processing' | 'results' | 'review'>('input');
  const [diffInput, setDiffInput] = useState('');
  const [isDemo, setIsDemo] = useState(true);
  const [hasConsent, setHasConsent] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);

  const handleLoadDemo = () => {
    setDiffInput(DEMO_DIFF);
    setIsDemo(true);
  };

  const handleAnalyze = async () => {
    if (!hasConsent) return;
    
    setStep('processing');
    setLoadingStep(0);

    // Animation sequence
    const t1 = setTimeout(() => setLoadingStep(1), 1000);
    const t2 = setTimeout(() => setLoadingStep(2), 2000);
    const t3 = setTimeout(() => setLoadingStep(3), 3000);

    try {
      if (process.env.API_KEY && !isDemo) {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const systemInstruction = `
          You are a Senior Staff Engineer acting as a mentor.
          Analyze the provided code diff.
          Focus on GROWTH, MASTERY, and PERFORMANCE.
          Output a JSON object with:
          - positives: string[] (2-3 items)
          - improvements: { suggestion, rationale, codeBefore, codeAfter }[] (1-2 items)
          - learningTask: { title, description, link }
          - skillsAnalysis: {
              demonstrated: string[] (List 2-3 specific technical skills shown in this code),
              nextSteps: string (1-2 sentences on how to advance from this level)
            }
          - confidence: number (0-1)
        `;
        
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: diffInput,
          config: {
            systemInstruction: systemInstruction,
            responseMimeType: "application/json"
          }
        });

        const text = response.text;
        if (text) {
          const parsed = JSON.parse(text);
          setResult(parsed);
          
          // Random spot check logic (15% chance) or low confidence
          if (parsed.confidence < 0.6 || Math.random() < 0.15) {
             // We will handle the navigation to 'review' in the timeout
             setTimeout(() => setStep('review'), 3500);
             return;
          }
        } else {
          throw new Error("No response");
        }
      } else {
        // Use Demo Data
        await new Promise(r => setTimeout(r, 3500));
        setResult(DEMO_RESULT);
      }
      
      // If we didn't trigger the review step earlier
      if (step !== 'review') {
         setTimeout(() => setStep('results'), 3500);
      }

    } catch (e) {
      console.error(e);
      setStep('input');
      alert("Analysis failed. Please try again.");
    }
    
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  };

  const renderInput = () => (
    <div className="h-full overflow-y-auto p-8 custom-scrollbar bg-[#F3F6FD] dark:bg-slate-900 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-700 p-8">
         <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2 flex items-center justify-center gap-3">
               <GitPullRequest className="text-[#E30611]" size={36} /> PR/Code Review Assistant
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
               Get growth-focused feedback, catch patterns early, and master your craft.
            </p>
         </div>

         {/* Input Area */}
         <div className="space-y-6">
            <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700">
               <div className="bg-gray-800 px-4 py-2 flex justify-between items-center border-b border-gray-700">
                  <span className="text-xs font-bold text-gray-400 flex items-center gap-2">
                     <FileCode size={14}/> Diff / Code Snippet
                  </span>
                  <button 
                     onClick={handleLoadDemo}
                     className="text-xs font-bold text-[#E30611] hover:text-white transition-colors"
                  >
                     Load Demo Diff
                  </button>
               </div>
               <textarea 
                  value={diffInput}
                  onChange={(e) => { setDiffInput(e.target.value); setIsDemo(false); }}
                  className="w-full h-64 bg-gray-900 text-gray-300 font-mono text-sm p-4 focus:outline-none resize-none"
                  placeholder="// Paste your code diff or snippet here..."
               />
            </div>

            {/* Privacy & Consent */}
            <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30 flex items-start gap-3">
               <EyeOff className="text-blue-600 dark:text-blue-400 shrink-0 mt-1" size={20} />
               <div className="text-sm">
                  <h4 className="font-bold text-blue-800 dark:text-blue-200">Privacy-by-Design</h4>
                  <p className="text-blue-700 dark:text-blue-300">
                     Code snippets are processed in-memory and discarded immediately after analysis. 
                     No code is stored for training.
                  </p>
               </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer group justify-center">
               <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-colors
                  ${hasConsent ? 'bg-green-500 border-green-500 text-white' : 'bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-600 group-hover:border-green-400'}`}>
                  {hasConsent && <CheckCircle2 size={14} />}
               </div>
               <input type="checkbox" className="hidden" checked={hasConsent} onChange={() => setHasConsent(!hasConsent)} />
               <span className="text-sm font-medium text-slate-600 dark:text-gray-300">
                  I consent to processing this snippet for feedback generation.
               </span>
            </label>

            <button 
               onClick={handleAnalyze}
               disabled={!hasConsent || !diffInput}
               className={`w-full py-4 font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all
                  ${hasConsent && diffInput 
                     ? 'bg-[#E30611] text-white hover:bg-red-700 hover:scale-[1.01]' 
                     : 'bg-gray-200 dark:bg-slate-700 text-gray-400 cursor-not-allowed'}`}
            >
               <Sparkles size={20} /> Generate Feedback
            </button>
         </div>
      </div>
    </div>
  );

  const renderProcessing = () => (
    <div className="h-full flex flex-col items-center justify-center bg-[#F3F6FD] dark:bg-slate-900 p-8">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-slate-700 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#E30611] to-transparent animate-[shimmer_2s_infinite]"></div>
        
        <div className="w-24 h-24 mx-auto mb-8 bg-slate-50 dark:bg-slate-900 rounded-full flex items-center justify-center relative">
          <Code className={`text-slate-300 dark:text-slate-600 transition-colors duration-500 ${loadingStep >= 3 ? 'text-[#E30611]' : ''}`} size={48} />
          <div className="absolute inset-0 border-4 border-slate-100 dark:border-slate-800 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-[#E30611] border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Analyzing Pattern</h2>
        
        <div className="space-y-4 text-left max-w-xs mx-auto">
          <div className={`flex items-center gap-3 transition-opacity duration-500 ${loadingStep >= 1 ? 'opacity-100' : 'opacity-30'}`}>
              <FileCode size={20} className="text-blue-500" />
              <span className="font-medium text-slate-700 dark:text-gray-300">Parsing AST & Syntax...</span>
          </div>
          <div className={`flex items-center gap-3 transition-opacity duration-500 ${loadingStep >= 2 ? 'opacity-100' : 'opacity-30'}`}>
              <Shield size={20} className="text-purple-500" />
              <span className="font-medium text-slate-700 dark:text-gray-300">Checking Internal Guidelines...</span>
          </div>
          <div className={`flex items-center gap-3 transition-opacity duration-500 ${loadingStep >= 3 ? 'opacity-100' : 'opacity-30'}`}>
              <Sparkles size={20} className="text-[#E30611]" />
              <span className="font-medium text-slate-700 dark:text-gray-300">Formulating Growth Hints...</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReviewRequired = () => (
     <div className="h-full flex flex-col items-center justify-center bg-[#F3F6FD] dark:bg-slate-900 p-8">
        <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-xl border-2 border-yellow-400 text-center">
           <div className="w-20 h-20 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-yellow-600 dark:text-yellow-400">
              <Users size={40} />
           </div>
           <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Human Spot-Check Required</h2>
           <p className="text-gray-500 dark:text-gray-400 mb-6">
              To ensure quality, this draft has been flagged for a quick review by a Senior Engineer (Random Spot Check or Low Confidence).
           </p>
           <button 
             onClick={() => { alert("Sent to Senior Queue"); setStep('input'); }}
             className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:opacity-90"
           >
              Send to Review Queue
           </button>
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
                 <Sparkles className="text-[#E30611]" /> Growth Report
               </h1>
               <div className="flex items-center gap-3 mt-1 text-xs">
                  <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 px-2 py-0.5 rounded font-bold">
                     LLM GENERATED
                  </span>
                  {isDemo && <span className="text-gray-400 font-bold">DEMO MODE</span>}
                  <span className="text-gray-400">Confidence: {(result.confidence * 100).toFixed(0)}%</span>
               </div>
            </div>
            <button onClick={() => setStep('input')} className="flex items-center gap-2 text-gray-400 hover:text-[#E30611] text-sm font-bold">
               <RotateCcw size={16} /> Analyze Another
            </button>
         </div>
         
         {/* Skills Analysis (New Section) */}
         <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm p-6 mb-6">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4 flex items-center gap-2">
               <TrendingUp className="text-blue-500" size={20} /> Skills Detected & Path Forward
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Skills Applied</h4>
                  <div className="flex flex-wrap gap-2">
                     {result.skillsAnalysis?.demonstrated.map((skill, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-xs font-bold border border-blue-100 dark:border-blue-900/30">
                           {skill}
                        </span>
                     ))}
                  </div>
               </div>
               <div>
                  <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">Recommended Next Step</h4>
                  <p className="text-sm text-slate-600 dark:text-gray-300 bg-gray-50 dark:bg-slate-900/50 p-3 rounded-xl">
                     {result.skillsAnalysis?.nextSteps}
                  </p>
               </div>
            </div>
         </div>

         {/* 1. What's Good */}
         <div className="bg-white dark:bg-slate-800 rounded-2xl border-l-4 border-green-500 shadow-sm p-6 mb-6">
            <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-3 flex items-center gap-2">
               <CheckCircle2 className="text-green-500" size={20} /> What went well
            </h3>
            <ul className="space-y-2">
               {result.positives.map((pos, i) => (
                  <li key={i} className="text-sm text-slate-600 dark:text-gray-300 flex items-start gap-2">
                     <span className="mt-1.5 w-1.5 h-1.5 bg-green-500 rounded-full shrink-0"></span>
                     {pos}
                  </li>
               ))}
            </ul>
         </div>

         {/* 2. Improvements */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {result.improvements.map((imp, i) => (
               <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl border-l-4 border-yellow-500 shadow-sm p-6 flex flex-col">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2 flex items-center gap-2">
                     <AlertTriangle className="text-yellow-500" size={20} /> Opportunity: {imp.suggestion}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 italic">
                     "{imp.rationale}"
                  </p>
                  
                  <div className="mt-auto space-y-2 font-mono text-xs">
                     <div className="bg-red-50 dark:bg-red-900/10 p-3 rounded-lg border border-red-100 dark:border-red-900/20">
                        <div className="text-[10px] font-bold text-red-500 uppercase mb-1">Before</div>
                        <pre className="whitespace-pre-wrap text-slate-700 dark:text-gray-300">{imp.codeBefore}</pre>
                     </div>
                     <div className="flex justify-center text-gray-400"><ArrowRight size={14} className="rotate-90 lg:rotate-0" /></div>
                     <div className="bg-green-50 dark:bg-green-900/10 p-3 rounded-lg border border-green-100 dark:border-green-900/20">
                        <div className="text-[10px] font-bold text-green-600 uppercase mb-1">After</div>
                        <pre className="whitespace-pre-wrap text-slate-700 dark:text-gray-300">{imp.codeAfter}</pre>
                     </div>
                  </div>
               </div>
            ))}
         </div>

         {/* 3. Learning Task */}
         <div className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-700 rounded-2xl shadow-lg p-6 mb-8 text-white relative overflow-hidden">
            <BookOpen className="absolute right-6 top-6 text-white opacity-10" size={64} />
            <div className="relative z-10">
               <h3 className="text-sm font-bold text-purple-300 uppercase tracking-wider mb-2">Micro-Learning Task</h3>
               <h2 className="text-xl font-bold mb-2">{result.learningTask.title}</h2>
               <p className="text-gray-300 text-sm mb-4 max-w-2xl">{result.learningTask.description}</p>
               {result.learningTask.link && (
                  <a 
                     href={result.learningTask.link} 
                     target="_blank" 
                     rel="noreferrer"
                     className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm font-bold transition-colors"
                  >
                     View Documentation <ArrowRight size={14} />
                  </a>
               )}
            </div>
         </div>

         {/* Footer Actions */}
         <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-gray-100 dark:border-slate-700 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="text-xs text-gray-500 dark:text-gray-400">
               <p><b>Note:</b> This draft is AI-generated. Review carefully before sending.</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
               <button onClick={() => alert("Draft Saved")} className="flex-1 md:flex-none px-4 py-2 border border-gray-200 dark:border-slate-600 text-slate-600 dark:text-gray-300 font-bold rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 text-sm">
                  Save Draft
               </button>
               <button onClick={() => alert("Sent for Senior Review")} className="flex-1 md:flex-none px-4 py-2 border border-[#E30611] text-[#E30611] font-bold rounded-lg hover:bg-red-50 dark:hover:bg-red-900/10 text-sm">
                  Ask Senior
               </button>
               <button onClick={() => alert("Feedback Sent")} className="flex-1 md:flex-none px-6 py-2 bg-[#E30611] text-white font-bold rounded-lg hover:bg-red-700 text-sm flex items-center justify-center gap-2">
                  <Send size={14} /> Send Feedback
               </button>
            </div>
         </div>
      </div>
    );
  };

  if (step === 'processing') return renderProcessing();
  if (step === 'review') return renderReviewRequired();
  if (step === 'results') return renderResults();
  return renderInput();
};

export default PRCoachView;
