import { SignInButton } from "@clerk/clerk-react";
import { motion } from 'framer-motion';
import { LogIn, Sparkles, Zap, Shield, Target, TrendingUp } from 'lucide-react';
import Navbar from "./components/Navbar";

export default function Landing({ monlamUser, onMonlamLogin }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="min-h-screen bg-obsidian text-white overflow-hidden mesh-bg">
      <Navbar monlamUser={monlamUser} onMonlamLogin={onMonlamLogin} />

      {/* HERO SECTION */}
      <section className="relative pt-40 pb-24 px-6">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-electric-blue text-[10px] font-black uppercase tracking-[0.3em] mb-10 shadow-2xl shadow-blue-500/10"
            >
              <Sparkles size={12} className="fill-electric-blue animate-pulse" />
              Advanced Neural Scoring Engine
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-7xl md:text-9xl font-black italic tracking-tighter leading-[0.85] mb-10 text-gradient-premium select-none"
            >
              BREACH THE <br />
              <span className="bg-gradient-to-r from-electric-blue via-purple-400 to-electric-blue bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">
                ATS BARRIER.
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="max-w-xl mx-auto text-gray-500 text-lg md:text-xl font-medium leading-relaxed mb-14 px-4"
            >
              High-precision resume optimization powered by deterministic AI.
              Engineering your career growth with surgical accuracy.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <SignInButton mode="modal">
                <button className="px-10 py-5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-black text-sm tracking-[0.2em] rounded-full transition-all duration-300 active:scale-95 uppercase flex items-center gap-3 cursor-pointer">
                  <LogIn size={18} />
                  Clerk Portal
                </button>
              </SignInButton>
              <button 
                onClick={onMonlamLogin}
                className="px-10 py-5 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white font-black text-sm tracking-[0.2em] rounded-full transition-all duration-500 shadow-2xl shadow-orange-500/20 hover:shadow-orange-500/40 active:scale-95 uppercase flex items-center gap-3 group cursor-pointer"
              >
                <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
                Login with Monlam AI
              </button>
            </motion.div>

            {/* TRUST INDICATORS REMOVED */}
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[600px] bg-electric-blue/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      </section>

      {/* CORE CAPABILITIES */}
      <section id="features" className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24 text-center md:text-left">
            <h2 className="text-xs font-black text-electric-blue uppercase tracking-[0.5em] mb-4">Functional Rubric</h2>
            <h3 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-none">ENGINEERED FOR <br /> PERFORMANCE</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: <Zap />, title: "Sub-second Analysis", text: "Llama 3.3 powered core identifies gaps in milliseconds with total precision." },
              { icon: <Shield />, title: "Precision Scoring", text: "100-point rigorous evaluation based on modern recruitment standards." },
              { icon: <Target />, title: "Semantic Matching", text: "Advanced keyword extraction matched against industry-specific job profiles." },
              { icon: <TrendingUp />, title: "Growth Metrics", text: "Converts abstract roles into measurable impact metrics for maximum optics." },
              { icon: <Sparkles />, title: "Layout Audit", text: "Deep scan of PDF structures to ensure 100% readability by machine parsers." },
              { icon: <LogIn />, title: "Zero Configuration", text: "Instant deployment. Upload your PDF and receive an immediate audit report." },
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] hover:border-electric-blue/30 hover:shadow-2xl hover:shadow-electric-blue/5 transition-all duration-500"
              >
                <div className="w-16 h-16 bg-white/[0.03] rounded-2xl flex items-center justify-center text-electric-blue mb-10 border border-white/5 group-hover:bg-electric-blue group-hover:text-white transition-all duration-500 shadow-xl">
                  {f.icon}
                </div>
                <h4 className="text-2xl font-black italic mb-4 tracking-tight group-hover:text-electric-blue transition-colors">{f.title}</h4>
                <p className="text-gray-500 font-medium leading-relaxed text-sm md:text-base">{f.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* THE PROCESS */}
      <section id="how-it-works" className="py-32 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-24 items-center">
            <div className="flex-1">
              <h2 className="text-xs font-black text-electric-blue uppercase tracking-[0.5em] mb-4">Operational Workflow</h2>
              <h3 className="text-5xl md:text-7xl font-black italic tracking-tighter mb-12">THE THREE <br /> STAGE SCAN</h3>

              <div className="space-y-10">
                {[
                  { step: "01", title: "Ingest Data", text: "Securely upload your resume in PDF format to our analysis sandbox." },
                  { step: "02", title: "Neural Audit", text: "Our deterministic core extracts skills, experience, and quantifiable impacts." },
                  { step: "03", title: "Apply Intelligence", text: "Receive a surgical report with prioritized improvements for your role." },
                ].map((s, i) => (
                  <div key={i} className="flex gap-10 group items-start">
                    <div className="text-5xl font-black italic text-white/[0.03] group-hover:text-electric-blue/20 transition-all duration-500">{s.step}</div>
                    <div>
                      <h4 className="text-2xl font-black italic mb-3 tracking-tight group-hover:translate-x-2 transition-transform duration-500">{s.title}</h4>
                      <p className="text-gray-500 text-sm md:text-base leading-relaxed">{s.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex-1 w-full aspect-square md:aspect-video rounded-[3rem] bg-gradient-to-br from-blue-900/10 to-purple-900/10 border border-white/5 p-1 relative overflow-hidden group">
              <div className="absolute inset-0 bg-blue-500/5 blur-[80px] -z-10 group-hover:bg-blue-500/10 transition-colors duration-700" />
              <div className="w-full h-full border border-dashed border-white/10 rounded-[2.8rem] flex items-center justify-center flex-col gap-6 bg-obsidian/40 backdrop-blur-3xl">
                <div className="w-24 h-24 bg-electric-blue/10 rounded-full flex items-center justify-center border border-electric-blue/20 animate-pulse shadow-2xl shadow-electric-blue/20">
                  <Sparkles className="text-electric-blue" size={40} />
                </div>
                <div className="space-y-2 text-center px-10">
                  <p className="text-[10px] font-black tracking-[0.3em] text-electric-blue uppercase">Neural Sandbox Active</p>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Optimizing Response Vector...</p>
                </div>
                <div className="w-64 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: [0.4, 0, 0.2, 1] }}
                    className="w-1/2 h-full bg-gradient-to-r from-transparent via-electric-blue to-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-24 px-6 border-t border-white/[0.03]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-3 font-black text-2xl tracking-tighter cursor-default">
            <div className="p-1.5 bg-electric-blue rounded-lg">
              <Zap className="text-white fill-white" size={18} />
            </div>
            <span className="text-gradient-premium">NEOSCAN</span>
          </div>
          <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.3em]">
            © 2026 NEOSCAN OPERATIONS. S-04.
          </p>
        </div>
      </footer>
    </div>
  );
}