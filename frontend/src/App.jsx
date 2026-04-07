import { useState, useEffect } from 'react';
import axios from 'axios';
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Sparkles, Loader2, CheckCircle, 
  AlertTriangle, Zap, Clock, ChevronRight,
  ArrowLeft, BarChart3, Binary
} from 'lucide-react';
import Landing from './Landing';
import Navbar from './components/Navbar';

console.log("API URL:", import.meta.env.VITE_API_URL)
function App() {
  const { user } = useUser();
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/history?userId=${user.id}`);
      setHistory(response.data);
    } catch (err) {
      console.error("Failed to fetch history");
    }
  };

  useEffect(() => {
    if (user) {
      fetchHistory();
    }
  }, [user]);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('userId', user.id);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/analyze`, formData);
      setResult(response.data);
      fetchHistory();
    } catch (err) {
      alert("System error! Ensure the analyzer core is active.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-obsidian text-white font-sans selection:bg-electric-blue/30 selection:text-white">
      <SignedOut>
        <Landing />
      </SignedOut>

      <SignedIn>
        <div className="relative min-h-screen mesh-bg">
          <Navbar />
          
          <main className="max-w-7xl mx-auto pt-32 pb-20 px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* PRIMARY ANALYSIS HUB */}
              <div className="lg:col-span-8 space-y-8">
                <AnimatePresence mode="wait">
                  {!result ? (
                    <motion.div 
                      key="scanner"
                      initial={{ opacity: 0, y: 20 }} 
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="glass-card overflow-hidden relative group"
                    >
                      <div className="flex items-center gap-6 mb-12">
                        <div className="p-4 bg-electric-blue/10 rounded-2xl border border-electric-blue/20 shadow-2xl shadow-electric-blue/10 group-hover:rotate-6 transition-transform duration-500">
                          <Binary className="text-electric-blue" size={28} />
                        </div>
                        <div>
                          <h2 className="text-3xl font-black italic tracking-tighter">NEURAL CORE V4</h2>
                          <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.4em]">High Precision Extraction Mode</p>
                        </div>
                      </div>

                      <label className="group/drop relative border-2 border-dashed border-white/5 rounded-[2.5rem] p-24 flex flex-col items-center justify-center cursor-pointer bg-white/[0.01] hover:bg-electric-blue/[0.03] hover:border-electric-blue/30 transition-all duration-700 mb-10 overflow-hidden">
                        <div className="absolute inset-0 bg-electric-blue/5 opacity-0 group-hover/drop:opacity-100 transition-opacity duration-1000" />
                        <input type="file" accept=".pdf" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
                        
                        <div className={`p-8 rounded-4xl mb-8 transition-all duration-700 ${file ? 'bg-electric-blue text-white scale-110 shadow-3xl shadow-electric-blue/40' : 'bg-white/[0.03] text-white/20 border border-white/5'}`}>
                          <FileText size={48} className={file ? 'animate-bounce' : ''} />
                        </div>
                        
                        <h3 className="text-2xl font-black italic mb-3 tracking-tight group-hover/drop:text-electric-blue transition-colors">{file ? file.name : "LOAD_RESUME.PDF"}</h3>
                        <p className="text-white/20 text-xs font-black uppercase tracking-[0.3em]">Initialize sequence via drop area</p>
                      </label>

                      <button 
                        onClick={handleUpload} 
                        disabled={loading || !file} 
                        className="btn-primary w-full h-20 text-xl font-black italic tracking-tighter disabled:opacity-30 disabled:grayscale transition-all duration-700"
                      >
                        {loading ? (
                          <><Loader2 className="animate-spin" /> RUNNING SELECTION SORT...</>
                        ) : (
                          <><Zap size={22} className="fill-current" /> EXECUTE ANALYSIS</>
                        )}
                      </button>

                      <div className="mt-10 pt-8 border-t border-white/3 flex justify-between items-center text-[10px] font-black text-white/10 uppercase tracking-[0.5em]">
                         <span>Security: AES-256</span>
                         <span className="flex items-center gap-2">
                           <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Optimizer Ready
                         </span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="result"
                      initial={{ opacity: 0, y: 30 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      className="glass-card p-0! overflow-hidden border-electric-blue/20"
                    >
                      {/* Header */}
                      <div className="p-10 md:p-12 border-b border-white/5 bg-linear-to-br from-white/[0.03] to-transparent">
                        <button 
                          onClick={() => setResult(null)}
                          className="flex items-center gap-3 text-white/30 hover:text-white text-[10px] font-black uppercase tracking-[0.4em] mb-10 transition-all group"
                        >
                          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Core
                        </button>
                        
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
                          <div className="space-y-4">
                            <h3 className="text-6xl md:text-7xl font-black tracking-tighter italic text-gradient-premium uppercase leading-none">{result.applicantName}</h3>
                            <div className="flex items-center gap-3">
                               <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full">
                                  <p className="text-green-500 font-black text-[9px] uppercase tracking-widest leading-none">Diagnostic Complete</p>
                               </div>
                               <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.3em]">Runtime: 1.2s</p>
                            </div>
                          </div>
                          
                          <div className="flex flex-col items-center justify-center p-8 bg-obsidian rounded-[2.5rem] border border-white/[0.05] shadow-inner">
                            <span className="text-7xl font-black italic tracking-tighter text-electric-blue leading-none">{result.score}</span>
                            <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mt-2">Score V4</span>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-10 md:p-12 space-y-12">
                        {/* Summary */}
                        <div className="relative p-8 rounded-[2rem] bg-electric-blue/[0.02] border border-white/[0.03] shadow-2xl">
                          <Sparkles className="absolute -top-4 -right-4 text-electric-blue/30" size={56} />
                          <p className="text-xl md:text-2xl text-gray-400 italic leading-snug font-medium pr-10">"{result.summary}"</p>
                        </div>

                        {/* Strengths & Improvements */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="p-8 rounded-[2rem] bg-green-500/[0.01] border border-green-500/[0.05] hover:bg-green-500/[0.03] transition-colors group">
                            <div className="flex items-center gap-4 mb-8">
                               <div className="p-3 bg-green-500/10 rounded-2xl text-green-500 shadow-xl shadow-green-500/10"><CheckCircle size={22}/></div>
                               <h4 className="text-green-500 font-black text-sm uppercase tracking-[0.3em]">Positive Impact</h4>
                            </div>
                            <ul className="space-y-6">
                              {result.strengths?.map((s, i) => (
                                <li key={i} className="flex gap-4 text-sm font-medium text-gray-500 leading-snug group-hover:text-gray-400 transition-colors">
                                  <span className="text-green-500/30 mt-1">•</span> {s}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="p-8 rounded-[2rem] bg-orange-500/[0.01] border border-orange-500/[0.05] hover:bg-orange-500/[0.03] transition-colors group">
                            <div className="flex items-center gap-4 mb-8">
                               <div className="p-3 bg-orange-500/10 rounded-2xl text-orange-500 shadow-xl shadow-orange-500/10"><AlertTriangle size={22}/></div>
                               <h4 className="text-orange-500 font-black text-sm uppercase tracking-[0.3em]">Critical Deficits</h4>
                            </div>
                            <ul className="space-y-6">
                              {result.improvements?.map((im, i) => (
                                <li key={i} className="flex gap-4 text-sm font-medium text-gray-500 leading-snug group-hover:text-gray-400 transition-colors">
                                   <span className="text-orange-500/30 mt-1">•</span> {im}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* SIDEBAR - INTELLIGENCE HISTORY */}
              <aside className="lg:col-span-4 flex flex-col gap-6 sticky top-32">
                <div className="glass-card !p-0 overflow-hidden flex flex-col border-white/[0.05] shadow-2xl">
                  <div className="p-8 border-b border-white/[0.05] flex items-center justify-between bg-white/[0.02]">
                    <div className="flex items-center gap-4">
                      <div className="p-2.5 bg-electric-blue/10 rounded-xl text-electric-blue">
                        <Clock size={18} />
                      </div>
                      <h3 className="font-black italic tracking-tighter text-xl uppercase leading-none">Scans</h3>
                    </div>
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">{history.length} Logs</span>
                  </div>
                  
                  <div className="max-h-[600px] overflow-y-auto custom-scrollbar bg-obsidian/40 backdrop-blur-xl">
                    {history.length > 0 ? (
                      <div className="divide-y divide-white/[0.02]">
                        {history.map((item, index) => (
                          <motion.div 
                            key={index} 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.05 }}
                            onClick={() => setResult(item)}
                            className="p-8 flex items-center justify-between group cursor-pointer hover:bg-white/[0.03] transition-all duration-300 active:scale-95"
                          >
                            <div className="flex flex-col gap-2">
                              <span className="text-sm font-black uppercase tracking-tight text-white group-hover:text-electric-blue transition-colors">
                                {item.applicantName || "ANONYMOUS_S-73"}
                              </span>
                              <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">
                                {new Date(item.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
                              </span>
                            </div>
                            <div className="flex items-center gap-5">
                              <span className="text-xs font-black text-electric-blue/80 group-hover:text-electric-blue transition-colors">
                                {item.score}
                              </span>
                              <ChevronRight size={16} className="text-white/10 group-hover:text-white group-hover:translate-x-1 transition-all duration-500" />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-16 text-center">
                        <div className="w-12 h-12 bg-white/[0.03] rounded-full flex items-center justify-center mx-auto mb-6">
                           <BarChart3 className="text-white/10" size={20} />
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Cache Memory Empty</p>
                      </div>
                    )}
                  </div>

                  <div className="p-8 border-t border-white/[0.03] bg-white/[0.01]">
                    <div className="flex items-center gap-3">
                       <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(59,130,246,1)]" />
                       <span className="text-[9px] font-black text-electric-blue uppercase tracking-[0.4em]">Real-time Status: Online</span>
                    </div>
                  </div>
                </div>

                {/* AD / INFO CARD */}
                <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-electric-blue/20 to-purple-900/10 border border-electric-blue/20 shadow-2xl relative overflow-hidden group">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
                  <Sparkles className="text-electric-blue/40 mb-6 group-hover:rotate-12 transition-transform duration-700" size={32} />
                  <h4 className="text-xl font-black italic tracking-tighter mb-4 leading-snug">UPGRADE TO <br /> PRECISION MAX</h4>
                  <p className="text-white/40 text-xs font-medium leading-relaxed mb-6">Unlock deep industry-specific keyword matching and cold-email generation.</p>
                  <button className="w-full py-4 bg-white text-black font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-electric-blue hover:text-white transition-all shadow-xl shadow-blue-500/10">COMING_SOON</button>
                </div>
              </aside>

            </div>
          </main>
        </div>
      </SignedIn>
    </div>
  );
}

export default App;