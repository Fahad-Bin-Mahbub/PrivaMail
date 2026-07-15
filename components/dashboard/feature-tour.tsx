"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as LucideIcons from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";

const TOUR_STEPS = [
  {
    title: "Welcome to PrivaMail! 🔒",
    content: "This quick tour will show you how to send and receive secure, encrypted emails. Let's get started!",
    target: null,
  },
  {
    title: "Compose a Protected Email",
    content: "Click here to write a new email. By default, all your emails are protected with encryption — only you and your recipient can read them.",
    target: ".tour-compose",
    position: "right" as const,
  },
  {
    title: "Your Mailbox Folders",
    content: "'Inbox' shows all received emails. 'Encrypted' shows only your protected emails. Look for the 🔒 icon to spot encrypted emails.",
    target: ".tour-folders",
    position: "right" as const,
  },
  {
    title: "Email Security Indicators",
    content: "Emails with a green left border are encrypted (protected). Emails with an amber border are not encrypted. You can always check an email's security by opening it.",
    target: ".tour-encrypted-legend",
    position: "bottom" as const,
  },
  {
    title: "Reading Encrypted Emails",
    content: "Some emails may require a password to open. Look for the 🔒 Locked badge — you'll be asked for the password when you click on it. The sender should have shared the password with you.",
    target: null,
  },
  {
    title: "You're All Set! 🎉",
    content: "Visit Settings anytime to manage your security keys, enable extra login protection, or connect more email accounts. Enjoy secure emailing!",
    target: ".tour-settings",
    position: "right" as const,
  },
];

export function FeatureTour() {
  const { darkMode } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  
  useEffect(() => {
    const isCompleted = localStorage.getItem('privamail_tour_completed');
    if (isCompleted !== 'true') {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const updatePosition = () => {
      const step = TOUR_STEPS[currentStep];
      if (step.target) {
        const el = document.querySelector(step.target);
        if (el) {
          setTargetRect(el.getBoundingClientRect());
        } else {
          setTargetRect(null);
        }
      } else {
        setTargetRect(null);
      }
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [currentStep, isVisible]);

  const completeTour = () => {
    localStorage.setItem('privamail_tour_completed', 'true');
    setIsVisible(false);
  };

  const handleNext = () => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTour();
    }
  };

  if (!isVisible) return null;

  const step = TOUR_STEPS[currentStep];

  let tooltipStyle: React.CSSProperties = {};
  if (targetRect) {
    const winWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const winHeight = typeof window !== 'undefined' ? window.innerHeight : 800;
    
    if (step.position === "right") {
      if (targetRect.right + 400 > winWidth) {
        // Overflow on right, so position on left
        tooltipStyle = { right: winWidth - targetRect.left + 16, top: targetRect.top };
      } else {
        tooltipStyle = { left: targetRect.right + 16, top: targetRect.top };
      }
    } else if (step.position === "bottom") {
      // Horizontal overflow check
      if (targetRect.left + 400 > winWidth) {
        tooltipStyle = { right: winWidth - targetRect.right };
      } else {
        tooltipStyle = { left: targetRect.left };
      }
      
      // Vertical overflow check
      if (targetRect.bottom + 250 > winHeight) {
        // Overflow on bottom, position above
        tooltipStyle.bottom = winHeight - targetRect.top + 16;
      } else {
        tooltipStyle.top = targetRect.bottom + 16;
      }
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60]">
        {targetRect ? (
          <div
            style={{
              position: "fixed",
              top: targetRect.top - 8,
              left: targetRect.left - 8,
              width: targetRect.width + 16,
              height: targetRect.height + 16,
              boxShadow: "0 0 0 9999px rgba(0,0,0,0.6)",
              borderRadius: "12px",
              zIndex: 61,
              pointerEvents: "none",
              transition: "all 0.3s ease-in-out"
            }}
          />
        ) : (
          <div className="fixed inset-0 bg-black/60 z-[61]" />
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          style={targetRect ? tooltipStyle : {}}
          className={`fixed z-[62] max-w-sm w-full p-6 rounded-xl shadow-2xl ${targetRect ? "" : "inset-0 m-auto h-fit"} ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-white font-bold">
              {currentStep + 1}
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
              <p className={`text-sm leading-relaxed ${darkMode ? "text-gray-300" : "text-gray-600"}`}>{step.content}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={completeTour}
              className={`text-sm font-medium transition-colors ${darkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"}`}
            >
              Skip Tour
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              {currentStep === TOUR_STEPS.length - 1 ? "Get Started" : "Next"}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
