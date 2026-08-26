import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, User, MessageSquare, Send, CheckCircle2, AlertCircle, X, Phone, ChevronDown, CheckCircle } from 'lucide-react';
import { useLanguage } from './LanguageContext';

interface ContactFormProps {
  onClose?: () => void;
  isModal?: boolean;
}

export const ContactForm: React.FC<ContactFormProps> = ({ onClose, isModal = false }) => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'Project Inquiry',
    message: ''
  });

  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string; message?: string }>({});
  const [touched, setTouched] = useState<{ name?: boolean; email?: boolean; phone?: boolean; message?: boolean }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateField = (field: string, value: string): string | undefined => {
    if (field === 'name') {
      if (!value.trim()) return language === 'bn' ? 'আপনার নাম দেয়া আবশ্যক' : 'Full name is required';
      if (value.trim().length < 2) return language === 'bn' ? 'নাম কমপক্ষে ২ অক্ষরের হতে হবে' : 'Name must be at least 2 characters';
    }
    if (field === 'email') {
      if (!value.trim()) return language === 'bn' ? 'ইমেল নম্বর দেয়া আবশ্যক' : 'Email address is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return language === 'bn' ? 'সঠিক ইমেল প্রদান করুন' : 'Please enter a valid email address';
    }
    if (field === 'phone') {
      if (!value.trim()) return language === 'bn' ? 'ফোন নম্বর দেয়া আবশ্যক' : 'Phone number is required';
    }
    if (field === 'message') {
      if (!value.trim()) return language === 'bn' ? 'বার্তা প্রদান আবশ্যক' : 'Message content is required';
      if (value.trim().length < 10) return language === 'bn' ? 'বার্তা কমপক্ষে ১০ অক্ষরের হতে হবে' : 'Message must be at least 10 characters';
    }
    return undefined;
  };

  const validate = () => {
    const newErrors: { name?: string; email?: string; phone?: string; message?: string } = {};
    const nameErr = validateField('name', formData.name);
    if (nameErr) newErrors.name = nameErr;
    
    const emailErr = validateField('email', formData.email);
    if (emailErr) newErrors.email = emailErr;

    const phoneErr = validateField('phone', formData.phone);
    if (phoneErr) newErrors.phone = phoneErr;

    const msgErr = validateField('message', formData.message);
    if (msgErr) newErrors.message = msgErr;

    setErrors(newErrors);
    setTouched({ name: true, email: true, phone: true, message: true });
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Simulate mock email transmission API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', phone: '', inquiryType: 'Project Inquiry', message: '' });
      setErrors({});
      setTouched({});
    }, 1200);
  };

  const handleChange = (field: 'name' | 'email' | 'phone' | 'inquiryType' | 'message', value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (touched[field as keyof typeof touched]) {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const handleBlur = (field: 'name' | 'email' | 'phone' | 'message') => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const getFieldBorderClass = (field: 'name' | 'email' | 'phone' | 'message') => {
    if (errors[field]) {
      return 'border-red-500 focus:border-red-500 text-red-900 dark:text-red-400 bg-red-50/50 dark:bg-red-950/20';
    }
    if (touched[field] && !errors[field] && formData[field]) {
      return 'border-emerald-500 focus:border-emerald-500 text-emerald-900 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20';
    }
    return 'border-slate-200 dark:border-slate-800 focus:border-blue-600 dark:focus:border-blue-500';
  };

  const getIconColorClass = (field: 'name' | 'email' | 'phone' | 'message') => {
    if (errors[field]) return 'text-red-400';
    if (touched[field] && !errors[field] && formData[field]) return 'text-emerald-500';
    return 'text-slate-400';
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } }
  };

  return (
    <div 
      role={isModal ? "dialog" : "region"}
      aria-labelledby="contact-form-title"
      aria-modal={isModal ? "true" : undefined}
      className={`w-full max-w-lg bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/40 dark:border-slate-800/80 rounded-3xl p-8 md:p-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] relative transition-all ${isModal ? 'mx-auto' : ''}`}
    >
      {isModal && onClose && (
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100/80 dark:bg-slate-800/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 hover:scale-110 transition-all"
          aria-label={language === 'bn' ? 'সংলাপটি বন্ধ করুন' : 'Close contact dialog'}
        >
          <X size={18} />
        </button>
      )}

      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest mb-3 border border-blue-500/20">
          {language === 'bn' ? 'সরাসরি চ্যানেল' : 'Direct Channel'}
        </div>
        <h3 id="contact-form-title" className="text-2xl md:text-3xl font-black text-slate-950 dark:text-white tracking-tight uppercase">
          {language === 'bn' ? 'ইঞ্জিনিয়ারিং টিমের সাথে যোগাযোগ' : 'Connect with Engineering'}
        </h3>
        <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mt-2">
          {language === 'bn' ? 'ঢাকার প্রধান প্রকৌশলী দলের কাছে সরাসরি বার্তা পাঠান।' : 'Send a direct message to our core engineering team in Dhaka.'}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            role="status"
            aria-live="polite"
            className="p-8 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/50 text-center flex flex-col items-center"
          >
            <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30">
              <CheckCircle2 size={28} />
            </div>
            <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tight uppercase mb-2">
              Transmission Received
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 font-bold max-w-xs mb-6">
              Thank you for reaching out. An engineer will respond to your inquiry within 24 hours.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-black uppercase tracking-widest hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all"
            >
              Send Another Message
            </button>
          </motion.div>
        ) : (
          <motion.form 
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.05 } }
            }}
            onSubmit={handleSubmit} 
            className="space-y-6" 
            noValidate 
            aria-label="Contact Engineering Form"
          >
            {/* Name Field */}
            <motion.div variants={itemVariants}>
              <label htmlFor="contact-name" className="block text-[11px] font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Full Name <span className="text-blue-600" aria-hidden="true">*</span>
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${getIconColorClass('name')}`}>
                  {touched.name && !errors.name && formData.name ? <CheckCircle size={16} /> : <User size={16} />}
                </div>
                <input
                  id="contact-name"
                  type="text"
                  value={formData.name}
                  autoComplete="name"
                  aria-required="true"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  onChange={(e) => handleChange('name', e.target.value)}
                  onBlur={() => handleBlur('name')}
                  placeholder="e.g. Sabit Rahman"
                  className={`w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border-2 font-bold text-sm placeholder:text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all outline-none ${getFieldBorderClass('name')}`}
                />
              </div>
              {errors.name && (
                <p id="contact-name-error" className="mt-1.5 text-xs font-bold text-red-500 flex items-center gap-1" role="alert">
                  <AlertCircle size={12} /> {errors.name}
                </p>
              )}
            </motion.div>

            {/* Email Field */}
            <motion.div variants={itemVariants}>
              <label htmlFor="contact-email" className="block text-[11px] font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Email Address <span className="text-blue-600" aria-hidden="true">*</span>
              </label>
              <div className="relative">
                <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${getIconColorClass('email')}`}>
                  {touched.email && !errors.email && formData.email ? <CheckCircle size={16} /> : <Mail size={16} />}
                </div>
                <input
                  id="contact-email"
                  type="email"
                  value={formData.email}
                  autoComplete="email"
                  aria-required="true"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  onChange={(e) => handleChange('email', e.target.value)}
                  onBlur={() => handleBlur('email')}
                  placeholder="name@company.com"
                  className={`w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border-2 font-bold text-sm placeholder:text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all outline-none ${getFieldBorderClass('email')}`}
                />
              </div>
              {errors.email && (
                <p id="contact-email-error" className="mt-1.5 text-xs font-bold text-red-500 flex items-center gap-1" role="alert">
                  <AlertCircle size={12} /> {errors.email}
                </p>
              )}
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Phone Field */}
              <div>
                <label htmlFor="contact-phone" className="block text-[11px] font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  Phone Number <span className="text-blue-600" aria-hidden="true">*</span>
                </label>
                <div className="relative">
                  <div className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors ${getIconColorClass('phone')}`}>
                    {touched.phone && !errors.phone && formData.phone ? <CheckCircle size={16} /> : <Phone size={16} />}
                  </div>
                  <input
                    id="contact-phone"
                    type="tel"
                    value={formData.phone}
                    autoComplete="tel"
                    aria-required="true"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    onBlur={() => handleBlur('phone')}
                    placeholder="+1 (555) 000-0000"
                    className={`w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border-2 font-bold text-sm placeholder:text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all outline-none ${getFieldBorderClass('phone')}`}
                  />
                </div>
                {errors.phone && (
                  <p id="contact-phone-error" className="mt-1.5 text-xs font-bold text-red-500 flex items-center gap-1" role="alert">
                    <AlertCircle size={12} /> {errors.phone}
                  </p>
                )}
              </div>

              {/* Inquiry Type Field */}
              <div>
                <label htmlFor="contact-inquiry-type" className="block text-[11px] font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                  Type of Inquiry <span className="text-blue-600" aria-hidden="true">*</span>
                </label>
                <div className="relative">
                  <select
                    id="contact-inquiry-type"
                    value={formData.inquiryType}
                    onChange={(e) => handleChange('inquiryType', e.target.value)}
                    className="w-full pl-4 pr-11 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 font-bold text-sm text-slate-900 dark:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus:border-blue-600 dark:focus:border-blue-500 transition-all appearance-none cursor-pointer"
                  >
                    <option value="Project Inquiry">Project Inquiry</option>
                    <option value="Partnership Opportunity">Partnership Opportunity</option>
                    <option value="Support Request">Support Request</option>
                    <option value="General Question">General Question</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
                    <ChevronDown size={16} />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Message Field */}
            <motion.div variants={itemVariants}>
              <label htmlFor="contact-message" className="block text-[11px] font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Project Scope / Message <span className="text-blue-600" aria-hidden="true">*</span>
              </label>
              <div className="relative">
                <div className={`absolute top-3.5 left-4 pointer-events-none transition-colors ${getIconColorClass('message')}`}>
                  {touched.message && !errors.message && formData.message ? <CheckCircle size={16} /> : <MessageSquare size={16} />}
                </div>
                <textarea
                  id="contact-message"
                  rows={4}
                  value={formData.message}
                  aria-required="true"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  onChange={(e) => handleChange('message', e.target.value)}
                  onBlur={() => handleBlur('message')}
                  placeholder="Describe your inquiry or technical requirements..."
                  className={`w-full pl-11 pr-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border-2 font-bold text-sm placeholder:text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all resize-none outline-none ${getFieldBorderClass('message')}`}
                />
              </div>
              {errors.message && (
                <p id="contact-message-error" className="mt-1.5 text-xs font-bold text-red-500 flex items-center gap-1" role="alert">
                  <AlertCircle size={12} /> {errors.message}
                </p>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.button
              variants={itemVariants}
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 active:scale-[0.98] transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  Transmit Inquiry <Send size={15} />
                </>
              )}
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};
