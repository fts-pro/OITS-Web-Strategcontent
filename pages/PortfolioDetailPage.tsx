import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { PROJECTS } from '../constants';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Check, 
  Calendar,
  Layers,
  Terminal,
  Activity,
  Zap,
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import { SectionWrapper } from '../components/SectionWrapper';
import { ScheduleCallModal } from '../components/ScheduleCallModal';

export const PortfolioDetailPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [isScheduleModalOpen, setIsScheduleModalOpen] = React.useState(false);

  const project = PROJECTS.find(p => p.id === projectId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectId]);

  if (!project) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center bg-slate-50 dark:bg-[#070A13]">
        <h1 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Project Not Found</h1>
        <button onClick={() => navigate('/portfolio')} className="text-sky-500 hover:underline flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Portfolio
        </button>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-slate-50 dark:bg-[#070A13]">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-emerald-500/20 to-sky-500/10 rounded-full blur-3xl pointer-events-none opacity-50" />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-5xl">
          <Link to="/portfolio" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400 hover:text-white transition-colors mb-8">
            <ArrowLeft size={14} /> Back to Portfolio
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3"
              >
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold uppercase tracking-[0.2em] rounded-full border border-emerald-500/20">
                  {project.category}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800/80 text-slate-400 text-[10px] font-mono font-bold uppercase tracking-widest rounded-full border border-slate-700">
                  {project.status}
                </span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-none"
              >
                {project.title}
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg md:text-xl text-slate-300 leading-relaxed font-normal"
              >
                {project.description}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="pt-4 flex flex-wrap gap-4"
              >
                <div className="flex items-center gap-2 text-sm text-slate-400 font-mono">
                  <Calendar size={16} /> <span>Duration: {project.duration}</span>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="relative rounded-3xl overflow-hidden border border-slate-700 shadow-2xl aspect-[4/3] bg-slate-800"
            >
              <img 
                src={`${project.imageUrl}&auto=format&fit=crop&q=80&w=1200`} 
                alt={project.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <SectionWrapper className="bg-white dark:bg-[#070A13]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 -mt-16 relative z-20">
          
          {/* Left Column (Content) */}
          <div className="lg:col-span-2 space-y-10 p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-xl">
            
            {/* Project Overview */}
            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-950 dark:text-white flex items-center gap-2">
                <Layers className="text-sky-500" size={24} /> Project Overview
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
                {project.fullDescription}
              </p>
            </div>

            <div className="h-px bg-slate-100 dark:bg-slate-800 w-full" />

            {/* Problem Statement */}
            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-950 dark:text-white flex items-center gap-2">
                <ShieldCheck className="text-rose-500" size={24} /> Challenges Faced
              </h2>
              <div className="p-5 rounded-2xl bg-rose-50 dark:bg-rose-950/10 border border-rose-100 dark:border-rose-900/30 text-rose-900 dark:text-rose-200/80 leading-relaxed text-sm sm:text-base font-medium">
                {project.problemStatement}
              </div>
            </div>

            {/* Technical Approach (Solutions Implemented) */}
            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-950 dark:text-white flex items-center gap-2">
                <Terminal className="text-indigo-500" size={24} /> Solutions Implemented
              </h2>
              <div className="p-5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/10 border border-indigo-100 dark:border-indigo-900/30 text-indigo-900 dark:text-indigo-200/80 leading-relaxed text-sm sm:text-base font-medium">
                {project.technicalApproach}
              </div>
            </div>

            {/* Outcomes Achieved */}
            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-950 dark:text-white flex items-center gap-2">
                <TrendingUp className="text-emerald-500" size={24} /> Outcomes Achieved
              </h2>
              <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/10 border border-emerald-100 dark:border-emerald-900/30 text-emerald-900 dark:text-emerald-200/80 leading-relaxed text-sm sm:text-base font-medium flex items-start gap-3">
                <Check className="shrink-0 text-emerald-500 mt-1" size={20} />
                <span>{project.results}</span>
              </div>
            </div>

            <div className="h-px bg-slate-100 dark:bg-slate-800 w-full" />

            {/* Secondary Images/Mockups placeholders */}
            <div className="space-y-4">
              <h2 className="text-xl font-extrabold tracking-tight text-slate-950 dark:text-white">
                Interface Mockups
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="aspect-video bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden relative group">
                   <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-mono text-xs z-10 opacity-50">Wireframe Mockup Placeholder</div>
                   <img src={`${project.imageUrl}&auto=format&fit=crop&q=80&w=600&blur=20`} alt="" className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform" />
                </div>
                <div className="aspect-video bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden relative group">
                   <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-mono text-xs z-10 opacity-50">Architecture Diagram Placeholder</div>
                   <img src={`${project.imageUrl}&auto=format&fit=crop&q=80&w=600&blur=50`} alt="" className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform" />
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (Sidebar Tech & CTA) */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Tech Stack Widget */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
              <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
                <Activity size={16} /> Technologies Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold text-slate-700 dark:text-slate-300 shadow-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 text-white shadow-2xl border border-slate-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 space-y-6">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white mb-2">
                  <Zap size={20} />
                </div>
                
                <h3 className="text-xl font-black tracking-tight">Build something similar</h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Discuss how we can engineer a custom solution tailored to your operational constraints and scalability needs.
                </p>
                
                <button 
                  onClick={() => setIsScheduleModalOpen(true)}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-sky-600 text-white font-mono text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <Calendar size={14} /> Get a Quote
                </button>
              </div>
            </div>

          </div>

        </div>
      </SectionWrapper>

      <ScheduleCallModal 
        isOpen={isScheduleModalOpen} 
        onClose={() => setIsScheduleModalOpen(false)} 
      />
    </div>
  );
};
