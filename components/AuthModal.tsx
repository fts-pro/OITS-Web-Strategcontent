import React, { useState, useEffect, useRef } from 'react';
import { X, Mail, Lock, User, ArrowRight, Github, Linkedin, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from '../utils/firebase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [blueprints, setBlueprints] = useState<string[]>([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      // Fetch dynamic benefits/blueprints from Firestore
      const fetchBlueprints = async () => {
        try {
          const q = query(collection(db, 'industry_blueprints'), limit(2));
          const querySnapshot = await getDocs(q);
          const fetched: string[] = [];
          querySnapshot.forEach((doc) => {
            if (doc.data().title) fetched.push(doc.data().title);
          });
          if (fetched.length > 0) {
            setBlueprints(fetched);
          } else {
            setBlueprints(['FinTech Microservices', 'SaaS Multi-tenant DB']);
          }
        } catch (error) {
          console.warn('Firestore fetch failed, using fallback blueprints', error);
          setBlueprints(['FinTech Microservices', 'SaaS Multi-tenant DB']);
        }
      };
      fetchBlueprints();
    }
  }, [isOpen]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      containerRef.current.style.setProperty('--mouse-x', `${x}px`);
      containerRef.current.style.setProperty('--mouse-y', `${y}px`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
    navigate('/dashboard');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-white dark:bg-[#0A0F1D] rounded-3xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors z-10"
            >
              <X size={18} />
            </button>

            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {isLogin 
                    ? 'Enter your credentials to access the workspace portal.' 
                    : 'Sign up to manage your enterprise projects and resources.'}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <User size={16} />
                      </div>
                      <input
                        type="text"
                        required
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:ring-2 focus:ring-[#38BDF8] focus:border-transparent outline-none transition-all dark:text-white"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                    Work Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Mail size={16} />
                    </div>
                    <input
                      type="email"
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:ring-2 focus:ring-[#38BDF8] focus:border-transparent outline-none transition-all dark:text-white"
                      placeholder="you@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Lock size={16} />
                    </div>
                    <input
                      type="password"
                      required
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl text-sm focus:ring-2 focus:ring-[#38BDF8] focus:border-transparent outline-none transition-all dark:text-white"
                      placeholder="••••••••"
                    />
                  </div>
                  {isLogin && (
                    <div className="mt-2 text-right">
                      <button type="button" className="text-xs font-medium text-[#38BDF8] hover:underline">
                        Forgot password?
                      </button>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-[#38BDF8] hover:bg-[#0284C7] text-slate-950 font-bold rounded-xl flex items-center justify-center gap-2 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-[#38BDF8] dark:focus:ring-offset-slate-900"
                >
                  {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={16} />
                </button>
              </form>

              <div className="my-6 flex items-center">
                <div className="flex-1 border-t border-slate-200 dark:border-slate-800"></div>
                <span className="px-4 text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">Or continue with</span>
                <div className="flex-1 border-t border-slate-200 dark:border-slate-800"></div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors text-sm font-bold text-slate-700 dark:text-slate-300">
                  <Github size={16} /> GitHub
                </button>
                
                <div 
                  id="linkedin-auth-container" 
                  ref={containerRef}
                  onMouseMove={handleMouseMove}
                  className="relative group w-full"
                >
                  <button className="relative w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-all duration-300 text-sm font-bold text-slate-700 dark:text-slate-300 overflow-hidden group-hover:shadow-[0_0_15px_rgba(10,102,194,0.4)] group-hover:border-[#0A66C2]/50">
                    {/* Hover Glow Effect using dynamic CSS variables */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: 'radial-gradient(circle 50px at var(--mouse-x, 50%) var(--mouse-y, 50%), #0A66C2, transparent)'
                      }}
                    />
                    <Linkedin size={16} className="text-[#0A66C2] relative z-10" /> 
                    <span className="relative z-10">LinkedIn</span>
                  </button>
                  
                  {/* Tooltip */}
                  <div 
                    className="absolute bottom-full mb-3 w-56 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-20"
                    style={{ 
                      // Use responsive positioning
                      left: 'calc(var(--mouse-x, 50%) - 112px)', // 112px is half of 224px (w-56)
                      transform: 'translateX(clamp(-112px, 0px, 112px))' // Ensure it doesn't overflow
                    }}
                  >
                    <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] p-3 rounded-xl text-center shadow-2xl relative">
                      <div className="font-bold mb-2 uppercase tracking-widest text-[#38BDF8] dark:text-[#0A66C2]">
                        Unlock exclusive architecture blueprints
                      </div>
                      <div className="text-left space-y-1.5 mb-3 border-t border-slate-700/50 dark:border-slate-200 pt-2">
                        {blueprints.map((bp, i) => (
                          <div key={i} className="flex items-start gap-1.5">
                            <div className="w-1 h-1 rounded-full bg-[#38BDF8] dark:bg-[#0A66C2] mt-1.5 shrink-0" />
                            <span className="opacity-90">{bp}</span>
                          </div>
                        ))}
                      </div>
                      <button 
                        onClick={(e) => {
                          e.preventDefault();
                          setIsPreviewOpen(true);
                        }}
                        className="flex items-center justify-center gap-1.5 w-full py-1.5 bg-white/10 dark:bg-black/5 hover:bg-white/20 dark:hover:bg-black/10 rounded-lg transition-colors font-bold text-[#38BDF8] dark:text-[#0A66C2]"
                      >
                        <Eye size={12} /> Quick View
                      </button>
                      <div 
                        className="absolute top-full -mt-[1px] border-[6px] border-transparent border-t-slate-900 dark:border-t-white"
                        style={{ left: 'calc(112px - 6px)' }} // Center caret
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500">
                <span>{isLogin ? "Don't have an account?" : "Already have an account?"}</span>
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="font-bold text-slate-900 dark:text-white hover:text-[#38BDF8] dark:hover:text-[#38BDF8] transition-colors"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Quick View Preview Modal */}
      <AnimatePresence>
        {isPreviewOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPreviewOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-white dark:bg-[#0A0F1D] rounded-3xl p-8 shadow-2xl border border-slate-200 dark:border-slate-800"
            >
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Linkedin size={24} className="text-[#0A66C2]" /> Personalized Blueprints
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
                By connecting with LinkedIn, our AI engine will automatically scan your industry profile and generate highly specific system architectures tailored to your sector.
              </p>
              <div className="space-y-4">
                {blueprints.map((bp, i) => (
                  <div key={i} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{bp}</h4>
                    <p className="text-xs text-slate-500 mt-1">Example schema generation tailored for enterprise scale.</p>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="w-full mt-6 py-3 bg-[#0A66C2] hover:bg-[#004182] text-white font-bold rounded-xl transition-colors"
              >
                Got it
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </AnimatePresence>
  );
};

