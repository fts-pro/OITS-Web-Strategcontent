import React from 'react';
import { Insights } from '../components/Insights';
import { motion } from 'motion/react';
import { BookOpen, ArrowDown } from 'lucide-react';

export const InsightsPage: React.FC = () => {
  return (
    <div className="pt-20 min-h-screen bg-slate-50 dark:bg-[#070A13]">
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-to-tr from-sky-500/10 to-indigo-500/10 rounded-full blur-3xl pointer-events-none opacity-50 dark:opacity-20" />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-mono font-bold tracking-wider text-slate-700 dark:text-slate-300 mb-6 shadow-sm"
          >
            <BookOpen size={14} className="text-sky-500" />
            <span>ENGINEERING JOURNAL</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-950 dark:text-white mb-6 tracking-tight"
          >
            Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-indigo-500">Perspectives</span>.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed font-normal"
          >
            Dive into our technical articles, industry trends, and deep dives on software architecture, AI/ML, and cloud solutions.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="animate-bounce inline-flex justify-center items-center w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500"
          >
            <ArrowDown size={18} />
          </motion.div>
        </div>
      </section>

      <div className="h-[1px] bg-slate-200 dark:bg-slate-800 w-full" />
      
      <Insights />
    </div>
  );
};
