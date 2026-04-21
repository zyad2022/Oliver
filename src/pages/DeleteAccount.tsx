import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, ShieldCheck, Mail, ArrowLeft, Copy, Check, ExternalLink, X } from 'lucide-react';

interface DeleteAccountProps {
  onNavigate: (page: string) => void;
}

export function DeleteAccount({ onNavigate }: DeleteAccountProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  const email = "zyadraed2020@gmail.com";
  const rawSubject = "Request to Delete My Account";
  const rawBody = "Hello, I would like to request deletion of my account and all associated data.";
  const subject = encodeURIComponent(rawSubject);
  const body = encodeURIComponent(rawBody);
  const mailtoLink = `mailto:${email}?subject=${subject}&body=${body}`;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyMessage = () => {
    const fullMessage = `Subject: ${rawSubject}\n\n${rawBody}`;
    navigator.clipboard.writeText(fullMessage);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="max-w-2xl mx-auto px-4 lg:px-8 py-16 md:py-24 w-full en-text"
      dir="ltr"
    >
      <button 
        onClick={() => onNavigate('profile')}
        className="flex items-center gap-2 text-[#666] hover:text-[#111] mb-8 transition-colors text-sm font-medium"
      >
        <ArrowLeft size={16} />
        Back to Profile
      </button>

      <div className="bg-white rounded-3xl p-8 md:p-12 border border-natural-border shadow-sm text-center flex flex-col items-center relative overflow-hidden">
        
        {/* Subtle top red border highlight for warning context */}
        <div className="absolute top-0 left-0 w-full h-1 bg-red-500/80"></div>

        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle size={32} />
        </div>

        <h1 className="text-3xl font-serif text-stone-900 mb-4 tracking-tight">
          Delete Your Account & Data
        </h1>

        <p className="text-[#555] mb-8 max-w-md leading-relaxed text-[15px]">
          If you decide you no longer want to use our services, you can request the full deletion of your account and all associated personal data by contacting our support team.
        </p>

        <div className="bg-red-50/50 border border-red-100 text-red-800 p-4 md:p-5 rounded-2xl mb-10 flex items-start gap-4 text-left w-full max-w-md">
          <AlertTriangle size={24} className="shrink-0 text-red-500 mt-0.5" />
          <p className="text-sm leading-relaxed font-medium text-red-900/90">
            This action is permanent and cannot be undone. Data deletion may take some time to process.
          </p>
        </div>

        <div className="w-full max-w-md flex flex-col items-center mb-10">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#2D2D2D] text-white px-8 py-4 rounded-full font-medium hover:bg-[#1A1A1A] transition-all flex items-center gap-3 w-full justify-center shadow-sm hover:shadow-md hover:-translate-y-0.5"
          >
            <Mail size={20} />
            Contact Support Team
          </button>
        </div>

        <div className="flex items-center justify-center gap-2.5 text-[#777] text-sm">
          <ShieldCheck size={18} className="text-emerald-600" />
          <span className="font-medium">We respect your privacy and handle all requests securely.</span>
        </div>
        
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[90%] md:max-w-md bg-white rounded-3xl p-6 md:p-8 z-[60] shadow-xl flex flex-col"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-serif font-medium text-stone-900">Contact Support</h2>
                <button 
                  onClick={() => setIsModalOpen(false)} 
                  className="p-2 -mr-2 text-stone-400 hover:text-stone-800 transition-colors rounded-full hover:bg-natural-bg"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4 mb-8">
                <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-natural-border">
                  <p className="text-xs text-[#888] uppercase tracking-wider font-semibold mb-1">To</p>
                  <p className="text-[#111] font-medium text-sm select-all">{email}</p>
                </div>
                
                <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-natural-border">
                  <p className="text-xs text-[#888] uppercase tracking-wider font-semibold mb-1">Subject</p>
                  <p className="text-[#111] font-medium text-sm select-all">{rawSubject}</p>
                </div>

                <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-natural-border">
                  <p className="text-xs text-[#888] uppercase tracking-wider font-semibold mb-1">Message</p>
                  <p className="text-[#111] leading-relaxed text-sm select-all">{rawBody}</p>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleCopyEmail}
                    className="flex grid-cols-1 items-center justify-center gap-2 bg-white border border-natural-border text-stone-700 py-3 rounded-xl text-sm font-medium hover:bg-natural-bg hover:border-stone-300 transition-all shadow-sm"
                  >
                    {copiedEmail ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
                    {copiedEmail ? 'Copied!' : 'Copy Email'}
                  </button>
                  <button
                    onClick={handleCopyMessage}
                    className="flex grid-cols-1 items-center justify-center gap-2 bg-white border border-natural-border text-stone-700 py-3 rounded-xl text-sm font-medium hover:bg-natural-bg hover:border-stone-300 transition-all shadow-sm"
                  >
                    {copiedMessage ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
                    {copiedMessage ? 'Copied!' : 'Copy Message'}
                  </button>
                </div>

                <div className="flex items-center gap-4 my-2">
                  <div className="flex-1 h-px bg-natural-border"></div>
                  <span className="text-xs text-[#888] uppercase tracking-wider font-semibold">Or</span>
                  <div className="flex-1 h-px bg-natural-border"></div>
                </div>

                <a
                  href={mailtoLink}
                  className="flex items-center justify-center gap-2 bg-[#2D2D2D] text-white py-3.5 rounded-xl text-sm font-medium hover:bg-[#1A1A1A] transition-colors shadow-sm"
                >
                  <ExternalLink size={16} />
                  Open Email App
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
