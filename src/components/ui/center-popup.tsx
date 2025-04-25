"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LogOut, LogIn, PartyPopper, Star, CheckCircle2 } from "lucide-react";
import { Button } from "./button";
import confetti from "canvas-confetti";

interface CenterPopupProps {
  message: string;
  type: 'login' | 'signout';
  duration?: number;
  onClose?: () => void;
  visible?: boolean;
}

export const CenterPopup: React.FC<CenterPopupProps> = ({
  message,
  type,
  duration = 5000,
  onClose,
  visible = true,
}) => {
  const [hasTriggeredConfetti, setHasTriggeredConfetti] = useState(false);
  
  useEffect(() => {
    if (visible && type === 'login' && !hasTriggeredConfetti) {
      // Trigger confetti when login popup appears
      const end = Date.now() + 1000;
      
      const colors = ['#22c55e', '#16a34a', '#15803d']; 
      
      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });
        
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
      
      setHasTriggeredConfetti(true);
    }
    
    if (visible && duration > 0) {
      const timer = setTimeout(() => {
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, onClose, type, hasTriggeredConfetti]);

  const getBgColor = () => {
    switch (type) {
      case 'login':
        return 'bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/20';
      case 'signout':
        return 'bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/30 dark:to-amber-900/20';
      default:
        return 'bg-gray-50 dark:bg-gray-800';
    }
  };

  const getBorderColor = () => {
    switch (type) {
      case 'login':
        return 'border-green-200 dark:border-green-800';
      case 'signout':
        return 'border-orange-200 dark:border-orange-800';
      default:
        return 'border-gray-200 dark:border-gray-700';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'login':
        return 'text-green-700 dark:text-green-300';
      case 'signout':
        return 'text-orange-700 dark:text-orange-300';
      default:
        return 'text-gray-700 dark:text-gray-300';
    }
  };
  
  const getIconColor = () => {
    switch (type) {
      case 'login':
        return 'text-green-500 dark:text-green-400';
      case 'signout':
        return 'text-orange-500 dark:text-orange-400';
      default:
        return 'text-gray-500 dark:text-gray-400';
    }
  };
  
  const getIcon = () => {
    switch (type) {
      case 'login':
        return <LogIn size={28} className={cn("mb-2", getIconColor())} />;
      case 'signout':
        return <LogOut size={28} className={cn("mb-2", getIconColor())} />;
      default:
        return null;
    }
  };
  
  const getTitle = () => {
    switch (type) {
      case 'login':
        return 'Welcome Back!';
      case 'signout':
        return 'See You Soon!';
      default:
        return '';
    }
  };
  
  const getDecorationIcons = () => {
    if (type === 'login') {
      return (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="absolute -top-2 -right-2"
          >
            <PartyPopper size={20} className="text-green-500 dark:text-green-400" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="absolute -bottom-2 -left-2"
          >
            <CheckCircle2 size={20} className="text-green-500 dark:text-green-400" />
          </motion.div>
        </>
      );
    } else {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="absolute -top-2 -left-2"
        >
          <Star size={20} className="text-orange-500 dark:text-orange-400" />
        </motion.div>
      );
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm" 
            onClick={onClose} 
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
            className={cn(
              getBgColor(),
              getBorderColor(),
              "border-2 rounded-xl shadow-lg p-6 max-w-md mx-auto relative overflow-hidden"
            )}
          >
            {getDecorationIcons()}
            
            <div className="text-center relative z-10">
              <div className="flex justify-center mb-3">
                {getIcon()}
              </div>
              <motion.h3 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className={cn("text-xl font-semibold mb-2", getTextColor())}
              >
                {getTitle()}
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className={cn("text-base leading-relaxed", getTextColor())}
              >
                {message}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="mt-5"
              >
                <Button
                  onClick={onClose}
                  variant={type === 'login' ? 'default' : 'destructive'}
                  className={type === 'login' ? 'bg-green-600 hover:bg-green-700' : ''}
                >
                  {type === 'login' ? 'Continue to Dashboard' : 'Close'}
                </Button>
              </motion.div>
            </div>
            
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-20 h-20 opacity-10 rounded-bl-full bg-gradient-to-br from-current to-transparent" />
            <div className="absolute bottom-0 left-0 w-20 h-20 opacity-10 rounded-tr-full bg-gradient-to-tl from-current to-transparent" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}; 