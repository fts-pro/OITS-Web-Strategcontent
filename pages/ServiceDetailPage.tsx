import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SERVICES, PROCESS_STEPS } from '../constants';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Check, 
  ChevronRight, 
  Calendar,
  Layers,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { SectionWrapper } from '../components/SectionWrapper';
import { ScheduleCallModal } from '../components/ScheduleCallModal';

export const ServiceDetailPage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const [isScheduleModalOpen, setIsScheduleModalOpen] = React.useState(false);

  const service = SERVICES.find(s => s.id === serviceId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  if (!service) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center bg-slate-50 dark:bg-[#070A13]">
        <h1 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">Service Not Found</h1>
        <button onClick={() => navigate('/services')} className="text-sky-500 hover:underline flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Services
        </button>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-slate-50 dark:bg-[#070A13]">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-tr from-sky-500/20 to-emerald-500/10 rounded-full blur-3xl pointer-events-none opacity-50" />
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10 max-w-5xl">
          <Link to="/services" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400 hover:text-white transition-colors mb-8">
            <ArrowLeft size={14} /> Back to Services
          </Link>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="p-4 bg-sky-500/10 text-sky-400 rounded-2xl border border-sky-500/20">
              <Layers size={32} />
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-800/80 text-slate-300 text-[10px] font-mono font-bold uppercase tracking-[0.2em] rounded-full border border-slate-700">
              Enterprise Solution
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase mb-6 leading-none max-w-4xl"
          >
            {service.title}
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-3xl"
          >
            {service.description}
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <SectionWrapper className="bg-white dark:bg-[#070A13]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column (Content) */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* In Depth Overview */}
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">
                Service Overview
              </h2>
              <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed">
                <p>{service.longDescription}</p>
                <p className="mt-4">
                  By adhering to strict engineering principles and leveraging modern paradigms, we ensure that the delivered product not only meets immediate business needs but is fully prepared to scale exponentially.
                </p>
              </div>
            </div>

            {/* Key Features & Benefits */}
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">
                Key Features & Benefits
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                    <div className="mt-0.5 p-1 rounded-full bg-emerald-500/10 text-emerald-500 shrink-0">
                      <Check size={16} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-1">{feature}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Engineered for maximal resilience and operational efficiency.</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">
                Technical Specifications
              </h2>
              <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-sm">
                    {service.technicalSpecs.map((spec, i) => (
                      <tr key={i} className="hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="p-4 font-mono font-bold text-slate-900 dark:text-white w-1/3 border-r border-slate-100 dark:border-slate-800/80">
                          {spec.label}
                        </td>
                        <td className="p-4 text-slate-600 dark:text-slate-400 font-mono">
                          {spec.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Implementation Process */}
            <div className="space-y-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">
                Typical Process
              </h2>
              <div className="space-y-4 relative before:absolute before:inset-0 before:ml-[1.4rem] before:-translate-x-px md:before:ml-[2.4rem] before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-200 dark:before:via-slate-800 before:to-transparent">
                {PROCESS_STEPS.slice(0, 4).map((step, i) => (
                  <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white dark:border-[#070A13] bg-slate-100 dark:bg-slate-900 text-slate-400 group-hover:text-sky-500 group-hover:bg-sky-50 dark:group-hover:bg-sky-500/10 transition-colors shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 shadow">
                      <span className="font-mono text-xs font-bold">{step.number}</span>
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-5 rounded-2xl bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 shadow-sm group-hover:border-sky-500/30 transition-all">
                      <h4 className="font-bold text-slate-900 dark:text-white mb-2">{step.title}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column (Sidebar CTA) */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 p-8 rounded-3xl bg-slate-900 text-white shadow-2xl border border-slate-800 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 space-y-6">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-4">
                  <Zap size={24} />
                </div>
                
                <h3 className="text-2xl font-black tracking-tight">Ready to initiate your project?</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Schedule a technical consultation with our engineering architects to discuss {service.title.toLowerCase()} tailored to your enterprise requirements.
                </p>
                
                <div className="pt-4 border-t border-slate-800">
                  <button 
                    onClick={() => setIsScheduleModalOpen(true)}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-mono text-[11px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                  >
                    <Calendar size={16} /> Get a Quote
                  </button>
                </div>

                <div className="pt-2 text-center">
                  <p className="text-[10px] font-mono text-slate-500">Typical response time: &lt; 24 hours</p>
                </div>
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
